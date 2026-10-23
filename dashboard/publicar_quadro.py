"""Publica o quadro de tarefas no Supabase Realtime Broadcast (MIGRAR-AGENTES-BROADCAST.2).

Uso: python -B dashboard/publicar_quadro.py [--simular] [--projeto rules-ai]
- --simular: imprime o payload e não abre conexão.
- Sem --simular: envia o evento "estado" ao canal "quadro:<projeto>" com a chave secreta lida
  só de SUPABASE_SECRET_KEY (variável de ambiente). A chave nunca é impressa nem gravada.
Contrato: tasks/etapas/ETAPA-031-a3249f9e-MIGRAR-AGENTES-BROADCAST.md (seção da .1).
"""
import sys

sys.dont_write_bytecode = True  # INV-3: o publicador não grava nada no repositório

import argparse
import json
import os
import subprocess
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote

import quadro_tarefas as quadro
from config_graphs import INTERVALO_COLETA_SEGUNDOS, atraso_agentes

RAIZ = Path(__file__).resolve().parent.parent
URL_PADRAO = "https://hxlvonriearllcmfqeri.supabase.co"
VARIAVEL_CHAVE = "SUPABASE_SECRET_KEY"
EVENTO = "estado"
VERSAO_CONTRATO = 1
PROJETOS_PERMITIDOS = ("rules-ai",)  # pergunta 3 da etapa 031: só o rules-ai
LIMITE_BYTES = 200 * 1024  # o Broadcast aceita 256 KB; acima de 200 KB falha com erro claro
TEMPO_LIMITE = 15


def validar_projeto(projeto):
    """ValueError se o projeto for ignorado (C20/C23) ou não estiver na lista permitida (INV-4)."""
    if projeto.startswith(quadro.PREFIXOS_IGNORADOS):
        raise ValueError(f"Projeto proibido (C20/C23): {projeto}")
    if projeto not in PROJETOS_PERMITIDOS:
        raise ValueError(f"Projeto fora da lista permitida: {projeto}")
    return projeto


def git(*argumentos):
    """Saída de um comando git só de leitura no repositório ('' se falhar)."""
    try:
        resultado = subprocess.run(["git", "-C", str(RAIZ), *argumentos], capture_output=True,
                                   text=True, timeout=TEMPO_LIMITE, check=True)
    except (OSError, subprocess.SubprocessError):
        return ""
    return resultado.stdout.strip()


def montar_payload(projeto, simular):
    """Payload do evento 'estado': campos de GET /api/agentes + commit, publicado_em, etc."""
    caminho = RAIZ.joinpath(*quadro.CAMINHO_QUADRO)
    dados = quadro.ler_quadro(caminho)
    data_commit = git("log", "-1", "--format=%cI", "--", "/".join(quadro.CAMINHO_QUADRO))
    return {
        "versao": VERSAO_CONTRATO,
        "projeto": projeto,
        "atualizado_em": data_commit or dados["atualizado_em"],
        "atraso_padrao": atraso_agentes(),
        "intervalo": INTERVALO_COLETA_SEGUNDOS,
        "commit": os.environ.get("GITHUB_SHA") or git("rev-parse", "HEAD"),
        "publicado_em": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "sequencia": 0 if simular else int(os.environ.get("GITHUB_RUN_NUMBER", "0")),
        "tarefas": dados["tarefas"],
    }


def serializar(payload):
    """JSON em bytes; ValueError se passar do limite (nunca corta tarefas)."""
    corpo = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    if len(corpo) > LIMITE_BYTES:
        raise ValueError(f"Payload com {len(corpo)} bytes passa do limite de {LIMITE_BYTES}.")
    return corpo


def enviar(projeto, corpo, chave):
    """POST no endpoint REST de broadcast; RuntimeError (sem a chave) se não vier 2xx."""
    base = os.environ.get("SUPABASE_URL", URL_PADRAO).rstrip("/")
    topico = quote(f"quadro:{projeto}", safe="")
    url = f"{base}/realtime/v1/api/broadcast/{topico}/events/{EVENTO}"
    pedido = urllib.request.Request(url, data=corpo, method="POST", headers={
        "apikey": chave, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(pedido, timeout=TEMPO_LIMITE) as resposta:
            codigo = resposta.status
    except urllib.error.HTTPError as erro:
        raise RuntimeError(f"Broadcast recusado: HTTP {erro.code}") from None
    except (urllib.error.URLError, OSError) as erro:
        raise RuntimeError(f"Falha de rede no envio: {type(erro).__name__}") from None
    if not 200 <= codigo < 300:
        raise RuntimeError(f"Broadcast recusado: HTTP {codigo}")
    return codigo


def ler_argumentos(argv):
    parser = argparse.ArgumentParser(description="Publica o quadro no Supabase Broadcast.")
    parser.add_argument("--simular", action="store_true", help="imprime o payload e não envia")
    parser.add_argument("--projeto", default=PROJETOS_PERMITIDOS[0])
    return parser.parse_args(argv)


def main(argv=None):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    argumentos = ler_argumentos(argv)
    try:
        projeto = validar_projeto(argumentos.projeto)
        payload = montar_payload(projeto, argumentos.simular)
        corpo = serializar(payload)
        if argumentos.simular:
            print(json.dumps(payload, ensure_ascii=False, indent=2))
            return 0
        chave = os.environ.get(VARIAVEL_CHAVE, "").strip()
        if not chave:
            raise RuntimeError(f"Variável {VARIAVEL_CHAVE} ausente.")
        codigo = enviar(projeto, corpo, chave)
    except (ValueError, RuntimeError) as erro:
        print(f"ERRO: {erro}", file=sys.stderr)
        return 1
    print(f"Publicado quadro:{projeto} ({len(payload['tarefas'])} tarefas, "
          f"{len(corpo)} bytes, HTTP {codigo}).")
    return 0


if __name__ == "__main__":
    sys.exit(main())

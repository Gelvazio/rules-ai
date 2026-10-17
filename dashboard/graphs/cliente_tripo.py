"""Chamadas à API da Tripo (texto → 3D). A chave nunca sai do servidor local."""
import json
import urllib.error
import urllib.request

from config_graphs import (
    CAMINHO_SALDO,
    CAMINHO_TAREFA,
    CAMPOS_MODELO_SAIDA,
    TEMPO_LIMITE_SEGUNDOS,
    TIPO_TEXTO_3D,
    URL_BASE_TRIPO,
    chave_tripo,
)


class ErroTripo(Exception):
    """Falha ao falar com a Tripo (rede, chave inválida, saldo, resposta inesperada)."""


def chamar(metodo, caminho, corpo=None):
    """Faz a requisição autenticada e devolve o campo 'data' da resposta."""
    chave = chave_tripo()
    if not chave:
        raise ErroTripo("TRIPO_API_KEY não configurada no dashboard/graphs/.env")
    dados = json.dumps(corpo).encode("utf-8") if corpo is not None else None
    pedido = urllib.request.Request(URL_BASE_TRIPO + caminho, data=dados, method=metodo)
    pedido.add_header("Authorization", f"Bearer {chave}")
    pedido.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(pedido, timeout=TEMPO_LIMITE_SEGUNDOS) as resposta:
            conteudo = json.loads(resposta.read().decode("utf-8"))
    except urllib.error.HTTPError as erro:
        detalhe = erro.read().decode("utf-8", errors="ignore")[:300]
        raise ErroTripo(f"Tripo respondeu {erro.code}: {detalhe}") from erro
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as erro:
        raise ErroTripo(f"Falha de comunicação com a Tripo: {erro}") from erro
    if conteudo.get("code", 0) != 0:
        raise ErroTripo(f"Tripo devolveu erro: {conteudo.get('message', conteudo)}")
    return conteudo.get("data", {})


def criar_tarefa_texto(prompt):
    """Cria a tarefa texto → 3D e devolve o task_id."""
    dados = chamar("POST", CAMINHO_TAREFA, {"type": TIPO_TEXTO_3D, "prompt": prompt})
    if "task_id" not in dados:
        raise ErroTripo(f"Resposta sem task_id: {dados}")
    return dados["task_id"]


def consultar_tarefa(task_id):
    """Status, progresso e URL do modelo (se pronto) de uma tarefa."""
    dados = chamar("GET", f"{CAMINHO_TAREFA}/{task_id}")
    saida = dados.get("output") or {}
    url_modelo = next((saida[c] for c in CAMPOS_MODELO_SAIDA if saida.get(c)), None)
    return {
        "status": dados.get("status", "unknown"),
        "progresso": dados.get("progress", 0),
        "url_modelo": url_modelo,
        "url_imagem": saida.get("rendered_image"),
    }


def consultar_saldo():
    """Saldo de créditos da conta."""
    return chamar("GET", CAMINHO_SALDO)


def baixar(url, destino):
    """Baixa o GLB gerado (as URLs da Tripo são temporárias) para o disco."""
    try:
        with urllib.request.urlopen(url, timeout=TEMPO_LIMITE_SEGUNDOS) as resposta:
            destino.write_bytes(resposta.read())
    except (urllib.error.URLError, TimeoutError) as erro:
        raise ErroTripo(f"Falha ao baixar o modelo: {erro}") from erro

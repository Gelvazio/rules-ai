"""Chamadas à API da Tripo (texto → 3D). A chave nunca sai do servidor local."""
import json
import urllib.error
import urllib.request

from config_graphs import (
    CAMINHO_GERAR_TEXTO,
    CAMINHO_SALDO,
    CAMINHO_TAREFA,
    CAMPOS_IMAGEM_SAIDA,
    CAMPOS_MODELO_SAIDA,
    MODELO_PADRAO,
    TEMPO_LIMITE_SEGUNDOS,
    URL_BASE_TRIPO,
    USER_AGENT,
    chave_tripo,
)


class ErroTripo(Exception):
    """Falha ao falar com a Tripo (rede, chave inválida, saldo, resposta inesperada)."""


def chamar(metodo, caminho, corpo=None, chave=""):
    """Faz a requisição autenticada e devolve o campo 'data' da resposta.

    Usa a chave recebida (do localStorage, via servidor local) ou, sem ela, a do .env.
    """
    chave = chave or chave_tripo()
    if not chave:
        raise ErroTripo("Chave da Tripo não configurada: use a engrenagem ⚙ ou o dashboard/.env")
    dados = json.dumps(corpo).encode("utf-8") if corpo is not None else None
    pedido = urllib.request.Request(URL_BASE_TRIPO + caminho, data=dados, method=metodo)
    pedido.add_header("Authorization", f"Bearer {chave}")
    pedido.add_header("Content-Type", "application/json")
    pedido.add_header("User-Agent", USER_AGENT)  # o Cloudflare da Tripo barra o padrão do urllib (erro 1010)
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


def criar_tarefa_texto(prompt, chave=""):
    """Cria a tarefa texto → 3D (V3) e devolve o task_id."""
    dados = chamar("POST", CAMINHO_GERAR_TEXTO, {"prompt": prompt, "model": MODELO_PADRAO}, chave)
    if "task_id" not in dados:
        raise ErroTripo(f"Resposta sem task_id: {dados}")
    return dados["task_id"]


def consultar_tarefa(task_id, chave=""):
    """Status, progresso e URL do modelo (se pronto) de uma tarefa."""
    dados = chamar("GET", f"{CAMINHO_TAREFA}/{task_id}", chave=chave)
    saida = dados.get("output") or {}
    url_modelo = next((saida[c] for c in CAMPOS_MODELO_SAIDA if saida.get(c)), None)
    return {
        "status": dados.get("status", "unknown"),
        "progresso": dados.get("progress", 0),
        "url_modelo": url_modelo,
        "url_imagem": next((saida[c] for c in CAMPOS_IMAGEM_SAIDA if saida.get(c)), None),
        "creditos": dados.get("credits_consumed"),
    }


def consultar_saldo(chave=""):
    """Saldo de créditos da conta."""
    return chamar("GET", CAMINHO_SALDO, chave=chave)


def baixar(url, destino):
    """Baixa o GLB gerado (as URLs da Tripo são temporárias) para o disco."""
    pedido = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(pedido, timeout=TEMPO_LIMITE_SEGUNDOS) as resposta:
            destino.write_bytes(resposta.read())
    except (urllib.error.URLError, TimeoutError) as erro:
        raise ErroTripo(f"Falha ao baixar o modelo: {erro}") from erro

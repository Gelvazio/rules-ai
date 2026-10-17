"""Constantes do servidor local do 3D GRAPHS AI e leitura do .env."""
import os
from pathlib import Path

PASTA_GRAPHS = Path(__file__).resolve().parent
PASTA_DASHBOARD = PASTA_GRAPHS.parent
PASTA_MODELOS = PASTA_GRAPHS / "modelos"
ARQUIVO_ENV = PASTA_GRAPHS / ".env"

HOST = "127.0.0.1"
PORTA_PADRAO = 8080

# API V3 da Tripo (guia em TRIPO_AI_DOCS.md, lido de developers.tripo3d.ai em 2026-10-17).
URL_BASE_TRIPO = "https://openapi.tripo3d.ai/v3"
CAMINHO_GERAR_TEXTO = "/generation/text-to-model"
CAMINHO_TAREFA = "/tasks"
CAMINHO_SALDO = "/account/balance"
MODELO_PADRAO = "v3.1-20260211"
CAMPOS_MODELO_SAIDA = ("model_url", "pbr_model", "model")
CAMPOS_IMAGEM_SAIDA = ("rendered_image_url", "rendered_image")
STATUS_FINAIS = {"success", "failed", "banned", "expired", "cancelled", "unknown"}

PASTA_CENAS = PASTA_GRAPHS / "cenas"
PASTA_MODELOS_CENAS = PASTA_MODELOS / "cenas"

# Página "Agentes ao vivo": quadro lido a cada pedido e atraso padrão da reprodução.
ARQUIVO_QUADRO = PASTA_DASHBOARD.parent / "tasks" / "STATUS.md"
INTERVALO_COLETA_SEGUNDOS = 10

TEMPO_LIMITE_SEGUNDOS = 60
USER_AGENT = "dashboard-3d-graphs-ai/1.0 (+python urllib)"
TAMANHO_MAX_PROMPT = 1024
CUSTO_CREDITOS = "10 a 20"
VALOR_CREDITO_USD = 0.01


def ler_env():
    """Lê pares CHAVE=valor do .env (sem dependências) e mescla com o ambiente."""
    valores = {}
    if ARQUIVO_ENV.exists():
        for linha in ARQUIVO_ENV.read_text(encoding="utf-8").splitlines():
            linha = linha.strip()
            if linha and not linha.startswith("#") and "=" in linha:
                chave, valor = linha.split("=", 1)
                valores[chave.strip()] = valor.strip().strip('"').strip("'")
    for chave in ("TRIPO_API_KEY", "LIMITE_GERACOES", "ATRASO_AGENTES"):
        if os.environ.get(chave):
            valores[chave] = os.environ[chave]
    return valores


def chave_tripo():
    """Chave da API da Tripo, ou '' se não configurada."""
    return ler_env().get("TRIPO_API_KEY", "")


def limite_geracoes():
    """Máximo de gerações por execução do servidor (proteção de custo)."""
    try:
        return max(0, int(ler_env().get("LIMITE_GERACOES", "5")))
    except ValueError:
        return 5


def atraso_agentes():
    """Segundos entre a mudança no quadro e a animação na página "Agentes ao vivo"."""
    try:
        return max(0, int(ler_env().get("ATRASO_AGENTES", "30")))
    except ValueError:
        return 30

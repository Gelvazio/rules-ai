"""Constantes do servidor local do 3D GRAPHS AI e leitura do .env."""
import os
from pathlib import Path

PASTA_GRAPHS = Path(__file__).resolve().parent
PASTA_DASHBOARD = PASTA_GRAPHS.parent
PASTA_MODELOS = PASTA_GRAPHS / "modelos"
ARQUIVO_ENV = PASTA_GRAPHS / ".env"

HOST = "127.0.0.1"
PORTA_PADRAO = 8080

# API da Tripo (v2). Escrita de memória: a documentação só abre com JavaScript.
# Conferir na primeira geração com chave (ETAPA-013, subtarefa .8).
URL_BASE_TRIPO = "https://api.tripo3d.ai/v2/openapi"
CAMINHO_TAREFA = "/task"
CAMINHO_SALDO = "/user/balance"
TIPO_TEXTO_3D = "text_to_model"
CAMPOS_MODELO_SAIDA = ("pbr_model", "model", "base_model")
STATUS_FINAIS = {"success", "failed", "banned", "expired", "cancelled", "unknown"}

TEMPO_LIMITE_SEGUNDOS = 60
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
    for chave in ("TRIPO_API_KEY", "LIMITE_GERACOES"):
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

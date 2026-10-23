"""Constantes do servidor local dos Agentes ao vivo e leitura do .env."""
import os
from pathlib import Path

PASTA_DASHBOARD = Path(__file__).resolve().parent
ARQUIVO_ENV = PASTA_DASHBOARD / ".env"

HOST = "127.0.0.1"
PORTA_PADRAO = 8080

# Página "Agentes ao vivo": projetos em C:\fontes (cada um com tasks/STATUS.md), o projeto aberto
# por padrão e o intervalo de leitura do quadro.
PASTA_FONTES = PASTA_DASHBOARD.parent.parent
PROJETO_PADRAO = PASTA_DASHBOARD.parent.name
INTERVALO_COLETA_SEGUNDOS = 10


def ler_env():
    """Lê pares CHAVE=valor do .env (sem dependências) e mescla com o ambiente."""
    valores = {}
    if ARQUIVO_ENV.exists():
        for linha in ARQUIVO_ENV.read_text(encoding="utf-8").splitlines():
            linha = linha.strip()
            if linha and not linha.startswith("#") and "=" in linha:
                chave, valor = linha.split("=", 1)
                valores[chave.strip()] = valor.strip().strip('"').strip("'")
    for chave in ("ATRASO_AGENTES",):
        if os.environ.get(chave):
            valores[chave] = os.environ[chave]
    return valores


def atraso_agentes():
    """Segundos entre a mudança no quadro e a animação na página "Agentes ao vivo"."""
    try:
        return max(0, int(ler_env().get("ATRASO_AGENTES", "30")))
    except ValueError:
        return 30

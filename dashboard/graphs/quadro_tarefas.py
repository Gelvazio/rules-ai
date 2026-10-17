"""Leitura do quadro de tarefas (tasks/STATUS.md) para a página "Agentes ao vivo"."""
import re
from datetime import datetime

TITULO_SECAO = "## 📌 Tarefas"
TOTAL_COLUNAS = 8  # Tarefa | Título | Prioridade | Modelo | Depende de | Status | Em uso por | Etapa
STATUS_POR_EMOJI = (("🔄", "progresso"), ("✅", "concluido"), ("⏹", "concluido"),
                    ("⛔", "bloqueado"), ("👀", "aguardando"), ("⬜", "pendente"))
NIVEIS = ("LEVE", "MEDIO", "PESADO")
PADRAO_DESDE = re.compile(r"\(?desde (\d{4}-\d{2}-\d{2} \d{2}:\d{2})\)?")
PADRAO_MARCAS = re.compile(r"[*`]")


def limpar(texto):
    """Tira negrito e crases do Markdown."""
    return PADRAO_MARCAS.sub("", texto).strip()


def linhas_da_tabela(texto):
    """Linhas de dados (sem cabeçalho e separador) da primeira tabela depois do título da seção."""
    inicio = texto.find(TITULO_SECAO)
    if inicio < 0:
        return []
    linhas = []
    for linha in texto[inicio:].splitlines()[1:]:
        if linha.startswith("|"):
            linhas.append(linha)
        elif linhas:
            break
    return linhas[2:]


def celulas(linha):
    return [c.strip() for c in linha.strip().strip("|").split("|")]


def nivel_da_coluna(modelo):
    """LEVE, MEDIO, PESADO, USUARIO ou '' a partir da coluna Modelo."""
    texto = modelo.upper()
    if texto.startswith("USU"):
        return "USUARIO"
    return next((n for n in NIVEIS if n in texto), "")


def status_da_coluna(status):
    return next((chave for emoji, chave in STATUS_POR_EMOJI if emoji in status), "pendente")


def agente_da_coluna(em_uso_por):
    """Nome do agente (sem o trecho 'desde ...') e a hora em que ele reservou."""
    if em_uso_por.startswith("—") or not em_uso_por:
        return "", ""
    desde = PADRAO_DESDE.search(em_uso_por)
    nome = PADRAO_DESDE.sub("", em_uso_por).strip()
    return nome, desde.group(1) if desde else ""


def tarefa_da_linha(colunas, indice):
    """Dict de uma linha do quadro."""
    tarefa = limpar(colunas[0])
    agente, desde = agente_da_coluna(colunas[6])
    return {
        "tarefa": tarefa,
        "titulo": limpar(colunas[1]),
        "pai": tarefa.split(".", 1)[0],
        "mae": "." not in tarefa,
        "nivel": nivel_da_coluna(colunas[3]),
        "status": status_da_coluna(colunas[5]),
        "agente": agente,
        "desde": desde,
        "global": "🌐" in colunas[1],
        "indice": indice,
    }


def ler_quadro(caminho):
    """Tarefas do quadro e a hora da última gravação do arquivo."""
    if not caminho.exists():
        raise ValueError(f"Quadro não encontrado: {caminho}")
    linhas = linhas_da_tabela(caminho.read_text(encoding="utf-8"))
    tarefas = []
    for linha in linhas:
        colunas = celulas(linha)
        if len(colunas) >= TOTAL_COLUNAS and colunas[0]:
            tarefas.append(tarefa_da_linha(colunas, len(tarefas)))
    gravado = datetime.fromtimestamp(caminho.stat().st_mtime).isoformat(timespec="seconds")
    return {"atualizado_em": gravado, "tarefas": tarefas}

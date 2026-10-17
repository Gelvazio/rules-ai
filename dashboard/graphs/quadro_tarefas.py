"""Leitura dos quadros de tarefas (<projeto>/tasks/STATUS.md) para a página "Agentes ao vivo"."""
import re
from datetime import datetime

TITULO_SECAO = "## 📌 Tarefas"
CAMINHO_QUADRO = ("tasks", "STATUS.md")
# Regras C20 e C23: estas pastas nunca são listadas nem lidas.
PREFIXOS_IGNORADOS = ("DEMAIS-PROJETOS-",)
# Cada projeto tem o seu cabeçalho (com ou sem "Modelo", com ou sem "Verificado"): as colunas são
# achadas pelo nome.
COLUNAS = {"tarefa": "Tarefa", "titulo": "Título", "modelo": "Modelo", "status": "Status",
           "em_uso_por": "Em uso por"}
STATUS_POR_EMOJI = (("🔄", "progresso"), ("✅", "concluido"), ("⏹", "concluido"),
                    ("⛔", "bloqueado"), ("👀", "aguardando"), ("⬜", "pendente"))
NIVEIS = ("LEVE", "MEDIO", "PESADO")
PADRAO_DESDE = re.compile(r"\(?desde (\d{4}-\d{2}-\d{2} \d{2}:\d{2})\)?")
PADRAO_MARCAS = re.compile(r"[*`]")
PADRAO_PERCENTUAL = re.compile(r"\s*·\s*(\d{1,3})\s*%\s*$")  # regra C31: "... · 40%" no fim


def limpar(texto):
    """Tira negrito e crases do Markdown."""
    return PADRAO_MARCAS.sub("", texto).strip()


def nome_do_projeto(pasta):
    """'rules-ai' → 'Rules Ai'."""
    return pasta.replace("-", " ").replace("_", " ").title()


def listar_projetos(pasta_fontes):
    """Projetos de C:\\fontes que têm tasks/STATUS.md (sem as pastas ignoradas), em ordem alfabética."""
    projetos = []
    for pasta in sorted(pasta_fontes.iterdir(), key=lambda p: p.name.lower()):
        if pasta.name.startswith(PREFIXOS_IGNORADOS) or pasta.name.startswith("."):
            continue
        if pasta.is_dir() and pasta.joinpath(*CAMINHO_QUADRO).is_file():
            projetos.append({"id": pasta.name, "nome": nome_do_projeto(pasta.name)})
    return projetos


def caminho_do_quadro(pasta_fontes, projeto):
    """Quadro do projeto pedido; ValueError se o id não estiver na lista descoberta."""
    if projeto not in {p["id"] for p in listar_projetos(pasta_fontes)}:
        raise ValueError(f"Projeto sem quadro de tarefas: {projeto}")
    return pasta_fontes.joinpath(projeto, *CAMINHO_QUADRO)


def linhas_da_tabela(texto):
    """Cabeçalho e linhas de dados da primeira tabela depois do título da seção."""
    inicio = texto.find(TITULO_SECAO)
    if inicio < 0:
        return [], []
    linhas = []
    for linha in texto[inicio:].splitlines()[1:]:
        if linha.startswith("|"):
            linhas.append(linha)
        elif linhas:
            break
    if len(linhas) < 2:
        return [], []
    return celulas(linhas[0]), linhas[2:]


def celulas(linha):
    return [c.strip() for c in linha.strip().strip("|").split("|")]


def mapa_de_colunas(cabecalho):
    """chave → índice da coluna, só para as colunas que existem neste quadro."""
    posicoes = {limpar(nome): indice for indice, nome in enumerate(cabecalho)}
    return {chave: posicoes[nome] for chave, nome in COLUNAS.items() if nome in posicoes}


def nivel_da_coluna(modelo):
    """LEVE, MEDIO, PESADO, USUARIO ou '' a partir da coluna Modelo."""
    texto = modelo.upper()
    if texto.startswith("USU"):
        return "USUARIO"
    return next((n for n in NIVEIS if n in texto), "")


def status_da_coluna(status):
    return next((chave for emoji, chave in STATUS_POR_EMOJI if emoji in status), "pendente")


def agente_da_coluna(em_uso_por):
    """Nome do agente (sem 'desde ...' e sem o percentual), a hora da reserva e o percentual (ou None)."""
    if em_uso_por.startswith("—") or not em_uso_por:
        return "", "", None
    percentual = PADRAO_PERCENTUAL.search(em_uso_por)
    texto = PADRAO_PERCENTUAL.sub("", em_uso_por)
    desde = PADRAO_DESDE.search(texto)
    nome = PADRAO_DESDE.sub("", texto).strip()
    progresso = min(int(percentual.group(1)), 100) if percentual else None
    return nome, desde.group(1) if desde else "", progresso


def tarefa_da_linha(colunas, mapa, indice):
    """Dict de uma linha do quadro (coluna ausente neste quadro vira '')."""
    def valor(chave):
        posicao = mapa.get(chave)
        return colunas[posicao] if posicao is not None and posicao < len(colunas) else ""

    tarefa = limpar(valor("tarefa"))
    agente, desde, progresso = agente_da_coluna(valor("em_uso_por"))
    return {
        "tarefa": tarefa,
        "titulo": limpar(valor("titulo")),
        "pai": tarefa.split(".", 1)[0],
        "mae": "." not in tarefa,
        "nivel": nivel_da_coluna(valor("modelo")),
        "status": status_da_coluna(valor("status")),
        "agente": agente,
        "desde": desde,
        "progresso": progresso,
        "global": "🌐" in valor("titulo"),
        "indice": indice,
    }


def ler_quadro(caminho):
    """Tarefas do quadro e a hora da última gravação do arquivo."""
    if not caminho.exists():
        raise ValueError(f"Quadro não encontrado: {caminho}")
    cabecalho, linhas = linhas_da_tabela(caminho.read_text(encoding="utf-8"))
    mapa = mapa_de_colunas(cabecalho)
    if "tarefa" not in mapa or "status" not in mapa:
        raise ValueError("O quadro não tem as colunas Tarefa e Status na tabela de tarefas.")
    tarefas = []
    for linha in linhas:
        colunas = celulas(linha)
        if colunas and colunas[mapa["tarefa"]]:
            tarefas.append(tarefa_da_linha(colunas, mapa, len(tarefas)))
    gravado = datetime.fromtimestamp(caminho.stat().st_mtime).isoformat(timespec="seconds")
    return {"atualizado_em": gravado, "tarefas": tarefas}

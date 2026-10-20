"""Cenas montadas a partir dos prompts (cenas/*.json) e os GLB gerados para cada objeto."""
import json
import re

from config_graphs import PASTA_CENAS, PASTA_MODELOS_CENAS

PADRAO_ID = re.compile(r"^[a-z0-9-]{1,60}$")


def id_valido(valor):
    """Ids de cena e de objeto: minúsculas, números e hífen."""
    return bool(PADRAO_ID.match(valor or ""))


def caminho_glb(cena, objeto):
    """Onde fica o GLB gerado de um objeto da cena."""
    return PASTA_MODELOS_CENAS / cena / f"{objeto}.glb"


def ler_cena(cena):
    """Conteúdo do JSON da cena, ou ValueError se não existir."""
    arquivo = PASTA_CENAS / f"{cena}.json"
    if not id_valido(cena) or not arquivo.exists():
        raise ValueError(f"Cena inexistente: {cena}")
    return json.loads(arquivo.read_text(encoding="utf-8"))


def com_arquivos(dados):
    """Acrescenta a cada objeto o caminho do GLB (relativo a dashboard/) se ele já existir."""
    for objeto in dados["objetos"]:
        glb = caminho_glb(dados["id"], objeto["id"])
        objeto["arquivo"] = f"modelos/cenas/{dados['id']}/{objeto['id']}.glb" if glb.exists() else None
    return dados


def listar_cenas():
    """Todas as cenas com o estado dos GLB de cada objeto."""
    if not PASTA_CENAS.exists():
        return []
    return [com_arquivos(ler_cena(c.stem)) for c in sorted(PASTA_CENAS.glob("*.json"))]


def objeto_da_cena(cena, objeto):
    """Dados de um objeto da cena (para gerar na Tripo), ou ValueError."""
    if not id_valido(objeto):
        raise ValueError("Objeto inválido")
    for item in ler_cena(cena)["objetos"]:
        if item["id"] == objeto:
            return item
    raise ValueError(f"Objeto {objeto} não existe na cena {cena}")

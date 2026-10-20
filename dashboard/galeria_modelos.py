"""Modelos gerados salvos em dashboard/modelos/ (um .glb e um .json de metadados cada)."""
import json
import re
from datetime import datetime

from cliente_tripo import baixar
from config_graphs import PASTA_MODELOS

PADRAO_ID = re.compile(r"^[\w-]{1,80}$")


def id_valido(task_id):
    """Evita caminhos maliciosos: só letras, números, _ e -."""
    return bool(PADRAO_ID.match(task_id or ""))


def ler_meta(task_id):
    """Metadados da tarefa (ou o mínimo, se o arquivo não existir)."""
    caminho = PASTA_MODELOS / f"{task_id}.json"
    return json.loads(caminho.read_text(encoding="utf-8")) if caminho.exists() else {"task_id": task_id}


def gravar_meta(meta):
    PASTA_MODELOS.mkdir(parents=True, exist_ok=True)
    caminho = PASTA_MODELOS / f"{meta['task_id']}.json"
    caminho.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")


def registrar_pedido(task_id, prompt, cena=None, objeto=None):
    """Grava os metadados assim que a tarefa é criada (cena/objeto quando vier de uma cena)."""
    gravar_meta({"task_id": task_id, "prompt": prompt, "cena": cena, "objeto": objeto,
                 "criado_em": datetime.now().isoformat(timespec="seconds"), "arquivo": None})


def destino_do_modelo(meta):
    """Arquivo relativo a modelos/: <task_id>.glb ou cenas/<cena>/<objeto>.glb."""
    if meta.get("cena") and meta.get("objeto"):
        return f"cenas/{meta['cena']}/{meta['objeto']}.glb"
    return f"{meta['task_id']}.glb"


def salvar_modelo(task_id, url_modelo):
    """Baixa o GLB pronto, atualiza os metadados e devolve o arquivo (relativo a modelos/)."""
    meta = ler_meta(task_id)
    arquivo = destino_do_modelo(meta)
    destino = PASTA_MODELOS / arquivo
    destino.parent.mkdir(parents=True, exist_ok=True)
    baixar(url_modelo, destino)
    meta.update({"arquivo": arquivo, "pronto_em": datetime.now().isoformat(timespec="seconds")})
    gravar_meta(meta)
    return arquivo


def arquivo_pronto(task_id):
    """Arquivo do GLB já baixado desta tarefa, ou None."""
    meta = ler_meta(task_id)
    arquivo = meta.get("arquivo")
    return arquivo if arquivo and (PASTA_MODELOS / arquivo).exists() else None


def listar_modelos():
    """Modelos com GLB baixado, do mais novo ao mais antigo."""
    if not PASTA_MODELOS.exists():
        return []
    modelos = []
    for caminho in PASTA_MODELOS.glob("*.json"):
        meta = json.loads(caminho.read_text(encoding="utf-8"))
        if meta.get("cena"):
            continue  # objetos de cena aparecem na página da cena, não na galeria livre
        if meta.get("arquivo") and (PASTA_MODELOS / meta["arquivo"]).exists():
            modelos.append(meta)
    return sorted(modelos, key=lambda m: m.get("criado_em", ""), reverse=True)

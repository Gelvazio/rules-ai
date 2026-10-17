"""Modelos gerados salvos em graphs/modelos/ (um .glb e um .json de metadados cada)."""
import json
import re
from datetime import datetime

from cliente_tripo import baixar
from config_graphs import PASTA_MODELOS

PADRAO_ID = re.compile(r"^[\w-]{1,80}$")


def id_valido(task_id):
    """Evita caminhos maliciosos: só letras, números, _ e -."""
    return bool(PADRAO_ID.match(task_id or ""))


def registrar_pedido(task_id, prompt):
    """Grava os metadados assim que a tarefa é criada."""
    PASTA_MODELOS.mkdir(parents=True, exist_ok=True)
    meta = {"task_id": task_id, "prompt": prompt, "criado_em": datetime.now().isoformat(timespec="seconds"),
            "arquivo": None}
    (PASTA_MODELOS / f"{task_id}.json").write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")


def salvar_modelo(task_id, url_modelo):
    """Baixa o GLB pronto, atualiza os metadados e devolve o nome do arquivo."""
    arquivo = f"{task_id}.glb"
    baixar(url_modelo, PASTA_MODELOS / arquivo)
    caminho_meta = PASTA_MODELOS / f"{task_id}.json"
    meta = json.loads(caminho_meta.read_text(encoding="utf-8")) if caminho_meta.exists() else {"task_id": task_id}
    meta.update({"arquivo": arquivo, "pronto_em": datetime.now().isoformat(timespec="seconds")})
    caminho_meta.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    return arquivo


def arquivo_pronto(task_id):
    """Nome do GLB já baixado, ou None."""
    return f"{task_id}.glb" if (PASTA_MODELOS / f"{task_id}.glb").exists() else None


def listar_modelos():
    """Modelos com GLB baixado, do mais novo ao mais antigo."""
    if not PASTA_MODELOS.exists():
        return []
    modelos = []
    for caminho in PASTA_MODELOS.glob("*.json"):
        meta = json.loads(caminho.read_text(encoding="utf-8"))
        if meta.get("arquivo") and (PASTA_MODELOS / meta["arquivo"]).exists():
            modelos.append(meta)
    return sorted(modelos, key=lambda m: m.get("criado_em", ""), reverse=True)

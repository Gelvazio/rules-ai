"""Servidor local do dashboard com a API do 3D GRAPHS AI.

Uso: python dashboard/graphs/servidor.py [porta]
Abre: http://localhost:8080 (dashboard) e http://localhost:8080/graphs/ (3D GRAPHS AI)
"""
import json
import re
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote

import cenas_prompts as cenas
import galeria_modelos as galeria
from cliente_tripo import ErroTripo, consultar_saldo, consultar_tarefa, criar_tarefa_texto
from config_graphs import (
    CUSTO_CREDITOS,
    HOST,
    PASTA_DASHBOARD,
    PORTA_PADRAO,
    STATUS_FINAIS,
    TAMANHO_MAX_PROMPT,
    VALOR_CREDITO_USD,
    chave_tripo,
    limite_geracoes,
)

geracoes_feitas = 0
EXTENSOES_PROIBIDAS = (".py", ".env", ".pyc")
CABECALHO_CHAVE = "X-Tripo-Key"
PADRAO_CHAVE = re.compile(r"^[\w.-]{8,200}$")


def caminho_proibido(caminho):
    """Nunca servir .env, arquivos ocultos nem código Python do servidor."""
    limpo = unquote(caminho.split("?", 1)[0]).lower()
    return "/." in limpo or limpo.endswith(EXTENSOES_PROIBIDAS) or "__pycache__" in limpo


class Manipulador(SimpleHTTPRequestHandler):
    """Arquivos estáticos do dashboard + rotas /api/ do 3D GRAPHS AI."""

    def chave_do_pedido(self):
        """Chave enviada pelo navegador (localStorage); '' se ausente ou malformada."""
        chave = (self.headers.get(CABECALHO_CHAVE) or "").strip()
        return chave if PADRAO_CHAVE.match(chave) else ""

    def responder(self, codigo, dados):
        corpo = json.dumps(dados, ensure_ascii=False).encode("utf-8")
        self.send_response(codigo)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(corpo)))
        self.end_headers()
        self.wfile.write(corpo)

    def do_GET(self):
        rotas = {"/api/estado": self.rota_estado, "/api/modelos": self.rota_modelos,
                 "/api/saldo": self.rota_saldo, "/api/cenas": self.rota_cenas}
        if self.path in rotas:
            return self.executar(rotas[self.path])
        if self.path.startswith("/api/tarefa/"):
            return self.executar(partial(self.rota_tarefa, self.path.rsplit("/", 1)[-1]))
        if caminho_proibido(self.path):
            return self.responder(404, {"erro": "Arquivo não disponível"})
        return super().do_GET()

    def do_POST(self):
        if self.path == "/api/gerar":
            return self.executar(self.rota_gerar)
        return self.responder(404, {"erro": "Rota inexistente"})

    def executar(self, rota):
        try:
            self.responder(200, rota())
        except ErroTripo as erro:
            self.responder(502, {"erro": str(erro)})
        except ValueError as erro:
            self.responder(400, {"erro": str(erro)})

    def rota_estado(self):
        return {"chave_configurada": bool(chave_tripo()), "chave_no_pedido": bool(self.chave_do_pedido()),
                "custo_creditos": CUSTO_CREDITOS,
                "valor_credito_usd": VALOR_CREDITO_USD, "geracoes_feitas": geracoes_feitas,
                "limite_geracoes": limite_geracoes()}

    def rota_modelos(self):
        return {"modelos": galeria.listar_modelos()}

    def rota_saldo(self):
        return consultar_saldo(self.chave_do_pedido())

    def rota_cenas(self):
        return {"cenas": cenas.listar_cenas()}

    def ler_corpo(self):
        tamanho = int(self.headers.get("Content-Length", 0))
        return json.loads(self.rfile.read(tamanho) or b"{}")

    def rota_gerar(self):
        """Gera por prompt livre ou, com cena+objeto, pelo prompt_tripo definido na cena."""
        global geracoes_feitas
        corpo = self.ler_corpo()
        cena, objeto = corpo.get("cena"), corpo.get("objeto")
        if cena or objeto:
            prompt = cenas.objeto_da_cena(str(cena), str(objeto))["prompt_tripo"]
        else:
            prompt = str(corpo.get("prompt", "")).strip()[:TAMANHO_MAX_PROMPT]
        if not prompt or corpo.get("confirmado") is not True:
            raise ValueError("Informe o prompt e confirme o custo antes de gerar.")
        if geracoes_feitas >= limite_geracoes():
            raise ValueError("Limite de gerações desta execução atingido (LIMITE_GERACOES no .env).")
        task_id = criar_tarefa_texto(prompt, self.chave_do_pedido())
        geracoes_feitas += 1
        galeria.registrar_pedido(task_id, prompt, cena, objeto)
        return {"task_id": task_id}

    def rota_tarefa(self, task_id):
        if not galeria.id_valido(task_id):
            raise ValueError("task_id inválido")
        pronto = galeria.arquivo_pronto(task_id)
        if pronto:
            return {"status": "success", "progresso": 100, "arquivo": pronto}
        estado = consultar_tarefa(task_id, self.chave_do_pedido())
        if estado["status"] == "success" and estado["url_modelo"]:
            estado["arquivo"] = galeria.salvar_modelo(task_id, estado["url_modelo"])
        estado["final"] = estado["status"] in STATUS_FINAIS
        return estado


def main():
    porta = int(sys.argv[1]) if len(sys.argv) > 1 else PORTA_PADRAO
    manipulador = partial(Manipulador, directory=str(PASTA_DASHBOARD))
    servidor = ThreadingHTTPServer((HOST, porta), manipulador)
    situacao = "configurada" if chave_tripo() else "NÃO configurada (só visualização)"
    print(f"Dashboard: http://localhost:{porta}/  ·  3D GRAPHS AI: http://localhost:{porta}/graphs/")
    print(f"Chave da Tripo: {situacao}. Ctrl+C para parar.")
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        servidor.server_close()


if __name__ == "__main__":
    main()

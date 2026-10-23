"""Servidor local do dashboard com a API dos Agentes ao vivo.

Uso: python dashboard/servidor.py [porta]
Abre: http://localhost:8080 (dashboard "Agentes ao vivo")
"""
import json
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, unquote, urlsplit

import quadro_tarefas as quadro
from config_graphs import (
    HOST,
    INTERVALO_COLETA_SEGUNDOS,
    PASTA_FONTES,
    PASTA_DASHBOARD,
    PORTA_PADRAO,
    PROJETO_PADRAO,
    atraso_agentes,
)

EXTENSOES_PROIBIDAS = (".py", ".env", ".pyc")


def caminho_proibido(caminho):
    """Nunca servir .env, arquivos ocultos nem código Python do servidor."""
    limpo = unquote(caminho.split("?", 1)[0]).lower()
    return "/." in limpo or limpo.endswith(EXTENSOES_PROIBIDAS) or "__pycache__" in limpo


class Manipulador(SimpleHTTPRequestHandler):
    """Arquivos estáticos do dashboard + rotas /api/ dos Agentes ao vivo."""

    def responder(self, codigo, dados):
        corpo = json.dumps(dados, ensure_ascii=False).encode("utf-8")
        self.send_response(codigo)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(corpo)))
        self.end_headers()
        self.wfile.write(corpo)

    def do_GET(self):
        rotas = {"/api/agentes": self.rota_agentes, "/api/projetos": self.rota_projetos}
        caminho = urlsplit(self.path).path
        if caminho in rotas:
            return self.executar(rotas[caminho])
        if caminho_proibido(self.path):
            return self.responder(404, {"erro": "Arquivo não disponível"})
        return super().do_GET()

    def do_POST(self):
        return self.responder(404, {"erro": "Rota inexistente"})

    def executar(self, rota):
        try:
            self.responder(200, rota())
        except ValueError as erro:
            self.responder(400, {"erro": str(erro)})

    def rota_agentes(self):
        """Tarefas do quadro do projeto (?projeto=<pasta>, só leitura), com o atraso e o intervalo."""
        projeto = parse_qs(urlsplit(self.path).query).get("projeto", [PROJETO_PADRAO])[0]
        dados = quadro.ler_quadro(quadro.caminho_do_quadro(PASTA_FONTES, projeto))
        return {**dados, "projeto": projeto, "atraso_padrao": atraso_agentes(),
                "intervalo": INTERVALO_COLETA_SEGUNDOS}

    def rota_projetos(self):
        """Projetos com quadro de tarefas (sem as pastas DEMAIS-PROJETOS-*, regras C20/C23)."""
        return {"padrao": PROJETO_PADRAO, "projetos": quadro.listar_projetos(PASTA_FONTES)}


def main():
    porta = int(sys.argv[1]) if len(sys.argv) > 1 else PORTA_PADRAO
    manipulador = partial(Manipulador, directory=str(PASTA_DASHBOARD))
    servidor = ThreadingHTTPServer((HOST, porta), manipulador)
    print(f"Dashboard: http://localhost:{porta}/")
    print("Ctrl+C para parar.")
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        servidor.server_close()


if __name__ == "__main__":
    main()

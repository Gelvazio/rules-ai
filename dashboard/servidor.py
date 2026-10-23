"""Servidor local de arquivos estáticos do dashboard (sem rotas /api/; a página lê o GitHub).

Uso: python dashboard/servidor.py [porta]
Abre: http://localhost:8080 (dashboard "Agentes ao vivo")
"""
import json
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote

from config_graphs import HOST, PASTA_DASHBOARD, PORTA_PADRAO

EXTENSOES_PROIBIDAS = (".py", ".env", ".pyc")


def caminho_proibido(caminho):
    """Nunca servir .env, arquivos ocultos nem código Python do servidor."""
    limpo = unquote(caminho.split("?", 1)[0]).lower()
    return "/." in limpo or limpo.endswith(EXTENSOES_PROIBIDAS) or "__pycache__" in limpo


class Manipulador(SimpleHTTPRequestHandler):
    """Arquivos estáticos do dashboard, sem servir .env, ocultos nem código Python."""

    def responder(self, codigo, dados):
        """Responde com JSON (usado só para recusar caminhos proibidos)."""
        corpo = json.dumps(dados, ensure_ascii=False).encode("utf-8")
        self.send_response(codigo)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(corpo)))
        self.end_headers()
        self.wfile.write(corpo)

    def do_GET(self):
        """Serve o arquivo estático, exceto os caminhos proibidos."""
        if caminho_proibido(self.path):
            return self.responder(404, {"erro": "Arquivo não disponível"})
        return super().do_GET()


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

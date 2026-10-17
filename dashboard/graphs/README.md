# 3D GRAPHS AI

Página do dashboard que gera modelos 3D por IA a partir de texto e os mostra num visualizador
Three.js 0.170.0 (girar, aproximar). Abre pelo menu **3D GRAPHS AI** do `dashboard/index.html`.

## API escolhida: Tripo (a mais barata da coleta)

| API | Cobrança | Custo de 1 modelo |
|---|---|---|
| **Tripo** | Paga pelo uso, sem assinatura (1 crédito = US$ 0,01) | Texto → 3D: 10 a 20 créditos = US$ 0,10 a 0,20 |
| Hyper3D Rodin | API só no plano Business | US$ 96/mês |
| Hi3D | Sem preço de API na página | `nao_verificado` |
| Kling | API de vídeo e imagem, não gera 3D | — |

Fonte: `dashboard/scripts/saida/coleta.json` (coleta de 2026-10-17).

## Como usar

1. Informe a chave da Tripo (crie em https://platform.tripo3d.ai) de um destes jeitos:
   - **Engrenagem ⚙** no cabeçalho da página: abre um modal que salva a chave no `localStorage`
     deste navegador (mostrar/ocultar e remover). O front manda a chave só ao servidor local, no
     cabeçalho `X-Tripo-Key`, e ele a repassa à Tripo.
   - **`.env`**: copie `.env.example` para `.env` (fora do Git) e preencha `TRIPO_API_KEY`.
     Vale quando o navegador não mandou chave.

   Sem chave, a página abre, mostra a galeria e um exemplo procedural, e o Gerar fica desligado.
   Cuidado: no `localStorage` a chave fica legível por qualquer script da página (inclusive o
   Three.js do CDN); para uso local isso basta, mas não publique esta página na internet.
2. Rode, a partir de `C:\fontes\rules-ai`:

   ```
   python dashboard/graphs/servidor.py
   ```

3. Abra http://localhost:8080/ (dashboard) ou http://localhost:8080/graphs/.

Cada geração pede confirmação de custo; o servidor aceita no máximo `LIMITE_GERACOES` (padrão 5)
por execução. Os GLB gerados ficam em `graphs/modelos/` (fora do Git).

## Arquivos

- `servidor.py`: serve o dashboard e as rotas `/api/estado`, `/api/modelos`, `/api/gerar`,
  `/api/tarefa/<id>`, `/api/saldo`. Nunca serve `.env`, arquivos ocultos nem `.py`.
- `cliente_tripo.py`: chamadas à Tripo (a chave só existe aqui).
- `galeria_modelos.py`: grava e lista os modelos em `modelos/`.
- `config_graphs.py`: constantes e leitura do `.env`.
- `index.html`, `assets/css/graphs.css`, `assets/js/` (`principal.js`, `api.js`,
  `visualizador.js`, `config.js`, `chave.js` e `modal-config.js` do ícone ⚙).

## Pendente

- **Conferido (2026-10-17 16:18):** URL base `https://api.tripo3d.ai/v2/openapi` e autenticação
  `Authorization: Bearer <chave>` (uma chave falsa recebe `401 {"code":1002,"message":"Authentication failed"}`).
  O Cloudflare da Tripo barra o User-Agent padrão do Python (erro 1010); o cliente manda um próprio.
- **A conferir com chave válida:** corpo `{"type":"text_to_model","prompt":...}`, campos
  `data.task_id`, `data.status`, `data.progress`, `data.output.pbr_model`/`model` e `/user/balance`.
  Se algo mudar, ajuste só `config_graphs.py` e `cliente_tripo.py`.

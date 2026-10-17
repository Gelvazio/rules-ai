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

O **saldo de créditos** aparece no cabeçalho, ao lado da ⚙ (verde com 10 ou mais créditos, vermelho abaixo disso, e os créditos reservados por gerações em andamento). Ele atualiza ao abrir a página, ao salvar a chave e depois de cada geração.

Cada geração pede confirmação de custo; o servidor aceita no máximo `LIMITE_GERACOES` (padrão 5)
por execução. Os GLB gerados ficam em `graphs/modelos/` (fora do Git).

## Cena do prompt 04 (`cena.html`)

Link **"Cena do prompt 04"** no cabeçalho do 3D GRAPHS AI. Mostra em 3D o prompt
`dashboard/prompts/MODELO-3D-REDE-NEURAL-04.md`: 3 personagens, 25 assentos, o hexágono do agente
ligando-se aos assentos por linhas verdes com nós vermelhos, cursor azul e contadores, com Pausar,
Reiniciar e velocidade (1x/2x/4x). Os objetos ficam em `cenas/prompt-04.json` (prompts em inglês
para a Tripo). Sem modelos gerados, cada objeto usa uma **forma simples**; o botão
"Gerar os que faltam" (com chave e confirmação do custo) gera cada objeto na Tripo e salva em
`modelos/cenas/prompt-04/<objeto>.glb`, e a cena passa a usar o GLB.

## Agentes ao vivo (`agentes.html`)

Mostra em 3D o trabalho real dos agentes, lido de `rules-ai/tasks/STATUS.md` pela rota
`/api/agentes` (só leitura). Tela inteira, só com o menu em cima. As tarefas pendentes formam um
**globo** no centro (bloqueadas piscam em vermelho e as que aguardam o usuário em amarelo); cada nome
da coluna "Em uso por" vira um personagem que **orbita** o globo, com o nome escrito em cima e as
tarefas que está fazendo girando em volta dele, ligadas por uma linha; as concluídas vão para um
**anel** externo. Cor do cartão pelo nível. Reservar e concluir viram voos do cartão. A página lê o quadro a cada 10 s e anima cada mudança só depois do **atraso**
(padrão 30 s, `ATRASO_AGENTES` no `.env`; o seletor na tela vale para o navegador). Precisa do
servidor local reiniciado depois desta versão.

## Menu

`assets/js/menu.js` monta o mesmo menu em todas as páginas (`<nav data-menu>`). Para acrescentar uma
página, basta uma linha em `ITENS_MENU`.

## Arquivos

- `TRIPO_AI_DOCS.md`: guia da API (V3) e dos SDKs da Tripo, com a migração V2 → V3.

- `servidor.py`: serve o dashboard e as rotas `/api/estado`, `/api/modelos`, `/api/gerar`,
  `/api/tarefa/<id>`, `/api/saldo` (devolve `saldo` e `congelado`), `/api/cenas`, `/api/agentes`. Nunca serve `.env`, arquivos ocultos nem `.py`.
- `cliente_tripo.py`: chamadas à Tripo (usa a chave do cabeçalho `X-Tripo-Key` ou a do `.env`).
- `galeria_modelos.py`: grava e lista os modelos em `modelos/`.
- `config_graphs.py`: constantes (API V3) e leitura do `.env`.
- `cenas_prompts.py` e `cenas/*.json`: cenas montadas a partir dos prompts e os GLB de cada objeto.
- `cena.html`, `assets/js/cena.js` e `assets/js/cenas/` (linha do tempo, formas simples, cena do prompt 04, painel).
- `quadro_tarefas.py`: lê a tabela do `tasks/STATUS.md` para `/api/agentes`.
- `agentes.html`, `assets/js/agentes.js` e `assets/js/agentes/` (fila com atraso, cena, personagens, rótulos, painéis).
- `assets/js/menu.js`: menu único das páginas.
- `index.html`, `assets/css/graphs.css`, `assets/js/` (`principal.js`, `api.js`,
  `visualizador.js`, `config.js`, `chave.js` e `modal-config.js` do ícone ⚙).

## Situação da API

- **V3** desde 2026-10-17 16:44 (`https://openapi.tripo3d.ai/v3`): `POST /generation/text-to-model` com
  `{"prompt", "model": "v3.1-20260211"}`, `GET /tasks/{id}` (saída em `output.model_url`) e
  `GET /account/balance`. Uma chave falsa recebe `401 {"code":2,"message":"Invalid API key"}`
  nas três rotas. O corpo completo da resposta ainda precisa ser conferido numa geração real.
- O Cloudflare da Tripo barra o User-Agent padrão do Python (erro 1010); o cliente manda um próprio.
- Guia completo: `TRIPO_AI_DOCS.md`.

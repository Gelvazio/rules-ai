## Etapa 013-1b79ba45 — DASHBOARD-REDE-NEURAL: visualização 3D das camadas de uma rede neural

**Tarefa:** DASHBOARD-REDE-NEURAL · **Pedido em:** 2026-10-17 17:19 · **Criada por:** Claude Code (Opus 5.5) (local · main)
**Pedido:** "crie 1 task, pra criar isso em *rules-ai* numa pasta de nome dashboard", depois da
análise do reel `instagram.com/techwith.ram/reel/DeIyAuUJ_eb` ("3D visualisation of layers of
Neural Network", com o cálculo dos pesos em cada nó oculto e a probabilidade na saída).
**Objetivo:** criar em `C:\fontes\rules-ai\dashboard\` uma página estática com Three.js que mostra
uma rede neural em 3D, propaga o sinal camada por camada, explica o cálculo de cada neurônio e
mostra as probabilidades da saída.

> 🟠 **Tarefa grande** (estrutura nova com vários arquivos ligados e cena 3D inteira): o plano é
> esta etapa e a execução **só começa depois do "sim" do usuário**.

### Escopo

**Entra:**
- Pasta `dashboard/` com `index.html` (só estrutura + import map), `assets/css/` e `assets/js/`
  (ES modules, sem bundler e sem `package.json`), e um `README.md` curto (como abrir).
- Rede totalmente conectada fixa: 4 entradas → 6 → 5 ocultos → 3 saídas; pesos e vieses gerados
  com **semente fixa** (mesmo resultado a cada abertura).
- Propagação: `z = Σ(entrada × peso) + viés`, ReLU nas ocultas e softmax na saída.
- Cena: neurônios como esferas, uma camada atrás da outra; ligações com cor pelo sinal do peso
  (azul negativo, vermelho positivo) e espessura/opacidade pelo tamanho; botão **Propagar** anima
  as camadas acendendo em sequência; `OrbitControls`; rótulos com `CSS2DRenderer`.
- Clique num neurônio oculto ou de saída → painel 2D com o cálculo completo daquele nó.
- Painel com os 4 valores de entrada editáveis e as barras de probabilidade das 3 saídas.
- Three.js `0.170.0` exato pelo `cdn.jsdelivr.net` (nunca `@latest`); cores e medidas em
  constantes nomeadas e tokens `:root`.

**Não entra:**
- Treinar rede de verdade, ler pesos de arquivo externo (fica como ideia para depois).
- Qualquer chamada a API de IA, token, chave, login ou banco.
- Efeitos pesados (bloom, partículas): só se o usuário pedir numa tarefa nova.
- Publicar (GitHub Pages) e mexer em outras pastas do `rules-ai`.

### Critério de pronto

- `node --check` passa em todo `.js`; `grep -rniE "anthropic|openai|gemini|api[_-]?key|process\.env" dashboard`
  não acha nada; os únicos hosts de rede são `cdn.jsdelivr.net`.
- O modelo da rede roda com `node` (sem DOM) e imprime ativações e probabilidades que somam 1.
- Limites do código: arquivo ≤ 1000 linhas, função ≤ 45, linha ≤ 100, JSDoc, nomes em português.
- O visual (cores, animação, clique) é conferido **pelo usuário** no navegador
  (`python -m http.server 8080` dentro de `dashboard/`), porque a IA não abre navegador.

### Riscos

| Risco | Plano B |
|---|---|
| ES modules não abrem com duplo clique (`file://`) | README explica o `python -m http.server`; sem servidor de desenvolvimento |
| Muitas linhas (4·6 + 6·5 + 5·3 = 69) pesam ou poluem a cena | Opacidade pelo peso e esconder pesos pequenos com um botão |
| `dist` está no `.gitignore` do `rules-ai` | A pasta se chama `dashboard`, não cai no ignore; conferir com `git check-ignore` |

### DASHBOARD-REDE-NEURAL.1 — Estrutura da pasta `dashboard/`

**Próximo passo:** — (entregue).

- **Nível:** LEVE — HTML de estrutura, CSS de tokens e `.md`, sem lógica.
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** `dashboard/index.html` (import map do `three@0.170.0` e addons, áreas da cena e do
  painel, sem CSS/JS inline), `dashboard/assets/css/base.css` (tokens `:root`, layout),
  `dashboard/assets/css/painel.css` e `dashboard/README.md` (o que é e como abrir).
- **Critérios de aceitação:** sem `style=""`/`onclick`; versão exata do Three.js; README com o
  comando do servidor estático.
- **Entrega (2026-10-17 17:23, Haiku 5.5 · executor-leve; líder Opus 5.5):** `dashboard/index.html`, `assets/css/base.css`, `assets/css/painel.css`, `README.md`.
- **Verificação (líder):** import map com `three@0.170.0` exato; sem `style=""`/`onclick`; nenhuma linha > 100; `git check-ignore` não ignora a pasta.

### DASHBOARD-REDE-NEURAL.2 — Modelo da rede (pesos e propagação)

**Próximo passo:** — (entregue).

- **Nível:** MEDIO — lógica em JS em 1 a 3 arquivos, sem DOM.
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** `assets/js/config/rede.js` (tamanhos das camadas, semente, constantes) e
  `assets/js/rede/rede-neural.js` (gerador com semente, pesos/vieses, `propagar(entradas)` que
  devolve, por camada e por neurônio, `z`, ativação e as parcelas `entrada × peso`; ReLU e
  softmax).
- **Critérios de aceitação:** roda com `node`; probabilidades somam 1; mesma semente = mesmos pesos.
- **Entrega (2026-10-17 17:24, Sonnet 5.5 · executor-medio; líder Opus 5.5):** `assets/js/config/rede.js` e `assets/js/rede/rede-neural.js` (`criarRede`, `propagar`, `relu`, `softmax`, gerador mulberry32).
- **Verificação (líder):** `node --check` ok; conferência com `node` fora do repositório: probabilidades [0,378; 0,355; 0,267], soma 1; mesma semente = mesmos pesos; erros em português para tamanhos e entradas inválidos.

### DASHBOARD-REDE-NEURAL.3 — Cena 3D com propagação animada

**Próximo passo:** criar a cena em assets/js/cena/, cores.js e principal.js (reservada 2026-10-17 17:24).

- **Nível:** PESADO — cena 3D inteira, mais de 3 arquivos ligados.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** `assets/js/cena/` (renderer, câmera, luzes, `OrbitControls`, neurônios, ligações,
  rótulos `CSS2DRenderer`, animação camada a camada com `requestAnimationFrame`, seleção por clique
  com `Raycaster`), `assets/js/config/cores.js` e `assets/js/principal.js` ligando modelo → cena.
- **Critérios de aceitação:** `node --check` em todos; a cena só lê o modelo (não calcula nada);
  clique emite o neurônio escolhido para o painel.

### DASHBOARD-REDE-NEURAL.4 — Painel 2D (cálculo, entradas e probabilidades)

**Próximo passo:** esperar a `.3`.

- **Nível:** MEDIO — tela em JS, 1 a 3 arquivos.
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** `assets/js/tela/painel.js`: campos dos 4 valores de entrada, botão Propagar,
  cálculo detalhado do neurônio clicado (`Σ(entrada × peso) + viés = z → ativação`) e barras de
  probabilidade das saídas.
- **Critérios de aceitação:** sem regra de cálculo no painel (usa o resultado do modelo); números
  com 3 casas; `node --check` passa.

### DASHBOARD-REDE-NEURAL.5 — Aceite do usuário

**Próximo passo:** esperar a `.4`; o usuário abre a página e confere o visual.

- **Nível:** —
- **Modelo:** Usuário · effort low
- **Descrição:** conferir no navegador cores, animação, clique e probabilidades.

### DASHBOARD-REDE-NEURAL.6 — Coletor Python dos links do `dashboard/CLAUDE.md`

**Status:** ✅ entregue 2026-10-17 15:25. Coleta de 15:22: L04, L05, L06, L08, L09 e L10 acessados; L07 bloqueado por verificação anti-bot; L01–L03 manuais; 403 nas extras da Tripo e do Canva; cotação 5,0627.

- **Nível:** MEDIO — script Python com 4 arquivos pequenos, roteiro pronto no `WEB-SCRAP.md`.
- **Modelo:** executada pelo Opus 5.5 a pedido do usuário
- **Effort:** medium
- **Descrição:** `dashboard/scripts/` com `config_coleta.py`, `extrator_pagina.py`, `cotacao.py`,
  `coletar.py` e `requirements.txt`; Playwright para os sites em JavaScript (L04–L10), mais as
  páginas de preço/API/termos achadas; cotação USD-BRL da AwesomeAPI. L01–L03 (Instagram) ficam
  `nao_verificado` (coleta manual). Saída em `dashboard/scripts/saida/coleta.json` (fora do Git).
- **Critérios de aceitação:** `py_compile` passa; a execução grava um JSON válido; falhas
  (timeout, 403, captcha) ficam registradas sem burlar proteção.

### DASHBOARD-REDE-NEURAL.7 — Aba "Ferramentas de IA 3D" no `index.html`

**Status:** ✅ entregue 2026-10-17 15:44. Aba com resumo (coleta, cotação, 10/10 links com dados), tabela comparativa, cartões L04–L10 e reels L01–L03 com legenda; aba da rede neural intacta.

- **Nível:** MEDIO — gerador Python + tela em JS/CSS.
- **Modelo:** executada pelo Opus 5.5 a pedido do usuário
- **Effort:** medium
- **Descrição:** `scripts/gerar_dados_painel.py` lê `scripts/saida/coleta.json` e as páginas salvas em
  `MODELOS-DE-IA/` e grava `assets/js/dados/ferramentas.js` (sem o texto bruto das páginas);
  `assets/js/ferramentas/` desenha a aba (cards por link, preços em US$ e R$, formatos, reels).
  A aba da rede neural continua igual.
- **Critérios de aceitação:** `py_compile` e `node --check` passam; a aba abre sem depender do
  `principal.js` (cena 3D, `.3`).

### DASHBOARD-REDE-NEURAL.8 — Menu "3D GRAPHS AI" e pasta `dashboard/graphs/`

**Status:** ✅ entregue 2026-10-17 15:53. Servidor testado sem chave real (rotas, bloqueio de `.env`/`.py`, confirmação de custo, `task_id` inválido); geração real depende da chave do usuário.

- **Nível:** PESADO — pasta nova, servidor + integração com API paga + cena 3D.
- **Modelo:** Opus 5.5 (a pedido do usuário)
- **Effort:** high
- **Descrição:** botão "3D GRAPHS AI" no cabeçalho do `index.html` (link na mesma aba) para
  `graphs/index.html`: visualizador Three.js 0.170.0 de GLB, campo de prompt e botão Gerar
  (texto → 3D na API da Tripo, a mais barata da coleta: 1 crédito = US$ 0,01, 10–20 créditos por
  modelo), progresso e galeria. `graphs/servidor.py` (biblioteca padrão) serve o dashboard e
  repassa as chamadas com a `TRIPO_API_KEY` do `.env` (fora do Git); GLB salvos em
  `graphs/modelos/` (fora do Git). Sem chave: a página abre, mostra a galeria e um exemplo
  procedural, e o Gerar fica desligado.
- **Critérios de aceitação:** `py_compile` e `node --check` passam; servidor sobe e responde
  `/api/estado` sem chave; nenhuma chave no front-end; confirmação de custo antes de gerar.
- **Pendente:** endpoints da Tripo escritos de memória (docs só abrem com JavaScript); conferir
  na primeira geração com chave.

## Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-17 17:19 | Tarefa criada só com o plano; execução depende do "sim" do usuário | Claude Code (Opus 5.5) | Tarefa grande (estrutura nova, cena 3D inteira) |
| 2026-10-17 17:21 | Plano aprovado; execução pelo líder Opus 5.5 com agentes por nível (Haiku .1, Sonnet .2 e .4, Opus .3) | Gelvazio | "sim, aprovo o plano da DASHBOARD-REDE-NEURAL (etapa 013)" |
| 2026-10-17 15:03 | `.6` criada (C26): coletor Python dos links do `dashboard/CLAUDE.md` | Gelvazio | "crie 1 pasta scripts nele crie e rode o app em python que coleta os dados dos sites solicitados" |
| 2026-10-17 15:37 | `.7` criada (C26): aba de ferramentas no `index.html` | Gelvazio | "leia coleta.json e atualize o dashboard em index.html com as informacoes..." |
| 2026-10-17 15:50 | `.8` criada (C26): `graphs/` com a API da Tripo; sem chave, só texto → 3D, mesma aba | Gelvazio | Respostas às perguntas da tarefa |

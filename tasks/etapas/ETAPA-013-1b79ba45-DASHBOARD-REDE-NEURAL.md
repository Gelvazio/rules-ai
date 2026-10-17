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
- **Pendente:** URL base e auth conferidas em 2026-10-17 16:18 (401 com chave falsa); corpo da tarefa e campos
  de saída a conferir na primeira geração com chave válida.

### DASHBOARD-REDE-NEURAL.9 — Ícone de configuração e chave no `localStorage`

**Status:** ✅ entregue 2026-10-17 16:18. Testado: chave do cabeçalho tem prioridade, `.env` como alternativa, chave malformada ignorada, chave não aparece no log; Tripo real responde 401 a chave falsa (URL base e auth confirmadas, erro 1010 do Cloudflare corrigido com User-Agent).

- **Nível:** MEDIO — modal em JS + ajuste no servidor.
- **Modelo:** Opus 5.5 (a pedido do usuário)
- **Effort:** medium
- **Descrição:** engrenagem no cabeçalho de `graphs/index.html` abre um `<dialog>` para salvar,
  mostrar/ocultar e remover a chave da Tripo no `localStorage`. O front manda a chave no
  cabeçalho `X-Tripo-Key` só para o servidor local, que a repassa à Tripo; sem ela, vale o `.env`.
- **Critérios de aceitação:** `py_compile` e `node --check` passam; o servidor usa a chave do
  cabeçalho e cai no `.env` sem ela; a chave nunca aparece em resposta nem em log.

### DASHBOARD-REDE-NEURAL.10 — Pasta `dashboard/prompts/`

**Status:** ✅ entregue 2026-10-17 16:21.

- **Nível:** LEVE — 1 pasta com README (o Git não versiona pasta vazia).
- **Descrição:** pasta para guardar os prompts do dashboard, um `.md` por prompt.

### DASHBOARD-REDE-NEURAL.11 — Um prompt por imagem em `dashboard/prompts/`

**Status:** ✅ entregue 2026-10-17 16:31.

- **Nível:** MEDIO — ler 4 imagens e escrever 4 prompts.
- **Descrição:** `MODELO-3D-REDE-NEURAL-01.md` a `04.md`, cada um com a descrição da imagem e um
  prompt pronto para recriar a tela como página HTML: 01 orquestrador de agentes em anel; 02
  infográfico "1 agente no lugar de 25 assentos"; 03 painel de robô com toro 3D de partículas
  (Three.js); 04 animação do infográfico 02. Nomes genéricos e dados fictícios com aviso. As
  imagens `.png` (capturas de reels de terceiros) ficam fora do commit.

### DASHBOARD-REDE-NEURAL.12 — Prompts independentes

**Status:** ✅ entregue 2026-10-17 16:34.

- **Nível:** LEVE — ajuste de 2 prompts e do README da pasta.
- **Descrição:** nenhum prompt cita outro prompt nem outra imagem. O 04 foi reescrito como
  infográfico completo com foco na animação da rede do agente; o 02 perdeu a menção ao 04.

### DASHBOARD-REDE-NEURAL.13 — Guia `graphs/TRIPO_AI_DOCS.md`

**Status:** ✅ entregue 2026-10-17 16:38.

- **Nível:** MEDIO — leitura de 8 páginas da documentação e escrita do guia.
- **Descrição:** como obter a chave, fluxo REST V3 (criar, consultar, baixar), os 5 SDKs (JS,
  Python, Go, Rust, Java), endpoints, versões, créditos, limites, erros e divergências da
  documentação. Não lidas (só abrem com JavaScript): "Texto para modelo 3D" e "Modelos".
- **Achado:** a API atual é a V3 (`https://openapi.tripo3d.ai/v3`); o `graphs/` usa a V2. A
  seção 11 do guia lista o que mudar para migrar.

### DASHBOARD-REDE-NEURAL.14 — Prompt 04 no 3D GRAPHS AI com a API da Tripo (plano)

**Respostas (2026-10-17 16:40):** 1 formas simples primeiro; 2 migrar para a V3; 3 prompts em inglês.

**Status:** ✅ entregue 2026-10-17 16:44. Cena 3D do prompt 04 em `graphs/cena.html` com formas simples; cliente migrado para a V3 (401 com chave falsa nas 3 rotas); geração dos 5 objetos pronta, mas não executada (decisão do usuário: formas primeiro). Plano original abaixo: (criada 2026-10-17 16:39).

- **Nível:** PESADO — leitor de prompts no servidor, geração em lote na Tripo, cena 3D nova com
  animação; vários arquivos ligados e gasto de créditos.
- **Modelo:** só Opus 5.5+ ou Fable · **Effort:** high
- **Depende de:** `.9` (chave no navegador) e `.13` (guia da API; decidir V2 ou V3).

**Problema:** o `MODELO-3D-REDE-NEURAL-04.md` descreve uma **página HTML** (infográfico com
cartões, kanban, rosca, Sankey e animação). A Tripo texto → 3D gera **um objeto por chamada** a
partir de uma frase curta. O prompt não pode ser enviado inteiro.

**Plano:**
1. **Objetos do prompt 04** → arquivo `dashboard/graphs/cenas/prompt-04.json` (o `.md` do prompt
   não muda): lista dos objetos 3D com um prompt curto em inglês para a Tripo e o papel na cena.
   Proposta inicial (5 gerações, cerca de 50 a 100 créditos = US$ 0,50 a 1,00):
   | Objeto | Prompt para a Tripo | Papel |
   |---|---|---|
   | Agente planejador | "orange pixelated voxel cube character, cute, game asset" | personagem 1 |
   | Agente testador | "glossy glowing blue sphere character with simple eyes" | personagem 2 |
   | Agente revisor | "glossy glowing pink sphere character with simple eyes" | personagem 3 |
   | Hexágono do agente | "neon hexagonal badge, sci-fi, emissive red edges" | núcleo da rede |
   | Assento | "minimal low poly office chair" | repetido 25 vezes (instâncias) |
2. **Servidor:** rota `GET /api/cenas` (lista os `.json` de `graphs/cenas/`) e geração em lote
   reaproveitando `/api/gerar` (1 tarefa por objeto, com confirmação do custo total e o
   `LIMITE_GERACOES`); cada GLB salvo com o id do objeto (`prompt-04/<objeto>.glb`).
3. **Página:** no 3D GRAPHS AI, seletor "Cena do prompt" com a 04; mostra os objetos, quais já
   têm GLB e o botão "Gerar os que faltam" com o custo somado.
4. **Cena 3D animada** (`graphs/assets/js/cenas/prompt-04.js`), fiel ao prompt 04 em 3D:
   os 3 personagens no alto; 25 assentos em fila (InstancedMesh do GLB do assento); o hexágono à
   direita; um relógio único (0 a 1) que assume os assentos um a um até 15 de 25; linhas verdes do
   hexágono a cada assento com nó vermelho pulsante; cursor azul; contadores em HTML sobre a cena;
   Pausar/Continuar, Reiniciar e velocidade 1x/2x/4x; `prefers-reduced-motion` mostra o estado
   final. Enquanto um GLB não existir, usa uma forma simples no lugar (cubo, esfera, hexágono).
5. Documentar no `graphs/README.md` e registrar as gerações feitas (task_id, créditos).

**Perguntas para o usuário (antes do "sim"):**
1. Gerar os 5 objetos na Tripo (cerca de US$ 0,50 a 1,00) ou montar primeiro a cena com formas
   simples e gerar depois?
2. Migrar o cliente para a API V3 junto (recomendado no `TRIPO_AI_DOCS.md`) ou manter a V2?
3. Os prompts dos objetos ficam em inglês (a Tripo responde melhor) ou em português?

**Critérios de aceitação:** `py_compile` e `node --check` passam; a cena abre sem chave (formas
simples) e troca pelos GLB quando existirem; custo total confirmado antes de gerar; nenhuma chave
no front-end além do `localStorage` já aprovado na `.9`.

### DASHBOARD-REDE-NEURAL.15 — Correção: ⚙ na cena e validação da chave

**Status:** ✅ entregue 2026-10-17 16:50.

- **Problema:** o botão Gerar não habilitava. O servidor local não estava rodando, a `cena.html`
  não tinha a ⚙, e a validação da chave (`[\w.-]{8,200}`) recusaria chaves com `+`, `/` ou `=`.
- **Correção:** ⚙ e modal na `cena.html` (o botão "Gerar os que faltam" liga ao salvar a chave,
  sem recarregar); validação no modal e no servidor trocada por ASCII visível sem espaço
  (8 a 300 caracteres). Servidor reiniciado na porta 8080.

### DASHBOARD-REDE-NEURAL.17 — Saldo de créditos no cabeçalho

**Status:** ✅ entregue 2026-10-17 16:57.

- **Nível:** MEDIO — rota do servidor + módulo `saldo.js` nas duas páginas.
- **Descrição:** `/api/saldo` devolve `{saldo, congelado}` (lidos de `balance` e `frozen` da V3);
  `assets/js/saldo.js` mostra "Saldo: N créditos" ao lado da ⚙ em `index.html` e `cena.html`,
  com o valor em US$ no título; atualiza ao abrir, ao salvar a chave e depois de cada geração.
  Testado sem chave e com chave falsa; o formato com saldo real depende de uma conta com créditos.

## Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-17 17:19 | Tarefa criada só com o plano; execução depende do "sim" do usuário | Claude Code (Opus 5.5) | Tarefa grande (estrutura nova, cena 3D inteira) |
| 2026-10-17 17:21 | Plano aprovado; execução pelo líder Opus 5.5 com agentes por nível (Haiku .1, Sonnet .2 e .4, Opus .3) | Gelvazio | "sim, aprovo o plano da DASHBOARD-REDE-NEURAL (etapa 013)" |
| 2026-10-17 15:03 | `.6` criada (C26): coletor Python dos links do `dashboard/CLAUDE.md` | Gelvazio | "crie 1 pasta scripts nele crie e rode o app em python que coleta os dados dos sites solicitados" |
| 2026-10-17 15:37 | `.7` criada (C26): aba de ferramentas no `index.html` | Gelvazio | "leia coleta.json e atualize o dashboard em index.html com as informacoes..." |
| 2026-10-17 15:50 | `.8` criada (C26): `graphs/` com a API da Tripo; sem chave, só texto → 3D, mesma aba | Gelvazio | Respostas às perguntas da tarefa |
| 2026-10-17 16:16 | `.9` criada (C26): chave da Tripo no `localStorage` via modal | Gelvazio | "e um icone de config, que abre um modal pra colocar a chave de api..." |
| 2026-10-17 16:21 | `.10` criada (C26): pasta `dashboard/prompts/` | Gelvazio | "crie 1 nova pasta de nome prompts" |
| 2026-10-17 16:31 | `.11` criada (C26): um prompt por imagem em `dashboard/prompts/` | Gelvazio | "CRIE 1 prompt pra cada imagem nela..." |
| 2026-10-17 16:34 | `.12` (C26): prompts independentes | Gelvazio | "cada prompt deve ser unico, e nao referenciar os outros" |
| 2026-10-17 16:38 | `.13` (C26): guia da API e dos SDKs da Tripo | Gelvazio | "leia o site ... e crie um documento de nome TRIPO_AI_DOCS.md" |
| 2026-10-17 16:39 | `.14` criada (C26) só com o plano; aguarda respostas e o "sim" | Gelvazio | "crie 1 tarefa pra isso, para o prompt 04" |
| 2026-10-17 16:40 | `.14` aprovada: formas simples primeiro, V3, inglês | Gelvazio | "1-formas simples primeiro;2-migre para V3;3-ingles" |
| 2026-10-17 16:50 | `.15` (correção): ⚙ na cena e validação da chave | Gelvazio | "n habilitou" |
| 2026-10-17 16:57 | `.17` (C26): saldo de créditos no cabeçalho | Gelvazio | "sim, mostre o saldo de créditos na página" |

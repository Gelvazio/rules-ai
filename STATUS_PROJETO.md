# Status do projeto DASHBOARD-AI

**Atualizado em:** 2026-10-16 15:20 (horário de Brasília) · regravado de hora em hora por uma tarefa agendada
**Fontes:** conversa do projeto, as threads abertas e o quadro `tasks/STATUS.md` na `main` do
repositório `Gelvazio/rea-app-clones` (último commit `d4da53a`).

## O que mudou desde a última gravação

- 2026-10-18 13:49 (Brasília): RULES-LOCAL-GLOBAL: as 5 perguntas da etapa 019 foram fechadas (1-b, 2-a, 3-a, 4-a, 5-a) e a `VERSAO.md` virou o controlador do `rules-local/` em cada projeto (R2.5–R2.7, R4.2, INV-4). O gate da spec passa. Falta o "sim" do usuário ao plano.
- 2026-10-18 10:38 (Brasília): RULES-LOCAL-GLOBAL registrada (etapa 019, `PESADO`): regras globais em `rules-local/` de cada projeto, conferidas pela `VERSAO.md` do GitHub no início de cada sessão. Aguarda 5 respostas e o "sim" do usuário.
- 2026-10-18 10:40 (Brasília): INDEX-REGRAS.2 entregue: `scripts/sincronizar.mjs` monta o `dist/REGRAS-GLOBAIS.md` na ordem do `regras/INDEX.md` (sem o índice; avisa regra fora do índice e link quebrado). Falta o `--aplicar` do usuário (INDEX-REGRAS.3).
- 2026-10-18 10:33 (Brasília): INDEX-REGRAS.1 entregue: `regras/INDEX.md`, índice de leitura das 17 regras globais (porta de entrada também na nuvem). INDEX-REGRAS.2 reservada (ordem do `dist/`).
- 2026-10-18 10:05 (Brasília): DASHBOARD-REDE-NEURAL.3 entregue: cena 3D da rede neural em `dashboard/assets/js/cena/` (neurônios, ligações por sinal e tamanho do peso, propagação animada camada a camada, rótulos HTML e clique no neurônio) e `principal.js` ligando modelo → cena, com os eventos `rede:propagada` e `rede:neuronio-selecionado` para o painel da `.4`.
- 2026-10-17 22:00 (Brasília): ACEITE-GLOBAL.2 entregue e ACEITE-GLOBAL fechada (sem aceite, pela C32): `scripts/sincronizar.mjs` grava também em `~/.claude-contaA`, `~/.claude-contaB` e `~/.claude-contaC`; `--aplicar` criou os 3 `CLAUDE.md` com o import e levou a C32 a todas as IAs.
- 2026-10-17 21:58 (Brasília): ACEITE-GLOBAL.1 entregue: regra C32 em `regras/ciclo-da-task.md`, `regras/quadro-de-tarefas.md` e `regras/esforco.md` (a IA sempre aceita, sem subtarefa de aceite). Aceites do quadro fechados: ESFORCO-GLOBAL.5 e DASHBOARD-REDE-NEURAL.19 concluídos (fecha a mãe ESFORCO-GLOBAL); GERENCIADOR-GLOBAL.6 e DASHBOARD-REDE-NEURAL.5 dispensados. ACEITE-GLOBAL.2 reservada.
- 2026-10-17 21:53 (Brasília): ACEITE-GLOBAL registrada (plano aprovado, etapa 014): regra C32, a IA sempre aceita e nunca pede aceite ao usuário; o sincronizador passa a gravar também em `~/.claude-contaA/B/C`. ACEITE-GLOBAL.1 reservada por Claude Code (Opus 5.5).
- 2026-10-17 18:08 (Brasília): DASHBOARD-REDE-NEURAL.27 entregue: na página Agentes ao vivo, globo menor, agentes mais afastados e um fio fino do globo até cada tarefa em andamento.
- 2026-10-17 18:07 (Brasília): DASHBOARD-REDE-NEURAL.26 entregue: o menu do `agentes.html` não mostra mais Dashboard, 3D GRAPHS AI e Cena do prompt 04.
- 2026-10-17 18:05 (Brasília): DASHBOARD-REDE-NEURAL.24 e .25 entregues: o menu de projetos do 3D GRAPHS AI troca o quadro lido (19 projetos de `C:ontes`, sem as pastas `DEMAIS-PROJETOS-*`), e a página Agentes ao vivo virou um mapa mental: globo girando no centro, agentes parados em volta ligados por galhos e tarefas em ramos.
- 2026-10-17 17:58 (Brasília): DASHBOARD-REDE-NEURAL.23 entregue: o menu das páginas do 3D GRAPHS AI ganhou uma linha em cima com o projeto atual, "Rules Ai".
- 2026-10-17 17:55 (Brasília): regra do projeto C31 (`AGENTS.md`): quem reserva uma subtarefa escreve ` · NN%` no fim da coluna "Em uso por". DASHBOARD-REDE-NEURAL.22 entregue: a página Agentes ao vivo mostra esse percentual na cabeça de cada agente que trabalha.
- 2026-10-17 17:49 (Brasília): DASHBOARD-REDE-NEURAL.21 (correção): os rótulos da página Agentes ao vivo passaram a ser HTML (CSS2DRenderer) e ficaram nítidos em qualquer zoom.
- 2026-10-17 17:41 (Brasília): DASHBOARD-REDE-NEURAL.20 entregue: na página Agentes ao vivo, as pendentes formam um globo no centro, os agentes orbitam em volta com as tarefas que estão fazendo, e as concluídas vão para um anel externo.
- 2026-10-17 17:37 (Brasília): DASHBOARD-REDE-NEURAL.18 entregue: `dashboard/graphs/agentes.html` mostra em 3D as tarefas reais do `tasks/STATUS.md` (rota `/api/agentes`, atraso padrão de 30 s), com o nome de cada agente sobre o personagem; tela inteira só com o menu; menu único em `graphs/assets/js/menu.js`. `.19` aguarda o aceite do usuário.
- 2026-10-17 17:12 (Brasília): DASHBOARD-REDE-NEURAL.18 registrada no quadro (só o plano, ⬜ pendente): página `dashboard/graphs/agentes.html` com as tarefas reais do `tasks/STATUS.md` em 3D, atraso configurável (padrão 30 s). `.19` é o aceite do usuário.
- 2026-10-17 16:57 (Brasília): DASHBOARD-REDE-NEURAL.17: saldo de créditos da Tripo no cabeçalho do 3D GRAPHS AI e da cena.
- 2026-10-17 16:52 (Brasília): DASHBOARD-REDE-NEURAL.16: o modal da chave avisa quando é colado o client_id (`tcli_`) em vez da chave secreta (`tsk_`).
- 2026-10-17 16:50 (Brasília): DASHBOARD-REDE-NEURAL.15 (correção): ⚙ da chave também na `graphs/cena.html`; validação da chave aceita qualquer caractere visível sem espaço.
- 2026-10-17 16:44 (Brasília): DASHBOARD-REDE-NEURAL.14 entregue: cena 3D animada do prompt 04 em `dashboard/graphs/cena.html` (formas simples até gerar os 5 objetos na Tripo) e cliente da Tripo migrado para a API V3.
- 2026-10-17 16:39 (Brasília): DASHBOARD-REDE-NEURAL.14 criada só com o plano: usar o prompt 04 no 3D GRAPHS AI (objetos 3D gerados na Tripo + cena animada do infográfico). Aguarda respostas e o "sim" do usuário.
- 2026-10-17 16:38 (Brasília): DASHBOARD-REDE-NEURAL.13: guia `dashboard/graphs/TRIPO_AI_DOCS.md` (API V3 e 5 SDKs da Tripo). Achado: o `graphs/` usa a V2; a migração para a V3 está descrita no guia.
- 2026-10-17 16:34 (Brasília): DASHBOARD-REDE-NEURAL.12: os 4 prompts de `dashboard/prompts/` ficaram independentes (o 04 foi reescrito inteiro; o 02 não cita mais o 04).
- 2026-10-17 16:31 (Brasília): DASHBOARD-REDE-NEURAL.11: 4 prompts em `dashboard/prompts/` (`MODELO-3D-REDE-NEURAL-01.md` a `04.md`), um por imagem, para recriar cada tela como página HTML.
- 2026-10-17 16:21 (Brasília): DASHBOARD-REDE-NEURAL.10: pasta `dashboard/prompts/` criada (com README).
- 2026-10-17 16:18 (Brasília): DASHBOARD-REDE-NEURAL.9 entregue: ícone ⚙ no 3D GRAPHS AI abre modal para salvar a chave da Tripo no `localStorage` (enviada só ao servidor local em `X-Tripo-Key`; `.env` como alternativa). Corrigido o bloqueio do Cloudflare da Tripo (erro 1010) com User-Agent próprio; URL base e autenticação confirmadas (401 com chave falsa).
- 2026-10-17 15:53 (Brasília): DASHBOARD-REDE-NEURAL.8 entregue: menu "3D GRAPHS AI" no `dashboard/index.html` abre `dashboard/graphs/` (visualizador Three.js de GLB + geração texto → 3D pela API da Tripo, a mais barata da coleta, via `graphs/servidor.py` com a chave no `.env` fora do Git). Sem chave por enquanto; endpoints da Tripo a conferir na primeira geração.
- 2026-10-17 15:44 (Brasília): DASHBOARD-REDE-NEURAL.7 entregue: aba "Ferramentas de IA 3D" no `dashboard/index.html` (dados do `coleta.json` e dos reels salvos em `MODELOS-DE-IA/`, gerados por `scripts/gerar_dados_painel.py`). `/graphify --update` rodado: 500 nós, 628 ligações, 45 comunidades; `.graphifyignore` novo tira `MODELOS-DE-IA/` do grafo.
- 2026-10-17 15:33 (Brasília): `graphify update .` rodado a pedido do usuário; sem mudança de topologia, só o cache (`stat-index.json`, `manifest.json`) foi atualizado.
- 2026-10-17 15:25 (Brasília): DASHBOARD-REDE-NEURAL.6 entregue: coletor Python em `dashboard/scripts/` (Playwright + AwesomeAPI) dos links do `dashboard/CLAUDE.md`; saída em `dashboard/scripts/saida/coleta.json` (fora do Git). `WEB-SCRAP.md`, `dashboard/README.md` e `.gitignore` atualizados.
- 2026-10-17 17:25 (Brasília): DASHBOARD-REDE-NEURAL: plano aprovado; `.1` entregue (Haiku): pasta `dashboard/` com `index.html`, CSS e README.
- 2026-10-17 17:19 (Brasília): tarefa DASHBOARD-REDE-NEURAL (etapa 013) criada no quadro: página em `dashboard/` com a visualização 3D das camadas de uma rede neural (Three.js). Tarefa grande: só o plano; execução depende do "sim" do usuário. Nada foi criado na pasta ainda.
- 2026-10-17 13:52 (Brasília): regra global nova C30 (`regras/frentes-e-reserva.md`, tarefa PONTO-GLOBAL, etapa 012): mensagem só com `.` = listar em quadro as tarefas pendentes e apontar a próxima livre do seu modelo, sem reservar nem mudar nada. Regras globais sincronizadas.
- 2026-10-17 13:47 (Brasília): C29 ampliada: o `gerenciador-de-ia` também tem **uma sessão de IA por vez** (seção 10 do `CLAUDE.md` de lá e `.gitignore`, tarefa #5 do quadro dele; PASTA-UNICA-GLOBAL.5).
- 2026-10-17 13:38 (Brasília): regra do projeto C29 (`AGENTS.md`, PASTA-UNICA-GLOBAL.3): no `rules-ai` trabalha **uma sessão de IA por vez**, com a trava local `tasks/.sessao-ativa` (fora do Git, 60 min sem atualização = abandonada). `gerenciador-de-ia` ainda sem decisão (PASTA-UNICA-GLOBAL.4).
- 2026-10-17 13:36 (Brasília): PASTA-UNICA-GLOBAL.1 entregue (Opus 5.5): recomendada a cópia por modelo (`<projeto>-CLAUDE-HAIKU/-SONNET/-OPUS`, como no `aulasenai`), com sincronizador só na pasta principal; aguarda a aprovação do usuário (`.2`).
- 2026-10-17 13:34 (Brasília): GERENCIADOR-GLOBAL.2 entregue: `regras/gerenciador-centralizado.md` (C28, `CONFLITOS.md`). Ordem vigente: disparo automático em pausa (pedido do usuário, 13:30). O automático só para Haiku e Sonnet (16:12) fica para reativação. A regra mantém o modo `ver` como padrão. Sincronizador não rodado (não autorizado nesta subtarefa).
- 2026-10-17 13:31 (Brasília): GERENCIADOR-GLOBAL: `dashboard-ai-*` voltaram e entram; **disparo automático em pausa** pelo usuário (a `.4` fica ⛔). Tarefa nova PASTA-UNICA-GLOBAL (etapa 011): conflitos de várias sessões na mesma pasta (`rules-ai`, `gerenciador-de-ia`); `.1` (Opus) propõe a solução, `.2` é a aprovação do usuário.
- 2026-10-17 16:24 (Brasília): GATILHO-GLOBAL.2 concluída: `sincronizar.mjs --aplicar` rodado com a autorização do usuário; gravados Gemini CLI, Codex, Grok, Qoder, opencode, Devin e Kiro; Claude Code igual (importa o `dist`, que já tem o gatilho `;`). Com isso a regra C24 vale nas IAs.
- 2026-10-17 13:22 (Brasília): GERENCIADOR-GLOBAL.8 entregue (Opus 5.5): respostas de 16:12 conferidas; valem projetos `aulasenai`/`aulas-senai-*` (mesmo quadro), `rules-ai` e `gerenciador-de-ia`, automático para Haiku e Sonnet, 30 s, só Claude Code e mesclagem; pendentes: `dashboard-ai-*` (pastas não existem em `C:\fontes`), limite por hora e custo, e 1 sessão por pasta.
- 2026-10-17 16:25 (Brasília): gatilho `;` (C24) escrito em `regras/frentes-e-reserva.md` e marcado no `CONFLITOS.md` (GATILHO-GLOBAL.1). A sincronização (GATILHO-GLOBAL.2) ainda não rodou; a regra só chega às outras IAs depois dela.
- 2026-10-17 13:18 (Brasília): C27 ampliada (`regras/exibicao-de-status.md`, STATUS-QUADRO-GLOBAL.3): todo quadro que fala de tarefa tem a coluna Tarefa (ID), e ao mostrar subtarefas a linha da mãe vem primeiro, em negrito. Regras globais sincronizadas.
- 2026-10-17 16:12 (Brasília): GERENCIADOR-GLOBAL: respostas do usuário registradas na etapa 009 (projetos: `aulasenai`, `gerenciador-de-ia`, `dashboard-ai-*`, `aulasenai-*`, `rules-ai`; automático só para Haiku e Sonnet; ciclo de 30 s; só Claude Code; mesclar com o `gerenciador-de-tarefas` e atribuir ao Opus pela subtarefa .7). Revoga, nos pontos que divergem, o plano de 13:01. Nada foi disparado.
- 2026-10-17 13:16 (Brasília): `regras/esforco.md` (C21) limpo: saíram os resultados das conferências (Sonnet, Opus, padaria), que ficam na etapa 002; a regra ficou só com o que a IA precisa fazer. Regras globais sincronizadas (ESFORCO-GLOBAL.6).
- 2026-10-17 13:12 (Brasília): C21 (`regras/esforco.md`) atualizada com a conferência do Opus 5.5 (CONFEFFORT-GLOBAL.3: `effort` aplicado, +2,3% de tokens e +40% de tempo de `low` a `xhigh`); regras globais sincronizadas (CONFEFFORT-GLOBAL.7).
- 2026-10-17 13:10 (Brasília): GERENCIADOR-GLOBAL: plano aprovado (só `rules-ai` e `aulasenai`, começa só avisando, volta de 20 s para modelo ocioso e 60 s para ocupado, só Claude Code, fora das `aulas-senai-*`); `.1` entregue (prova de conceito `claude -p --model haiku` ok e desenho na etapa 009). Próximas: `.2` (Haiku) e `.3` (Opus).
- 2026-10-17 13:05 (Brasília): CONFEFFORT-GLOBAL.3 entregue (Opus 5.5): `effort` aplicado — tokens e tempo crescem de `low` a `xhigh` (39.893 → 40.823 tokens; 19,0 → 26,6 s), todos acertaram. Faltam Haiku (.1), Gemini (.4) e DeepSeek (.5).
- 2026-10-17 12:59 (Brasília): STATUS-QUADRO-GLOBAL concluída: `sincronizar.mjs --aplicar` rodado com autorização do usuário; a C27 chegou ao Claude Code (via `dist`), Gemini CLI, Codex, Grok, Qoder, opencode, Devin e Kiro.
- 2026-10-17 12:56 (Brasília): regra global nova C27 (`regras/exibicao-de-status.md`, tarefa STATUS-QUADRO-GLOBAL, etapa 010): todo status (tarefas, frentes, pendências, conferências) é mostrado em quadro (tabela), no terminal e no chat do IDE, em todas as IAs. A regra chega às IAs depois do `sincronizar.mjs --aplicar` (STATUS-QUADRO-GLOBAL.2, aguarda o usuário).
- 2026-10-17 15:55 (Brasília): tarefa GERENCIADOR-GLOBAL (etapa 009) criada no quadro do `rules-ai`: gerenciador centralizado que chama as tarefas livres de cada modelo. Tarefa grande: só o plano e as perguntas agora; execução depende do "sim" do usuário. Nada foi executado nem disparado.
- 2026-10-17 12:54 (Brasília): SUBTAREFA-GLOBAL concluída: `sincronizar.mjs --aplicar` rodado com autorização do usuário; a C26 chegou ao Claude Code (via `dist`), Gemini CLI, Codex, Grok, Qoder, opencode, Devin e Kiro.
- 2026-10-17 12:48 (Brasília): regra global nova C26 (`regras/ciclo-da-task.md`, tarefa SUBTAREFA-GLOBAL, etapa 008): a IA que está numa subtarefa pode criar subtarefas novas **só dentro da mãe atual** (nunca mãe nova) e publica direto no quadro (commit + push, sem aprovação); na equipe do Claude Code quem cria é o líder. A regra chega às IAs depois do `sincronizar.mjs --aplicar` (SUBTAREFA-GLOBAL.2, aguarda o usuário).
- 2026-10-17 12:30 (Brasília): GRAPHIFY-GLOBAL concluída: `graphify.md` do aulasenai e do REA-APP-CLONES alinhados à C25; `sincronizar.mjs --aplicar` rodado (Gemini CLI, Codex, Grok, Qoder, opencode, Devin e Kiro gravados; Claude Code igual); seção antiga de graphify do `~/.claude/CLAUDE.md` trocada pela C25.
- 2026-10-17 12:27 (Brasília): regra global de graphify mudou (C25, substitui a C11; `regras/graphify.md`): ler o `GRAPH_REPORT.md` antes de criar e antes de executar cada tarefa; `graphify update .` no início da conversa e ao fim de cada tarefa concluída e retirada do quadro (tarefa GRAPHIFY-GLOBAL, etapa 007). O `graphify.md` do aulasenai e do REA-APP-CLONES será alinhado e o sincronizador será rodado nas subtarefas .2 e .3.
- 2026-10-17 11:55 (Brasília): tarefa GLOBAL GATILHO-GLOBAL (etapa 006) criada e publicada no quadro:
  mensagem só com `;` = "pegue a próxima tarefa disponível para o seu modelo" (decisão C24). Subtarefas
  `.1` (regra em `regras/frentes-e-reserva.md`, C24 e este status) e `.2` (`sincronizar.mjs --aplicar`)
  são LEVE, só Haiku, e ainda **não foram feitas**: a regra só vale depois da `.2`.
- 2026-10-17 10:55 (Brasília): tarefa INDEX-FONTES (etapa 005): `C:\fontes\index.html` ganhou 4 cards com modais
  (raiz, rules-ai, líder Opus e tarefas), com dados gerados por `C:\fontes\scripts\gerar-dados-index.mjs`.
- 2026-10-17 10:40 (Brasília): nova regra global C23 (`regras/pastas-ignoradas.md`, `CONFLITOS.md`): nada da
  pasta `DEMAIS-PROJETOS-NAO-MEXER-AGORA` (projetos parados) é lido nas sessões; `C:\fontes\CLAUDE.md` atualizado.
- 2026-10-16 23:33 (Brasília): `node scripts/sincronizar.mjs --aplicar` rodado (pedido do usuário): `dist/REGRAS-GLOBAIS.md` sem mudança; regras regravadas em Gemini CLI, Codex, Grok, Qoder, opencode, Devin e Kiro; Claude Code já estava igual.
- 2026-10-16 19:55 (Brasília): tarefas ESFORCO e CONFEFFORT viraram GLOBAIS (`tasks/STATUS.md`, etapa 002); nova regra `regras/esforco.md` (C21).
- 2026-10-16 17:30 (Brasília): `C:\fontes\CLAUDE.md` (raiz) sem a lista da pasta offline e com a regra C20.
- 2026-10-16 17:20 (Brasília): nova regra global C20 (`regras/pastas-ignoradas.md`): nunca ler de início a
  pasta `DEMAIS-PROJETOS-DE-SISTEMAS-MANTER-OFFLINE`.
- 2026-10-16 17:00 (Brasília): parágrafo "regras globais valem" colocado no CLAUDE.md/AGENTS.md de todos os
  projetos com Git (e criado onde faltava); divergências C14 a C19 aguardam a decisão do usuário.
- 2026-10-16 16:30 (Brasília): regra global de git mudou (C13): ao finalizar uma tarefa, commit + push em
  todos os projetos e IAs (`regras/git-geral.md`, `CONFLITOS.md`); sincronizada nas IAs.
- Primeira versão deste arquivo, feita a partir do `STATUS-PROJETO.md` das 15:10.
- Nova thread "Atualizar status a cada hora" criada, com a tarefa agendada desta atualização.
- A thread "Status do projeto em Markdown" foi encerrada.
- Nenhum commit novo na `main` do REA (continua em `d4da53a`) e nenhuma resposta nova nas threads
  "Executar alinhamento" e "Ligar as outras IAs".

## Objetivo

Fazer várias IAs (Claude Code, Gemini CLI, Codex e outras) trabalharem juntas pelas mesmas regras
globais (`C:\fontes\rules-ai`), com o quadro de tarefas como ponto de encontro. O repositório de
trabalho é o `rea-app-clones` (REA), que usa essas regras para clonar o Chaos Code v3.

## O que espera de você

| # | O quê | Onde |
|---|-------|------|
| 1 | Rodar `git push origin main` em `C:\fontes\rules-ai` (o commit `fix(GLOBAL.8)` já está feito; a rede da nuvem não alcança esse repositório) | Seu computador |
| 2 | Abrir uma sessão nova do Claude Code e conferir no `/memory` se as regras globais aparecem (a pasta `~/.claude` não pôde ser lida daqui) | Seu computador |
| 3 | Responder à thread "Executar alinhamento das regras globais": a pergunta dela já está resolvida (ver abaixo), então basta dizer que pode encerrar | Projeto |
| 4 | Opcional: apagar as travas vencidas `stale-HEAD-lock-claude` e `stale-maintenance-lock-claude` em `C:\fontes\rules-ai\.git` | Seu computador |
| 5 | Aceites pendentes no quadro do REA: `CLONE.14.3` e `SERVIDOR.54` (só depois que as subtarefas anteriores terminarem) | `tasks/STATUS.md` |

## Frentes de trabalho

### 1. Executar alinhamento das regras globais

- **Situação:** parada esperando você, mas **o trabalho já está feito**.
- **O que a thread perguntou:** se você aprova o plano da ALINHAR.5 e o push direto na `main`.
- **O que o quadro mostra:** uma sessão Claude Code (Sonnet 5.5) no seu computador já fez a
  ALINHAR.1 a ALINHAR.5, com o seu "SIM" registrado às 15:15, e você deu o aceite (ALINHAR.6).
  Os commits estão na `main`, do `78ad585` ao `d4da53a`. A ALINHAR inteira está em
  `tasks/task_complete.md`.
- **O que mudou no REA:**
  - O graphify roda só no início da conversa e o relatório é analisado (C11).
  - A frase final das tarefas foi alinhada (C1).
  - A ordem passou a ser criar, publicar e assumir (C9), com a tabela "Frentes de trabalho" (C3).
  - Cada IA pega primeiro do seu nível e só desce quando não houver livre (C2). A trava do
    `pre-commit` continua recusando nível acima.
- **Próximo passo:** encerrar a thread. Não há nada para aplicar.

### 2. Ligar as outras IAs às regras globais

- **Situação:** concluída do lado da nuvem; falta o push (item 1 acima).
- **O que foi feito:**
  - **Codex:** ok. O `~/.codex/AGENTS.md` bate com as regras atuais, inclusive `graphify.md` e o quadro.
  - **Gemini CLI:** não lia nada. A versão 0.64.0 recusa `@import` de fora da pasta ("Path traversal
    attempt"). O script de sincronização passou a colar o texto, como no Codex, e o
    `~/.gemini/GEMINI.md` foi regravado (o original ficou em `GEMINI.md.bak`).
  - **Claude Code:** continua com `@import` de caminho absoluto, que ele aceita. Falta só a
    conferência no `/memory` (item 2 acima).
  - Tarefa GLOBAL.8 registrada no `task_complete.md` e na etapa do `rules-ai`, com o commit
    `fix(GLOBAL.8)`.

### 3. Status do projeto em Markdown

- **Situação:** concluída e encerrada. Gerou o `STATUS-PROJETO.md`, base deste arquivo.

### 4. Atualizar status a cada hora

- **Situação:** concluída. Criou a tarefa agendada que regrava este `STATUS_PROJETO.md` de hora em
  hora (o mínimo permitido no projeto; 5 minutos não é aceito).

## Quadro do REA (`rea-app-clones`)

| Tarefa | Título | Prioridade | Concluídas | Abertas | Aguardando você |
|--------|--------|-----------|-----------|---------|-----------------|
| CLONE | Clonar o Chaos Code v3 em Node/TypeScript + Electron | 🟠 Alta | 9 | 100 | `CLONE.14.3` (aceite) |
| SERVIDOR | Servidor local do clone (Python + FastAPI) | 🟠 Alta | 14 | 40 | `SERVIDOR.54` (aceite) |
| CONFEFFORT | Conferir o esforço (`effort`) em cada modelo | 🟡 Média | 0 | 5 | — |
| ALINHAR | Alinhar o REA às regras globais | — | 6 | 0 | ✅ concluída |

- **Ninguém está com reserva agora.** A única frente no quadro (Sonnet 5.5, local) está `⏹️ Encerrada`.
- **Livres para pegar agora (todas da CLONE):** CLONE.1.3, 1.4, 1.5, 1.6, 1.7 e 1.10 (PESADO,
  Opus 5.5) e CLONE.7.2 e 10.1 (LEVE, Haiku 5.5).
- **Ponto de atenção:** o "Registro de decisões" do `STATUS.md` ainda mostra as regras antigas de
  2026-10-15 ("só o seu nível" e "graphify após cada mudança"). A ALINHAR substituiu as duas, mas
  essas linhas não ganharam a decisão nova ao lado.

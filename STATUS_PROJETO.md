# Status do projeto DASHBOARD-AI

**Atualizado em:** 2026-10-16 15:20 (horário de Brasília) · regravado de hora em hora por uma tarefa agendada
**Fontes:** conversa do projeto, as threads abertas e o quadro `tasks/STATUS.md` na `main` do
repositório `Gelvazio/rea-app-clones` (último commit `d4da53a`).

## O que mudou desde a última gravação

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

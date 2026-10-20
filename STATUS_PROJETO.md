# Status do projeto rules-ai

**Atualizado em:** 2026-10-20 00:19 (horário de Brasília) · atualizado a cada mudança em `C:\fontes\rules-ai`, como manda a regra do `AGENTS.md` da raiz.
**Fontes:** quadro `tasks/STATUS.md` + `tasks/task_complete.md` na `main` do repositório
`Gelvazio/rules-ai` (último commit: ver `git log -1`), a auditoria
`C:\fontes\ANALISE-DE-FONTES-2026-10-18.md` (2026-10-18 13:34) e a sessão do DeepSeek Harness
(MCP-QUADRO, 2026-10-18 16:19).

## O que é este projeto

`C:\fontes\rules-ai` é a **fonte única das regras globais de IA** de `C:\fontes`:
`regras/*.md` → `scripts/sincronizar.mjs` → `dist/REGRAS-GLOBAIS.md` + `VERSAO.md` → arquivo global de
cada IA (Claude Code, Gemini CLI, Codex, Grok, Qoder, opencode, Devin, Kiro e Hermes Agent, via `SOUL.md`). O `CONFLITOS.md` guarda
as decisões (C1–C38); o `spec/` guarda os templates e o gate `verificar-spec.mjs` da tarefa PESADA; o
`dashboard/` tem o dashboard de agentes ao vivo; o `tasks/` é o quadro onde as sessões se encontram —
`STATUS.md` só com o que está aberto, `task_complete.md` com o histórico e `etapas/` com o plano e o
detalhe de cada tarefa-mãe.

## Estado atual

| Item | Situação |
|---|---|
| Regras globais | 19 regras + `regras/INDEX.md` (20 arquivos); `VERSAO.md` em `2026-10-18-988f933e` |
| Decisões (`CONFLITOS.md`) | C1–C38 registradas; **C14–C19 pendentes** de decisão do usuário (D6 da auditoria) |
| `rules-local/` | instalado e conferido pela `VERSAO.md` no escopo de 8 remotos (RULES-LOCAL-GLOBAL concluída em 2026-10-18 12:26); em 2026-10-18 13:44 os **20 projetos** foram sincronizados para `2026-10-18-988f933e` (D2 da auditoria; 2 TASKs `RL-988F933E-NIVEIS-E-MODELOS` criadas: `aulasenai` e `gerenciador-de-ia`) |
| Hermes Agent | destino novo no `scripts/sincronizar.mjs` (`SOUL.md` em `%LOCALAPPDATA%\hermes` no Windows e `~/.hermes` no POSIX, modo `embutir`) e instância local configurada: `SOUL.md` com o bloco das regras (52.606 bytes) + `config.yaml` (skills externas, memória, aprovações, `context_file_max_chars: 80000`; MCP do REA mantido). O CLI ainda não está instalado |
| Quadro — tarefas-mãe | **26 mães** registradas; **JEV-RULES-AI** (etapa 025) e **MCP-QUADRO** (etapa 026) estão 👀 aguardando o "sim"; 26 etapas em `tasks/etapas/` |
| Quadro — linhas | **46 linhas abertas** na tabela "📌 Tarefas" do `STATUS.md` após a MCP-QUADRO (+8: mãe e 7 subtarefas); **nenhuma linha ✅ no `STATUS.md`** (C4 aplicada) |
| JEV-RULES-AI | tarefa grande (`PESADO`, spec C34 na etapa 025) registrada em 2026-10-18 15:55: o Jev sugere nível (modelo/effort pela matriz + C21) e serve de guardrail em escopo, aceite, segredo/PII, pasta proibida, comando destrutivo e aprovação indevida. Plano completo; 8 subtarefas ⬜; nada executa sem o "sim" |
| Etapa 017 (NIVEL-DEEPSEEK) | corrigida em 2026-10-18 13:45: as 3 subtarefas estavam ✅ e a mãe continuava 🔄; virou ✅ e foi para o `task_complete.md` |
| Sessão (C29) | **DeepSeek Harness (lead) (MCP-QUADRO) desde 2026-10-18 16:19**; a trava é liberada ao fim da criação da tarefa |
| Este arquivo | reescrito em 2026-10-18 13:45 (D8 da auditoria) e atualizado em 13:58 com a HERMES-GLOBAL: título, fontes e histórico são do `rules-ai` |

## O que espera você (usuário)

| # | O quê | Onde |
|---|---|---|
| 1 | O `scripts/sincronizar.mjs --aplicar` já foi rodado em 2026-10-18 13:55 (Hermes incluído; os 11 destinos anteriores já estavam iguais). As linhas MODELO-GLOBAL.2, ESPEC-GLOBAL.4 e INDEX-REGRAS.3 seguem 👀 até o usuário fechar | `C:\fontes\rules-ai` |
| 2 | Dar o "sim" ao plano da DASHBOARD-AGENTES (perguntas fechadas em 15:02; a pasta `dashboard/` fica só com os Agentes ao vivo) | `tasks/STATUS.md` · etapa 020 |
| 3 | Decidir as **C14–C19** (D6), o destino de `C:\fontes\CONFIG-DEEPSEEK` (D7) e a fonte única da skill `gerenciador-de-tarefas` entre `.claude` e `.agents` (D9) | `CONFLITOS.md` · `ANALISE-DE-FONTES-2026-10-18.md` |
| 4 | Reativar ou manter em pausa o disparo automático do GERENCIADOR-GLOBAL.4 (⛔ desde 2026-10-17 13:30) | `tasks/STATUS.md` |
| 5 | Dar o "sim" ao plano da **MCP-QUADRO** (etapa 026): fila por MCP sobre o quadro, sem banco | `tasks/STATUS.md` · etapa 026 |

## Pendências e bloqueios

| Item | Situação |
|---|---|
| GERENCIADOR-GLOBAL.4 | ⛔ disparo automático em pausa pelo usuário (2026-10-17 13:30); o resto da tarefa segue ⬜ |
| CONFEFFORT-GLOBAL.1/.4/.5 | ⬜ rodadas de Gemini e de DeepSeek (a EFFORT-PADARIA foi para o quadro do `testes-effort-padaria`) |
| DASHBOARD-AGENTES.1–.6 | ⬜ aguardando o plano aprovado |
| UPDATE-REPOS.2–.14 | ⬜ rodar o `scripts/UPDATE.py` nas 13 pastas `dashboard-ai-*`/`aulas-senai-*` |
| C14–C19 | ⬜ revisão das regras que citam pastas inexistentes (D6) |
| Hermes Agent | ⬜ linha em `regras/niveis-e-modelos.md` (decisão do usuário) e instalação do CLI (fora do Git) |

## Histórico (ordem cronológica, do mais antigo ao mais recente)

- **2026-10-16** — Criado o repositório `rules-ai` como fonte única das regras globais: `regras/*.md` → `sincronizar.mjs` → arquivo global de cada IA; escopo de todos os projetos de `C:\fontes` e uma regra única por conflito, decidida pelo usuário.
- **2026-10-16 16:30** — C13: ao finalizar uma tarefa, commit + push em todos os projetos e IAs.
- **2026-10-16 17:00** — Parágrafo "as regras globais valem" no `CLAUDE.md`/`AGENTS.md` de todos os projetos com Git; divergências C14–C19 ficaram aguardando decisão.
- **2026-10-16 17:20** — C20: nunca ler de início a pasta `DEMAIS-PROJETOS-DE-SISTEMAS-MANTER-OFFLINE`.
- **2026-10-16 17:30** — `CLAUDE.md` da raiz fica sem a lista da pasta offline.
- **2026-10-16 19:55** — ESFORCO e CONFEFFORT viram GLOBAIS (etapa 002) e nasce a regra `regras/esforco.md` (C21).
- **2026-10-16 23:33** — `node scripts/sincronizar.mjs --aplicar` leva as regras a Gemini, Codex, Grok, Qoder, opencode, Devin e Kiro.
- **2026-10-17 10:40** — C23: nada da pasta `DEMAIS-PROJETOS-NAO-MEXER-AGORA` é lido nas sessões.
- **2026-10-17 10:55** — INDEX-FONTES: `C:\fontes\index.html` ganha 4 cards com modais e o gerador `scripts/gerar-dados-index.mjs`.
- **2026-10-17 11:55** — GATILHO-GLOBAL (etapa 006): mensagem só com `;` = pegue a próxima tarefa do seu modelo (C24).
- **2026-10-17 12:27** — C25 (graphify): ler o `GRAPH_REPORT.md` antes de criar e antes de executar tarefa; `graphify update .` ao fim de cada tarefa concluída e retirada do quadro.
- **2026-10-17 12:48** — C26: a IA cria subtarefas novas só dentro da mãe atual e publica direto no quadro, sem aprovação.
- **2026-10-17 12:56** — C27 (`regras/exibicao-de-status.md`): todo status é mostrado em quadro; às 13:18 a regra ganha o ID da tarefa e a linha da mãe em negrito.
- **2026-10-17 13:05** — CONFEFFORT-GLOBAL.3: `effort` conferido no Opus 5.5 (39.893 → 40.823 tokens; 19,0 → 26,6 s) e C21 atualizada.
- **2026-10-17 13:31** — GERENCIADOR-GLOBAL: disparo automático em pausa a pedido do usuário; nasce a PASTA-UNICA-GLOBAL para decidir sessão única por pasta.
- **2026-10-17 13:34** — C28 (`regras/gerenciador-centralizado.md`); a ordem vigente é a pausa do disparo automático.
- **2026-10-17 13:38** — C29: uma sessão por vez no `rules-ai`, com a trava local `tasks/.sessao-ativa` (60 min sem atualização = abandonada).
- **2026-10-17 13:52** — C30 (PONTO-GLOBAL): mensagem só com `.` = listar as tarefas pendentes e apontar a próxima livre do seu modelo.
- **2026-10-17 16:12** — Respostas do usuário ao GERENCIADOR-GLOBAL: projetos `aulasenai`, `aulas-senai-*`, `rules-ai`, `gerenciador-de-ia` e `dashboard-ai-*`; automático só para Haiku e Sonnet, ciclo de 30 s, só Claude Code, mesclado com o `gerenciador-de-tarefas`.
- **2026-10-17 16:14** — Aberta a GERENCIADOR-GLOBAL.8 para conferir as respostas de 16:12 contra o plano de 13:01.
- **2026-10-17 17:19** — DASHBOARD-REDE-NEURAL registrada (etapa 013) e plano aprovado às 17:21; série de entregas até a `.27` (globo, agentes ao vivo, mapa mental).
- **2026-10-17 18:08** — DASHBOARD-REDE-NEURAL.27 fecha as melhorias da página "Agentes ao vivo".
- **2026-10-17 21:50** — C32: a IA sempre aceita e nunca pede aceite ao usuário; o sincronizador passa a gravar também nas contas A, B e C do Claude Code.
- **2026-10-17 22:00** — ACEITE-GLOBAL fechada sem aceite, pela C32; aceites antigos do quadro foram dispensados (GERENCIADOR-GLOBAL.6 e DASHBOARD-REDE-NEURAL.5).
- **2026-10-18 08:45** — C34 (ESPEC-GLOBAL): fluxo de spec (EARS, invariantes, perguntas abertas) na etapa de tarefa PESADA, com `spec/templates/` e o gate `spec/verificar-spec.mjs`.
- **2026-10-18 08:52** — C35: o DeepSeek passa a pegar tarefa `PESADO` (altera a C22); dentro do `PESADO`, o `effort` continua `high`.
- **2026-10-18 10:33–10:40** — INDEX-REGRAS.1/.2: `regras/INDEX.md` vira porta de entrada das regras e o `dist/` passa a seguir a mesma ordem.
- **2026-10-18 11:42** — RULES-LOCAL-GLOBAL: perguntas fechadas e plano aprovado pelo usuário ("SIM"); a tarefa é dividida em subtarefas para rodar em paralelo no herdr (líder sargento).
- **2026-10-18 11:48** — RULES-LOCAL-GLOBAL.11: lista de 19 pastas com GitHub e 7 remotos; lotes A (aulasenai), B (dashboard-ai) e C (4 remotos).
- **2026-10-18 11:52–12:26** — RULES-LOCAL-GLOBAL entregue em ondas: `VERSAO.md`, regra `rules-local`, instalador, gancho `SessionStart`, lotes A/B/C, `.17` (`gerenciador-de-ia`), `.20` (`testes-effort-padaria`) e mãe concluída.
- **2026-10-18 12:01** — DASHBOARD-AGENTES registrada (etapa 020) como tarefa PESADA com spec C34; aguarda as 4 perguntas e o "sim" do usuário.
- **2026-10-18 12:30–13:00** — UPDATE-REPOS: decidido que todas as subtarefas são `LEVE · só Haiku 5.5`; tarefa criada (etapa 021) e `scripts/UPDATE.py` entregue na `.1`.
- **2026-10-18 12:58** — HERDR-GLOBAL.1: `regras/herdr.md` (C33) criada e indexada; o herdr entra como runtime dos agentes sob pedido do usuário.
- **2026-10-18 12:59** — NIVEL-QODER.1 (C38): linha **Qoder** na matriz das regras globais, igualando a skill `classificar-tarefa`.
- **2026-10-18 13:34** — Auditoria de fontes da raiz (`C:\fontes\ANALISE-DE-FONTES-2026-10-18.md`): achados, riscos e pendências D1–D12, incluindo o quadro global (D5) e este arquivo (D8).
- **2026-10-18 13:45** — D5/D8 aplicados: C4 completa (30 linhas ✅ recortadas do `STATUS.md` para o `task_complete.md`), as 10 tarefas-mãe sem linha restauradas (histórico recuperado dos commits `de2103b` e `f26e0c8`), etapa 017 fechada (NIVEL-DEEPSEEK ✅), RULES-LOCAL-GLOBAL.17/.20 registradas e este `STATUS_PROJETO.md` reescrito como status do `rules-ai`.
- **2026-10-18 14:00** — D2 aplicado fora do repo: os 20 projetos de `C:\fontes` com `rules-local/` sincronizados para `2026-10-18-988f933e` (17 remotos com push; REA só commit local, sem upstream); 2 TASKs `RL-988F933E-NIVEIS-E-MODELOS` criadas (`aulasenai`, `gerenciador-de-ia`). Complemento do D5: seções "🧭 Frentes de trabalho" e "🗂️ Etapas" no `tasks/STATUS.md` e contagem de regras corrigida neste arquivo.
- **2026-10-18 13:58** — HERMES-GLOBAL (etapa 023): o `scripts/sincronizar.mjs` ganha o destino **Hermes Agent** (`SOUL.md` em `%LOCALAPPDATA%\hermes` no Windows e `~/.hermes` no POSIX, modo `embutir`) e o `README.md` lista a IA; a máquina recebe `SOUL.md` com o bloco das regras globais e `config.yaml` (skills externas em `C:\Users\gelva\.agents\skills`, memória, aprovações, `context_file_max_chars: 80000`), mantendo o MCP do REA. `--aplicar` rodado: os 11 destinos anteriores já estavam iguais e só o Hermes foi gravado; a `VERSAO.md` não mudou. Fora do escopo: linha do Hermes na matriz de níveis (decisão do usuário) e instalação do CLI.
- **2026-10-18 15:02** — UPDATE-REPOS.2 (hk-update, Haiku 5.5): `UPDATE.py --pasta dashboard-ai-claude-code-gmail` deu "JÁ EM DIA" (`a8a5eb4`); critérios conferidos; sem alteração na pasta. Próxima: UPDATE-REPOS.3.
- **2026-10-18 15:03** — DASHBOARD-AGENTES: as 4 perguntas da etapa 020 foram fechadas (1-a página vira `dashboard/index.html`; 2-a `git rm`; 3-a DASHBOARD-REDE-NEURAL cancelada e fechada; 4: os 5 PNG e o `coleta.json` versionados em `dashboard/referencias/`, GLB e `MODELOS-DE-IA/` guardados fora do Git). O gate da spec passa; falta o "sim" do usuário ao plano.
- **2026-10-18 15:04** — UPDATE-REPOS.3 (hk-update, Haiku 5.5): `UPDATE.py --pasta dashboard-ai-claude-code-hotmail` deu "JÁ EM DIA" (`a8a5eb4`); critérios conferidos (ancestral, sem rebase, sem conflito, sem stash); sem alteração na pasta. Próxima: UPDATE-REPOS.4.
- **2026-10-18 15:06** — UPDATE-REPOS.4 (hk-update, Haiku 5.5): `UPDATE.py --pasta dashboard-ai-claude-code-senai` deu "JÁ EM DIA" (`a8a5eb4`); critérios conferidos (ancestral, sem rebase, sem conflito, sem stash); sem alteração na pasta. Próxima: UPDATE-REPOS.5.
- **2026-10-18 15:08** — UPDATE-REPOS.5 (hk-update, Haiku 5.5): `UPDATE.py --pasta dashboard-ai-codex` deu "JÁ EM DIA" (`a8a5eb4`); critérios conferidos (ancestral, sem rebase, sem conflito, sem stash); sem alteração na pasta. Próxima: UPDATE-REPOS.6.
- **2026-10-18 15:06** — UPDATE-REPOS.6 (hk-update, Haiku 5.5): `UPDATE.py --pasta dashboard-ai-deepseek` deu "JÁ EM DIA" (`a8a5eb4`); critérios conferidos (ancestral, sem rebase, sem conflito, sem stash); sem alteração na pasta. Próxima: UPDATE-REPOS.7.
- **2026-10-18 15:10** — UPDATE-REPOS.7 (hk-update, Haiku 5.5): `UPDATE.py --pasta dashboard-ai-devin` deu "JÁ EM DIA" (`a8a5eb4`); critérios conferidos (ancestral, sem rebase, sem conflito, sem stash); sem alteração na pasta. Próxima: UPDATE-REPOS.8.
- **2026-10-18 15:12** — UPDATE-REPOS.8 (hk-update, Haiku 5.5): `UPDATE.py --pasta dashboard-ai-gemini` deu "JÁ EM DIA" (`a8a5eb4`); critérios conferidos (ancestral, sem rebase, sem conflito; stash antigo de 16/10 16:32, não é novo); sem alteração na pasta. Próxima: UPDATE-REPOS.9.
- **2026-10-18 15:09** — UPDATE-REPOS.9 (hk-update, Haiku 5.5): `UPDATE.py --pasta dashboard-ai-kiro-crew` deu "JÁ EM DIA" (`a8a5eb4`); critérios conferidos (ancestral, sem rebase, sem conflito, sem stash novo); sem alteração na pasta. Próxima: UPDATE-REPOS.10 (qoder).
- **2026-10-18 15:11** — UPDATE-REPOS.10 (hk-update, Haiku 5.5): `UPDATE.py --pasta dashboard-ai-qoder` deu "JÁ EM DIA" (`a8a5eb4`); critérios conferidos (ancestral, sem rebase, sem conflito, sem stash); sem commit na pasta (README.md e database/README.md com alterações locais anteriores, intocadas). Próxima: UPDATE-REPOS.11 (Haiku 5.5); mãe UPDATE-REPOS segue aberta.
- **2026-10-18 15:10** — UPDATE-REPOS.11 (hk-update, Haiku 5.5): `UPDATE.py --pasta aulas-senai-CLAUDE-HAIKU` deu "JÁ EM DIA" (`4654a2d9`); critérios conferidos (ancestral, sem rebase, sem conflito, sem stash); sem alteração na pasta. Próxima: UPDATE-REPOS.12.
- **2026-10-18 15:14** — UPDATE-REPOS.12 (hk-update, Haiku 5.5): `UPDATE.py --pasta aulas-senai-CLAUDE-OPUS` deu "JÁ EM DIA" (`4654a2d9`); critérios conferidos (ancestral, sem rebase, sem conflito, sem stash); sem alteração na pasta. Próxima: UPDATE-REPOS.13.
- **2026-10-18 15:15** — UPDATE-REPOS.13 (hk-update, Haiku 5.5): `UPDATE.py --pasta aulas-senai-CLAUDE-OPUS-LIDER` deu "JÁ EM DIA" (`4654a2d9`); critérios conferidos (ancestral, sem rebase, sem conflito, sem stash); sem alteração na pasta (`.agents/` e `.codex/` não rastreados, anteriores ao passo). Próxima: UPDATE-REPOS.14 (Sonnet); mãe segue aberta.
- **2026-10-18 15:13** — UPDATE-REPOS.14 (hk-update, Haiku 5.5): `UPDATE.py --pasta aulas-senai-CLAUDE-SONNET` deu "JÁ EM DIA" (`4654a2d9`); critérios conferidos (ancestral, sem rebase, sem conflito, sem stash); sem alteração na pasta. Subtarefa e mãe UPDATE-REPOS concluídas e movidas para `task_complete.md`.
- **2026-10-18 15:55** — JEV-RULES-AI (etapa 025) registrada como tarefa grande (`PESADO`, spec C34): plano completo para o Jev sugerir nível (modelo/effort pela matriz + C21) e servir de guardrail em escopo, critérios de aceite, segredo/PII, pasta proibida, comando destrutivo e aprovação indevida. 8 subtarefas ⬜; nada executa antes do "sim". Achado registrado: o teste do `PROJETO-JEV-AI` não era cego (o estado levava `nivel_atual`/`Nível:`), então o benchmark da etapa será cego.
- **2026-10-18 16:19** — MCP-QUADRO (etapa 026) registrada como tarefa grande (`PESADO`, spec C34): servidor MCP local (stdio, sem dependência npm) com `task_next`/`task_finish`/`task_list` sobre o `tasks/STATUS.md`; a reserva continua sendo o commit `lock:` + push (o Git é a trava), sem banco, sem React e sem worker. Regra `regras/mcp-quadro.md` + C40 na subtarefa .1. 7 subtarefas ⬜; nada executa antes do "sim" ao plano.
- **2026-10-18 17:35** — JEV-RULES-AI.8 (jev8, Sonnet 5.5): Jev ligado direto (`JEV_MODO=ativo` padrão, `off` = rollback, sem modo sugestão). CLI `scripts/jev.mjs` (classificar/guardrail/avaliar/custo) e skill `classificar-tarefa` (fonte `.agents` e cópia `.claude`, ambas com `SKILL.md.bak`) usam o Jev primeiro; `regras/jev.md` com estado, benchmark e rollback (4,4 KB); golden regravado (8 states sem resíduo). Validação geral ok: gate da spec 4/4, `node --check` em 34 arquivos, 6 scripts de teste/invariante passam (INV-1/2/4 e guardrails), simulação `sincronizar.mjs` sem erro (`VERSAO.md` 2026-10-18-87fd6c11; **sem `--aplicar`**), hash do quadro igual (INV-3). Benchmark cego (180 itens, Jev `jev-1.13.0`, Laya fora do ar): acurácia final 0,611, só `nivel` 0,661, recall de PESADO 0,883; custo da rodada US$ 0,009 (~R$ 0,055). Rollback `off` em 0,5 s; restaurar a skill pelo `.bak` em segundos.
- **2026-10-18 19:00** — EFFORT-PADARIA movida para o quadro do `testes-effort-padaria`; gabarito separado em `gabaritos/EFFORT-PADARIA.md`. DASHBOARD-REDE-NEURAL cancelada a pedido do usuário (18:58).
- 2026-10-18 20:17 (Brasília): tarefa nova HAIKU-COMMIT-GLOBAL (etapa 027-56ebd953), pedida na sessão do `aulasenai` (#287): na equipe de agentes, o Haiku confere, commita e envia as entregas; problema vira subtarefa de verificação para o Sonnet. Reservada a .1.
- 2026-10-19 13:12 (Brasília): tarefa nova JEV-SEM-LAYA (etapa 028-8fe0b340), pedida na sessão do `aulasenai` (#295): tirar o Laya da regra global `regras/jev.md` (fica só o Jev; reserva pelos sinais da skill e `revisar` no guardrail), decisão C42, sincronizar às IAs e tirar o Laya de `scripts/jev/`. Plano aguardando o "sim" do usuário.
- 2026-10-19 13:05 (Brasília): JEV-SEM-LAYA com o plano aprovado pelo usuário; subtarefas .1 e .2 (PESADO) e .3 (MEDIO) livres no quadro, nenhuma executada.
- 2026-10-19 19:21 (Brasília): nova pasta `prompts/` com `VISUAL-FUTURISTA.md`, o prompt de visual cyberpunk (neon ciano, magenta e violeta) usado no painel de coleta do `web-scrapping`, com a tradução para CSS/HTML e as regras de acessibilidade. Fora do quadro: é um prompt de referência, não uma regra global.
- 2026-10-19 23:50 (Brasília): JEV-SEM-LAYA.1 entregue — `regras/jev.md` sem o Laya (falha do Jev, falta de chave ou `JEV_MODO=off` → só os sinais da skill; guardrail ambíguo devolve `revisar`), decisão **C42** no `CONFLITOS.md` e `regras/INDEX.md` citando C39 e C42. Falta a .2 (`sincronizar.mjs --aplicar`) e a .3 (código `scripts/jev/`, Sonnet).
- 2026-10-19 23:50 (Brasília): JEV-SEM-LAYA.2 entregue — `node scripts/sincronizar.mjs --aplicar` levou a `jev.md` sem o Laya às IAs (`VERSAO.md` em `2026-10-19-825288c1`); `dist/REGRAS-GLOBAIS.md` e os arquivos globais sem o Laya. Falta só a .3 (código `scripts/jev/`), livre para o Sonnet.
- 2026-10-19 23:53 (Brasília): JEV-SEM-LAYA.3 entregue pelo executor-medio (Sonnet; líder Opus) — `scripts/jev/` e `scripts/jev.mjs` sem o Laya (benchmark e relatório só com o Jev; textos "só pelos sinais da skill"); **JEV-SEM-LAYA concluída** e movida para o `task_complete.md`. Pendência nova: `testes/invariantes.mjs` já falhava antes (INV-1 acha `modelo Claude` nos quadros reais).
- 2026-10-20 00:10 (Brasília): tarefa nova **JEV-GLOBAL-AI-FINAL** (etapa 029-9a3f2c80), publicada sem executar: o Jev classifica toda mensagem, em todos os projetos (gancho `UserPromptSubmit` no Claude Code e no Codex, guardrails só como aviso, limite de custo e de tempo, auditoria sem o texto). 23 subtarefas com nível sugerido pelo Jev (custo US$ 0,001; .12 e .22 elevadas a PESADO pelo líder): 6 LEVE, 11 MEDIO, 6 PESADO. Spec C34 completa, com 6 perguntas abertas; 👀 aguardando o "sim" ao plano.
- 2026-10-20 00:18 (Brasília): JEV-GLOBAL-AI-FINAL — plano aprovado e as 6 perguntas respondidas pelo usuário; a 6 muda o escopo (o Jev **decide** o modelo da mensagem com confiança ≥ 0,80 e sem sinal de PESADO; senão vale a matriz): entram R6.1, R6.2 e a subtarefa .24 (MEDIO, pelo Jev, confiança 0,98) e a C43 mudará a C39 na mensagem. Mãe segue 👀 até o novo "sim".
- 2026-10-20 00:19 (Brasília): JEV-GLOBAL-AI-FINAL com o plano final aprovado pelo usuário (inclui a .24 e o Jev decidindo na mensagem com confiança ≥ 0,80); 24 subtarefas livres para o modelo de cada uma, nenhuma executada.

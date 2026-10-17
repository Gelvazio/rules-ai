# Graph Report - rules-ai  (2026-10-17)

## Corpus Check
- 52 files · ~35,925 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 503 nodes · 711 edges · 43 communities (42 shown, 1 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `015d8c70`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- regras/ciclo-da-task.md
- Web scraping dos links do `CLAUDE.md`
- niveis-e-modelos.md (Níveis de tarefa)
- coletar.py
- gerar_dados_painel.py
- tasks/task_complete.md — Concluídas
- rede-neural.js
- painel-ferramentas.js
- Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo
- Etapa 003 — EFFORT-PADARIA: testar `low`, `medium` e `high` em todos os modelos com um projeto de padaria
- Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos
- sincronizar.mjs
- Status do projeto DASHBOARD-AI
- Etapa 011 — PASTA-UNICA-GLOBAL: conflitos de várias sessões na mesma pasta (`rules-ai` e `gerenciador-de-ia`)
- Etapa 013-1b79ba45 — DASHBOARD-REDE-NEURAL: visualização 3D das camadas de uma rede neural
- scripts/sincronizar.mjs
- 🔁 Ciclo de uma tarefa (TASK)
- 🧭 Frentes e reserva de subtarefas
- dashboard/CLAUDE.md (prompt de análise de mercado)
- Etapa 001 — GLOBAL: Regras globais para todas as IAs e projetos
- ⚖️ Conflitos entre regras — aguardam a confirmação do usuário
- 📏 Código — Limites, nomes e legibilidade
- 🤖 Gerenciador centralizado de tarefas
- Etapa 010 — STATUS-QUADRO-GLOBAL: todo status é mostrado em quadro
- Tarefa GATILHO-GLOBAL — mensagem ; = próxima tarefa
- Etapa 006 — GATILHO-GLOBAL: mensagem `;` = pegue a próxima tarefa do seu modelo
- Etapa 007 — GRAPHIFY-GLOBAL: ler o relatório antes de criar ou executar tarefa e atualizar ao fim
- Etapa 008 — SUBTAREFA-GLOBAL: a IA cria subtarefas na mãe atual e publica direto
- rules-ai
- Tarefa PASTA-UNICA-GLOBAL — uma sessão por vez na mesma pasta
- C25 Graphify ler antes / atualizar ao fim (substitui C11)
- ETAPA-012-PONTO-GLOBAL.md
- Dashboard — rede neural em 3D
- tasks/STATUS.md — rules-ai
- Etapa 005 — INDEX-FONTES: cards e modais no `C:\fontes\index.html`
- AGENTS.md
- pastas-ignoradas.md
- regras/atividades-e-idioma.md
- STATUS_PROJETO.md
- CONFLITOS.md
- regras/git-geral.md

## God Nodes (most connected - your core abstractions)
1. `tasks/task_complete.md — Concluídas` - 26 edges
2. `criar()` - 17 edges
3. `tasks/STATUS.md — rules-ai` - 16 edges
4. `Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo` - 13 edges
5. `niveis-e-modelos.md (Níveis de tarefa)` - 12 edges
6. `criarCartaoSite()` - 10 edges
7. `Etapa 013-1b79ba45 — DASHBOARD-REDE-NEURAL: visualização 3D das camadas de uma rede neural` - 10 edges
8. `montarPainelFerramentas()` - 9 edges
9. `Web scraping dos links do `CLAUDE.md`` - 9 edges
10. `Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Uma sessão por vez (trava tasks/.sessao-ativa, C29)` --semantically_similar_to--> `Reserva de subtarefa (Em uso por + commit/push)`  [INFERRED] [semantically similar]
  AGENTS.md → regras/frentes-e-reserva.md
- `scripts/PARAR (parada do gerenciador)` --semantically_similar_to--> `Uma sessão por vez (trava tasks/.sessao-ativa, C29)`  [INFERRED] [semantically similar]
  regras/gerenciador-centralizado.md → AGENTS.md
- `Líder gerenciador-de-tarefas (aulas-senai)` --semantically_similar_to--> `Equipe de agentes do Claude Code (líder + executor-leve/medio/pesado)`  [INFERRED] [semantically similar]
  tasks/etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md → regras/niveis-e-modelos.md
- `tasks/task_complete.md — Concluídas` --implements--> `Cada informação em um lugar só`  [INFERRED]
  tasks/task_complete.md → regras/quadro-de-tarefas.md
- `tasks/STATUS.md — rules-ai` --implements--> `quadro-de-tarefas.md (fonte única)`  [INFERRED]
  tasks/STATUS.md → regras/quadro-de-tarefas.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Distribuição das regras globais às IAs** — readme_sincronizar_mjs, readme_dist_regras_globais, readme_bloco_marcado, readme_arquivos_globais_ias, conflitos_codex_agents [EXTRACTED 1.00]
- **Coordenação de várias IAs pelo quadro de tarefas** — ciclo_status_md, frentes_reserva_subtarefa, frentes_gatilho_ponto_virgula, conflitos_c22_so_seu_modelo, gerenciador_modos, ciclo_criar_publicar_assumir [INFERRED 0.85]
- **Fluxo de regra global: etapa → regra em regras/ → linha no CONFLITOS.md → STATUS_PROJETO.md → sincronizar.mjs --aplicar** — conflitos, status_projeto, sincronizar_mjs, dist_regras_globais, task_gatilho_global, task_subtarefa_global, task_status_quadro_global, task_ponto_global, task_graphify_global [EXTRACTED 1.00]
- **Gatilhos de mensagem curta (; e .) sobre frentes-e-reserva e níveis** — rule_c24, rule_c30, frentes_e_reserva_md, regras_niveis_e_modelos_doc, exibicao_de_status_md [INFERRED 0.85]
- **Medição do effort por nível e modelo** — task_esforco_global, task_confeffort_global, task_effort_padaria, rule_c21, projeto_testes_effort_padaria [EXTRACTED 1.00]

## Communities (43 total, 1 thin omitted)

### Community 0 - "regras/ciclo-da-task.md"
Cohesion: 0.19
Nodes (11): Ordem criar → publicar → assumir → trabalhar, niveis-e-modelos.md (coluna Modelo), tasks/STATUS.md (quadro de tarefas), C26 Subtarefa nova só dentro da mãe atual, Tarefa grande: plano na etapa + aprovação, tasks/task_complete.md, Frente (sessão de IA), tasks/RECADOS.md (+3 more)

### Community 1 - "Web scraping dos links do `CLAUDE.md`"
Cohesion: 0.18
Nodes (10): 1. Antes de começar, 2. Tipo de cada link e a técnica indicada, 3. Preparar o ambiente, 4. Script de coleta (L04 a L10), 5. Reels do Instagram (L01 a L03), 6. Cotação do dólar (PASSO 4 do `CLAUDE.md`), 7. Do texto coletado ao JSON final, 8. Problemas comuns (+2 more)

### Community 2 - "niveis-e-modelos.md (Níveis de tarefa)"
Cohesion: 0.05
Nodes (49): regras/ciclo-da-task.md, Disparo automático em pausa (modo ver), dist/REGRAS-GLOBAIS.md, regras/esforco.md, ETAPA-004 MODELO-GLOBAL, ETAPA-008 SUBTAREFA-GLOBAL, ETAPA-009-a0c1d676 GERENCIADOR-GLOBAL, ETAPA-010 STATUS-QUADRO-GLOBAL (+41 more)

### Community 3 - "coletar.py"
Cohesion: 0.09
Nodes (29): coletar_links(), coletar_paginas_extras(), gravar(), main(), Coleta o texto público dos links L04 a L10 do dashboard/CLAUDE.md. Uso: python…, Reels do Instagram: não coletados, marcados para coleta manual., Coleta até MAX_LINKS_UTEIS páginas de preço, API ou termos achadas na principal., Percorre os links principais e as páginas extras de cada um. (+21 more)

### Community 4 - "gerar_dados_painel.py"
Cohesion: 0.07
Nodes (38): main(), montar_dados(), montar_reel(), montar_site(), natureza_do_tipo(), Gera assets/js/dados/ferramentas.js para a aba "Ferramentas de IA 3D" do…, fato' se a página mostra formatos 3D exportáveis; senão 'provavel'., Nos artigos comparativos, os h2/h3 costumam ser as ferramentas citadas. (+30 more)

### Community 5 - "tasks/task_complete.md — Concluídas"
Cohesion: 0.24
Nodes (10): ETAPA-001 GLOBAL, ETAPA-007 GRAPHIFY-GLOBAL, regras/graphify.md, C11 — graphify (regra antiga, substituída pela C25), C12 — Alinhar projetos, C25 — Ler GRAPH_REPORT antes de criar/executar e atualizar ao fim, Tarefa GLOBAL — Regras globais para todas as IAs, Tarefa GRAPHIFY-GLOBAL — ler GRAPH_REPORT e atualizar ao fim (+2 more)

### Community 6 - "rede-neural.js"
Cohesion: 0.15
Nodes (19): CASAS_DECIMAIS, ENTRADAS_PADRAO, LIMITE_PESO, LIMITE_VIES, NOMES_CAMADAS, NOMES_SAIDAS, SEMENTE_PESOS, TAMANHOS_CAMADAS (+11 more)

### Community 7 - "painel-ferramentas.js"
Cohesion: 0.15
Nodes (33): DADOS_FERRAMENTAS, iniciarAbas(), lerAbaSalva(), mostrarAba(), salvarAba(), blocoExtras(), blocoPrecos(), cabecalhoCartao() (+25 more)

### Community 8 - "Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo"
Cohesion: 0.12
Nodes (15): Conferência das respostas de 16:12, Decisões, Desenho, Escopo, Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo, GERENCIADOR-GLOBAL.1 — Desenho e prova de conceito (aprovação antes), GERENCIADOR-GLOBAL.2 — Regra global do gerenciador, GERENCIADOR-GLOBAL.3 — Script central de leitura do quadro (+7 more)

### Community 9 - "Etapa 003 — EFFORT-PADARIA: testar `low`, `medium` e `high` em todos os modelos com um projeto de padaria"
Cohesion: 0.13
Nodes (14): Decisões, EFFORT-PADARIA.1 — Criar o projeto `testes-effort-padaria`, EFFORT-PADARIA.2 — Gabarito, EFFORT-PADARIA.3 a .7 — Rodadas por modelo, EFFORT-PADARIA.3 — Haiku 5.5 — resultado (2026-10-16 20:15, líder Claude Code Opus 5.5), EFFORT-PADARIA.4 — Sonnet 5.5 — resultado (2026-10-16 20:20, líder Claude Code Opus 5.5), EFFORT-PADARIA.5 — Opus 5.5 — resultado (2026-10-16 20:30, líder Claude Code Opus 5.5), EFFORT-PADARIA.8 — Relatório comparativo (2026-10-16 20:31) (+6 more)

### Community 10 - "Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos"
Cohesion: 0.14
Nodes (13): CONFEFFORT-GLOBAL.2 — Sonnet 5.5 — resultado (2026-10-16 20:05, Claude Code Sonnet 5.5, local · main), CONFEFFORT-GLOBAL.3 — Opus 5.5 — resultado (2026-10-17 13:05, Claude Code Opus 5.5, local · main), CONFEFFORT-GLOBAL.6 — resultado (2026-10-16 20:25, Claude Code Sonnet 5.5, local · main), CONFEFFORT-GLOBAL.6 — Sonnet 5.5: 2ª rodada com problema difícil, CONFEFFORT-GLOBAL.7 — Atualizar a C21 com a conferência do Opus, CONFEFFORT-GLOBAL — Subtarefas por modelo, Decisões, ESFORCO-GLOBAL.1 — Regra global `regras/esforco.md` (+5 more)

### Community 11 - "sincronizar.mjs"
Cohesion: 0.25
Nodes (10): APLICAR, aplicarBloco(), ARQUIVO_UNIFICADO, DESTINOS, montarBloco(), montarUnificado(), PASTA_REGRAS, principal() (+2 more)

### Community 12 - "Status do projeto DASHBOARD-AI"
Cohesion: 0.20
Nodes (10): 1. Executar alinhamento das regras globais, 2. Ligar as outras IAs às regras globais, 3. Status do projeto em Markdown, 4. Atualizar status a cada hora, Frentes de trabalho, O que espera de você, O que mudou desde a última gravação, Objetivo (+2 more)

### Community 13 - "Etapa 011 — PASTA-UNICA-GLOBAL: conflitos de várias sessões na mesma pasta (`rules-ai` e `gerenciador-de-ia`)"
Cohesion: 0.18
Nodes (10): Comparação, Contexto, Decisões, Etapa 011 — PASTA-UNICA-GLOBAL: conflitos de várias sessões na mesma pasta (`rules-ai` e `gerenciador-de-ia`), PASTA-UNICA-GLOBAL.1 — Levantar o conflito e propor a solução, PASTA-UNICA-GLOBAL.2 — Aprovação do plano, PASTA-UNICA-GLOBAL.3 — Regra do `rules-ai`: uma sessão por vez, PASTA-UNICA-GLOBAL.4 — Decidir o `gerenciador-de-ia` (+2 more)

### Community 14 - "Etapa 013-1b79ba45 — DASHBOARD-REDE-NEURAL: visualização 3D das camadas de uma rede neural"
Cohesion: 0.17
Nodes (11): Critério de pronto, DASHBOARD-REDE-NEURAL.1 — Estrutura da pasta `dashboard/`, DASHBOARD-REDE-NEURAL.2 — Modelo da rede (pesos e propagação), DASHBOARD-REDE-NEURAL.3 — Cena 3D com propagação animada, DASHBOARD-REDE-NEURAL.4 — Painel 2D (cálculo, entradas e probabilidades), DASHBOARD-REDE-NEURAL.5 — Aceite do usuário, DASHBOARD-REDE-NEURAL.6 — Coletor Python dos links do `dashboard/CLAUDE.md`, Decisões (+3 more)

### Community 15 - "scripts/sincronizar.mjs"
Cohesion: 0.25
Nodes (8): ~/.codex/AGENTS.md (fonte C), Uma regra só, confirmada pelo usuário, Arquivos globais por IA (Claude, Gemini, Codex, Grok, Qoder, opencode, Devin, Kiro), Bloco marcado rules-ai:inicio/fim, dist/REGRAS-GLOBAIS.md, README.md (rules-ai), Precedência projeto > global, scripts/sincronizar.mjs

### Community 16 - "🔁 Ciclo de uma tarefa (TASK)"
Cohesion: 0.29
Nodes (7): 🔁 Ciclo de uma tarefa (TASK), Encerrar, Executar, O que vira TASK, Ordem de todo pedido: criar → publicar → assumir → trabalhar, Pequena ou grande, Retomar (sessão nova ou que caiu)

### Community 17 - "🧭 Frentes e reserva de subtarefas"
Cohesion: 0.29
Nodes (7): Conflitos, Frentes, 🧭 Frentes e reserva de subtarefas, Gatilho `.` — liste as tarefas pendentes, Gatilho `;` — pegue a próxima tarefa do seu modelo, Limites, Pegar uma subtarefa

### Community 18 - "dashboard/CLAUDE.md (prompt de análise de mercado)"
Cohesion: 0.29
Nodes (7): Classificação de links (gerador_modelo_3d, artigo_comparativo, reel...), Fato versus opinião (natureza do dado), Formato JSON de resposta (links, ranking, recomendação), Links L01-L10 (reels e geradores 3D), dashboard/CLAUDE.md (prompt de análise de mercado), Preços em reais com cotação do dia, modelos-3d-de-ia.txt (link salvo do Instagram)

### Community 19 - "Etapa 001 — GLOBAL: Regras globais para todas as IAs e projetos"
Cohesion: 0.25
Nodes (7): Etapa 001 — GLOBAL: Regras globais para todas as IAs e projetos, GLOBAL.1 a GLOBAL.3 — Entrega, GLOBAL.4 — Confirmar os conflitos (concluída), GLOBAL.5 — Demais IAs (concluída), GLOBAL.6 — Decidir C11 e C12 (concluída), GLOBAL.7 — Acompanhar o alinhamento dos projetos, GLOBAL.8 — Gemini CLI lendo as regras de verdade (concluída)

### Community 20 - "⚖️ Conflitos entre regras — aguardam a confirmação do usuário"
Cohesion: 0.33
Nodes (6): ⚖️ Conflitos entre regras — aguardam a confirmação do usuário, Decididos depois (2026-10-16), Decididos em 2026-10-16 (C1 a C10), O que ficou de fora de propósito (específico de projeto), O que já está no global (sem conflito), Pendente de decisão

### Community 21 - "📏 Código — Limites, nomes e legibilidade"
Cohesion: 0.11
Nodes (16): Limites (1000 linhas, 45 por função, 3 parâmetros, 100 caracteres), Nomes em português sem acentos, Princípios SOLID (pragmático), Tokens CSS em :root e BEM, Painel 2D (entradas, neurônio selecionado, probabilidades, legenda), assets/js/principal.js, Checklist, 📏 Código — Limites, nomes e legibilidade (+8 more)

### Community 22 - "🤖 Gerenciador centralizado de tarefas"
Cohesion: 0.33
Nodes (6): Como parar, 🤖 Gerenciador centralizado de tarefas, Limites, Modos, O que ele faz, Regras do modo `disparar`

### Community 23 - "Etapa 010 — STATUS-QUADRO-GLOBAL: todo status é mostrado em quadro"
Cohesion: 0.29
Nodes (6): Decisões, Etapa 010 — STATUS-QUADRO-GLOBAL: todo status é mostrado em quadro, STATUS-QUADRO-GLOBAL.1 — Regra global, conflito C27 e status do projeto, STATUS-QUADRO-GLOBAL.2 — Rodar o sincronizador, STATUS-QUADRO-GLOBAL.3 — ID da tarefa e linha da mãe em todo quadro (ampliação da C27), Texto novo de `regras/exibicao-de-status.md` (arquivo novo, sem mudar)

### Community 24 - "Tarefa GATILHO-GLOBAL — mensagem ; = próxima tarefa"
Cohesion: 0.40
Nodes (5): ETAPA-006 GATILHO-GLOBAL, ETAPA-012 PONTO-GLOBAL, Projeto gerenciador-de-ia, Tarefa GATILHO-GLOBAL — mensagem ; = próxima tarefa, Tarefa PONTO-GLOBAL — mensagem . = listar pendentes

### Community 25 - "Etapa 006 — GATILHO-GLOBAL: mensagem `;` = pegue a próxima tarefa do seu modelo"
Cohesion: 0.33
Nodes (5): Decisões, Etapa 006 — GATILHO-GLOBAL: mensagem `;` = pegue a próxima tarefa do seu modelo, GATILHO-GLOBAL.1 — Regra global, conflito C24 e status do projeto, GATILHO-GLOBAL.2 — Rodar o sincronizador, Texto da regra (copiar sem mudar, em `regras/frentes-e-reserva.md`, no fim do arquivo)

### Community 26 - "Etapa 007 — GRAPHIFY-GLOBAL: ler o relatório antes de criar ou executar tarefa e atualizar ao fim"
Cohesion: 0.33
Nodes (5): Etapa 007 — GRAPHIFY-GLOBAL: ler o relatório antes de criar ou executar tarefa e atualizar ao fim, GRAPHIFY-GLOBAL.1 — Regra global, conflito C25 e status do projeto, GRAPHIFY-GLOBAL.2 — Alinhar o `graphify.md` dos projetos, GRAPHIFY-GLOBAL.3 — Rodar o sincronizador, Texto novo de `regras/graphify.md` (substituir o arquivo inteiro, sem mudar)

### Community 27 - "Etapa 008 — SUBTAREFA-GLOBAL: a IA cria subtarefas na mãe atual e publica direto"
Cohesion: 0.33
Nodes (5): Decisões, Etapa 008 — SUBTAREFA-GLOBAL: a IA cria subtarefas na mãe atual e publica direto, SUBTAREFA-GLOBAL.1 — Regra global, conflito C26 e status do projeto, SUBTAREFA-GLOBAL.2 — Rodar o sincronizador, Texto novo de `regras/ciclo-da-task.md`

### Community 28 - "rules-ai"
Cohesion: 0.40
Nodes (4): Como funciona, Mudar uma regra, Precedência, rules-ai

### Community 29 - "Tarefa PASTA-UNICA-GLOBAL — uma sessão por vez na mesma pasta"
Cohesion: 0.67
Nodes (4): Cópias por modelo (aulas-senai-CLAUDE-*), ETAPA-011 PASTA-UNICA-GLOBAL, C29 — Uma sessão por vez (trava tasks/.sessao-ativa), Tarefa PASTA-UNICA-GLOBAL — uma sessão por vez na mesma pasta

### Community 30 - "C25 Graphify ler antes / atualizar ao fim (substitui C11)"
Cohesion: 0.32
Nodes (7): C25 Graphify ler antes / atualizar ao fim (substitui C11), Ler GRAPH_REPORT.md antes de criar/executar tarefa, graphify update . (início da conversa e fim da tarefa), Falhas, 🕸️ graphify — grafo de conhecimento do projeto, Quando atualizar o grafo, Quando ler o `graphify-out/GRAPH_REPORT.md`

### Community 31 - "ETAPA-012-PONTO-GLOBAL.md"
Cohesion: 0.40
Nodes (4): Decisões, Etapa 012 — PONTO-GLOBAL: mensagem `.` = liste as tarefas pendentes, PONTO-GLOBAL.1 — Regra global, conflito C30, status e sincronizador, Texto da regra (no fim de `regras/frentes-e-reserva.md`, sem mudar)

### Community 32 - "Dashboard — rede neural em 3D"
Cohesion: 0.50
Nodes (3): Como abrir, Dashboard — rede neural em 3D, Estrutura

### Community 33 - "tasks/STATUS.md — rules-ai"
Cohesion: 0.09
Nodes (24): ETAPA-002 ESFORCO-GLOBAL / CONFEFFORT-GLOBAL, ETAPA-003 EFFORT-PADARIA, ETAPA-005 INDEX-FONTES, ETAPA-013-1b79ba45 DASHBOARD-REDE-NEURAL, scripts/gerar-dados-index.mjs, Projeto testes-effort-padaria, Nunca abrir navegador, Nunca escrever testes (exceto para corrigir bug) (+16 more)

### Community 34 - "Etapa 005 — INDEX-FONTES: cards e modais no `C:\fontes\index.html`"
Cohesion: 0.50
Nodes (3): Decisões, Etapa 005 — INDEX-FONTES: cards e modais no `C:\fontes\index.html`, INDEX-FONTES.1 — Cards, modais e gerador de dados

### Community 36 - "pastas-ignoradas.md"
Cohesion: 0.67
Nodes (3): 🚫 Pastas que não se leem de início, C20 — Não ler DEMAIS-PROJETOS-DE-SISTEMAS-MANTER-OFFLINE de início, C23 — Nunca ler DEMAIS-PROJETOS-NAO-MEXER-AGORA

### Community 38 - "regras/atividades-e-idioma.md"
Cohesion: 0.50
Nodes (3): Papel 'Você como aluno consultor' (sem empresa fictícia), Idioma português do Brasil, 🗣️ Idioma e atividades

### Community 39 - "STATUS_PROJETO.md"
Cohesion: 0.16
Nodes (11): Uma sessão por vez (trava tasks/.sessao-ativa, C29), C28 Gerenciador centralizado de tarefas, C20/C23 Pastas ignoradas (DEMAIS-PROJETOS-*), effort por nível (LEVE=low, MEDIO=medium, PESADO=high) - C21, scripts/PARAR (parada do gerenciador), 🎛️ Esforço (`effort`) dos agentes, Tarefa CONFEFFORT-GLOBAL, Tarefa DASHBOARD-REDE-NEURAL (etapa 013) (+3 more)

### Community 40 - "CONFLITOS.md"
Cohesion: 0.31
Nodes (9): AGENTS.md (rules-ai), TAREFA FINALIZADA E SINCRONIZADA!, C22 Nunca executar tarefa de outro modelo, Conflitos pendentes C14-C19, C27 Todo status em quadro (tabela com ID e emoji), Gatilho '.' (C30) listar pendentes, Gatilho ';' (C24) pegar próxima tarefa do seu modelo, Modos ver (padrão) e disparar (em pausa) (+1 more)

### Community 41 - "regras/git-geral.md"
Cohesion: 0.50
Nodes (4): C13 Push ao finalizar tarefa, Um commit por tarefa, git add por caminho, Sem worktree, sem merge, pull --rebase, sem force push, 🔀 Git — regras comuns a todos os projetos

## Knowledge Gaps
- **191 isolated node(s):** `TAMANHOS_CAMADAS`, `SEMENTE_PESOS`, `ENTRADAS_PADRAO`, `NOMES_SAIDAS`, `NOMES_CAMADAS` (+186 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `tasks/task_complete.md — Concluídas` connect `tasks/task_complete.md — Concluídas` to `tasks/STATUS.md — rules-ai`, `Etapa 005 — INDEX-FONTES: cards e modais no `C:\fontes\index.html``, `niveis-e-modelos.md (Níveis de tarefa)`, `Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo`, `Etapa 003 — EFFORT-PADARIA: testar `low`, `medium` e `high` em todos os modelos com um projeto de padaria`, `Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos`, `Etapa 011 — PASTA-UNICA-GLOBAL: conflitos de várias sessões na mesma pasta (`rules-ai` e `gerenciador-de-ia`)`, `Etapa 013-1b79ba45 — DASHBOARD-REDE-NEURAL: visualização 3D das camadas de uma rede neural`, `Etapa 001 — GLOBAL: Regras globais para todas as IAs e projetos`, `Etapa 010 — STATUS-QUADRO-GLOBAL: todo status é mostrado em quadro`, `Tarefa GATILHO-GLOBAL — mensagem ; = próxima tarefa`, `Etapa 006 — GATILHO-GLOBAL: mensagem `;` = pegue a próxima tarefa do seu modelo`, `Etapa 007 — GRAPHIFY-GLOBAL: ler o relatório antes de criar ou executar tarefa e atualizar ao fim`, `Etapa 008 — SUBTAREFA-GLOBAL: a IA cria subtarefas na mãe atual e publica direto`, `Tarefa PASTA-UNICA-GLOBAL — uma sessão por vez na mesma pasta`, `ETAPA-012-PONTO-GLOBAL.md`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **Why does `tasks/STATUS.md — rules-ai` connect `tasks/STATUS.md — rules-ai` to `niveis-e-modelos.md (Níveis de tarefa)`, `tasks/task_complete.md — Concluídas`, `Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo`, `Etapa 003 — EFFORT-PADARIA: testar `low`, `medium` e `high` em todos os modelos com um projeto de padaria`, `Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos`, `CONFLITOS.md`, `Etapa 013-1b79ba45 — DASHBOARD-REDE-NEURAL: visualização 3D das camadas de uma rede neural`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **What connects `TAMANHOS_CAMADAS`, `SEMENTE_PESOS`, `ENTRADAS_PADRAO` to the rest of the system?**
  _191 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `niveis-e-modelos.md (Níveis de tarefa)` be split into smaller, more focused modules?**
  _Cohesion score 0.05442176870748299 - nodes in this community are weakly interconnected._
- **Should `coletar.py` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `gerar_dados_painel.py` be split into smaller, more focused modules?**
  _Cohesion score 0.07439024390243902 - nodes in this community are weakly interconnected._
- **Should `rede-neural.js` be split into smaller, more focused modules?**
  _Cohesion score 0.14761904761904762 - nodes in this community are weakly interconnected._
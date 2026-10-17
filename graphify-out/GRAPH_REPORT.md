# Graph Report - rules-ai  (2026-10-17)

## Corpus Check
- 61 files · ~38,890 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 579 nodes · 827 edges · 49 communities (48 shown, 1 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `21d86ea9`
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
- servidor.py
- principal.js
- dashboard/CLAUDE.md (prompt de análise de mercado)
- Etapa 001 — GLOBAL: Regras globais para todas as IAs e projetos
- ⚖️ Conflitos entre regras — aguardam a confirmação do usuário
- 📏 Código — Limites, nomes e legibilidade
- tasks/STATUS.md — rules-ai
- Etapa 010 — STATUS-QUADRO-GLOBAL: todo status é mostrado em quadro
- Tarefa PASTA-UNICA-GLOBAL — uma sessão por vez na mesma pasta
- Etapa 006 — GATILHO-GLOBAL: mensagem `;` = pegue a próxima tarefa do seu modelo
- Etapa 007 — GRAPHIFY-GLOBAL: ler o relatório antes de criar ou executar tarefa e atualizar ao fim
- Etapa 008 — SUBTAREFA-GLOBAL: a IA cria subtarefas na mãe atual e publica direto
- rules-ai
- Tarefa GERENCIADOR-GLOBAL — gerenciador centralizado
- 🕸️ graphify — grafo de conhecimento do projeto
- ETAPA-012-PONTO-GLOBAL.md
- Dashboard — rede neural em 3D
- Tarefa INDEX-FONTES — cards e modais no C:\fontes\index.html
- Etapa 005 — INDEX-FONTES: cards e modais no `C:\fontes\index.html`
- AGENTS.md
- pastas-ignoradas.md
- regras/atividades-e-idioma.md
- 🗂️ Quadro de tarefas — fonte única, para qualquer projeto
- CONFLITOS.md
- regras/git-geral.md
- quadro-de-tarefas.md (fonte única)
- 3D GRAPHS AI
- scripts/sincronizar.mjs (--aplicar)
- C25 — Ler GRAPH_REPORT antes de criar/executar e atualizar ao fim
- Etapa 004 — MODELO-GLOBAL: nunca executar tarefa que não é do seu modelo
- C21 — Esforço por nível (LEVE=low, MEDIO=medium, PESADO=high)

## God Nodes (most connected - your core abstractions)
1. `tasks/task_complete.md — Concluídas` - 26 edges
2. `criar()` - 17 edges
3. `tasks/STATUS.md — rules-ai` - 16 edges
4. `Manipulador` - 13 edges
5. `Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo` - 13 edges
6. `niveis-e-modelos.md (Níveis de tarefa)` - 12 edges
7. `criarCartaoSite()` - 10 edges
8. `Etapa 013-1b79ba45 — DASHBOARD-REDE-NEURAL: visualização 3D das camadas de uma rede neural` - 10 edges
9. `montarPainelFerramentas()` - 9 edges
10. `Web scraping dos links do `CLAUDE.md`` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Uma sessão por vez (trava tasks/.sessao-ativa, C29)` --semantically_similar_to--> `Reserva de subtarefa (Em uso por + commit/push)`  [INFERRED] [semantically similar]
  AGENTS.md → regras/frentes-e-reserva.md
- `Líder gerenciador-de-tarefas (aulas-senai)` --semantically_similar_to--> `Equipe de agentes do Claude Code (líder + executor-leve/medio/pesado)`  [INFERRED] [semantically similar]
  tasks/etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md → regras/niveis-e-modelos.md
- `tasks/task_complete.md — Concluídas` --implements--> `Cada informação em um lugar só`  [INFERRED]
  tasks/task_complete.md → regras/quadro-de-tarefas.md
- `scripts/PARAR (parada do gerenciador)` --semantically_similar_to--> `Uma sessão por vez (trava tasks/.sessao-ativa, C29)`  [INFERRED] [semantically similar]
  regras/gerenciador-centralizado.md → AGENTS.md
- `C26 — IA cria subtarefas só na mãe atual e publica direto` --conceptually_related_to--> `Tarefa-mãe com no mínimo 1 subtarefa`  [INFERRED]
  tasks/etapas/ETAPA-008-SUBTAREFA-GLOBAL.md → regras/quadro-de-tarefas.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Fluxo de regra global: etapa → regra em regras/ → linha no CONFLITOS.md → STATUS_PROJETO.md → sincronizar.mjs --aplicar** — conflitos, status_projeto, sincronizar_mjs, dist_regras_globais, task_gatilho_global, task_subtarefa_global, task_status_quadro_global, task_ponto_global, task_graphify_global [EXTRACTED 1.00]
- **Medição do effort por nível e modelo** — task_esforco_global, task_confeffort_global, task_effort_padaria, rule_c21, projeto_testes_effort_padaria [EXTRACTED 1.00]
- **Gatilhos de mensagem curta (; e .) sobre frentes-e-reserva e níveis** — rule_c24, rule_c30, frentes_e_reserva_md, regras_niveis_e_modelos_doc, exibicao_de_status_md [INFERRED 0.85]

## Communities (49 total, 1 thin omitted)

### Community 0 - "regras/ciclo-da-task.md"
Cohesion: 0.06
Nodes (41): AGENTS.md (rules-ai), Uma sessão por vez (trava tasks/.sessao-ativa, C29), Ordem criar → publicar → assumir → trabalhar, TAREFA FINALIZADA E SINCRONIZADA!, niveis-e-modelos.md (coluna Modelo), tasks/STATUS.md (quadro de tarefas), C26 Subtarefa nova só dentro da mãe atual, Tarefa grande: plano na etapa + aprovação (+33 more)

### Community 1 - "Web scraping dos links do `CLAUDE.md`"
Cohesion: 0.18
Nodes (10): 1. Antes de começar, 2. Tipo de cada link e a técnica indicada, 3. Preparar o ambiente, 4. Script de coleta (L04 a L10), 5. Reels do Instagram (L01 a L03), 6. Cotação do dólar (PASSO 4 do `CLAUDE.md`), 7. Do texto coletado ao JSON final, 8. Problemas comuns (+2 more)

### Community 2 - "niveis-e-modelos.md (Níveis de tarefa)"
Cohesion: 0.18
Nodes (12): Nível LEVE, Nível MEDIO, Nível PESADO, Coluna Modelo obrigatória, Como usar, niveis-e-modelos.md (Níveis de tarefa), Equipe de agentes do Claude Code, 🎚️ Níveis de tarefa — quem pega o quê (+4 more)

### Community 3 - "coletar.py"
Cohesion: 0.09
Nodes (29): coletar_links(), coletar_paginas_extras(), gravar(), main(), Coleta o texto público dos links L04 a L10 do dashboard/CLAUDE.md. Uso: python…, Reels do Instagram: não coletados, marcados para coleta manual., Coleta até MAX_LINKS_UTEIS páginas de preço, API ou termos achadas na principal., Percorre os links principais e as páginas extras de cada um. (+21 more)

### Community 4 - "gerar_dados_painel.py"
Cohesion: 0.07
Nodes (38): main(), montar_dados(), montar_reel(), montar_site(), natureza_do_tipo(), Gera assets/js/dados/ferramentas.js para a aba "Ferramentas de IA 3D" do…, fato' se a página mostra formatos 3D exportáveis; senão 'provavel'., Nos artigos comparativos, os h2/h3 costumam ser as ferramentas citadas. (+30 more)

### Community 5 - "tasks/task_complete.md — Concluídas"
Cohesion: 0.33
Nodes (7): ETAPA-001 GLOBAL, ETAPA-010 STATUS-QUADRO-GLOBAL, C12 — Alinhar projetos, Tarefa GLOBAL — Regras globais para todas as IAs, Tarefa STATUS-QUADRO-GLOBAL — status sempre em quadro, ✅ Concluídas — rules-ai, tasks/task_complete.md — Concluídas

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
Cohesion: 0.33
Nodes (6): Arquivos globais por IA (Claude, Gemini, Codex, Grok, Qoder, opencode, Devin, Kiro), Bloco marcado rules-ai:inicio/fim, dist/REGRAS-GLOBAIS.md, README.md (rules-ai), Precedência projeto > global, scripts/sincronizar.mjs

### Community 16 - "servidor.py"
Cohesion: 0.06
Nodes (39): baixar(), chamar(), consultar_saldo(), consultar_tarefa(), criar_tarefa_texto(), ErroTripo, Chamadas à API da Tripo (texto → 3D). A chave nunca sai do servidor local., Falha ao falar com a Tripo (rede, chave inválida, saldo, resposta inesperada). (+31 more)

### Community 17 - "principal.js"
Cohesion: 0.15
Nodes (26): acompanharTarefa(), esperar(), gerarModelo(), lerEstado(), listarModelos(), pedirJson(), CENA, INTERVALO_CONSULTA_MS (+18 more)

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

### Community 22 - "tasks/STATUS.md — rules-ai"
Cohesion: 0.27
Nodes (10): ETAPA-002 ESFORCO-GLOBAL / CONFEFFORT-GLOBAL, ETAPA-003 EFFORT-PADARIA, Projeto testes-effort-padaria, Tarefa CONFEFFORT-GLOBAL — conferir effort por modelo, Tarefa EFFORT-PADARIA — testar low/medium/high com padaria, Tarefa ESFORCO-GLOBAL — effort por nível, tasks/STATUS.md — rules-ai, Registro de decisões (+2 more)

### Community 23 - "Etapa 010 — STATUS-QUADRO-GLOBAL: todo status é mostrado em quadro"
Cohesion: 0.29
Nodes (6): Decisões, Etapa 010 — STATUS-QUADRO-GLOBAL: todo status é mostrado em quadro, STATUS-QUADRO-GLOBAL.1 — Regra global, conflito C27 e status do projeto, STATUS-QUADRO-GLOBAL.2 — Rodar o sincronizador, STATUS-QUADRO-GLOBAL.3 — ID da tarefa e linha da mãe em todo quadro (ampliação da C27), Texto novo de `regras/exibicao-de-status.md` (arquivo novo, sem mudar)

### Community 24 - "Tarefa PASTA-UNICA-GLOBAL — uma sessão por vez na mesma pasta"
Cohesion: 0.24
Nodes (9): Cópias por modelo (aulas-senai-CLAUDE-*), ETAPA-006 GATILHO-GLOBAL, ETAPA-011 PASTA-UNICA-GLOBAL, ETAPA-012 PONTO-GLOBAL, Projeto gerenciador-de-ia, C29 — Uma sessão por vez (trava tasks/.sessao-ativa), Tarefa GATILHO-GLOBAL — mensagem ; = próxima tarefa, Tarefa PASTA-UNICA-GLOBAL — uma sessão por vez na mesma pasta (+1 more)

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

### Community 29 - "Tarefa GERENCIADOR-GLOBAL — gerenciador centralizado"
Cohesion: 0.29
Nodes (7): Disparo automático em pausa (modo ver), ETAPA-009-a0c1d676 GERENCIADOR-GLOBAL, regras/gerenciador-centralizado.md, Líder gerenciador-de-tarefas (aulas-senai), Equipe de agentes do Claude Code (líder + executor-leve/medio/pesado), C28 — Gerenciador centralizado, Tarefa GERENCIADOR-GLOBAL — gerenciador centralizado

### Community 30 - "🕸️ graphify — grafo de conhecimento do projeto"
Cohesion: 0.25
Nodes (7): tasks/task_complete.md, Ler GRAPH_REPORT.md antes de criar/executar tarefa, graphify update . (início da conversa e fim da tarefa), Falhas, 🕸️ graphify — grafo de conhecimento do projeto, Quando atualizar o grafo, Quando ler o `graphify-out/GRAPH_REPORT.md`

### Community 31 - "ETAPA-012-PONTO-GLOBAL.md"
Cohesion: 0.40
Nodes (4): Decisões, Etapa 012 — PONTO-GLOBAL: mensagem `.` = liste as tarefas pendentes, PONTO-GLOBAL.1 — Regra global, conflito C30, status e sincronizador, Texto da regra (no fim de `regras/frentes-e-reserva.md`, sem mudar)

### Community 32 - "Dashboard — rede neural em 3D"
Cohesion: 0.40
Nodes (4): 3D GRAPHS AI, Como abrir, Dashboard — rede neural em 3D, Estrutura

### Community 33 - "Tarefa INDEX-FONTES — cards e modais no C:\fontes\index.html"
Cohesion: 0.18
Nodes (10): ETAPA-005 INDEX-FONTES, ETAPA-013-1b79ba45 DASHBOARD-REDE-NEURAL, scripts/gerar-dados-index.mjs, Nunca abrir navegador, Nunca escrever testes (exceto para corrigir bug), ✅ Testes e validação, Tarefa DASHBOARD-REDE-NEURAL — visualização 3D de rede neural, Tarefa INDEX-FONTES — cards e modais no C:\fontes\index.html (+2 more)

### Community 34 - "Etapa 005 — INDEX-FONTES: cards e modais no `C:\fontes\index.html`"
Cohesion: 0.50
Nodes (3): Decisões, Etapa 005 — INDEX-FONTES: cards e modais no `C:\fontes\index.html`, INDEX-FONTES.1 — Cards, modais e gerador de dados

### Community 36 - "pastas-ignoradas.md"
Cohesion: 0.67
Nodes (3): 🚫 Pastas que não se leem de início, C20 — Não ler DEMAIS-PROJETOS-DE-SISTEMAS-MANTER-OFFLINE de início, C23 — Nunca ler DEMAIS-PROJETOS-NAO-MEXER-AGORA

### Community 38 - "regras/atividades-e-idioma.md"
Cohesion: 0.50
Nodes (3): Papel 'Você como aluno consultor' (sem empresa fictícia), Idioma português do Brasil, 🗣️ Idioma e atividades

### Community 39 - "🗂️ Quadro de tarefas — fonte única, para qualquer projeto"
Cohesion: 0.29
Nodes (7): Cada informação em um lugar só, Legenda, Modelo da etapa (uma por tarefa-mãe), Modelo do `tasks/STATUS.md`, Modelo do `tasks/task_complete.md`, 🗂️ Quadro de tarefas — fonte única, para qualquer projeto, Tarefa e subtarefa

### Community 40 - "CONFLITOS.md"
Cohesion: 0.52
Nodes (6): regras/exibicao-de-status.md, regras/frentes-e-reserva.md, C24 — Gatilho ; (pegar próxima tarefa do seu modelo), C27 — Todo status mostrado em quadro, C30 — Gatilho . (listar tarefas pendentes), Registro de decisões (STATUS.md)

### Community 41 - "regras/git-geral.md"
Cohesion: 0.50
Nodes (3): Um commit por tarefa, git add por caminho, Sem worktree, sem merge, pull --rebase, sem force push, 🔀 Git — regras comuns a todos os projetos

### Community 42 - "quadro-de-tarefas.md (fonte única)"
Cohesion: 0.40
Nodes (6): regras/ciclo-da-task.md, Cada informação em um lugar só, Tarefa-mãe com no mínimo 1 subtarefa, Modelo da etapa ETAPA-NNN-<uuid8>, quadro-de-tarefas.md (fonte única), C26 — IA cria subtarefas só na mãe atual e publica direto

### Community 43 - "3D GRAPHS AI"
Cohesion: 0.33
Nodes (5): 3D GRAPHS AI, API escolhida: Tripo (a mais barata da coleta), Arquivos, Como usar, Pendente

### Community 45 - "scripts/sincronizar.mjs (--aplicar)"
Cohesion: 0.33
Nodes (6): dist/REGRAS-GLOBAIS.md, ETAPA-004 MODELO-GLOBAL, ETAPA-008 SUBTAREFA-GLOBAL, scripts/sincronizar.mjs (--aplicar), Tarefa MODELO-GLOBAL — nunca executar tarefa de outro modelo, Tarefa SUBTAREFA-GLOBAL — IA cria subtarefas na mãe atual

### Community 46 - "C25 — Ler GRAPH_REPORT antes de criar/executar e atualizar ao fim"
Cohesion: 0.40
Nodes (5): ETAPA-007 GRAPHIFY-GLOBAL, regras/graphify.md, C11 — graphify (regra antiga, substituída pela C25), C25 — Ler GRAPH_REPORT antes de criar/executar e atualizar ao fim, Tarefa GRAPHIFY-GLOBAL — ler GRAPH_REPORT e atualizar ao fim

### Community 47 - "Etapa 004 — MODELO-GLOBAL: nunca executar tarefa que não é do seu modelo"
Cohesion: 0.40
Nodes (4): Decisões, Etapa 004 — MODELO-GLOBAL: nunca executar tarefa que não é do seu modelo, MODELO-GLOBAL.1 — Regra global, MODELO-GLOBAL.2 — Levar aos outros projetos e às IAs

### Community 48 - "C21 — Esforço por nível (LEVE=low, MEDIO=medium, PESADO=high)"
Cohesion: 0.67
Nodes (3): regras/esforco.md, Tabela ferramenta x nível (quem pega o quê), C21 — Esforço por nível (LEVE=low, MEDIO=medium, PESADO=high)

## Knowledge Gaps
- **196 isolated node(s):** `TAMANHOS_CAMADAS`, `SEMENTE_PESOS`, `ENTRADAS_PADRAO`, `NOMES_SAIDAS`, `NOMES_CAMADAS` (+191 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `tasks/task_complete.md — Concluídas` connect `tasks/task_complete.md — Concluídas` to `Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo`, `Etapa 003 — EFFORT-PADARIA: testar `low`, `medium` e `high` em todos os modelos com um projeto de padaria`, `Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos`, `Etapa 011 — PASTA-UNICA-GLOBAL: conflitos de várias sessões na mesma pasta (`rules-ai` e `gerenciador-de-ia`)`, `Etapa 013-1b79ba45 — DASHBOARD-REDE-NEURAL: visualização 3D das camadas de uma rede neural`, `Etapa 001 — GLOBAL: Regras globais para todas as IAs e projetos`, `tasks/STATUS.md — rules-ai`, `Etapa 010 — STATUS-QUADRO-GLOBAL: todo status é mostrado em quadro`, `Tarefa PASTA-UNICA-GLOBAL — uma sessão por vez na mesma pasta`, `Etapa 006 — GATILHO-GLOBAL: mensagem `;` = pegue a próxima tarefa do seu modelo`, `Etapa 007 — GRAPHIFY-GLOBAL: ler o relatório antes de criar ou executar tarefa e atualizar ao fim`, `Etapa 008 — SUBTAREFA-GLOBAL: a IA cria subtarefas na mãe atual e publica direto`, `ETAPA-012-PONTO-GLOBAL.md`, `Tarefa INDEX-FONTES — cards e modais no C:\fontes\index.html`, `Etapa 005 — INDEX-FONTES: cards e modais no `C:\fontes\index.html``, `quadro-de-tarefas.md (fonte única)`, `scripts/sincronizar.mjs (--aplicar)`, `C25 — Ler GRAPH_REPORT antes de criar/executar e atualizar ao fim`, `Etapa 004 — MODELO-GLOBAL: nunca executar tarefa que não é do seu modelo`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `tasks/STATUS.md — rules-ai` connect `tasks/STATUS.md — rules-ai` to `Tarefa INDEX-FONTES — cards e modais no C:\fontes\index.html`, `tasks/task_complete.md — Concluídas`, `Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo`, `Etapa 003 — EFFORT-PADARIA: testar `low`, `medium` e `high` em todos os modelos com um projeto de padaria`, `Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos`, `CONFLITOS.md`, `quadro-de-tarefas.md (fonte única)`, `scripts/sincronizar.mjs (--aplicar)`, `Etapa 013-1b79ba45 — DASHBOARD-REDE-NEURAL: visualização 3D das camadas de uma rede neural`, `Etapa 004 — MODELO-GLOBAL: nunca executar tarefa que não é do seu modelo`, `Tarefa GERENCIADOR-GLOBAL — gerenciador centralizado`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `AGENTS.md (rules-ai)` connect `regras/ciclo-da-task.md` to `CONFLITOS.md`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **What connects `TAMANHOS_CAMADAS`, `SEMENTE_PESOS`, `ENTRADAS_PADRAO` to the rest of the system?**
  _196 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `regras/ciclo-da-task.md` be split into smaller, more focused modules?**
  _Cohesion score 0.05507246376811594 - nodes in this community are weakly interconnected._
- **Should `coletar.py` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `gerar_dados_painel.py` be split into smaller, more focused modules?**
  _Cohesion score 0.07439024390243902 - nodes in this community are weakly interconnected._
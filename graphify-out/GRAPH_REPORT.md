# Graph Report - rules-ai  (2026-10-17)

## Corpus Check
- 43 files · ~31,138 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 296 nodes · 308 edges · 35 communities (29 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `fe23b007`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- coletar.py
- sincronizar.mjs
- Status do projeto DASHBOARD-AI
- rede-neural.js
- Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo
- 🔁 Ciclo de uma tarefa (TASK)
- 🗂️ Quadro de tarefas — fonte única, para qualquer projeto
- ⚖️ Conflitos entre regras — aguardam a confirmação do usuário
- 📏 Código — Limites, nomes e legibilidade
- Etapa 003 — EFFORT-PADARIA: testar `low`, `medium` e `high` em todos os modelos com um projeto de padaria
- Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos
- 🧭 Frentes e reserva de subtarefas
- 🎚️ Níveis de tarefa — quem pega o quê
- Web scraping dos links do `CLAUDE.md`
- rules-ai
- 🧱 Código — Princípios SOLID
- 🕸️ graphify — grafo de conhecimento do projeto
- Etapa 011 — PASTA-UNICA-GLOBAL: conflitos de várias sessões na mesma pasta (`rules-ai` e `gerenciador-de-ia`)
- ✅ Testes e validação
- task_complete.md
- AGENTS.md
- atividades-e-idioma.md
- esforco.md
- git-geral.md
- pastas-ignoradas.md
- Etapa 013-1b79ba45 — DASHBOARD-REDE-NEURAL: visualização 3D das camadas de uma rede neural
- Etapa 001 — GLOBAL: Regras globais para todas as IAs e projetos
- Etapa 010 — STATUS-QUADRO-GLOBAL: todo status é mostrado em quadro
- Etapa 006 — GATILHO-GLOBAL: mensagem `;` = pegue a próxima tarefa do seu modelo
- exibicao-de-status.md
- Etapa 008 — SUBTAREFA-GLOBAL: a IA cria subtarefas na mãe atual e publica direto
- 🤖 Gerenciador centralizado de tarefas
- ETAPA-012-PONTO-GLOBAL.md
- Dashboard — rede neural em 3D

## God Nodes (most connected - your core abstractions)
1. `Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo` - 13 edges
2. `Etapa 013-1b79ba45 — DASHBOARD-REDE-NEURAL: visualização 3D das camadas de uma rede neural` - 10 edges
3. `Web scraping dos links do `CLAUDE.md`` - 9 edges
4. `Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos` - 9 edges
5. `Etapa 003 — EFFORT-PADARIA: testar `low`, `medium` e `high` em todos os modelos com um projeto de padaria` - 8 edges
6. `Etapa 011 — PASTA-UNICA-GLOBAL: conflitos de várias sessões na mesma pasta (`rules-ai` e `gerenciador-de-ia`)` - 8 edges
7. `extrair()` - 7 edges
8. `🔁 Ciclo de uma tarefa (TASK)` - 7 edges
9. `🧭 Frentes e reserva de subtarefas` - 7 edges
10. `🗂️ Quadro de tarefas — fonte única, para qualquer projeto` - 7 edges

## Surprising Connections (you probably didn't know these)
- `coletar_paginas_extras()` --calls--> `extrair_seguro()`  [EXTRACTED]
  dashboard/scripts/coletar.py → dashboard/scripts/extrator_pagina.py
- `coletar_links()` --calls--> `extrair_seguro()`  [EXTRACTED]
  dashboard/scripts/coletar.py → dashboard/scripts/extrator_pagina.py
- `main()` --calls--> `buscar_cotacao()`  [EXTRACTED]
  dashboard/scripts/coletar.py → dashboard/scripts/cotacao.py

## Import Cycles
- None detected.

## Communities (35 total, 6 thin omitted)

### Community 0 - "coletar.py"
Cohesion: 0.09
Nodes (29): coletar_links(), coletar_paginas_extras(), gravar(), main(), Coleta o texto público dos links L04 a L10 do dashboard/CLAUDE.md. Uso: python…, Reels do Instagram: não coletados, marcados para coleta manual., Coleta até MAX_LINKS_UTEIS páginas de preço, API ou termos achadas na principal., Percorre os links principais e as páginas extras de cada um. (+21 more)

### Community 1 - "sincronizar.mjs"
Cohesion: 0.25
Nodes (10): APLICAR, aplicarBloco(), ARQUIVO_UNIFICADO, DESTINOS, montarBloco(), montarUnificado(), PASTA_REGRAS, principal() (+2 more)

### Community 2 - "Status do projeto DASHBOARD-AI"
Cohesion: 0.18
Nodes (10): 1. Executar alinhamento das regras globais, 2. Ligar as outras IAs às regras globais, 3. Status do projeto em Markdown, 4. Atualizar status a cada hora, Frentes de trabalho, O que espera de você, O que mudou desde a última gravação, Objetivo (+2 more)

### Community 3 - "rede-neural.js"
Cohesion: 0.15
Nodes (19): CASAS_DECIMAIS, ENTRADAS_PADRAO, LIMITE_PESO, LIMITE_VIES, NOMES_CAMADAS, NOMES_SAIDAS, SEMENTE_PESOS, TAMANHOS_CAMADAS (+11 more)

### Community 4 - "Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo"
Cohesion: 0.13
Nodes (15): Conferência das respostas de 16:12, Decisões, Desenho, Escopo, Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo, GERENCIADOR-GLOBAL.1 — Desenho e prova de conceito (aprovação antes), GERENCIADOR-GLOBAL.2 — Regra global do gerenciador, GERENCIADOR-GLOBAL.3 — Script central de leitura do quadro (+7 more)

### Community 5 - "🔁 Ciclo de uma tarefa (TASK)"
Cohesion: 0.25
Nodes (7): 🔁 Ciclo de uma tarefa (TASK), Encerrar, Executar, O que vira TASK, Ordem de todo pedido: criar → publicar → assumir → trabalhar, Pequena ou grande, Retomar (sessão nova ou que caiu)

### Community 6 - "🗂️ Quadro de tarefas — fonte única, para qualquer projeto"
Cohesion: 0.25
Nodes (7): Cada informação em um lugar só, Legenda, Modelo da etapa (uma por tarefa-mãe), Modelo do `tasks/STATUS.md`, Modelo do `tasks/task_complete.md`, 🗂️ Quadro de tarefas — fonte única, para qualquer projeto, Tarefa e subtarefa

### Community 7 - "⚖️ Conflitos entre regras — aguardam a confirmação do usuário"
Cohesion: 0.29
Nodes (6): ⚖️ Conflitos entre regras — aguardam a confirmação do usuário, Decididos depois (2026-10-16), Decididos em 2026-10-16 (C1 a C10), O que ficou de fora de propósito (específico de projeto), O que já está no global (sem conflito), Pendente de decisão

### Community 8 - "📏 Código — Limites, nomes e legibilidade"
Cohesion: 0.29
Nodes (6): Checklist, 📏 Código — Limites, nomes e legibilidade, Exemplo, Legibilidade, Limites obrigatórios, Nomes em português (sem acentos)

### Community 9 - "Etapa 003 — EFFORT-PADARIA: testar `low`, `medium` e `high` em todos os modelos com um projeto de padaria"
Cohesion: 0.14
Nodes (14): Decisões, EFFORT-PADARIA.1 — Criar o projeto `testes-effort-padaria`, EFFORT-PADARIA.2 — Gabarito, EFFORT-PADARIA.3 a .7 — Rodadas por modelo, EFFORT-PADARIA.3 — Haiku 5.5 — resultado (2026-10-16 20:15, líder Claude Code Opus 5.5), EFFORT-PADARIA.4 — Sonnet 5.5 — resultado (2026-10-16 20:20, líder Claude Code Opus 5.5), EFFORT-PADARIA.5 — Opus 5.5 — resultado (2026-10-16 20:30, líder Claude Code Opus 5.5), EFFORT-PADARIA.8 — Relatório comparativo (2026-10-16 20:31) (+6 more)

### Community 10 - "Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos"
Cohesion: 0.15
Nodes (13): CONFEFFORT-GLOBAL.2 — Sonnet 5.5 — resultado (2026-10-16 20:05, Claude Code Sonnet 5.5, local · main), CONFEFFORT-GLOBAL.3 — Opus 5.5 — resultado (2026-10-17 13:05, Claude Code Opus 5.5, local · main), CONFEFFORT-GLOBAL.6 — resultado (2026-10-16 20:25, Claude Code Sonnet 5.5, local · main), CONFEFFORT-GLOBAL.6 — Sonnet 5.5: 2ª rodada com problema difícil, CONFEFFORT-GLOBAL.7 — Atualizar a C21 com a conferência do Opus, CONFEFFORT-GLOBAL — Subtarefas por modelo, Decisões, ESFORCO-GLOBAL.1 — Regra global `regras/esforco.md` (+5 more)

### Community 11 - "🧭 Frentes e reserva de subtarefas"
Cohesion: 0.25
Nodes (7): Conflitos, Frentes, 🧭 Frentes e reserva de subtarefas, Gatilho `.` — liste as tarefas pendentes, Gatilho `;` — pegue a próxima tarefa do seu modelo, Limites, Pegar uma subtarefa

### Community 12 - "🎚️ Níveis de tarefa — quem pega o quê"
Cohesion: 0.33
Nodes (5): Como usar, Equipe de agentes do Claude Code, 🎚️ Níveis de tarefa — quem pega o quê, Os 3 níveis, Quem pega cada nível

### Community 13 - "Web scraping dos links do `CLAUDE.md`"
Cohesion: 0.18
Nodes (10): 1. Antes de começar, 2. Tipo de cada link e a técnica indicada, 3. Preparar o ambiente, 4. Script de coleta (L04 a L10), 5. Reels do Instagram (L01 a L03), 6. Cotação do dólar (PASSO 4 do `CLAUDE.md`), 7. Do texto coletado ao JSON final, 8. Problemas comuns (+2 more)

### Community 14 - "rules-ai"
Cohesion: 0.40
Nodes (4): Como funciona, Mudar uma regra, Precedência, rules-ai

### Community 15 - "🧱 Código — Princípios SOLID"
Cohesion: 0.40
Nodes (4): Checklist SOLID, 🧱 Código — Princípios SOLID, Os 5 princípios, Por tecnologia

### Community 16 - "🕸️ graphify — grafo de conhecimento do projeto"
Cohesion: 0.40
Nodes (4): Falhas, 🕸️ graphify — grafo de conhecimento do projeto, Quando atualizar o grafo, Quando ler o `graphify-out/GRAPH_REPORT.md`

### Community 17 - "Etapa 011 — PASTA-UNICA-GLOBAL: conflitos de várias sessões na mesma pasta (`rules-ai` e `gerenciador-de-ia`)"
Cohesion: 0.18
Nodes (10): Comparação, Contexto, Decisões, Etapa 011 — PASTA-UNICA-GLOBAL: conflitos de várias sessões na mesma pasta (`rules-ai` e `gerenciador-de-ia`), PASTA-UNICA-GLOBAL.1 — Levantar o conflito e propor a solução, PASTA-UNICA-GLOBAL.2 — Aprovação do plano, PASTA-UNICA-GLOBAL.3 — Regra do `rules-ai`: uma sessão por vez, PASTA-UNICA-GLOBAL.4 — Decidir o `gerenciador-de-ia` (+2 more)

### Community 18 - "✅ Testes e validação"
Cohesion: 0.50
Nodes (3): Nunca abrir navegador, Nunca escrever testes (exceto para corrigir bug), ✅ Testes e validação

### Community 19 - "task_complete.md"
Cohesion: 0.09
Nodes (17): Decisões, Etapa 004 — MODELO-GLOBAL: nunca executar tarefa que não é do seu modelo, MODELO-GLOBAL.1 — Regra global, MODELO-GLOBAL.2 — Levar aos outros projetos e às IAs, Decisões, Etapa 005 — INDEX-FONTES: cards e modais no `C:\fontes\index.html`, INDEX-FONTES.1 — Cards, modais e gerador de dados, Etapa 007 — GRAPHIFY-GLOBAL: ler o relatório antes de criar ou executar tarefa e atualizar ao fim (+9 more)

### Community 25 - "Etapa 013-1b79ba45 — DASHBOARD-REDE-NEURAL: visualização 3D das camadas de uma rede neural"
Cohesion: 0.20
Nodes (10): Critério de pronto, DASHBOARD-REDE-NEURAL.1 — Estrutura da pasta `dashboard/`, DASHBOARD-REDE-NEURAL.2 — Modelo da rede (pesos e propagação), DASHBOARD-REDE-NEURAL.3 — Cena 3D com propagação animada, DASHBOARD-REDE-NEURAL.4 — Painel 2D (cálculo, entradas e probabilidades), DASHBOARD-REDE-NEURAL.5 — Aceite do usuário, DASHBOARD-REDE-NEURAL.6 — Coletor Python dos links do `dashboard/CLAUDE.md`, Escopo (+2 more)

### Community 26 - "Etapa 001 — GLOBAL: Regras globais para todas as IAs e projetos"
Cohesion: 0.25
Nodes (7): Etapa 001 — GLOBAL: Regras globais para todas as IAs e projetos, GLOBAL.1 a GLOBAL.3 — Entrega, GLOBAL.4 — Confirmar os conflitos (concluída), GLOBAL.5 — Demais IAs (concluída), GLOBAL.6 — Decidir C11 e C12 (concluída), GLOBAL.7 — Acompanhar o alinhamento dos projetos, GLOBAL.8 — Gemini CLI lendo as regras de verdade (concluída)

### Community 27 - "Etapa 010 — STATUS-QUADRO-GLOBAL: todo status é mostrado em quadro"
Cohesion: 0.29
Nodes (6): Decisões, Etapa 010 — STATUS-QUADRO-GLOBAL: todo status é mostrado em quadro, STATUS-QUADRO-GLOBAL.1 — Regra global, conflito C27 e status do projeto, STATUS-QUADRO-GLOBAL.2 — Rodar o sincronizador, STATUS-QUADRO-GLOBAL.3 — ID da tarefa e linha da mãe em todo quadro (ampliação da C27), Texto novo de `regras/exibicao-de-status.md` (arquivo novo, sem mudar)

### Community 28 - "Etapa 006 — GATILHO-GLOBAL: mensagem `;` = pegue a próxima tarefa do seu modelo"
Cohesion: 0.33
Nodes (5): Decisões, Etapa 006 — GATILHO-GLOBAL: mensagem `;` = pegue a próxima tarefa do seu modelo, GATILHO-GLOBAL.1 — Regra global, conflito C24 e status do projeto, GATILHO-GLOBAL.2 — Rodar o sincronizador, Texto da regra (copiar sem mudar, em `regras/frentes-e-reserva.md`, no fim do arquivo)

### Community 30 - "Etapa 008 — SUBTAREFA-GLOBAL: a IA cria subtarefas na mãe atual e publica direto"
Cohesion: 0.33
Nodes (5): Decisões, Etapa 008 — SUBTAREFA-GLOBAL: a IA cria subtarefas na mãe atual e publica direto, SUBTAREFA-GLOBAL.1 — Regra global, conflito C26 e status do projeto, SUBTAREFA-GLOBAL.2 — Rodar o sincronizador, Texto novo de `regras/ciclo-da-task.md`

### Community 31 - "🤖 Gerenciador centralizado de tarefas"
Cohesion: 0.29
Nodes (6): Como parar, 🤖 Gerenciador centralizado de tarefas, Limites, Modos, O que ele faz, Regras do modo `disparar`

### Community 32 - "ETAPA-012-PONTO-GLOBAL.md"
Cohesion: 0.40
Nodes (4): Decisões, Etapa 012 — PONTO-GLOBAL: mensagem `.` = liste as tarefas pendentes, PONTO-GLOBAL.1 — Regra global, conflito C30, status e sincronizador, Texto da regra (no fim de `regras/frentes-e-reserva.md`, sem mudar)

### Community 33 - "Dashboard — rede neural em 3D"
Cohesion: 0.50
Nodes (3): Como abrir, Dashboard — rede neural em 3D, Estrutura

## Knowledge Gaps
- **166 isolated node(s):** `TAMANHOS_CAMADAS`, `SEMENTE_PESOS`, `ENTRADAS_PADRAO`, `NOMES_SAIDAS`, `NOMES_CAMADAS` (+161 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo` connect `Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo` to `task_complete.md`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `Etapa 003 — EFFORT-PADARIA: testar `low`, `medium` e `high` em todos os modelos com um projeto de padaria` connect `Etapa 003 — EFFORT-PADARIA: testar `low`, `medium` e `high` em todos os modelos com um projeto de padaria` to `task_complete.md`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos` connect `Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos` to `task_complete.md`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **What connects `TAMANHOS_CAMADAS`, `SEMENTE_PESOS`, `ENTRADAS_PADRAO` to the rest of the system?**
  _166 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `coletar.py` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `rede-neural.js` be split into smaller, more focused modules?**
  _Cohesion score 0.14761904761904762 - nodes in this community are weakly interconnected._
- **Should `Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
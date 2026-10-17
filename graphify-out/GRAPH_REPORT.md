# Graph Report - rules-ai  (2026-10-17)

## Corpus Check
- 33 files · ~25,648 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 214 nodes · 184 edges · 33 communities (26 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `533137b3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]

## God Nodes (most connected - your core abstractions)
1. `Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo` - 13 edges
2. `Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos` - 9 edges
3. `Etapa 003 — EFFORT-PADARIA: testar `low`, `medium` e `high` em todos os modelos com um projeto de padaria` - 8 edges
4. `Etapa 011 — PASTA-UNICA-GLOBAL: conflitos de várias sessões na mesma pasta (`rules-ai` e `gerenciador-de-ia`)` - 8 edges
5. `🔁 Ciclo de uma tarefa (TASK)` - 7 edges
6. `🧭 Frentes e reserva de subtarefas` - 7 edges
7. `🗂️ Quadro de tarefas — fonte única, para qualquer projeto` - 7 edges
8. `Etapa 001 — GLOBAL: Regras globais para todas as IAs e projetos` - 7 edges
9. `⚖️ Conflitos entre regras — aguardam a confirmação do usuário` - 6 edges
10. `Status do projeto DASHBOARD-AI` - 6 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (33 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (14): Decisões, EFFORT-PADARIA.1 — Criar o projeto `testes-effort-padaria`, EFFORT-PADARIA.2 — Gabarito, EFFORT-PADARIA.3 a .7 — Rodadas por modelo, EFFORT-PADARIA.3 — Haiku 5.5 — resultado (2026-10-16 20:15, líder Claude Code Opus 5.5), EFFORT-PADARIA.4 — Sonnet 5.5 — resultado (2026-10-16 20:20, líder Claude Code Opus 5.5), EFFORT-PADARIA.5 — Opus 5.5 — resultado (2026-10-16 20:30, líder Claude Code Opus 5.5), EFFORT-PADARIA.8 — Relatório comparativo (2026-10-16 20:31) (+6 more)

### Community 1 - "Community 1"
Cohesion: 0.24
Nodes (10): APLICAR, aplicarBloco(), ARQUIVO_UNIFICADO, DESTINOS, montarBloco(), montarUnificado(), PASTA_REGRAS, principal() (+2 more)

### Community 2 - "Community 2"
Cohesion: 0.18
Nodes (10): 1. Executar alinhamento das regras globais, 2. Ligar as outras IAs às regras globais, 3. Status do projeto em Markdown, 4. Atualizar status a cada hora, Frentes de trabalho, O que espera de você, O que mudou desde a última gravação, Objetivo (+2 more)

### Community 3 - "Community 3"
Cohesion: 0.14
Nodes (13): CONFEFFORT-GLOBAL.2 — Sonnet 5.5 — resultado (2026-10-16 20:05, Claude Code Sonnet 5.5, local · main), CONFEFFORT-GLOBAL.3 — Opus 5.5 — resultado (2026-10-17 13:05, Claude Code Opus 5.5, local · main), CONFEFFORT-GLOBAL.6 — resultado (2026-10-16 20:25, Claude Code Sonnet 5.5, local · main), CONFEFFORT-GLOBAL.6 — Sonnet 5.5: 2ª rodada com problema difícil, CONFEFFORT-GLOBAL.7 — Atualizar a C21 com a conferência do Opus, CONFEFFORT-GLOBAL — Subtarefas por modelo, Decisões, ESFORCO-GLOBAL.1 — Regra global `regras/esforco.md` (+5 more)

### Community 4 - "Community 4"
Cohesion: 0.25
Nodes (7): Etapa 001 — GLOBAL: Regras globais para todas as IAs e projetos, GLOBAL.1 a GLOBAL.3 — Entrega, GLOBAL.4 — Confirmar os conflitos (concluída), GLOBAL.5 — Demais IAs (concluída), GLOBAL.6 — Decidir C11 e C12 (concluída), GLOBAL.7 — Acompanhar o alinhamento dos projetos, GLOBAL.8 — Gemini CLI lendo as regras de verdade (concluída)

### Community 5 - "Community 5"
Cohesion: 0.25
Nodes (7): 🔁 Ciclo de uma tarefa (TASK), Encerrar, Executar, O que vira TASK, Ordem de todo pedido: criar → publicar → assumir → trabalhar, Pequena ou grande, Retomar (sessão nova ou que caiu)

### Community 6 - "Community 6"
Cohesion: 0.25
Nodes (7): Cada informação em um lugar só, Legenda, Modelo da etapa (uma por tarefa-mãe), Modelo do `tasks/STATUS.md`, Modelo do `tasks/task_complete.md`, 🗂️ Quadro de tarefas — fonte única, para qualquer projeto, Tarefa e subtarefa

### Community 7 - "Community 7"
Cohesion: 0.29
Nodes (6): ⚖️ Conflitos entre regras — aguardam a confirmação do usuário, Decididos depois (2026-10-16), Decididos em 2026-10-16 (C1 a C10), O que ficou de fora de propósito (específico de projeto), O que já está no global (sem conflito), Pendente de decisão

### Community 8 - "Community 8"
Cohesion: 0.29
Nodes (6): Checklist, 📏 Código — Limites, nomes e legibilidade, Exemplo, Legibilidade, Limites obrigatórios, Nomes em português (sem acentos)

### Community 9 - "Community 9"
Cohesion: 0.33
Nodes (5): Decisões, Etapa 006 — GATILHO-GLOBAL: mensagem `;` = pegue a próxima tarefa do seu modelo, GATILHO-GLOBAL.1 — Regra global, conflito C24 e status do projeto, GATILHO-GLOBAL.2 — Rodar o sincronizador, Texto da regra (copiar sem mudar, em `regras/frentes-e-reserva.md`, no fim do arquivo)

### Community 10 - "Community 10"
Cohesion: 0.33
Nodes (5): Etapa 007 — GRAPHIFY-GLOBAL: ler o relatório antes de criar ou executar tarefa e atualizar ao fim, GRAPHIFY-GLOBAL.1 — Regra global, conflito C25 e status do projeto, GRAPHIFY-GLOBAL.2 — Alinhar o `graphify.md` dos projetos, GRAPHIFY-GLOBAL.3 — Rodar o sincronizador, Texto novo de `regras/graphify.md` (substituir o arquivo inteiro, sem mudar)

### Community 11 - "Community 11"
Cohesion: 0.25
Nodes (7): Conflitos, Frentes, 🧭 Frentes e reserva de subtarefas, Gatilho `.` — liste as tarefas pendentes, Gatilho `;` — pegue a próxima tarefa do seu modelo, Limites, Pegar uma subtarefa

### Community 12 - "Community 12"
Cohesion: 0.33
Nodes (5): Como usar, Equipe de agentes do Claude Code, 🎚️ Níveis de tarefa — quem pega o quê, Os 3 níveis, Quem pega cada nível

### Community 13 - "Community 13"
Cohesion: 0.40
Nodes (4): Decisões, Etapa 004 — MODELO-GLOBAL: nunca executar tarefa que não é do seu modelo, MODELO-GLOBAL.1 — Regra global, MODELO-GLOBAL.2 — Levar aos outros projetos e às IAs

### Community 14 - "Community 14"
Cohesion: 0.40
Nodes (4): Como funciona, Mudar uma regra, Precedência, rules-ai

### Community 15 - "Community 15"
Cohesion: 0.40
Nodes (4): Checklist SOLID, 🧱 Código — Princípios SOLID, Os 5 princípios, Por tecnologia

### Community 16 - "Community 16"
Cohesion: 0.40
Nodes (4): Falhas, 🕸️ graphify — grafo de conhecimento do projeto, Quando atualizar o grafo, Quando ler o `graphify-out/GRAPH_REPORT.md`

### Community 17 - "Community 17"
Cohesion: 0.50
Nodes (3): Decisões, Etapa 005 — INDEX-FONTES: cards e modais no `C:\fontes\index.html`, INDEX-FONTES.1 — Cards, modais e gerador de dados

### Community 18 - "Community 18"
Cohesion: 0.50
Nodes (3): Nunca abrir navegador, Nunca escrever testes (exceto para corrigir bug), ✅ Testes e validação

### Community 19 - "Community 19"
Cohesion: 0.50
Nodes (3): Registro de decisões, STATUS — rules-ai, 📌 Tarefas

### Community 26 - "Community 26"
Cohesion: 0.33
Nodes (5): Decisões, Etapa 008 — SUBTAREFA-GLOBAL: a IA cria subtarefas na mãe atual e publica direto, SUBTAREFA-GLOBAL.1 — Regra global, conflito C26 e status do projeto, SUBTAREFA-GLOBAL.2 — Rodar o sincronizador, Texto novo de `regras/ciclo-da-task.md`

### Community 27 - "Community 27"
Cohesion: 0.12
Nodes (15): Conferência das respostas de 16:12, Decisões, Desenho, Escopo, Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo, GERENCIADOR-GLOBAL.1 — Desenho e prova de conceito (aprovação antes), GERENCIADOR-GLOBAL.2 — Regra global do gerenciador, GERENCIADOR-GLOBAL.3 — Script central de leitura do quadro (+7 more)

### Community 28 - "Community 28"
Cohesion: 0.29
Nodes (6): Decisões, Etapa 010 — STATUS-QUADRO-GLOBAL: todo status é mostrado em quadro, STATUS-QUADRO-GLOBAL.1 — Regra global, conflito C27 e status do projeto, STATUS-QUADRO-GLOBAL.2 — Rodar o sincronizador, STATUS-QUADRO-GLOBAL.3 — ID da tarefa e linha da mãe em todo quadro (ampliação da C27), Texto novo de `regras/exibicao-de-status.md` (arquivo novo, sem mudar)

### Community 30 - "Community 30"
Cohesion: 0.18
Nodes (10): Comparação, Contexto, Decisões, Etapa 011 — PASTA-UNICA-GLOBAL: conflitos de várias sessões na mesma pasta (`rules-ai` e `gerenciador-de-ia`), PASTA-UNICA-GLOBAL.1 — Levantar o conflito e propor a solução, PASTA-UNICA-GLOBAL.2 — Aprovação do plano, PASTA-UNICA-GLOBAL.3 — Regra do `rules-ai`: uma sessão por vez, PASTA-UNICA-GLOBAL.4 — Decidir o `gerenciador-de-ia` (+2 more)

### Community 31 - "Community 31"
Cohesion: 0.29
Nodes (6): Como parar, 🤖 Gerenciador centralizado de tarefas, Limites, Modos, O que ele faz, Regras do modo `disparar`

### Community 32 - "Community 32"
Cohesion: 0.40
Nodes (4): Decisões, Etapa 012 — PONTO-GLOBAL: mensagem `.` = liste as tarefas pendentes, PONTO-GLOBAL.1 — Regra global, conflito C30, status e sincronizador, Texto da regra (no fim de `regras/frentes-e-reserva.md`, sem mudar)

## Knowledge Gaps
- **140 isolated node(s):** `RAIZ`, `PASTA_REGRAS`, `ARQUIVO_UNIFICADO`, `APLICAR`, `DESTINOS` (+135 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `RAIZ`, `PASTA_REGRAS`, `ARQUIVO_UNIFICADO` to the rest of the system?**
  _140 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `Community 27` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
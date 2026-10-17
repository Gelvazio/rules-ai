# ✅ Concluídas — rules-ai

| Tarefa | Título | Prioridade | Modelo | Depende de | Status | Em uso por | Etapa |
|---|---|---|---|---|---|---|---|
| GLOBAL.1 | Comparar as regras do aulasenai, do REA e do Codex | 🟠 Alta | MEDIO · Sonnet 5.5 | Nenhuma | ✅ Concluído | — | [ETAPA-001](etapas/ETAPA-001-GLOBAL.md) |
| GLOBAL.2 | Escrever `regras/` (só o que não conflita) e `CONFLITOS.md` | 🟠 Alta | MEDIO · Sonnet 5.5 | GLOBAL.1 | ✅ Concluído | — | [ETAPA-001](etapas/ETAPA-001-GLOBAL.md) |
| GLOBAL.3 | Script `sincronizar.mjs` e ligar Claude Code e Gemini CLI | 🟠 Alta | MEDIO · Sonnet 5.5 | GLOBAL.2 | ✅ Concluído | — | [ETAPA-001](etapas/ETAPA-001-GLOBAL.md) |
| GLOBAL.4 | Confirmar os conflitos C1 a C10 (`CONFLITOS.md`) | 🟠 Alta | Usuário | GLOBAL.3 | ✅ Concluído | — | [ETAPA-001](etapas/ETAPA-001-GLOBAL.md) |
| GLOBAL.6 | Decidir C11 (graphify) e C12 (alinhar projetos) | 🟠 Alta | Usuário | GLOBAL.4 | ✅ Concluído | — | [ETAPA-001](etapas/ETAPA-001-GLOBAL.md) |
| GLOBAL.8 | Gemini CLI: trocar o `@import` por texto embutido (o Gemini recusa import fora de `~/.gemini`) | 🟠 Alta | MEDIO · Sonnet 5.5 | GLOBAL.6 | ✅ Concluído | — | [ETAPA-001](etapas/ETAPA-001-GLOBAL.md) |
| GLOBAL.7 | Aceitar o alinhamento dos projetos (entregue): REA `ALINHAR.6` (etapa 013) e aulasenai `#202.5` (etapa 329) | 🟠 Alta | Usuário | Nenhuma | ✅ Concluído | — | [ETAPA-001](etapas/ETAPA-001-GLOBAL.md) |
| GLOBAL.5 | Ligar as demais IAs (Grok, Cursor, Qoder, Kiro, opencode, DeepSeek, Devin): achar o arquivo global de cada uma | 🟡 Média | MEDIO · Sonnet 5.5 | Nenhuma | ✅ Concluído | — | [ETAPA-001](etapas/ETAPA-001-GLOBAL.md) |
| GLOBAL | **Regras globais para todas as IAs e projetos** | 🟠 Alta | — | Nenhuma | ✅ Concluído | — (não reservável) | [ETAPA-001](etapas/ETAPA-001-GLOBAL.md) |
| CONFEFFORT-GLOBAL.2 | 🌐 Sonnet 5.5: conferir o `effort` | 🟡 Média | MEDIO · só Sonnet 5.5 | ESFORCO-GLOBAL.1 | ✅ Concluído | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| CONFEFFORT-GLOBAL.6 | 🌐 Sonnet 5.5: 2ª rodada do `effort` com problema difícil (3 execuções por nível) | 🟡 Média | MEDIO · só Sonnet 5.5 | CONFEFFORT-GLOBAL.2 | ✅ Concluído | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| EFFORT-PADARIA.1 | 🌐 Criar o projeto `testes-effort-padaria` (dados + desafio) | 🟠 Alta | MEDIO | Nenhuma | ✅ Concluído | — | [ETAPA-003](etapas/ETAPA-003-EFFORT-PADARIA.md) |
| EFFORT-PADARIA.2 | 🌐 Gabarito (script fora do projeto) | 🟠 Alta | MEDIO | EFFORT-PADARIA.1 | ✅ Concluído | — | [ETAPA-003](etapas/ETAPA-003-EFFORT-PADARIA.md) |
| EFFORT-PADARIA.3 | 🌐 Haiku 5.5: `low`/`medium`/`high` | 🟠 Alta | LEVE · agente Haiku | EFFORT-PADARIA.2 | ✅ Concluído | — | [ETAPA-003](etapas/ETAPA-003-EFFORT-PADARIA.md) |
| EFFORT-PADARIA.4 | 🌐 Sonnet 5.5: `low`/`medium`/`high` | 🟠 Alta | MEDIO · agente Sonnet | EFFORT-PADARIA.2 | ✅ Concluído | — | [ETAPA-003](etapas/ETAPA-003-EFFORT-PADARIA.md) |
| EFFORT-PADARIA.5 | 🌐 Opus 5.5: `low`/`medium`/`high`/`xhigh` | 🟠 Alta | PESADO · agente Opus | EFFORT-PADARIA.2 | ✅ Concluído | — | [ETAPA-003](etapas/ETAPA-003-EFFORT-PADARIA.md) |
| EFFORT-PADARIA.8 | 🌐 Relatório comparativo | 🟠 Alta | MEDIO | EFFORT-PADARIA.3, .4, .5 | ✅ Concluído | — | [ETAPA-003](etapas/ETAPA-003-EFFORT-PADARIA.md) |
| EFFORT-PADARIA.9 | 🌐 Aceite do usuário | 🟠 Alta | Usuário | EFFORT-PADARIA.8 | ✅ Concluído | — | [ETAPA-003](etapas/ETAPA-003-EFFORT-PADARIA.md) |
| ESFORCO-GLOBAL.2 | 🌐 Aceite do usuário | 🟡 Média | LEVE | ESFORCO-GLOBAL.1 | ✅ Concluído | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| ESFORCO-GLOBAL.3 | 🌐 `effort` no frontmatter dos agentes de todos os projetos (aulasenai, template, testes-de-frontend, dashboards) | 🟠 Alta | MEDIO · effort medium | Nenhuma | ✅ Concluído | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| ESFORCO-GLOBAL.4 | 🌐 `effort` em todas as tarefas pendentes (⬜) dos quadros de todos os projetos (323 linhas; classificar as 171 sem nível) | 🟠 Alta | PESADO · effort high | ESFORCO-GLOBAL.3 | ✅ Concluído | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| MODELO-GLOBAL.1 | 🌐 Regra global (C22) | 🟡 Média | LEVE · só Haiku (exceção Q4: Opus 5.5) | Nenhuma | ✅ Concluído | — | [ETAPA-004](etapas/ETAPA-004-MODELO-GLOBAL.md) |
| INDEX-FONTES | **Cards e modais no `C:\fontes\index.html`** | 🟡 Média | — | Nenhuma | ✅ Concluído | — | [ETAPA-005](etapas/ETAPA-005-INDEX-FONTES.md) |
| INDEX-FONTES.1 | Cards, modais e gerador de dados | 🟡 Média | PESADO · só Opus 5.5+ ou Fable · effort high | Nenhuma | ✅ Concluído | — | [ETAPA-005](etapas/ETAPA-005-INDEX-FONTES.md) |
| GRAPHIFY-GLOBAL.1 | 🌐 Regra global, conflito C25 e status do projeto · `LEVE · effort low` | 🟠 Alta | LEVE · só Haiku | Nenhuma | ✅ Concluído (2026-10-17 12:28) | — | [ETAPA-007](etapas/ETAPA-007-GRAPHIFY-GLOBAL.md) |
| GRAPHIFY-GLOBAL.2 | 🌐 Alinhar o `graphify.md` do aulasenai e do REA-APP-CLONES · `LEVE · effort low` | 🟠 Alta | LEVE · só Haiku | GRAPHIFY-GLOBAL.1 | ✅ Concluído (2026-10-17 12:31) | — | [ETAPA-007](etapas/ETAPA-007-GRAPHIFY-GLOBAL.md) |

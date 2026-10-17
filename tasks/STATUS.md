# STATUS — rules-ai

**Objetivo:** regras de IA globais, para todos os projetos de `C:\fontes` e todas as IAs.
**Partes interessadas:** Gelvazio (decide e confirma conflitos) · IAs executam.
**Links:** [Regras](../regras/) · [Conflitos](../CONFLITOS.md) · [Etapas](etapas/) · [Concluídas](task_complete.md)

Legenda: ⬜ Pendente · 🔄 Em progresso · ✅ Concluído · ⛔ Bloqueado · 👀 Aguardando o usuário

## 📌 Tarefas

| Tarefa | Título | Prioridade | Modelo | Depende de | Status | Em uso por | Etapa |
|---|---|---|---|---|---|---|---|
| EFFORT-PADARIA | **🌐 GLOBAL — Testar `low`/`medium`/`high` em todos os modelos com o projeto da padaria** | 🟠 Alta | — | Nenhuma | 🔄 Em execução | — (não reservável) | [ETAPA-003](etapas/ETAPA-003-EFFORT-PADARIA.md) |
| EFFORT-PADARIA.6 | 🌐 Gemini Pro: 3 níveis de raciocínio | 🟠 Alta | MEDIO · só Gemini CLI · effort medium | EFFORT-PADARIA.2 | ⬜ Pendente | — | [ETAPA-003](etapas/ETAPA-003-EFFORT-PADARIA.md) |
| EFFORT-PADARIA.7 | 🌐 DeepSeek (raciocínio): 3 níveis | 🟠 Alta | MEDIO · só DeepSeek · effort medium | EFFORT-PADARIA.2 | ⬜ Pendente | — | [ETAPA-003](etapas/ETAPA-003-EFFORT-PADARIA.md) |
| ESFORCO-GLOBAL | **🌐 GLOBAL — Esforço (`effort`) por nível, para todos os projetos e IAs** | 🟡 Média | — | Nenhuma | 🔄 Em execução | — (não reservável) | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| ESFORCO-GLOBAL.5 | 🌐 Aceite do usuário | 🟠 Alta | Usuário · effort low | ESFORCO-GLOBAL.4 | 👀 Aguardando o usuário | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| ESFORCO-GLOBAL.1 | 🌐 Regra global `regras/esforco.md` | 🟡 Média | LEVE | Nenhuma | ✅ Concluído | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| CONFEFFORT-GLOBAL | **🌐 GLOBAL — Conferir o `effort` em cada modelo (todos os projetos e IAs)** | 🟡 Média | — | Nenhuma | 🔄 Em execução | — (não reservável) | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| CONFEFFORT-GLOBAL.1 | 🌐 Haiku 5.5: conferir o `effort` | 🟡 Média | LEVE · só Haiku 5.5 · effort low | Nenhuma | ⬜ Pendente | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| CONFEFFORT-GLOBAL.4 | 🌐 Gemini Pro: conferir o esforço | 🟡 Média | MEDIO · só Gemini Pro · effort medium | Nenhuma | ⬜ Pendente | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| CONFEFFORT-GLOBAL.5 | 🌐 DeepSeek (raciocínio): conferir o esforço | 🟡 Média | MEDIO · só DeepSeek · effort medium | Nenhuma | ⬜ Pendente | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| MODELO-GLOBAL | **🌐 GLOBAL — Nunca executar tarefa que não é do seu modelo (C22)** | 🟡 Média | — | Nenhuma | 🔄 Em execução | — (não reservável) | [ETAPA-004](etapas/ETAPA-004-MODELO-GLOBAL.md) |
| MODELO-GLOBAL.2 | 🌐 Levar aos outros projetos (`sincronizar.mjs --aplicar`) | 🟡 Média | Usuário | MODELO-GLOBAL.1 | 👀 Aguardando o usuário | — | [ETAPA-004](etapas/ETAPA-004-MODELO-GLOBAL.md) |
| GATILHO-GLOBAL | **🌐 GLOBAL — Mensagem `;` = pegue a próxima tarefa do seu modelo (C24)** | 🟡 Média | — | Nenhuma | ⬜ Pendente | — (não reservável) | [ETAPA-006](etapas/ETAPA-006-GATILHO-GLOBAL.md) |
| GATILHO-GLOBAL.1 | 🌐 Regra global, conflito C24 e status do projeto · `LEVE · effort low` | 🟡 Média | LEVE · só Haiku | Nenhuma | ⬜ Pendente | — | [ETAPA-006](etapas/ETAPA-006-GATILHO-GLOBAL.md) |
| GATILHO-GLOBAL.2 | 🌐 Rodar o sincronizador (`sincronizar.mjs --aplicar`, autorizado pelo usuário) · `LEVE · effort low` | 🟡 Média | LEVE · só Haiku | GATILHO-GLOBAL.1 | ⬜ Pendente | — | [ETAPA-006](etapas/ETAPA-006-GATILHO-GLOBAL.md) |
| **GERENCIADOR-GLOBAL** | **🌐 GLOBAL — Gerenciador centralizado que chama as tarefas livres de cada modelo (plano aprovado)** | 🟡 Média | — | Nenhuma | 🔄 Em execução | — (não reservável) | [ETAPA-009](etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md) |
| GERENCIADOR-GLOBAL.2 | 🌐 Regra global `regras/gerenciador-centralizado.md` · `LEVE · effort low` | 🟡 Média | LEVE · só Haiku | GERENCIADOR-GLOBAL.1 | ⬜ Pendente | — | [ETAPA-009](etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md) |
| GERENCIADOR-GLOBAL.3 | 🌐 Script central: leitura dos quadros e tarefas livres por modelo (sem disparar) · `PESADO · effort high` | 🟡 Média | PESADO · só Opus 5.5+ ou Fable | GERENCIADOR-GLOBAL.1 | ⬜ Pendente | — | [ETAPA-009](etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md) |
| GERENCIADOR-GLOBAL.4 | 🌐 Disparo de sessões por modelo, com limite, trava e `PARAR` · `PESADO · effort high` | 🟡 Média | PESADO · só Opus 5.5+ ou Fable | GERENCIADOR-GLOBAL.3 | ⬜ Pendente | — | [ETAPA-009](etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md) |
| GERENCIADOR-GLOBAL.5 | 🌐 Vigilância periódica (agendador ou loop no intervalo aprovado) · `MEDIO · effort medium` | 🟡 Média | MEDIO · só Sonnet | GERENCIADOR-GLOBAL.4 | ⬜ Pendente | — | [ETAPA-009](etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md) |
| GERENCIADOR-GLOBAL.6 | 🌐 Aceite do usuário | 🟠 Alta | Usuário | GERENCIADOR-GLOBAL.5 | ⬜ Pendente | — | [ETAPA-009](etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md) |
| GERENCIADOR-GLOBAL.7 | 🌐 Mesclar o `gerenciador-de-tarefas` ao central e revisar o desenho da .1 com as respostas de 16:12 · `PESADO · effort high` | 🟠 Alta | PESADO · só Opus 5.5+ ou Fable | GERENCIADOR-GLOBAL.1 | ⬜ Pendente | — | [ETAPA-009](etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md) |
| GERENCIADOR-GLOBAL.8 | 🌐 Conferir que as respostas de 16:12 valem (e revogam o plano de 13:01 onde divergem) e registrar o que sobra para o usuário · `PESADO · effort high` | 🟠 Alta | PESADO · só Opus 5.5+ ou Fable | GERENCIADOR-GLOBAL.1 | ⬜ Pendente | — | [ETAPA-009](etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md) |
| STATUS-QUADRO-GLOBAL | **🌐 GLOBAL — Todo status é mostrado em quadro, no terminal e no IDE (C27) — reaberta para a .3** | 🟡 Média | — | Nenhuma | 🔄 Em execução | — (não reservável) | [ETAPA-010](etapas/ETAPA-010-STATUS-QUADRO-GLOBAL.md) |
| STATUS-QUADRO-GLOBAL.3 | 🌐 C27: ID da tarefa e linha da mãe em todo quadro; sincronizar · `LEVE · effort low` | 🟡 Média | LEVE · só Haiku | Nenhuma | 🔄 Em progresso | Claude Code (Haiku 5.5 · executor-leve; líder Opus 5.5) (local · main) (desde 2026-10-17 13:17) | [ETAPA-010](etapas/ETAPA-010-STATUS-QUADRO-GLOBAL.md) |

## Registro de decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-17 16:14 | Usuário confirmou que valem as respostas de 16:12; abre a GERENCIADOR-GLOBAL.8 (Opus) só para conferir contra o plano de 13:01 | Gelvazio | "vale as regras daqui, abra uma sub-task em GERENCIADOR-GLOBAL nova so pra conferir isso e atribua ao CLAUDE OPUS" |
| 2026-10-17 16:12 | GERENCIADOR-GLOBAL: respostas do usuário registradas na etapa 009 (projetos, disparo automático só Haiku e Sonnet, ciclo de 30 s, só Claude Code, mesclagem com o `gerenciador-de-tarefas` atribuída ao Opus via .7); revogam o plano de 13:01 nos pontos que divergem | Gelvazio | "1-aulasenai,gerenciador-de-ia,dashboasr-ai-*,aulasenai-*,rules-ai;2-automatico para Haiku e Sonnet;3-a cada 30 segundos...;4-so claude;5-mescla as regras, atribua ao claude opus" |
| 2026-10-17 | Todo status é mostrado em quadro (tabela), em todas as IAs, no terminal e no IDE (C27) | Gelvazio | "todos os staus devem sempre ser mostrados em forma de quadro aqui no cmd ou no claude code IDE" |
| 2026-10-17 15:55 | GERENCIADOR-GLOBAL registrada como tarefa grande (plano na etapa 009); execução só depois do "sim" do usuário às perguntas da etapa | Claude Code (Haiku 5.5) | Estrutura nova e disparo automático de sessões |
| 2026-10-17 | IA pode criar subtarefas **só dentro da mãe atual** e publica direto, sem aprovação (C26) | Gelvazio | "1-SOMENTE SUBTAREFAS DENTRO DA MAE ATUAL;2-PUBLICA DIRETO A TAREFA" |
| 2026-10-17 | Graphify: ler o `GRAPH_REPORT.md` antes de criar e antes de executar tarefa; `graphify update .` ao fim de cada tarefa concluída e retirada do quadro (C25, substitui a C11); a IA roda o `--aplicar` | Gelvazio | "ajuste a regra global de graphify.md, pra sempre ler o graph_report.md antes de executar 1 tarefa e antes de criar 1 tarefa... sincronize as regras globais" |
| 2026-10-17 | Gatilho `;` (pegar a próxima tarefa do seu modelo) vira regra global C24, e o usuário autoriza a IA a rodar o `--aplicar` nesta tarefa | Gelvazio | "este ;, é um gatilho pra *Pegue a proxima tarefa disponivel para seu modelo*, anote esta regra em rules-ai, global... e rode o sincronizador de regras globais" |
| 2026-10-16 | Escopo: todos os projetos de `C:\fontes`; um conflito entre regras = **uma** regra para todos, confirmada pelo usuário | Gelvazio | "1 REGRA PARA OS DOIS CASOS, ME PERGUNTE SOBRE ESTES CASOS" |
| 2026-10-16 | Repositório das regras globais: `C:\fontes\rules-ai`; sem branch (tudo na `main`) | Gelvazio | "USE ESTE REPO AQUI" |
| 2026-10-16 | Tarefa executada por Claude Code (Sonnet 5.5) mesmo sendo de nível PESADO | Gelvazio | "ja assuma e faça esta tarefa, sem perguntas" |
| 2026-10-16 | Tarefa GLOBAL aceita e fechada (GLOBAL.1 a GLOBAL.8 entregues; Cursor e DeepSeek sem arquivo global) | Gelvazio | "sim" ao pedido de aceite |

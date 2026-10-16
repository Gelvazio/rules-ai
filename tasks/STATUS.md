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
| ESFORCO-GLOBAL.4 | 🌐 `effort` em todas as tarefas pendentes (⬜) dos quadros de todos os projetos (323 linhas; classificar as 171 sem nível) | 🟠 Alta | PESADO · effort high | ESFORCO-GLOBAL.3 | 🔄 Em execução | Claude Code (Opus 5.5) (local · main) (desde 2026-10-16 20:50) | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| ESFORCO-GLOBAL.5 | 🌐 Aceite do usuário | 🟠 Alta | Usuário · effort low | ESFORCO-GLOBAL.4 | ⬜ Pendente | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| ESFORCO-GLOBAL.1 | 🌐 Regra global `regras/esforco.md` | 🟡 Média | LEVE | Nenhuma | ✅ Concluído | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| CONFEFFORT-GLOBAL | **🌐 GLOBAL — Conferir o `effort` em cada modelo (todos os projetos e IAs)** | 🟡 Média | — | Nenhuma | 🔄 Em execução | — (não reservável) | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| CONFEFFORT-GLOBAL.1 | 🌐 Haiku 5.5: conferir o `effort` | 🟡 Média | LEVE · só Haiku 5.5 · effort low | Nenhuma | ⬜ Pendente | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| CONFEFFORT-GLOBAL.3 | 🌐 Opus 5.5: conferir o `effort` (incluir `xhigh`) | 🟡 Média | PESADO · só Opus 5.5 · effort high | Nenhuma | ⬜ Pendente | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| CONFEFFORT-GLOBAL.4 | 🌐 Gemini Pro: conferir o esforço | 🟡 Média | MEDIO · só Gemini Pro · effort medium | Nenhuma | ⬜ Pendente | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| CONFEFFORT-GLOBAL.5 | 🌐 DeepSeek (raciocínio): conferir o esforço | 🟡 Média | MEDIO · só DeepSeek · effort medium | Nenhuma | ⬜ Pendente | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |

## Registro de decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-16 | Escopo: todos os projetos de `C:\fontes`; um conflito entre regras = **uma** regra para todos, confirmada pelo usuário | Gelvazio | "1 REGRA PARA OS DOIS CASOS, ME PERGUNTE SOBRE ESTES CASOS" |
| 2026-10-16 | Repositório das regras globais: `C:\fontes\rules-ai`; sem branch (tudo na `main`) | Gelvazio | "USE ESTE REPO AQUI" |
| 2026-10-16 | Tarefa executada por Claude Code (Sonnet 5.5) mesmo sendo de nível PESADO | Gelvazio | "ja assuma e faça esta tarefa, sem perguntas" |
| 2026-10-16 | Tarefa GLOBAL aceita e fechada (GLOBAL.1 a GLOBAL.8 entregues; Cursor e DeepSeek sem arquivo global) | Gelvazio | "sim" ao pedido de aceite |

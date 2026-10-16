## Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos

**Tarefas:** ESFORCO-GLOBAL e CONFEFFORT-GLOBAL · **Pedido em:** 2026-10-16 19:51 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "ESTAS 2 TAREFAS DEVEM SERVIR DE FORMA GLOBAL, ASSUMA ELAS E DEIXE ISSO CLARO"
**Objetivo:** levar para o `rules-ai` (global) as duas tarefas que nasceram no REA: o esforço por
nível de agente (ESFORCO) e a conferência de que o `effort` é aplicado em cada modelo (CONFEFFORT).

> 🌐 **ESTAS DUAS TAREFAS SÃO GLOBAIS:** valem para todos os projetos de `C:\fontes` e todas as IAs.
> Origem: REA, etapas 011-9d3e7a52 (ESFORCO, concluída) e 012-5b1f0c86 (CONFEFFORT, pendente). A
> partir de 2026-10-16 19:51 o quadro oficial é **este** (`rules-ai/tasks/STATUS.md`); o REA só guarda
> o histórico e aponta para cá.

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-16 19:51 | Quadro oficial das duas tarefas passa a ser o do `rules-ai`; as linhas do REA viram histórico/apontamento | Gelvazio | "devem servir de forma global" |
| 2026-10-16 19:51 | Esforço por nível (aprovado no REA, 2026-10-16 12:49): `LEVE` = `low`, `MEDIO` = `medium`, `PESADO` = `high` | Gelvazio | "SIM" à tabela proposta na ETAPA-011 |
| 2026-10-16 19:51 | CONFEFFORT continua com uma subtarefa **por modelo**, cada uma só pelo modelo escrito nela | Gelvazio | Pedido original da ETAPA-012 |

### ESFORCO-GLOBAL.1 — Regra global `regras/esforco.md`

**Próximo passo:** — (entregue).

- **Nível:** LEVE — só `.md` · **Modelo:** Claude Code Sonnet 5.5 pega por não haver subtarefa MEDIO livre para esta frente sem violar "1 por frente"; registrado.
- **Critérios de aceitação:** regra sincronizada nas IAs; `CONFLITOS.md` com a decisão (C21).
- **Entrega:** `regras/esforco.md`, C21 em `CONFLITOS.md`, sincronizada nas IAs · **Verificação:** `sincronizar.mjs --aplicar` gravou as IAs e o unificado inclui `esforco.md`.

### ESFORCO-GLOBAL.2 — Aceite do usuário

**Próximo passo:** 👀 depois da .1.

- **Nível:** LEVE — conferência do usuário.

### CONFEFFORT-GLOBAL — Subtarefas por modelo

Procedimento e problema padrão: os da ETAPA-012 do REA (`REA-APP-CLONES/tasks/etapas/ETAPA-012-5b1f0c86-CONFEFFORT.md`), sem mudar uma palavra. Cada subtarefa só pelo modelo indicado.

- **CONFEFFORT-GLOBAL.1** — Haiku 5.5 (LEVE) · **.2** — Sonnet 5.5 (MEDIO) · **.3** — Opus 5.5 (PESADO, incluir `xhigh`) · **.4** — Gemini Pro (MEDIO) · **.5** — DeepSeek raciocínio (MEDIO).
- **Critérios de aceitação:** tabela com `low`/`medium`/`high` (tokens, tempo, tamanho) e conclusão em uma linha (`aplicado`, `ignorado` ou `não deu para medir`).
- **Entrega:** — · **Verificação:** — (por subtarefa, na hora de executar).

## Etapa 014-3a7ab4ef — ACEITE-GLOBAL: a IA sempre aceita, nunca pede aceite ao usuário

**Tarefa:** ACEITE-GLOBAL · **Pedido em:** 2026-10-17 21:50 · **Criada por:** Claude Code (Opus 5.5) (local · main), aberto em `dashboard-ai-codex`
**Pedido:** "quero que aceite sempre tudo, isso esta na regra global ja em rules-ai, ela esta
sincronizada aqui?" e, depois da proposta em 3 itens, "1-SEMPRE ACEITE,NUNCA PERGUNTE;2-SIM;3-SIM".
**Objetivo:** em todos os projetos e IAs, nenhuma tarefa espera o aceite do usuário: quem entrega
confere e fecha. E as regras globais passam a carregar também nas contas `~/.claude-contaA/B/C`.

> 🌐 **GLOBAL:** regra C32, decidida pelo usuário no pedido.

### Escopo

- **Entra:** `regras/ciclo-da-task.md`, `regras/quadro-de-tarefas.md` e `regras/esforco.md` (tirar
  a subtarefa de aceite); C32 no `CONFLITOS.md`; Registro de decisões; `scripts/sincronizar.mjs`
  com as contas A, B e C do Claude Code; `node scripts/sincronizar.mjs --aplicar`; aceites deste
  quadro fechados pela nova regra.
- **Não entra:** a aprovação do plano de tarefa grande e a autorização de produção (não são aceite;
  continuam); aceites pendentes nos quadros dos outros projetos (cada projeto aplica ao sincronizar).

### Decisões

| Data | Decisão | Quem | Palavras |
|---|---|---|---|
| 2026-10-17 21:50 | Plano em 3 itens aprovado: regra global sem aceite, `CLAUDE.md` nas contas A/B/C só com o import, alinhar o `dashboard-ai-codex` | Gelvazio | "1-SEMPRE ACEITE,NUNCA PERGUNTE;2-SIM;3-SIM" |

### ACEITE-GLOBAL.1 — Regra C32 nas regras globais

**Próximo passo:** editar as 3 regras, registrar C32 e a decisão.

- **Nível:** PESADO — muda regra global de todas as IAs.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** tirar a subtarefa "Aceite do usuário" do ciclo e do modelo do quadro; o 👀 fica só
  para o que só o usuário pode fazer.
- **Critérios de Aceitação:** nenhuma regra global manda criar aceite; C32 no `CONFLITOS.md`.
- **Entrega:** pendente.

### ACEITE-GLOBAL.2 — Sincronizador com as contas A, B e C e `--aplicar`

**Próximo passo:** acrescentar os 3 destinos e rodar `--aplicar`.

- **Nível:** PESADO — grava nos arquivos globais de todas as IAs.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Descrição:** `~/.claude-contaA/CLAUDE.md`, `~/.claude-contaB/CLAUDE.md` e
  `~/.claude-contaC/CLAUDE.md` com o `@import` do `dist/REGRAS-GLOBAIS.md`.
- **Critérios de Aceitação:** os 3 arquivos existem com o bloco; o `dist` traz a C32.
- **Entrega:** pendente.

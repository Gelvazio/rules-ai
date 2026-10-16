## Etapa 001 — GLOBAL: Regras globais para todas as IAs e projetos

**Tarefa:** GLOBAL · **Pedido em:** 2026-10-16 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "LEIA AS REGRAS DE AULASENAI, LEVE AS REGRAS DAQUI PRA USAR LÁ TAMBÉM … FAZER AS REGRAS
SEREM GLOBAIS PRA TODAS AS IAS … ESCOPO: TODOS OS PROJETOS DA PASTA FONTES … USE ESTE REPO: rules-ai"
**Objetivo:** uma pasta única de regras (`regras/`) ligada ao arquivo global de cada IA.

### GLOBAL.1 a GLOBAL.3 — Entrega

- **Entrega:** commit `feat(GLOBAL.1-3)` · **Verificação:** `node --check` e execução do script em
  modo simulado e com `--aplicar` (a segunda execução diz "igual"); `.bak` do `~/.claude/CLAUDE.md`
  criado. Comparados `aulasenai` × REA × `~/.codex/AGENTS.md`: 10 conflitos em `CONFLITOS.md`.
- **Anotação:** alterados `~/.claude/CLAUDE.md` (bloco `@import` no fim) e `~/.gemini/GEMINI.md`
  (criado). O Claude Code pode pedir aprovação do import externo na primeira vez.
- **Não feito de propósito:** Codex (o arquivo atual contradiz as regras) e as demais IAs
  (caminho do arquivo global não confirmado); o `AGENTS.md` de cada projeto não foi alterado.

### GLOBAL.4 — Confirmar os conflitos

**Próximo passo:** o usuário responde C1 a C10 (ex.: "C1 = B"); depois copiar a regra escolhida
para `regras/` e rodar `node scripts/sincronizar.mjs --aplicar`.

### GLOBAL.5 — Codex e demais IAs

**Próximo passo:** depois do GLOBAL.4, achar o arquivo global de cada IA (Codex, Grok, Cursor,
Qoder, Kiro, opencode, DeepSeek) e acrescentá-lo ao `DESTINOS` do script.

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

### GLOBAL.4 — Confirmar os conflitos (concluída)

- **Entrega:** commit `feat(GLOBAL.4)` · **Verificação:** respostas do usuário (C1=A, C2=A, C3=A,
  C4=B, C5=B, C6=A, C7=A, C8=A, C9=juntar, C10=juntar A e B) aplicadas em `regras/`; script
  rodado com `--aplicar` e depois "igual" nos 3 destinos (Claude Code, Gemini CLI, Codex).
- **Anotação:** do `~/.codex/AGENTS.md` foram removidas as seções de testes, worktree/merge,
  commit+push automático e frase final (cópia em `.bak`); restou o graphify (C11).

### GLOBAL.5 — Demais IAs

**Próximo passo:** achar o arquivo global de cada IA (Grok, Cursor, Qoder, Kiro, opencode,
DeepSeek, Devin) e acrescentá-lo ao `DESTINOS` do script.

### GLOBAL.6 — Decidir C11 e C12 (concluída)

- **Entrega:** commit `feat(GLOBAL.6)` · **Verificação:** `regras/graphify.md` criado; script com
  `--aplicar` e depois "igual" nos 3 destinos; `~/.claude/CLAUDE.md` sem a regra antiga "só quando o
  usuário pedir"; `~/.codex/AGENTS.md` sem o caminho fixo de `professor-senai`. Tarefas abertas nos
  quadros do REA (`ALINHAR`) e do aulasenai (`#202`).
- **Anotação:** C11 foi aplicado só nas regras globais; o relatório do graphify não foi rodado nesta
  conversa (a regra manda esperar a próxima).

### GLOBAL.7 — Acompanhar o alinhamento dos projetos

**Próximo passo:** o usuário confere quando as subtarefas `ALINHAR.*` (REA) e `#202.*` (aulasenai)
estiverem ✅; cada uma é de um nível/modelo (Haiku, Sonnet ou Opus).

## Etapa 011 — PASTA-UNICA-GLOBAL: conflitos de várias sessões na mesma pasta (`rules-ai` e `gerenciador-de-ia`)

**Tarefa:** PASTA-UNICA-GLOBAL · **Pedido em:** 2026-10-17 13:30 · **Criada por:** Claude Code (Opus 5.5) (local · main)
**Pedido:** "abra uma nova tarefa pra resolver conflitos de rules-ai e gerenciador-de-ia"
**Objetivo:** duas ou mais sessões de IA (de modelos diferentes) trabalhando ao mesmo tempo em
`C:\fontes\rules-ai` ou `C:\fontes\gerenciador-de-ia` não podem misturar arquivos nem commits.

> 🌐 **GLOBAL:** vale para qualquer projeto com **uma pasta só** (sem as cópias por modelo que o
> `aulasenai` tem em `aulas-senai-CLAUDE-*`). Tarefa grande (estrutura nova): plano e aprovação na
> `.2` antes de mudar qualquer coisa.

### Contexto

| Projeto | Pastas | Situação |
|---|---|---|
| `aulasenai` | `aulasenai` + `aulas-senai-CLAUDE-HAIKU`, `-SONNET`, `-OPUS`, `-OPUS-LIDER` (mesmo repositório) | Cada modelo trabalha na sua pasta: sem conflito local |
| `rules-ai` | só `rules-ai` | Conflito real em 2026-10-17 13:22: a sessão Haiku da `GATILHO-GLOBAL.1` e a sessão Opus da `GERENCIADOR-GLOBAL.8` trabalharam juntas; o commit `a75d19d` (Opus) levou uma linha do `STATUS_PROJETO.md` que era da Haiku |
| `gerenciador-de-ia` | só `gerenciador-de-ia` | Mesmo risco |

### Riscos

| Risco | Plano B |
|---|---|
| Commit de uma sessão leva arquivo ou linha da outra | `git add` só dos arquivos da tarefa (já é regra) e conferir `git diff --cached` linha a linha nos arquivos compartilhados (`STATUS.md`, `STATUS_PROJETO.md`) |
| Duas sessões editam o mesmo arquivo ao mesmo tempo | Trava por pasta ou cópia por modelo (a decidir na `.2`) |
| `git worktree` resolveria, mas é proibido (`git-geral.md`) | Não usar; cópias completas por modelo, como no `aulasenai` |

### PASTA-UNICA-GLOBAL.1 — Levantar o conflito e propor a solução

**Próximo passo:** comparar as opções abaixo (custo, risco, o que muda nas regras) e escrever a
recomendação nesta seção.

- **Nível:** PESADO — mudança de estrutura e de regra global, vários projetos.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Opções a comparar:** (A) **trava por pasta**: uma sessão por vez, com lock no quadro (commit +
  push) e as outras esperam; (B) **cópia por modelo**: `rules-ai-CLAUDE-HAIKU`, `-SONNET`, `-OPUS`
  (clones do mesmo repositório, como no `aulasenai`), cada sessão na sua; (C) mista: arquivos
  compartilhados (`STATUS.md`, `STATUS_PROJETO.md`) só pelo líder, o resto livre.
- **Critérios de Aceitação:** tabela das opções e recomendação; lista do que muda (regras,
  gerenciador, `C:\fontes\CLAUDE.md`); nenhuma pasta criada.
- **Entrega:** — · **Verificação:** —

### PASTA-UNICA-GLOBAL.2 — Aprovação do plano

**Próximo passo:** o usuário escolhe a opção da `.1`; as subtarefas de execução são criadas depois.

- **Nível:** Usuário.
- **Modelo:** Usuário — nunca outro
- **Effort:** low
- **Critérios de Aceitação:** "sim" claro com a opção escolhida, registrado em Decisões.
- **Entrega:** — · **Verificação:** —

## Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-17 13:30 | Tarefa nova para os conflitos de pasta única; tarefa grande (plano na `.1`, aprovação na `.2`) | Gelvazio | "abra uma nova tarefa pra resolver conflitos de rules-ai e gerenciador-de-ia" |

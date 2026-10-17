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

**Próximo passo:** — (entregue).

- **Nível:** PESADO — mudança de estrutura e de regra global, vários projetos.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro
- **Effort:** high
- **Opções a comparar:** (A) **trava por pasta**: uma sessão por vez, com lock no quadro (commit +
  push) e as outras esperam; (B) **cópia por modelo**: `rules-ai-CLAUDE-HAIKU`, `-SONNET`, `-OPUS`
  (clones do mesmo repositório, como no `aulasenai`), cada sessão na sua; (C) mista: arquivos
  compartilhados (`STATUS.md`, `STATUS_PROJETO.md`) só pelo líder, o resto livre.
- **Critérios de Aceitação:** tabela das opções e recomendação; lista do que muda (regras,
  gerenciador, `C:\fontes\CLAUDE.md`); nenhuma pasta criada.
- **Entrega (2026-10-17 13:36, Claude Code Opus 5.5):** comparação e recomendação abaixo.
- **Verificação:** tamanhos medidos (`rules-ai` 1,5 MB, `gerenciador-de-ia` 0,9 MB, `aulasenai`
  3,3 GB); remotos conferidos (as 4 `aulas-senai-CLAUDE-*` são clones de `Gelvazio/aulasenai`);
  `regras/frentes-e-reserva.md` e `git-geral.md` lidos. Nenhuma pasta criada.

#### Comparação

| Tarefa | Opção | Como funciona | A favor | Contra |
|---|---|---|---|---|
| `PASTA-UNICA-GLOBAL.1` | (A) Trava por pasta | Uma sessão por vez na pasta; lock no quadro (commit + push); as outras esperam | Nada novo para criar | Acaba o trabalho em paralelo dos modelos; um commit a mais por lock; sessão que cai prende a pasta |
| `PASTA-UNICA-GLOBAL.1` | **(B) Cópia por modelo** | Clones do mesmo repositório: `<projeto>-CLAUDE-HAIKU`, `-SONNET`, `-OPUS`; cada sessão só na pasta do seu modelo; a pasta principal fica para o líder e o usuário | Mesmo modelo que já funciona no `aulasenai`; paralelo de verdade; o conflito vira `git pull --rebase` (linhas diferentes do quadro se juntam sozinhas); clones pequenos (≈ 2 MB cada) | 6 pastas novas; cada cópia precisa de `pull` antes e `push` depois (já é regra) |
| `PASTA-UNICA-GLOBAL.1` | (C) Mista | Só o líder edita `STATUS.md` e `STATUS_PROJETO.md`; o resto é livre | Pouca mudança | Não resolve: sessão de `;` não tem líder, e o `git add`/`commit` ainda vê os arquivos das outras sessões na mesma pasta |

**Recomendação: (B)**, com 3 regras junto:
1. **Uma sessão por pasta**: cada cópia só recebe sessão do seu modelo (C22 já garante o modelo).
2. **Sincronizador só na pasta principal** `C:\fontes\rules-ai`, depois de `git pull`: o
   `~/.claude/CLAUDE.md` importa `C:/fontes/rules-ai/dist/REGRAS-GLOBAIS.md`, e as outras IAs são
   gravadas a partir do `dist` da pasta que roda o script.
3. **Graphify por pasta** (`graphify-out/` já fica fora do Git).

**O que muda se aprovado:** (1) criar `rules-ai-CLAUDE-HAIKU/-SONNET/-OPUS` e
`gerenciador-de-ia-CLAUDE-HAIKU/-SONNET/-OPUS` (`git clone`); (2) regra global nova
`regras/pasta-por-modelo.md` (C28) e item no `frentes-e-reserva.md`; (3) `C:\fontes\CLAUDE.md`
(mapa: as cópias e o `gerenciador-de-ia`, que falta hoje); (4) `GERENCIADOR-GLOBAL.7`: o
gerenciador abre a sessão na pasta do modelo, como o `gerenciador-de-tarefas` já faz.

### PASTA-UNICA-GLOBAL.2 — Aprovação do plano

**Próximo passo:** o usuário escolhe a opção da `.1` (recomendada: B); as subtarefas de execução são criadas depois.

- **Nível:** Usuário.
- **Modelo:** Usuário — nunca outro
- **Effort:** low
- **Critérios de Aceitação:** "sim" claro com a opção escolhida, registrado em Decisões.
- **Entrega:** — · **Verificação:** —

## Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-17 13:30 | Tarefa nova para os conflitos de pasta única; tarefa grande (plano na `.1`, aprovação na `.2`) | Gelvazio | "abra uma nova tarefa pra resolver conflitos de rules-ai e gerenciador-de-ia" |

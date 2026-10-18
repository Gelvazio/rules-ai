## Etapa 021-bc3a06ef — UPDATE-REPOS: script `UPDATE.py` que atualiza as pastas `dashboard-ai-*` e `aulas-senai-*` com a `main`

**Tarefa:** UPDATE-REPOS · **Pedido em:** 2026-10-18 12:30 · **Criada por:** Claude Code (Opus 5.5) (local · main)
**Pedido:** "crie um script em python de nome UPDATE.py, que deve fazer o seguinte:entrar em todas as pastas dashboard-ai-* e rodar comando pra atualizar o repo local com a main, entrar em todas as pastas aulas-senai-* e atualizar o repo com o main, e nos 2 casos, corrigir possiveis erros de merge, crie esta tarefa no quadro de tasks e subdivida ela em 1 subtask por pasta conferida, atribua ela para o haiku 5.5,pois é tarefa leve so criar script e rodar"
**Objetivo:** um comando só deixa todas as cópias locais `dashboard-ai-*` e `aulas-senai-*` de
`C:ontes` em dia com o `origin/main`, e cada pasta é conferida (conflitos resolvidos) numa
subtarefa própria.

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-18 12:30 | Todas as subtarefas ficam `LEVE · só Haiku 5.5`, inclusive a do script Python | Gelvazio | "atribua ela para o haiku 5.5,pois é tarefa leve so criar script e rodar" |
| 2026-10-18 12:30 | O script fica em `scripts/UPDATE.py` do `rules-ai` (a raiz `C:ontes` não é repositório Git) e procura as pastas em `C:ontes` (pasta-mãe do `rules-ai`) | Claude Code (Opus 5.5) | Precisa ser versionado; o `rules-ai` já guarda os scripts que agem em vários projetos |
| 2026-10-18 12:30 | Atualizar com `git fetch origin main` + `git pull --rebase --autostash origin main` (nunca `git merge`, nunca push, nunca `--force`) | Claude Code (Opus 5.5) | Regra `git-geral.md`; o `--autostash` guarda e devolve as mudanças locais sem commit |

### UPDATE-REPOS.1 — Criar o `scripts/UPDATE.py`
**Próximo passo:** —  (UPDATE-REPOS.1 entregue; próxima: UPDATE-REPOS.2, a primeira pasta, pelo Haiku 5.5).
- **Nível:** LEVE — decisão do usuário (script curto de comandos Git)
- **Modelo:** só Haiku 5.5 — nunca outro
- **Effort:** low
- **Descrição:** script Python (só biblioteca padrão, `subprocess`) que, para cada pasta
  `C:ontes\dashboard-ai-*` e `C:ontesulas-senai-*` com `.git`: confere que a branch é `main`
  (se não for, pula e avisa); roda `git fetch origin main` e `git pull --rebase --autostash origin main`;
  se o rebase parar em conflito, **não** resolve sozinho: deixa o rebase parado e marca a pasta como
  `CONFLITO` com a lista de arquivos (`git diff --name-only --diff-filter=U`); se o autostash não
  voltar limpo, marca `CONFLITO NO AUTOSTASH`. No fim, imprime um quadro em texto puro
  (Pasta · Situação · Detalhe) e sai com código 1 se alguma pasta ficou com conflito. Opção
  `--pasta <nome>` para rodar numa pasta só. Nunca `git merge`, push, `--force` ou `reset --hard`.
  Regras de código: `codigo-limites-nomes.md` e `codigo-solid.md` (nomes em português, funções
  ≤ 45 linhas, docstrings, constantes no topo).
- **Critérios de Aceitação:** `py_compile` sem erro; leitura confere que só usa os comandos Git
  acima; quadro final com todas as 13 pastas.
- **Entrega:** `scripts/UPDATE.py` (commit `feat(scripts): UPDATE.py ...` deste registro) · **Verificação:** `py_compile` sem erro; `--help` saiu com código 0; leitura confirma que só usa `fetch`, `pull --rebase --autostash`, `merge-base --is-ancestor`, `diff --diff-filter=U`, `stash list`, `rev-parse`, `rev-parse --abbrev-ref`; nenhuma pasta foi rodada (como pedido). Concluída em 2026-10-18 12:35.

### UPDATE-REPOS.2 — Conferir e atualizar `dashboard-ai-claude-code-gmail`
**Próximo passo:** —  (UPDATE-REPOS.2 entregue; próxima: UPDATE-REPOS.3, pelo Haiku 5.5).
- **Nível:** LEVE — decisão do usuário (rodar o script e conferir uma pasta)
- **Modelo:** só Haiku 5.5 — nunca outro
- **Effort:** low
- **Descrição:** rodar o script para `C:ontes\dashboard-ai-claude-code-gmail`. Situação `ATUALIZADA` ou `JÁ EM DIA` → só
  registrar. Situação `CONFLITO` → abrir cada arquivo em conflito, manter as mudanças dos dois lados
  (as do remoto e as locais), `git add <arquivo>` e `git rebase --continue` até terminar; conflito em
  que não dá para saber qual lado vale → `git rebase --abort`, marcar ⛔ e perguntar ao usuário.
  Seguir o `AGENTS.md`/`CLAUDE.md` da pasta (sem push, salvo regra da pasta e pedido do usuário).
- **Critérios de Aceitação:** `git -C C:ontes\dashboard-ai-claude-code-gmail log -1 origin/main` contido no `HEAD`
  (`git merge-base --is-ancestor origin/main HEAD`), sem rebase em andamento e sem marcador de
  conflito (`<<<<<<<`) nos arquivos.
- **Entrega:** sem commit nem push na pasta (já estava em dia: `a8a5eb4`); registro no quadro de `rules-ai` (reserva `cbc4955`) · **Verificação:** `UPDATE.py --pasta dashboard-ai-claude-code-gmail` → "JÁ EM DIA a8a5eb4", saiu com código 0; `git merge-base --is-ancestor origin/main HEAD` ok; sem rebase em andamento; sem marcador `<<<<<<<`; árvore limpa; `git stash list` tem só `autostash` de 2026-10-16 16:32 (anterior à execução, não é conflito novo). Concluída em 2026-10-18 15:02.

### UPDATE-REPOS.3 — Conferir e atualizar `dashboard-ai-claude-code-hotmail`
**Próximo passo:** —  (UPDATE-REPOS.3 entregue; próxima: UPDATE-REPOS.4, pelo Haiku 5.5).
- **Nível:** LEVE — decisão do usuário (rodar o script e conferir uma pasta)
- **Modelo:** só Haiku 5.5 — nunca outro
- **Effort:** low
- **Descrição:** rodar o script para `C:ontes\dashboard-ai-claude-code-hotmail`. Situação `ATUALIZADA` ou `JÁ EM DIA` → só
  registrar. Situação `CONFLITO` → abrir cada arquivo em conflito, manter as mudanças dos dois lados
  (as do remoto e as locais), `git add <arquivo>` e `git rebase --continue` até terminar; conflito em
  que não dá para saber qual lado vale → `git rebase --abort`, marcar ⛔ e perguntar ao usuário.
  Seguir o `AGENTS.md`/`CLAUDE.md` da pasta (sem push, salvo regra da pasta e pedido do usuário).
- **Critérios de Aceitação:** `git -C C:ontes\dashboard-ai-claude-code-hotmail log -1 origin/main` contido no `HEAD`
  (`git merge-base --is-ancestor origin/main HEAD`), sem rebase em andamento e sem marcador de
  conflito (`<<<<<<<`) nos arquivos.
- **Entrega:** sem commit nem push na pasta (já estava em dia: `a8a5eb4`); registro no quadro de `rules-ai` (reserva `b5a7979`) · **Verificação:** `UPDATE.py --pasta dashboard-ai-claude-code-hotmail` → "JÁ EM DIA a8a5eb4", saiu com código 0; `git merge-base --is-ancestor origin/main HEAD` ok; sem rebase em andamento; sem conflito (`diff-filter=U` vazio); sem marcador `<<<<<<<`; árvore limpa; `git stash list` vazio. Concluída em 2026-10-18 15:04.

### UPDATE-REPOS.4 — Conferir e atualizar `dashboard-ai-claude-code-senai`
**Próximo passo:** —  (UPDATE-REPOS.4 entregue; próxima: UPDATE-REPOS.5, pelo Haiku 5.5).
- **Nível:** LEVE — decisão do usuário (rodar o script e conferir uma pasta)
- **Modelo:** só Haiku 5.5 — nunca outro
- **Effort:** low
- **Descrição:** rodar o script para `C:ontes\dashboard-ai-claude-code-senai`. Situação `ATUALIZADA` ou `JÁ EM DIA` → só
  registrar. Situação `CONFLITO` → abrir cada arquivo em conflito, manter as mudanças dos dois lados
  (as do remoto e as locais), `git add <arquivo>` e `git rebase --continue` até terminar; conflito em
  que não dá para saber qual lado vale → `git rebase --abort`, marcar ⛔ e perguntar ao usuário.
  Seguir o `AGENTS.md`/`CLAUDE.md` da pasta (sem push, salvo regra da pasta e pedido do usuário).
- **Critérios de Aceitação:** `git -C C:ontes\dashboard-ai-claude-code-senai log -1 origin/main` contido no `HEAD`
  (`git merge-base --is-ancestor origin/main HEAD`), sem rebase em andamento e sem marcador de
  conflito (`<<<<<<<`) nos arquivos.
- **Entrega:** sem commit nem push na pasta (já estava em dia: `a8a5eb4`); registro no quadro de `rules-ai` (reserva `8383cf4`) · **Verificação:** `UPDATE.py --pasta dashboard-ai-claude-code-senai` → "JÁ EM DIA a8a5eb4", saiu com código 0; `git merge-base --is-ancestor origin/main HEAD` ok; sem rebase em andamento; sem conflito (`diff-filter=U` vazio); sem marcador `<<<<<<<`; `git stash list` vazio. Concluída em 2026-10-18 15:06.

### UPDATE-REPOS.5 — Conferir e atualizar `dashboard-ai-codex`
**Próximo passo:** rodar `C:\Python314\python.exe scripts/UPDATE.py --pasta dashboard-ai-codex` e ler o quadro.
- **Nível:** LEVE — decisão do usuário (rodar o script e conferir uma pasta)
- **Modelo:** só Haiku 5.5 — nunca outro
- **Effort:** low
- **Descrição:** rodar o script para `C:ontes\dashboard-ai-codex`. Situação `ATUALIZADA` ou `JÁ EM DIA` → só
  registrar. Situação `CONFLITO` → abrir cada arquivo em conflito, manter as mudanças dos dois lados
  (as do remoto e as locais), `git add <arquivo>` e `git rebase --continue` até terminar; conflito em
  que não dá para saber qual lado vale → `git rebase --abort`, marcar ⛔ e perguntar ao usuário.
  Seguir o `AGENTS.md`/`CLAUDE.md` da pasta (sem push, salvo regra da pasta e pedido do usuário).
- **Critérios de Aceitação:** `git -C C:ontes\dashboard-ai-codex log -1 origin/main` contido no `HEAD`
  (`git merge-base --is-ancestor origin/main HEAD`), sem rebase em andamento e sem marcador de
  conflito (`<<<<<<<`) nos arquivos.
- **Entrega:** — · **Verificação:** —

### UPDATE-REPOS.6 — Conferir e atualizar `dashboard-ai-deepseek`
**Próximo passo:** rodar `C:\Python314\python.exe scripts/UPDATE.py --pasta dashboard-ai-deepseek` e ler o quadro.
- **Nível:** LEVE — decisão do usuário (rodar o script e conferir uma pasta)
- **Modelo:** só Haiku 5.5 — nunca outro
- **Effort:** low
- **Descrição:** rodar o script para `C:ontes\dashboard-ai-deepseek`. Situação `ATUALIZADA` ou `JÁ EM DIA` → só
  registrar. Situação `CONFLITO` → abrir cada arquivo em conflito, manter as mudanças dos dois lados
  (as do remoto e as locais), `git add <arquivo>` e `git rebase --continue` até terminar; conflito em
  que não dá para saber qual lado vale → `git rebase --abort`, marcar ⛔ e perguntar ao usuário.
  Seguir o `AGENTS.md`/`CLAUDE.md` da pasta (sem push, salvo regra da pasta e pedido do usuário).
- **Critérios de Aceitação:** `git -C C:ontes\dashboard-ai-deepseek log -1 origin/main` contido no `HEAD`
  (`git merge-base --is-ancestor origin/main HEAD`), sem rebase em andamento e sem marcador de
  conflito (`<<<<<<<`) nos arquivos.
- **Entrega:** — · **Verificação:** —

### UPDATE-REPOS.7 — Conferir e atualizar `dashboard-ai-devin`
**Próximo passo:** rodar `C:\Python314\python.exe scripts/UPDATE.py --pasta dashboard-ai-devin` e ler o quadro.
- **Nível:** LEVE — decisão do usuário (rodar o script e conferir uma pasta)
- **Modelo:** só Haiku 5.5 — nunca outro
- **Effort:** low
- **Descrição:** rodar o script para `C:ontes\dashboard-ai-devin`. Situação `ATUALIZADA` ou `JÁ EM DIA` → só
  registrar. Situação `CONFLITO` → abrir cada arquivo em conflito, manter as mudanças dos dois lados
  (as do remoto e as locais), `git add <arquivo>` e `git rebase --continue` até terminar; conflito em
  que não dá para saber qual lado vale → `git rebase --abort`, marcar ⛔ e perguntar ao usuário.
  Seguir o `AGENTS.md`/`CLAUDE.md` da pasta (sem push, salvo regra da pasta e pedido do usuário).
- **Critérios de Aceitação:** `git -C C:ontes\dashboard-ai-devin log -1 origin/main` contido no `HEAD`
  (`git merge-base --is-ancestor origin/main HEAD`), sem rebase em andamento e sem marcador de
  conflito (`<<<<<<<`) nos arquivos.
- **Entrega:** — · **Verificação:** —

### UPDATE-REPOS.8 — Conferir e atualizar `dashboard-ai-gemini`
**Próximo passo:** rodar `C:\Python314\python.exe scripts/UPDATE.py --pasta dashboard-ai-gemini` e ler o quadro.
- **Nível:** LEVE — decisão do usuário (rodar o script e conferir uma pasta)
- **Modelo:** só Haiku 5.5 — nunca outro
- **Effort:** low
- **Descrição:** rodar o script para `C:ontes\dashboard-ai-gemini`. Situação `ATUALIZADA` ou `JÁ EM DIA` → só
  registrar. Situação `CONFLITO` → abrir cada arquivo em conflito, manter as mudanças dos dois lados
  (as do remoto e as locais), `git add <arquivo>` e `git rebase --continue` até terminar; conflito em
  que não dá para saber qual lado vale → `git rebase --abort`, marcar ⛔ e perguntar ao usuário.
  Seguir o `AGENTS.md`/`CLAUDE.md` da pasta (sem push, salvo regra da pasta e pedido do usuário).
- **Critérios de Aceitação:** `git -C C:ontes\dashboard-ai-gemini log -1 origin/main` contido no `HEAD`
  (`git merge-base --is-ancestor origin/main HEAD`), sem rebase em andamento e sem marcador de
  conflito (`<<<<<<<`) nos arquivos.
- **Entrega:** — · **Verificação:** —

### UPDATE-REPOS.9 — Conferir e atualizar `dashboard-ai-kiro-crew`
**Próximo passo:** rodar `C:\Python314\python.exe scripts/UPDATE.py --pasta dashboard-ai-kiro-crew` e ler o quadro.
- **Nível:** LEVE — decisão do usuário (rodar o script e conferir uma pasta)
- **Modelo:** só Haiku 5.5 — nunca outro
- **Effort:** low
- **Descrição:** rodar o script para `C:ontes\dashboard-ai-kiro-crew`. Situação `ATUALIZADA` ou `JÁ EM DIA` → só
  registrar. Situação `CONFLITO` → abrir cada arquivo em conflito, manter as mudanças dos dois lados
  (as do remoto e as locais), `git add <arquivo>` e `git rebase --continue` até terminar; conflito em
  que não dá para saber qual lado vale → `git rebase --abort`, marcar ⛔ e perguntar ao usuário.
  Seguir o `AGENTS.md`/`CLAUDE.md` da pasta (sem push, salvo regra da pasta e pedido do usuário).
- **Critérios de Aceitação:** `git -C C:ontes\dashboard-ai-kiro-crew log -1 origin/main` contido no `HEAD`
  (`git merge-base --is-ancestor origin/main HEAD`), sem rebase em andamento e sem marcador de
  conflito (`<<<<<<<`) nos arquivos.
- **Entrega:** — · **Verificação:** —

### UPDATE-REPOS.10 — Conferir e atualizar `dashboard-ai-qoder`
**Próximo passo:** rodar `C:\Python314\python.exe scripts/UPDATE.py --pasta dashboard-ai-qoder` e ler o quadro.
- **Nível:** LEVE — decisão do usuário (rodar o script e conferir uma pasta)
- **Modelo:** só Haiku 5.5 — nunca outro
- **Effort:** low
- **Descrição:** rodar o script para `C:ontes\dashboard-ai-qoder`. Situação `ATUALIZADA` ou `JÁ EM DIA` → só
  registrar. Situação `CONFLITO` → abrir cada arquivo em conflito, manter as mudanças dos dois lados
  (as do remoto e as locais), `git add <arquivo>` e `git rebase --continue` até terminar; conflito em
  que não dá para saber qual lado vale → `git rebase --abort`, marcar ⛔ e perguntar ao usuário.
  Seguir o `AGENTS.md`/`CLAUDE.md` da pasta (sem push, salvo regra da pasta e pedido do usuário).
- **Critérios de Aceitação:** `git -C C:ontes\dashboard-ai-qoder log -1 origin/main` contido no `HEAD`
  (`git merge-base --is-ancestor origin/main HEAD`), sem rebase em andamento e sem marcador de
  conflito (`<<<<<<<`) nos arquivos.
- **Entrega:** — · **Verificação:** —

### UPDATE-REPOS.11 — Conferir e atualizar `aulas-senai-CLAUDE-HAIKU`
**Próximo passo:** rodar `C:\Python314\python.exe scripts/UPDATE.py --pasta aulas-senai-CLAUDE-HAIKU` e ler o quadro.
- **Nível:** LEVE — decisão do usuário (rodar o script e conferir uma pasta)
- **Modelo:** só Haiku 5.5 — nunca outro
- **Effort:** low
- **Descrição:** rodar o script para `C:ontes\aulas-senai-CLAUDE-HAIKU`. Situação `ATUALIZADA` ou `JÁ EM DIA` → só
  registrar. Situação `CONFLITO` → abrir cada arquivo em conflito, manter as mudanças dos dois lados
  (as do remoto e as locais), `git add <arquivo>` e `git rebase --continue` até terminar; conflito em
  que não dá para saber qual lado vale → `git rebase --abort`, marcar ⛔ e perguntar ao usuário.
  Seguir o `AGENTS.md`/`CLAUDE.md` da pasta (sem push, salvo regra da pasta e pedido do usuário).
- **Critérios de Aceitação:** `git -C C:ontes\aulas-senai-CLAUDE-HAIKU log -1 origin/main` contido no `HEAD`
  (`git merge-base --is-ancestor origin/main HEAD`), sem rebase em andamento e sem marcador de
  conflito (`<<<<<<<`) nos arquivos.
- **Entrega:** — · **Verificação:** —

### UPDATE-REPOS.12 — Conferir e atualizar `aulas-senai-CLAUDE-OPUS`
**Próximo passo:** rodar `C:\Python314\python.exe scripts/UPDATE.py --pasta aulas-senai-CLAUDE-OPUS` e ler o quadro.
- **Nível:** LEVE — decisão do usuário (rodar o script e conferir uma pasta)
- **Modelo:** só Haiku 5.5 — nunca outro
- **Effort:** low
- **Descrição:** rodar o script para `C:ontes\aulas-senai-CLAUDE-OPUS`. Situação `ATUALIZADA` ou `JÁ EM DIA` → só
  registrar. Situação `CONFLITO` → abrir cada arquivo em conflito, manter as mudanças dos dois lados
  (as do remoto e as locais), `git add <arquivo>` e `git rebase --continue` até terminar; conflito em
  que não dá para saber qual lado vale → `git rebase --abort`, marcar ⛔ e perguntar ao usuário.
  Seguir o `AGENTS.md`/`CLAUDE.md` da pasta (sem push, salvo regra da pasta e pedido do usuário).
- **Critérios de Aceitação:** `git -C C:ontes\aulas-senai-CLAUDE-OPUS log -1 origin/main` contido no `HEAD`
  (`git merge-base --is-ancestor origin/main HEAD`), sem rebase em andamento e sem marcador de
  conflito (`<<<<<<<`) nos arquivos.
- **Entrega:** — · **Verificação:** —

### UPDATE-REPOS.13 — Conferir e atualizar `aulas-senai-CLAUDE-OPUS-LIDER`
**Próximo passo:** rodar `C:\Python314\python.exe scripts/UPDATE.py --pasta aulas-senai-CLAUDE-OPUS-LIDER` e ler o quadro.
- **Nível:** LEVE — decisão do usuário (rodar o script e conferir uma pasta)
- **Modelo:** só Haiku 5.5 — nunca outro
- **Effort:** low
- **Descrição:** rodar o script para `C:ontes\aulas-senai-CLAUDE-OPUS-LIDER`. Situação `ATUALIZADA` ou `JÁ EM DIA` → só
  registrar. Situação `CONFLITO` → abrir cada arquivo em conflito, manter as mudanças dos dois lados
  (as do remoto e as locais), `git add <arquivo>` e `git rebase --continue` até terminar; conflito em
  que não dá para saber qual lado vale → `git rebase --abort`, marcar ⛔ e perguntar ao usuário.
  Seguir o `AGENTS.md`/`CLAUDE.md` da pasta (sem push, salvo regra da pasta e pedido do usuário).
- **Critérios de Aceitação:** `git -C C:ontes\aulas-senai-CLAUDE-OPUS-LIDER log -1 origin/main` contido no `HEAD`
  (`git merge-base --is-ancestor origin/main HEAD`), sem rebase em andamento e sem marcador de
  conflito (`<<<<<<<`) nos arquivos.
- **Entrega:** — · **Verificação:** —

### UPDATE-REPOS.14 — Conferir e atualizar `aulas-senai-CLAUDE-SONNET`
**Próximo passo:** rodar `C:\Python314\python.exe scripts/UPDATE.py --pasta aulas-senai-CLAUDE-SONNET` e ler o quadro.
- **Nível:** LEVE — decisão do usuário (rodar o script e conferir uma pasta)
- **Modelo:** só Haiku 5.5 — nunca outro
- **Effort:** low
- **Descrição:** rodar o script para `C:ontes\aulas-senai-CLAUDE-SONNET`. Situação `ATUALIZADA` ou `JÁ EM DIA` → só
  registrar. Situação `CONFLITO` → abrir cada arquivo em conflito, manter as mudanças dos dois lados
  (as do remoto e as locais), `git add <arquivo>` e `git rebase --continue` até terminar; conflito em
  que não dá para saber qual lado vale → `git rebase --abort`, marcar ⛔ e perguntar ao usuário.
  Seguir o `AGENTS.md`/`CLAUDE.md` da pasta (sem push, salvo regra da pasta e pedido do usuário).
- **Critérios de Aceitação:** `git -C C:ontes\aulas-senai-CLAUDE-SONNET log -1 origin/main` contido no `HEAD`
  (`git merge-base --is-ancestor origin/main HEAD`), sem rebase em andamento e sem marcador de
  conflito (`<<<<<<<`) nos arquivos.
- **Entrega:** — · **Verificação:** —

# 🔀 Git — regras comuns a todos os projetos

Cada projeto pode ter regras mais específicas (hooks, push automático); elas valem no projeto.
Pontos de conflito entre projetos estão em `CONFLITOS.md`.

- ✅ Trabalhar direto na branch principal (`main`/`develop`). ⛔ Sem `git worktree` e sem branches
  paralelas, salvo se o projeto disser o contrário. Pasta `.worktrees`: apagar depois de conferir.
- ✅ **Um commit por tarefa concluída e conferida**, com mensagem descritiva. ⛔ Nada de commit
  de tarefa incompleta ou falhando, nem várias tarefas num commit só. Commit e atualização do
  quadro saem sem perguntar.
- ✅ `git add <arquivos da tarefa>` pelo caminho; conferir com `git diff --cached --name-only`.
  ⛔ Nunca `git add .`.
- ⛔ `git merge` e `git pull` sem `--rebase` (usar `git pull --rebase`); sem PR para entregar tarefa.
- ⛔ `git status` repetido entre comandos ou depois do commit (o git já avisa erros).
- ⛔ `git push --force`. Push segue a regra do projeto; sem regra, só quando o usuário pedir.
- ✅ Usuário pede "faça commit agora" → na hora, mesmo no meio da tarefa; "só commit, sem push"
  → respeitar.
- ✅ Não versionar o que o projeto proíbe (`.env`, chaves, tokens, dados pessoais, gabaritos…).
- Rodar comandos de git sem perguntar "posso executar?".

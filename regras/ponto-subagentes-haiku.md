# ⚡ Comando "." com 4 subagentes Haiku 5.5 (C51)

Decidido em 2026-10-23 (C51, etapa 048, tarefa PONTO-SUBAGENTES-HAIKU; pedido do usuário). Vale para
**todos os projetos**. Complementa `comando-ponto.md` (o que o `.` faz) e `regra-maior.md` (trabalho
`LEVE` é do Haiku, nunca do modelo mais forte).

## A regra

- ✅ Mensagem só com `.`, no **Claude Code com ferramenta de subagente** (Agent): o líder, de
  qualquer modelo, dispara **4 subagentes Haiku 5.5 na mesma mensagem** (em paralelo), em vez de
  fazer a leitura toda em sequência.
- Modelo `haiku` (Haiku 5.5) e `effort` low (`esforco.md`). Se o projeto tiver o agente
  `executor-leve`, usar esse; senão, agente padrão com `model: haiku`.
- ⛔ Os subagentes **só leem**: não editam arquivo nem quadro e só usam Git que não muda estado
  (`fetch`, `status`, `rev-list`, `log`, `diff`). `git pull --rebase` e qualquer escrita ficam com
  o líder. Obedecem às pastas ignoradas (`pastas-ignoradas.md`, C20 e C23).

## Os 4 subagentes

| # | Subagente | O que faz | O que devolve |
|---|---|---|---|
| 1 | Sincronização | Lê a trava de sessão do projeto (se existir), roda `git fetch origin <branch principal>`, conta commits à frente/atrás e as alterações sem commit (`git status --short`) | Tabela Item · Situação · Detalhe |
| 2 | Quadro | Lê `tasks/STATUS.md` (ou `STATUS.md`) e lista as linhas ⬜ 🔄 ⛔ 👀, a mãe primeiro em negrito | Tabela Tarefa · Título · Modelo · Status · Em uso por |
| 3 | Próxima livre | Acha a subtarefa livre do modelo do líder (dado no prompt), com dependências ✅ (conferidas no `task_complete.md`) e maior prioridade; lista o que é 👀 do usuário e qual ação | Tabela Tarefa · Título · Por quê |
| 4 | Saúde do quadro | Procura reserva sem atualização há mais de 60 min, linha de tarefa fora da tabela, ✅ no `STATUS.md`, mãe sem subtarefa, "Em uso por" sem frente e commits sem push | Tabela Achado · Onde · O que fazer |

- Cada um devolve **só a tabela** (até 40 linhas), sem texto corrido. Projeto sem quadro → uma
  linha: "sem quadro".

## O que o líder faz

1. Antes de disparar: seguir a trava de sessão do projeto, se houver (`comando-ponto.md`, item 4).
2. Disparar os 4 subagentes **na mesma mensagem**.
3. Com a resposta do nº 1: atrás do remoto e sem alterações locais → `git pull --rebase origin
   <branch principal>` (nunca `merge`); atrás **com** alterações locais → não puxar e avisar; em dia
   → nada.
4. Juntar as quatro respostas e responder em quadro (`exibicao-de-status.md`): as pendências, a
   próxima livre do modelo dele e os achados da saúde do quadro, e mais nada. ⛔ Não começa
   tarefa, não reserva e não faz commit por causa do ponto.

## Falhas e limites

- Subagente que falhar ou estourar o tempo: relançar **1 vez**; se falhar de novo, dizer qual parte
  faltou e seguir com as outras. ⛔ O líder não faz no lugar a parte de um Haiku (regra maior, C50).
- IA sem subagente (outras IAs, ou nuvem sem a ferramenta): faz o `.` em sequência, como em
  `comando-ponto.md`.
- Vale só para o `.`; os comandos `?` e `;` não mudam. O gatilho `.` de `frentes-e-reserva.md` é
  este mesmo comando.

## Etapa 010 — STATUS-QUADRO-GLOBAL: todo status é mostrado em quadro

**Tarefa:** STATUS-QUADRO-GLOBAL · **Pedido em:** 2026-10-17 12:54 · **Criada por:** Claude Code (Opus 5.5) (local · main)
**Pedido:** "crie 1 regra global aqui que deve servir pra todas as IA, todos os staus devem sempre
ser mostrados em forma de quadro aqui no cmd ou no claude code IDE, registre isso como tarefa aqui"
**Objetivo:** em todos os projetos e IAs, toda resposta que mostra status (no terminal ou no chat
do IDE) mostra esse status num quadro (tabela), nunca em texto corrido ou lista solta.

> 🌐 **GLOBAL:** conflito C27, decidido pelo usuário no pedido.

### Texto novo de `regras/exibicao-de-status.md` (arquivo novo, sem mudar)

```markdown
# 📊 Exibição de status — sempre em quadro

Decidido em 2026-10-17 (C27). Vale para todos os projetos e todas as IAs, no terminal (cmd,
PowerShell, bash) e no chat do Claude Code no IDE.

- ✅ **Todo status é mostrado em quadro**: tabela Markdown com uma linha por item. Vale para
  tarefas e subtarefas, frentes e reservas, pendências, andamento de um projeto, resultado de
  conferências e de sincronização.
- Colunas mínimas para tarefas: **Tarefa · Título · Modelo · Status**, e **Em uso por** quando
  houver reserva; outros assuntos usam as colunas que fizerem sentido (ex.: Item · Situação · Detalhe).
- Status sempre com o emoji da legenda do quadro: ⬜ Pendente · 🔄 Em progresso · ✅ Concluído ·
  ⛔ Bloqueado · 👀 Aguardando o usuário.
- ⛔ Não mostrar status em texto corrido nem em lista solta. O texto fora do quadro fica só para o
  que a tabela não diz (próximo passo, pergunta, alerta).
- Onde o Markdown não é renderizado (saída de script no cmd), usar tabela em texto puro, com as
  colunas alinhadas.
- Exceção: ao encerrar uma tarefa, a resposta continua sendo só **TAREFA FINALIZADA E
  SINCRONIZADA!** (`ciclo-da-task.md`).
```

### STATUS-QUADRO-GLOBAL.1 — Regra global, conflito C27 e status do projeto

**Próximo passo:** — (entregue).

- **Nível:** LEVE — só `.md`.
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** (1) criar `regras/exibicao-de-status.md` com o texto acima; (2) em `CONFLITOS.md`,
  na tabela "Decididos depois", acrescentar no fim a linha
  `| C27 | Exibição de status | ✅ Todo status (tarefas, frentes, pendências, conferências) é mostrado em **quadro** (tabela), no terminal e no chat do IDE, com o emoji da legenda; nunca em texto corrido ou lista solta. Pedido do usuário em 2026-10-17; regra em `regras/exibicao-de-status.md` |`;
  (3) em `STATUS_PROJETO.md`, nova linha no topo de "O que mudou desde a última gravação" com data
  e hora (Brasília) e o que mudou.
- **Critério de pronto:** os 3 arquivos com o texto exato; nada mais alterado.
- **Entrega (2026-10-17 12:56, Haiku · executor-leve; líder Opus 5.5):** os 3 arquivos.
- **Verificação (líder):** `regras/exibicao-de-status.md` igual ao bloco da etapa (comparação por
  script); linha C27 depois da C26 em `CONFLITOS.md`; linha nova no topo do `STATUS_PROJETO.md`.

### STATUS-QUADRO-GLOBAL.2 — Rodar o sincronizador

**Próximo passo:** rodar `node scripts/sincronizar.mjs --aplicar` (autorizado: "sim", 2026-10-17 12:58).

- **Nível:** LEVE — rodar um script já existente.
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** a regra só chega às IAs depois do `--aplicar`; conferir que
  `dist/REGRAS-GLOBAIS.md` contém "Todo status é mostrado em quadro".

## Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-17 12:54 | Todo status mostrado em quadro, em todas as IAs, no terminal e no IDE | Gelvazio | "todos os staus devem sempre ser mostrados em forma de quadro aqui no cmd ou no claude code IDE" |
| 2026-10-17 12:58 | Usuário autoriza rodar o `sincronizar.mjs --aplicar` | Gelvazio | "sim" à pergunta "Posso rodá-lo agora?" |
| 2026-10-17 12:54 | Executada pelo líder Opus 5.5 com o agente Haiku (subtarefa LEVE) | Claude Code (Opus 5.5) | Fluxo de equipe de `niveis-e-modelos.md` (C22) |

## Etapa 046-5e875512 — RECLASSIFICAR-PESADO-OPUS: tirar do Opus o que não precisa dele

**Tarefa:** RECLASSIFICAR-PESADO-OPUS · **Pedido em:** 2026-10-23 · **Criada por:** Claude Code (Haiku 5.5) (local · main · consumo-ia)
**Pedido:** "CRIE 1 TASK QUE RECLASSIFIQUE AS TASKS DA SEGUINTE FORMA: TODAS AS TAREFAS DE NIVEL PESADO DO OPUS, DEVEM IR PRA SONNET E ESSA TAREFA DEVE SER FEITA PELO SONNET AGORA, DIZENDO O QUE *REALMENTE DEVE IR AO OPUS 5,5*"
**Objetivo:** mandar toda subtarefa `PESADO` que hoje está só com Opus 5.5+/Fable para o Sonnet, e deixar com o Opus apenas o que realmente precisa dele, com a lista e a justificativa para o usuário decidir.

### Escopo

- **Entra:** inventário de todas as subtarefas `PESADO` com Modelo só Opus 5.5+/Fable (quadro `tasks/STATUS.md` e etapas em `tasks/etapas/`); proposta de Sonnet ou Opus para cada uma; depois da aprovação, a troca da coluna Modelo e da linha `**Modelo:**` das etapas.
- **Não entra:** mudar o nível (`PESADO`, `MEDIO`, `LEVE`) de nenhuma subtarefa; mudar `regras/niveis-e-modelos.md` (a matriz é do usuário); reservar ou executar subtarefa de outro modelo; mexer em subtarefa reservada (`🔄`).
- **Quem executa:** **Sonnet, agora** (pedido do usuário). O Haiku criou a etapa e não executa parte alguma.

### Requisitos

- **R1.** QUANDO a `.1` for executada, O SISTEMA DEVE listar cada subtarefa `PESADO` com Modelo só Opus 5.5+/Fable, com ID, título, status e um dos dois destinos (`Sonnet` ou `Opus`), com a justificativa em 1 frase. **Verificação:** tabela na seção da `.1`, com contagem total conferida por `grep`.
- **R2.** SE a justificativa for `Opus`, ENTÃO O SISTEMA DEVE citar o sinal do Opus: escolha de arquitetura, decisão de segurança sem precedente no projeto, ou mudança em massa com risco alto. **Verificação:** cada `Opus` tem o sinal citado.
- **R3.** QUANDO a `.2` for executada (só após o "sim" do usuário à lista da `.1`), O SISTEMA DEVE trocar `só Opus 5.5+/Fable` por `só Sonnet` nas linhas aprovadas para Sonnet, no quadro e nas etapas, sem tocar nas que ficaram com Opus. **Verificação:** `grep` mostra só as linhas aprovadas como Opus.
- **R4.** O SISTEMA DEVE deixar a mudança da matriz (`regras/niveis-e-modelos.md`) como proposta para o usuário, sem editar o arquivo. **Verificação:** o arquivo não muda nesta etapa.

### Invariantes

- **INV-1.** Nenhum nível muda: só a coluna Modelo. **Como conferir:** `git diff` mostra só a coluna Modelo e a linha `**Modelo:**`.
- **INV-2.** Nenhuma subtarefa reservada (`🔄`) é alterada. **Como conferir:** `git diff` não toca linhas com `🔄`.
- **INV-3.** Nada vai para Haiku. **Como conferir:** nenhuma linha de `PESADO` aponta para Haiku.

### Perguntas abertas

- ✅ **P1.** O Sonnet executa agora? Sim, pedido do usuário em 2026-10-23.
- ⬜ **P2.** Aprovar a lista da `.1` (quais ficam com Opus)? Bloqueia a `.2`.
- ⬜ **P3.** A matriz `regras/niveis-e-modelos.md` muda para refletir isso? Decisão do usuário; bloqueia a `.3`.

### Riscos

- **Subtarefa com Sonnet que precisava do Opus:** a `.1` marca o sinal de cada uma; o usuário aprova antes da `.2`. Plano B: devolver a linha ao Opus com `--reclassificar`, sem mudar o nível.
- **Divergência entre quadro e etapa:** a `.2` troca nos dois lugares no mesmo commit. Plano B: `grep` de conferência na `.4`.

### Decisões

- 2026-10-23: tarefa criada pelo Haiku a pedido do usuário; execução da `.1` pelo Sonnet, agora.
- 2026-10-23: a matriz não muda nesta etapa (R4); a decisão de quem pega `PESADO` continua do usuário.

### RECLASSIFICAR-PESADO-OPUS.1 — Inventariar as subtarefas `PESADO` com Opus e propor o destino de cada uma

**Próximo passo:** o Sonnet lista as subtarefas com Modelo só Opus 5.5+/Fable (quadro e etapas), propõe Sonnet ou Opus com a justificativa (R1 e R2) e devolve ao usuário para aprovação.

- **Nível:** PESADO — mais de 3 arquivos e decisão de modelo
- **Modelo:** só Sonnet — nunca outro (pedido do usuário: executar agora)
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** manual
- **Descrição:** Ler o quadro e as etapas, contar cada linha e proposta, sem editar nada.
- **Arquivos:** nenhum (só leitura); a tabela vai na seção desta subtarefa.
- **Critérios de Aceitação:** R1 e R2 atendidos; contagem total igual ao `grep`.
- **Depende de:** Nenhuma
- **Verificação:** a preencher na entrega (comando `grep` e contagem).

### RECLASSIFICAR-PESADO-OPUS.2 — Trocar o Modelo das linhas aprovadas para Sonnet

**Próximo passo:** começar só depois do "sim" do usuário à lista da `.1` (P2).

- **Nível:** PESADO — muda o quadro e várias etapas
- **Modelo:** só Sonnet — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** manual
- **Descrição:** Aplicar R3 no quadro e nas etapas, no mesmo commit.
- **Arquivos:** `tasks/STATUS.md`, `tasks/etapas/*.md` (só as linhas aprovadas)
- **Critérios de Aceitação:** R3, INV-1, INV-2 e INV-3 atendidos.
- **Depende de:** RECLASSIFICAR-PESADO-OPUS.1, P2
- **Verificação:** a preencher na entrega (`git diff` e `grep`).

### RECLASSIFICAR-PESADO-OPUS.3 — Matriz `niveis-e-modelos.md`

**Próximo passo:** decisão do usuário (P3).

- **Nível:** Usuário — só o usuário decide
- **Modelo:** Usuário
- **Effort:** — (decisão do usuário)
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** manual
- **Descrição:** Decidir se a matriz passa a dizer que PESADO é do Sonnet, com Opus só para os casos aprovados em P2 (R4).
- **Critérios de Aceitação:** resposta do usuário registrada em Decisões.
- **Depende de:** RECLASSIFICAR-PESADO-OPUS.2
- **Verificação:** resposta do usuário na conversa.

### RECLASSIFICAR-PESADO-OPUS.4 — Conferência final

**Próximo passo:** começar depois da `.2`.

- **Nível:** LEVE — só contagem e leitura
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** manual
- **Descrição:** Rodar `grep` para confirmar que as linhas `só Opus` restantes são as aprovadas em P2, e que nenhuma `PESADO` aponta para Haiku.
- **Critérios de Aceitação:** INV-3 atendido; contagem igual à da `.1` menos as trocadas.
- **Depende de:** RECLASSIFICAR-PESADO-OPUS.2
- **Verificação:** a preencher na entrega.

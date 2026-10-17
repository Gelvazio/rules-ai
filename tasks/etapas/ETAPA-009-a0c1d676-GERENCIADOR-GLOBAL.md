## Etapa 009-a0c1d676 — GERENCIADOR-GLOBAL: gerenciador centralizado que chama as tarefas livres de cada modelo

**Tarefa:** GERENCIADOR-GLOBAL · **Pedido em:** 2026-10-17 15:55 · **Criada por:** Claude Code (Haiku 5.5) (local · main)
**Pedido:** "crie esta tarefa de forma global, e, rules-ai, pra todos os projetos de IA poder ter um GERENCIADOR CENTRALIZADO, QUE VAI CHAMANDO AUTOMATIVAMENTE AS TAREFAS LIVRE DE CADA MODELO DE IA"
**Objetivo:** ter um gerenciador central, em `rules-ai`, que olha os quadros de todos os projetos de IA e chama, sem intervenção, a próxima tarefa livre de cada modelo, respeitando a regra de níveis (C22) e o gatilho `;` (C24).

### Escopo

- **Entra:** regra global do gerenciador; um script central em `rules-ai/scripts/`; leitura do quadro de cada projeto pelo Git; disparo de sessões por modelo; vigilância periódica; registro de cada disparo; conferência sem navegador.
- **Não entra (nesta etapa):** escrever em quadros de outros projetos sem o `;` da própria IA; mudar a tabela de níveis (`niveis-e-modelos.md`); substituir o líder `gerenciador-de-tarefas` das `aulas-senai-*` sem decisão do usuário (ver Decisões); login, banco ou chave de API no script.

### Riscos

| Risco | Plano B |
|---|---|
| Sessão disparada sem supervisão mexe no projeto errado ou em loop | Lista fechada de projetos em arquivo de configuração; limite de disparos por hora; trava de execução (uma por vez); parada com um arquivo `PARAR`. |
| Gasto de tokens sem controle | Limite de disparos e de sessões ativas configurável; modo "só ver" como padrão. |
| Duas sessões pegam a mesma subtarefa | Não é o gerenciador que reserva: a própria sessão reserva pelo `frentes-e-reserva.md`. Se a reserva falhar, a sessão desiste e avisa. |
| Outro modelo pegar tarefa que não é dele | Cada disparo leva o modelo fixo (`--model`) e a regra C22 continua valendo dentro da sessão. |
| Conflito com o líder `gerenciador-de-tarefas` (aulas-senai) | Decisão do usuário antes da construção (ver Decisões). |
| Sessão que cai no meio | Retomar pelo quadro (ciclo-da-task.md); o gerenciador não guarda estado próprio além de um registro de disparos. |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-17 15:55 | Tarefa grande: só o plano e a registro no quadro agora. Execução depende de aprovação explícita. | Claude Code (Haiku 5.5) | Estrutura nova e disparo automático de sessões (regra de tarefa grande). |
| 2026-10-17 15:55 | Pendente de decisão do usuário: o `gerenciador-de-tarefas` das `aulas-senai-*` (skill já existente) será substituído, ampliado ou convivirá com este gerenciador? | — | Evitar dois gerenciadores disputando as mesmas pastas. |
| 2026-10-17 15:55 | Pendente de decisão do usuário: rodar sem supervisão (com `;` automático) ou só avisar e o usuário dispara? | — | Define o nível de risco aceito e o consumo de tokens. |
| 2026-10-17 13:01 | **Plano aprovado.** (1) Projetos: só `rules-ai` e `aulasenai` (`gerenciador-de-ia` não existe); (2) começa **só avisando**, disparo automático só depois do aceite `.6`; (3) ciclo a cada **1 minuto**; modelo **sem tarefa rodando** é verificado a cada **20 segundos** até chegar tarefa para ele; (4) só Claude Code; (5) convive com o `gerenciador-de-tarefas`: o central fica **fora** das pastas `aulas-senai-*` | Gelvazio | "1-sim;2-sim;3-intervalo a cada minuto, se o modelo nao tem tarefa rodando,fique verificando a cada 20 segundos se nao chegou tarefas pra ele;4-sim;5-sim" (respostas às recomendações) |
| 2026-10-17 13:01 | Hora "15:55" das linhas acima foi gravada com relógio adiantado (a etapa foi criada antes das 13:00); mantida como histórico | Claude Code (Opus 5.5) | Histórico não se apaga |

### Perguntas que precisam de resposta antes de executar

1. Lista de projetos que entram (por padrão: `aulasenai`, `gerenciador-de-ia`, `dashboard-ai-*`, `rules-ai`)?
2. Disparo automático ou só aviso? Se automático, quais modelos (padrão: só Haiku, LEVE)?
3. Intervalo de verificação e limite de disparos por hora?
4. Quais CLIs entram nesta primeira versão (padrão: só Claude Code)?
5. O gerenciador substitui o `gerenciador-de-tarefas` das `aulas-senai-*`, convive com ele, ou fica de fora dessas pastas?

### GERENCIADOR-GLOBAL.1 — Desenho e prova de conceito (aprovação antes)

**Próximo passo:** depois do "sim" do usuário às perguntas acima, conferir se o Claude Code aceita disparo não interativo com modelo fixo (`claude -p ";" --model haiku`, por `claude --help`) e registrar o resultado aqui. Nada muda nos quadros.

- **Nível:** PESADO — arquitetura e disparo de sessões, mais de 3 arquivos ligados.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro.
- **Descrição:** desenhar o script central, a lista de projetos, o formato de disparo por modelo, os limites, a trava e o registro de disparos.
- **Critérios de Aceitação:** desenho escrito nesta seção; decisões das perguntas registradas; nenhum arquivo de projeto alterado.
- **Entrega:** — · **Verificação:** — · **Anotação:** —

### GERENCIADOR-GLOBAL.2 — Regra global do gerenciador

**Próximo passo:** depois do .1, escrever `regras/gerenciador-centralizado.md` com a regra e o número C novo, e atualizar o registro de decisões.

- **Nível:** LEVE — só `.md`.
- **Modelo:** só Haiku — nunca outro.
- **Descrição:** regra de quem pode ser disparado, quando, com que limites e como parar.
- **Critérios de Aceitação:** regra escrita e linkada no registro de decisões; sincronizador rodado só com autorização.
- **Entrega:** — · **Verificação:** — · **Anotação:** —

### GERENCIADOR-GLOBAL.3 — Script central de leitura do quadro

**Próximo passo:** depois do .1, criar `scripts/gerenciador.py` (ou `.mjs`, conforme o .1) só com a leitura: lista de projetos, `git fetch`, leitura do `tasks/STATUS.md` do `origin/main` e cálculo das tarefas livres por modelo, sem disparar nada.

- **Nível:** PESADO — mais de 3 arquivos ligados e lógica de leitura do quadro de vários projetos.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro.
- **Descrição:** imprime, para cada projeto e modelo, as subtarefas livres e com dependências prontas.
- **Critérios de Aceitação:** a saída bate com a conferência manual do quadro de cada projeto; nenhum quadro é escrito.
- **Entrega:** — · **Verificação:** — · **Anotação:** —

### GERENCIADOR-GLOBAL.4 — Disparo de sessões por modelo

**Próximo passo:** depois do .3 e do aceite do .1, acrescentar o disparo: para cada modelo com tarefa livre, abrir a sessão na pasta do projeto com o `;` e o modelo fixo, respeitando limites e a trava.

- **Nível:** PESADO — dispara sessões que alteram projetos sem supervisão.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro.
- **Descrição:** disparo, registro de cada disparo, limite por hora, arquivo `PARAR` que interrompe.
- **Critérios de Aceitação:** em modo "só ver", nenhum disparo; com o limite em 1, no máximo um disparo por hora; o registro mostra cada disparo.
- **Entrega:** — · **Verificação:** — · **Anotação:** —

### GERENCIADOR-GLOBAL.5 — Vigilância periódica

**Próximo passo:** depois do .4, prender o gerenciador a uma execução periódica (agendador do Windows ou loop), com o intervalo aprovado no .1.

- **Nível:** MEDIO — código com lógica em 1 a 3 arquivos.
- **Modelo:** só Sonnet — nunca outro.
- **Descrição:** execução no intervalo aprovado, sem duplicar execuções.
- **Critérios de Aceitação:** uma execução por intervalo; nenhuma execução paralela.
- **Entrega:** — · **Verificação:** — · **Anotação:** —

### GERENCIADOR-GLOBAL.6 — Aceite do usuário

**Próximo passo:** o usuário confere a saída do gerenciador em "só ver" e, se aprovado, liga o disparo.

- **Nível:** Usuário.
- **Modelo:** Usuário — nunca outro.
- **Descrição:** aceite e liberação do disparo automático.
- **Critérios de Aceitação:** o usuário responde "sim" com a configuração escolhida.
- **Entrega:** — · **Verificação:** — · **Anotação:** —

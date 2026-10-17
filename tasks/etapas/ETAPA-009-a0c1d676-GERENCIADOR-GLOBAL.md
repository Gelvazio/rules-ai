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
| 2026-10-17 16:14 | Usuário confirmou que valem as regras de 16:12; abre a subtarefa .8 (Opus) só para conferir a decisão contra o plano de 13:01 | Gelvazio | "vale as regras daqui, abra uma sub-task em GERENCIADOR-GLOBAL nova so pra conferir isso e atribua ao CLAUDE OPUS" |
| 2026-10-17 16:12 | **Respostas do usuário (supersedem a de 13:01 nos pontos em que divergem):** (1) projetos: `aulasenai`, `gerenciador-de-ia`, `dashboard-ai-*`, `aulasenai-*` (as `aulas-senai-*`) e `rules-ai`; (2) disparo **automático** para Haiku e Sonnet; (3) a cada **30 s**, projeto por projeto, vê qual modelo está ocioso e manda pegar a próxima tarefa livre; (4) só Claude Code; (5) **mescla** as regras com o `gerenciador-de-tarefas` e atribui a tarefa ao **Opus** (ver .7). Revoga o "só avisar até o aceite .6" e a exclusão das `aulas-senai-*` do plano de 13:01 | Gelvazio | "1-aulasenai,gerenciador-de-ia,dashboasr-ai-*,aulasenai-*,rules-ai;2-automatico para Haiku e Sonnet;3-a cada 30 segundos,vai de projeto em projeto,lendo o quadro de tasks e vendo qual modelo esta ocioso,e neste caso,ja manda este modelo pegar a proxima task disponivel;4-so claude;5-mescla as regras, atribua ao claude opus" |
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

**Próximo passo:** — (entregue).

- **Nível:** PESADO — arquitetura e disparo de sessões, mais de 3 arquivos ligados.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro.
- **Descrição:** desenhar o script central, a lista de projetos, o formato de disparo por modelo, os limites, a trava e o registro de disparos.
- **Critérios de Aceitação:** desenho escrito nesta seção; decisões das perguntas registradas; nenhum arquivo de projeto alterado.
- **Entrega (2026-10-17 13:10, Claude Code Opus 5.5):** prova de conceito e desenho abaixo.
- **Verificação:** `claude --help` (2.1.302) tem `-p/--print`, `--model`, `--effort`,
  `--output-format json`, `--max-budget-usd` e `--permission-mode`; prova de conceito numa pasta
  temporária: `claude -p "<pergunta>" --model haiku --output-format json` → saída 0, 5,4 s,
  `is_error: false`, `modelUsage` = `claude-haiku-5-5`, US$ 0,006. Nenhum quadro alterado.
- **Anotação:** o disparo com `;` depende da regra C24 (`GATILHO-GLOBAL`, ainda ⬜): ela tem de
  estar ✅ e sincronizada antes da `.4`.

#### Desenho

| Peça | Decisão |
|---|---|
| Script | `scripts/gerenciador.mjs` (Node, como o `sincronizar.mjs`), sem dependências externas |
| Configuração | `scripts/gerenciador.config.json`: projetos (`rules-ai`, `aulasenai`), modelos (`haiku`, `sonnet`, `opus`), `modo` (`ver` padrão · `disparar`), `cicloSegundos: 60`, `ociosoSegundos: 20`, `maxSessoesPorModelo: 1`, `maxBudgetUsd` por sessão |
| Pastas fora | `aulas-senai-*` (têm o líder `gerenciador-de-tarefas`), `DEMAIS-PROJETOS-*` (C20, C23) |
| Leitura do quadro | `git fetch` + `git show origin/main:tasks/STATUS.md` (nunca a pasta de trabalho); acha a tabela de "📌 Tarefas" pelos **nomes** das colunas (`Tarefa`, `Modelo`, `Depende de`, `Status`, `Em uso por`) |
| Subtarefa livre | `Status` começa com `⬜`; `Em uso por` = `—`; `Modelo` com "só Haiku/Sonnet/Opus/Fable"; toda dependência ✅ (no `STATUS.md` ou no `task_complete.md`). Fica de fora: "sem nível", `Usuário`, mãe (não reservável), `(nuvem)` |
| Modelo ocupado | Linha `🔄` com o nome do modelo em `Em uso por`, **ou** processo vivo aberto pelo gerenciador (PID no registro) |
| Ritmo | Uma volta a cada **20 s**; modelo **ocioso** é olhado em toda volta (20 s); modelo **ocupado**, a cada 3 voltas (**60 s**), só para ver se terminou |
| Modo `ver` (padrão até o `.6`) | Imprime o quadro de livres por projeto e modelo (tabela, C27) e avisa quando chega tarefa nova para um modelo ocioso; não abre sessão |
| Modo `disparar` (só depois do `.6`) | Para cada modelo ocioso com livre: `claude -p ";" --model <modelo> --effort <do nível> --output-format json --max-budget-usd <limite>` na pasta do projeto; a própria sessão reserva (C24 + `frentes-e-reserva.md`) |
| Trava | `scripts/.gerenciador.lock` com o PID: uma instância só; lock de PID morto é retomado |
| Parar | Arquivo `scripts/PARAR` → termina na próxima volta, sem abrir sessão |
| Registro | `scripts/gerenciador.log.jsonl` (fora do Git): hora, projeto, modelo, subtarefa vista, disparo, PID, saída, custo |
| Vigilância (`.5`) | O próprio laço de 20 s; o Agendador do Windows só **inicia** o script no logon (o Agendador não repete a menos de 1 min) |

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

### GERENCIADOR-GLOBAL.8 — Conferir as respostas de 16:12

**Próximo passo:** comparar as respostas de 16:12 com o plano de 13:01 e com o desenho da .1; registrar nesta seção o que vale, o que foi revogado e o que ainda precisa de decisão do usuário.

- **Nível:** PESADO — conferência de escopo de um gerenciador que dispara sessões.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro.
- **Descrição:** conferir ponto a ponto as cinco respostas de 16:12 (projetos, automático só para Haiku e Sonnet, ciclo de 30 s, só Claude Code, mesclagem atribuída ao Opus) contra o plano de 13:01 e o desenho da .1; listar o que conflita e o que a .7 precisa ajustar.
- **Critérios de Aceitação:** lista de cada resposta com "vale", "revogada" ou "pendente de decisão"; nenhuma sessão disparada.
- **Entrega:** — · **Verificação:** — · **Anotação:** —

### GERENCIADOR-GLOBAL.7 — Mesclar o `gerenciador-de-tarefas` e revisar o desenho

**Próximo passo:** ler o líder `gerenciador-de-tarefas` (skill e a pasta `aulas-senai-CLAUDE-OPUS-LIDER`), listar as regras que entram no central e revisar o desenho da .1 com as respostas de 16:12.

- **Nível:** PESADO — mescla de dois gerenciadores que disparam sessões e mudança de escopo.
- **Modelo:** só Opus 5.5+ ou Fable — nunca outro.
- **Descrição:** (a) mesclar as regras do `gerenciador-de-tarefas` ao central e dizer o que sai; (b) revisar a .1: lista de projetos, automático só para Haiku e Sonnet, ciclo de 30 s por projeto, modelo ocioso = sem linha `🔄` dele e sem processo vivo; (c) cobrir o risco de 30 s com disparo automático: no máximo 1 sessão ativa por modelo e limite de disparos por hora; (d) evitar disputa com o líder nas pastas `aulas-senai-*` (uma trava por pasta).
- **Critérios de Aceitação:** desenho da .1 revisado, com a lista do que mudou; regras mescladas listadas nesta seção; nenhuma sessão disparada por esta etapa.
- **Entrega:** — · **Verificação:** — · **Anotação:** —

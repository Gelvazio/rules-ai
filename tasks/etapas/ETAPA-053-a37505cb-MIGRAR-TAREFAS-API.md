## Etapa 053-a37505cb — MIGRAR-TAREFAS-API: migrar as tarefas do rules-ai para a API; os demais projetos ficam aguardando

**Tarefa:** MIGRAR-TAREFAS-API · **Pedido em:** 2026-10-23 19:49 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · rules-ai)
**Pedido:** "crie 1 tarefa com o maximo de subtasks-possiveis,pra migrar todas as tarefas de *rules-ai*, para a api, e todas as tarefas de *aulasenai*, *dashboard-ai*, *DASHBOARD-AI-PRINCIPAL*, *REA-APP-CLONES*,demais projetos, crie 1 subtask, pra deixar com status aguardando e remova eles da lista de projetos monitorados"
**Objetivo:** as tarefas do `rules-ai` passam a viver na API (json-server, pasta `api/`); cada outro projeto ganha 1 subtarefa que o deixa com status Aguardando e o tira da lista de projetos monitorados.

### Escopo

- **Entra:** carga das tarefas do `rules-ai` (abertas, concluídas, frentes, decisões, riscos, pendências, lições, recados e os campos das etapas) na API; escrita pela API (reservar, entregar, criar subtarefa); espelho `.md` de leitura; adaptar leitores e regras que hoje usam `STATUS.md`; 1 subtarefa por projeto (aulasenai, aulas-senai-*, dashboard-ai-*, DASHBOARD-AI-PRINCIPAL, REA-APP-CLONES, projeto-frontend-com-testes, testes-de-frontend, gerenciador-de-ia) para deixá-lo Aguardando e tirá-lo da lista monitorada; ensaio, corte e rollback.
- **Não entra:** mexer no quadro de outro projeto (cada projeto sincroniza o seu: `gerenciador-centralizado.md`); apagar tarefas; banco, Supabase ou autenticação; publicar a API na internet; as pastas `DEMAIS-PROJETOS-*` (C20, C23); projetos sem quadro (`CONSERTO-ELANTRA-2.0`, `ai-memory`, `consumo-ia`).

### Riscos

- **Muda a fonte única** (`quadro-de-tarefas.md`, C40) e a decisão P1 da etapa 049 (cópia só de leitura). Plano B: manter o `.md` como fonte e a API como cópia; a .30 deixa o rollback pronto.
- **A API só escuta em 127.0.0.1:** sessões de nuvem e outros computadores não a alcançam; plano B = espelho no Git, somente leitura.
- **Concorrência:** o json-server grava o arquivo inteiro e não tem compare-and-set; duas frentes podem reservar a mesma subtarefa. Mitigação nas subtarefas .6 e .13; pergunta P4.
- **Perda de dados:** `db.json` hoje está fora do Git; sem versionar, a migração perde tudo ao apagar a pasta (pergunta P2).
- **Muitos leitores** do `STATUS.md` (lista na .3): cada um migra separado; enquanto isso o espelho mantém os leitores antigos funcionando.
- **Arquivos compartilhados:** as subtarefas .34 a .41 editam o mesmo `scripts/gerenciador.config.json` e `dashboard/projetos.json`; reservar uma por vez. `DASHBOARD-LE-API` e `AGENTES-REALTIME.*` mexem em `agentes.js`, `canal.js`, `config.js`: dois escritores nunca ao mesmo tempo.

### Decisões

- 2026-10-23 19:49: pedido do usuário; tarefa **grande e PESADO** (muda a fonte única das tarefas, mudança em massa, várias partes): spec (C34) e **aprovação explícita** antes de executar. Nada é reservado até as perguntas abertas serem fechadas.
- 2026-10-23 19:49: "deixar com status aguardando" foi entendido como registrar `status: aguardando` e `monitorado: false` na coleção `projetos` da API, **sem escrever no quadro do outro projeto** (regra do gerenciador); a pergunta P6 confirma.
- 2026-10-23 19:49: "demais projetos" foi lido como os projetos que existem em `C:\fontes` com quadro, mais os padrões que ainda estão na lista monitorada; a pergunta P7 confirma a lista.

### Requisitos

| ID | Requisito (EARS) | Cobre | Verificação |
|----|------------------|-------|-------------|
| R1.1 | QUANDO a carga inicial rodar, O SISTEMA DEVE gravar na API todas as linhas de `tasks/STATUS.md` e `tasks/task_complete.md` do `rules-ai`, sem perder nem duplicar nenhuma | MIGRAR-TAREFAS-API.7, MIGRAR-TAREFAS-API.8, MIGRAR-TAREFAS-API.11 | contagem e ids comparados por script |
| R1.2 | SE o id da tarefa já existir na API, ENTÃO O SISTEMA DEVE atualizar a tarefa em vez de criar outra | MIGRAR-TAREFAS-API.7, MIGRAR-TAREFAS-API.11 | rodar a carga duas vezes e comparar o `db.json` |
| R2.1 | QUANDO uma IA reservar uma subtarefa pela API, O SISTEMA DEVE gravar `emUsoPor` e `em_execucao` somente se a subtarefa estiver livre, com dependências concluídas e do modelo da IA | MIGRAR-TAREFAS-API.13 | reservar uma livre e uma ocupada; só a livre grava |
| R2.2 | QUANDO uma subtarefa for entregue pela API, O SISTEMA DEVE marcá-la concluída, limpar `emUsoPor`, anotar entrega e verificação e liberar as dependentes | MIGRAR-TAREFAS-API.14 | entregar uma tarefa de teste e conferir as dependentes |
| R3.1 | ENQUANTO a API for a fonte, O SISTEMA DEVE gerar `tasks/STATUS.md` e `tasks/task_complete.md` como espelho de leitura com aviso de arquivo gerado | MIGRAR-TAREFAS-API.16, MIGRAR-TAREFAS-API.32 | ler o topo dos dois arquivos; reimportar o espelho |
| R3.2 | SE a API estiver fora do ar, ENTÃO OS LEITORES DEVEM usar o espelho do Git, só para leitura | MIGRAR-TAREFAS-API.17, MIGRAR-TAREFAS-API.21, MIGRAR-TAREFAS-API.23 | derrubar a API e rodar `gerenciador.mjs ver` |
| R4.1 | QUANDO um projeto for removido da lista, O SISTEMA DEVE registrá-lo na coleção `projetos` com `status: aguardando` e `monitorado: false` | MIGRAR-TAREFAS-API.12, MIGRAR-TAREFAS-API.34, MIGRAR-TAREFAS-API.41 | consultar `/projetos` |
| R4.2 | ONDE um projeto estiver com `monitorado: false`, O SISTEMA DEVE não ler o quadro dele (gerenciador, MCP e dashboard) | MIGRAR-TAREFAS-API.17, MIGRAR-TAREFAS-API.18, MIGRAR-TAREFAS-API.42 | `gerenciador.mjs ver` e `task_list` só mostram o `rules-ai` |
| R5.1 | O SISTEMA DEVE permitir voltar ao `STATUS.md` como fonte com um procedimento documentado e ensaiado | MIGRAR-TAREFAS-API.30 | ensaio em cópia do repositório |
| R5.2 | O SISTEMA DEVE manter `api/db.json` versionado no Git com ordem de chaves fixa | MIGRAR-TAREFAS-API.5 | `git diff` após regerar sem mudança de dados é vazio |

### Invariantes

| ID | Regra que vale sempre | Domínio da entrada | Como conferir | Teste automatizado |
|----|----------------------|--------------------|---------------|--------------------|
| INV-1 | Toda tarefa do quadro antes da migração existe na API depois, com o mesmo id, status, modelo, dependências e "em uso por" | todas as linhas de `STATUS.md` e `task_complete.md` | script de paridade campo a campo | sim: script da .11 |
| INV-2 | Os ids da coleção `tarefas` são únicos | qualquer número de cargas | contar ids repetidos | sim: script da .11 |
| INV-3 | Uma subtarefa nunca tem duas reservas ao mesmo tempo | N reservas simultâneas, N de 2 a 10 | disparar reservas em paralelo contra a API e contar `emUsoPor` | sim: script da .13 |
| INV-4 | O `db.json` não contém segredo nem dado pessoal | todo o arquivo | `grep` por `sk-`, `tsk_`, `Bearer`, `ghp_`, CPF, e-mail | não: conferência por comando na .11 |
| INV-5 | Rodar a carga N vezes dá o mesmo `db.json` (idempotência) | N de 1 a 5 | comparar o hash do arquivo | sim: script da .11 |
| INV-6 | A migração não altera nenhum arquivo dos outros projetos | todas as pastas de `C:\fontes` exceto `rules-ai` | `git status` de cada projeto igual antes e depois | não: conferência por comando na .42 |

**Casos de borda que o código precisa sobreviver:**

- linha de tabela com `|` no título, emoji ausente, coluna a mais ou a menos, id com `#`, dependência para tarefa já concluída ou inexistente, `Em uso por` com percentual, tarefa repetida entre `STATUS.md` e `task_complete.md`, API fora do ar, `db.json` vazio ou corrompido.

### Perguntas abertas

| # | Pergunta | Resposta | Fechada em | Quem respondeu |
|---|----------|----------|------------|----------------|
| P1 | A API vira a **fonte de verdade** do `rules-ai` (o `STATUS.md` e o `task_complete.md` passam a ser espelhos gerados)? Recomendado: sim, é o que "migrar" pede; isso revoga a P1 da etapa 049 | ⬜ | — | — |
| P2 | `api/db.json` entra no **Git** (necessário para não perder as tarefas)? Recomendado: sim | ⬜ | — | — |
| P3 | Quem alcança a API? Ela só escuta em `127.0.0.1`: nuvem e outros PCs leem o espelho do Git, só leitura. Recomendado: só local | ⬜ | — | — |
| P4 | Como evitar duas reservas da mesma subtarefa, já que o json-server não tem compare-and-set? Opções: (a) uma frente escreve por vez, com a trava de sessão; (b) um middleware mínimo do próprio json-server (`--middlewares`, 1 arquivo) que recusa reserva de subtarefa ocupada. Recomendado: (b) | ⬜ | — | — |
| P5 | O texto longo das **etapas** vai para a API ou continua em `.md` (a API guarda só campos estruturados e o nome do arquivo)? Recomendado: continua em `.md` | ⬜ | — | — |
| P6 | "Status aguardando" dos outros projetos = `status: aguardando` e `monitorado: false` na coleção `projetos` da API, **sem tocar no quadro deles**? Recomendado: sim | ⬜ | — | — |
| P7 | A lista de projetos a deixar aguardando está certa (aulasenai, aulas-senai-*, dashboard-ai-*, DASHBOARD-AI-PRINCIPAL, REA-APP-CLONES, projeto-frontend-com-testes, testes-de-frontend, gerenciador-de-ia)? As pastas `aulas-senai-*`, `dashboard-ai-*` e `gerenciador-de-ia` já não existem em `C:\fontes`, então só saem da lista | ⬜ | — | — |
| P8 | Depois do corte, o `STATUS.md` fica só como espelho gerado e somente leitura? Recomendado: sim | ⬜ | — | — |


### MIGRAR-TAREFAS-API.1 — Fechar as perguntas abertas e aprovar o plano

**Próximo passo:** responder as perguntas P1 a P8 e dar o sim ao plano.

- **Nível:** LEVE — ação que só o usuário pode fazer
- **Modelo:** Usuário — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Responder as perguntas P1 a P8 da etapa (cada uma traz a opção recomendada) e dar o "sim" ao plano. Sem isso nada é reservado nem executado.
- **Critérios de Aceitação:** nenhuma pergunta `⬜` na etapa; aprovação registrada nas Decisões.
- **Depende de:** Nenhuma

### MIGRAR-TAREFAS-API.2 — Rodar o gate da spec e registrar a aprovação

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** LEVE — só texto e configuração, sem lógica
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** `node spec/verificar-spec.mjs tasks/etapas/<esta etapa>` sem falha; registrar o resultado e a aprovação nas Decisões.
- **Critérios de Aceitação:** gate com código 0.
- **Depende de:** MIGRAR-TAREFAS-API.1

### MIGRAR-TAREFAS-API.3 — Inventário do que lê ou escreve `STATUS.md`, `task_complete.md` e etapas no `rules-ai`

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Lista (arquivo, função, leitura ou escrita) de `mcp/`, `scripts/gerenciador*`, `scripts/jev*`, `dashboard/*.py`, `dashboard/assets/js`, `.github/workflows`, `regras/*.md`, `AGENTS.md`; gravar como tabela na seção da subtarefa.
- **Critérios de Aceitação:** todo arquivo do `grep STATUS.md` está na tabela.
- **Depende de:** MIGRAR-TAREFAS-API.2

### MIGRAR-TAREFAS-API.4 — Contrato do schema da API como fonte (coleções, campos, chaves)

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** PESADO — arquitetura, mudança em massa ou regra global
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Definir coleções `tarefas`, `frentes`, `decisoes`, `riscos`, `pendencias`, `licoes`, `recados` e `projetos`; campos de leitura e de escrita; chave de cada uma; ordem estável das chaves; o que é só leitura. Estende o formato da etapa 049.
- **Critérios de Aceitação:** contrato escrito na etapa e aprovado; cobre todas as colunas de `STATUS.md` e `task_complete.md`.
- **Depende de:** MIGRAR-TAREFAS-API.2

### MIGRAR-TAREFAS-API.5 — Versionar `api/db.json` (tirar do `.gitignore`) com formato estável

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Revogar a P3 da etapa 049 (conforme a resposta P2 daqui); chaves em ordem fixa e fim de linha LF para o diff do Git ser legível.
- **Critérios de Aceitação:** `db.json` entra no Git sem diff de ruído ao regerar.
- **Depende de:** MIGRAR-TAREFAS-API.4

### MIGRAR-TAREFAS-API.6 — Estratégia de concorrência e reserva atômica (conforme P4)

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** PESADO — arquitetura, mudança em massa ou regra global
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** O json-server grava o arquivo inteiro e não tem compare-and-set: escolher e documentar como duas frentes não reservam a mesma subtarefa (INV-3).
- **Critérios de Aceitação:** estratégia escrita, com o caso de duas reservas simultâneas descrito e a verificação definida.
- **Depende de:** MIGRAR-TAREFAS-API.4

### MIGRAR-TAREFAS-API.7 — Carga inicial das tarefas abertas (`STATUS.md`)

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** PESADO — arquitetura, mudança em massa ou regra global
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Importador idempotente `api/migrar.mjs` (Node puro) que lê a seção "📌 Tarefas" e grava na coleção `tarefas`; roda N vezes sem duplicar (INV-5).
- **Critérios de Aceitação:** todas as linhas abertas do `STATUS.md` na API, ids únicos.
- **Depende de:** MIGRAR-TAREFAS-API.4

### MIGRAR-TAREFAS-API.8 — Carga das tarefas concluídas (`task_complete.md`)

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Mesmo importador para as linhas ✅ (e ❌/⛔ movidas), sem perder nenhuma.
- **Critérios de Aceitação:** contagem igual à do `task_complete.md`.
- **Depende de:** MIGRAR-TAREFAS-API.7

### MIGRAR-TAREFAS-API.9 — Carga de frentes, decisões, riscos, pendências, lições e recados

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Importar as demais seções do `STATUS.md` e o `tasks/RECADOS.md` para as coleções do contrato.
- **Critérios de Aceitação:** cada seção tem a mesma quantidade de linhas na API.
- **Depende de:** MIGRAR-TAREFAS-API.7

### MIGRAR-TAREFAS-API.10 — Carga dos campos das etapas por subtarefa

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** PESADO — arquitetura, mudança em massa ou regra global
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Para cada subtarefa, ler a seção da etapa (Nível, Modelo, Effort, Descrição, Critérios, Próximo passo, Entrega, Verificação) e gravar na tarefa; o texto longo das etapas continua em `.md` (conforme P5).
- **Critérios de Aceitação:** toda subtarefa com etapa tem os campos preenchidos ou `null` justificado.
- **Depende de:** MIGRAR-TAREFAS-API.7

### MIGRAR-TAREFAS-API.11 — Conferir a carga: paridade campo a campo, ids únicos e idempotência

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** PESADO — arquitetura, mudança em massa ou regra global
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Script de invariante (permitido em PESADO) que compara a API com o quadro (INV-1, INV-2, INV-5) e roda a carga duas vezes.
- **Critérios de Aceitação:** zero diferença; segunda carga não muda nada.
- **Depende de:** MIGRAR-TAREFAS-API.8, MIGRAR-TAREFAS-API.9, MIGRAR-TAREFAS-API.10

### MIGRAR-TAREFAS-API.12 — Coleção `projetos` com `status` e `monitorado`

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Criar a coleção com `id`, `nome`, `status` (`ativo`/`aguardando`), `monitorado` (booleano) e `motivo`; `rules-ai` entra como `ativo` e `monitorado`.
- **Critérios de Aceitação:** coleção criada e lida pela API.
- **Depende de:** MIGRAR-TAREFAS-API.4

### MIGRAR-TAREFAS-API.13 — Escrita: reservar subtarefa pela API

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** PESADO — arquitetura, mudança em massa ou regra global
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Operação de reserva (`PATCH`) que só grava se `emUsoPor` estiver vazio, a dependência estiver concluída e o modelo for o certo (C22, C50); segue a estratégia da .6.
- **Critérios de Aceitação:** reserva de subtarefa ocupada é recusada; reserva válida grava `emUsoPor` e `em_execucao`.
- **Depende de:** MIGRAR-TAREFAS-API.6, MIGRAR-TAREFAS-API.11

### MIGRAR-TAREFAS-API.14 — Escrita: entregar subtarefa pela API

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** PESADO — arquitetura, mudança em massa ou regra global
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Operação que marca concluída, limpa `emUsoPor`, anota `Entrega` e `Verificação` e libera as dependentes.
- **Critérios de Aceitação:** subtarefa entregue vira `concluida` e as dependentes ficam `disponivel`.
- **Depende de:** MIGRAR-TAREFAS-API.13

### MIGRAR-TAREFAS-API.15 — Escrita: criar subtarefa nova na mãe atual (C26)

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Operação que cria `<TAREFA>.<n+1>` com nível, modelo e effort, só dentro de mãe aberta.
- **Critérios de Aceitação:** ids novos sequenciais; nunca cria mãe.
- **Depende de:** MIGRAR-TAREFAS-API.13

### MIGRAR-TAREFAS-API.16 — Espelho de leitura: gerar `STATUS.md` e `task_complete.md` a partir da API

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** `api/espelho.mjs` grava os dois arquivos com aviso "gerado da API, não editar" no topo; usado por quem não alcança a API (nuvem).
- **Critérios de Aceitação:** espelho gerado reimportado dá o mesmo `db.json`.
- **Depende de:** MIGRAR-TAREFAS-API.11

### MIGRAR-TAREFAS-API.17 — `scripts/gerenciador.mjs` e `scripts/gerenciador/quadro.mjs` leem a API

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Fonte = API (com queda para o espelho do Git); `projetos` vêm da coleção `projetos` (`monitorado: true`).
- **Critérios de Aceitação:** `node scripts/gerenciador.mjs ver` mostra o mesmo que antes.
- **Depende de:** MIGRAR-TAREFAS-API.16

### MIGRAR-TAREFAS-API.18 — `mcp/` (config, quadro, projetos) lê e grava pela API

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** PESADO — arquitetura, mudança em massa ou regra global
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Trocar leitor/escritor do MCP-QUADRO pela API (reserva e entrega pelas operações .13 e .14); descoberta de projetos pela coleção `projetos`.
- **Critérios de Aceitação:** `task_list`, `task_next` e `task_finish` funcionam contra a API.
- **Depende de:** MIGRAR-TAREFAS-API.14

### MIGRAR-TAREFAS-API.19 — `scripts/jev/` (estado, gravacao, gravador, `jev.mjs`) grava nível pela API

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** PESADO — arquitetura, mudança em massa ou regra global
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** O Jev passa a gravar `Nível`, `Modelo` e `Effort` na tarefa da API (C47), mantendo o campo `JEV-AI-SUGGESTION`.
- **Critérios de Aceitação:** `jev.mjs classificar --dry-run` lê da API e `--gravar` grava na API.
- **Depende de:** MIGRAR-TAREFAS-API.14

### MIGRAR-TAREFAS-API.20 — `scripts/marcar_jev_ai_suggestion.py` e o que ainda usa o texto da etapa

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Adaptar o script (e qualquer outro achado na .3) à API.
- **Critérios de Aceitação:** script roda contra a API.
- **Depende de:** MIGRAR-TAREFAS-API.19

### MIGRAR-TAREFAS-API.21 — Python do dashboard (`quadro_tarefas.py`, `publicar_quadro.py`, `privacidade_quadro.py`)

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Ler a API (ou o espelho) no lugar do `STATUS.md`; a privacidade do payload não muda.
- **Critérios de Aceitação:** `publicar_quadro.py --simular` gera o mesmo payload.
- **Depende de:** MIGRAR-TAREFAS-API.16

### MIGRAR-TAREFAS-API.22 — Workflow `.github/workflows/publicar-quadro.yml`

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Gatilho e fonte coerentes com a API como fonte (o `db.json` versionado dispara o envio).
- **Critérios de Aceitação:** workflow válido (leitura) e coerente com o `publicar_quadro.py`.
- **Depende de:** MIGRAR-TAREFAS-API.21

### MIGRAR-TAREFAS-API.23 — Dashboard JS (`quadro.js`, `canal.js`, `agentes.js`, `config.js`) na nova fonte

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Alinhar com a tarefa `DASHBOARD-LE-API`: a API vira a leitura primária; sem reserva ao mesmo tempo nos mesmos arquivos.
- **Critérios de Aceitação:** a página mostra as mesmas tarefas de antes.
- **Depende de:** MIGRAR-TAREFAS-API.16

### MIGRAR-TAREFAS-API.24 — Regra `quadro-de-tarefas.md`: fonte única = API, `.md` = espelho; nova decisão em `CONFLITOS.md`

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** PESADO — arquitetura, mudança em massa ou regra global
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Reescrever a tabela "Cada informação em um lugar só" e o modelo do quadro; registrar a decisão (C52) e o que muda para quem não alcança a API.
- **Critérios de Aceitação:** regra coerente com as respostas P1 a P5; `CONFLITOS.md` com a decisão.
- **Depende de:** MIGRAR-TAREFAS-API.14

### MIGRAR-TAREFAS-API.25 — Regras `frentes-e-reserva.md` e `ciclo-da-task.md`: reservar e entregar pela API

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** PESADO — arquitetura, mudança em massa ou regra global
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Trocar "commit + push da reserva" pela operação da API (e o que sobra do Git); manter a regra maior (C50) e a trava de sessão.
- **Critérios de Aceitação:** regras sem contradição com `quadro-de-tarefas.md`.
- **Depende de:** MIGRAR-TAREFAS-API.24

### MIGRAR-TAREFAS-API.26 — Regras dos comandos `.`, `;` e `?`

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** `comando-ponto.md`, `comando-interrogacao.md` e o gatilho `;` leem a API (com o espelho como queda).
- **Critérios de Aceitação:** texto coerente com a fonte nova.
- **Depende de:** MIGRAR-TAREFAS-API.24

### MIGRAR-TAREFAS-API.27 — Demais regras que citam `STATUS.md` (gerenciador, MCP, Jev, níveis, memória, rules-local, visualizador, regra maior)

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Trocar cada referência pelo caminho certo (API ou espelho), sem mudar o sentido da regra.
- **Critérios de Aceitação:** `grep STATUS.md regras/` só acha o espelho ou menções históricas.
- **Depende de:** MIGRAR-TAREFAS-API.24

### MIGRAR-TAREFAS-API.28 — Regerar `dist/REGRAS-GLOBAIS.md` e `VERSAO.md` (`sincronizar.mjs` sem `--aplicar`)

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** LEVE — só texto e configuração, sem lógica
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Rodar o script e conferir o relatório.
- **Critérios de Aceitação:** versão nova gravada; `--aplicar` fica para o usuário.
- **Depende de:** MIGRAR-TAREFAS-API.25, MIGRAR-TAREFAS-API.26, MIGRAR-TAREFAS-API.27

### MIGRAR-TAREFAS-API.29 — `AGENTS.md`, `STATUS_PROJETO.md` e `api/README.md` com a fonte nova

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** LEVE — só texto e configuração, sem lógica
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Descrever API como fonte, o espelho, o rollback e como subir.
- **Critérios de Aceitação:** docs conferem com as regras.
- **Depende de:** MIGRAR-TAREFAS-API.28

### MIGRAR-TAREFAS-API.30 — Plano de rollback documentado e conferido

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Passo a passo para voltar ao `STATUS.md` como fonte (gerar `.md` do `db.json` e reabrir a edição) e prova de que o espelho reimporta igual.
- **Critérios de Aceitação:** rollback descrito e ensaiado em cópia.
- **Depende de:** MIGRAR-TAREFAS-API.16

### MIGRAR-TAREFAS-API.31 — Ensaio do corte: ciclo completo de uma tarefa de teste pela API

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** PESADO — arquitetura, mudança em massa ou regra global
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Criar, reservar, entregar e fechar uma tarefa de teste só pela API; conferir `db.json` e o espelho.
- **Critérios de Aceitação:** ciclo completo sem tocar no `STATUS.md` à mão.
- **Depende de:** MIGRAR-TAREFAS-API.18, MIGRAR-TAREFAS-API.25

### MIGRAR-TAREFAS-API.32 — Corte: congelar a edição manual do `STATUS.md` e avisar em `RECADOS.md`

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Aviso no topo do `STATUS.md`/`task_complete.md` ("fonte agora é a API") e recado para todas as frentes.
- **Critérios de Aceitação:** aviso publicado; nenhuma frente edita o `.md` à mão.
- **Depende de:** MIGRAR-TAREFAS-API.31

### MIGRAR-TAREFAS-API.33 — Rodar `node scripts/sincronizar.mjs --aplicar` e conferir nas IAs

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** LEVE — ação que só o usuário pode fazer
- **Modelo:** Usuário — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Levar as regras novas às IAs e aos projetos.
- **Critérios de Aceitação:** regras novas valendo nas IAs.
- **Depende de:** MIGRAR-TAREFAS-API.29

### MIGRAR-TAREFAS-API.34 — `aulasenai`: deixar com status Aguardando e remover da lista de monitorados

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** LEVE — só texto e configuração, sem lógica
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Para `aulasenai` (o maior quadro, 800+ subtarefas): gravar na coleção `projetos` `status: aguardando` e `monitorado: false`, com o motivo "migração para a API"; tirar da lista monitorada (`projetos` de `scripts/gerenciador.config.json`, `dashboard/projetos.json` e a descoberta do MCP); o quadro do próprio projeto não é tocado.
- **Critérios de Aceitação:** projeto fora da lista, `status` aguardando na API, nenhum arquivo do projeto alterado.
- **Depende de:** MIGRAR-TAREFAS-API.12

### MIGRAR-TAREFAS-API.35 — `aulas-senai-*`: deixar com status Aguardando e remover da lista de monitorados

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** LEVE — só texto e configuração, sem lógica
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Para clones `aulas-senai-CLAUDE-HAIKU/SONNET/OPUS/OPUS-LIDER` (padrão `aulas-senai-*`): gravar na coleção `projetos` `status: aguardando` e `monitorado: false`, com o motivo "migração para a API"; tirar da lista monitorada (`projetos` de `scripts/gerenciador.config.json`, `dashboard/projetos.json` e a descoberta do MCP); o quadro do próprio projeto não é tocado.
- **Critérios de Aceitação:** projeto fora da lista, `status` aguardando na API, nenhum arquivo do projeto alterado.
- **Depende de:** MIGRAR-TAREFAS-API.12

### MIGRAR-TAREFAS-API.36 — `dashboard-ai-*`: deixar com status Aguardando e remover da lista de monitorados

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** LEVE — só texto e configuração, sem lógica
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Para `dashboard-ai` e as cópias `dashboard-ai-*` (padrão `dashboard-ai-*`): gravar na coleção `projetos` `status: aguardando` e `monitorado: false`, com o motivo "migração para a API"; tirar da lista monitorada (`projetos` de `scripts/gerenciador.config.json`, `dashboard/projetos.json` e a descoberta do MCP); o quadro do próprio projeto não é tocado.
- **Critérios de Aceitação:** projeto fora da lista, `status` aguardando na API, nenhum arquivo do projeto alterado.
- **Depende de:** MIGRAR-TAREFAS-API.12

### MIGRAR-TAREFAS-API.37 — `DASHBOARD-AI-PRINCIPAL`: deixar com status Aguardando e remover da lista de monitorados

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** LEVE — só texto e configuração, sem lógica
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Para `DASHBOARD-AI-PRINCIPAL`: gravar na coleção `projetos` `status: aguardando` e `monitorado: false`, com o motivo "migração para a API"; tirar da lista monitorada (`projetos` de `scripts/gerenciador.config.json`, `dashboard/projetos.json` e a descoberta do MCP); o quadro do próprio projeto não é tocado.
- **Critérios de Aceitação:** projeto fora da lista, `status` aguardando na API, nenhum arquivo do projeto alterado.
- **Depende de:** MIGRAR-TAREFAS-API.12

### MIGRAR-TAREFAS-API.38 — `REA-APP-CLONES`: deixar com status Aguardando e remover da lista de monitorados

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** LEVE — só texto e configuração, sem lógica
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Para `REA-APP-CLONES`: gravar na coleção `projetos` `status: aguardando` e `monitorado: false`, com o motivo "migração para a API"; tirar da lista monitorada (`projetos` de `scripts/gerenciador.config.json`, `dashboard/projetos.json` e a descoberta do MCP); o quadro do próprio projeto não é tocado.
- **Critérios de Aceitação:** projeto fora da lista, `status` aguardando na API, nenhum arquivo do projeto alterado.
- **Depende de:** MIGRAR-TAREFAS-API.12

### MIGRAR-TAREFAS-API.39 — `projeto-frontend-com-testes`: deixar com status Aguardando e remover da lista de monitorados

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** LEVE — só texto e configuração, sem lógica
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Para `projeto-frontend-com-testes`: gravar na coleção `projetos` `status: aguardando` e `monitorado: false`, com o motivo "migração para a API"; tirar da lista monitorada (`projetos` de `scripts/gerenciador.config.json`, `dashboard/projetos.json` e a descoberta do MCP); o quadro do próprio projeto não é tocado.
- **Critérios de Aceitação:** projeto fora da lista, `status` aguardando na API, nenhum arquivo do projeto alterado.
- **Depende de:** MIGRAR-TAREFAS-API.12

### MIGRAR-TAREFAS-API.40 — `testes-de-frontend`: deixar com status Aguardando e remover da lista de monitorados

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** LEVE — só texto e configuração, sem lógica
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Para `testes-de-frontend`: gravar na coleção `projetos` `status: aguardando` e `monitorado: false`, com o motivo "migração para a API"; tirar da lista monitorada (`projetos` de `scripts/gerenciador.config.json`, `dashboard/projetos.json` e a descoberta do MCP); o quadro do próprio projeto não é tocado.
- **Critérios de Aceitação:** projeto fora da lista, `status` aguardando na API, nenhum arquivo do projeto alterado.
- **Depende de:** MIGRAR-TAREFAS-API.12

### MIGRAR-TAREFAS-API.41 — `gerenciador-de-ia`: deixar com status Aguardando e remover da lista de monitorados

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** LEVE — só texto e configuração, sem lógica
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Para `gerenciador-de-ia`: gravar na coleção `projetos` `status: aguardando` e `monitorado: false`, com o motivo "migração para a API"; tirar da lista monitorada (`projetos` de `scripts/gerenciador.config.json`, `dashboard/projetos.json` e a descoberta do MCP); o quadro do próprio projeto não é tocado.
- **Critérios de Aceitação:** projeto fora da lista, `status` aguardando na API, nenhum arquivo do projeto alterado.
- **Depende de:** MIGRAR-TAREFAS-API.12

### MIGRAR-TAREFAS-API.42 — Conferir a lista de monitorados: só o `rules-ai` ficou

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** MEDIO — código com lógica, poucos arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** `gerenciador.mjs ver`, `task_list` do MCP e `dashboard/projetos.json` só mostram o `rules-ai`; cada projeto removido aparece na API como `aguardando` (INV-6).
- **Critérios de Aceitação:** um único projeto monitorado; todos os outros `aguardando`.
- **Depende de:** MIGRAR-TAREFAS-API.34, MIGRAR-TAREFAS-API.35, MIGRAR-TAREFAS-API.36, MIGRAR-TAREFAS-API.37, MIGRAR-TAREFAS-API.38, MIGRAR-TAREFAS-API.39, MIGRAR-TAREFAS-API.40, MIGRAR-TAREFAS-API.41

### MIGRAR-TAREFAS-API.43 — Fechamento: `STATUS_PROJETO.md`, grafo e mover a tarefa para `task_complete.md`

**Próximo passo:** aguardar as dependências e o sim do usuário.

- **Nível:** LEVE — só texto e configuração, sem lógica
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Entrada no histórico, atualização do grafo (regra graphify) e fechamento pelo ciclo da task.
- **Critérios de Aceitação:** mãe e subtarefas concluídas.
- **Depende de:** MIGRAR-TAREFAS-API.42, MIGRAR-TAREFAS-API.33

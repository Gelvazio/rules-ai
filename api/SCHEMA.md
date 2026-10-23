# Contrato do schema da API como fonte das tarefas (MIGRAR-TAREFAS-API.4)

Contrato **para aprovação**. Estende o formato da etapa 049 (`api/gerar-db.mjs`). Define o que o
`api/db.json` guarda depois do corte, quando `tasks/STATUS.md`, `tasks/task_complete.md`,
`tasks/RECADOS.md` e `tasks/etapas/*.md` deixam de existir no `rules-ai`. Levantado em 2026-10-23
a partir de: `gerar-db.mjs`, `INVENTARIO-LEITORES.md`, `tasks/STATUS.md`, `tasks/task_complete.md`,
as 53 etapas do `rules-ai` e, para os filhos, `aulasenai/tasks/STATUS.md` e `RECADOS.md`.

Legenda das colunas: **Obrig.** = obrigatório (S/N) · **L/E** = L (só leitura para clientes; quem
grava é o carregador ou o middleware), E (cliente pode gravar por PATCH/operação), LE (os dois).

---

## 1. Visão e regras

1. **Fonte única:** depois do corte, `api/db.json` é a única fonte de tarefas do `rules-ai` e, depois
   da .54 em diante, dos filhos `aulasenai` e `dashboard-ai`. Nenhuma tarefa em markdown
   (decisões de 2026-10-23 20:02 e 20:10 da etapa 053). Regras (`regras/*.md`) e documentação
   continuam em markdown: não são tarefa.
2. **json-server 0.17.4 é a única dependência.** O middleware de escrita atômica (`--middlewares`) é
   **1 arquivo** em Node puro, sem pacote novo.
3. **Rede:** a API só escuta em `127.0.0.1`. Nuvem e outros computadores leem o `api/db.json` do Git
   (JSON, **somente leitura**) e **não reservam**.
4. **`db.json` versionado no Git** (revoga a P3 da etapa 049): JSON, LF, 2 espaços, ordem de chaves
   fixa (seção 5).
5. **Sem segredo e sem dado pessoal** (INV-4): nada de chave, token, CPF, e-mail. O carregador
   mascara/recusa o que casar com `sk-`, `tsk_`, `Bearer`, `ghp_`, CPF e e-mail.
6. **Cada fato em um lugar só:** dado de subtarefa mora na coleção `tarefas`; a etapa guarda só o
   cabeçalho e as seções gerais. Campos *derivados* são marcados `derivado` e recalculados pelo
   middleware/carregador, nunca digitados.
7. **Texto longo é preservado cru** (perda zero, INV-7): o que não tem campo próprio vai para
   `extras` (objeto `rótulo → texto`) ou `secoes[].texto`; o carregador nunca descarta rótulo.
8. **Cada registro carrega `projeto`** (R7.1), exceto `projetos` e `meta`.
9. **Ids (decisão):** string composta **`<projeto>:<codigo>`** em `tarefas`, `etapas`, `frentes`,
   `decisoes`, `riscos`, `bloqueios`, `pendencias`, `licoes` e `recados`. Justificativa: o json-server
   exige `id` único na coleção; o `codigo` bruto (`SUB-47.3`, `MIGRAR-TAREFAS-API.4`) repete entre
   projetos (o `aulasenai` e o `dashboard-ai` usam numeração própria, ex.: `#293`, `SUB-47`);
   id composto é legível, estável (não muda com a ordem de carga, ao contrário de número
   sequencial), idempotente (R1.2) e permite `GET /tarefas/aulasenai:293.1`. O campo `codigo`
   guarda a parte crua para exibição e `GET /tarefas?projeto=aulasenai`. Repetição dentro do mesmo
   projeto (hoje tratada por `garantirIdsUnicos`) recebe sufixo `#N` no id e `codigo` mantém o
   original, com aviso do carregador. O `:` vai codificado (`%3A`) na URL; o json-server aceita.
   Para linhas sem código natural (frentes, decisões, pendências, lições, recados, riscos,
   bloqueios) o id é `<projeto>:<data-hora ISO ou data>:<hash8 do texto principal>`, estável na
   recarga.
10. **Ordem de exibição:** cada registro de lista tem `ordem` (inteiro, posição na tabela de origem)
    porque a ordem do array no arquivo é por id (seção 5).

---

## 2. Coleções

Chaves: `tarefas`, `etapas`, `frentes`, `decisoes`, `riscos`, `bloqueios`, `pendencias`, `licoes`,
`recados`, `projetos`, `meta`. A coleção **`bloqueios` é acréscimo** à lista pedida: a seção
`## Bloqueios` (Data | Item | Motivo | O que destrava | Resolvido em) existe no quadro do
`aulasenai` e o contrato não pode perder coluna. Está em aberto na seção 7.

### 2.1 `tarefas` (tabelas "📌 Tarefas" do STATUS.md e de task_complete.md + seções de subtarefa)

Chave: `id` = `<projeto>:<codigo>`. Mãe e subtarefa na mesma coleção (`tipo`).

| Campo | Tipo | Obrig. | L/E | Origem hoje | Exemplo |
|---|---|---|---|---|---|
| id | string | S | L | coluna `Tarefa` (com prefixo do projeto) | `rules-ai:MIGRAR-TAREFAS-API.4` |
| projeto | string (fk `projetos.id`) | S | L | novo (R7.1) | `rules-ai` |
| codigo | string | S | L | coluna `Tarefa` (sem `**`) | `MIGRAR-TAREFAS-API.4` |
| tipo | `mae`\|`sub` | S | L | derivado: sufixo `.N` e negrito na coluna `Tarefa` | `sub` |
| mae | string (fk tarefas.id da mãe) | S | L | derivado do código (mãe aponta para si) | `rules-ai:MIGRAR-TAREFAS-API` |
| titulo | string | S | LE | coluna `Título` (sem `**` e sem sufixo `· \`effort\``) | `Contrato do schema da API...` |
| prioridade | string | S | LE | coluna `Prioridade` | `🟡 Média` |
| modelo | string | S | LE | coluna `Modelo` (texto inteiro) | `PESADO · só Sonnet · effort high` |
| nivel | `LEVE`\|`MEDIO`\|`PESADO`\|null | N | LE | derivado de `Modelo`/`Título`; seção da etapa `- **Nível:**` | `PESADO` |
| nivelMotivo | string\|null | N | LE | seção `- **Nível:**` (texto depois do travessão) | `arquitetura, mudança em massa` |
| effort | `low`\|`medium`\|`high`\|`xhigh`\|null | N | LE | derivado de `Modelo`; seção `- **Effort:**` | `high` |
| modeloSecao | string\|null | N | LE | seção `- **Modelo:**` da etapa (quando diferente da coluna) | `só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro` |
| jevAiSuggestion | `SIM`\|`NAO`\|null | N | LE | seção `- **JEV-AI-SUGGESTION:**` | `NAO` |
| fonteNivel | string\|null | N | LE | seção `- **Fonte:**` (`jev (confiança X)` ou `sinais`) | `jev (confiança 0,86)` |
| dependeDe | string[] (ids de tarefas) | S | LE | coluna `Depende de` + seção `- **Depende de:**` | `["rules-ai:MIGRAR-TAREFAS-API.2"]` |
| dependeDeTexto | string | S | LE | coluna `Depende de` (texto cru: `Nenhuma`, `MAE (todas)`...) | `Nenhuma` |
| status | string | S | LE | coluna `Status` (emoji + 1 a 3 palavras) | `🔄 Em execução` |
| statusCodigo | enum (seção 3) | S | LE | derivado do emoji de `Status` | `em_execucao` |
| emUsoPor | string\|null | N | LE | coluna `Em uso por` (`—` e `— (não reservável)` viram null) | `Claude Code (Sonnet 5.5) (local · main · rules-ai) (desde 2026-10-23 20:02)` |
| reservadoEm | string ISO\|null | N | L (derivado) | data de `(desde ...)` em `Em uso por` | `2026-10-23T20:02:00-03:00` |
| travaEspecial | boolean | S | LE | `🔒` em `Status`/`Em uso por` | `false` |
| naoReservavel | boolean | S | L | `— (não reservável)` (mães) | `false` |
| concluida | boolean | S | L (derivado) | `statusCodigo === concluido` | `false` |
| arquivada | boolean | S | L (derivado) | linha mora em task_complete.md (concluida ou cancelada) | `false` |
| disponivel | boolean | S | L (derivado) | calculado: sub, `pendente`, sem reserva/trava, deps concluídas | `true` |
| etapaId | string (fk etapas.id)\|null | N | L | coluna `Etapa` (link `[ETAPA-NNN](etapas/...)`) | `rules-ai:ETAPA-053` |
| etapaArquivo | string\|null | N | L | coluna `Etapa` (nome do arquivo, só rastreio da carga) | `ETAPA-053-a37505cb-MIGRAR-TAREFAS-API.md` |
| proximoPasso | string | N | LE | seção `**Próximo passo:**` | `aguardar as dependências.` |
| descricao | string | N | LE | seção `- **Descrição:**` | `Definir coleções...` |
| criteriosAceitacao | string | N | LE | seção `- **Critérios de Aceitação:**` / `- **Critérios de aceitação:**` | `contrato escrito...` |
| criterioPronto | string | N | LE | seção `- **Critério de pronto:**` | texto |
| arquivos | string[] | N | LE | seção `- **Arquivos:**` | `["api/SCHEMA.md"]` |
| estimativa | string | N | LE | seção `- **Estimativa:**` | `30 min` |
| entrega | string | N | LE | seções `- **Entrega:**` / `- **Entregue:**` | `commit abc1234` |
| verificacao | string | N | LE | seções `- **Verificação:**`, `Verificação (líder)`, `(feita)`, `feita`, `(conferida pelo líder)`, `(OP-4, data)` etc. | `comandos rodados e resultado` |
| verificacaoRotulo | string\|null | N | L | rótulo cru quando tem sufixo (`Verificação (líder)`) | `Verificação (líder)` |
| anotacao | string | N | LE | seção `- **Anotação:**` | texto |
| extras | objeto rótulo→texto | N | LE | qualquer rótulo `- **X:**` sem campo próprio: `Origem`, `Conferido`, `Problema`, `Motivo`, `Correção`, `Versão`, `Versão anterior`, `Versão nova`, `Número da decisão`, `Totais`, `Pedido`, `Entra`, `Não entra` | `{"Origem": "..."}` |
| ordem | inteiro | S | L | posição da linha na tabela (abertas, depois concluídas) | `98` |
| criadaEm | string ISO\|null | N | L | data do commit/seção; null na carga inicial se desconhecida | `2026-10-23T19:49:00-03:00` |
| concluidaEm | string ISO\|null | N | LE | data do commit de entrega (campo novo da escrita; linha do `task_complete.md` não tem coluna de data) | `null` |
| atualizadoEm | string ISO | S | L (middleware) | novo: toda escrita atualiza | `2026-10-23T20:05:00-03:00` |

Os 8 cabeçalhos da tabela estão cobertos: `Tarefa` (id/codigo/tipo/mae), `Título` (titulo),
`Prioridade` (prioridade), `Modelo` (modelo/nivel/effort), `Depende de` (dependeDe/dependeDeTexto),
`Status` (status/statusCodigo), `Em uso por` (emUsoPor/reservadoEm), `Etapa` (etapaId/etapaArquivo).
`concluidaEm`, `criadaEm` e `atualizadoEm` não têm origem hoje (são metadados novos exigidos pela
escrita e pela auditoria); a carga os deixa `null`.

Relações: `mae` → mãe (`tipo=mae`, `mae` = própria `id`); `dependeDe` → outras `tarefas` (mesmo
projeto; dependência a id inexistente fica em `dependeDeTexto` e gera aviso da carga);
`etapaId` → `etapas`; `projeto` → `projetos`.

### 2.2 `etapas` (arquivos `tasks/etapas/ETAPA-*.md`, parte geral)

Chave: `id` = `<projeto>:ETAPA-<NNN>` (o número `NNN` é único por projeto; `hash8` fica em campo).
Etapas antigas sem hash (ex.: `ETAPA-002-ESFORCO-GLOBAL.md`) usam só o número.

| Campo | Tipo | Obrig. | L/E | Origem hoje | Exemplo |
|---|---|---|---|---|---|
| id | string | S | L | nome do arquivo (`ETAPA-NNN`) | `rules-ai:ETAPA-053` |
| projeto | string | S | L | novo | `rules-ai` |
| numero | inteiro | S | L | título `## Etapa NNN-...` | `53` |
| hash | string\|null | N | L | título `## Etapa NNN-<uuid8>` | `a37505cb` |
| arquivo | string | S | L | nome do arquivo (rastreio da carga) | `ETAPA-053-a37505cb-MIGRAR-TAREFAS-API.md` |
| tarefaMae | string (fk tarefas.id) | S | L | `**Tarefa:**` | `rules-ai:MIGRAR-TAREFAS-API` |
| titulo | string | S | LE | título depois do `—`/`:` na linha `## Etapa` | `migrar as tarefas do rules-ai para a API` |
| tituloLinha | string | S | L | linha `## Etapa ...` inteira (perda zero) | `## Etapa 053-... — ...` |
| pedidoEm | string | N | L | `**Pedido em:**` | `2026-10-23 19:49` |
| criadaPor | string | N | L | `**Criada por:**` | `Claude Code (Sonnet 5.5) (local · main · rules-ai)` |
| pedido | string | N | L | `**Pedido:**` (e `**Pedido (data):**`) | texto do usuário |
| objetivo | string | N | LE | `**Objetivo:**` | `as tarefas do rules-ai passam a viver na API` |
| situacao | string\|null | N | LE | `**Situação:**` / `**Status:**` no cabeçalho (etapas antigas) | `✅ concluída em 2026-10-18` |
| ehGrande | boolean | S | L | tem `### Requisitos`/`### Invariantes` (spec C34) | `true` |
| secoes | lista de `{ordem, tipo, titulo, texto}` | S | LE | todas as seções `###` que não são subtarefa e o corpo sem título (Escopo, Riscos, Decisões, Requisitos, Invariantes, Perguntas abertas, Entregas desta etapa, Critério de pronto, Validação geral, Casos de borda, `**Entra:**`, `**Não entra:**`, `**Fora do escopo:**`, `**Resultado do inventário:**` etc.) | `{"ordem":1,"tipo":"escopo","titulo":"Escopo","texto":"- **Entra:** ..."}` |
| subtarefas | string[] (ids de tarefas, em ordem) | S | L (derivado) | seções `### <TAREFA>.N — título` | `["rules-ai:MIGRAR-TAREFAS-API.1", "..."]` |
| arquivada | boolean | S | L (derivado) | mãe em task_complete.md | `false` |
| ordem | inteiro | S | L | ordem de leitura (por número) | `53` |
| atualizadoEm | string ISO | S | L | novo | `2026-10-23T20:05:00-03:00` |

`secoes[].tipo` é um enum aberto: `escopo`, `riscos`, `decisoes`, `requisitos`, `invariantes`,
`perguntas`, `entregas`, `criterio_pronto`, `validacao`, `casos_borda`, `corpo` (qualquer outro título,
guardado com `titulo` cru). As tabelas dentro de uma seção (Requisitos, Invariantes, Perguntas
abertas) ficam como **texto da seção** (INV-7 só exige perda zero); transformar em coleção própria
fica em aberto (seção 7). O texto de cada subtarefa **não** é duplicado aqui: está em `tarefas`.
A linha `### TAREFA.N — título` da subtarefa gera `tarefas.titulo` e `etapaId`.

### 2.3 `frentes` (tabela "🧭 Frentes de trabalho")

Chave: `id` = `<projeto>:<hash8 de frente>` (a mesma frente tem uma linha por tarefa; a linha é única
por `frente`+`tarefaTexto`).

| Campo | Tipo | Obrig. | L/E | Origem hoje | Exemplo |
|---|---|---|---|---|---|
| id | string | S | L | derivado | `rules-ai:9be1c2d4` |
| projeto | string | S | L | novo | `rules-ai` |
| frente | string | S | LE | coluna `Frente` | `Claude Code (Sonnet 5.5) (local · main · rules-ai)` |
| tarefaTexto | string | S | LE | coluna `Tarefa (etapa)` (texto cru) | `MIGRAR-TAREFAS-API.4 ([ETAPA-053](...))` |
| tarefaIds | string[] (fk tarefas.id) | N | LE | derivado de `Tarefa (etapa)` (pode citar várias: `.9, .10 e .14`) | `["rules-ai:MIGRAR-TAREFAS-API.4"]` |
| situacao | string | S | LE | coluna `Situação` | `🔄 Ativa` / `⏹️ Encerrada` |
| atualizadoEm | string | S | LE | coluna `Atualizado em` | `2026-10-23 20:02` |
| ordem | inteiro | S | L | posição na tabela | `1` |

### 2.4 `decisoes` (tabela "Registro de decisões")

Chave: `id` = `<projeto>:<AAAA-MM-DD HH:MM>:<hash8 da decisão>`.

| Campo | Tipo | Obrig. | L/E | Origem hoje | Exemplo |
|---|---|---|---|---|---|
| id | string | S | L | derivado | `rules-ai:2026-10-23T10:15:ab12cd34` |
| projeto | string | S | L | novo | `rules-ai` |
| data | string | S | LE | coluna `Data` | `2026-10-23 10:15` |
| decisao | string | S | LE | coluna `Decisão` | `C47: o Jev classifica e grava...` |
| quem | string | S | LE | coluna `Quem` | `Usuário (registrado por Claude Code (Sonnet 5.5))` |
| porque | string | S | LE | coluna `Por quê` | `tarefas ainda sem classificação automática` |
| etapaId | string\|null | N | LE | novo (decisão registrada numa etapa específica) | `rules-ai:ETAPA-053` |
| ordem | inteiro | S | L | posição (mais recente no topo) | `1` |

### 2.5 `riscos` (seção `## Riscos`: Risco | Chance | Impacto | Plano B | Situação)

Chave: `id` = `<projeto>:<hash8 do risco>`.

| Campo | Tipo | Obrig. | L/E | Origem hoje | Exemplo |
|---|---|---|---|---|---|
| id | string | S | L | derivado | `aulasenai:7c1d09ee` |
| projeto | string | S | L | novo | `aulasenai` |
| risco | string | S | LE | coluna `Risco` | texto |
| chance | string | N | LE | coluna `Chance` | `Média` |
| impacto | string | N | LE | coluna `Impacto` | `Alto` |
| planoB | string | N | LE | coluna `Plano B` | texto |
| situacao | string | N | LE | coluna `Situação` | `Aberto` |
| ordem | inteiro | S | L | posição | `1` |

### 2.6 `bloqueios` (seção `## Bloqueios`: Data | Item | Motivo | O que destrava | Resolvido em)

Chave: `id` = `<projeto>:<data>:<hash8 do item>`.

| Campo | Tipo | Obrig. | L/E | Origem hoje | Exemplo |
|---|---|---|---|---|---|
| id | string | S | L | derivado | `aulasenai:2026-10-05:5e0b7a11` |
| projeto | string | S | L | novo | `aulasenai` |
| data | string | S | LE | coluna `Data` | `2026-10-05` |
| item | string | S | LE | coluna `Item` | `6.8 (SQL das equipes)` |
| motivo | string | S | LE | coluna `Motivo` | texto |
| oQueDestrava | string | N | LE | coluna `O que destrava` | texto |
| resolvidoEm | string\|null | N | LE | coluna `Resolvido em` | `2026-10-05 13:38` |
| ordem | inteiro | S | L | posição | `1` |

### 2.7 `pendencias` (seção "Pendências (ficou para depois)": Data | Pendência | Motivo | Origem)

Chave: `id` = `<projeto>:<data hora>:<hash8 da pendência>`. O `rules-ai` também tem linhas de tarefa
dentro da tabela de pendências (ex.: `INTEGRACAO-DEEPSEEK`, `INTEGRACAO-DEEPSEEK.6`, vistas em
`STATUS.md` depois do cabeçalho `Pendências`): são linhas de **tarefa** (8 colunas) e vão para
`tarefas`, não para `pendencias`; o carregador separa pelo número de colunas e pelo cabeçalho da
tabela.

| Campo | Tipo | Obrig. | L/E | Origem hoje | Exemplo |
|---|---|---|---|---|---|
| id | string | S | L | derivado | `rules-ai:2026-10-23 14:45:3a9f0c21` |
| projeto | string | S | L | novo | `rules-ai` |
| data | string | S | LE | coluna `Data` | `2026-10-23 14:45` |
| pendencia | string | S | LE | coluna `Pendência` | `Contar as 10 retomadas...` |
| motivo | string | S | LE | coluna `Motivo` | `o piloto foi ligado...` |
| origem | string | S | LE | coluna `Origem` | `AI-MEMORY-INTEGRATION.25 (decisão do usuário)` |
| tarefaOrigem | string (fk tarefas.id)\|null | N | LE | derivado de `Origem` | `null` |
| resolvidaEm | string\|null | N | LE | novo (hoje a linha só é apagada ao resolver; histórico fica no Git) | `null` |
| ordem | inteiro | S | L | posição | `1` |

### 2.8 `licoes` (seção "Lições aprendidas": Data | O que aconteceu | Lição / nova regra)

Chave: `id` = `<projeto>:<data hora>:<hash8>`. O `rules-ai` hoje não tem a seção preenchida; o
`aulasenai` tem.

| Campo | Tipo | Obrig. | L/E | Origem hoje | Exemplo |
|---|---|---|---|---|---|
| id | string | S | L | derivado | `aulasenai:2026-10-14 11:00:b4c2d3e5` |
| projeto | string | S | L | novo | `aulasenai` |
| data | string | S | LE | coluna `Data` | `2026-10-14 11:00` |
| oQueAconteceu | string | S | LE | coluna `O que aconteceu` | texto |
| licao | string | S | LE | coluna `Lição / nova regra` | texto |
| ordem | inteiro | S | L | posição | `1` |

### 2.9 `recados` (`tasks/RECADOS.md`: tabelas "Abertos" e "Cumpridos")

Hoje o `rules-ai` **não tem** `tasks/RECADOS.md` (conferido: não existe); o `aulasenai` tem. A regra
`frentes-e-reserva.md` o cita, então a coleção existe e pode ficar vazia no `rules-ai`.
Chave: `id` = `<projeto>:<data e hora>:<hash8 do recado>`.

| Campo | Tipo | Obrig. | L/E | Origem hoje | Exemplo |
|---|---|---|---|---|---|
| id | string | S | L | derivado | `aulasenai:2026-10-19 13:10:8f1a2b3c` |
| projeto | string | S | L | novo | `aulasenai` |
| dataHora | string | S | LE | coluna `Data e hora` | `2026-10-19 13:10` |
| de | string | S | LE | coluna `De` | `local · main · DeepSeek Harness` |
| para | string | S | LE | coluna `Para` (`todas` ou frente) | `todas` |
| recado | string | S | LE | coluna `Recado` | texto |
| etapaTarefa | string | N | LE | coluna `Etapa/tarefa` | `#293` |
| tarefaId | string (fk)\|null | N | LE | derivado de `Etapa/tarefa` | `null` |
| cumprido | boolean | S | LE | está em "Cumpridos" | `false` |
| cumpridoEm | string\|null | N | LE | coluna `Cumprido em / o que foi feito` (data) | `null` |
| cumpridoNota | string\|null | N | LE | coluna `Cumprido em / o que foi feito` (texto) | `null` |
| ordem | inteiro | S | L | posição | `1` |

Regra de uso (`RECADOS.md`): só se **acrescenta**; `PATCH` só muda `cumprido`, `cumpridoEm` e
`cumpridoNota`; `DELETE` é recusado pelo middleware.

### 2.10 `projetos`

Chave: `id` = nome curto estável do projeto (sem prefixo). Só os projetos que a API conhece;
`status`/`monitorado` mandam em quem os leitores (gerenciador, MCP, dashboard) leem (R4.2).

| Campo | Tipo | Obrig. | L/E | Origem hoje | Exemplo |
|---|---|---|---|---|---|
| id | string | S | L | nome do projeto | `rules-ai` |
| nome | string | S | LE | `scripts/gerenciador.config.json`, `dashboard/projetos.json`, título `# STATUS — <Projeto>` | `rules-ai` |
| tipo | `mae`\|`filho` | S | LE | novo: `mae` para `rules-ai`; `filho` para `aulasenai`, `dashboard-ai` e os demais | `mae` |
| status | `ativo`\|`aguardando` | S | LE | novo (R4.1) | `ativo` |
| monitorado | boolean | S | LE | presença na lista de `gerenciador.config.json`/`projetos.json` | `true` |
| caminho | string | N | LE | `gerenciador.config.json` (pasta local; só para a carga e o gerenciador) | `C:/fontes/rules-ai` |
| repositorio | string | N | LE | `gerenciador.config.json` (remoto GitHub) | `Gelvazio/rules-ai` |
| objetivo | string | N | LE | cabeçalho do STATUS: `**Objetivo:**` | `regras de IA globais...` |
| partesInteressadas | string | N | LE | cabeçalho do STATUS: `**Partes interessadas:**` | `Gelvazio (decide...)` |
| escopo | string | N | LE | seção "Escopo do projeto" (aulasenai) | texto |
| cortadoEm | string ISO\|null | N | LE | novo: data em que o projeto passou a só ter tarefas na API (marca o corte) | `null` |
| ordem | inteiro | S | L | ordem na lista | `1` |

### 2.11 `meta` (1 registro, `id: 1`)

Chave: `id` = `1` (inteiro, único registro; é só a coleção que o json-server precisa com `id`).

| Campo | Tipo | Obrig. | L/E | Origem hoje | Exemplo |
|---|---|---|---|---|---|
| id | inteiro | S | L | fixo | `1` |
| versaoSchema | string | S | L | novo | `1` |
| geradoEm | string ISO | S | L (middleware) | `meta.geradoEm` (etapa 049) | `2026-10-23T20:05:00-03:00` |
| totalTarefas | inteiro | S | L (derivado) | `meta.totalTarefas` | `262` |
| totalConcluidas | inteiro | S | L (derivado) | `meta.totalConcluidas` | `210` |
| totalDisponiveis | inteiro | S | L (derivado) | `meta.totalDisponiveis` | `40` |
| totaisPorProjeto | objeto projeto→{tarefas, concluidas, disponiveis} | S | L (derivado) | novo (R7.1) | `{"rules-ai":{"tarefas":262}}` |
| sequencia | inteiro | S | L (middleware) | novo: +1 a cada escrita (ajuda leitores a detectar mudança) | `1280` |

Nota sobre `geradoEm`/`sequencia`: mudam a cada escrita e geram diff em toda gravação (aceito; ver
seção 5, regra de gravação).

---

## 3. Estado da tarefa

`statusCodigo` (enum fechado) e o emoji do quadro que o originava:

| statusCodigo | Emoji | Quem pode entrar nele | Quem muda |
|---|---|---|---|
| `pendente` | ⬜ | carga; liberar reserva; destravar bloqueio; criar subtarefa | middleware (operação) |
| `em_execucao` | 🔄 | reservar | só a operação `reservar` (nunca PATCH direto) |
| `concluido` | ✅ | entregar | só a operação `entregar` (ou `reabrir` ao contrário, pelo usuário) |
| `bloqueado` | ⛔ | bloquear com motivo | a frente dona da reserva, ou o usuário |
| `aguardando_usuario` | 👀 | pedir ação ao usuário | qualquer IA pede; só o usuário sai |
| `cancelada` | ❌ | cancelar | só o usuário (ou IA com pedido explícito dele registrado em `decisoes`) |

Transições permitidas (qualquer outra devolve 409):

| De | Para | Operação | Pré-condição extra |
|---|---|---|---|
| pendente | em_execucao | `reservar` | livre, deps concluídas, modelo certo (seção 4) |
| em_execucao | concluido | `entregar` | reserva é da mesma frente; `entrega` e `verificacao` preenchidas |
| em_execucao | pendente | `liberar` | só a dona da reserva ou o usuário |
| em_execucao | bloqueado | `mudarStatus` | `motivo` obrigatório (grava `proximoPasso`) |
| pendente | bloqueado | `mudarStatus` | idem |
| bloqueado | pendente | `mudarStatus` | `oQueDestrava` resolvido |
| bloqueado | em_execucao | `mudarStatus` | só a frente que reservou |
| pendente / em_execucao | aguardando_usuario | `mudarStatus` | `acaoDoUsuario` obrigatório |
| aguardando_usuario | pendente / em_execucao / concluido | `mudarStatus` | só `autor = usuario` |
| pendente / em_execucao / bloqueado / aguardando_usuario | cancelada | `mudarStatus` | só `autor = usuario`; grava `decisoes` |
| concluido | pendente | `reabrir` | só `autor = usuario`; recalcula `disponivel` das dependentes |

Regras: (a) `em_execucao` exige `emUsoPor` preenchido; os demais estados têm `emUsoPor = null`,
exceto `bloqueado`, que **mantém** a reserva. (b) Mãe (`tipo=mae`) nunca é reservada
(`naoReservavel=true`): o status dela é recalculado pelo middleware quando uma subtarefa muda
(todas concluídas ou canceladas → `concluido`; qualquer `em_execucao` → `em_execucao`); quem
**move** a mãe para as arquivadas continua sendo o fechamento da etapa (campo `arquivada`).
(c) `disponivel` é derivado e **recalculado em toda escrita** de `tarefas`: `tipo=sub` e
`statusCodigo=pendente` e `emUsoPor=null` e `travaEspecial=false` e todas as `dependeDe`
concluídas ou canceladas. (d) `nivel`/`modelo`/`effort` só mudam pela classificação (Jev, C47) ou
pelo usuário, nunca pela IA que executa (regra maior C50).

Campos graváveis por cliente (PATCH em `tarefas`): `titulo`, `prioridade` (só usuário),
`proximoPasso`, `descricao`, `criteriosAceitacao`, `arquivos`, `anotacao`, `extras`, `estimativa`,
`entrega`, `verificacao`. Os campos de estado (`status`, `statusCodigo`, `emUsoPor`, `concluida`,
`arquivada`, `disponivel`, `dependeDe`, `modelo`, `nivel`, `effort`) o middleware **recusa** em PATCH
direto (400); mudam pelas operações abaixo (o gravador do Jev usa a operação `classificar`).

---

## 4. Operações de escrita

Expostas pelo middleware (`api/middleware.mjs`, 1 arquivo) como `POST /operacoes/<nome>`; todas
atômicas (lê o `db.json` em memória, valida, grava em arquivo temporário e troca; erro restaura).
Resposta padrão: `200` com o registro novo (`{ tarefa, derivados }`), `404` id inexistente,
`409` pré-condição não atendida (com `motivo` e o registro atual), `400` payload inválido.
Pré-condições valem **dentro** da região crítica (INV-3).

Matriz de modelos (de `regras/niveis-e-modelos.md` e `regras/regra-maior.md`): a IA informa
`ia` e `modeloIa`; a operação compara com a coluna `modelo` (`só <modelo>`) e com a matriz.
Haiku só `LEVE`; Sonnet `MEDIO` e `PESADO`; Opus 5.5+ e Fable só `PESADO`; nunca mais forte em
tarefa mais fraca. Ferramenta sem linha na matriz para o nível → recusa.

| Operação | Payload | Pré-condições | Efeito | Devolve |
|---|---|---|---|---|
| `reservar` | `{ id, frente, ia, modeloIa }` | `tipo=sub`; `statusCodigo=pendente`; `emUsoPor=null`; sem `travaEspecial`; todas as `dependeDe` concluídas; `nivel` presente; `modeloIa` atende a coluna `modelo` e a matriz; a `frente` não tem outra tarefa `em_execucao` (1 por frente) | `statusCodigo=em_execucao`, `status="🔄 Em execução"`, `emUsoPor="<frente> (desde <data hora>)"`, `reservadoEm`, `disponivel=false`, recalcula a mãe, atualiza a linha da frente | tarefa reservada; `409` com `motivo` (`ocupada`, `dependencia`, `modelo`, `frente_ocupada`, `trava`) |
| `entregar` | `{ id, frente, entrega, verificacao }` | `emUsoPor` é da própria `frente`; `statusCodigo=em_execucao`; `entrega` e `verificacao` não vazias | `concluido`, `concluida=true`, `arquivada=true`, `emUsoPor=null`, `concluidaEm`, grava `entrega`/`verificacao`, `proximoPasso="concluída"`, recalcula `disponivel` das dependentes e o status da mãe | tarefa; lista `liberadas` (ids que ficaram disponíveis); `maePodeFechar` (todas as subs ✅) |
| `liberar` | `{ id, frente, motivo }` | reserva é da `frente` (ou `autor=usuario`) | volta a `pendente`, `emUsoPor=null`, anota motivo em `proximoPasso` | tarefa |
| `mudarStatus` | `{ id, frente, para, motivo?, acaoDoUsuario?, autor }` | transição da tabela da seção 3 | muda `statusCodigo`/`status`; `bloqueado` e `aguardando_usuario` exigem texto; `cancelada` exige `autor=usuario` | tarefa |
| `reabrir` | `{ id, autor, motivo }` | `autor=usuario`; `concluido` | volta a `pendente`, `arquivada=false`, `concluidaEm=null`, recalcula dependentes | tarefa |
| `criarSubtarefa` | `{ mae, titulo, nivel, modelo, effort, descricao, criteriosAceitacao, dependeDe?, prioridade?, frente }` | mãe existe e **é a mãe atual da frente** (a frente tem tarefa `em_execucao` da mesma mãe); nunca cria mãe (C26); `nivel` e `modelo` presentes e coerentes com a matriz | cria `<mae>.<próximo número>` livre (`pendente`, `emUsoPor=null`, `disponivel` calculado), `ordem` ao fim, linha de `etapas.subtarefas`, `jevAiSuggestion=NAO` | tarefa nova (`id`, `codigo`) |
| `classificar` | `{ id, nivel, modelo, effort, jevAiSuggestion, fonteNivel }` | subtarefa **livre** e sem `nivel` (ou `reclassificar=true` pedido do usuário, ainda livre); regra do Jev C47 | grava `nivel`/`modelo`/`effort`/`jevAiSuggestion`/`fonteNivel`, recalcula `disponivel` | tarefa |
| `anotarDecisao` | `{ projeto, data?, decisao, quem, porque, etapaId? }` | `decisao` e `quem` não vazios; só acrescenta | cria registro em `decisoes` (topo, `ordem` = 1 e desloca) | decisão criada |
| `anotarRecado` | `{ projeto, de, para, recado, etapaTarefa? }` | só acrescenta; sem segredo (INV-4) | cria registro em `recados` (`cumprido=false`) | recado criado |
| `cumprirRecado` | `{ id, cumpridoNota }` | recado existe e está aberto | `cumprido=true`, `cumpridoEm`, `cumpridoNota` | recado |
| `atualizarFrente` | `{ frente, tarefaTexto, tarefaIds, situacao }` | cada frente só altera a **própria** linha | cria/atualiza linha de `frentes`, `atualizadoEm` | frente |
| `anotarEtapa` | `{ etapaId, secao, texto }` | a etapa existe; só acrescenta ao final da seção ou cria seção | grava em `etapas.secoes` | etapa |

Demais coleções (`riscos`, `bloqueios`, `pendencias`, `licoes`, `projetos`, `etapas`) aceitam
`POST` (criar) e `PATCH` (campos `LE` da tabela) pelo json-server padrão; `DELETE` e `PUT` ficam
**recusados** pelo middleware em todas as coleções do quadro (histórico nunca é apagado; resolver
pendência = `PATCH resolvidaEm`). A mudança de `projetos.status`/`monitorado` é `PATCH` (só o
usuário, ou a subtarefa .34 a .42 que o pediu). `GET` é livre e segue o json-server padrão
(`?projeto=`, `?statusCodigo=`, `?disponivel=true`, `?_sort=`, `?_expand=`).

A reserva segue a regra do `frentes-e-reserva.md`: reservar é **gravar** (a trava é a gravação
atômica); push de reserva deixa de existir como trava (a API local é a trava). Para quem só tem o
`db.json` do Git (nuvem), todas as operações de escrita estão **indisponíveis**: o cliente avisa e
não reserva (R3.2).

---

## 5. Ordem das chaves e regra de gravação

**Ordem das chaves do arquivo:** `projetos`, `tarefas`, `etapas`, `frentes`, `decisoes`, `riscos`,
`bloqueios`, `pendencias`, `licoes`, `recados`, `meta`. Dentro de cada registro, as chaves seguem
**exatamente a ordem das tabelas da seção 2** (id primeiro). Chave ausente por falta de origem fica
`null` (não omitida), exceto `extras` (`{}`), listas (`[]`) e textos (`""`): o conjunto de chaves é
sempre o mesmo, o que mantém o diff por linha.

**Ordem dos registros no array:** por `id` em ordenação natural (projeto, depois partes numéricas
do código: `X.2` antes de `X.10`). Decisão e justificativa: se o array seguisse a ordem do quadro
(prioridade, reservas), mover uma linha de "abertas" para "concluídas" reordenaria dezenas de
registros e o `git diff` seria enorme; por `id`, a entrega de uma subtarefa muda **só as linhas
dela** (`statusCodigo`, `status`, `emUsoPor`, `concluida`, `arquivada`, `disponivel` e as
dependentes). A ordem de exibição do quadro é reconstruída por `ordem`. Exceção: `meta` e
`decisoes`/`recados` (ordenados por `data` decrescente, mais novo primeiro, como nas tabelas).

**Formato:** `JSON.stringify(banco, null, 2)` + `\n`, UTF-8 sem BOM, **LF**, sem espaço no fim de
linha, sem reordenar chaves ao reescrever (o middleware serializa por um **serializador próprio de
chaves fixas**, porque o json-server/lowdb 0.17 preserva a ordem de inserção, e a carga é quem
define a ordem). Datas em texto como no quadro (`AAAA-MM-DD HH:MM`) nos campos de origem e ISO com
fuso `-03:00` nos campos novos (`reservadoEm`, `concluidaEm`, `atualizadoEm`, `geradoEm`).

**Regra de gravação:** (a) só o middleware e o carregador gravam; (b) escrita em arquivo temporário
no mesmo diretório e `rename` no fim (nunca deixa o `db.json` pela metade); (c) uma escrita por vez
(fila dentro do processo; é o que dá atomicidade ao `reservar`); (d) `meta.geradoEm` e
`meta.sequencia` mudam a cada escrita, então **todo** commit do `db.json` tem pelo menos essas
linhas de diff; para isolá-las e manter o ruído mínimo, `meta` é a **última chave** do arquivo;
(e) a carga idempotente (INV-5) não atualiza `geradoEm` quando nada mudou (compara o conteúdo sem
`geradoEm`/`sequencia` e não regrava se for igual); (f) textos longos (`secoes[].texto`,
`descricao`, `entrega`, `verificacao`) ficam **em uma linha de JSON** com `\n` escapado: mudança
de uma palavra troca a linha inteira no diff (custo aceito, ver seção 7).

---

## 6. O que cada INV e cada R exige do schema

| ID | O que exige do schema |
|---|---|
| INV-1 (paridade) | `tarefas` guarda **todas** as colunas do STATUS.md e do task_complete.md (`Tarefa`, `Título`, `Prioridade`, `Modelo`, `Depende de`, `Status`, `Em uso por`, `Etapa`) com texto cru preservado (`modelo`, `dependeDeTexto`, `status`, `emUsoPor`) além dos derivados; `codigo` mantém o id original para comparar |
| INV-2 (ids únicos) | `id` composto `<projeto>:<codigo>`; sufixo `#N` para repetição dentro do projeto; `codigo` preserva o original; a carga aborta se sobrar id duplicado |
| INV-3 (uma reserva) | `emUsoPor` e `statusCodigo` só mudam em `reservar`, dentro da região crítica do middleware; PATCH direto desses campos é recusado (400) |
| INV-4 (sem segredo) | `extras`/textos passam pelo mascarador na carga e nas operações de escrita (`anotar*`); nenhum campo de credencial existe no schema |
| INV-5 (idempotência) | ids derivados do conteúdo (hash8) ou do código; ordem fixa por `id`; `ordem` vem da origem; `geradoEm` só muda se algo mudou; serialização única |
| INV-6 (outros projetos intocados) | `projeto` em cada registro e `projetos.monitorado`/`status`: a carga do `rules-ai` não grava registro de outro `projeto`; carga de filho só depois do corte (`cortadoEm`) |
| INV-7 (perda zero) | `etapas.secoes[].texto`, `etapas.tituloLinha`, `tarefas.extras` e `verificacaoRotulo` guardam o texto cru de todo rótulo e seção; cada seção do `.md` tem 1 destino no schema (ver conferência abaixo); o script da .45 compara seção a seção |
| R1.1 | `tarefas` com as 8 colunas e `arquivada` distingue STATUS de task_complete |
| R1.2 | `id` estável permite `PUT`/`PATCH` em vez de duplicar |
| R2.1 | operação `reservar` com as pré-condições da seção 4; campos `emUsoPor`, `statusCodigo`, `nivel`, `modelo`, `dependeDe`, `disponivel` |
| R2.2 | operação `entregar`: `entrega`, `verificacao`, `concluida`, `emUsoPor=null`, `disponivel` das dependentes |
| R3.1 | todas as colunas e seções de `STATUS.md`, `task_complete.md`, `RECADOS.md` e `etapas/*.md` têm campo (seção 2); `projetos.objetivo`, `partesInteressadas`, `escopo` guardam o cabeçalho e o escopo do STATUS |
| R3.2 | o mesmo arquivo serve a API e o fallback do Git; `meta.versaoSchema` e `meta.sequencia` deixam o leitor detectar versão e mudança; sem campo que só exista em memória |
| R4.1 | `projetos.status` e `projetos.monitorado` |
| R4.2 | leitores filtram por `projetos.monitorado=true` e `status=ativo` |
| R5.1 | `meta.versaoSchema`; todos os campos da origem preservados permitem reimportar para `.md` |
| R5.2 | seção 5 (ordem fixa, LF, serializador próprio) |
| R6.1 | `etapas.secoes` e `tarefas` (seções de subtarefa) com texto cru |
| R7.1 | campo `projeto` e id composto; `projetos.tipo=filho` |

Conferência dos rótulos das etapas (destino de cada `- **X:**`/`**X:**`): `Nível` (nivel,
nivelMotivo), `Modelo` (modeloSecao), `Effort` (effort), `JEV-AI-SUGGESTION` (jevAiSuggestion),
`Descrição` (descricao), `Critérios de Aceitação` e `Critérios de aceitação` (criteriosAceitacao),
`Depende de` (dependeDe), `Entrega` e `Entregue` (entrega), `Verificação` e suas variantes
`Verificação (líder)`, `Verificação (feita)`, `Verificação feita`, `Verificação (conferida pelo
líder)` e `Verificação (...)` com sufixo (verificacao, verificacaoRotulo), `Arquivos` (arquivos),
`Fonte` (fonteNivel), `Estimativa` (estimativa), `Anotação` (anotacao), `Critério de pronto`
(criterioPronto), `Próximo passo` (proximoPasso), `Pedido` (etapas.pedido), `Objetivo`
(etapas.objetivo), `Tarefa` (etapas.tarefaMae), `Status` e `Situação` (etapas.situacao), e os
demais rótulos (`Origem`, `Conferido`, `Problema`, `Motivo`, `Correção`, `Versão`, `Versão
anterior`, `Versão nova`, `Número da decisão`, `Totais`, `Entra`, `Não entra`, `Fora do escopo`,
`Não-objetivos`, `Casos de borda`, `Resultado do inventário`, `Produtor das rotas`, `O que sobra
para o usuário`, `Tabela campo → nova origem`, `Sai (apagado com git rm...)`) vão para `extras`
(quando dentro de subtarefa) ou para `secoes` (quando no corpo da etapa). Os demais itens
`- **X:**` achados por grep nas etapas (ex.: `Concorrência`, `Exposição`, `Deploy`, `Aprovação`,
`Código`, `Servidor`) são bullets livres das seções gerais (Riscos, Escopo, Decisões, Perguntas) e
ficam dentro de `secoes[].texto`; não são rótulos de subtarefa.

---

## 7. Pontos em aberto e riscos

### 7.1 Em aberto para o usuário

1. **Coleção `bloqueios` e `riscos` fora da lista pedida.** Acrescentei `bloqueios` (e mantive
   `riscos`) porque o quadro do `aulasenai` tem as duas seções; sem elas há perda de coluna.
   Aprovar ou mandar fundir em `pendencias`.
2. **Tabelas dentro das etapas** (Requisitos, Invariantes, Perguntas abertas) ficam como **texto**
   da seção. Para consultar "perguntas ainda abertas" por API seria preciso uma coleção
   `perguntas` (e `requisitos`, `invariantes`). Proposta: depois do corte, se o gate
   `spec/verificar-spec.mjs` (.51) pedir; custo: parser extra e mais campos.
3. **Decisões e riscos dentro das etapas** (`### Decisões`, `### Riscos`) ficam como texto de
   `secoes`; as decisões do **quadro** (`Registro de decisões`) são coleção. Unificar exigiria
   parsear bullets; proposto adiar.
4. **`tasks/GERENCIADOR-HERDR/*.md`** (`CONTAS-CLAUDE-CODE.md`, `PROMPT_PARA_O_LIDER.md`,
   `STATUS_TAREFAS_ANDAMENTO.md`) não são quadro nem etapa, mas estão em `tasks/`. A .46 precisa
   decidir se são "tarefa" (apagar) ou documentação (manter em outra pasta). Não têm coleção.
5. **Etapas sem `**Tarefa:**` ou com título fora do padrão** (`## Etapa 002 — ...`): o carregador
   as aceita pelo nome do arquivo; se alguma não tiver mãe, `tarefaMae` fica `null` com aviso.
6. **Divisão do armazenamento (insumo da .53; decisão final dela).** Volumes medidos hoje:
   `rules-ai` — etapas 779 KB (53), STATUS 72 KB, task_complete 41 KB, `db.json` atual 144 KB só
   de tarefas; `aulasenai` — etapas 2,4 MB (~430), STATUS 545 KB (~2.100 linhas de tabela). Estimativa do
   `db.json` único depois da carga: ~1,2 MB (rules-ai) e +4 a 5 MB (aulasenai, com escape de JSON).

   | Opção | Prós | Contras |
   |---|---|---|
   | A. Um `db.json` único (todos os projetos) | 1 processo, 1 porta, 1 middleware, 1 trava; consulta cruzada; simples | arquivo de ~6 MB; cada escrita reescreve tudo; toda escrita de qualquer projeto gera commit no mesmo arquivo (conflito entre frentes de projetos diferentes); `git clone` pesa mais; nuvem baixa tudo |
   | B. Um arquivo por projeto (`api/dados/<projeto>.json`), json-server único com launcher que junta | diff e conflito isolados por projeto; o `aulasenai` não pesa no `rules-ai`; nuvem lê só o que precisa | json-server 0.17 serve **um** arquivo: precisa launcher/módulo que monte o objeto e roteie a gravação (mais código, risco no `--middlewares`); `_expand` entre projetos não funciona |
   | C. Um json-server por projeto (portas diferentes) | isolamento total; zero código extra de junção | N processos e portas; leitores precisam saber a porta; duas APIs a manter no ar |
   | D. Híbrido: tarefas e metadados em `db.json`, textos de etapas em arquivo de projeto à parte | `db.json` pequeno e rápido; diff de texto separado | duas fontes por projeto; `etapas` deixa de ser coleção da API (quebra R6.1 "na API") |

   Recomendação provisória: **A enquanto só o `rules-ai`** (1,2 MB), e **B antes de carregar o
   `aulasenai`** (.53 decide). O schema é o mesmo nas duas opções: `projeto` e id composto não mudam.
7. **Ids para linhas sem código natural** (frentes, decisões, etc.) usam hash8 do texto: **editar
   o texto muda o id**. Aceito porque essas linhas só se acrescentam; se o usuário quiser editar
   linha, trocar para um contador por projeto (`<projeto>:<n>`), perdendo a idempotência pelo texto.

### 7.2 Riscos

| Risco | Efeito | Mitigação |
|---|---|---|
| Tamanho do `db.json` (220+ tarefas e 53 etapas completas, depois o `aulasenai`) | json-server relê e regrava o arquivo inteiro a cada escrita; leitura lenta e diff grande | medir na .5/.10; opção B da seção 7.1 antes do `aulasenai`; textos longos só em `etapas`/`tarefas`, nunca duplicados |
| Texto longo em uma linha de JSON | `git diff` mostra a seção inteira trocada por uma palavra | aceito; alternativa (array de linhas por seção) piora a leitura e a consulta; revisar na .5 |
| Colisão de ids | duas tarefas com o mesmo `<projeto>:<codigo>` (repetição já vista em `STATUS` x `task_complete`) | sufixo `#N` + aviso; a carga falha se sobrar duplicado (INV-2) |
| Id com `:` e `#` na URL | `#` é fragmento de URL; `:` precisa de `%3A` | clientes usam `encodeURIComponent`; carregador evita `#` onde possível (preferir `~N`); decidir na .5 |
| Escritas concorrentes entre processos (2 sessões, 2 portas) | perda de escrita | o middleware serializa dentro de **um** processo; subir só uma API (trava por PID, como o gerenciador) |
| Nuvem sem API | sessões de nuvem não reservam | R3.2: leem o `db.json` do Git; reserva só local; avisar na regra (.25) |
| Campos derivados desatualizados | `disponivel` errado | recalculados em toda escrita; a conferência da .11 compara com recálculo completo |
| `Modelo` em texto cru difícil de comparar | reserva por modelo errada | `reservar` usa a matriz estrita e o `nivel`; coluna `modelo` só confirma o "só X"; testes na .13 |
| Carga lê tabelas com `|` no título, emoji ausente, colunas a mais/menos | linha perdida | casos de borda da etapa 053; carregador conta linhas lidas contra linhas da tabela e falha se diferir |
| Segredo ou dado pessoal em texto de etapa antigo | vazamento no Git | mascarador na carga e `grep` da INV-4 antes de versionar o `db.json` |
| `meta`/`sequencia` mudam a cada escrita | todo commit toca o `db.json` | `meta` por último no arquivo; carga idempotente não regrava sem mudança |

## Etapa 019-6a76e10c — RULES-LOCAL-GLOBAL: regras globais importadas em `rules-local/` no início de cada sessão

**Tarefa:** RULES-LOCAL-GLOBAL · **Pedido em:** 2026-10-18 10:38 · **Criada por:** Claude Code (Opus 5.5) (local · main)
**Pedido:** "CRIE 1 TAREFA QUE IMPORTE AS REGRAS GLOBAIS SEMPRE NO INICIO DE CADA SESSAO, PARA TODOS
OS PROJETOS DA PASTA C:\fontes\, exceto a pasta C:\fontes\DEMAIS-PROJETOS-NAO-MEXER-AGORA\ e
C:\fontes\scripts\, sempre que iniciar 1 nova sessao, deve atualizar as regras globais do
repositorio https://github.com/Gelvazio/rules-ai e colocar na pasta local do projeto de nome
rules-local, nesta mesma pasta deve ter 1 arquivo de nome VERSAO.md, que deve comparar com a versao
global, que deve existir em https://github.com/Gelvazio/rules-ai/VERSAO.md, SE A VERSAO LOCAL FOR
IGUAL DA NUVEM, NAO FAZ NADA, SE FOR DIFERENTE, DEVE DISPARAR A TAREFA DE SINCRONIZAR TASKS,
AVALIANDO ITEM POR ITEM, E VENDO O QUE FOI MUDADO, ADICIONADO OU REMVIDO. Salve esta tarefa aqui no
quadro das tasks em C:\fontes\rules-ai\tasks\STATUS.md"
**Objetivo:** cada projeto de `C:\fontes` passa a ter uma cópia das regras globais em
`rules-local/`, conferida pela versão (`VERSAO.md`) a cada sessão nova, local ou na nuvem, e
qualquer mudança de versão dispara uma sincronização que mostra, item por item, o que foi mudado,
adicionado ou removido.

> 🟠 **Tarefa grande (`PESADO`)**: mexe em vários repositórios (mudança em massa), cria
> gerador/script novo e ganchos de sessão. O plano é esta etapa; a execução **só começa depois do
> "sim" do usuário** e com as **Perguntas abertas** fechadas (C34).

### Escopo

**Entra:**
- `VERSAO.md` na raiz do `rules-ai` (lido pela nuvem em
  `https://raw.githubusercontent.com/Gelvazio/rules-ai/main/VERSAO.md`), atualizado pelo
  `scripts/sincronizar.mjs` quando as regras mudam.
- Script de sessão (Node, sem dependências) que baixa a `VERSAO.md` do GitHub, compara com
  `rules-local/VERSAO.md` e, se diferente, baixa as regras novas, compara item por item e grava o
  relatório de mudanças.
- Regra global nova em `regras/` (e no `regras/INDEX.md`) dizendo o que a IA faz no início da
  sessão e o que é a "tarefa de sincronizar tasks".
- Instalação em cada projeto: pasta `rules-local/`, gancho `SessionStart` do Claude Code e aviso
  no `AGENTS.md`/`CLAUDE.md` para as IAs sem gancho; commit + push em cada repositório.

**Não entra:**
- `C:\fontes\DEMAIS-PROJETOS-NAO-MEXER-AGORA\` e `C:\fontes\scripts\` (pedido do usuário).
- `C:\fontes\DEMAIS-PROJETOS-DE-SISTEMAS-MANTER-OFFLINE\` (C20: só entra se o usuário pedir pelo
  nome; ver pergunta 4).
- Banco de dados, chaves ou tokens (o `rules-ai` é público: leitura sem credencial).
- Mudar o conteúdo das regras globais existentes (só a regra nova da sessão).

### Critério de pronto

- `VERSAO.md` publicada no GitHub e respondendo 200 no endereço `raw`.
- Em cada projeto do escopo: `rules-local/VERSAO.md` igual à da nuvem e o gancho de sessão
  versionado; uma sessão nova com versão igual não muda nenhum arquivo.
- Com uma versão diferente (simulada numa cópia), o script grava o relatório com as listas de
  regras mudadas, adicionadas e removidas e avisa a sessão para disparar a sincronização.
- `node spec/verificar-spec.mjs` passa nesta etapa (sem pergunta `⬜`).

### Riscos

| Risco | Plano B |
|---|---|
| Sessão sem internet (ou GitHub fora) | O script não falha a sessão: avisa "sem acesso ao rules-ai" e segue com o `rules-local/` atual |
| Pastas que são clones do mesmo repositório (`aulasenai` ×5, `dashboard-ai-*` ×9) gravam o mesmo `rules-local/` | Instalar uma vez por repositório remoto; os outros clones recebem pelo `git pull --rebase` |
| IA sem gancho de sessão (Gemini, Codex, Grok, DeepSeek…) não roda o script sozinha | Aviso no `AGENTS.md` manda rodar o comando no início; o gancho automático é só do Claude Code |
| Gancho atrasar o início da sessão | Tempo-limite curto no download (constante no script); passou do tempo, segue sem atualizar |
| Mudança em massa errar num repositório | Instalar primeiro em 1 projeto piloto, conferir, e só então nos outros |

### Requisitos

> Formato EARS. Ajustados às respostas de 2026-10-18 13:49 (perguntas 1 a 6).

| ID | Requisito (EARS) | Cobre | Verificação |
|----|------------------|-------|-------------|
| R1.1 | QUANDO as regras de `regras/` mudarem e o `sincronizar.mjs` rodar, O SISTEMA DEVE gravar uma `VERSAO.md` nova na raiz do `rules-ai` com versão diferente da anterior | RULES-LOCAL-GLOBAL.1 | Rodar o script antes e depois de mudar 1 regra numa cópia; comparar as duas `VERSAO.md` |
| R1.2 | SE as regras não mudarem, ENTÃO O SISTEMA DEVE manter a `VERSAO.md` idêntica (byte a byte) | RULES-LOCAL-GLOBAL.1 | Rodar 2 vezes seguidas; `git diff --exit-code VERSAO.md` |
| R2.1 | QUANDO uma sessão nova começar num projeto do escopo, O SISTEMA DEVE ler a `VERSAO.md` da nuvem e a `rules-local/VERSAO.md` | RULES-LOCAL-GLOBAL.2 | Rodar o script numa cópia e ler a saída |
| R2.2 | SE a versão local for igual à da nuvem, ENTÃO O SISTEMA DEVE terminar sem gravar nenhum arquivo | RULES-LOCAL-GLOBAL.2 | `git status --short` vazio depois do script |
| R2.3 | SE a versão local for diferente da da nuvem (ou não existir), ENTÃO O SISTEMA DEVE baixar as regras para `rules-local/`, gravar a lista de regras mudadas, adicionadas e removidas e avisar a sessão para disparar a sincronização | RULES-LOCAL-GLOBAL.2 | Simular versão antiga numa cópia; ler o relatório e a saída |
| R2.4 | SE o GitHub não responder no tempo-limite, ENTÃO O SISTEMA DEVE avisar "sem acesso ao rules-ai" e terminar com código 0, sem apagar o `rules-local/` | RULES-LOCAL-GLOBAL.2 | Rodar com endereço inválido numa cópia |
| R2.5 | O SISTEMA DEVE decidir se sincroniza **só** pela comparação entre a `rules-local/VERSAO.md` e a `VERSAO.md` da nuvem (a `VERSAO.md` local é o arquivo controlador do `rules-local/`) | RULES-LOCAL-GLOBAL.2 | Leitura do código: nenhum outro arquivo decide a sincronização |
| R2.6 | SE algum arquivo do `rules-local/` não bater com o código registrado para ele na `rules-local/VERSAO.md` (ou faltar), ENTÃO O SISTEMA DEVE tratar como versão diferente e baixar tudo de novo | RULES-LOCAL-GLOBAL.2 | Numa cópia, alterar 1 regra do `rules-local/` à mão e rodar o script: ele restaura e avisa |
| R2.7 | QUANDO a sincronização baixar as regras, O SISTEMA DEVE gravar a `rules-local/VERSAO.md` **por último**, só depois de todas as regras gravadas e conferidas | RULES-LOCAL-GLOBAL.2 | Leitura do código + simular falha de rede no meio: a `VERSAO.md` local fica a antiga |
| R3.1 | QUANDO a sessão receber o aviso de versão diferente, O SISTEMA DEVE mostrar o relatório (mudado, adicionado, removido) e avaliar cada item contra o projeto | RULES-LOCAL-GLOBAL.3 | Leitura da regra nova e do relatório de uma simulação |
| R3.2 | QUANDO um item do relatório exigir ajuste no projeto, O SISTEMA DEVE criar 1 TASK no quadro do projeto (`tasks/STATUS.md` ou `STATUS.md`), com etapa, subtarefa e nível, citando a regra e a versão | RULES-LOCAL-GLOBAL.3 | Simulação numa cópia: 1 regra mudada que exige ajuste ⇒ 1 TASK nova |
| R3.3 | SE já existir no quadro uma TASK para a mesma regra e a mesma versão, ENTÃO O SISTEMA DEVE não criar outra | RULES-LOCAL-GLOBAL.3 | Rodar a simulação 2 vezes: o quadro tem 1 TASK só |
| R4.1 | O SISTEMA DEVE ter `rules-local/` (versionada no Git) e o gancho de sessão nos 18 repositórios com GitHub do escopo, e em nenhuma pasta fora dele | RULES-LOCAL-GLOBAL.4 | Listagem das pastas de `C:\fontes` com e sem `rules-local/` |
| R4.2 | O SISTEMA DEVE ter, em cada projeto do escopo, a `rules-local/VERSAO.md` igual à da nuvem ao fim da instalação | RULES-LOCAL-GLOBAL.4 | Em cada projeto: rodar o script dá "versão igual" e `git status --short` vazio |

**Fora do escopo (não-objetivos):**

- Editar as regras dentro do `rules-local/` à mão (é cópia; a fonte continua `rules-ai/regras/`).
- Reescrever o `sincronizar.mjs` ou os arquivos globais das IAs (continuam como estão).

### Invariantes

| ID | Regra que vale sempre | Domínio da entrada | Como conferir | Teste automatizado |
|----|----------------------|--------------------|---------------|--------------------|
| INV-1 | Versão igual ⇒ nenhum arquivo do projeto muda | qualquer projeto do escopo, qualquer estado do `rules-local/` com versão igual | `git status --short` vazio depois do script | não: conferência por comando |
| INV-2 | O script nunca apaga nem escreve fora de `rules-local/` | qualquer resposta da rede (200, 404, erro, tempo esgotado) | leitura do código (todo caminho gravado começa em `rules-local/`) + simulação | não: leitura + comando |
| INV-4 | `rules-local/VERSAO.md` igual à da nuvem ⇒ todo arquivo do `rules-local/` bate com o código registrado nela (a `VERSAO.md` controla a pasta) | qualquer projeto do escopo, depois de qualquer execução do script (com ou sem falha no meio) | simulação: falha no meio + arquivo editado à mão; conferir códigos contra a `VERSAO.md` | não: conferência por comando |
| INV-3 | Mudado + adicionado + removido + igual = todas as regras da versão antiga e da nova, sem repetir | quaisquer dois conjuntos de arquivos de regras (vazio, iguais, disjuntos) | simulação com 3 casos numa cópia | não: conferência por comando |

**Casos de borda que o código precisa sobreviver:**

- `rules-local/` inexistente (primeira sessão); `VERSAO.md` local vazia ou corrompida.
- Sem internet, GitHub 404/500, resposta parcial.
- Regra renomeada (aparece como removida + adicionada).
- Duas sessões abrindo ao mesmo tempo no mesmo projeto.

### Perguntas abertas

| # | Pergunta | Resposta | Fechada em | Quem respondeu |
|---|----------|----------|------------|----------------|
| 1 | O que a "tarefa de sincronizar tasks" faz com cada item mudado/adicionado/removido: só mostra o relatório, ou também cria uma TASK no quadro do projeto para ajustar o projeto à regra nova? | **b)** mostra o relatório **e** cria uma TASK no quadro do projeto para cada ajuste necessário | 2026-10-18 13:49 | Gelvazio (`task-sincronizador-local.png`) |
| 2 | A pasta `rules-local/` fica versionada no Git de cada projeto (vai junto para a nuvem) ou fica fora do Git (`.gitignore`, baixada a cada sessão)? | **a)** versionada: vai junto para a nuvem e funciona sem internet | 2026-10-18 13:49 | Gelvazio (`task-sincronizador-local.png`) |
| 3 | Como a sessão roda a verificação: gancho automático `SessionStart` no Claude Code + aviso no `AGENTS.md` para as outras IAs, ou só o aviso no `AGENTS.md` para todas? | **a)** gancho `SessionStart` no Claude Code + aviso no `AGENTS.md` para as outras IAs | 2026-10-18 13:49 | Gelvazio (`task-sincronizador-local.png`) |
| 4 | Quais pastas entram: só os repositórios Git com GitHub (18), ou também `testes-effort-padaria` (Git sem remoto), `CONFIG-DEEPSEEK` e `assets` (sem Git), e a `DEMAIS-PROJETOS-DE-SISTEMAS-MANTER-OFFLINE` (C20)? | **a)** só os repositórios com GitHub (18 pastas) | 2026-10-18 13:49 | Gelvazio (`task-sincronizador-local.png`) |
| 5 | A versão é um número que alguém sobe à mão (ex.: `1.4.0`) ou é gerada sozinha pelo `sincronizar.mjs` a partir do conteúdo das regras (data + código do conteúdo)? | **a)** gerada sozinha pelo `sincronizar.mjs` (data + código do conteúdo) | 2026-10-18 13:49 | Gelvazio (`task-sincronizador-local.png`) |
| 6 | (pedido do usuário, sem pergunta) | **A `VERSAO.md` é o arquivo controlador do `rules-local/` em cada projeto** — "me garanta que isso será feito": virou R2.5, R2.6, R2.7, R4.2 e INV-4 | 2026-10-18 13:49 | Gelvazio (`task-sincronizador-local.png`) |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-18 11:42 | **Divisão para paralelismo** (aprovada, "SIM"): o formato combinado (`.6`) vem primeiro; o script de sessão foi dividido em peças `.7` (download), `.8` (comparação) e `.9` (conferência), juntadas pela `.2`; a `.3` passa a depender só da `.6`; a instalação virou lista de repositórios (`.11`), instalador (`.12`), aviso (`.13`), piloto (`.4`) e 3 lotes (`.14` a `.16`). Escopo, requisitos e invariantes não mudam | Gelvazio | Mais paralelismo (até 8 agentes na onda 1) |
| 2026-10-18 10:38 | O endereço `https://github.com/Gelvazio/rules-ai/VERSAO.md` é a página do arquivo; o script lê o conteúdo cru em `https://raw.githubusercontent.com/Gelvazio/rules-ai/main/VERSAO.md` | Claude Code (Opus 5.5) | A página do GitHub devolve HTML, não o texto do arquivo |
| 2026-10-18 10:38 | O repositório `rules-ai` é público (`raw` respondeu 200 em 2026-10-18 10:38): sem chave nem token | Claude Code (Opus 5.5) | Conferido com `curl` |
| 2026-10-18 10:38 | O próprio `rules-ai` não ganha `rules-local/` (ele é a fonte) | Claude Code (Opus 5.5) | Cópia de si mesmo não acrescenta nada |
| 2026-10-18 13:50 | **Plano aprovado** ("SIM") — execução liberada, só o escopo desta etapa | Gelvazio | Resposta ao resumo de 13:49 |
| 2026-10-18 13:49 | Respostas: 1-b, 2-a, 3-a, 4-a, 5-a; e a `VERSAO.md` é o controlador do `rules-local/` em cada projeto (R2.5–R2.7, R4.2, INV-4) | Gelvazio | `task-sincronizador-local.png` |
| 2026-10-18 13:49 | A regra nova autoriza a sessão a criar TASK (mãe nova) no quadro do projeto para cada ajuste vindo do relatório — exceção pontual à C26 | Claude Code (Opus 5.5) | Resposta 1-b |
| 2026-10-18 10:38 | Clones do mesmo repositório (`aulasenai` ×5, `dashboard-ai` ×9) recebem a instalação uma vez por repositório remoto | Claude Code (Opus 5.5) | Evita 14 commits iguais e conflitos |

### RULES-LOCAL-GLOBAL.1 — `VERSAO.md` no `rules-ai`, gerada pelo `sincronizar.mjs`

**Próximo passo:** esperar a `.6` (formato da `VERSAO.md`); depois reservar (Sonnet) e rodar o gate `node spec/verificar-spec.mjs`.

- **Nível:** MEDIO — lógica em JS em 1 arquivo (`scripts/sincronizar.mjs`) + 1 `.md` gerado.
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** o `sincronizar.mjs` grava `VERSAO.md` na raiz (versão gerada: data + código do conteúdo),
  com a versão e a lista das regras e o código do conteúdo de cada uma (é o que permite comparar
  item por item depois); não muda o arquivo se as regras não mudaram. Atualizar o README.
- **Critérios de aceitação:** R1.1 e R1.2; `node --check`; funções ≤ 45 linhas.
- **Verificação:** `node spec/verificar-spec.mjs tasks/etapas/ETAPA-019-6a76e10c-RULES-LOCAL-GLOBAL.md`
  (gate da C34, antes de começar) + os comandos de R1.1 e R1.2.

### RULES-LOCAL-GLOBAL.2 — Script de sessão: comparar versões e listar mudanças

**Próximo passo:** esperar a `.7`, a `.8` e a `.9`; juntar as peças no script de sessão.

> Desde a divisão: download, comparação e conferência saem prontos da `.7`, `.8` e `.9`; esta subtarefa junta as peças e cuida da gravação (`VERSAO.md` por último, R2.5–R2.7), do relatório, do aviso, de duas sessões ao mesmo tempo e de INV-1, INV-2 e INV-4.

- **Nível:** PESADO — script novo com rede, gravação em massa nos projetos e casos de erro.
- **Modelo:** só Opus 5.5+ ou Fable (ou DeepSeek, C35) — nunca outro
- **Effort:** high
- **Descrição:** script Node sem dependências (vai dentro de `rules-local/`, para rodar também na
  nuvem): baixa a `VERSAO.md` da nuvem; igual → sai sem gravar; diferente ou ausente → baixa as
  regras do `regras/INDEX.md`, compara com as locais (por arquivo e por item de cada arquivo),
  grava `rules-local/` e o relatório de mudanças (mudado, adicionado, removido) e imprime o aviso
  para a sessão disparar a sincronização. Tempo-limite e falha de rede sem quebrar a sessão.
- **Critérios de aceitação:** R2.1 a R2.4; INV-1 a INV-3; casos de borda da seção Invariantes.

### RULES-LOCAL-GLOBAL.3 — Regra global da sessão e da "sincronização de tasks"

**Próximo passo:** esperar a `.6` (o formato do relatório e o comando do script bastam para escrever a regra). O registro no `CONFLITOS.md` passou para a `.10`.

- **Nível:** PESADO — regra global nova, vale para todas as IAs e projetos.
- **Modelo:** só Opus 5.5+ ou Fable (ou DeepSeek, C35) — nunca outro
- **Effort:** high
- **Descrição:** `regras/rules-local.md` (o que a IA faz no início da sessão, o que fazer com o
  aviso de versão diferente, conforme a pergunta 1) e a linha nova no `regras/INDEX.md`; registro
  como decisão nova no `CONFLITOS.md`.
- **Critérios de aceitação:** R3.1; regra no índice; o `sincronizar.mjs` não avisa regra fora do
  índice.

### RULES-LOCAL-GLOBAL.4 — Instalar no projeto piloto

**Próximo passo:** esperar a `.1`, a `.2`, a `.12` e a `.13`; instalar com o instalador no piloto e conferir R4.2.

> Desde a divisão: esta subtarefa é só o **piloto**; os outros repositórios ficam nos lotes `.14`, `.15` e `.16` (lista da `.11`).

- **Nível:** PESADO — mudança em massa em vários repositórios.
- **Modelo:** só Opus 5.5+ ou Fable (ou DeepSeek, C35) — nunca outro
- **Effort:** high
- **Descrição:** em 1 projeto piloto, depois nos outros (uma vez por repositório remoto):
  `rules-local/` (script + `VERSAO.md` + regras), gancho `SessionStart` em `.claude/settings.json`
  (conforme a pergunta 3), aviso no `AGENTS.md`/`CLAUDE.md`, `.gitignore` conforme a pergunta 2;
  commit + push em cada repositório; os outros clones com `git pull --rebase`.
- **Critérios de aceitação:** R4.1; em cada projeto, rodar o script dá "versão igual" e
  `git status --short` vazio.

### RULES-LOCAL-GLOBAL.6 — Formato combinado dos arquivos

**Próximo passo:** reservar e escrever a seção "Formato combinado" nesta etapa.

- **Nível:** PESADO — decide a arquitetura que todas as outras peças seguem
- **Modelo:** só Opus 5.5+ ou Fable (ou DeepSeek, C35) — nunca outro
- **Effort:** high
- **Descrição:** escrever nesta etapa, numa seção "Formato combinado": o formato exato da `VERSAO.md` (versão = data + código do conteúdo; lista de regras com o código de cada uma; algoritmo do código), o formato do relatório de mudanças (arquivo, nome, colunas), o conteúdo de `rules-local/` (nomes dos arquivos do script e das regras), a assinatura de cada módulo (`.7` download, `.8` comparação, `.9` conferência) e o comando que o gancho e o aviso chamam.
- **Critérios de aceitação:** as subtarefas `.1`, `.7`, `.8`, `.9`, `.3`, `.10` e `.12` conseguem trabalhar só com esta seção, sem perguntar.
- **Verificação:** leitura da seção + `node spec/verificar-spec.mjs tasks/etapas/ETAPA-019-6a76e10c-RULES-LOCAL-GLOBAL.md`.

### RULES-LOCAL-GLOBAL.7 — Módulo de download com tempo-limite

**Próximo passo:** esperar a `.6`.

- **Nível:** MEDIO — 1 arquivo JS, sem gravação em disco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** módulo `.mjs` sem dependências (assinatura da `.6`): baixa a `VERSAO.md` e as regras do `raw.githubusercontent.com`, com tempo-limite em constante; erro, 404/500 e tempo esgotado viram resultado "sem acesso", nunca exceção.
- **Critérios de aceitação:** R2.4 (parte da rede); funções ≤ 45 linhas; `node --check`.
- **Verificação:** `node --check` + chamada com endereço inválido e com o endereço real.

### RULES-LOCAL-GLOBAL.8 — Comparação item por item

**Próximo passo:** esperar a `.6`.

- **Nível:** MEDIO — função pura em 1 arquivo JS
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** módulo `.mjs` com função pura que recebe as listas antiga e nova (nome → código) e devolve mudado, adicionado, removido e igual; regra renomeada = removida + adicionada.
- **Critérios de aceitação:** INV-3; funções ≤ 45 linhas; `node --check`.
- **Verificação:** conferência por `node -e` com os 3 casos (vazio, iguais, disjuntos) e uma renomeação.

### RULES-LOCAL-GLOBAL.9 — Conferência do `rules-local/` contra a `VERSAO.md`

**Próximo passo:** esperar a `.6`.

- **Nível:** MEDIO — 1 arquivo JS, só leitura
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** módulo `.mjs` que lê a `rules-local/VERSAO.md` (vazia ou corrompida conta como diferente) e confere o código de cada arquivo do `rules-local/`; devolve "íntegro" ou a lista dos arquivos que não batem ou faltam. Não grava nada.
- **Critérios de aceitação:** R2.6 (parte da conferência); funções ≤ 45 linhas; `node --check`.
- **Verificação:** conferência numa cópia: arquivo editado à mão e arquivo faltando aparecem na lista.

### RULES-LOCAL-GLOBAL.10 — Registro no `CONFLITOS.md`

**Próximo passo:** esperar a `.6`.

- **Nível:** LEVE — só `.md`
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** acrescentar ao `CONFLITOS.md` a decisão nova (regras globais em `rules-local/` por projeto, conferidas pela `VERSAO.md`; exceção pontual à C26 para criar TASK a partir do relatório).
- **Critérios de aceitação:** linha nova no formato do arquivo, sem mexer nas outras.
- **Verificação:** leitura do `git diff CONFLITOS.md`.

### RULES-LOCAL-GLOBAL.11 — Lista dos 18 repositórios do escopo

**Próximo passo:** — (entregue; a pasta de instalação do `dashboard-ai` fica para quem pegar o lote B, que confere qual clone está mais em dia).

- **Nível:** LEVE — levantamento, sem código
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** listar as pastas de `C:\fontes` com Git e remoto no GitHub (fora `DEMAIS-PROJETOS-*`, `scripts` e o próprio `rules-ai`), agrupando os clones do mesmo remoto (1 linha por remoto, com as pastas clones), e propor a divisão em piloto + lotes A, B e C.
- **Critérios de aceitação:** tabela Remoto · Pasta de instalação · Clones · Lote nesta seção; total de remotos confere com a pergunta 4.
- **Entrega:** esta tabela (só esta seção, sem outros arquivos).
- **Verificação:** `git -C <pasta> remote get-url origin` em cada pasta de `C:\fontes` (fora `DEMAIS-PROJETOS-*`, `scripts`, `rules-ai`). Resultado: **19 pastas com remoto GitHub, 7 remotos**. A pergunta 4 diz 18 pastas; a contagem real é 19 (1 a mais). Não alterei a pergunta: o líder decide.
- **Pastas sem remoto (fora da lista, conforme pergunta 4):** `CONFIG-DEEPSEEK`, `assets`, `testes-effort-padaria`.

| Remoto | Pasta de instalação | Clones | Lote |
|--------|---------------------|--------|------|
| Gelvazio/template-inicial-tasks-ia | template-inicial-tasks-ia | — | **Piloto** (1 pasta; base de projetos, pequena, baixo risco) |
| Gelvazio/aulasenai | aulasenai | aulas-senai-CLAUDE-HAIKU, aulas-senai-CLAUDE-OPUS-LIDER, aulas-senai-CLAUDE-OPUS, aulas-senai-CLAUDE-SONNET | A (5 pastas) |
| Gelvazio/dashboard-ai | **a definir** (proposta: dashboard-ai-claude-code-senai; nenhuma pasta sem sufixo) | dashboard-ai-claude-code-gmail, dashboard-ai-claude-code-hotmail, dashboard-ai-codex, dashboard-ai-deepseek, dashboard-ai-devin, dashboard-ai-gemini, dashboard-ai-kiro-crew, dashboard-ai-qoder (+ a proposta acima) | B (9 pastas) |
| Gelvazio/PLATAFORMA-ENVIO-CURRICULOS | PLATAFORMA-ENVIO-CURRICULOS | — | C (4 pastas, com os 3 abaixo) |
| Gelvazio/rea-app-clones | REA-APP-CLONES | — | C |
| Gelvazio/gerenciador-de-ia | gerenciador-de-ia | — | C |
| Gelvazio/testes-de-frontend | testes-de-frontend | — | C |

Divisão: piloto 1 pasta · lote A 5 · lote B 9 · lote C 4 (total 19). O lote B é o maior por ser o único remoto com 9 pastas; se quiser equilibrar, dá para separar as pastas `dashboard-ai-*` em duas partes, mas isso quebra a regra de um remoto por lote.

### RULES-LOCAL-GLOBAL.12 — Instalador

**Próximo passo:** esperar a `.6` e a `.11`.

- **Nível:** PESADO — gravação em vários repositórios e gancho de sessão
- **Modelo:** só Opus 5.5+ ou Fable (ou DeepSeek, C35) — nunca outro
- **Effort:** high
- **Descrição:** script no `rules-ai` que, para um repositório, monta `rules-local/` (script + `VERSAO.md` + regras), acrescenta o gancho `SessionStart` ao `.claude/settings.json` sem apagar o que existe e não faz commit (o commit é de quem instala). Idempotente.
- **Critérios de aceitação:** rodar 2 vezes numa cópia não muda nada na segunda; `settings.json` existente preservado.
- **Verificação:** execução numa cópia temporária + `git status --short`.

### RULES-LOCAL-GLOBAL.13 — Aviso no `AGENTS.md`/`CLAUDE.md`

**Próximo passo:** esperar a `.3`.

- **Nível:** LEVE — só texto
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** trecho padrão (curto) para o `AGENTS.md`/`CLAUDE.md` dos projetos, mandando as IAs sem gancho rodarem o comando da `.6` no início da sessão; guardado como modelo no `rules-ai` para o instalador e os lotes usarem.
- **Critérios de aceitação:** texto aponta para `regras/rules-local.md` e traz o comando exato.
- **Verificação:** leitura.

### RULES-LOCAL-GLOBAL.14 — Instalar no lote A

**Próximo passo:** esperar a `.4`.

- **Nível:** PESADO — mudança em massa
- **Modelo:** só Opus 5.5+ ou Fable (ou DeepSeek, C35) — nunca outro
- **Effort:** high
- **Descrição:** instalar com o instalador nos repositórios do lote A (lista da `.11`), commit + push em cada um; clones com `git pull --rebase`.
- **Critérios de aceitação:** R4.1 e R4.2 em cada repositório do lote.
- **Verificação:** em cada repositório: script dá "versão igual" e `git status --short` vazio.

### RULES-LOCAL-GLOBAL.15 — Instalar no lote B

**Próximo passo:** esperar a `.4`.

- **Nível:** PESADO — mudança em massa
- **Modelo:** só Opus 5.5+ ou Fable (ou DeepSeek, C35) — nunca outro
- **Effort:** high
- **Descrição:** como a `.14`, para o lote B.
- **Critérios de aceitação:** R4.1 e R4.2 em cada repositório do lote.
- **Verificação:** como a `.14`.

### RULES-LOCAL-GLOBAL.16 — Instalar no lote C

**Próximo passo:** esperar a `.4`.

- **Nível:** PESADO — mudança em massa
- **Modelo:** só Opus 5.5+ ou Fable (ou DeepSeek, C35) — nunca outro
- **Effort:** high
- **Descrição:** como a `.14`, para o lote C.
- **Critérios de aceitação:** R4.1 e R4.2 em cada repositório do lote.
- **Verificação:** como a `.14`.

### RULES-LOCAL-GLOBAL.5 — Levar a regra nova às IAs (`--aplicar`)

**Próximo passo:** esperar a `.3`; o usuário roda `node scripts/sincronizar.mjs --aplicar`.

- **Nível:** —
- **Modelo:** Usuário
- **Effort:** low

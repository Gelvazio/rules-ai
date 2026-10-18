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

> Formato EARS. "Sincronizar tasks" depende da pergunta 1; os requisitos R3.x serão ajustados à
> resposta.

| ID | Requisito (EARS) | Cobre | Verificação |
|----|------------------|-------|-------------|
| R1.1 | QUANDO as regras de `regras/` mudarem e o `sincronizar.mjs` rodar, O SISTEMA DEVE gravar uma `VERSAO.md` nova na raiz do `rules-ai` com versão diferente da anterior | RULES-LOCAL-GLOBAL.1 | Rodar o script antes e depois de mudar 1 regra numa cópia; comparar as duas `VERSAO.md` |
| R1.2 | SE as regras não mudarem, ENTÃO O SISTEMA DEVE manter a `VERSAO.md` idêntica (byte a byte) | RULES-LOCAL-GLOBAL.1 | Rodar 2 vezes seguidas; `git diff --exit-code VERSAO.md` |
| R2.1 | QUANDO uma sessão nova começar num projeto do escopo, O SISTEMA DEVE ler a `VERSAO.md` da nuvem e a `rules-local/VERSAO.md` | RULES-LOCAL-GLOBAL.2 | Rodar o script numa cópia e ler a saída |
| R2.2 | SE a versão local for igual à da nuvem, ENTÃO O SISTEMA DEVE terminar sem gravar nenhum arquivo | RULES-LOCAL-GLOBAL.2 | `git status --short` vazio depois do script |
| R2.3 | SE a versão local for diferente da da nuvem (ou não existir), ENTÃO O SISTEMA DEVE baixar as regras para `rules-local/`, gravar a lista de regras mudadas, adicionadas e removidas e avisar a sessão para disparar a sincronização | RULES-LOCAL-GLOBAL.2 | Simular versão antiga numa cópia; ler o relatório e a saída |
| R2.4 | SE o GitHub não responder no tempo-limite, ENTÃO O SISTEMA DEVE avisar "sem acesso ao rules-ai" e terminar com código 0, sem apagar o `rules-local/` | RULES-LOCAL-GLOBAL.2 | Rodar com endereço inválido numa cópia |
| R3.1 | QUANDO a sessão receber o aviso de versão diferente, O SISTEMA DEVE executar a sincronização definida na regra nova, avaliando cada item mudado, adicionado ou removido | RULES-LOCAL-GLOBAL.3 | Leitura da regra nova e do relatório de uma simulação |
| R4.1 | O SISTEMA DEVE ter `rules-local/` e o gancho de sessão em todo projeto do escopo, e em nenhuma pasta fora dele | RULES-LOCAL-GLOBAL.4 | Listagem das pastas de `C:\fontes` com e sem `rules-local/` |

**Fora do escopo (não-objetivos):**

- Editar as regras dentro do `rules-local/` à mão (é cópia; a fonte continua `rules-ai/regras/`).
- Reescrever o `sincronizar.mjs` ou os arquivos globais das IAs (continuam como estão).

### Invariantes

| ID | Regra que vale sempre | Domínio da entrada | Como conferir | Teste automatizado |
|----|----------------------|--------------------|---------------|--------------------|
| INV-1 | Versão igual ⇒ nenhum arquivo do projeto muda | qualquer projeto do escopo, qualquer estado do `rules-local/` com versão igual | `git status --short` vazio depois do script | não: conferência por comando |
| INV-2 | O script nunca apaga nem escreve fora de `rules-local/` | qualquer resposta da rede (200, 404, erro, tempo esgotado) | leitura do código (todo caminho gravado começa em `rules-local/`) + simulação | não: leitura + comando |
| INV-3 | Mudado + adicionado + removido + igual = todas as regras da versão antiga e da nova, sem repetir | quaisquer dois conjuntos de arquivos de regras (vazio, iguais, disjuntos) | simulação com 3 casos numa cópia | não: conferência por comando |

**Casos de borda que o código precisa sobreviver:**

- `rules-local/` inexistente (primeira sessão); `VERSAO.md` local vazia ou corrompida.
- Sem internet, GitHub 404/500, resposta parcial.
- Regra renomeada (aparece como removida + adicionada).
- Duas sessões abrindo ao mesmo tempo no mesmo projeto.

### Perguntas abertas

| # | Pergunta | Resposta | Fechada em | Quem respondeu |
|---|----------|----------|------------|----------------|
| 1 | O que a "tarefa de sincronizar tasks" faz com cada item mudado/adicionado/removido: só mostra o relatório, ou também cria uma TASK no quadro do projeto para ajustar o projeto à regra nova? | ⬜ | — | — |
| 2 | A pasta `rules-local/` fica versionada no Git de cada projeto (vai junto para a nuvem) ou fica fora do Git (`.gitignore`, baixada a cada sessão)? | ⬜ | — | — |
| 3 | Como a sessão roda a verificação: gancho automático `SessionStart` no Claude Code + aviso no `AGENTS.md` para as outras IAs, ou só o aviso no `AGENTS.md` para todas? | ⬜ | — | — |
| 4 | Quais pastas entram: só os repositórios Git com GitHub (18), ou também `testes-effort-padaria` (Git sem remoto), `CONFIG-DEEPSEEK` e `assets` (sem Git), e a `DEMAIS-PROJETOS-DE-SISTEMAS-MANTER-OFFLINE` (C20)? | ⬜ | — | — |
| 5 | A versão é um número que alguém sobe à mão (ex.: `1.4.0`) ou é gerada sozinha pelo `sincronizar.mjs` a partir do conteúdo das regras (data + código do conteúdo)? | ⬜ | — | — |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-18 10:38 | O endereço `https://github.com/Gelvazio/rules-ai/VERSAO.md` é a página do arquivo; o script lê o conteúdo cru em `https://raw.githubusercontent.com/Gelvazio/rules-ai/main/VERSAO.md` | Claude Code (Opus 5.5) | A página do GitHub devolve HTML, não o texto do arquivo |
| 2026-10-18 10:38 | O repositório `rules-ai` é público (`raw` respondeu 200 em 2026-10-18 10:38): sem chave nem token | Claude Code (Opus 5.5) | Conferido com `curl` |
| 2026-10-18 10:38 | O próprio `rules-ai` não ganha `rules-local/` (ele é a fonte) | Claude Code (Opus 5.5) | Cópia de si mesmo não acrescenta nada |
| 2026-10-18 10:38 | Clones do mesmo repositório (`aulasenai` ×5, `dashboard-ai` ×9) recebem a instalação uma vez por repositório remoto | Claude Code (Opus 5.5) | Evita 14 commits iguais e conflitos |

### RULES-LOCAL-GLOBAL.1 — `VERSAO.md` no `rules-ai`, gerada pelo `sincronizar.mjs`

**Próximo passo:** esperar as perguntas fechadas e o "sim" do usuário ao plano.

- **Nível:** MEDIO — lógica em JS em 1 arquivo (`scripts/sincronizar.mjs`) + 1 `.md` gerado.
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** o `sincronizar.mjs` grava `VERSAO.md` na raiz (formato conforme a pergunta 5),
  com a versão e a lista das regras e o código do conteúdo de cada uma (é o que permite comparar
  item por item depois); não muda o arquivo se as regras não mudaram. Atualizar o README.
- **Critérios de aceitação:** R1.1 e R1.2; `node --check`; funções ≤ 45 linhas.
- **Verificação:** `node spec/verificar-spec.mjs tasks/etapas/ETAPA-019-6a76e10c-RULES-LOCAL-GLOBAL.md`
  (gate da C34, antes de começar) + os comandos de R1.1 e R1.2.

### RULES-LOCAL-GLOBAL.2 — Script de sessão: comparar versões e listar mudanças

**Próximo passo:** esperar a `.1`.

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

**Próximo passo:** esperar a `.2`.

- **Nível:** PESADO — regra global nova, vale para todas as IAs e projetos.
- **Modelo:** só Opus 5.5+ ou Fable (ou DeepSeek, C35) — nunca outro
- **Effort:** high
- **Descrição:** `regras/rules-local.md` (o que a IA faz no início da sessão, o que fazer com o
  aviso de versão diferente, conforme a pergunta 1) e a linha nova no `regras/INDEX.md`; registro
  como decisão nova no `CONFLITOS.md`.
- **Critérios de aceitação:** R3.1; regra no índice; o `sincronizar.mjs` não avisa regra fora do
  índice.

### RULES-LOCAL-GLOBAL.4 — Instalar em todos os projetos do escopo (piloto primeiro)

**Próximo passo:** esperar a `.3`.

- **Nível:** PESADO — mudança em massa em vários repositórios.
- **Modelo:** só Opus 5.5+ ou Fable (ou DeepSeek, C35) — nunca outro
- **Effort:** high
- **Descrição:** em 1 projeto piloto, depois nos outros (uma vez por repositório remoto):
  `rules-local/` (script + `VERSAO.md` + regras), gancho `SessionStart` em `.claude/settings.json`
  (conforme a pergunta 3), aviso no `AGENTS.md`/`CLAUDE.md`, `.gitignore` conforme a pergunta 2;
  commit + push em cada repositório; os outros clones com `git pull --rebase`.
- **Critérios de aceitação:** R4.1; em cada projeto, rodar o script dá "versão igual" e
  `git status --short` vazio.

### RULES-LOCAL-GLOBAL.5 — Levar a regra nova às IAs (`--aplicar`)

**Próximo passo:** esperar a `.3`; o usuário roda `node scripts/sincronizar.mjs --aplicar`.

- **Nível:** —
- **Modelo:** Usuário
- **Effort:** low

## Etapa 039-e4b17c52 — REMOVER-TRIPO: tirar a Tripo de tudo (código, docs, quadro e histórico)

**Tarefa:** REMOVER-TRIPO · **Pedido em:** 2026-10-23 11:15 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · rules-ai)
**Pedido:** "ABRA 1 TAREFA PRA REMOVER TRIPO DE TUDO, NAO USAREI MAIS ELE, E REMOVA DAS TAREFAS TAMBEM, E DAS TAREFAS COMPLETAS, TUDO!"
**Objetivo:** nenhum arquivo versionado do `rules-ai` cita ou usa a Tripo (cliente, rotas, chave, docs, cenas, tarefas, etapas e histórico), porque o usuário não vai mais usá-la.

> 🟠 **Tarefa grande (`PESADO`)**: apaga arquivos e reescreve histórico do quadro em massa. O plano é
> esta etapa; a execução **só começa depois do "sim" do usuário** e com as **Perguntas abertas**
> fechadas (C34). Nada foi apagado ainda.

### Levantamento (2026-10-23 11:15, `grep -i tripo`, sem `.git`, `node_modules` e `graphify-out`)

195 ocorrências em 27 arquivos. O `tasks/task_complete.md` **não** cita a Tripo; o histórico dela está
no `STATUS.md` (Registro de decisões, 8 linhas) e nas etapas.

| Grupo | Arquivos (ocorrências) |
|---|---|
| Código do dashboard | `dashboard/cliente_tripo.py` (15), `servidor.py` (9), `config_graphs.py` (6), `galeria_modelos.py` (1), `cenas_prompts.py` (1), `scripts/config_coleta.py` (1) |
| JS do dashboard | `assets/js/api.js` (6), `saldo.js` (3), `chave.js` (3), `principal.js` (3), `cena.js` (3), `config.js` (1), `modal-config.js` (1), `cenas/hud.js` (3), `dados/ferramentas.js` (19), `ferramentas/formatar.js` (1) |
| Docs e dados do dashboard | `TRIPO_AI_DOCS.md` (48), `README.md` (12), `WEB-SCRAP.md` (2), `CLAUDE.md` (1), `.env.example` (2), `cenas/prompt-04.json` (5) |
| Quadro | `tasks/STATUS.md` (8, todas no Registro de decisões) |
| Etapas | `ETAPA-013` (22), `ETAPA-020` (11), `ETAPA-031` (4) |
| Benchmark do Jev | `scripts/jev/benchmarks/golden.jsonl` (4) |

### Escopo

**Entra:**
- Apagar (`git rm`) `cliente_tripo.py`, `galeria_modelos.py`, `cenas_prompts.py`, `TRIPO_AI_DOCS.md` e os
  módulos JS/JSON só da geração de modelos (`chave.js`, `saldo.js`, `modal-config.js`, `cena.js`,
  `cenas/`), conforme a conferência de imports (INV-1).
- Tirar a Tripo do `servidor.py` (rotas `/api/gerar`, `/api/tarefa`, `/api/saldo`, `/api/modelos`,
  `/api/cenas`, `/api/estado`, cabeçalho `X-Tripo-Key`), do `config_graphs.py`, do `.env.example`, do
  `README.md`, do `api.js`, `config.js` e `hud.js`.
- Tirar das tarefas: as 8 linhas do Registro de decisões do `STATUS.md`, as menções nas etapas 013,
  020 e 031, e do `STATUS_PROJETO.md` se houver.
- Tirar a Tripo do `golden.jsonl` (benchmark do Jev) sem mudar o resultado esperado dos itens.

**Não entra:**
- Os 5 GLB gerados e `MODELOS-DE-IA/` fora do Git (não se apaga arquivo fora do Git sem ordem).
- O histórico do Git (commits antigos continuam como estão; só se reescreve o que está versionado hoje).
- `DEMAIS-PROJETOS-*` e outros projetos de `C:\fontes`.
- Mudar o comportamento dos Agentes ao vivo (`/api/agentes`, `/api/projetos`).

### Critério de pronto

- `git grep -i -e tripo -e TRIPO_API_KEY -e X-Tripo-Key` na raiz do `rules-ai` devolve vazio.
- `node --check` passa nos `.js` restantes e `python -m py_compile` nos `.py` restantes.
- `/api/agentes` e `/api/projetos` seguem devolvendo o mesmo JSON de antes.
- `node spec/verificar-spec.mjs tasks/etapas/ETAPA-039-e4b17c52-REMOVER-TRIPO.md` passa.

### Riscos

| Risco | Plano B |
|---|---|
| Sobreposição com a DASHBOARD-AGENTES (ETAPA-020, já aprovada), que também tira a Tripo do `dashboard/` | Pergunta 1: decidir quem faz a parte da Tripo; a outra etapa é ajustada para não repetir |
| Apagar histórico do quadro contraria "histórico nunca é apagado" | Ordem expressa do usuário; o Git guarda tudo. Pergunta 2 define como (apagar linha, ou trocar por "integração removida") |
| Remover módulo JS que os Agentes ao vivo ainda importam | Listar os imports antes de apagar (INV-1); o que for usado é enxugado, não apagado |
| `golden.jsonl` mudar e alterar a medida do benchmark do Jev | Só trocar o texto citando a Tripo; conferir que `nivel` esperado de cada item não muda (INV-3) |
| Chave `TRIPO_API_KEY` no `.env` e no `localStorage` do navegador do usuário | Subtarefa do usuário (`.6`): apagar a chave; a IA não mexe em `.env` |

### Requisitos

> Formato EARS.

| ID | Requisito (EARS) | Cobre | Verificação |
|----|------------------|-------|-------------|
| R1.1 | O SISTEMA DEVE não ter, em arquivo versionado do `rules-ai`, as palavras "tripo", `TRIPO_API_KEY` nem `X-Tripo-Key` | REMOVER-TRIPO.2, .3, .4 | `git grep -i -e tripo -e TRIPO_API_KEY -e X-Tripo-Key` vazio |
| R1.2 | O SISTEMA DEVE não ter mais `cliente_tripo.py`, `galeria_modelos.py`, `cenas_prompts.py` nem `TRIPO_AI_DOCS.md` | REMOVER-TRIPO.2 | `git ls-files dashboard` sem esses nomes |
| R2.1 | QUANDO o servidor receber `GET /api/agentes` ou `GET /api/projetos`, O SISTEMA DEVE devolver o mesmo JSON de antes | REMOVER-TRIPO.2 | chamar as duas rotas antes e depois (`python -c`) e comparar |
| R2.2 | SE o pedido for `/api/gerar`, `/api/tarefa/<id>`, `/api/saldo`, `/api/modelos`, `/api/cenas` ou `/api/estado`, ENTÃO O SISTEMA DEVE responder 404 | REMOVER-TRIPO.2 | leitura do mapa de rotas do `servidor.py` |
| R3.1 | O SISTEMA DEVE manter no `golden.jsonl` o mesmo número de itens e o mesmo nível esperado de cada um | REMOVER-TRIPO.4 | contar linhas e comparar o campo de nível antes/depois |
| R3.2 | O SISTEMA DEVE manter válido o formato do `tasks/STATUS.md` e do `task_complete.md` (tabelas e links) | REMOVER-TRIPO.3 | `node spec/verificar-spec.mjs` nas etapas tocadas e leitura das tabelas |

**Fora do escopo (não-objetivos):** trocar a Tripo por outro gerador 3D; mudar os Agentes ao vivo;
reescrever o histórico do Git.

### Invariantes

| ID | Regra que vale sempre | Domínio da entrada | Como conferir | Teste automatizado |
|----|----------------------|--------------------|---------------|--------------------|
| INV-1 | Todo `import`, `href` e `src` local de cada `.html`, `.js` e `.py` restante aponta para arquivo que existe | todos os arquivos de `dashboard/` depois de cada subtarefa | script de leitura na pasta da sessão (fora do repositório) que resolve os caminhos e lista os que faltam | não: conferência por comando |
| INV-2 | Nenhum arquivo fora do Git é apagado do disco | todos os commits da tarefa | `git diff --name-status <antes>..HEAD` só com arquivos já versionados | não: conferência por comando |
| INV-3 | O `golden.jsonl` mantém o mesmo número de itens e o mesmo nível esperado | os 180 itens | contagem e comparação do campo de nível | não: conferência por comando |

**Casos de borda que o código precisa sobreviver:**

- Página dos Agentes ao vivo aberta sem o servidor local.
- `.env` sem `TRIPO_API_KEY` (ou ausente).
- Link de tarefa que apontava para etapa/linha com Tripo (não pode ficar link quebrado).

### Perguntas abertas

| # | Pergunta | Resposta | Fechada em | Quem respondeu |
|---|----------|----------|------------|----------------|
| 1 | A ETAPA-020 (DASHBOARD-AGENTES, aprovada, ainda pendente) também tira a Tripo do `dashboard/`. **a)** esta tarefa faz já a parte da Tripo e a DASHBOARD-AGENTES.3, .4 e .5 deixam de tratá-la (recomendado) **ou b)** esta tarefa espera a DASHBOARD-AGENTES e cuida só do quadro, das etapas e do `golden.jsonl`? | ⬜ aberta | — | — |
| 2 | Para o histórico (decisões do `STATUS.md` e etapas 013, 020, 031): **a)** apagar as linhas e trechos que citam a Tripo (recomendado; o Git guarda) **ou b)** trocar o nome por "gerador 3D removido" e manter a história? | ⬜ aberta | — | — |
| 3 | A ETAPA-013 (DASHBOARD-REDE-NEURAL, 22 menções, tarefa já encerrada) é **a)** apagada inteira, junto das linhas dela no `task_complete.md`, **ou b)** só tem os trechos da Tripo removidos? | ⬜ aberta | — | — |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-23 11:15 | Registrada como tarefa grande (`PESADO`, spec C34): apaga arquivos e reescreve histórico em massa; execução só depois das perguntas fechadas e do "sim" ao plano. Nada foi apagado | Claude Code (Sonnet 5.5) | Regra do ciclo da task (tarefa grande exige aprovação) |
| 2026-10-23 11:15 | Levantamento: `task_complete.md` não cita a Tripo; a história dela está no Registro de decisões do `STATUS.md` e nas etapas 013, 020 e 031 | Claude Code (Sonnet 5.5) | `grep -i tripo` na pasta, excluindo `.git`, `node_modules` e `graphify-out` |

### REMOVER-TRIPO.1 — Fechar as perguntas abertas e aprovar o plano

**Próximo passo:** o usuário responde as 3 perguntas e diz "sim" ao plano; a IA registra em Decisões.

- **Nível:** Usuário — só o usuário pode fazer (resposta e aprovação do plano de tarefa grande)
- **Modelo:** Usuário
- **Effort:** — (ação do usuário)
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** fechar as perguntas 1 a 3 e dar o "sim" ao plano desta etapa.
- **Critérios de Aceitação:** nenhum `⬜` em Perguntas abertas; "sim" registrado em Decisões.

### REMOVER-TRIPO.2 — Dashboard: apagar a Tripo do código, das rotas, da chave e dos docs

**Próximo passo:** esperar a `.1`; listar os imports dos módulos que ficam (INV-1) e só então rodar o `git rm`.

- **Nível:** PESADO — apaga arquivos em massa e muda vários arquivos ligados (servidor, JS, config)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** `git rm` dos arquivos só da Tripo; `servidor.py` só com `/api/agentes`, `/api/projetos` e
  `caminho_proibido`; `config_graphs.py`, `.env.example`, `README.md`, `api.js`, `config.js`, `hud.js`,
  `dados/ferramentas.js` e `formatar.js` sem a Tripo; ajustar conforme a resposta 1.
- **Critérios de Aceitação:** R1.1 (parte `dashboard/`), R1.2, R2.1, R2.2; INV-1; INV-2; `node --check` e
  `python -m py_compile`.
- **Depende de:** REMOVER-TRIPO.1

### REMOVER-TRIPO.3 — Quadro e etapas: tirar a Tripo das tarefas e do histórico

**Próximo passo:** esperar a `.1`; aplicar as respostas 2 e 3.

- **Nível:** PESADO — reescreve histórico do quadro e de 3 etapas (apaga dados em massa)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** remover do `STATUS.md` as 8 linhas do Registro de decisões; tratar `ETAPA-013`, `ETAPA-020` e
  `ETAPA-031` e o `task_complete.md` conforme as respostas 2 e 3; sem deixar link quebrado.
- **Critérios de Aceitação:** R1.1 (parte `tasks/`), R3.2; nenhum link do quadro aponta para arquivo inexistente.
- **Depende de:** REMOVER-TRIPO.1

### REMOVER-TRIPO.4 — Benchmark do Jev e script de coleta sem a Tripo

**Próximo passo:** esperar a `.1`.

- **Nível:** MEDIO — 2 arquivos (`golden.jsonl`, `scripts/config_coleta.py`), sem banco nem segurança
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** trocar o texto que cita a Tripo nos 4 itens do `golden.jsonl` sem mudar o nível esperado;
  tirar a Tripo do `config_coleta.py`.
- **Critérios de Aceitação:** R1.1; R3.1; INV-3.
- **Depende de:** REMOVER-TRIPO.1

### REMOVER-TRIPO.5 — Conferência final

**Próximo passo:** esperar a `.2`, a `.3` e a `.4`.

- **Nível:** MEDIO — conferência por comando em vários arquivos
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** `git grep` vazio, `node --check`, `python -m py_compile`, comparar `/api/agentes` e
  `/api/projetos`, rodar o gate da spec e atualizar o grafo do graphify ao fechar a tarefa.
- **Critérios de Aceitação:** critério de pronto da etapa inteiro.
- **Depende de:** REMOVER-TRIPO.2, REMOVER-TRIPO.3, REMOVER-TRIPO.4

### REMOVER-TRIPO.6 — Apagar a chave da Tripo no computador do usuário

**Próximo passo:** esperar a `.2`.

- **Nível:** Usuário — só o usuário pode fazer (arquivo `.env` local e navegador)
- **Modelo:** Usuário
- **Effort:** — (ação do usuário)
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** apagar `TRIPO_API_KEY` do `dashboard/.env` (fora do Git) e a chave guardada no
  `localStorage` do navegador; opcionalmente revogar a chave no painel da Tripo.
- **Critérios de Aceitação:** chave removida dos dois lugares.
- **Depende de:** REMOVER-TRIPO.2

## Etapa 003 — EFFORT-PADARIA: testar `low`, `medium` e `high` em todos os modelos com um projeto de padaria

**Tarefa:** EFFORT-PADARIA · **Pedido em:** 2026-10-16 20:02 · **Criada por:** Claude Code (Opus 5.5) (local · main)
**Pedido:** "crie 1 tarefa mais complexa, que consiga testar os 3 tipos de effort, em todos os modelos, e pra isso, crie 1 projeto simples de padaria, na pasta testes-effort-padaria, salve ela no quadro e assuma"
**Objetivo:** um desafio de raciocínio com várias etapas (produção, estoque, compras, descontos e escala de forno) que **não** se resolve com um script de força bruta, para medir se o `effort` muda tokens, tempo e **acerto** em cada modelo.

> 🌐 **TAREFA GLOBAL** (todos os projetos e IAs). Continua a `CONFEFFORT-GLOBAL` (etapa 002): lá o problema era fácil e os agentes resolveram por script; aqui o agente é proibido de executar código.

### Escopo

- **Entra:** pasta `C:\fontes\testes-effort-padaria` (README, `AGENTS.md`, `dados/*.md` e `DESAFIO.md`); gabarito calculado por script **fora do projeto** e guardado só nesta etapa; uma rodada por modelo × `effort`; relatório comparativo.
- **Não entra:** código de aplicação da padaria; testes automatizados (regra global); mudar o `effort` dos agentes dos projetos (decisão depois do relatório).

### Protocolo de medição

1. Agente descartável do modelo, com o `effort` da rodada, recebe o mesmo enunciado: ler só a pasta do projeto, **sem executar código**, responder no formato do `DESAFIO.md`.
2. Medidas: tokens totais, tempo, chamadas de ferramenta e **nota** (itens certos / total, conferidos contra o gabarito).
3. Claude (Haiku, Sonnet, Opus): o líder Opus 5.5 dispara os agentes de cada modelo pelo parâmetro `effort`. Gemini e DeepSeek: só pela ferramenta deles, com a configuração equivalente de raciocínio.

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-16 20:02 | Projeto só com dados e enunciado (sem app), agente proibido de rodar código | Claude Code (Opus 5.5) | A rodada 2 da etapa 002 mostrou que, com script, o `effort` quase não aparece |
| 2026-10-16 20:02 | Subtarefas .3 a .5 rodadas pelo líder Opus com agentes do modelo de cada uma (o modelo medido é o do agente) | Claude Code (Opus 5.5) | Fluxo de equipe de `niveis-e-modelos.md` |
| 2026-10-16 20:02 | Pasta sem remoto no GitHub: repositório Git local; push quando o usuário criar o remoto | Claude Code (Opus 5.5) | Criar repositório no GitHub é ação externa |

### EFFORT-PADARIA.1 — Criar o projeto `testes-effort-padaria`

**Próximo passo:** criar README, `AGENTS.md`, `dados/` e `DESAFIO.md`; `git init`; commit.

- **Nível:** MEDIO — vários arquivos de dados ligados entre si, sem código.
- **Entrega:** — · **Verificação:** —

### EFFORT-PADARIA.2 — Gabarito

- **Nível:** MEDIO — cálculo por script na pasta temporária da sessão; resultado só nesta etapa.

### EFFORT-PADARIA.3 a .7 — Rodadas por modelo

- **.3** Haiku 5.5 (`low`, `medium`, `high`) · **.4** Sonnet 5.5 · **.5** Opus 5.5 (+ `xhigh`) · **.6** Gemini Pro (só Gemini CLI) · **.7** DeepSeek raciocínio (só DeepSeek).
- **Nível:** .3 LEVE, .4 MEDIO, .5 PESADO, .6 e .7 MEDIO (nível do modelo medido).

### EFFORT-PADARIA.8 — Relatório comparativo · EFFORT-PADARIA.9 — Aceite do usuário

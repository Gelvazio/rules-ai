# 🎚️ Níveis de tarefa — quem pega o quê

Cada subtarefa tem um **nível**, para que modelos mais fracos façam as tarefas simples e o modelo
forte fique com as difíceis. Vale para **todas as IAs**. Reserva: `frentes-e-reserva.md`.

## Os 3 níveis

| Nível | Em palavras simples | Sinais |
|---|---|---|
| `PESADO` | difícil | banco (SQL, RLS, RPC, seeds), login/papéis/permissões, chaves ou segredos, segurança, arquitetura, mais de 3 arquivos ligados, mudança em massa, apagar dados |
| `MEDIO` | média | código com lógica (JS, Python, geradores, telas), de 1 a 3 arquivos |
| `LEVE` | fácil | só `.md`, textos, linhas do quadro, formatação, configuração simples sem lógica |

- **O sinal mais restritivo vence** ("1 arquivo, mas é SQL" = `PESADO`). **Na dúvida, sobe o nível.**

## Quem pega cada nível

| Ferramenta | `LEVE` | `MEDIO` | `PESADO` |
|---|---|---|---|
| **Claude Code** | Haiku | Sonnet | **Opus 5.5 ou superior, ou Fable** |
| **Gemini CLI** | Flash | Pro | ⛔ |
| **Antigravity** | Gemini Flash | ⛔ | ⛔ |
| **Grok** | rápido | principal | ⛔ |
| **DeepSeek** | Flash | raciocínio | ✅ |
| **Codex** / **Cursor** | ✅ | ✅ | ⛔ |
| **Devin** / **Copilot** | ✅ | ⛔ | ⛔ |

- `PESADO` exige **Claude Code com Opus 5.5 ou superior, Fable, ou DeepSeek** (C35, 2026-10-18 —
  altera a C22: o DeepSeek deixou de ser `⛔` em `PESADO`).
- ⛔ **NUNCA executar subtarefa que não é do seu modelo** (C2, 2026-10-16 22:53): cada IA só pega
  os níveis marcados na **sua** linha — no Claude Code, Haiku **só** `LEVE`, Sonnet **só** `MEDIO`,
  Opus 5.5+/Fable **só** `PESADO`. Nem acima nem abaixo, e **sem exceção** (nem com autorização).
- A tabela é do usuário: mudança nela vai para o "Registro de decisões" do `tasks/STATUS.md`.
- Regras de banco (quem pode falar com o banco, produção) são do projeto.

## Como usar

- **Reserva com IA + modelo:** "Em uso por" = `<IA (modelo)> (<frente>) (desde <data hora>)`. É
  assim que se sabe o nível máximo de quem reservou.
- Cada IA só pega subtarefa do **seu** nível (a coluna **Modelo** do quadro diz qual). Sem
  subtarefa livre do seu nível → não pega nenhuma e avisa o usuário.
- **Onde fica o nível:** 1º item da seção da subtarefa na etapa —
  `- **Nível:** MEDIO — motivo curto` (o sinal que decidiu).
- **Quem classifica:** quem cria ou divide a subtarefa. Subtarefa sem nível → classificar antes
  de pegar.
- Subtarefa de outro nível → liberar a reserva, reclassificar ou dividir; ⛔ nunca mudar o nível
  para caber na sua ferramenta.

## Equipe de agentes do Claude Code

O líder (Opus 5.5+ ou Fable) reserva **uma subtarefa por vez**, delega ao agente do nível
(`executor-leve` = Haiku, `executor-medio` = Sonnet, `executor-pesado` = Opus), confere, valida
e commita. Só o líder usa Git e edita o quadro; o `classificador-tarefas` só grava a linha
`- **Nível:**` nas etapas. Quem **executa** é o agente do nível: na reserva vai o modelo dele, ex.:
`Claude Code (Haiku 5.5 · executor-leve; líder Opus 5.5) (<frente>) (desde …)`.

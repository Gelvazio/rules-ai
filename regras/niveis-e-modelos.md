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
| **DeepSeek** | Flash | raciocínio | ⛔ |
| **Codex** / **Cursor** | ✅ | ✅ | ⛔ |
| **Devin** / **Copilot** | ✅ | ⛔ | ⛔ |

- `PESADO` é **só do Claude Code com Opus 5.5 ou superior, ou Fable**.
- A tabela é do usuário: mudança nela vai para o "Registro de decisões" do `tasks/STATUS.md`.
- Regras de banco (quem pode falar com o banco, produção) são do projeto.

## Como usar

- **Reserva com IA + modelo:** "Em uso por" = `<IA (modelo)> (<frente>) (desde <data hora>)`. É
  assim que se sabe o nível máximo de quem reservou.
- Cada IA só pega subtarefa com nível **até o máximo da sua linha**. Modelo forte pega uma mais
  leve **só se** não houver nenhuma livre do seu nível.
- **Onde fica o nível:** 1º item da seção da subtarefa na etapa —
  `- **Nível:** MEDIO — motivo curto` (o sinal que decidiu).
- **Quem classifica:** quem cria ou divide a subtarefa. Subtarefa sem nível → classificar antes
  de pegar.
- Subtarefa maior que o nível → liberar a reserva, reclassificar ou dividir; ⛔ nunca baixar o
  nível para caber na sua ferramenta.

## Equipe de agentes do Claude Code

O líder (Opus 5.5+ ou Fable) reserva **uma subtarefa por vez**, delega ao agente do nível
(`executor-leve` = Haiku, `executor-medio` = Sonnet, `executor-pesado` = Opus), confere, valida
e commita. Só o líder usa Git e edita o quadro; o `classificador-tarefas` só grava a linha
`- **Nível:**` nas etapas.

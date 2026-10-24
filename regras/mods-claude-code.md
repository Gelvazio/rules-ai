# 🧩 Mods do Claude Code (marketplace `benai-mods`)

Decidido em 2026-10-24 (pedido do usuário). Vale para o **Claude Code** em **todos os projetos**.
Fonte dos mods: `C:\fontes\rules-ai\MODS-CLAUDE-CODE\benai-mods` (marketplace local, só com o
README e os plugins; descrição de cada um no README).

## Mods ativos em todos os projetos

Ligados no escopo do usuário (`~/.claude/settings.json`, `enabledPlugins`), valendo em qualquer
pasta:

| Mod | Para que serve |
|-----|----------------|
| `helper-desk@benai-mods` | Barra de progresso acima do prompt e painel de subagentes (já era obrigatório) |
| `handoff@benai-mods` | Perto de 250 mil tokens, escreve o handoff do chat e abre um chat novo com ele |
| `reflect@benai-mods` | Quando o usuário corrige a IA, oferece salvar a correção como regra |
| `chat-inventory@benai-mods` | Painel "In this chat": tarefas, conectores, arquivos e skills usados |
| `mods@benai-mods` | `/mods`: liga e desliga cada mod |

## Regras

- ✅ **helper-desk:** todo chat com 2 ou mais passos usa `mcp__helper-desk__plan` (regra já existente
  no `CLAUDE.md` global); continua valendo.
- ✅ **reflect:** só **oferece** salvar regra; a IA nunca grava regra global sem o usuário aceitar.
  Regra nova do usuário continua indo para `C:\fontes\rules-ai\regras\` (fonte única), não para
  um `CLAUDE.md` solto.
- ✅ **handoff:** o handoff do mod **complementa** o quadro (`tasks/STATUS.md`) e a memória
  (`memoria-ai.md`); se divergir do quadro, vale o quadro.
- ⛔ Os demais mods do marketplace (`brain-dump`, `cache-clock`, `screen-share`, `replay-theater`)
  **não** estão ligados globalmente; só com pedido do usuário.
- Para ligar/desligar: `/mods`, ou `enabledPlugins` no `~/.claude/settings.json`; depois
  `/reload-plugins` nos chats abertos.
- A pasta do marketplace é lida pelo caminho local; se for movida, atualizar
  `extraKnownMarketplaces.benai-mods.source.path` no `settings.json`.

# 🎛️ Esforço (`effort`) dos agentes

Decidido em 2026-10-16 (C21; origem: REA, etapa 011-9d3e7a52). **Vale para todos os projetos e todas as
IAs.** Conferência por modelo: tarefa `CONFEFFORT-GLOBAL` (`rules-ai/tasks/STATUS.md`).

- ✅ Todo agente de equipe declara o esforço no frontmatter (`effort:`), para valer sempre, sem
  depender do esforço da sessão do líder.
- Esforço por **nível** do agente (`niveis-e-modelos.md`):

| Agente / nível | `effort` |
|---|---|
| `classificador-tarefas` e `executor-leve` (`LEVE`) | `low` |
| `executor-medio` (`MEDIO`) | `medium` |
| `executor-pesado` (`PESADO`) | `high` (ajustável; `xhigh` só com pedido do usuário) |

- Editar só a **fonte** dos agentes (no REA e nos dashboards, `.agents/agents/*.md`); as cópias por IA
  são regeradas pelo script do projeto (`npm run sync:agentes`).
- ⚠️ O agente **não enxerga** o próprio esforço: conferir por fora (tokens, tempo, tamanho da
  resposta), como manda a `CONFEFFORT-GLOBAL`. Nem toda IA tem `effort` (Gemini, DeepSeek): usar a
  configuração equivalente de raciocínio da ferramenta.
- Conferência do Sonnet 5.5 (CONFEFFORT-GLOBAL.2 e .6): `low` e `medium` sem diferença mensurável; só `high` mostrou efeito pequeno. Os outros modelos ainda não foram conferidos.
- Teste da padaria (EFFORT-PADARIA, etapa 003): o `effort` é aplicado nos 3 modelos Claude, forte só no Haiku e no `xhigh` do Opus; nenhum nível mudou a nota (38/38 em todos). Subir o nível aumenta custo e tempo sem ganho de acerto nesse tipo de tarefa.

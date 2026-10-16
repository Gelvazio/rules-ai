## Etapa 002 — ESFORCO-GLOBAL e CONFEFFORT-GLOBAL: esforço (`effort`) vale para todos os projetos

**Tarefas:** ESFORCO-GLOBAL e CONFEFFORT-GLOBAL · **Pedido em:** 2026-10-16 19:51 · **Criada por:** Claude Code (Sonnet 5.5) (local · main)
**Pedido:** "ESTAS 2 TAREFAS DEVEM SERVIR DE FORMA GLOBAL, ASSUMA ELAS E DEIXE ISSO CLARO"
**Objetivo:** levar para o `rules-ai` (global) as duas tarefas que nasceram no REA: o esforço por
nível de agente (ESFORCO) e a conferência de que o `effort` é aplicado em cada modelo (CONFEFFORT).

> 🌐 **ESTAS DUAS TAREFAS SÃO GLOBAIS:** valem para todos os projetos de `C:\fontes` e todas as IAs.
> Origem: REA, etapas 011-9d3e7a52 (ESFORCO, concluída) e 012-5b1f0c86 (CONFEFFORT, pendente). A
> partir de 2026-10-16 19:51 o quadro oficial é **este** (`rules-ai/tasks/STATUS.md`); o REA só guarda
> o histórico e aponta para cá.

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-16 19:51 | Quadro oficial das duas tarefas passa a ser o do `rules-ai`; as linhas do REA viram histórico/apontamento | Gelvazio | "devem servir de forma global" |
| 2026-10-16 19:51 | Esforço por nível (aprovado no REA, 2026-10-16 12:49): `LEVE` = `low`, `MEDIO` = `medium`, `PESADO` = `high` | Gelvazio | "SIM" à tabela proposta na ETAPA-011 |
| 2026-10-16 19:51 | CONFEFFORT continua com uma subtarefa **por modelo**, cada uma só pelo modelo escrito nela | Gelvazio | Pedido original da ETAPA-012 |

### ESFORCO-GLOBAL.1 — Regra global `regras/esforco.md`

**Próximo passo:** — (entregue).

- **Nível:** LEVE — só `.md` · **Modelo:** Claude Code Sonnet 5.5 pega por não haver subtarefa MEDIO livre para esta frente sem violar "1 por frente"; registrado.
- **Critérios de aceitação:** regra sincronizada nas IAs; `CONFLITOS.md` com a decisão (C21).
- **Entrega:** `regras/esforco.md`, C21 em `CONFLITOS.md`, sincronizada nas IAs · **Verificação:** `sincronizar.mjs --aplicar` gravou as IAs e o unificado inclui `esforco.md`.

### ESFORCO-GLOBAL.2 — Aceite do usuário

**Próximo passo:** 👀 depois da .1.

- **Nível:** LEVE — conferência do usuário.

### CONFEFFORT-GLOBAL — Subtarefas por modelo

Procedimento e problema padrão: os da ETAPA-012 do REA (`REA-APP-CLONES/tasks/etapas/ETAPA-012-5b1f0c86-CONFEFFORT.md`), sem mudar uma palavra. Cada subtarefa só pelo modelo indicado.

- **CONFEFFORT-GLOBAL.1** — Haiku 5.5 (LEVE) · **.2** — Sonnet 5.5 (MEDIO) · **.3** — Opus 5.5 (PESADO, incluir `xhigh`) · **.4** — Gemini Pro (MEDIO) · **.5** — DeepSeek raciocínio (MEDIO).
- **Critérios de aceitação:** tabela com `low`/`medium`/`high` (tokens, tempo, tamanho) e conclusão em uma linha (`aplicado`, `ignorado` ou `não deu para medir`).
- **Entrega:** — · **Verificação:** — (por subtarefa, na hora de executar).

#### CONFEFFORT-GLOBAL.2 — Sonnet 5.5 — resultado (2026-10-16 20:05, Claude Code Sonnet 5.5, local · main)

Agentes descartáveis `model: sonnet` (parâmetro `effort` do Agent), problema padrão colado sem mudar uma palavra; medidas do relatório de uso de cada subagente:

| effort | tokens totais | tempo | resposta |
|---|---|---|---|
| `low` | 41.253 | 14.119 ms | 40 ordens, lista completa |
| `medium` | 41.331 | 14.513 ms | 40 ordens, lista completa |
| `high` | 41.424 | 14.515 ms | 40 ordens, lista completa |

**Conclusão (uma linha): `effort` ignorado ou sem efeito mensurável neste problema** — diferença de 0,4% nos tokens e de 0,4 s, sem passos de raciocínio a mais; os três acertaram.
Ressalva: o problema pode ser fácil demais para o Sonnet gastar raciocínio extra e o relatório de uso não separa tokens de raciocínio; para decidir remover ou ajustar o campo, repetir com problema mais difícil.

### CONFEFFORT-GLOBAL.6 — Sonnet 5.5: 2ª rodada com problema difícil

**Próximo passo:** rodar 9 agentes (3 por `effort`) e comparar tokens, tempo e tamanho.

- **Nível:** MEDIO · **Modelo:** só Claude Code Sonnet 5.5. Pedido do usuário ("sim") depois de a rodada 1 não mostrar diferença.
- **Problema:** 9 pessoas A–I com 9 restrições cruzadas; gabarito 77 (força bruta em Python). Critério: tokens/tempo crescem de `low` a `high`, `effort` ignorado ou só `high` muda.
- **Entrega:** — · **Verificação:** —

#### CONFEFFORT-GLOBAL.6 — resultado (2026-10-16 20:25, Claude Code Sonnet 5.5, local · main)

9 agentes `model: sonnet` (3 por `effort`), mesmo enunciado (9 pessoas, 9 regras; gabarito 77). Todos acertaram 77, resolvendo por script Python (1 a 2 chamadas de ferramenta).

| effort | tokens (3 execuções) | média | tempo (3 execuções) | média |
|---|---|---|---|---|
| `low` | 42.503 · 42.512 · 42.615 | 42.543 | 8,6 · 7,9 · 8,2 s | 8,2 s |
| `medium` | 42.761 · 42.578 · 42.604 | 42.648 | 8,4 · 7,4 · 9,7 s | 8,5 s |
| `high` | 43.247 · 43.843 · 42.490 | 43.193 | 12,4 · 14,9 · 8,7 s | 12,0 s |

**Conclusão (uma linha): `low` e `medium` indistinguíveis; só `high` mostra diferença, e pequena** (+1,5% de tokens, +46% de tempo; 2 das 3 execuções de `high` usaram 2 chamadas de ferramenta, a terceira ficou igual a `low`/`medium`).
Ressalvas: amostra de 3 por nível; o problema foi resolvido por força bruta (pouco raciocínio a regular); o relatório de uso não separa tokens de raciocínio. Recomendação para decisão do usuário: manter `high` só no `executor-pesado`; `low` vs `medium` não se comprovou.

### ESFORCO-GLOBAL.3, .4 e .5 — `effort` em todos os agentes e em todas as tarefas pendentes

**Pedido (2026-10-16 20:40):** "2-aceito; 1-crie em todas as tarefas o effort; 3-adicione o effort sempre, se não usa, é só o modelo ignorar, faça isso pra todas as tarefas que estão pendentes no quadro de tarefas em todos os projetos"

- **.3** (MEDIO): `effort:` no frontmatter dos agentes (`classificador-tarefas`/`executor-leve` = low, `executor-medio` = medium, `executor-pesado` = high), em todos os projetos que têm agentes; cópias por IA regeradas pelo script de cada projeto. IA que não usa o campo o ignora.
- **.4** (PESADO, mudança em massa): em cada linha ⬜ dos quadros, acrescentar `effort` derivado do nível (LEVE=low, MEDIO=medium, PESADO=high). Linha sem nível: classificar pelos sinais de `niveis-e-modelos.md` (na dúvida sobe) e gravar `nível · effort`. Aceite do usuário = `effort low`. Fora: `DEMAIS-PROJETOS-DE-SISTEMAS-MANTER-OFFLINE` (regra C20) e `ajax-ai-by-pewdiepie` (cópias de terceiros).
- **Decisão** (2026-10-16 20:40, Gelvazio): o `effort` vai **sempre**, em todas as tarefas e IAs; quem não usa ignora.


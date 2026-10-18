## Etapa 017-9b41c0de — NIVEL-DEEPSEEK: DeepSeek também pega tarefa `PESADO` (altera a C22)

**Tarefa:** NIVEL-DEEPSEEK · **Pedido em:** 2026-10-18 08:52 · **Criada por:** DeepSeek (Flash) (local · main)
**Pedido:** "mude a regra C22, e libere deepseek PESADO tambem".
**Objetivo:** a célula `PESADO` da linha **DeepSeek** deixa de ser `⛔` e passa a `✅`, e a frase
"`PESADO` é **só** do Claude Code com Opus 5.5+ ou Fable" deixa de ser exclusiva.

> 🌐 **GLOBAL:** altera a **C22** (que hoje diz "sem exceção"). Confirmação do usuário em
> 2026-10-18 08:52; registro em `CONFLITOS.md` como **C35**.

### Escopo

- **Entra:** linha do **DeepSeek** em `regras/niveis-e-modelos.md`; a frase do `PESADO`; **C35** no
  `CONFLITOS.md`; linha no Registro de decisões do `STATUS.md`.
- **Não entra:** a matriz ferramenta × modelo × nível da skill global `classificar-tarefa`
  (fora deste repositório → subtarefa .2, pendente).

### Riscos

| Risco | Plano B |
|---|---|
| Modelo mais barato pegar `PESADO` e entregar fraco | O `PESADO` continua exigindo `effort high` e a **Verificação** na subtarefa; o DeepSeek declara o raciocínio equivalente (`esforco.md`) |
| Sobrar a regra antiga em outro arquivo | `grep DeepSeek regras/` conferido: só `niveis-e-modelos.md` (nível) e `esforco.md` (que trata de `effort`, não de nível) |

### Decisões

| Data | Decisão | Quem | Palavras |
|---|---|---|---|
| 2026-10-18 08:52 | DeepSeek passa a pegar `PESADO` (C35, altera a C22) | Gelvazio | "mude a regra C22, e libere deepseek PESADO tambem" |

### NIVEL-DEEPSEEK.1 — Regra: `PESADO` liberado para o DeepSeek

**Próximo passo:** editar `regras/niveis-e-modelos.md` (linha DeepSeek e frase do `PESADO`) e registrar a C35 no `CONFLITOS.md`.

- **Nível:** PESADO — muda regra global de todas as IAs (mesmo precedente da HERDR-GLOBAL.1).
- **Modelo:** DeepSeek (raciocínio) ou Claude Code Opus 5.5+ / Fable.
- **Effort:** high.
- **Descrição:** trocar `| **DeepSeek** | Flash | raciocínio | ⛔ |` por `✅`; ajustar a frase do
  `PESADO` para "`PESADO` exige Claude Code Opus 5.5+/Fable **ou** DeepSeek (raciocínio)"; manter
  intacta a C22 na parte que proíbe pegar nível **acima do seu** para os outros modelos.
- **Critérios de Aceitação:** a linha DeepSeek tem `✅` na coluna `PESADO`; nenhum arquivo de
  `regras/` afirma que `PESADO` é exclusivo de Opus/Fable; C35 no `CONFLITOS.md`;
  `node scripts/sincronizar.mjs` (simulação) aplica sem erro.

### NIVEL-DEEPSEEK.2 — Matriz da skill `classificar-tarefa`

**Próximo passo:** usuário (ou sessão local) edita a skill global.

- **Nível:** LEVE — só `.md`.
- **Modelo:** até Haiku/Flash.
- **Descrição:** a skill global `~/.agents/skills/classificar-tarefa/SKILL.md` tem a matriz
  ferramenta × modelo × nível com DeepSeek `⛔` em `PESADO`; alinhar à C35.
- **Critérios de Aceitação:** a matriz da skill mostra DeepSeek em `PESADO`.

---

### Entregas desta etapa

| Subtarefa | Commit | Verificação |
|---|---|---|
| NIVEL-DEEPSEEK.1 | `feat(NIVEL-DEEPSEEK.1)` | linha DeepSeek com `✅` em `PESADO`; frase do `PESADO` atualizada; C35 no `CONFLITOS.md` |

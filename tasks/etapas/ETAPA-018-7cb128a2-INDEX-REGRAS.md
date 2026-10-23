## Etapa 018-7cb128a2 — INDEX-REGRAS: índice de leitura das regras globais (`regras/INDEX.md`)

**Tarefa:** INDEX-REGRAS · **Pedido em:** 2026-10-18 10:23 · **Criada por:** Claude Code (Opus 5.5) (local · main)
**Pedido:** "faça isso,crie este regras/index.md" (depois da proposta: índice com a ordem de
leitura e o `sincronizar.mjs` montando o `dist/` na mesma ordem).
**Objetivo:** dar às regras globais uma porta de entrada única, com a ordem de leitura (das que
mais mudam o comportamento da IA para as de assunto), útil também na nuvem, onde o `dist/` não
existe; e fazer o `dist/REGRAS-GLOBAIS.md` seguir essa ordem em vez da alfabética.

> Tarefa pequena: 2 arquivos (`regras/INDEX.md` e `scripts/sincronizar.mjs`), sem banco, sem
> segurança e sem apagar dados. O `--aplicar` nos arquivos globais das IAs fica com o usuário (.3).

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-18 10:23 | O nome do arquivo é `regras/INDEX.md` (maiúsculo, como o `.claude/rules/INDEX.md` do `aulasenai`) | Claude Code (Opus 5.5) | Padrão já usado nos projetos |
| 2026-10-18 10:23 | O `INDEX.md` **não** entra no `dist/` (é só índice); regra que não estiver no índice entra no fim, em ordem alfabética, com aviso no terminal | Claude Code (Opus 5.5) | Regra nova nunca some do `dist/` por esquecimento |
| 2026-10-18 10:33 | `comando-ponto.md` e `comando-interrogacao.md` entram no índice (4 e 5); o `.` aparece também em `frentes-e-reserva.md` (C30): duas fontes para o mesmo gatilho, fica como pendência | Claude Code (Opus 5.5) | Fora do escopo desta tarefa |

### INDEX-REGRAS.1 — `regras/INDEX.md` com a ordem de leitura

**Próximo passo:** — (entregue 2026-10-18).

- **Nível:** LEVE — só `.md`, sem lógica.
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **Descrição:** lista numerada com um link Markdown por arquivo de `regras/`
- **JEV-AI-SUGGESTION:** NAO
  (`[ciclo-da-task.md](ciclo-da-task.md)`), cada um com 1 linha do que trata, nesta ordem:
  `ciclo-da-task`, `niveis-e-modelos`, `frentes-e-reserva`, `quadro-de-tarefas`,
  `exibicao-de-status`, `git-geral`, `testes-validacao`, `codigo-limites-nomes`, `codigo-solid`,
  `espec`, `esforco`, `graphify`, `gerenciador-centralizado`, `pastas-ignoradas`,
  `atividades-e-idioma`. Topo curto: para que serve, onde ler na nuvem
  (`Gelvazio/rules-ai`, pasta `regras/`) e que regra nova entra no índice no mesmo commit.
- **Critérios de aceitação:** os 15 arquivos de `regras/` aparecem uma vez cada; nenhum link para
  arquivo inexistente; linhas ≤ 100; português com acentuação.
- **Entrega (2026-10-18 10:33, Haiku 5.5 · executor-leve; líder Opus 5.5):** `regras/INDEX.md`
  com 17 itens em 5 grupos. No caminho apareceram `comando-ponto.md` e `comando-interrogacao.md`
  (commits `46b5507` e `d069f78`, de outra sessão, às 10:11); entraram como itens 4 e 5, depois de
  `frentes-e-reserva.md` (decisão do líder: são gatilhos de mensagem curta).
- **Verificação (líder):** script Python: numeração 1 a 17 sem buraco; os 17 arquivos de `regras/`
  (fora o índice) aparecem uma vez cada; texto do link = alvo; nenhuma linha > 100.

### INDEX-REGRAS.2 — `sincronizar.mjs` monta o `dist/` na ordem do índice

**Próximo passo:** — (entregue 2026-10-18).

- **Nível:** MEDIO — lógica em JS, 1 arquivo.
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **Descrição:** `montarUnificado()` lê a ordem dos links `(<nome>.md)` do `regras/INDEX.md`;
- **JEV-AI-SUGGESTION:** NAO
  deixa o `INDEX.md` de fora do `dist/`; arquivo de `regras/` fora do índice entra no fim, em
  ordem alfabética, com aviso no terminal; link do índice para arquivo que não existe gera aviso
  e é ignorado; sem `INDEX.md`, volta à ordem alfabética. Atualizar o README (seção "Mudar uma
  regra": incluir o arquivo novo no índice).
- **Critérios de aceitação:** `node --check`; `node scripts/sincronizar.mjs` (sem `--aplicar`)
  gera o `dist/` começando por "Ciclo de uma tarefa" e sem o texto do índice; funções ≤ 45
  linhas, JSDoc, linhas ≤ 100.
- **Entrega (2026-10-18, Sonnet 5.5 · executor-medio; líder Opus 5.5):** `scripts/sincronizar.mjs`
  (`ARQUIVO_INDICE`, `PADRAO_LINK_INDICE`, `lerOrdemDoIndice()`, `listarArquivosDeRegras()`;
  `montarUnificado()` usa a lista) e `README.md` (linha do índice e passo novo em "Mudar uma regra").
- **Verificação (líder):** `node --check` ok; `node scripts/sincronizar.mjs` sem `--aplicar` (só
  regrava o `dist/`): primeiro título "🔁 Ciclo de uma tarefa", sem o índice, 16 separadores
  (17 regras), sem aviso. Prova dos 2 avisos numa cópia na pasta temporária da sessão, com
  `HOME`/`USERPROFILE`/`APPDATA` numa pasta vazia; arquivos globais reais intactos (datas de
  2026-10-17). 4 linhas > 100 no README são da tabela antiga de IAs, fora do escopo.

### INDEX-REGRAS.3 — Levar às IAs (`node scripts/sincronizar.mjs --aplicar`)

**Próximo passo:** o usuário roda o `--aplicar` (as IAs com texto embutido só
veem a ordem nova depois dele; o Claude Code lê o `dist/` direto pelo `@import`).

- **Nível:** —
- **Modelo:** Usuário
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO

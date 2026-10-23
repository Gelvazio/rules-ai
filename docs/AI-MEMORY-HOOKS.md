# AI-MEMORY — hooks do Claude Code

**Subtarefa:** AI-MEMORY-INTEGRATION.5 (nível LEVE) · **Data:** 2026-10-23
**Natureza:** mapeamento por leitura. Nenhum hook foi executado e nenhum arquivo foi alterado.

**Fontes lidas (somente leitura):**
- `C:\fontes\ai-memory\hooks\claude-code\*.sh` (9 eventos) e `hooks\_lib.sh`
- `C:\fontes\ai-memory\docs\install.md`
- `C:\fontes\ai-memory\crates\ai-memory-cli\src\commands\` (`render_shared.rs`,
  `install_hooks.rs`)
- `C:\fontes\aulasenai\.claude\settings.json`
- `C:\fontes\rules-ai\dist\REGRAS-GLOBAIS.md` (seção Jev, "Classificar mensagens")

---

## 1. Quadro dos hooks

| Evento | Script | O que faz | Timeout | Devolve ao Claude |
|---|---|---|---|---|
| SessionStart | session-start.sh | POST + GET do handoff | padrão\* | handoff (contexto) |
| UserPromptSubmit | user-prompt-submit.sh | POST do prompt | padrão\* | `{}` |
| PreToolUse | pre-tool-use.sh | POST antes da ferramenta | padrão\* | `{}` |
| PostToolUse | post-tool-use.sh | POST depois da ferramenta | padrão\* | `{}` |
| PreCompact | pre-compact.sh | POST antes da compactação | padrão\* | `{}` |
| Stop | stop.sh | POST do fim do turno (ver nota 4) | padrão\* | `{}` |
| SessionEnd | session-end.sh | POST do fim da sessão | 15 s | `{}` |
| SubagentStart | subagent-start.sh | POST do início do subagente | padrão\* | `{}` |
| SubagentStop | subagent-stop.sh | POST do fim do subagente | padrão\* | `{}` |

\* "padrão" = o instalador não grava `timeout` nesse evento. O valor padrão do Claude Code
não foi confirmado nesta leitura (ver seção 4).

**Notas do quadro:**

1. **Envio sem bloqueio.** Cada script envia com `|| true` e termina com `exit 0`
   (`hooks\claude-code\*.sh`, última linha). Falha do servidor não derruba a sessão.
2. **Só o SessionStart injeta contexto.** Ele imprime
   `hookSpecificOutput.additionalContext` com o handoff pendente, quando existe
   (`hooks\claude-code\session-start.sh`, linhas 38-44). Os outros eventos imprimem `{}`.
   A busca do handoff só roda se o payload trouxer `cwd`
   (`hooks\_lib.sh`, linhas 1019-1023); sem `cwd`, nada é buscado.
3. **Timeout gravado.** O instalador só grava timeout no SessionEnd, com 15 s
   (`render_shared.rs`, constante `CLAUDE_SESSION_END_TIMEOUT_SECS` linha 55, e função
   `with_claude_session_end_timeout` linhas 809-820). Os outros eventos saem sem o campo.
4. **Stop com resposta do assistente.** Se o JSON trouxer `last_assistant_message`, o
   `stop.sh` descarta o evento inteiro e imprime `{}`, porque o fallback por script não
   consegue sanitizar a resposta (`hooks\claude-code\stop.sh`, linhas 16-26). A captura
   completa do Stop exige instalação nativa, segundo o próprio comentário.
5. **UserPromptSubmit depende de captura de prompts.** Sem a captura ligada, o instalador
   pula esse evento (`install_hooks.rs`, linha 6600). A opção de desligar aparece em
   `docs\install.md`, linha 929 (`--no-capture-prompts`).
6. **Limites de tempo do envio.** O POST usa `curl --max-time 0.2` (`hooks\_lib.sh`,
   linhas 975-989). A busca do handoff usa `--max-time 1.0` (linhas 1027-1032).
7. **Falha com spool.** Se o POST falhar (código 000, 5xx ou 429/408/425), o evento vai
   para o spool local (`hooks\_lib.sh`, linhas 994-998), sem perda.
8. **Matcher vazio.** Os eventos são gravados em formato aninhado, com `matcher` vazio
   (comentário em `render_shared.rs`, linha 1247). Entrada sem `matcher` dispara em todas
   as ocorrências do evento (`install_hooks.rs`, linhas 240-246). Logo, o SessionStart do
   ai-memory roda em todas as origens da sessão (startup, resume, clear, compact).
   O JSON gerado não foi conferido linha a linha.
9. **Captura por variável.** Se `AI_MEMORY_CAPTURE_OWNER` estiver preenchida, o `_lib.sh`
   descarta o evento sem enviar (`hooks\_lib.sh`, linhas 952-957). O valor nunca é impresso.

---

## 2. Onde os hooks são gravados

- **Escopo de usuário (padrão):** `~/.claude/settings.json`. Se `CLAUDE_CONFIG_DIR` estiver
  definida, o arquivo é `$CLAUDE_CONFIG_DIR/settings.json`
  (`install_hooks.rs`, linhas 52-68; `docs\install.md`, linhas 457-461).
  Comando: `ai-memory install-hooks --agent claude-code --apply` (`install.md`, linha 403).
  Vale para todas as sessões do usuário, inclusive a do aulasenai.
- **Escopo de projeto:** `ai-memory install-hooks --agent claude-code --scope project --apply`
  grava `.claude/settings.local.json` na raiz do Git (`install.md`, linhas 411-417).
  - Só para Claude Code (`install.md`, linha 439; `install_hooks.rs`, linha 643).
  - Ignora `CLAUDE_CONFIG_DIR` (`install.md`, linha 465).
  - No Windows, e quando a raiz do Git é a pasta pessoal, o arquivo vai para a pasta de
    execução (`install.md`, linhas 418-420).
- **Ignorar no Git:** o arquivo local só fica fora do Git se o projeto ignorar
  `**/.claude/settings.local.json`. O instalador avisa quando não ignora
  (`install_hooks.rs`, linhas 2405-2413; `install.md`, linhas 424-425).
- **Mescla e escolha de escopo:** o Claude Code mescla os hooks do arquivo de projeto com os
  do usuário (`install.md`, linhas 421-422). O `install.md` pede um só escopo por máquina,
  e o instalador avisa quando o outro já tem hooks do ai-memory (linhas 421-423). O efeito
  exato de ter os dois é inferência, porque o texto não o descreve.
- **Backup:** ao atualizar o arquivo de projeto, o backup vai para
  `<data_dir>/backups/claude-settings-local/`, não ao lado do arquivo
  (`install.md`, linhas 427-429).
- **Reinstalar preserva o resto.** O `--apply` remove só as entradas do ai-memory e mantém
  os demais hooks (`install_hooks.rs`, linhas 2186 e 2276).
- **Plugin do Claude.** Com o plugin ai-memory ativo, os eventos já entregues por
  `install-hooks` são pulados, para não capturar em dobro (`install.md`, linhas 293-296).

---

## 3. Convivência com os hooks do aulasenai

Estado atual (`C:\fontes\aulasenai\.claude\settings.json`, linhas 22-78):

- **SessionStart:** grupo sem matcher com `scripts/claude-hooks/inicio-da-sessao.js`
  (timeout 30), e grupo com `matcher: "startup"` com `rules-local/sessao.mjs` (timeout 30).
- **PreToolUse** (Bash, Write, Edit, MultiEdit, NotebookEdit, browser) com
  `antes-da-ferramenta.js` (timeout 30).
- **PostToolUse** (Write, Edit, MultiEdit) com `depois-de-gravar.js` (timeout 30).
- **UserPromptSubmit:** `rules-local/jev/ganchos/claude-prompt.mjs` (timeout 10).

**Ordem recomendada (sugestão, não aplicada):**

- **SessionStart:** `rules-local/sessao.mjs` primeiro, porque sincroniza as regras antes de
  qualquer contexto. Depois `inicio-da-sessao.js`. O ai-memory fica no escopo de usuário.
  Hoje o `inicio-da-sessao.js` aparece antes do `sessao.mjs` no arquivo do projeto.
  Ele não tem matcher, então dispara em todas as origens; o `sessao.mjs` só em `startup`.
- **UserPromptSubmit:** Jev primeiro (timeout 10 no arquivo), depois o ai-memory. Pela
  regra global, a sugestão do Jev entra no contexto antes da resposta. O hook do ai-memory
  só envia e imprime `{}` (`REGRAS-GLOBAIS.md`, seção "Classificar mensagens (C43)").
- **Não bloquear a mensagem.** A regra do Jev diz que ele nunca bloqueia nem muda a
  mensagem (INV-2), e que nenhum erro vira `liberar` (INV-3); a falha cai em "só sinais".
  O ai-memory não bloqueia pelo `exit 0` e pelo `|| true`. O Jev tem 4 s de tempo máximo
  interno (`JEV_TEMPO_MAXIMO_MENSAGEM_MS`) e 10 s de timeout no arquivo do projeto.

**O que a documentação diz sobre ordem:** nem o `ai-memory` nem o `rules-ai` descrevem a
ordem de execução entre hooks do mesmo evento. A regra fica em "não confirmado" (seção 4).

---

## 4. Não confirmado

- **Timeout padrão do Claude Code** para hooks sem `timeout`. O instalador não grava valor.
- **Ordem de execução** entre hooks do mesmo evento e entre escopo de usuário e de projeto.
- **Aceitação do JSON** `hookSpecificOutput.additionalContext` pela versão do Claude Code
  instalada. O script diz que o formato foi escolhido para evitar o aviso de texto puro
  (`session-start.sh`, linhas 32-37), mas isso não foi testado.
- **Documentação oficial do Claude Code** (hooks e settings) não foi consultada. O repositório
  só a cita por URL (`install.md`, linha 417).
- **Variantes `.ps1`** (Windows nativo) não foram lidas linha a linha. Só confirmei que
  existem os mesmos nove eventos.
- **Scripts do aulasenai** `inicio-da-sessao.js`, `antes-da-ferramenta.js`,
  `depois-de-gravar.js` e `rules-local/jev/ganchos/claude-prompt.mjs` não foram lidos
  (fora das fontes desta subtarefa).
- **Plugin do Claude** ativo ou não nesta máquina: não verificado.
- **Captura de prompts** ligada por padrão: não confirmado pela leitura.
- **Nada foi executado:** nenhum hook, nenhum teste e nenhum navegador.

---

**Verificação (leitura):** lidos os nove scripts `.sh` e `_lib.sh`, os trechos de
`install.md` sobre Claude Code, `render_shared.rs` (linhas 36-55, 706-820, 1247, 1925-1952),
`install_hooks.rs` (linhas 52-74, 140-200, 240-246, 643, 2186-2276, 2405-2413, 6573-6651,
6600), o `settings.json` do aulasenai e a seção Jev de `REGRAS-GLOBAIS.md`. O que não foi
confirmado está na seção 4.

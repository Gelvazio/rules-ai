# 🧭 Frentes e reserva de subtarefas

Para projetos em que várias sessões ou IAs (Claude, Gemini, Grok, Copilot, Codex…) trabalham no
mesmo repositório e só se falam pelos arquivos. Quadro: `quadro-de-tarefas.md`.

## Frentes

- Cada sessão é uma **frente**: `<IA (modelo)> (<ambiente> · <branch>)` (ex.:
  `Claude Code (Opus 5.5) (local · main)`, `Gemini CLI (Flash) (nuvem · main)`).
- Cada frente atualiza **só a própria linha** em "🧭 Frentes", ao começar e ao parar. Sem
  pendência → `⏹️ Encerrada`.
- O nome da frente aparece na reserva ("Em uso por"), na linha da frente, na seção da subtarefa e na
  mensagem de commit (ex.: `feat(x): … por Claude Code (Sonnet 5.5) (local · main)`).

## Pegar uma subtarefa

1. Sincronizar com o remoto; **só então** ler o `STATUS.md` (sem sincronizar, o quadro mente).
2. Escolher uma **subtarefa** (nunca a linha da mãe) com **"Em uso por" = `—`**, **todas as
   dependências ✅** e **nível até o máximo do seu modelo** (`niveis-e-modelos.md`). Sem nível →
   classificar antes de pegar.
3. Entre as livres, a de **maior prioridade** (🔴 → 🟠 → 🟡 → 🟢); empate = ordem do quadro.
   🟢 Baixa só com orientação explícita do usuário (registrar na seção da subtarefa). Prioridade
   não fura dependência, reserva nem trava especial. Modelo forte só pega nível mais leve se não
   houver nenhuma livre do seu nível.
4. Gravar `<frente> (desde <data hora>)` em "Em uso por" e `🔄 Em execução` no Status, fazer
   **commit + push imediatos** e só então começar o trabalho.
5. Push da reserva recusado → sincronizar, **reler** o quadro; se outra frente pegou a mesma
   subtarefa, desfazer a sua reserva e escolher outra. Nunca sobrescrever a reserva de outra frente.

## Limites

- **1 subtarefa reservada por frente.** Só pega a próxima depois de entregar ou liberar a atual.
- ⛔ Nunca mexer na reserva, na linha de frente ou na seção de subtarefa de outra frente. Reserva
  "parada" não é abandonada: quem libera é **o usuário** (ou quem ele autorizar).
- **Trava especial** (`🔒 Trava especial` em "Em uso por"): ninguém pega, nem as subtarefas; só o
  usuário cria ou remove.
- Subtarefa grande demais (ou acima do seu nível) → dividir em subtarefas menores **antes** de
  começar, cada uma com linha própria, nível, prioridade (herda a da mãe, ou 🟡) e dependências.
- A prioridade é **do usuário**; a IA não muda a de tarefas existentes sem pedido.
- Scripts e rascunhos temporários na **pasta da própria sessão**, nunca em pasta compartilhada
  nem no repositório.

## Conflitos

- Conflito no `STATUS.md` ou numa etapa ao sincronizar: manter as mudanças das duas frentes (cada
  uma só mexe nas próprias linhas/seções) e reler antes de seguir.
- Arquivo **gerado** em conflito: não resolver à mão — rodar o gerador de novo depois de sincronizar.
- Recado para outra frente (ou para todas) → `tasks/RECADOS.md`; ler os recados ao começar.

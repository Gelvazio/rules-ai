# AGENTS.md

<!-- rules-ai:global -->
> 🌐 **Regras globais:** além das regras deste arquivo, valem as regras globais de
> `C:\fontes\rules-ai` (`regras/*.md`, entregues a cada IA pelo arquivo global dela). Em divergência,
> a regra deste projeto prevalece, e o usuário decide o que fazer com cada divergência
> (`rules-ai/CONFLITOS.md`). Ao finalizar uma tarefa: commit + push.

## 🔒 Uma sessão por vez (só neste projeto, C29)

- ⛔ Em `C:\fontes\rules-ai` trabalha **uma sessão de IA por vez**, de qualquer IA ou modelo
  (decisão do usuário, 2026-10-17). Agente de equipe (subagente do líder) não conta: trabalha sob a
  trava do líder.
- **Ao começar** (antes de criar, reservar ou editar qualquer coisa): ler `tasks/.sessao-ativa`.
  - Existe, é de **outra** sessão e foi atualizado há **menos de 60 min** → **não trabalhar**:
    avisar o usuário quem está na pasta (o texto do arquivo) e parar.
  - Não existe, ou passou de 60 min sem atualização → gravar nele
    `<IA (modelo)> (<frente>) desde <data hora>` e seguir; se assumiu uma trava velha, dizer ao
    usuário de quem era.
- **Durante:** regravar o arquivo (mesmo texto + ` · atualizado <data hora>`) a cada subtarefa
  reservada ou entregue.
- **Ao terminar** (junto do **TAREFA FINALIZADA E SINCRONIZADA!** ou ao parar de trabalhar):
  apagar `tasks/.sessao-ativa`.
- O arquivo fica fora do Git (`.gitignore`): a trava é local, desta pasta.

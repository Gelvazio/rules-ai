# 🗂️ Quadro de tarefas — o essencial, para qualquer projeto

Só o que **todos** os projetos já adotam. O detalhe (modelos do `STATUS.md`, reserva, níveis,
ciclo completo) fica no projeto: `.claude/rules/tasks/` — e as divergências entre projetos estão
em `CONFLITOS.md` até o usuário decidir.

- ✅ Todo pedido que **muda** algo (arquivo, banco, configuração) vira **tarefa no quadro antes de
  executar** (`tasks/STATUS.md` + etapa em `tasks/etapas/`; sem quadro: `STATUS.md` na raiz).
  Pergunta ou análise que não muda nada não vira tarefa.
- ✅ Toda tarefa-mãe tem **no mínimo 1 subtarefa**; o trabalho e a reserva são na subtarefa.
- ✅ **Pequena** (ajuste pontual até ~3 arquivos, sem banco/segurança/estrutura nova/mudança em
  massa): executar direto, registrando no quadro e commitando. **Grande** (banco, segurança,
  várias partes, geração em massa, apagar dados): plano + resumo ao usuário + **aprovação
  explícita**; mudança de escopo = nova aprovação. Na dúvida, é grande.
- ✅ Status `⬜ Pendente` · `🔄 Em progresso` · `✅ Concluído` · `⛔ Bloqueado` (com motivo) ·
  `👀 Aguardando o usuário`, atualizado **na hora**, uma subtarefa por vez; histórico nunca apagado.
- ✅ Ao iniciar ou retomar: sincronizar, ler o quadro **antes** de agir e continuar de onde parou
  (sem refazer ✅ nem pular itens).
- ✅ Reservar a subtarefa (nome da IA/frente em "Em uso por") com commit + push **antes** de
  trabalhar; ⛔ nunca mexer na reserva de outra frente.
- ✅ **Um commit por subtarefa entregue**, com o quadro no mesmo commit.
- ⭐ Planejar → aprovar → executar 1 item por vez → registrar na hora → entregar.
  **O que não está no quadro não aconteceu.**

# 🕸️ graphify — grafo de conhecimento do projeto

Decidido em 2026-10-16 (C11). Vale para todos os projetos e todas as IAs; a regra do projeto só
pode **acrescentar** (ex.: onde fica o comando), não contradizer.

- ✅ **UMA ÚNICA VEZ no início de cada conversa nova**, antes do primeiro pedido, atualizar o
  grafo do projeto ativo: comando do `AGENTS.md`/`CLAUDE.md` do projeto; sem ele,
  `C:\Python314\python.exe -m graphify update .` na raiz do projeto. Sem perguntar.
- ✅ Depois, **ler e analisar** o `graphify-out/GRAPH_REPORT.md` do projeto ativo antes de
  responder: usar o panorama (comunidades, nós principais) para responder sobre arquitetura,
  arquivos e relações; citar o arquivo de origem e dizer o que o grafo não cobre.
- ⛔ Não rodar de novo nos pedidos seguintes da mesma conversa, nem ao finalizar tarefas, nem
  depois de commits.
- Conversa já em andamento quando a regra mudou: esperar a próxima conversa.
- `graphify-out/` fica fora do Git. Se o update falhar, avisar o usuário e seguir sem o relatório.
- Perguntas triviais (sintaxe, uma linha já aberta na conversa) dispensam a análise do relatório.

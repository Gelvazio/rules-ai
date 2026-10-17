# ⚖️ Conflitos entre regras — aguardam a confirmação do usuário

Regra do usuário: **uma regra só para os dois casos**, e o que estiver em conflito **só entra
no global depois de confirmado por ele**. Enquanto não houver resposta, cada projeto segue a
própria regra e **nada daqui vai para `regras/`**.

Fontes comparadas: `aulasenai/.claude/rules/` (A), `REA-APP-CLONES/.claude/rules/` (B),
`~/.codex/AGENTS.md` (C). Responder com o número e a letra (ex.: "C1 = B").

| # | Assunto | Versão A (aulasenai) | Versão B (REA) | Confirmado |
|---|---------|----------------------|----------------|------------|
| C1 | Frase ao concluir uma tarefa | `TAREFA FINALIZADA E SINCRONIZADA!` (também no `~/.claude/CLAUDE.md`) | `TAREFA FINALIZADA!, AJUDO EM ALGO MAIS?` | ✅ A |
| C2 | Nível da subtarefa × modelo | Pega nível **até o máximo** do modelo; modelo forte desce se não houver do seu nível | Pega **só o seu nível**; modelo forte não desce (trava no `pre-commit`) | ✅ A → **✅ B** (2026-10-16 22:53, C22) |
| C3 | "Frentes" no quadro | Tabela "🧭 Frentes" com uma linha por sessão | Sem tabela: a frente é quem aparece em "Em uso por" | ✅ A |
| C4 | Tarefa concluída (✅) | Fica no `STATUS.md` | É **movida** para `tasks/task_complete.md` | ✅ B |
| C5 | Navegador | Proibido, sem exceção | Proibido, **exceto** se o usuário liberar para uma subtarefa (registrar na seção) | ✅ B |
| C6 | Commit e push (`~/.codex/AGENTS.md`) | Commit **por tarefa** concluída; push só pela regra do projeto ou quando o usuário pedir | (B igual a A) · Codex global: commit **e push a cada interação**, automático | ✅ A |
| C7 | Testes (`~/.codex/AGENTS.md`) | Nunca **escrever** testes (exceto bug); rodar só se necessário | (B igual a A) · Codex global: nunca **executar** testes, sem exceção | ✅ A |
| C8 | `git merge` (`~/.codex/AGENTS.md`) | Merge proibido em B; A: "sem merge" | Codex global ensina merge de branches e apagar `.worktrees` | ✅ A |
| C9 | Ordem ao abrir tarefa | "criar → publicar (commit + push) → assumir → trabalhar" | Abrir etapa e linhas, reservar (lock + push), depois pedir detalhes | ✅ juntar as duas: criar, publicar e assumir; pedir confirmação só se necessário |
| C10 | Texto de `quadro.md`, `ciclo-da-task.md`, `frentes-e-reserva.md` | Versão antiga do template | Versão nova do template (adiciona `task_complete.md`, trava especial, plano na etapa) | ✅ juntar A e B |

## O que já está no global (sem conflito)

`regras/quadro-de-tarefas.md` (o que A e B têm em comum), `regras/codigo-solid.md`,
`regras/codigo-limites-nomes.md` (iguais nos dois), `regras/testes-validacao.md` (versão sem
exceção de navegador, até a C5), `regras/git-geral.md` e `regras/atividades-e-idioma.md`.

## O que ficou de fora de propósito (específico de projeto)

Apostilas, matérias, seeds, RLS/JWT, RLS e banco do `aulasenai`; graphify e hooks do REA;
níveis e executores dos agentes de cada projeto.

## Decididos em 2026-10-16 (C1 a C10)

Todos aplicados em `regras/` (`ciclo-da-task.md`, `frentes-e-reserva.md`, `quadro-de-tarefas.md`,
`niveis-e-modelos.md`, `testes-validacao.md`, `git-geral.md`). No `~/.codex/AGENTS.md` foram
removidas as seções de testes, worktree/merge, commit+push automático e a frase final (C1, C6, C7,
C8); cópia em `~/.codex/AGENTS.md.bak`.

## Decididos depois (2026-10-16)

| # | Assunto | Decisão |
|---|---------|---------|
| C11 | Graphify | ✅ Rodar **uma vez no início de cada conversa** e **analisar** o `GRAPH_REPORT.md`; regra em `regras/graphify.md`. `~/.claude/CLAUDE.md` (cópia `.bak2`) e `~/.codex/AGENTS.md` ajustados · **Substituída pela C25 (2026-10-17).** |
| C12 | Regras dos projetos × globais | ✅ Alinhar. **Executado em 2026-10-16** por Claude Code (Sonnet 5.5) com `IA_SEM_TRAVA=1` a pedido do usuário: REA `ALINHAR.1` a `.5` (aceite `.6` pendente) e aulasenai `#202.1` a `#202.4` (aceite `#202.5` pendente) |
| C13 | Push ao finalizar tarefa (substitui a parte de push da C6) | ✅ Em **todos os projetos e IAs**, ao finalizar uma tarefa: commit **e push** na branch principal, sem esperar pedido. Só deixa de valer com "só commit, sem push" do usuário ou "sem push" expresso no projeto. Pedido do usuário em 2026-10-16; regra em `regras/git-geral.md` |
| C20 | Pasta `DEMAIS-PROJETOS-DE-SISTEMAS-MANTER-OFFLINE` | ✅ Nunca ler de início; só quando o usuário pedir ou a tarefa for dentro dela; regra em `regras/pastas-ignoradas.md` |
| C23 | Pasta `DEMAIS-PROJETOS-NAO-MEXER-AGORA` | ✅ Projetos parados por tempo indeterminado: nada dela é lido nas sessões; só quando o usuário pedir o projeto pelo nome ou caminho. Pedido do usuário em 2026-10-17; regra em `regras/pastas-ignoradas.md` |
| C24 | Gatilho `;` | ✅ Mensagem só com `;` = pegar a próxima subtarefa livre do **seu** modelo; regra em `regras/frentes-e-reserva.md`. Pedido do usuário em 2026-10-17 |
| C22 | Nunca executar tarefa de outro modelo (substitui a C2 = A) | ✅ Cada IA só pega o **seu** nível, nem acima nem abaixo, **sem exceção** (acabam as autorizações de nível); coluna **Modelo** obrigatória no quadro (`LEVE · só Haiku`…) e linha `- **Modelo:**` em cada subtarefa. Pedido do usuário em 2026-10-16 22:48 (aulasenai #247); regras em `niveis-e-modelos.md`, `frentes-e-reserva.md`, `ciclo-da-task.md`, `quadro-de-tarefas.md` |
| C21 | Esforço (`effort`) dos agentes | ✅ Global: `LEVE`=`low`, `MEDIO`=`medium`, `PESADO`=`high`, no frontmatter dos agentes; regra em `regras/esforco.md`; conferência por modelo na `CONFEFFORT-GLOBAL` |
| C25 | Graphify: ler antes de criar/executar tarefa e atualizar ao fim (substitui a C11) | ✅ Ler o `GRAPH_REPORT.md` antes de criar e antes de executar cada tarefa; `graphify update .` no início da conversa e ao fim de cada tarefa concluída e retirada do quadro. Pedido do usuário em 2026-10-17; regra em `regras/graphify.md` |
| C26 | IA cria subtarefas no caminho | ✅ Só **subtarefas dentro da mãe atual** (nunca mãe nova), com nível, modelo e `effort`, publicadas direto (commit + push, sem aprovação); não reserva a nova; na equipe do Claude Code quem cria é o líder. Pedido do usuário em 2026-10-17; regra em `regras/ciclo-da-task.md` |
| C27 | Exibição de status | ✅ Todo status (tarefas, frentes, pendências, conferências) é mostrado em **quadro** (tabela), no terminal e no chat do IDE, com o emoji da legenda; nunca em texto corrido ou lista solta. Pedido do usuário em 2026-10-17; regra em `regras/exibicao-de-status.md` · **Ampliada em 2026-10-17:** coluna Tarefa (ID) em todo quadro que fala de tarefa e linha da mãe junto das subtarefas (STATUS-QUADRO-GLOBAL.3) |
| C28 | Gerenciador centralizado de tarefas | ✅ Regra em `regras/gerenciador-centralizado.md`: modo `ver` por padrão; `disparar` só com ordem explícita do usuário (**em pausa**, decisão de 13:30); quando ligado, só Haiku e Sonnet, ciclo de 30 s, 1 sessão por modelo. **Ordem vigente:** pausa (pedido do usuário em 13:30); o automático só para Haiku e Sonnet (16:12) fica para reativação. Pedido do usuário em 2026-10-17; etapa 009 |
| C29 | Sessões na mesma pasta (`rules-ai`, `gerenciador-de-ia`) | ✅ **No `rules-ai` e no `gerenciador-de-ia`:** uma sessão de IA por vez, com a trava local `tasks/.sessao-ativa` (fora do Git); regra no `AGENTS.md` do `rules-ai` e na seção 10 do `CLAUDE.md` do `gerenciador-de-ia`. Pedido do usuário em 2026-10-17 |

## Pendente de decisão

| # | Assunto | Regra global | Regra do projeto | Situação |
|---|---------|--------------|------------------|----------|
| C14 | `plataforma-ia`: graphify e commit | Global: graphify 1x por conversa; commit por tarefa | Projeto: ler o relatório e rodar `graphify update` a cada alteração; commit automático após cada alteração | ⏳ usuário decide |
| C15 | `gelvazio.github.io` e `PROJETO-CANIL-DOCE-LAR`: commit | Global: 1 commit + push por tarefa finalizada | Projeto: commit + push após QUALQUER alteração (gelvazio.github.io também roda graphify a cada alteração) | ⏳ usuário decide |
| C16 | `controlemercadoria` e `c3tecnologia-site`: graphify | Global: 1x no início da conversa; nunca após modificar arquivos | Projeto: `graphify update` após modificar código | ⏳ usuário decide |
| C17 | `PROJETO-EMAIL-SENAI`: graphify | Global: no projeto ativo | Projeto: só na raiz antiga `C:ontesulas-senai` | ⏳ usuário decide |
| C18 | `ANALISE-PLATAFORMAS-DE-IA` linha 51 | Global: nunca abrir navegador | Projeto: "Abrir no navegador para visualizar os dados" | ⏳ usuário decide |
| C19 | `dashboard-ai-*`: quadro e travas | Global: `tasks/STATUS.md` + reserva | Projeto: `task-principal.md`, lock com commit + push, hooks `pre-push`/`pre-merge-commit` | ⏳ usuário decide |



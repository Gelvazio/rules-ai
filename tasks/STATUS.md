# STATUS — rules-ai

**Objetivo:** regras de IA globais, para todos os projetos de `C:\fontes` e todas as IAs.
**Partes interessadas:** Gelvazio (decide e confirma conflitos) · IAs executam.
**Links:** [Regras](../regras/) · [Conflitos](../CONFLITOS.md) · [Etapas](etapas/) · [Concluídas](task_complete.md)

Legenda: ⬜ Pendente · 🔄 Em progresso · ✅ Concluído · ⛔ Bloqueado · 👀 Aguardando o usuário

## 📌 Tarefas

| Tarefa | Título | Prioridade | Modelo | Depende de | Status | Em uso por | Etapa |
|---|---|---|---|---|---|---|---|
| EFFORT-PADARIA | **🌐 GLOBAL — Testar `low`/`medium`/`high` em todos os modelos com o projeto da padaria** | 🟠 Alta | — | Nenhuma | 🔄 Em execução | — (não reservável) | [ETAPA-003](etapas/ETAPA-003-EFFORT-PADARIA.md) |
| EFFORT-PADARIA.6 | 🌐 Gemini Pro: 3 níveis de raciocínio | 🟠 Alta | MEDIO · só Gemini CLI · effort medium | EFFORT-PADARIA.2 | ⬜ Pendente | — | [ETAPA-003](etapas/ETAPA-003-EFFORT-PADARIA.md) |
| EFFORT-PADARIA.7 | 🌐 DeepSeek (raciocínio): 3 níveis | 🟠 Alta | MEDIO · só DeepSeek · effort medium | EFFORT-PADARIA.2 | ⬜ Pendente | — | [ETAPA-003](etapas/ETAPA-003-EFFORT-PADARIA.md) |
| ESFORCO-GLOBAL | **🌐 GLOBAL — Esforço (`effort`) por nível, para todos os projetos e IAs** | 🟡 Média | — | Nenhuma | 🔄 Em execução | — (não reservável) | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| ESFORCO-GLOBAL.5 | 🌐 Aceite do usuário | 🟠 Alta | Usuário · effort low | ESFORCO-GLOBAL.4 | 👀 Aguardando o usuário | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| ESFORCO-GLOBAL.1 | 🌐 Regra global `regras/esforco.md` | 🟡 Média | LEVE | Nenhuma | ✅ Concluído | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| CONFEFFORT-GLOBAL | **🌐 GLOBAL — Conferir o `effort` em cada modelo (todos os projetos e IAs)** | 🟡 Média | — | Nenhuma | 🔄 Em execução | — (não reservável) | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| CONFEFFORT-GLOBAL.1 | 🌐 Haiku 5.5: conferir o `effort` | 🟡 Média | LEVE · só Haiku 5.5 · effort low | Nenhuma | ⬜ Pendente | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| CONFEFFORT-GLOBAL.4 | 🌐 Gemini Pro: conferir o esforço | 🟡 Média | MEDIO · só Gemini Pro · effort medium | Nenhuma | ⬜ Pendente | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| CONFEFFORT-GLOBAL.5 | 🌐 DeepSeek (raciocínio): conferir o esforço | 🟡 Média | MEDIO · só DeepSeek · effort medium | Nenhuma | ⬜ Pendente | — | [ETAPA-002](etapas/ETAPA-002-ESFORCO-GLOBAL.md) |
| MODELO-GLOBAL | **🌐 GLOBAL — Nunca executar tarefa que não é do seu modelo (C22)** | 🟡 Média | — | Nenhuma | 🔄 Em execução | — (não reservável) | [ETAPA-004](etapas/ETAPA-004-MODELO-GLOBAL.md) |
| MODELO-GLOBAL.2 | 🌐 Levar aos outros projetos (`sincronizar.mjs --aplicar`) | 🟡 Média | Usuário | MODELO-GLOBAL.1 | 👀 Aguardando o usuário | — | [ETAPA-004](etapas/ETAPA-004-MODELO-GLOBAL.md) |
| **GERENCIADOR-GLOBAL** | **🌐 GLOBAL — Gerenciador centralizado que chama as tarefas livres de cada modelo (plano aprovado)** | 🟡 Média | — | Nenhuma | 🔄 Em execução | — (não reservável) | [ETAPA-009](etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md) |
| GERENCIADOR-GLOBAL.3 | 🌐 Script central: leitura dos quadros e tarefas livres por modelo (sem disparar) · `PESADO · effort high` | 🟡 Média | PESADO · só Opus 5.5+ ou Fable | GERENCIADOR-GLOBAL.1 | ⬜ Pendente | — | [ETAPA-009](etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md) |
| GERENCIADOR-GLOBAL.4 | 🌐 Disparo de sessões por modelo, com limite, trava e `PARAR` · `PESADO · effort high` | 🟡 Média | PESADO · só Opus 5.5+ ou Fable | GERENCIADOR-GLOBAL.3 | ⛔ Bloqueado (automático em pausa pelo usuário, 2026-10-17 13:30) | — | [ETAPA-009](etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md) |
| GERENCIADOR-GLOBAL.5 | 🌐 Vigilância periódica (agendador ou loop no intervalo aprovado) · `MEDIO · effort medium` | 🟡 Média | MEDIO · só Sonnet | GERENCIADOR-GLOBAL.4 | ⬜ Pendente | — | [ETAPA-009](etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md) |
| GERENCIADOR-GLOBAL.6 | 🌐 Aceite do usuário | 🟠 Alta | Usuário | GERENCIADOR-GLOBAL.5 | ⬜ Pendente | — | [ETAPA-009](etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md) |
| GERENCIADOR-GLOBAL.7 | 🌐 Mesclar o `gerenciador-de-tarefas` ao central e revisar o desenho da .1 com as respostas de 16:12 · `PESADO · effort high` | 🟠 Alta | PESADO · só Opus 5.5+ ou Fable | GERENCIADOR-GLOBAL.1 | ⬜ Pendente | — | [ETAPA-009](etapas/ETAPA-009-a0c1d676-GERENCIADOR-GLOBAL.md) |
| **DASHBOARD-REDE-NEURAL** | **Pasta `dashboard/`: visualização 3D das camadas de uma rede neural (Three.js) (plano aprovado)** | 🟡 Média | — | Nenhuma | 🔄 Em execução | — (não reservável) | [ETAPA-013](etapas/ETAPA-013-1b79ba45-DASHBOARD-REDE-NEURAL.md) |
| DASHBOARD-REDE-NEURAL.3 | Cena 3D com propagação animada e clique | 🟡 Média | PESADO · só Opus 5.5+ ou Fable · effort high | DASHBOARD-REDE-NEURAL.2 | 🔄 Em execução | Claude Code (Opus 5.5) (local · main) (desde 2026-10-17 17:24) | [ETAPA-013](etapas/ETAPA-013-1b79ba45-DASHBOARD-REDE-NEURAL.md) |
| DASHBOARD-REDE-NEURAL.4 | Painel 2D: cálculo do neurônio, entradas e probabilidades | 🟡 Média | MEDIO · só Sonnet · effort medium | DASHBOARD-REDE-NEURAL.3 | ⬜ Pendente | — | [ETAPA-013](etapas/ETAPA-013-1b79ba45-DASHBOARD-REDE-NEURAL.md) |
| DASHBOARD-REDE-NEURAL.5 | Aceite do usuário | 🟡 Média | Usuário · effort low | DASHBOARD-REDE-NEURAL.4 | ⬜ Pendente | — | [ETAPA-013](etapas/ETAPA-013-1b79ba45-DASHBOARD-REDE-NEURAL.md) |
| DASHBOARD-REDE-NEURAL.6 | Coletor Python dos links do `dashboard/CLAUDE.md` (`dashboard/scripts/`) | 🟡 Média | MEDIO · effort medium | Nenhuma | ✅ Concluído | — | [ETAPA-013](etapas/ETAPA-013-1b79ba45-DASHBOARD-REDE-NEURAL.md) |
| DASHBOARD-REDE-NEURAL.7 | Aba "Ferramentas de IA 3D" no `dashboard/index.html` com os dados do `coleta.json` e dos reels de `MODELOS-DE-IA` | 🟡 Média | MEDIO · effort medium | DASHBOARD-REDE-NEURAL.6 | ✅ Concluído | — | [ETAPA-013](etapas/ETAPA-013-1b79ba45-DASHBOARD-REDE-NEURAL.md) |
| DASHBOARD-REDE-NEURAL.8 | Menu "3D GRAPHS AI" → `dashboard/graphs/`: visualizador de modelos 3D gerados por IA (API Tripo, texto → 3D) | 🟡 Média | PESADO · effort high | DASHBOARD-REDE-NEURAL.7 | ✅ Concluído | — | [ETAPA-013](etapas/ETAPA-013-1b79ba45-DASHBOARD-REDE-NEURAL.md) |
| DASHBOARD-REDE-NEURAL.9 | Ícone de configuração no 3D GRAPHS AI: modal para a chave da Tripo salva no `localStorage` | 🟡 Média | MEDIO · effort medium | DASHBOARD-REDE-NEURAL.8 | ✅ Concluído | — | [ETAPA-013](etapas/ETAPA-013-1b79ba45-DASHBOARD-REDE-NEURAL.md) |
| DASHBOARD-REDE-NEURAL.10 | Pasta `dashboard/prompts/` | 🟢 Baixa | LEVE · effort low | Nenhuma | ✅ Concluído | — | [ETAPA-013](etapas/ETAPA-013-1b79ba45-DASHBOARD-REDE-NEURAL.md) |
| DASHBOARD-REDE-NEURAL.11 | Um prompt `.md` por imagem em `dashboard/prompts/` (MODELO-3D-REDE-NEURAL-01 a 04) | 🟢 Baixa | MEDIO · effort medium | DASHBOARD-REDE-NEURAL.10 | ✅ Concluído | — | [ETAPA-013](etapas/ETAPA-013-1b79ba45-DASHBOARD-REDE-NEURAL.md) |
| DASHBOARD-REDE-NEURAL.12 | Prompts de `dashboard/prompts/` independentes (nenhum cita outro prompt ou imagem) | 🟢 Baixa | LEVE · effort low | DASHBOARD-REDE-NEURAL.11 | ✅ Concluído | — | [ETAPA-013](etapas/ETAPA-013-1b79ba45-DASHBOARD-REDE-NEURAL.md) |
| DASHBOARD-REDE-NEURAL.13 | `dashboard/graphs/TRIPO_AI_DOCS.md`: guia da API e dos SDKs da Tripo (lido de developers.tripo3d.ai) | 🟢 Baixa | MEDIO · effort medium | DASHBOARD-REDE-NEURAL.8 | ✅ Concluído | — | [ETAPA-013](etapas/ETAPA-013-1b79ba45-DASHBOARD-REDE-NEURAL.md) |
| DASHBOARD-REDE-NEURAL.14 | 3D GRAPHS AI: usar o prompt `MODELO-3D-REDE-NEURAL-04.md` com a API da Tripo (objetos 3D gerados + cena 3D animada do infográfico) · **plano, aguarda o "sim"** | 🟡 Média | PESADO · só Opus 5.5+ ou Fable · effort high | DASHBOARD-REDE-NEURAL.9, DASHBOARD-REDE-NEURAL.13 | 👀 Aguardando o usuário | — | [ETAPA-013](etapas/ETAPA-013-1b79ba45-DASHBOARD-REDE-NEURAL.md) |

## Registro de decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-17 16:39 | DASHBOARD-REDE-NEURAL.14 criada (C26) só com o plano: o prompt 04 descreve uma página, e a Tripo gera um objeto por vez; o plano extrai os objetos 3D do prompt, gera cada um e monta a cena animada no 3D GRAPHS AI. Execução depende do "sim" (gasta créditos) | Gelvazio | "como eu faço pra usa os prompts da pasta prompt, com esta api, no projeto atual 3D graphs AI, crie 1 tarefa pra isso, para o prompt 04" |
| 2026-10-17 16:38 | DASHBOARD-REDE-NEURAL.13 (C26): guia `dashboard/graphs/TRIPO_AI_DOCS.md` da API V3 e dos 5 SDKs; registra que o dashboard usa a V2 e como migrar | Gelvazio | "leia o site https://developers.tripo3d.ai/pt/docs/sdk e crie um documento de nome TRIPO_AI_DOCS.md" |
| 2026-10-17 16:34 | DASHBOARD-REDE-NEURAL.12 (C26): cada prompt de `dashboard/prompts/` é independente; o 04 foi reescrito inteiro (infográfico + animação) e o 02 não cita mais o 04 | Gelvazio | "cada prompt deve ser unico, e nao referenciar os outros" |
| 2026-10-17 16:31 | DASHBOARD-REDE-NEURAL.11 (C26): um prompt `.md` por imagem em `dashboard/prompts/`, com nomes genéricos e dados fictícios no lugar das marcas e ganhos dos reels | Gelvazio | "CRIE 1 prompt pra cada imagem nela, com o nome da imagem .md no prompt" |
| 2026-10-17 16:21 | DASHBOARD-REDE-NEURAL.10 (C26): pasta `dashboard/prompts/` criada com README | Gelvazio | "crie 1 nova pasta de nome prompts" → "rules-ai/dashboard/prompts" |
| 2026-10-17 16:16 | DASHBOARD-REDE-NEURAL.9 criada (C26): chave da Tripo no `localStorage` via modal; o servidor local recebe a chave no cabeçalho `X-Tripo-Key` e usa o `.env` como alternativa | Gelvazio | "e um icone de config, que abre um modal pra colocar a chave de api e salvar no localstorage, no menu 3D graphs ai" |
| 2026-10-17 15:50 | DASHBOARD-REDE-NEURAL.8 criada (C26): pasta `dashboard/graphs/` com a API mais barata (Tripo, US$ 0,10–0,20 por modelo); sem chave por enquanto, só texto → 3D, menu abre na mesma aba | Gelvazio | "crie 1 menu de nome 3D GRAPHS AI..." + respostas: "faça sem ela", "só texto → 3D", "na mesma aba" |
| 2026-10-17 15:37 | DASHBOARD-REDE-NEURAL.7 criada (C26): aba nova no `index.html` com os dados coletados; a aba da rede neural fica intacta | Gelvazio | "leia coleta.json e atualize o dashboard em index.html com as informacoes, e use tambem as informacoes do instagram em MODELOS-DE-IA" |
| 2026-10-17 15:03 | DASHBOARD-REDE-NEURAL.6 criada (C26): coletor Python dos links L04–L10 em `dashboard/scripts/`, executado pelo Opus 5.5 a pedido | Gelvazio | "crie 1 pasta scripts nele crie e rode o app em python que coleta os dados dos sites solicitados" |
| 2026-10-17 17:21 | DASHBOARD-REDE-NEURAL: plano da etapa 013 aprovado; execução pelo líder Opus 5.5 com agentes por nível | Gelvazio | "sim, aprovo o plano da DASHBOARD-REDE-NEURAL (etapa 013)" |
| 2026-10-17 | Mensagem só com `.` = listar as tarefas pendentes, sem começar nenhuma (C30) | Gelvazio | "sim, registre o . como regra global" |
| 2026-10-17 | GERENCIADOR-GLOBAL: `dashboard-ai-*` entram; **disparo automático em pausa** (só ler e avisar); conflito de pasta única vira a tarefa `PASTA-UNICA-GLOBAL` | Gelvazio | "dashboard-ai-*  ja voltou;nao faca nenhum disparo automatico,deixe em pausa isso de automatico por enquanto;abra uma nova tarefa pra resolver conflitos de rules-ai e gerenciador-de-ia" |
| 2026-10-17 13:34 | GERENCIADOR-GLOBAL.2 entregue (C28, `regras/gerenciador-centralizado.md`); o disparo automático fica condicionado a ordem explícita do usuário, a ordem vigente é a pausa de 13:30 (pedido do usuário); o automático de 16:12 fica para reativação | Claude Code (Haiku 5.5) | Pausa vigente (pedido do usuário) |
| 2026-10-17 16:14 | Usuário confirmou que valem as respostas de 16:12; abre a GERENCIADOR-GLOBAL.8 (Opus) só para conferir contra o plano de 13:01 | Gelvazio | "vale as regras daqui, abra uma sub-task em GERENCIADOR-GLOBAL nova so pra conferir isso e atribua ao CLAUDE OPUS" |
| 2026-10-17 16:12 | GERENCIADOR-GLOBAL: respostas do usuário registradas na etapa 009 (projetos, disparo automático só Haiku e Sonnet, ciclo de 30 s, só Claude Code, mesclagem com o `gerenciador-de-tarefas` atribuída ao Opus via .7); revogam o plano de 13:01 nos pontos que divergem | Gelvazio | "1-aulasenai,gerenciador-de-ia,dashboasr-ai-*,aulasenai-*,rules-ai;2-automatico para Haiku e Sonnet;3-a cada 30 segundos...;4-so claude;5-mescla as regras, atribua ao claude opus" |
| 2026-10-17 | Todo status é mostrado em quadro (tabela), em todas as IAs, no terminal e no IDE (C27) | Gelvazio | "todos os staus devem sempre ser mostrados em forma de quadro aqui no cmd ou no claude code IDE" |
| 2026-10-17 15:55 | GERENCIADOR-GLOBAL registrada como tarefa grande (plano na etapa 009); execução só depois do "sim" do usuário às perguntas da etapa | Claude Code (Haiku 5.5) | Estrutura nova e disparo automático de sessões |
| 2026-10-17 | IA pode criar subtarefas **só dentro da mãe atual** e publica direto, sem aprovação (C26) | Gelvazio | "1-SOMENTE SUBTAREFAS DENTRO DA MAE ATUAL;2-PUBLICA DIRETO A TAREFA" |
| 2026-10-17 | Graphify: ler o `GRAPH_REPORT.md` antes de criar e antes de executar tarefa; `graphify update .` ao fim de cada tarefa concluída e retirada do quadro (C25, substitui a C11); a IA roda o `--aplicar` | Gelvazio | "ajuste a regra global de graphify.md, pra sempre ler o graph_report.md antes de executar 1 tarefa e antes de criar 1 tarefa... sincronize as regras globais" |
| 2026-10-17 | Gatilho `;` (pegar a próxima tarefa do seu modelo) vira regra global C24, e o usuário autoriza a IA a rodar o `--aplicar` nesta tarefa | Gelvazio | "este ;, é um gatilho pra *Pegue a proxima tarefa disponivel para seu modelo*, anote esta regra em rules-ai, global... e rode o sincronizador de regras globais" |
| 2026-10-16 | Escopo: todos os projetos de `C:\fontes`; um conflito entre regras = **uma** regra para todos, confirmada pelo usuário | Gelvazio | "1 REGRA PARA OS DOIS CASOS, ME PERGUNTE SOBRE ESTES CASOS" |
| 2026-10-16 | Repositório das regras globais: `C:\fontes\rules-ai`; sem branch (tudo na `main`) | Gelvazio | "USE ESTE REPO AQUI" |
| 2026-10-16 | Tarefa executada por Claude Code (Sonnet 5.5) mesmo sendo de nível PESADO | Gelvazio | "ja assuma e faça esta tarefa, sem perguntas" |
| 2026-10-16 | Tarefa GLOBAL aceita e fechada (GLOBAL.1 a GLOBAL.8 entregues; Cursor e DeepSeek sem arquivo global) | Gelvazio | "sim" ao pedido de aceite |

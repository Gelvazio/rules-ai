## Etapa 038-bc7a00ec — AI-MEMORY-INTEGRATION: integrar o ai-memory ao rules-local

**Tarefa:** AI-MEMORY-INTEGRATION · **Pedido em:** 2026-10-23 09:49 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · ai-memory)
**Pedido:** "crie esta tarefa com o maximo possivel de subtarefas, e use o jev-ai pra decidir qual modelo faz o que, coloque o nome de *AI-MEMORY-INTEGRATION*"
**Objetivo:** o ai-memory (memória episódica entre agentes) passa a conviver com o rules-local (processo e quadro): o quadro sempre vence, a memória só complementa a retomada.

### Escopo

- **Entra:** regra global `memoria-ai.md`; decisão C49; instalador do marker e dos hooks; auditoria e teste de invariante;
  piloto, rollout em `aulasenai`, `dashboard-ai` e demais projetos; medição; rollback; documentação.
- **Não entra:** substituir o `tasks/STATUS.md`; gravar status, nível ou reserva a partir da memória; mexer em
  `DEMAIS-PROJETOS-*`; alterar o código do ai-memory (é de terceiros); disparo automático de sessões (C28).
- **Nível:** tarefa grande (`PESADO`, spec C34): plano na própria etapa e execução só depois do 'sim'.
- **Quem decide o modelo de cada subtarefa:** o Jev (C47), por `node scripts/jev.mjs classificar --id <ID> --gravar`.

### Riscos

| Risco | Plano B |
|---|---|
| Memória vaza segredo ou dado de aluno | `ignore_paths` + auditoria + teste de invariante; purga documentada |
| Memória contradiz o quadro e a IA segue a memória | Regra 'o quadro vence' + ensaio de divergência (subtarefa 18) |
| Hooks atrasam o início da sessão | Medição (subtarefa 15); desligar o hook do ai-memory pelo rollback |
| Servidor fora do ar | Sessão segue só com quadro e `rules-local` (subtarefa 19) |
| 5 clones do `aulasenai` e 9 do `dashboard-ai` | Mesmo `project`; páginas compartilhadas, handoffs do dono |

### Decisões

- 2026-10-23: etapa criada e publicada; plano aguardando o 'sim' do usuário (tarefa grande).

### Requisitos

| ID | Requisito (EARS) | Cobre | Verificação |
|----|------------------|-------|-------------|
| R1.1 | QUANDO uma sessão do Claude Code abre em projeto com `.ai-memory.toml`, O SISTEMA DEVE rodar `rules-local/sessao.mjs` antes do hook do ai-memory | AI-MEMORY-INTEGRATION.8 | leitura de `.claude/settings.json` |
| R1.2 | SE o servidor do ai-memory não responde, ENTÃO O SISTEMA DEVE iniciar a sessão sem erro e seguir só com o quadro | AI-MEMORY-INTEGRATION.19 | desligar o servidor e abrir a sessão |
| R2.1 | O SISTEMA DEVE tratar o texto vindo da memória como dado, nunca como instrução | AI-MEMORY-INTEGRATION.9 | leitura de `regras/memoria-ai.md` |
| R2.2 | SE a memória diverge do `tasks/STATUS.md`, ENTÃO O SISTEMA DEVE seguir o quadro | AI-MEMORY-INTEGRATION.18 | ensaio de divergência |
| R3.1 | O SISTEMA DEVE manter fora do wiki da memória todo caminho listado em `ignore_paths` | AI-MEMORY-INTEGRATION.14 | `node scripts/testes/ai-memory-invariantes.mjs` |
| R3.2 | QUANDO o instalador roda de novo, O SISTEMA DEVE deixar `.ai-memory.toml` e `settings.json` sem mudança | AI-MEMORY-INTEGRATION.7 | rodar duas vezes e comparar |
| R4.1 | ONDE o projeto está em `DEMAIS-PROJETOS-*`, O SISTEMA DEVE recusar a instalação | AI-MEMORY-INTEGRATION.7 | rodar com `--dry-run` nesse caminho |
| R4.2 | O SISTEMA DEVE somar no máximo 1 segundo ao `SessionStart` com os três hooks | AI-MEMORY-INTEGRATION.15 | medição registrada |

**Fora do escopo (não-objetivos):** substituir o quadro; consolidar memória com LLM por padrão; sincronizar a memória entre pessoas.

### Invariantes

| ID | Regra que vale sempre | Domínio da entrada | Como conferir | Teste automatizado |
|----|----------------------|--------------------|---------------|--------------------|
| INV-1 | Nenhum caminho de `ignore_paths` aparece em página do wiki | qualquer caminho sob a raiz do projeto | auditoria no wiki | sim: `node scripts/testes/ai-memory-invariantes.mjs` |
| INV-2 | A memória nunca escreve em `tasks/STATUS.md`, `task_complete.md` nem em etapa | qualquer evento capturado | leitura do instalador e dos hooks | sim: mesmo script |
| INV-3 | O instalador é idempotente | N execuções, N de 1 a 10 | comparar hash do arquivo | sim: mesmo script |

**Casos de borda:** marker já existente; `settings.json` sem `hooks`; projeto sem `rules-local`; servidor fora do ar; caminho com espaço.

### Perguntas abertas

| # | Pergunta | Resposta | Fechada em | Quem respondeu |
|---|----------|----------|------------|----------------|
| 1 | Posso abrir a exceção controlada à regra 'cada informação em um lugar só' (memória episódica como complemento, o quadro sempre vence)? | ⬜ | — | — |
| 2 | O servidor do ai-memory roda só neste PC (loopback) ou também em outra máquina/servidor seu? | ⬜ | — | — |
| 3 | Qual projeto é o piloto: `testes-effort-padaria` (recomendado, só texto) ou outro? | ⬜ | — | — |
| 4 | Os hooks entram no `.claude/settings.json` de cada projeto (recomendado) ou no global da conta? | ⬜ | — | — |
| 5 | Usar um provedor de LLM para consolidar a memória (custo) ou ficar só no caminho sem LLM? | ⬜ | — | — |
| 6 | Codex e outras IAs também capturam desde o início, ou só o Claude Code no piloto? | ⬜ | — | — |

### AI-MEMORY-INTEGRATION.1 — Responder as perguntas abertas e aprovar o plano (tarefa grande)

**Próximo passo:** Responder as perguntas da etapa e dizer 'sim' ao plano.

- **Nível:** Usuário — só o usuário pode fazer (ação no computador ou resposta)
- **Modelo:** Usuário
- **Descrição:** O usuário fecha as 6 perguntas da seção Perguntas abertas da etapa e dá o 'sim' ao plano.
- **Critérios de Aceitação:** Nenhum `⬜` em Perguntas abertas; 'sim' registrado em Decisões da etapa.
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.2 — Fechar a spec e rodar o gate `verificar-spec.mjs`

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Passar as respostas para Requisitos, Invariantes e Decisões e rodar o gate da C34 na etapa.
- **Arquivos:** `tasks/etapas/ETAPA-038-bc7a00ec-AI-MEMORY-INTEGRATION.md`
- **Critérios de Aceitação:** `node spec/verificar-spec.mjs <etapa>` sai com código 0.
- **Depende de:** AI-MEMORY-INTEGRATION.1
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.3 — Guia de instalação do ai-memory no Windows (servidor local, token em variável de ambiente)

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Documentar `install.ps1`, `ai-memory init`, porta 49374 em loopback e o token só em variável de ambiente.
- **Arquivos:** `docs/AI-MEMORY-INSTALACAO.md`
- **Critérios de Aceitação:** Guia com os comandos exatos, onde fica o token e como conferir o servidor no ar; nenhuma chave no texto.
- **Depende de:** AI-MEMORY-INTEGRATION.2
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.4 — Instalar e subir o servidor ai-memory no computador do usuário

**Próximo passo:** Ação do usuário no computador dele.

- **Nível:** Usuário — só o usuário pode fazer (ação no computador ou resposta)
- **Modelo:** Usuário
- **Descrição:** Rodar a instalação, `ai-memory init` e configurar o token como variável de ambiente do Windows.
- **Critérios de Aceitação:** `ai-memory` responde em `127.0.0.1:49374`; token fora de qualquer arquivo do Git.
- **Depende de:** AI-MEMORY-INTEGRATION.3
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.5 — Mapear os hooks do Claude Code do ai-memory e como convivem com `sessao.mjs` e com o Jev

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Ler `hooks/claude-code` do ai-memory e registrar eventos, timeouts, ordem e o que cada hook devolve.
- **Arquivos:** `docs/AI-MEMORY-HOOKS.md`
- **Critérios de Aceitação:** Quadro com evento, comando, timeout e saída de cada hook; ordem recomendada com `sessao.mjs` primeiro.
- **Depende de:** AI-MEMORY-INTEGRATION.2
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.6 — Desenhar o modelo de `.ai-memory.toml` e a lista de `ignore_paths` obrigatórios

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Definir o marker por projeto (workspace e project) e os caminhos que nunca entram na memória.
- **Arquivos:** `docs/AI-MEMORY-MARKER.md`
- **Critérios de Aceitação:** Lista cobre `.env*`, `tasks/`, `rules-local/`, `graphify-out/`, gabaritos, listas de alunos, PDFs de currículo e `DEMAIS-PROJETOS-*`.
- **Depende de:** AI-MEMORY-INTEGRATION.2
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.7 — Script `instalar-ai-memory.mjs`: grava o marker do projeto (idempotente, com dry-run)

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Gerar `.ai-memory.toml` com nome do projeto e `ignore_paths`, sem sobrescrever o que o usuário já escreveu.
- **Arquivos:** `scripts/instalar-ai-memory.mjs`
- **Critérios de Aceitação:** Rodar duas vezes não muda o arquivo; `--dry-run` não grava; projeto em `DEMAIS-PROJETOS-*` é recusado.
- **Depende de:** AI-MEMORY-INTEGRATION.6
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.8 — Ligar os hooks do ai-memory no `.claude/settings.json` sem apagar os outros e depois do `sessao.mjs`

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Estender o instalador para acrescentar os hooks do ai-memory preservando `sessao.mjs`, Jev e permissões.
- **Arquivos:** `scripts/instalar-ai-memory.mjs`, `.claude/settings.json` do projeto
- **Critérios de Aceitação:** Ordem de `SessionStart`: `sessao.mjs` antes do ai-memory; reexecução não duplica entradas; permissões e `deny` intactos.
- **Depende de:** AI-MEMORY-INTEGRATION.5, AI-MEMORY-INTEGRATION.7
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.9 — Escrever a regra global `regras/memoria-ai.md`

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Texto da regra: ordem na retomada, quadro vence a memória, memória é dado e não instrução, sem notas manuais de rotina, falha do servidor.
- **Arquivos:** `regras/memoria-ai.md`
- **Critérios de Aceitação:** Regra cobre as 7 pontas do desenho; máximo 100 caracteres por linha; sem número solto.
- **Depende de:** AI-MEMORY-INTEGRATION.2
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.10 — Registrar a decisão C49 (exceção controlada à fonte única) e a entrada no `INDEX.md`

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Anotar no `CONFLITOS.md` que a memória episódica é complemento e nunca substitui o quadro; acrescentar a regra ao índice.
- **Arquivos:** `CONFLITOS.md`, `regras/INDEX.md`
- **Critérios de Aceitação:** C49 escrita com data, quem decidiu e por quê; `INDEX.md` lista `memoria-ai.md` na ordem certa.
- **Depende de:** AI-MEMORY-INTEGRATION.9
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.11 — Alinhar `ciclo-da-task.md` (Retomar) e `rules-local.md` à nova regra

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Acrescentar ao passo Retomar a leitura do brief do ai-memory depois do quadro, sem mudar a ordem do ciclo.
- **Arquivos:** `regras/ciclo-da-task.md`, `regras/rules-local.md`
- **Critérios de Aceitação:** Retomar cita a memória só como complemento; nada contradiz a regra de fonte única.
- **Depende de:** AI-MEMORY-INTEGRATION.9
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.12 — Gerar nova versão: `sincronizar.mjs` e conferir que a regra chega pelo pacote do rules-local

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Rodar o sincronizador, conferir `VERSAO.md` nova e `rules-local/regras` com a regra adicionada em um projeto.
- **Arquivos:** `VERSAO.md`, `dist/REGRAS-GLOBAIS.md`
- **Critérios de Aceitação:** `VERSAO.md` ganha a linha de `memoria-ai.md`; relatório de um projeto mostra 1 adicionado.
- **Depende de:** AI-MEMORY-INTEGRATION.10, AI-MEMORY-INTEGRATION.11
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.13 — Script de auditoria: conferir que nada de `ignore_paths` entrou no wiki da memória

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Varrer o wiki do ai-memory e acusar qualquer página que cite caminho ou segredo proibido.
- **Arquivos:** `scripts/ai-memory-auditar.mjs`
- **Critérios de Aceitação:** Sai com código 1 se achar `.env`, chave, CPF, `tasks/` ou pasta `DEMAIS-PROJETOS-*` nas páginas.
- **Depende de:** AI-MEMORY-INTEGRATION.4, AI-MEMORY-INTEGRATION.6
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.14 — Teste de invariante: o `ignore_paths` nunca deixa vazar caminho proibido

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Teste automatizado (permitido em PESADO) que gera eventos com caminhos proibidos e confere que nenhum chega ao wiki.
- **Arquivos:** `scripts/testes/ai-memory-invariantes.mjs`
- **Critérios de Aceitação:** INV-1 e INV-2 da etapa conferidos para toda combinação de caminho; falha se qualquer um vaza.
- **Depende de:** AI-MEMORY-INTEGRATION.13
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.15 — Medir o custo dos hooks no início da sessão (tempo e se algum bloqueia)

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Medir `sessao.mjs` + Jev + ai-memory juntos no `SessionStart` e no `UserPromptSubmit`.
- **Arquivos:** `docs/AI-MEMORY-HOOKS.md`
- **Critérios de Aceitação:** Tempo total do início da sessão registrado; nenhum hook bloqueia a mensagem; falha do servidor sai com código 0.
- **Depende de:** AI-MEMORY-INTEGRATION.8
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.16 — Piloto no `testes-effort-padaria`: marker e hooks

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Aplicar o instalador no projeto piloto e registrar o resultado.
- **Arquivos:** `testes-effort-padaria/.ai-memory.toml`, `.claude/settings.json`
- **Critérios de Aceitação:** Sessão no piloto cria observações; auditoria sem achados; `rules-local` intacto.
- **Depende de:** AI-MEMORY-INTEGRATION.4, AI-MEMORY-INTEGRATION.8, AI-MEMORY-INTEGRATION.12
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.17 — Ensaio de retomada: sair do Claude Code e continuar no Codex no piloto

**Próximo passo:** Ação do usuário no computador dele.

- **Nível:** Usuário — só o usuário pode fazer (ação no computador ou resposta)
- **Modelo:** Usuário
- **Descrição:** Fazer uma tarefa curta no Claude, encerrar, abrir o Codex e conferir o handoff.
- **Critérios de Aceitação:** Codex recebe o brief; a ordem Quadro primeiro, memória depois foi seguida; resultado anotado.
- **Depende de:** AI-MEMORY-INTEGRATION.16
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.18 — Piloto: conferir se o quadro continua mandando quando a memória diverge

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Provocar uma divergência (memória diz uma coisa, `STATUS.md` outra) e ver a IA seguir o quadro.
- **Arquivos:** `docs/AI-MEMORY-HOOKS.md`
- **Critérios de Aceitação:** Em 3 casos de divergência a IA segue o quadro e avisa; nenhuma linha do quadro é escrita a partir da memória.
- **Depende de:** AI-MEMORY-INTEGRATION.16
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.19 — Fallback da nuvem: sessão sem servidor ai-memory segue só com `rules-local` e o quadro

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Documentar e conferir o comportamento sem servidor (Claude Code na nuvem).
- **Arquivos:** `regras/memoria-ai.md`, `docs/AI-MEMORY-INSTALACAO.md`
- **Critérios de Aceitação:** Sem servidor a sessão inicia sem erro e a IA diz em 1 linha que está sem memória.
- **Depende de:** AI-MEMORY-INTEGRATION.9, AI-MEMORY-INTEGRATION.15
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.20 — Privacidade dos dados de alunos: ignorar listas e currículos e procedimento de purga

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Definir `ignore_paths` extras de dados pessoais e o passo a passo para apagar uma memória capturada por engano.
- **Arquivos:** `docs/AI-MEMORY-PRIVACIDADE.md`
- **Critérios de Aceitação:** Procedimento de purga testado com `purge-project` em dry-run; nenhum dado de aluno no wiki do piloto.
- **Depende de:** AI-MEMORY-INTEGRATION.6, AI-MEMORY-INTEGRATION.13
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.21 — Backup e restauração do wiki da memória

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Definir backup do wiki (git privado) e conferir a restauração em máquina limpa.
- **Arquivos:** `docs/AI-MEMORY-BACKUP.md`
- **Critérios de Aceitação:** Backup feito e restaurado; memória volta igual; remoto privado, sem segredo.
- **Depende de:** AI-MEMORY-INTEGRATION.4
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.22 — Rollout no `aulasenai` (5 pastas, 1 repositório, mesmo projeto de memória)

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Aplicar o instalador no `aulasenai` e nos 4 clones com o mesmo `project`.
- **Arquivos:** `aulasenai/.ai-memory.toml`, `aulasenai/.claude/settings.json`
- **Critérios de Aceitação:** 5 pastas com o mesmo `project`; `ignore_paths` inclui `scripts/variaveis.js`; auditoria sem achados.
- **Depende de:** AI-MEMORY-INTEGRATION.16, AI-MEMORY-INTEGRATION.17, AI-MEMORY-INTEGRATION.18, AI-MEMORY-INTEGRATION.20
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.23 — Rollout no `dashboard-ai` (9 cópias, 1 repositório)

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Aplicar o instalador nas 9 cópias com o mesmo `project`.
- **Arquivos:** `dashboard-ai-*/.ai-memory.toml`
- **Critérios de Aceitação:** 9 cópias com o mesmo `project`; conflito de `tasks/STATUS.md` não aumenta; auditoria sem achados.
- **Depende de:** AI-MEMORY-INTEGRATION.16, AI-MEMORY-INTEGRATION.17, AI-MEMORY-INTEGRATION.18, AI-MEMORY-INTEGRATION.20
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.24 — Rollout nos demais projetos de `C:\fontes` (menos `DEMAIS-PROJETOS-*` e `rules-ai`)

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Aplicar em lote, projeto a projeto, só nos que têm `rules-local`.
- **Arquivos:** `.ai-memory.toml` de cada projeto
- **Critérios de Aceitação:** Quadro com projeto, resultado e auditoria de cada um; nenhum projeto proibido tocado.
- **Depende de:** AI-MEMORY-INTEGRATION.22, AI-MEMORY-INTEGRATION.23
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.25 — Medir o efeito: retomadas com e sem a memória

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Contar sessões que retomaram sem reexplicar o contexto e comparar com o histórico do quadro.
- **Arquivos:** `docs/AI-MEMORY-MEDICAO.md`
- **Critérios de Aceitação:** Relatório com no mínimo 10 retomadas e a conclusão (adotar, ajustar ou desligar).
- **Depende de:** AI-MEMORY-INTEGRATION.24
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.26 — Procedimento de rollback (desligar a memória sem perder o quadro)

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Passo a passo para tirar hooks e marker, parar o servidor e manter o wiki guardado.
- **Arquivos:** `docs/AI-MEMORY-ROLLBACK.md`
- **Critérios de Aceitação:** Rollback executado no piloto em menos de 10 minutos; `rules-local` e quadro intactos.
- **Depende de:** AI-MEMORY-INTEGRATION.16
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.27 — Documentação final: README, `STATUS_PROJETO.md` e mapa de `C:\fontes`

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Registrar a integração no README do `rules-ai`, no status do projeto e no mapa da raiz.
- **Arquivos:** `README.md`, `STATUS_PROJETO.md`, `C:\fontes\CLAUDE.md`, `C:\fontes\AGENTS.md`
- **Critérios de Aceitação:** Os 4 arquivos citam a integração e a regra `memoria-ai.md`; mapa da raiz atualizado nos dois arquivos.
- **Depende de:** AI-MEMORY-INTEGRATION.25, AI-MEMORY-INTEGRATION.26
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.28 — Fechamento: grafo, aceite pela IA e mover a tarefa para `task_complete.md`

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Descrição:** Atualizar o grafo do projeto, mover as linhas concluídas e fechar a mãe.
- **Arquivos:** `tasks/STATUS.md`, `tasks/task_complete.md`
- **Critérios de Aceitação:** Mãe ✅ movida para `task_complete.md`; `graphify update .` rodado depois do push.
- **Depende de:** AI-MEMORY-INTEGRATION.27
- **Verificação:** a preencher na entrega.

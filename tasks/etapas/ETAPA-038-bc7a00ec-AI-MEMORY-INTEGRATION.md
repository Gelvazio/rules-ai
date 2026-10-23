## Etapa 038-bc7a00ec — AI-MEMORY-INTEGRATION: integrar o ai-memory ao rules-local (só no `aulasenai`)

**Tarefa:** AI-MEMORY-INTEGRATION · **Pedido em:** 2026-10-23 09:49 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · ai-memory)
**Pedido:** "crie esta tarefa com o maximo possivel de subtarefas, e use o jev-ai pra decidir qual modelo faz o que, coloque o nome de *AI-MEMORY-INTEGRATION*"
**Objetivo:** o ai-memory (memória episódica entre agentes) passa a conviver com o rules-local (processo e quadro): o quadro sempre vence, a memória só complementa a retomada.

### Escopo

- **Entra:** regra global `memoria-ai.md`; decisão C49; instalador do marker e dos hooks; auditoria e teste de invariante;
  piloto, rollout em `aulasenai`, `dashboard-ai` e demais projetos; medição; rollback; documentação.
- **Entra (acrescentado em 2026-10-23):** hooks de captura em todas as IAs com suporte (Codex, Gemini, Devin, Antigravity, Kimi, OpenCode/DeepSeek); investigação do TypeSafe como provedor generativo.
- **Restrição do usuário (2026-10-23): a integração fica APENAS no projeto local `C:ontesulasenai`.** Nada é instalado em outro projeto, nada vai ao `rules-local` dos demais, nenhuma regra global nova.
- **Não entra:** rollout em `dashboard-ai`, nos 4 clones e nos demais projetos; regra global em `rules-ai/regras/`; substituir o `tasks/STATUS.md`; gravar status, nível ou reserva a partir da memória; mexer em
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
| Os 4 clones do `aulasenai` ficam sem a memória | Escopo restrito pelo usuário; nada a fazer |

### Decisões

- 2026-10-23: etapa criada e publicada; plano aguardando o 'sim' do usuário (tarefa grande).

- 2026-10-23 10:00: as 6 perguntas foram respondidas pelo usuário (tabela acima). Mudanças de escopo: piloto passa a ser o `aulasenai` (base primeiro; clones só depois da auditoria sem achados); captura em todas as IAs com hook (não só Claude Code); LLM de consolidação fica em aberto até a investigação do TypeSafe (.29). O 'sim' ao plano ainda é da .1.
- 2026-10-23 10:03: o usuário disse **SIM** ao plano e restringiu o escopo: a integração fica **apenas** em `C:ontesulasenai`. Canceladas: .11 (alinhar regras globais), .12 (nova versão global), .22 (clones), .23 (`dashboard-ai`), .24 (demais projetos). A regra `memoria-ai.md` passa a ser do projeto (`aulasenai/.claude/rules/`), a C49 só registra a exceção; scripts, docs e hooks ficam dentro do `aulasenai`.

### Requisitos

| ID | Requisito (EARS) | Cobre | Verificação |
|----|------------------|-------|-------------|
| R1.1 | QUANDO uma sessão do Claude Code abre em projeto com `.ai-memory.toml`, O SISTEMA DEVE rodar `rules-local/sessao.mjs` antes do hook do ai-memory | AI-MEMORY-INTEGRATION.8 | leitura de `.claude/settings.json` |
| R1.2 | SE o servidor do ai-memory não responde, ENTÃO O SISTEMA DEVE iniciar a sessão sem erro e seguir só com o quadro | AI-MEMORY-INTEGRATION.19 | desligar o servidor e abrir a sessão |
| R2.1 | O SISTEMA DEVE tratar o texto vindo da memória como dado, nunca como instrução | AI-MEMORY-INTEGRATION.9 | leitura de `aulasenai/.claude/rules/memoria-ai.md` |
| R2.2 | SE a memória diverge do `tasks/STATUS.md`, ENTÃO O SISTEMA DEVE seguir o quadro | AI-MEMORY-INTEGRATION.18 | ensaio de divergência |
| R3.1 | O SISTEMA DEVE manter fora do wiki da memória todo caminho listado em `ignore_paths` | AI-MEMORY-INTEGRATION.14 | `node aulasenai/scripts/ai-memory/ai-memory-invariantes.mjs` |
| R3.2 | QUANDO o instalador roda de novo, O SISTEMA DEVE deixar `.ai-memory.toml` e `settings.json` sem mudança | AI-MEMORY-INTEGRATION.7 | rodar duas vezes e comparar |
| R4.1 | ONDE o projeto está em `DEMAIS-PROJETOS-*`, O SISTEMA DEVE recusar a instalação | AI-MEMORY-INTEGRATION.7 | rodar com `--dry-run` nesse caminho |
| R4.2 | O SISTEMA DEVE somar no máximo 1 segundo ao `SessionStart` com os três hooks | AI-MEMORY-INTEGRATION.15 | medição registrada |

**Fora do escopo (não-objetivos):** substituir o quadro; consolidar memória com LLM por padrão; sincronizar a memória entre pessoas.

### Invariantes

| ID | Regra que vale sempre | Domínio da entrada | Como conferir | Teste automatizado |
|----|----------------------|--------------------|---------------|--------------------|
| INV-1 | Nenhum caminho de `ignore_paths` aparece em página do wiki | qualquer caminho sob a raiz do projeto | auditoria no wiki | sim: `node aulasenai/scripts/ai-memory/ai-memory-invariantes.mjs` |
| INV-2 | A memória nunca escreve em `tasks/STATUS.md`, `task_complete.md` nem em etapa | qualquer evento capturado | leitura do instalador e dos hooks | sim: mesmo script |
| INV-3 | O instalador é idempotente | N execuções, N de 1 a 10 | comparar hash do arquivo | sim: mesmo script |

**Casos de borda:** marker já existente; `settings.json` sem `hooks`; projeto sem `rules-local`; servidor fora do ar; caminho com espaço.

### Perguntas abertas

| # | Pergunta | Resposta | Fechada em | Quem respondeu |
|---|----------|----------|------------|----------------|
| 1 | Posso abrir a exceção controlada à regra 'cada informação em um lugar só' (memória episódica como complemento, o quadro sempre vence)? | Sim — exceção controlada aprovada (o quadro vence) | 2026-10-23 10:00 | Gelvazio |
| 2 | O servidor do ai-memory roda só neste PC (loopback) ou também em outra máquina/servidor seu? | Só neste PC (loopback) | 2026-10-23 10:00 | Gelvazio |
| 3 | Qual projeto é o piloto: `testes-effort-padaria` (recomendado, só texto) ou outro? | aulasenai (diverge da recomendação: padaria) — base primeiro, clones depois da auditoria | 2026-10-23 10:00 | Gelvazio |
| 4 | Os hooks entram no `.claude/settings.json` de cada projeto (recomendado) ou no global da conta? | Por projeto (`.claude/settings.json`) | 2026-10-23 10:00 | Gelvazio |
| 5 | Usar um provedor de LLM para consolidar a memória (custo) ou ficar só no caminho sem LLM? | Investigar o TypeSafe antes de decidir; até lá, sem LLM | 2026-10-23 10:00 | Gelvazio |
| 6 | Codex e outras IAs também capturam desde o início, ou só o Claude Code no piloto? | Todas as IAs (Claude Code, DeepSeek, Codex, Devin, Antigravity, Kimi, Gemini etc.) | 2026-10-23 10:00 | Gelvazio |

### AI-MEMORY-INTEGRATION.1 — Responder as perguntas abertas e aprovar o plano (tarefa grande)

**Próximo passo:** nenhum — entregue.

- **Nível:** Usuário — só o usuário pode fazer (ação no computador ou resposta)
- **Modelo:** Usuário
- **Effort:** — (ação do usuário)
- **Descrição:** O usuário fecha as 6 perguntas da seção Perguntas abertas da etapa e dá o 'sim' ao plano.
- **Critérios de Aceitação:** Nenhum `⬜` em Perguntas abertas; 'sim' registrado em Decisões da etapa.
- **Verificação:** respostas das 6 perguntas e 'sim' ao plano registrados em Decisões (2026-10-23 10:03); gate `verificar-spec.mjs` ok.

### AI-MEMORY-INTEGRATION.2 — Fechar a spec e rodar o gate `verificar-spec.mjs`

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Passar as respostas para Requisitos, Invariantes e Decisões e rodar o gate da C34 na etapa.
- **Arquivos:** `tasks/etapas/ETAPA-038-bc7a00ec-AI-MEMORY-INTEGRATION.md`
- **Critérios de Aceitação:** `node spec/verificar-spec.mjs <etapa>` sai com código 0.
- **Depende de:** AI-MEMORY-INTEGRATION.1
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.3 — Guia de instalação do ai-memory no Windows (servidor local, token em variável de ambiente)

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Documentar `install.ps1`, `ai-memory init`, porta 49374 em loopback e o token só em variável de ambiente.
- **Arquivos:** `aulasenai/docs/AI-MEMORY-INSTALACAO.md`
- **Critérios de Aceitação:** Guia com os comandos exatos, onde fica o token e como conferir o servidor no ar; nenhuma chave no texto.
- **Depende de:** AI-MEMORY-INTEGRATION.2
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.4 — Instalar e subir o servidor ai-memory no computador do usuário

**Próximo passo:** Ação do usuário no computador dele.

- **Nível:** Usuário — só o usuário pode fazer (ação no computador ou resposta)
- **Modelo:** Usuário
- **Effort:** — (ação do usuário)
- **Descrição:** Rodar a instalação, `ai-memory init` e configurar o token como variável de ambiente do Windows.
- **Critérios de Aceitação:** `ai-memory` responde em `127.0.0.1:49374`; token fora de qualquer arquivo do Git.
- **Depende de:** AI-MEMORY-INTEGRATION.3
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.5 — Mapear os hooks do Claude Code do ai-memory e como convivem com `sessao.mjs` e com o Jev

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Ler `hooks/claude-code` do ai-memory e registrar eventos, timeouts, ordem e o que cada hook devolve.
- **Arquivos:** `aulasenai/docs/AI-MEMORY-HOOKS.md`
- **Critérios de Aceitação:** Quadro com evento, comando, timeout e saída de cada hook; ordem recomendada com `sessao.mjs` primeiro.
- **Depende de:** AI-MEMORY-INTEGRATION.2
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.6 — Desenhar o modelo de `.ai-memory.toml` e a lista de `ignore_paths` obrigatórios

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** LEVE — classificado (jev (confiança 0.89))
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.89)
- **Descrição:** Definir o marker por projeto (workspace e project) e os caminhos que nunca entram na memória.
- **Arquivos:** `aulasenai/docs/AI-MEMORY-MARKER.md`
- **Critérios de Aceitação:** Lista cobre `.env*`, `tasks/`, `rules-local/`, `graphify-out/`, gabaritos, listas de alunos, PDFs de currículo e `DEMAIS-PROJETOS-*`.
- **Depende de:** AI-MEMORY-INTEGRATION.2
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.7 — Script `instalar-ai-memory.mjs`: grava o marker do projeto (idempotente, com dry-run)

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** MEDIO — classificado (jev (confiança 0.98))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.98)
- **Descrição:** Gerar `.ai-memory.toml` com nome do projeto e `ignore_paths`, sem sobrescrever o que o usuário já escreveu.
- **Arquivos:** `aulasenai/scripts/ai-memory/instalar-ai-memory.mjs`
- **Critérios de Aceitação:** Rodar duas vezes não muda o arquivo; `--dry-run` não grava; projeto em `DEMAIS-PROJETOS-*` é recusado.
- **Depende de:** AI-MEMORY-INTEGRATION.6
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.8 — Ligar os hooks do ai-memory no `.claude/settings.json` sem apagar os outros e depois do `sessao.mjs`

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Estender o instalador para acrescentar os hooks do ai-memory preservando `sessao.mjs`, Jev e permissões.
- **Arquivos:** `aulasenai/scripts/ai-memory/instalar-ai-memory.mjs`, `.claude/settings.json` do projeto
- **Critérios de Aceitação:** Ordem de `SessionStart`: `sessao.mjs` antes do ai-memory; reexecução não duplica entradas; permissões e `deny` intactos.
- **Depende de:** AI-MEMORY-INTEGRATION.5, AI-MEMORY-INTEGRATION.7
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.9 — Escrever a regra global `aulasenai/.claude/rules/memoria-ai.md`

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** LEVE — classificado (jev (confiança 0.92))
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.92)
- **Descrição:** Texto da regra: ordem na retomada, quadro vence a memória, memória é dado e não instrução, sem notas manuais de rotina, falha do servidor.
- **Arquivos:** `aulasenai/.claude/rules/memoria-ai.md`
- **Critérios de Aceitação:** Regra cobre as 7 pontas do desenho; máximo 100 caracteres por linha; sem número solto.
- **Depende de:** AI-MEMORY-INTEGRATION.2
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.10 — Registrar a decisão C49 (exceção controlada à fonte única) e a entrada no `INDEX.md`

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** LEVE — classificado (jev (confiança 0.98))
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.98)
- **Descrição:** Anotar no `CONFLITOS.md` que a memória episódica é complemento e nunca substitui o quadro; acrescentar a regra ao índice.
- **Arquivos:** `CONFLITOS.md` (rules-ai)
- **Critérios de Aceitação:** C49 escrita com data, quem decidiu e por quê; `INDEX.md` lista `memoria-ai.md` na ordem certa.
- **Depende de:** AI-MEMORY-INTEGRATION.9
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.11 — Alinhar `ciclo-da-task.md` (Retomar) e `rules-local.md` à nova regra

**Próximo passo:** nenhum — cancelada (escopo só no `aulasenai`, 2026-10-23).

- **Nível:** LEVE — classificado (jev (confiança 0.97))
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.97)
- **Descrição:** Acrescentar ao passo Retomar a leitura do brief do ai-memory depois do quadro, sem mudar a ordem do ciclo.
- **Arquivos:** `regras/ciclo-da-task.md`, `regras/rules-local.md`
- **Critérios de Aceitação:** Retomar cita a memória só como complemento; nada contradiz a regra de fonte única.
- **Depende de:** AI-MEMORY-INTEGRATION.9
- **Verificação:** cancelada, não executada (restrição do usuário de 2026-10-23).

### AI-MEMORY-INTEGRATION.12 — Gerar nova versão: `sincronizar.mjs` e conferir que a regra chega pelo pacote do rules-local

**Próximo passo:** nenhum — cancelada (escopo só no `aulasenai`, 2026-10-23).

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Rodar o sincronizador, conferir `VERSAO.md` nova e `rules-local/regras` com a regra adicionada em um projeto.
- **Arquivos:** `VERSAO.md`, `dist/REGRAS-GLOBAIS.md`
- **Critérios de Aceitação:** `VERSAO.md` ganha a linha de `memoria-ai.md`; relatório de um projeto mostra 1 adicionado.
- **Depende de:** AI-MEMORY-INTEGRATION.10, AI-MEMORY-INTEGRATION.11
- **Verificação:** cancelada, não executada (restrição do usuário de 2026-10-23).

### AI-MEMORY-INTEGRATION.13 — Script de auditoria: conferir que nada de `ignore_paths` entrou no wiki da memória

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Varrer o wiki do ai-memory e acusar qualquer página que cite caminho ou segredo proibido.
- **Arquivos:** `aulasenai/scripts/ai-memory/ai-memory-auditar.mjs`
- **Critérios de Aceitação:** Sai com código 1 se achar `.env`, chave, CPF, `tasks/` ou pasta `DEMAIS-PROJETOS-*` nas páginas.
- **Depende de:** AI-MEMORY-INTEGRATION.4, AI-MEMORY-INTEGRATION.6
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.14 — Teste de invariante: o `ignore_paths` nunca deixa vazar caminho proibido

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Teste automatizado (permitido em PESADO) que gera eventos com caminhos proibidos e confere que nenhum chega ao wiki.
- **Arquivos:** `aulasenai/scripts/ai-memory/ai-memory-invariantes.mjs`
- **Critérios de Aceitação:** INV-1 e INV-2 da etapa conferidos para toda combinação de caminho; falha se qualquer um vaza.
- **Depende de:** AI-MEMORY-INTEGRATION.13
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.15 — Medir o custo dos hooks no início da sessão (tempo e se algum bloqueia)

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Medir `sessao.mjs` + Jev + ai-memory juntos no `SessionStart` e no `UserPromptSubmit`.
- **Arquivos:** `aulasenai/docs/AI-MEMORY-HOOKS.md`
- **Critérios de Aceitação:** Tempo total do início da sessão registrado; nenhum hook bloqueia a mensagem; falha do servidor sai com código 0.
- **Depende de:** AI-MEMORY-INTEGRATION.8
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.16 — Piloto no `aulasenai` (pasta base): marker e hooks

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Aplicar o instalador no projeto piloto e registrar o resultado.
- **Arquivos:** `aulasenai/.ai-memory.toml`, `aulasenai/.claude/settings.json`
- **Critérios de Aceitação:** Sessão no piloto cria observações; auditoria sem achados; `rules-local` intacto.
- **Depende de:** AI-MEMORY-INTEGRATION.4, AI-MEMORY-INTEGRATION.8, AI-MEMORY-INTEGRATION.12
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.17 — Ensaio de retomada: sair do Claude Code e continuar no Codex no piloto (aulasenai)

**Próximo passo:** Ação do usuário no computador dele.

- **Nível:** Usuário — só o usuário pode fazer (ação no computador ou resposta)
- **Modelo:** Usuário
- **Effort:** — (ação do usuário)
- **Descrição:** Fazer uma tarefa curta no Claude, encerrar, abrir o Codex e conferir o handoff.
- **Critérios de Aceitação:** Codex recebe o brief; a ordem Quadro primeiro, memória depois foi seguida; resultado anotado.
- **Depende de:** AI-MEMORY-INTEGRATION.16
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.18 — Piloto: conferir se o quadro continua mandando quando a memória diverge

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** MEDIO — classificado (sinais)
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Provocar uma divergência (memória diz uma coisa, `STATUS.md` outra) e ver a IA seguir o quadro.
- **Arquivos:** `aulasenai/docs/AI-MEMORY-HOOKS.md`
- **Critérios de Aceitação:** Em 3 casos de divergência a IA segue o quadro e avisa; nenhuma linha do quadro é escrita a partir da memória.
- **Depende de:** AI-MEMORY-INTEGRATION.16
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.19 — Fallback da nuvem: sessão sem servidor ai-memory segue só com `rules-local` e o quadro

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Documentar e conferir o comportamento sem servidor (Claude Code na nuvem).
- **Arquivos:** `aulasenai/.claude/rules/memoria-ai.md`, `aulasenai/docs/AI-MEMORY-INSTALACAO.md`
- **Critérios de Aceitação:** Sem servidor a sessão inicia sem erro e a IA diz em 1 linha que está sem memória.
- **Depende de:** AI-MEMORY-INTEGRATION.9, AI-MEMORY-INTEGRATION.15
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.20 — Privacidade dos dados de alunos: ignorar listas e currículos e procedimento de purga

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Definir `ignore_paths` extras de dados pessoais e o passo a passo para apagar uma memória capturada por engano.
- **Arquivos:** `aulasenai/docs/AI-MEMORY-PRIVACIDADE.md`
- **Critérios de Aceitação:** Procedimento de purga testado com `purge-project` em dry-run; nenhum dado de aluno no wiki do piloto.
- **Depende de:** AI-MEMORY-INTEGRATION.6, AI-MEMORY-INTEGRATION.13
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.21 — Backup e restauração do wiki da memória

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Definir backup do wiki (git privado) e conferir a restauração em máquina limpa.
- **Arquivos:** `aulasenai/docs/AI-MEMORY-BACKUP.md`
- **Critérios de Aceitação:** Backup feito e restaurado; memória volta igual; remoto privado, sem segredo.
- **Depende de:** AI-MEMORY-INTEGRATION.4
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.22 — Rollout nos 4 clones do `aulasenai` (a base já é o piloto)

**Próximo passo:** nenhum — cancelada (escopo só no `aulasenai`, 2026-10-23).

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Aplicar o instalador no `aulasenai` e nos 4 clones com o mesmo `project`.
- **Arquivos:** `aulasenai/.ai-memory.toml`, `aulasenai/.claude/settings.json`
- **Critérios de Aceitação:** 5 pastas com o mesmo `project`; `ignore_paths` inclui `scripts/variaveis.js`; auditoria sem achados.
- **Depende de:** AI-MEMORY-INTEGRATION.16, AI-MEMORY-INTEGRATION.17, AI-MEMORY-INTEGRATION.18, AI-MEMORY-INTEGRATION.20, AI-MEMORY-INTEGRATION.34, AI-MEMORY-INTEGRATION.35
- **Verificação:** cancelada, não executada (restrição do usuário de 2026-10-23).

### AI-MEMORY-INTEGRATION.23 — Rollout no `dashboard-ai` (9 cópias, 1 repositório)

**Próximo passo:** nenhum — cancelada (escopo só no `aulasenai`, 2026-10-23).

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Aplicar o instalador nas 9 cópias com o mesmo `project`.
- **Arquivos:** `dashboard-ai-*/.ai-memory.toml`
- **Critérios de Aceitação:** 9 cópias com o mesmo `project`; conflito de `tasks/STATUS.md` não aumenta; auditoria sem achados.
- **Depende de:** AI-MEMORY-INTEGRATION.16, AI-MEMORY-INTEGRATION.17, AI-MEMORY-INTEGRATION.18, AI-MEMORY-INTEGRATION.20, AI-MEMORY-INTEGRATION.34, AI-MEMORY-INTEGRATION.35
- **Verificação:** cancelada, não executada (restrição do usuário de 2026-10-23).

### AI-MEMORY-INTEGRATION.24 — Rollout nos demais projetos de `C:\fontes` (menos `DEMAIS-PROJETOS-*` e `rules-ai`)

**Próximo passo:** nenhum — cancelada (escopo só no `aulasenai`, 2026-10-23).

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Aplicar em lote, projeto a projeto, só nos que têm `rules-local`.
- **Arquivos:** `.ai-memory.toml` de cada projeto
- **Critérios de Aceitação:** Quadro com projeto, resultado e auditoria de cada um; nenhum projeto proibido tocado.
- **Depende de:** AI-MEMORY-INTEGRATION.22, AI-MEMORY-INTEGRATION.23
- **Verificação:** cancelada, não executada (restrição do usuário de 2026-10-23).

### AI-MEMORY-INTEGRATION.25 — Medir o efeito: retomadas com e sem a memória

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Contar sessões que retomaram sem reexplicar o contexto e comparar com o histórico do quadro.
- **Arquivos:** `aulasenai/docs/AI-MEMORY-MEDICAO.md`
- **Critérios de Aceitação:** Relatório com no mínimo 10 retomadas e a conclusão (adotar, ajustar ou desligar).
- **Depende de:** AI-MEMORY-INTEGRATION.16, AI-MEMORY-INTEGRATION.17, AI-MEMORY-INTEGRATION.18
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.26 — Procedimento de rollback (desligar a memória sem perder o quadro)

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Passo a passo para tirar hooks e marker, parar o servidor e manter o wiki guardado.
- **Arquivos:** `aulasenai/docs/AI-MEMORY-ROLLBACK.md`
- **Critérios de Aceitação:** Rollback executado no piloto em menos de 10 minutos; `rules-local` e quadro intactos.
- **Depende de:** AI-MEMORY-INTEGRATION.16
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.27 — Documentação final: README, `STATUS_PROJETO.md` e mapa de `C:\fontes`

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Registrar a integração no README do `rules-ai`, no status do projeto e no mapa da raiz.
- **Arquivos:** `README.md`, `STATUS_PROJETO.md`, `C:\fontes\CLAUDE.md`, `C:\fontes\AGENTS.md`
- **Critérios de Aceitação:** Os 4 arquivos citam a integração e a regra `memoria-ai.md`; mapa da raiz atualizado nos dois arquivos.
- **Depende de:** AI-MEMORY-INTEGRATION.25, AI-MEMORY-INTEGRATION.26
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.28 — Fechamento: grafo, aceite pela IA e mover a tarefa para `task_complete.md`

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** LEVE — classificado (jev (confiança 0.80))
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.80)
- **Descrição:** Atualizar o grafo do projeto, mover as linhas concluídas e fechar a mãe.
- **Arquivos:** `tasks/STATUS.md`, `tasks/task_complete.md`
- **Critérios de Aceitação:** Mãe ✅ movida para `task_complete.md`; `graphify update .` rodado depois do push.
- **Depende de:** AI-MEMORY-INTEGRATION.27
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.29 — Investigar se o TypeSafe tem modelo generativo compatível com o ai-memory (consolidação com LLM)

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** LEVE — classificado (jev (confiança 0.86))
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.86)
- **Descrição:** Ler a documentação do TypeSafe e conferir se há endpoint de chat com saída em JSON schema, preço e política de dados; concluir se serve ao ai-memory.
- **Arquivos:** `aulasenai/docs/AI-MEMORY-LLM.md`
- **Critérios de Aceitação:** Relatório com a conclusão (serve / não serve), custo e política de dados; pergunta 5 fechada de vez.
- **Depende de:** AI-MEMORY-INTEGRATION.1
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.30 — Matriz de hooks por IA: o que cada harness captura e como fecha a sessão

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** LEVE — classificado (sinais)
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Levantar, em `hooks/` do ai-memory, o suporte de Codex, DeepSeek/OpenCode, Devin, Antigravity, Kimi e Gemini (eventos, fim de sessão, exclusões de captura).
- **Arquivos:** `aulasenai/docs/AI-MEMORY-HOOKS.md`
- **Critérios de Aceitação:** Quadro IA × eventos × fim de sessão × `ignore_paths`; IA sem hook marcada como tal.
- **Depende de:** AI-MEMORY-INTEGRATION.5
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.31 — Hooks de captura no Codex e no Gemini CLI

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** MEDIO — classificado (jev (confiança 0.80))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.80)
- **Descrição:** Aplicar o instalador nos dois harnesses, no projeto, respeitando o gancho do Jev e o `codex_hooks`.
- **Arquivos:** `aulasenai/scripts/ai-memory/instalar-ai-memory.mjs`, `.codex/hooks.json`, config do Gemini
- **Critérios de Aceitação:** Os dois capturam no piloto; reexecução não duplica; nenhum hook bloqueia a mensagem.
- **Depende de:** AI-MEMORY-INTEGRATION.30, AI-MEMORY-INTEGRATION.7
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.32 — Hooks de captura no Devin e no Antigravity (com `finalize-session`)

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** MEDIO — classificado (jev (confiança 0.83))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.83)
- **Descrição:** Aplicar nos dois e documentar o fechamento explícito do Antigravity (`ai-memory finalize-session`).
- **Arquivos:** `aulasenai/scripts/ai-memory/instalar-ai-memory.mjs`, `aulasenai/docs/AI-MEMORY-HOOKS.md`
- **Critérios de Aceitação:** Os dois capturam; sessão do Antigravity é fechada pelo comando; resultado registrado.
- **Depende de:** AI-MEMORY-INTEGRATION.30, AI-MEMORY-INTEGRATION.7
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.33 — Hooks de captura no Kimi e no OpenCode (DeepSeek)

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** MEDIO — classificado (jev (confiança 0.83))
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** SIM
- **Fonte:** jev (confiança 0.83)
- **Descrição:** Aplicar nos dois e conferir como o DeepSeek (via OpenCode) entra na captura.
- **Arquivos:** `aulasenai/scripts/ai-memory/instalar-ai-memory.mjs`, `aulasenai/docs/AI-MEMORY-HOOKS.md`
- **Critérios de Aceitação:** Kimi e OpenCode capturam; caminho do DeepSeek documentado.
- **Depende de:** AI-MEMORY-INTEGRATION.30, AI-MEMORY-INTEGRATION.7
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.34 — Auditoria de captura por IA: cada harness respeita `ignore_paths` e não vaza segredo

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Rodar a auditoria e o teste de invariante com eventos de cada IA instalada.
- **Arquivos:** `aulasenai/scripts/ai-memory/ai-memory-auditar.mjs`, `aulasenai/scripts/ai-memory/ai-memory-invariantes.mjs`
- **Critérios de Aceitação:** Nenhuma IA grava caminho proibido nem segredo; achados corrigidos antes dos clones.
- **Depende de:** AI-MEMORY-INTEGRATION.31, AI-MEMORY-INTEGRATION.32, AI-MEMORY-INTEGRATION.33, AI-MEMORY-INTEGRATION.13, AI-MEMORY-INTEGRATION.14
- **Verificação:** a preencher na entrega.

### AI-MEMORY-INTEGRATION.35 — Piloto no `aulasenai`: proteger `scripts/variaveis.js` (service_role) e dados de alunos antes de ligar

**Próximo passo:** Aguardando as dependências e o 'sim' ao plano.

- **Nível:** PESADO — classificado (sinais)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** sinais
- **Descrição:** Conferir `ignore_paths` do projeto real e rodar a auditoria só na pasta base antes de liberar os clones.
- **Arquivos:** `aulasenai/.ai-memory.toml`, `aulasenai/docs/AI-MEMORY-PRIVACIDADE.md`
- **Critérios de Aceitação:** Auditoria da pasta base sem achados; `variaveis.js`, `MATERIAIS/` e listas de alunos fora da memória.
- **Depende de:** AI-MEMORY-INTEGRATION.16, AI-MEMORY-INTEGRATION.20
- **Verificação:** a preencher na entrega.

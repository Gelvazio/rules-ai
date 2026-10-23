## Etapa 040-7a3f19c6 — AGENTES-REALTIME: `/api/agentes` e `/api/projetos` por Supabase Realtime

**Tarefa:** AGENTES-REALTIME · **Pedido em:** 2026-10-23 11:24 · **Criada por:** Claude Code (Sonnet 5.5) (local · main · rules-ai)
**Pedido:** "CRIE 1 TAREFA PRA FAZER ISSO, COM O MAXIMO DE SUB-TAREFAS POSSIVEIS: */api/agentes* PARA SUPABASE REALTIME"
**Objetivo:** a página "Agentes ao vivo" deixa de depender do servidor Python (`/api/agentes` e `/api/projetos`) e passa a receber o quadro por Supabase Realtime, sem perder o atraso configurável, os projetos e o fallback.

> 🟠 **Tarefa grande (`PESADO`)**: mexe em segurança (chaves, canal, secrets), em vários repositórios e em
> várias partes. O plano é esta etapa; a execução **só começa depois do "sim" do usuário** e com as
> **Perguntas abertas** fechadas (C34). Nada foi alterado além do quadro.

> ⚠️ **Sobreposição achada:** a ETAPA-031 (MIGRAR-AGENTES-BROADCAST, aprovada e em execução) já migra a
> mesma página para Supabase Realtime **Broadcast**, sem tabela. Esta tarefa foi escrita como
> **complemento** dela (pergunta 1, resposta recomendada **a**). Se a resposta for outra, o plano é
> reescrito e volta para aprovação.

### Contexto

- Hoje `agentes.js` consulta `GET /api/agentes` a cada 10 s e o menu consulta `GET /api/projetos`; as duas
  rotas vivem em `dashboard/servidor.py` e leem o `tasks/STATUS.md` do disco (`quadro_tarefas.py`).
- A regra `regras/quadro-de-tarefas.md` proíbe cópia da fila em tabela de banco: o `STATUS.md` é a fonte
  única. Por isso o plano usa **Broadcast** (transmite, não guarda). Usar tabela + `postgres_changes`
  exigiria uma exceção parecida com a C49 (pergunta 1, opção b).
- A 031 cobre: publicador Python, workflow, assinatura do canal na página, estado inicial e fallback
  (.1 a .5). Esta tarefa cobre o que sobra para tirar as duas rotas do servidor.

### Escopo

**Entra:** lista de projetos sem servidor; leitor do `STATUS.md` em JS; contrato estendido; privacidade e
autorização do canal; secrets; workflow para os outros repositórios; coalescer e ordenar mensagens;
página sem `setInterval`; indicador de conexão; reconexão; fallback; remover as duas rotas do
`servidor.py`; medições; documentação; rollback.

**Não entra:** tabela no Supabase (salvo pergunta 1-b); mudar o formato do `STATUS.md`; abrir navegador
(a conferência na tela é do usuário, `.29`).

### Critério de pronto

- A página "Agentes ao vivo" abre e anima sem o `servidor.py` rodando.
- `git grep "/api/agentes\|/api/projetos"` só aparece no fallback documentado (ou em nada, conforme a pergunta 4).
- `node spec/verificar-spec.mjs tasks/etapas/ETAPA-040-7a3f19c6-AGENTES-REALTIME.md` passa.
- Nenhuma chave secreta em arquivo versionado.

### Riscos

| Risco | Plano B |
|---|---|
| Duplicar o trabalho da MIGRAR-AGENTES-BROADCAST | Pergunta 1; as subtarefas citam a 031 como dependência e não refazem o publicador |
| Títulos de tarefas de outros projetos (ex.: `aulasenai`) saírem na nuvem | Pergunta 3; guardrail e teste de invariante (.8 e .9) |
| Chave secreta vazar no navegador ou no Git | .11, .22 e .23; chave secreta só em secrets do GitHub |
| Limite do plano gratuito do Realtime | .14 coalesce pushes; .25 mede a folga |
| `agentes.js`, `api.js` e `menu.js` editados por outras etapas ao mesmo tempo (020, 031) | Conferir o quadro antes de reservar; `git pull --rebase` antes de cada push |
| Parser JS diferente do Python | .6 compara os dois em todos os quadros |

### Requisitos

> Formato EARS.

| ID | Requisito (EARS) | Cobre | Verificação |
|----|------------------|-------|-------------|
| R1.1 | QUANDO um `tasks/STATUS.md` liberado for enviado ao GitHub, O SISTEMA DEVE publicar o quadro no canal do projeto em até 10 s | AGENTES-REALTIME.24 | script de latência da .24 |
| R1.2 | QUANDO a página abrir sem o `servidor.py`, O SISTEMA DEVE mostrar o estado atual do quadro lido do GitHub | AGENTES-REALTIME.5, AGENTES-REALTIME.19 | leitura do código e conferência do usuário (.29) |
| R2.1 | O SISTEMA DEVE enviar ao canal só os campos `tarefa`, `titulo`, `pai`, `mae`, `nivel`, `status`, `agente`, `desde`, `progresso`, `global`, `indice`, e os metadados do envelope `projeto`, `commit`, `publicado_em`, `sequencia`, `atraso_padrao`, `intervalo` | AGENTES-REALTIME.8, AGENTES-REALTIME.9 | script de invariante da .9 |
| R2.2 | SE o projeto estiver em `DEMAIS-PROJETOS-*`, ENTÃO O SISTEMA DEVE não listar, ler nem publicar | AGENTES-REALTIME.8, AGENTES-REALTIME.9 | script de invariante da .9 |
| R3.1 | QUANDO o canal cair, O SISTEMA DEVE mostrar "reconectando" e, ao voltar, reler o estado completo | AGENTES-REALTIME.17, AGENTES-REALTIME.18 | leitura do código |
| R3.2 | SE chegar mensagem com `sequencia` menor ou igual à atual, ENTÃO O SISTEMA DEVE descartá-la | AGENTES-REALTIME.14, AGENTES-REALTIME.18 | leitura do código |
| R4.1 | O SISTEMA DEVE manter a chave secreta apenas em secrets do GitHub e em variável de ambiente | AGENTES-REALTIME.11, AGENTES-REALTIME.23 | `git grep` de padrões de chave vazio |
| R5.1 | ONDE o `servidor.py` seguir existindo, O SISTEMA DEVE responder 404 a `/api/agentes` e `/api/projetos`, salvo se a pergunta 4 mandar manter como fallback | AGENTES-REALTIME.20 | leitura do mapa de rotas |

**Fora do escopo (não-objetivos):** cópia da fila em tabela; mandar dados de volta do Supabase para o
`STATUS.md`; mudar regras de reserva.

### Invariantes

| ID | Regra que vale sempre | Domínio da entrada | Como conferir | Teste automatizado |
|----|----------------------|--------------------|---------------|--------------------|
| INV-1 | O payload tem só os campos permitidos em R2.1 | todo `STATUS.md` liberado | script da .9 | sim: script da .9 |
| INV-2 | Nenhum projeto de `DEMAIS-PROJETOS-*` aparece no payload nem em `projetos.json` | todas as pastas de `C:\fontes` | script da .9 | sim: mesmo script |
| INV-3 | Nenhuma chave secreta em arquivo versionado nem no HTML | todos os arquivos versionados | `git grep -n -E "service_role\|sb_secret_\|SUPABASE_SERVICE\|eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\."` vazio | não: conferência por comando |
| INV-4 | O leitor JS devolve o mesmo resultado que `quadro_tarefas.py` | todos os `STATUS.md` liberados | script da .6 | sim: script da .6 |
| INV-5 | Todo `import`, `href` e `src` local dos `.html` e `.js` restantes aponta para arquivo que existe | todos os `.html` e `.js` de `dashboard/` | script temporário na pasta da sessão (fora do repositório), descrito na Verificação da .30 | não: conferência por comando |

**Casos de borda que o código precisa sobreviver:** `STATUS.md` sem a coluna "Modelo"; projeto sem quadro;
canal fora do ar na abertura; mensagem duplicada; dois pushes em menos de 2 s; repositório privado.

### Perguntas abertas

| # | Pergunta | Resposta | Fechada em | Quem respondeu |
|---|----------|----------|------------|----------------|
| 1 | A ETAPA-031 (MIGRAR-AGENTES-BROADCAST, aprovada) já migra a página por Broadcast. **a)** esta tarefa a **complementa** e cuida do que sobra de `/api/agentes` e `/api/projetos` (recomendado); **b)** esta tarefa a **substitui** por tabela + `postgres_changes` (exige exceção à regra "sem cópia da fila em tabela de banco" e cancela a 031); **c)** cancelar esta tarefa? | ✅ **a)** complementa a MIGRAR-AGENTES-BROADCAST | 2026-10-23 13:09 | Usuário ("faça tudo recomendado"); 5 e 6 alinhadas à ETAPA-031 pelo líder |
| 2 | O canal é **a)** público (quem tem a chave publicável vê os títulos das tarefas liberadas) ou **b)** privado, com login? | ✅ **a)** público (chave publicável; só títulos de tarefas liberadas) | 2026-10-23 13:09 | Usuário ("faça tudo recomendado"); 5 e 6 alinhadas à ETAPA-031 pelo líder |
| 3 | Quais projetos publicam: **a)** só o `rules-ai` (recomendado para começar) ou **b)** todos os de `C:\fontes` com quadro, menos `DEMAIS-PROJETOS-*` (os títulos do `aulasenai` podem ter dados pedagógicos)? | ✅ **a)** só o `rules-ai`, para começar | 2026-10-23 13:09 | Usuário ("faça tudo recomendado"); 5 e 6 alinhadas à ETAPA-031 pelo líder |
| 4 | O `servidor.py` depois disso: **a)** aposentado (basta `python -m http.server`); **b)** mantido só como fallback local; **c)** mantido só para arquivos estáticos? | ✅ **a)** aposentado (basta `python -m http.server`) | 2026-10-23 13:09 | Usuário ("faça tudo recomendado"); 5 e 6 alinhadas à ETAPA-031 pelo líder |
| 5 | O Supabase é **a)** um projeto novo e dedicado (recomendado: não mistura com os dados de alunos do `aulasenai`) ou **b)** um projeto existente? | ✅ **b)** projeto existente **AULAS SENAI** (`hxlvonriearllcmfqeri`), só o canal de Broadcast, sem tabela nem dado — igual à decisão do usuário de 2026-10-20 08:35 na ETAPA-031 (a recomendação "projeto novo" foi trocada para não contradizer a 031) | 2026-10-23 13:09 | Usuário ("faça tudo recomendado"); 5 e 6 alinhadas à ETAPA-031 pelo líder |
| 6 | A página roda **a)** só no seu computador ou **b)** também hospedada (Vercel, GitHub Pages)? | ✅ **b)** hospedada na Vercel, igual à pergunta 4 da ETAPA-031 (a resposta "só no computador" foi trocada para não contradizer a 031) | 2026-10-23 13:09 | Usuário ("faça tudo recomendado"); 5 e 6 alinhadas à ETAPA-031 pelo líder |

### Decisões

| Data | Decisão | Quem | Por quê |
|---|---|---|---|
| 2026-10-23 11:24 | Registrada como tarefa grande (`PESADO`, spec C34), com 31 subtarefas; execução só depois das perguntas fechadas e do "sim". Escrita como complemento da ETAPA-031 | Claude Code (Sonnet 5.5) | Banco/segurança/várias partes; a 031 já cobre parte do caminho |
| 2026-10-23 11:24 | Níveis e modelos propostos pela matriz e pelos sinais; `JEV-AI-SUGGESTION: NAO` em todas até rodar `node scripts/jev.mjs classificar` | Claude Code (Sonnet 5.5) | O Jev não foi rodado nesta sessão |
| 2026-10-23 13:09 | **"Sim" ao plano:** o usuário respondeu "faça tudo recomendado". Perguntas fechadas: 1-a, 2-a, 3-a, 4-a; 5 e 6 seguem as decisões do usuário na ETAPA-031 (projeto AULAS SENAI e Vercel). Também autorizou liberar a reserva parada da MIGRAR-AGENTES-BROADCAST.1 e usar a conta D na equipe herdr | Usuário (registrado pelo líder Opus 5.5) | Destrava a execução (C34) |
| 2026-10-23 13:25 | Ajustes da conferência da .2 (achados do agente h1): R2.1/INV-1 passam a listar os metadados do envelope (`projeto`, `commit`, `publicado_em`, `sequencia`, `atraso_padrao`, `intervalo`) que a .4 e a .14 exigem; INV-3 com os padrões exatos do `git grep`; INV-5 com o script nomeado; linha solta das Decisões voltou para a tabela | Líder (Opus 5.5 · sargento) | Mudança material de requisito registrada (C34, regra 5); não muda o escopo |

### AGENTES-REALTIME.1 — Fechar as 6 perguntas abertas e aprovar o plano

**Próximo passo:** nenhum — entregue.

- **Nível:** Usuário — só o usuário pode fazer (resposta, conta ou conferência na tela)
- **Modelo:** Usuário — nunca outro
- **Effort:** — (ação do usuário)
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Responder as perguntas 1 a 6 da etapa e dar o "sim" ao plano.
- **Critérios de Aceitação:** Nenhum `⬜` em Perguntas abertas; "sim" registrado em Decisões.
- **Depende de:** Nenhuma
- **Entrega:** respostas e "sim" do usuário em 2026-10-23 13:09 (tabela Perguntas abertas e Decisões).
- **Verificação:** nenhum `⬜` em Perguntas abertas; "sim" nas Decisões.

### AGENTES-REALTIME.2 — Fechar a spec e rodar o gate `verificar-spec.mjs`

**Próximo passo:** esperar AGENTES-REALTIME.1.

- **Nível:** LEVE — só texto, configuração simples ou comando de fechamento
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Conferir Requisitos, Invariantes e Perguntas da etapa e rodar `node spec/verificar-spec.mjs`.
- **Critérios de Aceitação:** Gate sai com código 0.
- **Depende de:** AGENTES-REALTIME.1

### AGENTES-REALTIME.3 — Inventário do que ainda pede `/api/agentes` e `/api/projetos`

**Próximo passo:** esperar AGENTES-REALTIME.1.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Listar no corpo da etapa cada arquivo e campo que consome as duas rotas (`tarefas`, `atualizado_em`, `projeto`, `atraso_padrao`, `intervalo`, `padrao`, `projetos`), com o plano de onde cada campo passa a vir.
- **Critérios de Aceitação:** Tabela campo → nova origem, sem campo órfão.
- **Depende de:** AGENTES-REALTIME.1

### AGENTES-REALTIME.4 — Contrato do canal estendido: lista de projetos, metadados e versão

**Próximo passo:** esperar AGENTES-REALTIME.3, MIGRAR-AGENTES-BROADCAST.1.

- **Nível:** PESADO — banco, segurança, segredo ou contrato entre várias partes
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Estender o contrato da MIGRAR-AGENTES-BROADCAST.1 para cobrir a lista de projetos, `atraso_padrao`, `intervalo` e o campo `sequencia`; sem criar tabela.
- **Critérios de Aceitação:** Contrato escrito na etapa e igual ao da 031 nos campos comuns.
- **Depende de:** AGENTES-REALTIME.3, MIGRAR-AGENTES-BROADCAST.1

### AGENTES-REALTIME.5 — Leitor do `STATUS.md` em JavaScript (porta de `quadro_tarefas.py`)

**Próximo passo:** esperar AGENTES-REALTIME.3.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Criar `assets/js/agentes/quadro.js` com o mesmo resultado do parser Python, para o estado inicial lido do GitHub sem servidor.
- **Critérios de Aceitação:** Mesmos campos e valores que o Python em todos os quadros (INV-4); `node --check`.
- **Depende de:** AGENTES-REALTIME.3

### AGENTES-REALTIME.6 — Invariante de paridade: parser JS igual ao Python

**Próximo passo:** esperar AGENTES-REALTIME.5.

- **Nível:** PESADO — banco, segurança, segredo ou contrato entre várias partes
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Script de comparação que roda os dois parsers em todos os `tasks/STATUS.md` de `C:\fontes` (sem as pastas proibidas) e lista as diferenças. Teste de invariante permitido em PESADO.
- **Critérios de Aceitação:** INV-4 sem diferença; comando registrado na Verificação.
- **Depende de:** AGENTES-REALTIME.5

### AGENTES-REALTIME.7 — Lista de projetos sem `/api/projetos`

**Próximo passo:** esperar AGENTES-REALTIME.4.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** O publicador gera o `projetos.json` (id e nome de cada projeto com quadro, sem `DEMAIS-PROJETOS-*`) e a página lê dele; `PROJETOS_PADRAO` fica como último recurso.
- **Critérios de Aceitação:** Menu de projetos monta sem o servidor Python.
- **Depende de:** AGENTES-REALTIME.4

### AGENTES-REALTIME.8 — Guardrail de privacidade no publicador

**Próximo passo:** esperar AGENTES-REALTIME.4, MIGRAR-AGENTES-BROADCAST.2.

- **Nível:** PESADO — banco, segurança, segredo ou contrato entre várias partes
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** O publicador só envia a lista de campos permitida, nunca pastas C20/C23, e passa o texto dos títulos pela redação de segredos/PII (`scripts/jev/redigir.mjs` ou equivalente) antes de enviar.
- **Critérios de Aceitação:** INV-1 e INV-2 valem; nenhum dado pessoal no payload de exemplo.
- **Depende de:** AGENTES-REALTIME.4, MIGRAR-AGENTES-BROADCAST.2

### AGENTES-REALTIME.9 — Teste de invariante do payload (campos e projetos permitidos)

**Próximo passo:** esperar AGENTES-REALTIME.8.

- **Nível:** PESADO — banco, segurança, segredo ou contrato entre várias partes
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Script que gera o payload de todos os quadros e confere INV-1 (só campos permitidos) e INV-2 (nenhum projeto proibido). Permitido em PESADO.
- **Critérios de Aceitação:** Comando passa e fica na Verificação.
- **Depende de:** AGENTES-REALTIME.8

### AGENTES-REALTIME.10 — Autorização do canal (público ou privado) conforme a pergunta 2

**Próximo passo:** esperar AGENTES-REALTIME.1, AGENTES-REALTIME.4.

- **Nível:** PESADO — banco, segurança, segredo ou contrato entre várias partes
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Se privado: política em `realtime.messages` e login; se público: confirmar que só vai o que a pergunta 3 liberou e que a chave publicável não lê tabela alguma.
- **Critérios de Aceitação:** Resposta da pergunta 2 aplicada; nenhuma tabela exposta.
- **Depende de:** AGENTES-REALTIME.1, AGENTES-REALTIME.4

### AGENTES-REALTIME.11 — Segredos do publicador: onde ficam e como rodam

**Próximo passo:** esperar AGENTES-REALTIME.4.

- **Nível:** PESADO — banco, segurança, segredo ou contrato entre várias partes
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Definir `SUPABASE_URL`, chave publicável e chave secreta: a secreta só em secrets do GitHub e em variável de ambiente local; nunca em arquivo versionado nem no HTML.
- **Critérios de Aceitação:** Lista de variáveis e de onde cada uma vive; INV-3.
- **Depende de:** AGENTES-REALTIME.4

### AGENTES-REALTIME.12 — Criar ou escolher o projeto Supabase e cadastrar os secrets

**Próximo passo:** esperar a resposta do usuário.

- **Nível:** Usuário — só o usuário pode fazer (resposta, conta ou conferência na tela)
- **Modelo:** Usuário — nunca outro
- **Effort:** — (ação do usuário)
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Criar o projeto (pergunta 5), copiar a URL e a chave publicável para o `config`, e cadastrar a chave secreta só nos secrets do GitHub dos repositórios da pergunta 3.
- **Critérios de Aceitação:** Secrets cadastrados; nada colado no chat.
- **Depende de:** AGENTES-REALTIME.11

### AGENTES-REALTIME.13 — Workflow reutilizável para os outros repositórios

**Próximo passo:** esperar MIGRAR-AGENTES-BROADCAST.2, AGENTES-REALTIME.12.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Transformar o workflow da 031 em reutilizável (`workflow_call`) e aplicar aos repositórios liberados na pergunta 3.
- **Critérios de Aceitação:** Cada repositório liberado tem o workflow chamando o central.
- **Depende de:** MIGRAR-AGENTES-BROADCAST.2, AGENTES-REALTIME.12

### AGENTES-REALTIME.14 — Coalescer pushes seguidos e ordenar mensagens

**Próximo passo:** esperar AGENTES-REALTIME.4, MIGRAR-AGENTES-BROADCAST.2.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** No publicador, juntar pushes próximos em uma mensagem e numerar com `sequencia`, para a página descartar mensagem velha.
- **Critérios de Aceitação:** Duas gravações em 2 s geram uma mensagem; `sequencia` crescente.
- **Depende de:** AGENTES-REALTIME.4, MIGRAR-AGENTES-BROADCAST.2

### AGENTES-REALTIME.15 — Página sem o `setInterval` do servidor

**Próximo passo:** esperar MIGRAR-AGENTES-BROADCAST.3, AGENTES-REALTIME.3.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Em `agentes.js`, tirar a consulta a cada 10 s à rota local; `atraso_padrao` e `intervalo` passam a vir do `config.js` e do canal.
- **Critérios de Aceitação:** `agentes.js` não chama `lerAgentes` em laço; `node --check`.
- **Depende de:** MIGRAR-AGENTES-BROADCAST.3, AGENTES-REALTIME.3

### AGENTES-REALTIME.16 — Menu de projetos lê o `projetos.json`

**Próximo passo:** esperar AGENTES-REALTIME.7.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** `menu.js` lê a lista de projetos do `projetos.json` e usa `PROJETOS_PADRAO` se falhar.
- **Critérios de Aceitação:** Menu abre sem `/api/projetos`.
- **Depende de:** AGENTES-REALTIME.7

### AGENTES-REALTIME.17 — Indicador de conexão na tela (ao vivo, reconectando, offline)

**Próximo passo:** esperar MIGRAR-AGENTES-BROADCAST.3.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Mostrar no HUD o estado do canal Realtime.
- **Critérios de Aceitação:** Três estados visíveis no código do HUD.
- **Depende de:** MIGRAR-AGENTES-BROADCAST.3

### AGENTES-REALTIME.18 — Reconexão com estado completo e descarte de mensagem fora de ordem

**Próximo passo:** esperar AGENTES-REALTIME.14, AGENTES-REALTIME.15.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Ao reconectar, ler o estado inicial de novo e aplicar só mensagens com `sequencia` maior que a atual.
- **Critérios de Aceitação:** Leitura do código: reconectar não duplica nem perde animação.
- **Depende de:** AGENTES-REALTIME.14, AGENTES-REALTIME.15

### AGENTES-REALTIME.19 — Fallback sem Supabase e sem servidor (GitHub raw a cada 30 s)

**Próximo passo:** esperar MIGRAR-AGENTES-BROADCAST.4, AGENTES-REALTIME.5.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Se o canal cai e não há servidor local, a página lê o `STATUS.md` do GitHub a cada 30 s com o leitor JS.
- **Critérios de Aceitação:** Fallback documentado e ativado só após a queda do canal.
- **Depende de:** MIGRAR-AGENTES-BROADCAST.4, AGENTES-REALTIME.5

### AGENTES-REALTIME.20 — Tirar `/api/agentes` e `/api/projetos` do `servidor.py` (conforme a pergunta 4)

**Próximo passo:** esperar AGENTES-REALTIME.15, AGENTES-REALTIME.16, AGENTES-REALTIME.19.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Remover `rota_agentes` e `rota_projetos` e os imports de `quadro_tarefas`; o servidor devolve 404 nessas rotas ou é aposentado.
- **Critérios de Aceitação:** Resposta da pergunta 4 aplicada; `py_compile` ok.
- **Depende de:** AGENTES-REALTIME.15, AGENTES-REALTIME.16, AGENTES-REALTIME.19

### AGENTES-REALTIME.21 — Aposentar `servidor.py`, `config_graphs.py` e o `.env` do dashboard (se a pergunta 4 for a)

**Próximo passo:** esperar AGENTES-REALTIME.20.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Se aposentado: apagar os arquivos e documentar `python -m http.server` (ou abrir `index.html`) como forma de ver a página. Se não, esta subtarefa é cancelada.
- **Critérios de Aceitação:** Nenhum arquivo órfão; INV-5 ok.
- **Depende de:** AGENTES-REALTIME.20

### AGENTES-REALTIME.22 — Variáveis e `.gitignore`: `.env.example` e `config.js`

**Próximo passo:** esperar AGENTES-REALTIME.11.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Acrescentar `SUPABASE_URL` e a chave publicável (vazias) ao `.env.example`/`config.js`; a chave secreta só aparece em comentário "nunca aqui".
- **Critérios de Aceitação:** Nenhum valor real em arquivo versionado.
- **Depende de:** AGENTES-REALTIME.11

### AGENTES-REALTIME.23 — Auditoria de segredo e de exposição

**Próximo passo:** esperar AGENTES-REALTIME.10, AGENTES-REALTIME.22, AGENTES-REALTIME.13.

- **Nível:** PESADO — banco, segurança, segredo ou contrato entre várias partes
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** `git grep` por padrões de chave secreta, conferência de que a chave publicável não lê nenhuma tabela (consulta com ela) e advisors do Supabase.
- **Critérios de Aceitação:** Nenhum achado crítico; resultado na Verificação.
- **Depende de:** AGENTES-REALTIME.10, AGENTES-REALTIME.22, AGENTES-REALTIME.13

### AGENTES-REALTIME.24 — Medir a latência do `push` até o evento recebido

**Próximo passo:** esperar MIGRAR-AGENTES-BROADCAST.2, MIGRAR-AGENTES-BROADCAST.3.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Script Node que assina o canal e mede o tempo entre o push do `STATUS.md` e a mensagem, sem navegador.
- **Critérios de Aceitação:** Tempo medido e registrado (meta: menos de 10 s).
- **Depende de:** MIGRAR-AGENTES-BROADCAST.2, MIGRAR-AGENTES-BROADCAST.3

### AGENTES-REALTIME.25 — Conferir os limites do plano Supabase contra a frequência de pushes

**Próximo passo:** esperar AGENTES-REALTIME.14.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Comparar mensagens por segundo e por mês permitidas com os pushes reais dos projetos liberados.
- **Critérios de Aceitação:** Folga registrada ou plano B (coalescer mais).
- **Depende de:** AGENTES-REALTIME.14

### AGENTES-REALTIME.26 — Documentar o fluxo no `README.md` do dashboard

**Próximo passo:** esperar AGENTES-REALTIME.20.

- **Nível:** LEVE — só texto, configuração simples ou comando de fechamento
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Como configurar, variáveis, secrets, fallback e como voltar ao servidor local.
- **Critérios de Aceitação:** README descreve os três modos e não cita rota removida.
- **Depende de:** AGENTES-REALTIME.20

### AGENTES-REALTIME.27 — Atualizar menções a `/api/agentes` em `AGENTS.md` e docs

**Próximo passo:** esperar AGENTES-REALTIME.20.

- **Nível:** LEVE — só texto, configuração simples ou comando de fechamento
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** `git grep "/api/agentes"` e ajustar o que ficou desatualizado (por exemplo a regra C31).
- **Critérios de Aceitação:** Só o fallback documentado cita a rota.
- **Depende de:** AGENTES-REALTIME.20

### AGENTES-REALTIME.28 — Plano de rollback com a chave `FONTE_AGENTES`

**Próximo passo:** esperar AGENTES-REALTIME.19.

- **Nível:** LEVE — só texto, configuração simples ou comando de fechamento
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Documentar como voltar a `local` (servidor Python) ou `broadcast` sem apagar código.
- **Critérios de Aceitação:** Rollback descrito e conferível por leitura.
- **Depende de:** AGENTES-REALTIME.19

### AGENTES-REALTIME.29 — Conferir no navegador: abre sem servidor e anima ao dar push

**Próximo passo:** esperar a resposta do usuário.

- **Nível:** Usuário — só o usuário pode fazer (resposta, conta ou conferência na tela)
- **Modelo:** Usuário — nunca outro
- **Effort:** — (ação do usuário)
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** O usuário abre a página sem o `servidor.py`, dá push num `STATUS.md` liberado e confere a animação (a IA não abre navegador).
- **Critérios de Aceitação:** Página anima a mudança; indicador "ao vivo".
- **Depende de:** AGENTES-REALTIME.18, AGENTES-REALTIME.24

### AGENTES-REALTIME.30 — Conferência final

**Próximo passo:** esperar AGENTES-REALTIME.23, AGENTES-REALTIME.26, AGENTES-REALTIME.27, AGENTES-REALTIME.28, AGENTES-REALTIME.29.

- **Nível:** MEDIO — código com lógica em poucos arquivos, sem banco
- **Modelo:** só Sonnet — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** `git grep` da rota, `node --check`, `py_compile`, gate da spec, comparação de paridade e secrets.
- **Critérios de Aceitação:** Critério de pronto da etapa inteiro.
- **Depende de:** AGENTES-REALTIME.23, AGENTES-REALTIME.26, AGENTES-REALTIME.27, AGENTES-REALTIME.28, AGENTES-REALTIME.29

### AGENTES-REALTIME.31 — Fechamento: grafo, `STATUS_PROJETO.md` e mover a tarefa para `task_complete.md`

**Próximo passo:** esperar AGENTES-REALTIME.30.

- **Nível:** LEVE — só texto, configuração simples ou comando de fechamento
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Descrição:** Rodar o graphify, atualizar o `STATUS_PROJETO.md` e fechar a mãe.
- **Critérios de Aceitação:** Mãe movida; grafo atualizado.
- **Depende de:** AGENTES-REALTIME.30

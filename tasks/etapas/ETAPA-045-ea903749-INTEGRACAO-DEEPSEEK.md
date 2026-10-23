## Etapa 045-ea903749 — INTEGRACAO-DEEPSEEK: chamadas à API da DeepSeek nas tarefas simples

**Tarefa:** INTEGRACAO-DEEPSEEK · **Pedido em:** 2026-10-23 · **Criada por:** Claude Code (Haiku 5.5) (local · main · consumo-ia)
**Pedido:** "CRIE MAIS 1 TAREFA, DE NOME INTEGRACAO-DEEPSEEK, que deve integrar chamadas de api da deepseek nos modelos de IA nas tarefas mais simples conforme demanda e modelos da deepseek"
**Objetivo:** usar a API da DeepSeek para as tarefas mais simples (LEVE e parte da MEDIO), conforme a demanda, escolhendo o modelo DeepSeek de cada nível, sem tirar a decisão de nível do quadro.

### Escopo

- **Entra:** um cliente da API da DeepSeek; um roteador que escolhe o modelo DeepSeek pelo nível (`LEVE` → `deepseek-flash`; `MEDIO` → `deepseek-flash` com raciocínio; `PESADO` → `deepseek-v4-pro`, só se o usuário liberar); fallback para o modelo atual em qualquer falha; limite de custo e de tempo; auditoria sem texto; documentação.
- **Não entra:** mudar a matriz `regras/niveis-e-modelos.md` (é do usuário); reservar ou executar subtarefa por conta própria; trocar o nível de tarefa existente; mandar ao DeepSeek conteúdo de pasta proibida (C20, C23), `.env` ou diff inteiro; gravar chave em arquivo versionado.
- **Nível da mãe:** tarefa grande (banco não, mas segurança com chave e várias partes). Só começa com o "sim" do usuário ao plano desta etapa.

### Requisitos

- **R1.** QUANDO uma tarefa de nível `LEVE` for classificada, O SISTEMA DEVE usar o modelo `deepseek-flash` pela API da DeepSeek, com o mesmo `effort` da C21 (`low`). **Verificação:** chamada de teste com o texto de uma subtarefa `LEVE` e registro na auditoria.
- **R2.** QUANDO uma tarefa de nível `MEDIO` for classificada, O SISTEMA DEVE usar `deepseek-flash` com raciocínio. **Verificação:** a mesma chamada com o raciocínio ligado e o campo `modelo` gravado.
- **R3.** SE a API da DeepSeek falhar (rede, 401, 429, 529, timeout) OU o custo do dia passar do limite, ENTÃO O SISTEMA DEVE seguir com o modelo da matriz, sem bloquear a sessão. **Verificação:** simular falha com chave inválida e ver o fallback.
- **R4.** O SISTEMA DEVE ler a chave só da variável de ambiente `DEEPSEEK_API_KEY`. **Verificação:** `grep -r` no repositório não acha a chave; o arquivo de exemplo não a contém.
- **R5.** O SISTEMA DEVE gravar, por chamada, data, nível, modelo, tokens, custo e ação, sem o texto. **Verificação:** a linha da auditoria não contém o texto da mensagem.
- **R6.** ONDE a DeepSeek for chamada para `PESADO`, O SISTEMA DEVE pedir liberação do usuário antes. **Verificação:** a regra fica em Decisões.

### Invariantes

- **INV-1.** Nenhuma chave da DeepSeek aparece em log, em arquivo versionado ou na resposta da sessão. **Como conferir:** `git grep -n "sk-"` e leitura dos logs de auditoria (sem resultado = ok).
- **INV-2.** Nenhum caminho de erro vira `liberar` em silêncio: falha → matriz e `revisar`. **Como conferir:** teste de falha da R3.
- **INV-3.** Nenhum nível é rebaixado para caber no DeepSeek (C50, regra maior). **Como conferir:** a coluna Modelo de cada subtarefa continua igual à matriz.

### Perguntas abertas

- ✅ **P1.** Respondida em 2026-10-23: `LEVE` **e** `MEDIO` vão para o DeepSeek (R1 e R2).
- ✅ **P2.** Respondida em 2026-10-23: limite de **US$ 2 por dia** (R3). O limite por chamada (tokens) não foi respondido: o executor da .4 propõe o valor e o usuário confirma antes de gravar.
- ✅ **P3.** Respondida em 2026-10-23: o cliente fica **só no `rules-ai`** (`scripts/deepseek/`).

### Riscos

- **Chave vazada:** guardada só no ambiente; INV-1 confere. Plano B: rotacionar a chave no painel da DeepSeek.
- **Custo alto:** limite de dia (P2). Plano B: desligar com `DEEPSEEK_MODO=off`.
- **Qualidade menor em PT-BR:** o Jev e o Sonnet revisam o que o DeepSeek fizer em `MEDIO`; `LEVE` sem revisão extra.

### Decisões

- 2026-10-23: tarefa criada a pedido do usuário; plano aguarda o "sim" dele; nenhuma subtarefa reservada.
- 2026-10-23: **plano aprovado pelo usuário** ("Aprovo o plano da INTEGRACAO-DEEPSEEK").
- 2026-10-23: **P1** — `LEVE` e `MEDIO` vão para o DeepSeek. **P2** — limite de **US$ 2 por dia**; por chamada, a definir (ver P2). **P3** — cliente só no `rules-ai`.
- 2026-10-23: a `.1` foi concluída; a `.2` (PESADO) está livre para o modelo dela (Sonnet, Opus 5.5+/Fable ou DeepSeek). Este registro não reserva nada.

### INTEGRACAO-DEEPSEEK.1 — Responder P1, P2 e P3 (decisões do usuário)

**Próximo passo:** ✅ concluída em 2026-10-23 (respostas em Decisões).

- **Nível:** Usuário — só o usuário decide
- **Modelo:** Usuário
- **Effort:** — (decisão do usuário)
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** manual
- **Descrição:** Fechar P1, P2 e P3 nesta etapa.
- **Critérios de Aceitação:** P1 a P3 com resposta registrada em Decisões.
- **Depende de:** Nenhuma
- **Verificação:** resposta do usuário na conversa.

### INTEGRACAO-DEEPSEEK.2 — Cliente da API da DeepSeek com chave só em variável de ambiente

**Próximo passo:** começar; plano aprovado e P3 respondida (só no `rules-ai`).

- **Nível:** PESADO — chave e segredo (sinal mais restritivo)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** manual
- **Descrição:** Criar um cliente único para a API da DeepSeek (R4), com redação de segredos (INV-1), tempo máximo e tratamento de erro sem exceção não tratada.
- **Arquivos:** módulo novo em `scripts/deepseek/` (cliente), `.env.example` (só nomes de variáveis)
- **Critérios de Aceitação:** R4 e INV-1 atendidos; sem chave, o cliente sai com erro claro e não chama a API.
- **Depende de:** INTEGRACAO-DEEPSEEK.1
- **Verificação:** a preencher na entrega (INV-1 e R4).

### INTEGRACAO-DEEPSEEK.3 — Roteador de modelo por nível (LEVE e MEDIO)

**Próximo passo:** começar depois da .2.

- **Nível:** MEDIO — código com lógica, de 1 a 3 arquivos
- **Modelo:** só Sonnet ou DeepSeek — nunca outro
- **Effort:** medium
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** manual
- **Descrição:** Escolher o modelo DeepSeek por nível (R1 e R2), com o fallback da R3 e a auditoria da R5.
- **Arquivos:** `scripts/deepseek/roteador.mjs`, `scripts/deepseek/auditoria.mjs`
- **Critérios de Aceitação:** R1, R2, R3 e R5 atendidos.
- **Depende de:** INTEGRACAO-DEEPSEEK.2
- **Verificação:** a preencher na entrega (testes de R1, R2 e R3 pelos comandos do plano).

### INTEGRACAO-DEEPSEEK.4 — Limite de custo, modo `off` e fallback de tempo

**Próximo passo:** começar depois da .3.

- **Nível:** PESADO — custo e segurança (limite que bloqueia gasto)
- **Modelo:** só Opus 5.5+/Fable, Sonnet ou DeepSeek — nunca outro
- **Effort:** high
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** manual
- **Descrição:** Aplicar o limite de US$ 2 por dia (P2), o modo `DEEPSEEK_MODO=off` e o tempo máximo por chamada. Acima do limite, só a matriz.
- **Arquivos:** `scripts/deepseek/limites.mjs`
- **Critérios de Aceitação:** R3 atendida; `off` desliga a chamada sem apagar o código.
- **Depende de:** INTEGRACAO-DEEPSEEK.3
- **Verificação:** a preencher na entrega (teste de falha e de limite).

### INTEGRACAO-DEEPSEEK.5 — Documentar a integração

**Próximo passo:** começar depois da .4.

- **Nível:** LEVE — só texto e configuração
- **Modelo:** só Haiku — nunca outro
- **Effort:** low
- **JEV-AI-SUGGESTION:** NAO
- **Fonte:** manual
- **Descrição:** Escrever `docs/DEEPSEEK-INTEGRACAO.md` (como ligar, desligar, rotacionar a chave e ler a auditoria) e linkar em `regras/niveis-e-modelos.md` só como nota (a matriz fica com o usuário).
- **Arquivos:** `docs/DEEPSEEK-INTEGRACAO.md`
- **Critérios de Aceitação:** o doc cita as variáveis `DEEPSEEK_API_KEY`, `DEEPSEEK_MODO` e o limite de P2.
- **Depende de:** INTEGRACAO-DEEPSEEK.4
- **Verificação:** a preencher na entrega (leitura do doc contra o código).

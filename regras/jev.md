# 🧠 Jev — conselheiro de nível e guardrails (JEV-RULES-AI)

Decidido em 2026-10-18 (etapa 025, JEV-RULES-AI; pedido do usuário registrado na C39); reserva só
pelos sinais desde 2026-10-19 (C42, etapa 028). Vale para todas as IAs e para todo projeto que use o `rules-ai`. Nível e modelo: `niveis-e-modelos.md`.
Effort: `esforco.md`. Quadro: `quadro-de-tarefas.md`. Chave e log: só no computador local.

## O que é

O Jev é um serviço externo (TypeSafe, modelo `jev-1.13.0`, fixo) que responde perguntas fechadas
sobre uma subtarefa ou um texto. O `rules-ai` o usa como **conselheiro**: ele sugere, o código e o
humano decidem. Código em `scripts/jev/` (sem dependência npm nova).

## Quando usar

- **Classificação:** sugerir o nível (`LEVE`, `MEDIO`, `PESADO`) de uma subtarefa do quadro, com o
  `effort` e os modelos elegíveis da matriz.
- **Guardrails** (segunda camada, depois de validação determinística):
  - escopo e critérios de aceite: só **avisam** (ação máxima `revisar`);
  - segredo/PII e pasta proibida (C20, C23): **bloqueiam**;
  - comando destrutivo: **bloqueia** até confirmação humana explícita do alvo exato;
  - aprovação indevida (C32): **bloqueia** a mensagem.

## Caráter consultivo (invariantes)

- ⛔ O Jev **não escreve** no `tasks/STATUS.md`, nas etapas nem no `task_complete.md`.
- ⛔ O Jev **não reserva** subtarefa e **não escolhe** ferramenta.
- ⛔ O Jev **não rebaixa** nível. Sinal de `PESADO` eleva, nunca diminui. Sugestão de `effort` do
  Jev só serve para sinalizar revisão; quem define o `effort` é a C21 pelo nível final.
- ⛔ O Jev **não aprova** plano, não responde permissão e não executa comando.
- A matriz de `niveis-e-modelos.md` e a C21 continuam donas do modelo e do `effort`.

## Modo, rollback e fallback

- Variável `JEV_MODO`: `ativo` (padrão) ou `off`. Com `off`, a classificação segue só pelos sinais
  da skill, sem chamada a nenhum servidor. `off` é o **rollback**.
- Sem `TYPESAFE_API_KEY`, o script sai com erro claro e não liga o modo automático; a classificação
  segue só pelos sinais.
- Falha do Jev (rede, 401, 429, 529, timeout): **não há outro servidor de reserva** (C42). A
  classificação segue só pelos sinais da skill (na dúvida, sobe o nível) e o guardrail devolve
  `revisar`. **Nunca** `liberar` em silêncio.
- Limiar: o Jev usa `confidence`; abaixo de 0,60 a decisão é humana.

## Chave, privacidade e custo

- Chave só em `TYPESAFE_API_KEY` (ambiente ou `.env` local, ignorado pelo Git). Nunca em log, nunca
  em arquivo versionado, nunca impressa.
- Antes de qualquer envio, o texto passa por `redigir.mjs`: mascara chaves (`sk-`, `tsk_`, `Bearer`,
  `ghp_`, JWT), CPF, RG, e-mail e telefone. Segredo bruto nunca vai à API.
- Estado enviado à classificação é **cego**: sem `Nível:`, `Modelo:`, `Effort:`, `nivel_atual` e
  sem nomes de modelo (INV-1).
- Custo por rodada respeita `JEV_MAX_TOKENS`; o script aborta antes de estourar (INV-5).
- Log de auditoria em `scripts/jev/saidas/` (fora do Git): modelo, versão, confiança, limiar, tokens,
  custo, ação e `hash` do conteúdo, **sem o valor sensível**.

## Estado da implementação

- Ativo desde 2026-10-18: cliente, coletor cego, perguntas, matriz, agregação, 6 guardrails, CLI
  `node scripts/jev.mjs classificar | guardrail | avaliar | custo` e a skill `classificar-tarefa`
  (tenta o Jev primeiro; sem chave, `off` ou falha segue só pelos sinais).
- Benchmark cego (180 itens, `scripts/jev/benchmarks/`): nível final 0,60–0,61, só `nivel` 0,66–0,67,
  recall de PESADO 0,883 (final). O "15/15" antigo vazava `nivel_atual` (com ele: 0,85). Uso real: `confianca` < 0,60 pede decisão humana; o Jev não decide sozinho.
- Se o Jev falhar em PT-BR ou em decisão irreversível, não usar a sugestão sem revisão humana.

## Rollback

1. Definir `JEV_MODO=off` no ambiente (ou no `.env` local): o CLI sai com código 2 e a skill segue
   só pelos sinais; guardrails ambíguos viram `revisar`, os determinísticos continuam.
2. Total: copiar `SKILL.md.bak` sobre `SKILL.md` (fonte `.agents` e cópia `.claude`). Medido: segundos.
3. Se for preciso, reverter o commit da integração. Prazo: menos de 10 minutos.

## Limites

- ⛔ Não usar o Jev para decidir sozinho nível, modelo ou `effort` em tarefa `PESADO`.
- ⛔ Não enviar conteúdo de pasta proibida, diff inteiro ou `.env` ao Jev.
- ⛔ Não trocar `jev-1.13.0` por `jev-latest` sem nova validação no benchmark.

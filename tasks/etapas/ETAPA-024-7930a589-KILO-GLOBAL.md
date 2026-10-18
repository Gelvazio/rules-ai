## Etapa 024-7930a589 — KILO-GLOBAL: Kilo Code recebe as regras globais (`~/.config/kilo/AGENTS.md`)

**Tarefa:** KILO-GLOBAL · **Pedido em:** 2026-10-18 14:52 · **Criada por:** DeepSeek Harness (deepseek-flash) (global · main)
**Pedido:** "aplique a integracao" — resposta à análise Kilo × rules-ai documentada em
`C:\fontes\KILO-CODE-IDE\AGENTS.md` (seção 8).
**Objetivo:** fazer o `rules-ai` entregar as regras globais ao **Kilo Code** por um destino nativo no
`sincronizar.mjs` (`~/.config/kilo/AGENTS.md`, modo `embutir`), documentar no `README.md` e conferir
com `--aplicar`.

> 🌐 **GLOBAL:** muda o `scripts/sincronizar.mjs` (vale para a máquina inteira) e o `README.md` do
> `rules-ai`; o arquivo gravado fica fora do repositório (`%USERPROFILE%\.config\kilo\AGENTS.md`).

### Escopo

- **Entra:** destino `Kilo Code` no `sincronizar.mjs` + linha no `README.md`; `--aplicar` e conferência
  do bloco em `%USERPROFILE%\.config\kilo\AGENTS.md`; fechar o quadro.
- **Não entra:** mudar as regras (`regras/*.md`), logo a `VERSAO.md` não muda; a linha do Kilo em
  `regras/niveis-e-modelos.md` (decisão do usuário); instalar o Kilo CLI; `graphify update` (custo de
  modelo, fica para a próxima tarefa do projeto).

### Decisões

| Data | Decisão | Quem | Palavras |
|---|---|---|---|
| 2026-10-18 14:52 | Executar a integração (LEVE) pelo DeepSeek Harness, com autorização direta | Gelvazio | "aplique a integracao" |
| 2026-10-18 14:52 | Modo `embutir` e `criarPasta: true`: o Kilo não usa o `@import` do rules-ai e a pasta `.config\kilo` ainda não existe nesta máquina | DeepSeek Harness | — |

### KILO-GLOBAL.1 — Destino do Kilo Code no `sincronizar.mjs`, README e conferência

**Próximo passo:** conferir o bloco gravado e fechar o quadro.
- **Nível:** LEVE — configuração simples (um item na lista de destinos + linha na tabela).
- **Modelo:** só DeepSeek (Flash) — nunca outro.
- **Descrição:** destino `{ ia: 'Kilo Code', arquivo: join(homedir(), '.config', 'kilo', 'AGENTS.md'), modo: 'embutir', criarPasta: true }`; linha do Kilo na tabela de IAs do `README.md`; rodar `node scripts/sincronizar.mjs` e `--aplicar`; conferir o bloco e a idempotência.
- **Critérios de Aceitação:** `node scripts/sincronizar.mjs` lista o destino do Kilo; `%USERPROFILE%\.config\kilo\AGENTS.md` com o bloco `<!-- rules-ai:inicio ... -->`; segunda execução `igual` para o Kilo; `VERSAO.md` sem mudança; `README.md` cita a IA e o arquivo.
- **Entrega:** em andamento · **Verificação:** em andamento

---

### Entregas desta etapa

| Subtarefa | Commit | Verificação |
|---|---|---|
| KILO-GLOBAL.1 | em andamento | em andamento |

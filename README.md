# rules-ai

Regras de IA **globais**, para todos os projetos de `C:\fontes` e todas as IAs.

## Como funciona

```
regras/*.md            ← fonte única das regras globais (editar só aqui)
CONFLITOS.md           ← regras que divergem entre projetos; só entram depois do "sim" do usuário
scripts/sincronizar.mjs← gera dist/REGRAS-GLOBAIS.md e liga cada IA a ele
dist/                  ← gerado, fora do Git
```

```bash
node scripts/sincronizar.mjs            # mostra o que mudaria
node scripts/sincronizar.mjs --aplicar  # grava (cópia .bak do arquivo original)
```

O script só mexe num **bloco marcado** (`<!-- rules-ai:inicio -->` … `<!-- rules-ai:fim -->`) no
arquivo global da IA; o resto do arquivo fica como está.

| IA | Arquivo global | Como liga | Situação |
|----|----------------|-----------|----------|
| Claude Code | `~/.claude/CLAUDE.md` | `@import` do unificado | ✅ no script |
| Gemini CLI | `~/.gemini/GEMINI.md` | `@import` do unificado | ✅ no script |
| Codex | `~/.codex/AGENTS.md` | embutir o texto | ⏳ fora do script: o arquivo atual contradiz as regras (C6 a C8 em `CONFLITOS.md`) |
| Grok, Cursor, Qoder, Kiro, opencode, DeepSeek, Devin | — | — | ⏳ caminho do arquivo global não confirmado; não adivinhado |

## Precedência

`AGENTS.md`/`CLAUDE.md` do **projeto** vence o global dentro do projeto. Divergência entre
projetos vira linha em `CONFLITOS.md`, e o usuário decide **uma** regra para todos.

## Mudar uma regra

1. Editar o arquivo do assunto em `regras/` (não repetir a regra em outro arquivo).
2. `node scripts/sincronizar.mjs --aplicar`.
3. Commit na `main`.

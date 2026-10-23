# API do quadro (`api/`)

## O que é

Uma API REST local, feita com json-server, que expõe as tarefas do quadro do `rules-ai` para outros
programas lerem sem abrir os `.md`.

- É uma **cópia derivada e só de leitura** do quadro: vem de `tasks/STATUS.md` e
  `tasks/task_complete.md`.
- O quadro continua sendo a **fonte única**. Nunca editar o `db.json` à mão: ele é gerado.
- Não grava nada no quadro e não altera reserva, nível ou status.

## Como instalar

```
cd api
npm install
```

Dependência única: `json-server` 0.17.4 (versão fixa).

## Como gerar

```
npm run gerar
```

O script `gerar-db.mjs` lê o quadro e grava `api/db.json`. Ele entra na subtarefa
API-QUADRO-JSON-SERVER.2; até lá, o `db.json` é só o esqueleto vazio.

## Como subir

```
npm start
```

Sobe em `http://127.0.0.1:3333`, **só no localhost**. Não expor a porta em outra interface.

## Consultas

| Consulta | O que devolve |
|---|---|
| `/tarefas` | todas as tarefas (mães e subtarefas) |
| `/tarefas?concluida=true` | só as concluídas |
| `/tarefas?disponivel=true` | só as livres, com dependências concluídas e sem trava |
| `/tarefas?statusCodigo=em_execucao` | só as que estão em execução |
| `/frentes` | as frentes de trabalho do quadro |

## Arquivos

- `package.json`: scripts `start` e `gerar`, e a dependência json-server.
- `gerar-db.mjs`: gerador do `db.json` (Node puro, sem dependência npm).
- `db.json`: cópia gerada do quadro (fora do Git, ver `.gitignore`).
- `.gitignore`: ignora `node_modules/` e `db.json`.

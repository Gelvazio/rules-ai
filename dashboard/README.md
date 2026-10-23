# Dashboard — Agentes ao vivo

Mostra em 3D o trabalho real dos agentes, lido do `tasks/STATUS.md` do projeto escolhido no menu de
projetos (`/api/projetos` e `/api/agentes?projeto=<pasta>`, só leitura; padrão `rules-ai`).

## Como usar

Rode, a partir de `C:\fontes\rules-ai`:

```
python dashboard/servidor.py
```

Abra http://localhost:8080/. Se o servidor já estava rodando de uma versão anterior, reinicie-o
para ganhar as rotas atuais.

## Agentes ao vivo

Tela inteira, só com o menu em cima. As tarefas pendentes formam um **globo** no centro (bloqueadas
piscam em vermelho e as que aguardam o usuário em amarelo); cada nome da coluna "Em uso por" vira um
personagem **parado** em volta do globo, ligado a ele por um galho (mapa mental de
`dashboard/prompts/modelo.png`), com o nome escrito em cima e as tarefas que está fazendo em ramos que
saem dele, e o **percentual** de cada uma na cabeça (regra C31 do `AGENTS.md`: ` · NN%` no fim da
coluna "Em uso por"); as concluídas vão para um **anel** colado ao globo. Cor do cartão pelo nível.
Reservar e concluir viram voos do cartão. A página lê o quadro a cada 10 s e anima cada mudança só
depois do **atraso** (padrão 30 s, `ATRASO_AGENTES` no `.env`; o seletor na tela vale para o
navegador).

## Menu

`assets/js/menu.js` monta o mesmo menu em todas as páginas (`<nav data-menu>`). Para acrescentar uma
página, basta uma linha em `ITENS_MENU`; uma página esconde links com `data-menu-ocultar`. Acima dele
fica a linha dos projetos (`PROJETOS`), com o projeto atual em destaque.

## Arquivos

- `servidor.py`: serve o dashboard e as rotas `/api/agentes` e `/api/projetos`. Nunca serve `.env`,
  arquivos ocultos nem `.py`.
- `config_graphs.py`: constantes do servidor e leitura do `.env` (`ATRASO_AGENTES`).
- `quadro_tarefas.py`: lê a tabela do `tasks/STATUS.md` para `/api/agentes`.
- `index.html`, `assets/js/agentes.js` e `assets/js/agentes/` (fila com atraso, cena, personagens,
  rótulos, painéis).
- `assets/js/` (`api.js`, `config.js`, `visualizador.js`, `menu.js`) e `assets/css/`.

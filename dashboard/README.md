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
Reservar e concluir viram voos do cartão. A página anima cada mudança só depois do **atraso**
(padrão 30 s, `ATRASO_PADRAO_SEGUNDOS` em `assets/js/config.js`; o seletor na tela vale para o
navegador).

### De onde vem o quadro (três modos)

Não existe servidor Python para isso: a página lê tudo do navegador, e basta servir os arquivos
estáticos (por exemplo `python -m http.server` na pasta `dashboard`).

1. **Canal ao vivo (normal):** a página lê o `tasks/STATUS.md` do GitHub raw uma vez ao abrir e
   assina o canal de Broadcast do Supabase; cada push do quadro chega pelo canal, sem consulta
   periódica. Se o canal cai e volta, a página relê o quadro inteiro.
2. **Fallback do GitHub raw a cada 30 s:** liga **só** quando o canal não está disponível: sem
   chave publicável em `CANAL.chavePublicavel`, ou canal caído por mais de 30 s. Lê o
   `STATUS.md` do GitHub raw a cada `INTERVALO_FALLBACK_SEGUNDOS` (30 s) com o leitor
   `assets/js/agentes/quadro.js`, e **para** assim que o canal volta.
3. **Sem rede:** nada novo chega. A cena fica no último quadro lido, o aviso da página mostra o
   erro da leitura e a página volta sozinha quando a rede voltar (o fallback tenta de novo a cada
   30 s; o canal reconecta e relê o quadro).

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

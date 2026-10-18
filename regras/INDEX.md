# 📚 Índice das regras globais — ordem de leitura

Porta de entrada das regras globais, na ordem de leitura: das que mais mudam o comportamento da IA
para as de assunto específico. No computador local, as IAs recebem tudo junto pelo
`dist/REGRAS-GLOBAIS.md`, montado por `scripts/sincronizar.mjs` nesta ordem (este índice não
entra no `dist/`). Na nuvem, sem `C:\fontes\rules-ai` nem `dist/`, ler a pasta
`rules-local/regras/` do projeto (sem ela, a pasta `regras/` do GitHub `Gelvazio/rules-ai`), nesta
ordem, só para leitura. Regra nova (arquivo novo em `regras/`) entra neste índice no mesmo commit.

## Fluxo de trabalho

1. [ciclo-da-task.md](ciclo-da-task.md) — Ciclo da tarefa: criar, publicar, assumir, encerrar
2. [niveis-e-modelos.md](niveis-e-modelos.md) — Níveis LEVE, MEDIO e PESADO e o modelo de cada um
3. [frentes-e-reserva.md](frentes-e-reserva.md) — Frentes de trabalho e reserva de subtarefas
4. [comando-ponto.md](comando-ponto.md) — Comando ".": atualizar e listar pendências
5. [comando-interrogacao.md](comando-interrogacao.md) — Comando "?": sincronizar e ver o pendente
6. [quadro-de-tarefas.md](quadro-de-tarefas.md) — Quadro: fonte única e modelos de arquivo
7. [exibicao-de-status.md](exibicao-de-status.md) — Status sempre em tabela, com ID (C27)

## Git e validação

8. [git-geral.md](git-geral.md) — Git comum: branch principal, commit por tarefa, push
9. [testes-validacao.md](testes-validacao.md) — Validação sem navegador e sem testes novos

## Código e especificação

10. [codigo-limites-nomes.md](codigo-limites-nomes.md) — Limites de tamanho e nomes em português
11. [codigo-solid.md](codigo-solid.md) — Princípios SOLID no código criado ou alterado
12. [espec.md](espec.md) — Spec em tarefa PESADO: requisitos EARS, invariantes e perguntas (C34)

## Agentes e ferramentas

13. [esforco.md](esforco.md) — Esforço (`effort`) dos agentes, por nível (C21)
14. [graphify.md](graphify.md) — Quando ler e atualizar o grafo do projeto (C11, C25)
15. [gerenciador-centralizado.md](gerenciador-centralizado.md) — Gerenciador de tarefas (C28)
16. [pastas-ignoradas.md](pastas-ignoradas.md) — Pastas offline e paradas, não lidas (C20, C23)
17. [rules-local.md](rules-local.md) — Sessão nova: `rules-local/` e sincronização de tasks (C36)
18. [herdr.md](herdr.md) — herdr: agentes em painéis, quando usar e o que nunca fazer (C33)

## Assuntos específicos

19. [atividades-e-idioma.md](atividades-e-idioma.md) — Idioma e atividades sem empresa fictícia

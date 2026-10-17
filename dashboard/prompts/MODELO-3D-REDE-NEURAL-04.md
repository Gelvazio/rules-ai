# MODELO-3D-REDE-NEURAL-04 — Infográfico "1 agente no lugar de 25 assentos" (animação)

**Imagem de referência:** `MODELO-3D-REDE-NEURAL-04.png` (mesmo infográfico do
`MODELO-3D-REDE-NEURAL-02.png`, num quadro mais adiante da animação).

## O que a imagem mostra

O mesmo layout da imagem 02, com a animação avançada: o organograma marca **15 de 25** assentos
assumidos (em vez de 10), o custo da equipe e o do agente cresceram, e o hexágono "AGENT" está
**ligado aos assentos por linhas verdes com nós vermelhos**, como uma rede que se espalha. Um
retângulo azul destacado percorre a linha dos assentos (o "cursor" da animação). No kanban, a
coluna "Feito" ganhou cartões e o contador da semana está em zero (reiniciou). Na rosca, as fatias
estão parcialmente desenhadas, e o fluxo da receita mostra só as primeiras faixas acesas.

## Prompt (copiar)

```
Use como base a página criada com o prompt MODELO-3D-REDE-NEURAL-02.md e acrescente a animação
mostrada na imagem MODELO-3D-REDE-NEURAL-04.png. Se a página ainda não existir, crie-a seguindo o
prompt 02 primeiro.

Acrescente:
1. Linha do tempo controlada por um único relógio (requestAnimationFrame) com etapas: os assentos
   são assumidos um a um até o limite da configuração (ex.: 15 de 25), e cada etapa atualiza todos
   os cartões ao mesmo tempo.
2. Rede do agente: a cada assento assumido, desenhe uma linha verde (SVG) do hexágono "AGENTE" até
   o assento, com um nó vermelho pulsante na ponta; as linhas formam uma rede que se espalha.
3. Cursor: um retângulo azul com brilho que percorre a linha dos assentos e para no assento da vez.
4. Contadores ("X de 25", custo da equipe, custo do agente) com transição numérica suave a cada
   etapa.
5. Kanban: quando o cursor chega ao fim, o contador da semana volta a zero e os cartões recomeçam
   em "A fazer" (laço infinito).
6. Rosca e Sankey: as fatias e as faixas se desenham aos poucos (stroke-dashoffset) acompanhando
   o progresso da linha do tempo.
7. Controles discretos no topo: Pausar/Continuar, Reiniciar e um seletor de velocidade (1x, 2x, 4x).

Mantenha os nomes genéricos, os números fictícios e o aviso "Infográfico ilustrativo — números
fictícios". Respeite prefers-reduced-motion: com ele ativo, mostre direto o estado final, sem
animação.

Regras de código: a linha do tempo fica num módulo próprio que só emite o progresso (0 a 1); cada
cartão só lê esse progresso e se desenha. Tokens de cor no :root, classes BEM, funções de até
45 linhas, nomes em português sem acentos.
```

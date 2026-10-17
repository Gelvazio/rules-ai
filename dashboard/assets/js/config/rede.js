// Constantes da rede neural didática (sem lógica).

/** Quantidade de neurônios em cada camada, da entrada à saída. */
export const TAMANHOS_CAMADAS = Object.freeze([4, 6, 5, 3]);

/** Semente do gerador pseudoaleatório dos pesos (resultado repetível). */
export const SEMENTE_PESOS = 42;

/** Os pesos iniciais ficam entre -LIMITE_PESO e +LIMITE_PESO. */
export const LIMITE_PESO = 1;

/** Os vieses iniciais ficam entre -LIMITE_VIES e +LIMITE_VIES. */
export const LIMITE_VIES = 0.5;

/** Valores de entrada usados quando o usuário ainda não digitou nada. */
export const ENTRADAS_PADRAO = Object.freeze([0.5, -0.3, 0.8, 0.1]);

/** Nomes das classes da camada de saída. */
export const NOMES_SAIDAS = Object.freeze(['Classe A', 'Classe B', 'Classe C']);

/** Nomes exibidos para cada camada. */
export const NOMES_CAMADAS = Object.freeze(['Entrada', 'Oculta 1', 'Oculta 2', 'Saída']);

/** Casas decimais ao mostrar números na tela. */
export const CASAS_DECIMAIS = 3;

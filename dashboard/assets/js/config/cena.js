// Medidas, tempos e luzes da cena 3D da rede neural (sem lógica).

/** Distância, no eixo X, entre uma camada e a seguinte. */
export const ESPACO_ENTRE_CAMADAS = 4;

/** Distância, no eixo Y, entre dois neurônios da mesma camada. */
export const ESPACO_ENTRE_NEURONIOS = 1.3;

/** Raio da esfera de cada neurônio. */
export const RAIO_NEURONIO = 0.28;

/** Segmentos da esfera (mais = mais redonda e mais pesada). */
export const SEGMENTOS_ESFERA = 24;

/** Raio da esfera de arame que marca o neurônio selecionado. */
export const RAIO_MARCADOR = 0.42;

/** Câmera: posição inicial, abertura e planos de corte. */
export const POSICAO_CAMERA = Object.freeze([0, 1.5, 11]);
export const CAMPO_DE_VISAO = 50;
export const PLANO_PROXIMO = 0.1;
export const PLANO_DISTANTE = 100;

/** Luzes. */
export const INTENSIDADE_LUZ_AMBIENTE = 0.6;
export const INTENSIDADE_LUZ_DIRECIONAL = 1.2;
export const POSICAO_LUZ_DIRECIONAL = Object.freeze([5, 8, 10]);

/** Suavidade do giro com o mouse (OrbitControls). */
export const AMORTECIMENTO_CONTROLES = 0.08;

/** Limite da densidade de pixels (telas de alta resolução). */
export const MAXIMO_PIXEL_RATIO = 2;

/** Atraso entre uma camada e a seguinte acender, em milissegundos. */
export const DURACAO_CAMADA_MS = 600;

/** Tempo que cada camada leva para acender por completo, em milissegundos. */
export const DURACAO_TRANSICAO_MS = 450;

/** Quanto o neurônio cresce quando está totalmente ativo (0,45 = 45%). */
export const ESCALA_ATIVO_EXTRA = 0.45;

/** Brilho próprio do neurônio ativo (0 a 1). */
export const BRILHO_ATIVO = 0.6;

/** Opacidade da ligação de peso quase zero; o maior peso chega a 1. */
export const OPACIDADE_MINIMA_LIGACAO = 0.12;

/** Opacidade extra da ligação enquanto o sinal passa por ela. */
export const OPACIDADE_EXTRA_PULSO = 0.5;

/** Distância do rótulo de valor abaixo do neurônio. */
export const DESLOCAMENTO_ROTULO_VALOR = 0.5;

/** Distância do nome da camada acima do neurônio mais alto. */
export const DESLOCAMENTO_ROTULO_CAMADA = 0.8;

/** Movimento máximo do mouse, em pixels, para contar como clique (e não giro). */
export const LIMIAR_CLIQUE_PX = 5;

// Constantes da página 3D GRAPHS AI (sem lógica).

/** Rotas do servidor local (graphs/servidor.py). */
export const ROTAS = Object.freeze({
  estado: '/api/estado',
  modelos: '/api/modelos',
  gerar: '/api/gerar',
  tarefa: '/api/tarefa/',
});

/** Pasta onde o servidor guarda os GLB gerados. */
export const PASTA_MODELOS = 'modelos/';

/** Intervalo entre consultas do andamento da geração. */
export const INTERVALO_CONSULTA_MS = 4000;

/** Desiste de acompanhar a tarefa depois deste tempo. */
export const TEMPO_MAXIMO_MS = 10 * 60 * 1000;

/** Câmera e luzes da cena. */
export const CENA = Object.freeze({
  corFundo: 0x0b1020,
  campoVisao: 45,
  distanciaInicial: 3,
  velocidadeGiro: 1.2,
});

/** Nomes legíveis dos status da Tripo. */
export const NOMES_STATUS = Object.freeze({
  queued: 'Na fila',
  running: 'Gerando',
  success: 'Pronto',
  failed: 'Falhou',
  banned: 'Recusado pela moderação',
  expired: 'Expirou',
  cancelled: 'Cancelado',
  unknown: 'Desconhecido',
});

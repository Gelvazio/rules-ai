// Cores da cena 3D. A fonte é o :root do base.css; os valores abaixo são a reserva.

/** Nome do token CSS de cada cor usada na cena. */
export const TOKENS_CORES = Object.freeze({
  fundo: '--cor-fundo',
  negativo: '--cor-peso-negativo',
  positivo: '--cor-peso-positivo',
  ativo: '--cor-ativo',
  destaque: '--cor-destaque',
});

/** Valores usados quando o token CSS não existe (mesmos do base.css). */
export const CORES_RESERVA = Object.freeze({
  fundo: '#0b1020',
  negativo: '#3b82f6',
  positivo: '#ef4444',
  ativo: '#facc15',
  destaque: '#7c5cff',
});

/** Cor do neurônio antes de receber sinal. */
export const COR_NEURONIO_APAGADO = '#4b5570';

/** Cor das luzes da cena. */
export const COR_LUZ = '#ffffff';

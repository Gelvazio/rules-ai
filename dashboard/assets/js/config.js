// Constantes da página Agentes ao vivo (sem lógica).

/** Atraso padrão da animação dos agentes, em segundos (o seletor da tela guarda a escolha). */
export const ATRASO_PADRAO_SEGUNDOS = 30;

/** Intervalo da leitura de reserva pelo GitHub raw quando o canal está fora, em segundos. */
export const INTERVALO_FALLBACK_SEGUNDOS = 10;

/**
 * Canal de Broadcast do Supabase (MIGRAR-AGENTES-BROADCAST.3).
 * A chave publicável (sb_publishable_…) é a única permitida aqui; vazia = só o estado inicial.
 */
export const CANAL = Object.freeze({
  url: 'https://hxlvonriearllcmfqeri.supabase.co',
  chavePublicavel: '',
  projeto: 'rules-ai',
  evento: 'estado',
  versaoContrato: 1,
  urlQuadro: 'https://raw.githubusercontent.com/Gelvazio/rules-ai/main/tasks/STATUS.md',
  urlCliente: 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.0/+esm',
});

/** Câmera e luzes da cena. */
export const CENA = Object.freeze({
  corFundo: 0x0b1020,
  campoVisao: 45,
  distanciaInicial: 3,
  velocidadeGiro: 1.2,
});

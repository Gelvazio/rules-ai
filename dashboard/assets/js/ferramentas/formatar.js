// Formatação de valores da aba "Ferramentas de IA 3D" (sem acesso ao DOM).

const FORMATO_REAL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const FORMATO_DATA = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' });

/** Nomes legíveis dos tipos do CLAUDE.md. */
export const NOMES_TIPOS = Object.freeze({
  gerador_modelo_3d: 'Gerador de modelo 3D',
  gerador_imagem_estilo_3d: 'Imagem estilo 3D',
  artigo_comparativo: 'Artigo comparativo',
  reel: 'Reel do Instagram',
  outro: 'Outro',
});

/**
 * Formata um número em reais.
 * @param {number} valor - Valor em R$.
 * @returns {string} Ex.: "R$ 24,95".
 */
export function emReais(valor) {
  return FORMATO_REAL.format(valor);
}

/**
 * Formata uma data ISO para o padrão brasileiro.
 * @param {string} iso - Data ISO (ex.: "2026-10-17T15:22").
 * @returns {string} Data e hora curtas, ou o texto original se não for data.
 */
export function dataCurta(iso) {
  const data = new Date(iso);
  return Number.isNaN(data.getTime()) ? String(iso) : FORMATO_DATA.format(data);
}

/**
 * Menor preço pago (acima de zero) com valor em reais.
 * @param {Array<object>} precos - Preços do site.
 * @returns {object|null} O preço, ou null se não houver.
 */
export function menorPrecoPago(precos) {
  const pagos = precos.filter((p) => typeof p.valor_brl === 'number' && p.valor_brl > 0);
  pagos.sort((a, b) => a.valor_brl - b.valor_brl);
  return pagos[0] ?? null;
}

/**
 * Texto do preço com o valor original e o convertido.
 * @param {object} preco - Preço com texto, moeda e valor_brl.
 * @returns {string} Ex.: "$24 → R$ 121,50" ou "R$ 24,95".
 */
export function textoPreco(preco) {
  if (preco.moeda === 'USD' && typeof preco.valor_brl === 'number') {
    return `${preco.texto} → ${emReais(preco.valor_brl)}`;
  }
  return preco.texto;
}

/**
 * Domínio de uma URL, para rótulos curtos.
 * @param {string} url - Endereço completo.
 * @returns {string} Ex.: "exemplo.com".
 */
export function dominio(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

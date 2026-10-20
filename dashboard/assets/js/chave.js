// Chave da API da Tripo guardada no localStorage deste navegador.

const CHAVE_STORAGE = 'graphs-tripo-api-key';

/** @returns {string} Chave salva, ou '' (inclusive se o armazenamento estiver bloqueado). */
export function lerChave() {
  try {
    return localStorage.getItem(CHAVE_STORAGE) || '';
  } catch {
    return '';
  }
}

/**
 * Salva a chave.
 * @param {string} chave - Chave da Tripo.
 * @returns {boolean} true se salvou.
 */
export function salvarChave(chave) {
  try {
    localStorage.setItem(CHAVE_STORAGE, chave.trim());
    return true;
  } catch {
    return false;
  }
}

/** Apaga a chave salva. */
export function removerChave() {
  try {
    localStorage.removeItem(CHAVE_STORAGE);
  } catch {
    // Sem armazenamento: não há o que remover.
  }
}

/**
 * Esconde o meio da chave para exibição (ex.: "tsk_ab…9xYz").
 * @param {string} chave - Chave completa.
 * @returns {string} Chave mascarada.
 */
export function mascarar(chave) {
  return chave.length > 10 ? `${chave.slice(0, 6)}…${chave.slice(-4)}` : '••••';
}

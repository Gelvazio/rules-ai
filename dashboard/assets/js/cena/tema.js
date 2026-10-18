// Lê as cores da cena nos tokens CSS do :root, com reserva fixa.
import { TOKENS_CORES, CORES_RESERVA } from '../config/cores.js';

/**
 * Devolve as cores da cena lidas do tema da página.
 * @param {HTMLElement} [raiz=document.documentElement] - Elemento que define os tokens.
 * @returns {{fundo: string, negativo: string, positivo: string, ativo: string,
 *   destaque: string}} Cores em texto CSS.
 */
export function lerCoresDoTema(raiz = document.documentElement) {
  const estilo = getComputedStyle(raiz);
  const cores = {};
  Object.entries(TOKENS_CORES).forEach(([nome, token]) => {
    const valor = estilo.getPropertyValue(token).trim();
    cores[nome] = valor || CORES_RESERVA[nome];
  });
  return cores;
}

// Rótulos de texto da cena em HTML (CSS2DRenderer): o navegador desenha o texto, nítido em qualquer
// zoom, e o Three.js só posiciona o elemento sobre o ponto 3D.
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

const ESCALA_PEQUENA = 0.6;

/**
 * Cria um rótulo com uma ou duas linhas.
 * @param {string[]} linhas - Linha principal e, opcional, a secundária.
 * @param {{cor?: string, escala?: number}} opcoes - Cor da linha principal e da borda; tamanho
 *   (abaixo de 0.6 usa a versão pequena).
 * @returns {CSS2DObject} Objeto 3D pronto para posicionar.
 */
export function criarRotulo(linhas, { cor = '#e6e9f2', escala = 1 } = {}) {
  const caixa = document.createElement('div');
  caixa.className = escala < ESCALA_PEQUENA ? 'rotulo3d rotulo3d--pequeno' : 'rotulo3d';
  caixa.style.setProperty('--cor-rotulo', cor);
  const principal = document.createElement('strong');
  principal.textContent = linhas[0] ?? '';
  caixa.append(principal);
  if (linhas[1]) {
    const secundaria = document.createElement('span');
    secundaria.textContent = linhas[1];
    caixa.append(secundaria);
  }
  return new CSS2DObject(caixa);
}

/**
 * Tira da cena e da página um rótulo que não é mais usado.
 * @param {CSS2DObject} rotulo - Rótulo criado por criarRotulo.
 */
export function descartarRotulo(rotulo) {
  rotulo.removeFromParent();
  rotulo.element.remove();
}

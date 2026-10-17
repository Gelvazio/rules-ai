// Rótulos de texto da cena: um canvas vira textura de um sprite (sempre de frente para a câmera).
import * as THREE from 'three';

const LARGURA = 512;
const ALTURA = 128;
const MARGEM = 24;
const MAX_CARACTERES = 34;
const FUNDO = 'rgba(11, 16, 32, 0.85)';
const COR_SECUNDARIA = '#9aa3bd';

const cortar = (texto) => (texto.length > MAX_CARACTERES ? `${texto.slice(0, MAX_CARACTERES - 1)}…` : texto);

function desenharFundo(contexto, corBorda) {
  contexto.fillStyle = FUNDO;
  contexto.strokeStyle = corBorda;
  contexto.lineWidth = 6;
  contexto.beginPath();
  if (contexto.roundRect) contexto.roundRect(4, 4, LARGURA - 8, ALTURA - 8, 22);
  else contexto.rect(4, 4, LARGURA - 8, ALTURA - 8);
  contexto.fill();
  contexto.stroke();
}

/**
 * Cria um rótulo com uma ou duas linhas.
 * @param {string[]} linhas - Linha principal e, opcional, a secundária.
 * @param {{cor?: string, escala?: number}} opcoes - Cor da linha principal e da borda; tamanho.
 * @returns {THREE.Sprite} Sprite pronto para posicionar.
 */
export function criarRotulo(linhas, { cor = '#e6e9f2', escala = 1 } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = LARGURA;
  canvas.height = ALTURA;
  const contexto = canvas.getContext('2d');
  desenharFundo(contexto, cor);
  contexto.textBaseline = 'middle';
  contexto.fillStyle = cor;
  contexto.font = 'bold 40px system-ui, sans-serif';
  contexto.fillText(cortar(linhas[0] ?? ''), MARGEM, linhas[1] ? 44 : 64, LARGURA - MARGEM * 2);
  if (linhas[1]) {
    contexto.fillStyle = COR_SECUNDARIA;
    contexto.font = '30px system-ui, sans-serif';
    contexto.fillText(cortar(linhas[1]), MARGEM, 90, LARGURA - MARGEM * 2);
  }
  const textura = new THREE.CanvasTexture(canvas);
  textura.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: textura, depthWrite: false }));
  sprite.scale.set(2.4 * escala, 0.6 * escala, 1);
  return sprite;
}

/**
 * Libera a textura e o material de um rótulo que saiu da cena.
 * @param {THREE.Sprite} sprite - Rótulo criado por criarRotulo.
 */
export function descartarRotulo(sprite) {
  sprite.removeFromParent();
  sprite.material.map.dispose();
  sprite.material.dispose();
}

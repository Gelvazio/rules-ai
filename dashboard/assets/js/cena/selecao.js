// Seleção de neurônio por clique (Raycaster). Arrastar para girar não conta como clique.
import * as THREE from 'three';
import { LIMIAR_CLIQUE_PX } from '../config/cena.js';

/**
 * Converte a posição do mouse em coordenadas normalizadas da tela (-1 a 1).
 * @param {PointerEvent} evento - Evento do mouse ou toque.
 * @param {HTMLElement} elemento - Canvas da cena.
 * @returns {THREE.Vector2} Coordenadas normalizadas.
 */
function normalizarPonteiro(evento, elemento) {
  const caixa = elemento.getBoundingClientRect();
  const x = ((evento.clientX - caixa.left) / caixa.width) * 2 - 1;
  const y = -((evento.clientY - caixa.top) / caixa.height) * 2 + 1;
  return new THREE.Vector2(x, y);
}

/**
 * Diz se o ponteiro andou pouco entre apertar e soltar (clique, não giro).
 * @param {{x: number, y: number}} inicio - Onde o botão foi apertado.
 * @param {PointerEvent} fim - Evento de soltar.
 * @returns {boolean} Verdadeiro se foi clique.
 */
function foiClique(inicio, fim) {
  const distancia = Math.hypot(fim.clientX - inicio.x, fim.clientY - inicio.y);
  return distancia <= LIMIAR_CLIQUE_PX;
}

/**
 * Liga o clique no canvas à escolha de um neurônio.
 * @param {{elemento: HTMLElement, camera: THREE.Camera, alvos: THREE.Mesh[]}} dados - Onde
 *   clicar, de que câmera olhar e quais esferas podem ser escolhidas.
 * @param {function({indiceCamada: number, indiceNeuronio: number}): void} aoSelecionar -
 *   Chamada com os índices do neurônio clicado.
 * @returns {void}
 */
export function ligarSelecao({ elemento, camera, alvos }, aoSelecionar) {
  const raio = new THREE.Raycaster();
  let inicio = null;

  elemento.addEventListener('pointerdown', (evento) => {
    inicio = { x: evento.clientX, y: evento.clientY };
  });
  elemento.addEventListener('pointerup', (evento) => {
    const clicou = inicio && foiClique(inicio, evento);
    inicio = null;
    if (!clicou) return;

    raio.setFromCamera(normalizarPonteiro(evento, elemento), camera);
    const [acerto] = raio.intersectObjects(alvos, false);
    if (!acerto) return;
    const { indiceCamada, indiceNeuronio } = acerto.object.userData;
    aoSelecionar({ indiceCamada, indiceNeuronio });
  });
}

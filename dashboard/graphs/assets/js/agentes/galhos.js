// Geometria do mapa mental (dashboard/prompts/modelo.png): os agentes ficam parados em volta do
// globo, cada um ligado a ele por um galho grosso, e as tarefas do agente saem dele em ramos finos.
import * as THREE from 'three';

const RAIO_X_AGENTES = 9.6;
const RAIO_Y_AGENTES = 5.8;
const ANGULO_INICIAL = Math.PI * 0.78; // o primeiro agente fica em cima, à esquerda (como no modelo)
const COMPRIMENTO_RAMO = 2.4;
const ABERTURA_RAMOS = 0.5;
const ESPESSURA_GALHO = 0.08;
const CURVA_GALHO = 0.18;
const PONTOS_RAMO = 20;

/**
 * Lugar fixo do agente numa elipse em volta do globo, de frente para a câmera.
 * @param {number} indice - Ordem do agente.
 * @param {number} total - Quantos agentes há.
 * @param {THREE.Vector3} destino - Recebe a posição.
 * @returns {THREE.Vector3} O próprio destino.
 */
export function posicaoDoAgente(indice, total, destino) {
  const angulo = ANGULO_INICIAL - (indice / Math.max(total, 1)) * Math.PI * 2;
  return destino.set(Math.cos(angulo) * RAIO_X_AGENTES, Math.sin(angulo) * RAIO_Y_AGENTES, 0);
}

/**
 * Lugar da tarefa num ramo do agente, aberta em leque para fora do globo.
 * @param {{indice: number, total: number}} vaga - Ordem da tarefa entre as do agente.
 * @param {THREE.Vector3} agente - Posição atual do agente.
 * @param {THREE.Vector3} destino - Recebe a posição.
 * @returns {THREE.Vector3} O próprio destino.
 */
export function posicaoNoRamo({ indice, total }, agente, destino) {
  const angulo = Math.atan2(agente.y, agente.x) + (indice - (total - 1) / 2) * ABERTURA_RAMOS;
  return destino.set(Math.cos(angulo), Math.sin(angulo), 0).multiplyScalar(COMPRIMENTO_RAMO).add(agente);
}

function curvaEntre(de, ate, curvatura) {
  const meio = de.clone().lerp(ate, 0.5);
  const lado = new THREE.Vector3(-(ate.y - de.y), ate.x - de.x, 0).multiplyScalar(curvatura);
  return new THREE.QuadraticBezierCurve3(de.clone(), meio.add(lado), ate.clone());
}

/**
 * Galho grosso do globo até o agente, na cor do agente.
 * @param {string} cor - Cor do agente.
 * @returns {THREE.Mesh} Malha a pôr na cena (a geometria vem em atualizarGalho).
 */
export function criarGalho(cor) {
  return new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshStandardMaterial({
    color: cor, emissive: cor, emissiveIntensity: 0.35, roughness: 0.5,
  }));
}

/**
 * Refaz o galho entre a borda do globo e o agente (só quando o agente se move).
 * @param {THREE.Mesh} galho - Criado por criarGalho.
 * @param {number} raioGlobo - Raio do globo (o galho nasce na superfície).
 * @param {THREE.Vector3} agente - Posição do agente.
 */
export function atualizarGalho(galho, raioGlobo, agente) {
  const inicio = agente.clone().setLength(raioGlobo * 0.95);
  const curva = curvaEntre(inicio, agente, CURVA_GALHO);
  galho.geometry.dispose();
  galho.geometry = new THREE.TubeGeometry(curva, 32, ESPESSURA_GALHO, 8, false);
}

/**
 * Ramo fino do agente até uma tarefa.
 * @param {string} cor - Cor do agente.
 * @returns {THREE.Line} Linha com pontos reservados (atualizados por atualizarRamo).
 */
export function criarRamo(cor) {
  const geometria = new THREE.BufferGeometry()
    .setFromPoints(Array.from({ length: PONTOS_RAMO + 1 }, () => new THREE.Vector3()));
  return new THREE.Line(geometria, new THREE.LineBasicMaterial({ color: cor }));
}

/**
 * Curva o ramo entre o agente e a tarefa.
 * @param {THREE.Line} ramo - Criado por criarRamo.
 * @param {THREE.Vector3} agente - Posição do agente.
 * @param {THREE.Vector3} tarefa - Posição do cartão da tarefa.
 */
export function atualizarRamo(ramo, agente, tarefa) {
  const pontos = curvaEntre(agente, tarefa, -0.12).getPoints(PONTOS_RAMO);
  const posicoes = ramo.geometry.attributes.position;
  pontos.forEach((p, i) => posicoes.setXYZ(i, p.x, p.y, p.z));
  posicoes.needsUpdate = true;
  ramo.geometry.computeBoundingSphere();
}

/**
 * Linha fina e clara da superfície do globo até uma tarefa.
 * @returns {THREE.Line} Linha de 2 pontos (atualizados por atualizarFio).
 */
export function criarFio() {
  const geometria = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
  return new THREE.Line(geometria, new THREE.LineBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.35 }));
}

/**
 * Estica o fio da borda do globo, na direção da tarefa, até a tarefa.
 * @param {THREE.Line} fio - Criado por criarFio.
 * @param {number} raioGlobo - Raio do globo.
 * @param {THREE.Vector3} tarefa - Posição do cartão da tarefa.
 */
export function atualizarFio(fio, raioGlobo, tarefa) {
  const posicoes = fio.geometry.attributes.position;
  const inicio = tarefa.clone().setLength(raioGlobo);
  posicoes.setXYZ(0, inicio.x, inicio.y, inicio.z);
  posicoes.setXYZ(1, tarefa.x, tarefa.y, tarefa.z);
  posicoes.needsUpdate = true;
  fio.geometry.computeBoundingSphere();
}

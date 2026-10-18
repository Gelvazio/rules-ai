// Neurônios da cena: esferas por camada, rótulo de valor e nome de cada camada.
import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { COR_NEURONIO_APAGADO } from '../config/cores.js';
import {
  ESPACO_ENTRE_CAMADAS,
  ESPACO_ENTRE_NEURONIOS,
  RAIO_NEURONIO,
  SEGMENTOS_ESFERA,
  DESLOCAMENTO_ROTULO_VALOR,
  DESLOCAMENTO_ROTULO_CAMADA,
} from '../config/cena.js';

const CLASSE_ROTULO = 'rotulo';
const CLASSE_ROTULO_VALOR = 'rotulo--valor';
const CLASSE_ROTULO_CAMADA = 'rotulo--camada';
const RUGOSIDADE_NEURONIO = 0.45;

/**
 * Calcula a posição de um neurônio: camadas no eixo X, neurônios no eixo Y, tudo centrado.
 * @param {{indiceCamada: number, indiceNeuronio: number, tamanhos: number[]}} local - Onde fica.
 * @returns {THREE.Vector3} Posição na cena.
 */
export function calcularPosicao({ indiceCamada, indiceNeuronio, tamanhos }) {
  const centroCamadas = (tamanhos.length - 1) / 2;
  const centroNeuronios = (tamanhos[indiceCamada] - 1) / 2;
  const x = (indiceCamada - centroCamadas) * ESPACO_ENTRE_CAMADAS;
  const y = (centroNeuronios - indiceNeuronio) * ESPACO_ENTRE_NEURONIOS;
  return new THREE.Vector3(x, y, 0);
}

/**
 * Cria um rótulo HTML preso a um ponto da cena.
 * @param {string} texto - Texto inicial.
 * @param {string} modificador - Classe BEM do tipo de rótulo.
 * @returns {CSS2DObject} Rótulo.
 */
function criarRotulo(texto, modificador) {
  const elemento = document.createElement('div');
  elemento.className = `${CLASSE_ROTULO} ${modificador}`;
  elemento.textContent = texto;
  return new CSS2DObject(elemento);
}

/**
 * Cria a esfera de um neurônio com o rótulo de valor embaixo.
 * @param {{posicao: THREE.Vector3, geometria: THREE.BufferGeometry,
 *   indices: {indiceCamada: number, indiceNeuronio: number}}} dados - Peças do neurônio.
 * @returns {{malha: THREE.Mesh, rotulo: CSS2DObject}} Neurônio.
 */
function criarNeuronio({ posicao, geometria, indices }) {
  const material = new THREE.MeshStandardMaterial({
    color: COR_NEURONIO_APAGADO,
    roughness: RUGOSIDADE_NEURONIO,
  });
  const malha = new THREE.Mesh(geometria, material);
  malha.position.copy(posicao);
  malha.userData = { ...indices };

  const rotulo = criarRotulo('', CLASSE_ROTULO_VALOR);
  rotulo.position.set(0, -DESLOCAMENTO_ROTULO_VALOR, 0);
  malha.add(rotulo);
  return { malha, rotulo };
}

/**
 * Coloca o nome da camada acima do neurônio mais alto dela.
 * @param {{grupo: THREE.Group, posicaoTopo: THREE.Vector3, nome: string}} dados - Onde e o quê.
 * @returns {void}
 */
function adicionarNomeCamada({ grupo, posicaoTopo, nome }) {
  const rotulo = criarRotulo(nome, CLASSE_ROTULO_CAMADA);
  rotulo.position.copy(posicaoTopo).setY(posicaoTopo.y + DESLOCAMENTO_ROTULO_CAMADA);
  grupo.add(rotulo);
}

/**
 * Cria todos os neurônios da rede e os nomes das camadas.
 * @param {{grupo: THREE.Group, tamanhos: number[], nomesCamadas: string[]}} dados - Formato.
 * @returns {{malha: THREE.Mesh, rotulo: CSS2DObject}[][]} Neurônios por camada.
 */
export function criarNeuronios({ grupo, tamanhos, nomesCamadas }) {
  const geometria = new THREE.SphereGeometry(RAIO_NEURONIO, SEGMENTOS_ESFERA, SEGMENTOS_ESFERA);
  return tamanhos.map((quantidade, indiceCamada) => {
    const camada = [];
    for (let indiceNeuronio = 0; indiceNeuronio < quantidade; indiceNeuronio += 1) {
      const indices = { indiceCamada, indiceNeuronio };
      const posicao = calcularPosicao({ ...indices, tamanhos });
      const neuronio = criarNeuronio({ posicao, geometria, indices });
      grupo.add(neuronio.malha);
      camada.push(neuronio);
    }
    const nome = nomesCamadas[indiceCamada] ?? '';
    adicionarNomeCamada({ grupo, posicaoTopo: camada[0].malha.position, nome });
    return camada;
  });
}

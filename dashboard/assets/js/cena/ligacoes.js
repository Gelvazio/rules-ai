// Ligações entre neurônios: cor pelo sinal do peso, opacidade pelo tamanho do peso.
import * as THREE from 'three';
import { LIMITE_PESO } from '../config/rede.js';
import { OPACIDADE_MINIMA_LIGACAO } from '../config/cena.js';

/**
 * Converte o tamanho do peso na opacidade da linha.
 * @param {number} peso - Peso da ligação.
 * @returns {number} Opacidade entre OPACIDADE_MINIMA_LIGACAO e 1.
 */
export function calcularOpacidade(peso) {
  const proporcao = Math.min(Math.abs(peso) / LIMITE_PESO, 1);
  return OPACIDADE_MINIMA_LIGACAO + (1 - OPACIDADE_MINIMA_LIGACAO) * proporcao;
}

/**
 * Cria a linha de uma ligação.
 * @param {{origem: THREE.Vector3, destino: THREE.Vector3, peso: number}} dados - Pontas e peso.
 * @param {{negativo: string, positivo: string}} cores - Cores do tema.
 * @returns {{linha: THREE.Line, opacidadeBase: number}} Ligação.
 */
function criarLinha({ origem, destino, peso }, cores) {
  const geometria = new THREE.BufferGeometry().setFromPoints([origem, destino]);
  const opacidadeBase = calcularOpacidade(peso);
  const material = new THREE.LineBasicMaterial({
    color: peso < 0 ? cores.negativo : cores.positivo,
    transparent: true,
    opacity: opacidadeBase,
  });
  return { linha: new THREE.Line(geometria, material), opacidadeBase };
}

/**
 * Cria as ligações que chegam a uma camada (pesos[j][i]: do neurônio i ao neurônio j).
 * @param {{grupo: THREE.Group, pesos: number[][], origens: object[], destinos: object[]}} dados
 * @param {{negativo: string, positivo: string}} cores - Cores do tema.
 * @returns {{linha: THREE.Line, opacidadeBase: number}[]} Ligações da camada.
 */
function criarLigacoesDaCamada({ grupo, pesos, origens, destinos }, cores) {
  const ligacoes = [];
  pesos.forEach((pesosDoNeuronio, j) => {
    pesosDoNeuronio.forEach((peso, i) => {
      const origem = origens[i].malha.position;
      const destino = destinos[j].malha.position;
      const ligacao = criarLinha({ origem, destino, peso }, cores);
      grupo.add(ligacao.linha);
      ligacoes.push(ligacao);
    });
  });
  return ligacoes;
}

/**
 * Cria todas as ligações da rede. A posição 0 fica vazia (nada chega à entrada).
 * @param {{grupo: THREE.Group, rede: {camadas: {pesos: number[][]}[]},
 *   neuronios: object[][]}} dados - Grupo da cena, rede e neurônios já criados.
 * @param {{negativo: string, positivo: string}} cores - Cores do tema.
 * @returns {{linha: THREE.Line, opacidadeBase: number}[][]} Ligações por camada de destino.
 */
export function criarLigacoes({ grupo, rede, neuronios }, cores) {
  const porCamada = [[]];
  rede.camadas.forEach((camada, posicao) => {
    const dados = {
      grupo,
      pesos: camada.pesos,
      origens: neuronios[posicao],
      destinos: neuronios[posicao + 1],
    };
    porCamada.push(criarLigacoesDaCamada(dados, cores));
  });
  return porCamada;
}

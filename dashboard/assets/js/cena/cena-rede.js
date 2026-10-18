// Monta a cena 3D da rede e oferece a animação da propagação e o clique nos neurônios.
import * as THREE from 'three';
import { RAIO_MARCADOR, SEGMENTOS_ESFERA } from '../config/cena.js';
import { lerCoresDoTema } from './tema.js';
import { criarPalco } from './palco.js';
import { criarNeuronios } from './neuronios.js';
import { criarLigacoes } from './ligacoes.js';
import { criarAnimacao } from './animacao.js';
import { ligarSelecao } from './selecao.js';

const SEGMENTOS_MARCADOR = SEGMENTOS_ESFERA / 2;

/**
 * Cria a esfera de arame que marca o neurônio selecionado (começa escondida).
 * @param {string} cor - Cor do marcador.
 * @returns {THREE.Mesh} Marcador.
 */
function criarMarcador(cor) {
  const geometria = new THREE.SphereGeometry(RAIO_MARCADOR, SEGMENTOS_MARCADOR, SEGMENTOS_MARCADOR);
  const material = new THREE.MeshBasicMaterial({ color: cor, wireframe: true });
  const marcador = new THREE.Mesh(geometria, material);
  marcador.visible = false;
  return marcador;
}

/**
 * Lista as esferas que podem ser clicadas: ocultas e saída (a entrada não tem cálculo).
 * @param {{malha: THREE.Mesh}[][]} neuronios - Neurônios por camada.
 * @returns {THREE.Mesh[]} Esferas clicáveis.
 */
function listarClicaveis(neuronios) {
  return neuronios.slice(1).flat().map((neuronio) => neuronio.malha);
}

/**
 * Cria a cena da rede neural dentro do contêiner.
 * @param {{container: HTMLElement, rede: {tamanhos: number[], camadas: object[]},
 *   nomesCamadas: string[]}} opcoes - Onde desenhar, a rede (só lida) e os nomes das camadas.
 * @returns {{animarPropagacao: function(object): void,
 *   aoSelecionarNeuronio: function(function(object): void): void}} Controle da cena.
 * @throws {Error} Se o navegador não tiver WebGL.
 */
export function criarCenaRede({ container, rede, nomesCamadas }) {
  const cores = lerCoresDoTema();
  const palco = criarPalco({ container, corFundo: cores.fundo });
  const grupo = new THREE.Group();
  palco.cena.add(grupo);

  const neuronios = criarNeuronios({ grupo, tamanhos: rede.tamanhos, nomesCamadas });
  const ligacoes = criarLigacoes({ grupo, rede, neuronios }, cores);
  const animacao = criarAnimacao({ neuronios, ligacoes, corAtiva: cores.ativo });
  const marcador = criarMarcador(cores.destaque);
  grupo.add(marcador);

  const ouvintes = [];
  const alvos = listarClicaveis(neuronios);
  ligarSelecao({ elemento: palco.elemento, camera: palco.camera, alvos }, (indices) => {
    marcador.position.copy(neuronios[indices.indiceCamada][indices.indiceNeuronio].malha.position);
    marcador.visible = true;
    ouvintes.forEach((ouvinte) => ouvinte(indices));
  });
  palco.iniciarLaco(() => animacao.atualizar(performance.now()));

  return {
    animarPropagacao: (resultado) => animacao.iniciar(resultado, performance.now()),
    aoSelecionarNeuronio: (ouvinte) => ouvintes.push(ouvinte),
  };
}

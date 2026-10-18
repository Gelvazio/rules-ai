// Palco da cena: renderizadores (WebGL e rótulos HTML), câmera, luzes e controles.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { COR_LUZ } from '../config/cores.js';
import {
  POSICAO_CAMERA,
  CAMPO_DE_VISAO,
  PLANO_PROXIMO,
  PLANO_DISTANTE,
  INTENSIDADE_LUZ_AMBIENTE,
  INTENSIDADE_LUZ_DIRECIONAL,
  POSICAO_LUZ_DIRECIONAL,
  AMORTECIMENTO_CONTROLES,
  MAXIMO_PIXEL_RATIO,
} from '../config/cena.js';

const CLASSE_CAMADA_ROTULOS = 'cena__rotulos';
const CLASSE_TELA = 'cena__tela';

/**
 * Cria o renderizador WebGL e coloca o canvas no contêiner.
 * @param {HTMLElement} container - Onde a cena é desenhada.
 * @returns {THREE.WebGLRenderer} Renderizador.
 */
function criarRenderizador(container) {
  const renderizador = new THREE.WebGLRenderer({ antialias: true });
  renderizador.setPixelRatio(Math.min(window.devicePixelRatio, MAXIMO_PIXEL_RATIO));
  renderizador.domElement.classList.add(CLASSE_TELA);
  container.appendChild(renderizador.domElement);
  return renderizador;
}

/**
 * Cria o renderizador dos rótulos HTML (nítidos em qualquer zoom).
 * @param {HTMLElement} container - Onde a cena é desenhada.
 * @returns {CSS2DRenderer} Renderizador dos rótulos.
 */
function criarRenderizadorRotulos(container) {
  const renderizador = new CSS2DRenderer();
  renderizador.domElement.classList.add(CLASSE_CAMADA_ROTULOS);
  container.appendChild(renderizador.domElement);
  return renderizador;
}

/**
 * Acrescenta a luz ambiente e a luz direcional.
 * @param {THREE.Scene} cena - Cena.
 * @returns {void}
 */
function adicionarLuzes(cena) {
  cena.add(new THREE.AmbientLight(COR_LUZ, INTENSIDADE_LUZ_AMBIENTE));
  const direcional = new THREE.DirectionalLight(COR_LUZ, INTENSIDADE_LUZ_DIRECIONAL);
  direcional.position.set(...POSICAO_LUZ_DIRECIONAL);
  cena.add(direcional);
}

/**
 * Cria a câmera em perspectiva olhando para o centro da rede.
 * @returns {THREE.PerspectiveCamera} Câmera.
 */
function criarCamera() {
  const camera = new THREE.PerspectiveCamera(CAMPO_DE_VISAO, 1, PLANO_PROXIMO, PLANO_DISTANTE);
  camera.position.set(...POSICAO_CAMERA);
  return camera;
}

/**
 * Liga o ajuste de tamanho ao contêiner (aba escondida tem tamanho 0 e é ignorada).
 * @param {{container: HTMLElement, camera: THREE.PerspectiveCamera,
 *   renderizadores: {setSize: function(number, number): void}[]}} partes - Peças do palco.
 * @returns {void}
 */
function ligarRedimensionamento({ container, camera, renderizadores }) {
  const redimensionar = () => {
    const { clientWidth: largura, clientHeight: altura } = container;
    if (!largura || !altura) return;
    camera.aspect = largura / altura;
    camera.updateProjectionMatrix();
    renderizadores.forEach((renderizador) => renderizador.setSize(largura, altura));
  };
  new ResizeObserver(redimensionar).observe(container);
  redimensionar();
}

/**
 * Monta o palco da cena dentro do contêiner.
 * @param {{container: HTMLElement, corFundo: string}} opcoes - Contêiner e cor de fundo.
 * @returns {{cena: THREE.Scene, camera: THREE.PerspectiveCamera, elemento: HTMLCanvasElement,
 *   iniciarLaco: function(function(): void): void}} Palco pronto.
 * @throws {Error} Se o navegador não tiver WebGL.
 */
export function criarPalco({ container, corFundo }) {
  const cena = new THREE.Scene();
  cena.background = new THREE.Color(corFundo);
  adicionarLuzes(cena);

  const camera = criarCamera();
  const renderizador = criarRenderizador(container);
  const renderizadorRotulos = criarRenderizadorRotulos(container);
  const controles = new OrbitControls(camera, renderizador.domElement);
  controles.enableDamping = true;
  controles.dampingFactor = AMORTECIMENTO_CONTROLES;
  const renderizadores = [renderizador, renderizadorRotulos];
  ligarRedimensionamento({ container, camera, renderizadores });

  const iniciarLaco = (aCadaQuadro) => {
    renderizador.setAnimationLoop(() => {
      aCadaQuadro();
      controles.update();
      renderizador.render(cena, camera);
      renderizadorRotulos.render(cena, camera);
    });
  };
  return { cena, camera, elemento: renderizador.domElement, iniciarLaco };
}

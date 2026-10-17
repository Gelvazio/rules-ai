// Cena Three.js que mostra um GLB (ou um exemplo procedural quando não há modelos).
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CENA } from './config.js';

export function criarBase(conteiner) {
  const renderizador = new THREE.WebGLRenderer({ antialias: true });
  renderizador.setPixelRatio(window.devicePixelRatio);
  renderizador.outputColorSpace = THREE.SRGBColorSpace;
  conteiner.prepend(renderizador.domElement);
  const cena = new THREE.Scene();
  cena.background = new THREE.Color(CENA.corFundo);
  cena.add(new THREE.HemisphereLight(0xffffff, 0x334155, 2.2));
  const sol = new THREE.DirectionalLight(0xffffff, 2);
  sol.position.set(3, 5, 4);
  cena.add(sol);
  const camera = new THREE.PerspectiveCamera(CENA.campoVisao, 1, 0.01, 1000);
  camera.position.set(0, 0.6, CENA.distanciaInicial);
  const controles = new OrbitControls(camera, renderizador.domElement);
  controles.enableDamping = true;
  controles.autoRotate = true;
  controles.autoRotateSpeed = CENA.velocidadeGiro;
  return { renderizador, cena, camera, controles };
}

export function ajustarTamanho(base, conteiner) {
  const { clientWidth: largura, clientHeight: altura } = conteiner;
  base.renderizador.setSize(largura, altura);
  base.camera.aspect = largura / Math.max(altura, 1);
  base.camera.updateProjectionMatrix();
}

/** Centraliza o objeto na origem e o escala para caber em 2 unidades. */
export function enquadrar(objeto) {
  const caixa = new THREE.Box3().setFromObject(objeto);
  const tamanho = caixa.getSize(new THREE.Vector3()).length() || 1;
  objeto.scale.multiplyScalar(2 / tamanho);
  caixa.setFromObject(objeto);
  objeto.position.sub(caixa.getCenter(new THREE.Vector3()));
}

function criarExemplo() {
  const grupo = new THREE.Group();
  const forma = new THREE.TorusKnotGeometry(0.6, 0.2, 160, 24);
  grupo.add(new THREE.Mesh(forma, new THREE.MeshStandardMaterial({ color: 0x7c5cff, roughness: 0.35 })));
  const arame = new THREE.LineSegments(new THREE.WireframeGeometry(forma),
    new THREE.LineBasicMaterial({ color: 0xa5b4fc, transparent: true, opacity: 0.15 }));
  grupo.add(arame);
  return grupo;
}

/**
 * Cria o visualizador no contêiner.
 * @param {HTMLElement} conteiner - Elemento da cena.
 * @returns {{mostrarExemplo: function(): void, carregarModelo: function(string): Promise<void>}}
 */
export function criarVisualizador(conteiner) {
  const base = criarBase(conteiner);
  const carregador = new GLTFLoader();
  let atual = null;
  const trocar = (objeto) => {
    if (atual) base.cena.remove(atual);
    enquadrar(objeto);
    base.cena.add(objeto);
    atual = objeto;
  };
  ajustarTamanho(base, conteiner);
  window.addEventListener('resize', () => ajustarTamanho(base, conteiner));
  base.renderizador.setAnimationLoop(() => {
    base.controles.update();
    base.renderizador.render(base.cena, base.camera);
  });
  return {
    mostrarExemplo: () => trocar(criarExemplo()),
    carregarModelo: async (url) => trocar((await carregador.loadAsync(url)).scene),
  };
}

// Formas simples (sem IA) usadas enquanto o GLB do objeto não foi gerado, e troca pelo GLB.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const carregador = new GLTFLoader();

function material(cor, brilho = 0.25) {
  return new THREE.MeshStandardMaterial({ color: cor, emissive: cor, emissiveIntensity: brilho, roughness: 0.4 });
}

function criarVoxel(cor) {
  const grupo = new THREE.Group();
  const cubo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
  for (let x = -1; x <= 1; x += 1) {
    for (let y = -1; y <= 1; y += 1) {
      for (let z = -1; z <= 1; z += 1) {
        const peca = new THREE.Mesh(cubo, material(cor, 0.15));
        peca.position.set(x * 0.31, y * 0.31, z * 0.31);
        grupo.add(peca);
      }
    }
  }
  return grupo;
}

function criarEsfera(cor) {
  return new THREE.Mesh(new THREE.SphereGeometry(0.5, 48, 32), material(cor, 0.6));
}

function criarHexagono(cor) {
  const peca = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.18, 6), material(cor, 0.5));
  peca.rotation.x = Math.PI / 2;
  const borda = new THREE.LineSegments(new THREE.EdgesGeometry(peca.geometry),
    new THREE.LineBasicMaterial({ color: 0xffffff }));
  peca.add(borda);
  return peca;
}

function criarCadeira(cor) {
  const grupo = new THREE.Group();
  const assento = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.5), material(cor, 0.1));
  const encosto = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.08), material(cor, 0.1));
  encosto.position.set(0, 0.29, -0.21);
  const pe = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.4), material(cor, 0.1));
  pe.position.y = -0.24;
  grupo.add(assento, encosto, pe);
  return grupo;
}

const FABRICAS = { voxel: criarVoxel, esfera: criarEsfera, hexagono: criarHexagono, cadeira: criarCadeira };

/**
 * Embrulha o objeto num grupo centralizado com a maior dimensão igual a `tamanho`.
 * @param {THREE.Object3D} objeto - Malha ou cena do GLB.
 * @param {number} tamanho - Maior dimensão desejada.
 * @returns {THREE.Group} Grupo pronto para posicionar.
 */
export function encaixar(objeto, tamanho) {
  const caixa = new THREE.Box3().setFromObject(objeto);
  const medidas = caixa.getSize(new THREE.Vector3());
  objeto.scale.multiplyScalar(tamanho / (Math.max(medidas.x, medidas.y, medidas.z) || 1));
  caixa.setFromObject(objeto);
  objeto.position.sub(caixa.getCenter(new THREE.Vector3()));
  const grupo = new THREE.Group();
  grupo.add(objeto);
  return grupo;
}

/**
 * Cria o objeto da cena: o GLB gerado, se existir; senão a forma simples.
 * @param {object} definicao - Objeto do JSON da cena (forma_simples, cor, arquivo).
 * @param {number} tamanho - Maior dimensão.
 * @returns {Promise<{grupo: THREE.Group, origem: string}>} Grupo e "glb" ou "forma".
 */
export async function criarObjeto(definicao, tamanho) {
  if (definicao.arquivo) {
    try {
      const gltf = await carregador.loadAsync(definicao.arquivo);
      return { grupo: encaixar(gltf.scene, tamanho), origem: 'glb' };
    } catch {
      // GLB corrompido ou ausente: cai na forma simples.
    }
  }
  const fabrica = FABRICAS[definicao.forma_simples] ?? criarEsfera;
  return { grupo: encaixar(fabrica(new THREE.Color(definicao.cor)), tamanho), origem: 'forma' };
}

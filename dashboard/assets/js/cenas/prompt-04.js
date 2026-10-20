// Cena 3D do prompt MODELO-3D-REDE-NEURAL-04: a rede do agente tomando os assentos.
// Monta os objetos uma vez e, a cada quadro, só lê o progresso (0 a 1) para se desenhar.
import * as THREE from 'three';
import { criarObjeto } from './formas.js';

const ESPACO_ASSENTO = 0.5;
const POSICAO_HEXAGONO = new THREE.Vector3(7.6, 0.2, 0);
const ALTURA_PERSONAGENS = 2.6;
const VERDE = 0x22c55e;
const VERMELHO = 0xef4444;
const AZUL = 0x60a5fa;

function posicaoAssento(indice, total) {
  return new THREE.Vector3((indice - (total - 1) / 2) * ESPACO_ASSENTO, 0, 0);
}

function arcoTracejado(de, ate) {
  const meio = de.clone().lerp(ate, 0.5).add(new THREE.Vector3(0, 0.8, 0));
  const curva = new THREE.QuadraticBezierCurve3(de, meio, ate);
  const linha = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curva.getPoints(40)),
    new THREE.LineDashedMaterial({ color: 0x94a3b8, dashSize: 0.12, gapSize: 0.08 }));
  linha.computeLineDistances();
  return linha;
}

async function montarPersonagens(cena, definicoes, origens) {
  const personagens = definicoes.filter((d) => d.papel === 'personagem');
  const grupos = [];
  for (const [indice, definicao] of personagens.entries()) {
    const { grupo, origem } = await criarObjeto(definicao, 1);
    grupo.position.set((indice - 1) * 3, ALTURA_PERSONAGENS, 0);
    cena.add(grupo);
    grupos.push(grupo);
    origens[definicao.id] = origem;
  }
  for (let i = 0; i < grupos.length - 1; i += 1) {
    cena.add(arcoTracejado(grupos[i].position, grupos[i + 1].position));
  }
  return grupos;
}

function criarLigacao(cena) {
  const geometria = new THREE.BufferGeometry().setFromPoints([POSICAO_HEXAGONO, POSICAO_HEXAGONO.clone()]);
  const linha = new THREE.Line(geometria, new THREE.LineBasicMaterial({ color: VERDE }));
  const no = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 12),
    new THREE.MeshBasicMaterial({ color: VERMELHO }));
  linha.visible = false;
  no.visible = false;
  cena.add(linha, no);
  return { linha, no };
}

async function montarAssentos(cena, definicao, total, origens) {
  const { grupo: modelo, origem } = await criarObjeto(definicao, 0.42);
  origens[definicao.id] = origem;
  const anelGeo = new THREE.RingGeometry(0.16, 0.22, 32);
  return Array.from({ length: total }, (_, indice) => {
    const assento = modelo.clone(true);
    assento.position.copy(posicaoAssento(indice, total));
    const anel = new THREE.Mesh(anelGeo, new THREE.MeshBasicMaterial({ color: VERDE, transparent: true, opacity: 0 }));
    anel.rotation.x = -Math.PI / 2;
    anel.position.copy(assento.position).add(new THREE.Vector3(0, -0.24, 0));
    cena.add(assento, anel);
    return { assento, anel, ligacao: criarLigacao(cena), topo: assento.position.clone().add(new THREE.Vector3(0, 0.3, 0)) };
  });
}

function criarCursor(cena) {
  const cursor = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.8, 0.46),
    new THREE.MeshBasicMaterial({ color: AZUL, transparent: true, opacity: 0.22 }));
  cursor.add(new THREE.LineSegments(new THREE.EdgesGeometry(cursor.geometry),
    new THREE.LineBasicMaterial({ color: AZUL })));
  cena.add(cursor);
  return cursor;
}

function desenharAssento(item, estado, tempo) {
  const { anel, ligacao, topo } = item;
  const ativo = estado > 0;
  anel.material.opacity = Math.min(estado, 1) * 0.9;
  ligacao.linha.visible = ativo;
  ligacao.no.visible = estado >= 1;
  if (!ativo) return;
  const ponta = POSICAO_HEXAGONO.clone().lerp(topo, Math.min(estado, 1));
  ligacao.linha.geometry.attributes.position.setXYZ(1, ponta.x, ponta.y, ponta.z);
  ligacao.linha.geometry.attributes.position.needsUpdate = true;
  ligacao.no.position.copy(topo);
  ligacao.no.scale.setScalar(1 + 0.35 * Math.sin(tempo * 6 + topo.x));
}

/**
 * Monta a cena do prompt 04.
 * @param {THREE.Scene} cena - Cena Three.js.
 * @param {object} dados - JSON da cena (config e objetos com `arquivo`).
 * @returns {Promise<{desenhar: function(number, number): object, origens: object}>}
 */
export async function montarCenaPrompt04(cena, dados) {
  const { assentos: total, meta_assentos: meta } = dados.config;
  const origens = {};
  const porPapel = (papel) => dados.objetos.find((o) => o.papel === papel);
  const personagens = await montarPersonagens(cena, dados.objetos, origens);
  const assentos = await montarAssentos(cena, porPapel('assento'), total, origens);
  const { grupo: hexagono, origem } = await criarObjeto(porPapel('nucleo'), 1.1);
  origens[porPapel('nucleo').id] = origem;
  hexagono.position.copy(POSICAO_HEXAGONO);
  cena.add(hexagono);
  const cursor = criarCursor(cena);
  return {
    origens,
    desenhar(progresso, tempo) {
      const avancado = progresso * meta;
      assentos.forEach((item, indice) => desenharAssento(item, indice < meta ? avancado - indice : 0, tempo));
      const atual = Math.min(Math.floor(avancado), meta - 1);
      cursor.position.lerp(assentos[atual].assento.position, 0.15);
      personagens.forEach((p, i) => { p.position.y = ALTURA_PERSONAGENS + 0.08 * Math.sin(tempo * 2 + i); });
      hexagono.rotation.y = Math.sin(tempo) * 0.3;
      return { assumidos: Math.min(Math.floor(avancado + 1e-6), meta) };
    },
  };
}

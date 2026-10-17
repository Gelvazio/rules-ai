// Cena 3D da página "Agentes ao vivo": uma trilha por status, um cartão por subtarefa do quadro e
// um personagem por agente, ligado por uma linha às tarefas que está fazendo.
import * as THREE from 'three';
import { criarPersonagem } from './personagens.js';
import { criarRotulo, descartarRotulo } from './rotulos.js';

export const TRILHAS = Object.freeze([
  { status: 'pendente', nome: 'Pendente' },
  { status: 'progresso', nome: 'Em progresso' },
  { status: 'aguardando', nome: 'Aguardando o usuário' },
  { status: 'bloqueado', nome: 'Bloqueado' },
  { status: 'concluido', nome: 'Concluído' },
]);
const COR_NIVEL = Object.freeze({ LEVE: '#f59e0b', MEDIO: '#3b82f6', PESADO: '#ec4899', USUARIO: '#94a3b8' });
const COR_SEM_NIVEL = '#64748b';
const COR_PULSO = Object.freeze({
  concluida: 0x22c55e, bloqueada: 0xef4444, aguardando: 0xfacc15, reservada: 0xffffff, nova: 0x7c5cff,
});
const LARGURA_TRILHA = 3.2;
const ESPACO_CARTAO = 0.78;
const MAX_POR_TRILHA = 12;
const ALTURA_SOBRE_CARTAO = 1.4;
const VELOCIDADE = 3;
const QUEDA_PULSO = 0.5;

const xDaTrilha = (indice) => (indice - (TRILHAS.length - 1) / 2) * LARGURA_TRILHA;
const corDoNivel = (nivel) => COR_NIVEL[nivel] ?? COR_SEM_NIVEL;
const segura = (cartao) => Boolean(cartao.tarefa.agente) && cartao.tarefa.status !== 'concluido';
const posicaoDescanso = (indice) => new THREE.Vector3(-6.4 + indice * 2.8, 2.6, 2.4);

function criarTrilhas(cena) {
  const comprimento = MAX_POR_TRILHA * ESPACO_CARTAO + 0.6;
  return TRILHAS.map((trilha, indice) => {
    const piso = new THREE.Mesh(new THREE.PlaneGeometry(LARGURA_TRILHA - 0.3, comprimento),
      new THREE.MeshStandardMaterial({ color: 0x141a2e, roughness: 0.9 }));
    piso.rotation.x = -Math.PI / 2;
    piso.position.set(xDaTrilha(indice), 0, -comprimento / 2 + 0.6);
    cena.add(piso);
    return { ...trilha, x: xDaTrilha(indice), total: -1, rotulo: null, cena };
  });
}

function atualizarRotuloTrilha(trilha, total) {
  if (trilha.total === total) return;
  trilha.total = total;
  if (trilha.rotulo) descartarRotulo(trilha.rotulo);
  const extra = total > MAX_POR_TRILHA ? ` (${MAX_POR_TRILHA} visíveis)` : '';
  trilha.rotulo = criarRotulo([trilha.nome, `${total} tarefa${total === 1 ? '' : 's'}${extra}`]);
  trilha.rotulo.position.set(trilha.x, 0.45, 1.3);
  trilha.cena.add(trilha.rotulo);
}

function criarCartao(cena, tarefa) {
  const cor = corDoNivel(tarefa.nivel);
  const malha = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.14, 0.56),
    new THREE.MeshStandardMaterial({ color: cor, emissive: 0x000000, roughness: 0.5 }));
  const rotulo = criarRotulo([tarefa.tarefa, tarefa.titulo], { cor, escala: 0.95 });
  rotulo.position.y = 0.42;
  const grupo = new THREE.Group();
  grupo.add(malha, rotulo);
  grupo.position.set(0, 4, 0);
  cena.add(grupo);
  return { tarefa, grupo, malha, rotulo, alvo: new THREE.Vector3(), pulso: 0, mudouEm: 0 };
}

function removerCartao(estado, id) {
  const cartao = estado.cartoes.get(id);
  if (!cartao) return;
  descartarRotulo(cartao.rotulo);
  cartao.grupo.removeFromParent();
  cartao.malha.geometry.dispose();
  cartao.malha.material.dispose();
  estado.cartoes.delete(id);
}

function garantirAgente(estado, nome) {
  if (!nome || estado.agentes.has(nome)) return;
  const personagem = criarPersonagem(nome);
  personagem.base.copy(posicaoDescanso(estado.agentes.size));
  estado.cena.add(personagem.grupo);
  estado.agentes.set(nome, personagem);
}

const ordemNaTrilha = (a, b) => b.mudouEm - a.mudouEm || a.tarefa.indice - b.tarefa.indice;

function posicionarCartoes(estado) {
  TRILHAS.forEach((trilha, indice) => {
    const lista = [...estado.cartoes.values()].filter((c) => c.tarefa.status === trilha.status);
    lista.sort(ordemNaTrilha).forEach((cartao, posicao) => {
      cartao.alvo.set(xDaTrilha(indice), 0.07, -posicao * ESPACO_CARTAO);
      cartao.grupo.visible = posicao < MAX_POR_TRILHA;
    });
    atualizarRotuloTrilha(estado.trilhas[indice], lista.length);
  });
}

function posicionarAgentes(estado) {
  let livres = 0;
  for (const personagem of estado.agentes.values()) {
    const cartao = [...estado.cartoes.values()]
      .find((c) => c.tarefa.agente === personagem.nome && segura(c) && c.grupo.visible);
    if (cartao) personagem.alvo.copy(cartao.alvo).add(new THREE.Vector3(0, ALTURA_SOBRE_CARTAO, 0));
    else personagem.alvo.copy(posicaoDescanso(livres++));
  }
}

function criarLinha(estado, cartao) {
  const personagem = estado.agentes.get(cartao.tarefa.agente);
  const geometria = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
  const linha = new THREE.Line(geometria, new THREE.LineBasicMaterial({ color: personagem.cor }));
  estado.cena.add(linha);
  return { linha, cartao, personagem };
}

function descartarLinha(item) {
  item.linha.removeFromParent();
  item.linha.geometry.dispose();
  item.linha.material.dispose();
}

function sincronizarLinhas(estado) {
  for (const [id, item] of estado.linhas) {
    const cartao = estado.cartoes.get(id);
    if (!cartao || !segura(cartao) || item.personagem.nome !== cartao.tarefa.agente) {
      descartarLinha(item);
      estado.linhas.delete(id);
    }
  }
  for (const [id, cartao] of estado.cartoes) {
    if (segura(cartao) && !estado.linhas.has(id)) estado.linhas.set(id, criarLinha(estado, cartao));
  }
}

function reorganizar(estado) {
  posicionarCartoes(estado);
  posicionarAgentes(estado);
  sincronizarLinhas(estado);
}

function pulsar(cartao, tipo) {
  const cor = COR_PULSO[tipo];
  if (cor === undefined) return;
  cartao.malha.material.emissive.setHex(cor);
  cartao.pulso = 1;
}

function aplicarEvento(estado, evento) {
  const { tipo, tarefa } = evento;
  if (tipo === 'removida') {
    removerCartao(estado, tarefa.tarefa);
  } else {
    const cartao = estado.cartoes.get(tarefa.tarefa) ?? criarCartao(estado.cena, tarefa);
    estado.cartoes.set(tarefa.tarefa, cartao);
    cartao.tarefa = tarefa;
    estado.contador += 1;
    cartao.mudouEm = estado.contador;
    pulsar(cartao, tipo);
    garantirAgente(estado, tarefa.agente);
  }
  reorganizar(estado);
}

function sincronizar(estado, tarefas) {
  for (const tarefa of tarefas.filter((t) => !t.mae)) {
    estado.cartoes.set(tarefa.tarefa, criarCartao(estado.cena, tarefa));
    garantirAgente(estado, tarefa.agente);
  }
  reorganizar(estado);
  estado.cartoes.forEach((c) => c.grupo.position.copy(c.alvo));
  estado.agentes.forEach((p) => p.base.copy(p.alvo));
}

function desenharCartoes(estado, fator, dt) {
  for (const cartao of estado.cartoes.values()) {
    cartao.grupo.position.lerp(cartao.alvo, fator);
    cartao.pulso = Math.max(0, cartao.pulso - dt * QUEDA_PULSO);
    cartao.malha.material.emissiveIntensity = cartao.pulso * 1.4;
    if (!estado.reduzir) cartao.malha.scale.y = 1 + cartao.pulso * 2;
  }
}

function desenharAgentesELinhas(estado, fator, tempo) {
  let indice = 0;
  for (const personagem of estado.agentes.values()) {
    personagem.base.lerp(personagem.alvo, fator);
    personagem.grupo.position.copy(personagem.base);
    if (!estado.reduzir) personagem.grupo.position.y += 0.08 * Math.sin(tempo * 2 + indice);
    indice += 1;
  }
  for (const { linha, cartao, personagem } of estado.linhas.values()) {
    const pontos = linha.geometry.attributes.position;
    const { x, y, z } = personagem.grupo.position;
    pontos.setXYZ(0, x, y - 0.35, z);
    pontos.setXYZ(1, cartao.grupo.position.x, cartao.grupo.position.y + 0.1, cartao.grupo.position.z);
    pontos.needsUpdate = true;
    linha.visible = cartao.grupo.visible;
  }
}

/**
 * Monta a cena dos agentes.
 * @param {THREE.Scene} cena - Cena Three.js.
 * @param {{reduzir: boolean}} opcoes - true quando o sistema pede movimento reduzido.
 * @returns {object} sincronizar(tarefas), aplicarEvento(evento), desenhar(dt, tempo) e contagem().
 */
export function montarCenaAgentes(cena, { reduzir }) {
  const estado = {
    cena, reduzir, contador: 0, cartoes: new Map(), agentes: new Map(), linhas: new Map(),
    trilhas: criarTrilhas(cena),
  };
  return {
    sincronizar: (tarefas) => sincronizar(estado, tarefas),
    aplicarEvento: (evento) => aplicarEvento(estado, evento),
    desenhar(dt, tempo) {
      const fator = estado.reduzir ? 1 : 1 - Math.exp(-dt * VELOCIDADE);
      desenharCartoes(estado, fator, dt);
      desenharAgentesELinhas(estado, fator, tempo);
    },
    contagem: () => Object.fromEntries(estado.trilhas.map((t) => [t.status, Math.max(t.total, 0)])),
  };
}

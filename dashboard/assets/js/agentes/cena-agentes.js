// Cena 3D da página "Agentes ao vivo", no formato de mapa mental (dashboard/prompts/modelo.png):
// as tarefas pendentes formam um globo que gira no centro, os agentes ficam parados em volta,
// ligados ao globo por galhos, com as tarefas que estão fazendo em ramos, e as concluídas vão para
// um anel colado ao globo. Cada cartão persegue o seu lugar a cada quadro, então as mudanças viram voos.
import * as THREE from 'three';
import {
  atualizarFio, atualizarGalho, atualizarRamo, criarFio, criarGalho, criarRamo, posicaoDoAgente, posicaoNoRamo,
} from './galhos.js';
import { atualizarProgresso, criarPersonagem } from './personagens.js';
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
  avancou: 0x60a5fa,
});
const COR_ALERTA = Object.freeze({ bloqueado: 0xef4444, aguardando: 0xfacc15 });
const RAIO_GLOBO = 2;
const RAIO_ANEL = 2.9;
const INCLINACAO_ANEL = 0.35;
const GIRO_GLOBO = 0.12;
const GIRO_ANEL = 0.04;
const VELOCIDADE = 2.5;
const QUEDA_PULSO = 0.5;
const ANGULO_DOURADO = Math.PI * (3 - Math.sqrt(5));
// Quadros grandes (o do aulasenai passa de 700 pendentes): acima deste total, as pendentes comuns
// ficam sem rótulo no globo e os cartões encolhem para caber na esfera.
const LIMITE_ROTULOS_GLOBO = 25;
const CARTOES_SEM_ENCOLHER = 27;
const GEOMETRIA_CARTAO = new THREE.BoxGeometry(0.5, 0.3, 0.08);

const corDoNivel = (nivel) => COR_NIVEL[nivel] ?? COR_SEM_NIVEL;
const segura = (cartao) => Boolean(cartao.tarefa.agente) && cartao.tarefa.status !== 'concluido';
const papelDo = (cartao) => {
  if (cartao.tarefa.status === 'concluido') return 'anel';
  return segura(cartao) ? 'satelite' : 'globo';
};

function criarGlobo(cena) {
  const grupo = new THREE.Group();
  const esfera = new THREE.Mesh(new THREE.SphereGeometry(RAIO_GLOBO, 48, 32), new THREE.MeshStandardMaterial({
    color: 0x7c5cff, emissive: 0x2e1065, transparent: true, opacity: 0.18, depthWrite: false,
  }));
  const malha = new THREE.LineSegments(new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(RAIO_GLOBO, 2)),
    new THREE.LineBasicMaterial({ color: 0xa5b4fc, transparent: true, opacity: 0.25 }));
  grupo.add(esfera, malha);
  cena.add(grupo);
  return grupo;
}

function criarAnel(cena) {
  const anel = new THREE.Mesh(new THREE.RingGeometry(RAIO_ANEL - 0.12, RAIO_ANEL + 0.12, 128),
    new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.18, side: THREE.DoubleSide }));
  anel.rotation.x = -Math.PI / 2 + INCLINACAO_ANEL;
  cena.add(anel);
}

function atualizarPlaca(placa, linhas, posicao, cena) {
  const chave = linhas.join('|');
  if (placa.chave === chave) return;
  placa.chave = chave;
  if (placa.sprite) descartarRotulo(placa.sprite);
  placa.sprite = criarRotulo(linhas, { escala: 0.9 });
  placa.sprite.position.copy(posicao);
  cena.add(placa.sprite);
}

function trocarRotulo(cartao, papel) {
  if (cartao.papelRotulo === papel) return;
  cartao.papelRotulo = papel;
  if (cartao.rotulo) descartarRotulo(cartao.rotulo);
  cartao.rotulo = null;
  if (papel === 'anel' || papel === 'globo-sem-rotulo') return; // o total aparece na placa
  const { tarefa } = cartao;
  const linhas = papel === 'satelite' ? [tarefa.tarefa, tarefa.titulo] : [tarefa.tarefa];
  cartao.rotulo = criarRotulo(linhas, { cor: corDoNivel(tarefa.nivel), escala: papel === 'satelite' ? 0.85 : 0.5 });
  cartao.rotulo.position.y = papel === 'satelite' ? 0.45 : 0.3;
  cartao.grupo.add(cartao.rotulo);
}

function criarCartao(cena, tarefa) {
  const malha = new THREE.Mesh(GEOMETRIA_CARTAO, new THREE.MeshStandardMaterial({
    color: corDoNivel(tarefa.nivel), emissive: 0x000000, roughness: 0.5,
  }));
  const grupo = new THREE.Group();
  grupo.add(malha);
  cena.add(grupo);
  return { tarefa, grupo, malha, rotulo: null, papelRotulo: '', vaga: null, alvo: new THREE.Vector3(), pulso: 0 };
}

function removerCartao(estado, id) {
  const cartao = estado.cartoes.get(id);
  if (!cartao) return;
  if (cartao.rotulo) descartarRotulo(cartao.rotulo);
  cartao.grupo.removeFromParent();
  cartao.malha.material.dispose(); // a geometria é compartilhada
  estado.cartoes.delete(id);
}

function garantirAgente(estado, nome) {
  if (!nome || estado.agentes.has(nome)) return;
  const personagem = criarPersonagem(nome);
  personagem.galho = criarGalho(personagem.cor);
  personagem.posicaoGalho = new THREE.Vector3(Infinity, 0, 0);
  estado.cena.add(personagem.grupo, personagem.galho);
  estado.agentes.set(nome, personagem);
}

/** Dá a cada cartão a sua vaga (globo, satélite de um agente ou anel) e o rótulo do papel. */
function agruparPorPapel(estado) {
  const grupos = { globo: [], anel: [] };
  const porAgente = new Map();
  for (const cartao of estado.cartoes.values()) {
    const papel = papelDo(cartao);
    if (papel === 'satelite') {
      if (!porAgente.has(cartao.tarefa.agente)) porAgente.set(cartao.tarefa.agente, []);
      porAgente.get(cartao.tarefa.agente).push(cartao);
    } else {
      grupos[papel].push(cartao);
    }
  }
  return { grupos, porAgente };
}

function rotularCartoes(estado, totalGlobo) {
  const globoCheio = totalGlobo > LIMITE_ROTULOS_GLOBO;
  estado.escalaGlobo = Math.min(1, Math.sqrt(CARTOES_SEM_ENCOLHER / Math.max(totalGlobo, 1)));
  for (const cartao of estado.cartoes.values()) {
    const papel = papelDo(cartao);
    const semRotulo = papel === 'globo' && globoCheio && cartao.tarefa.status === 'pendente';
    trocarRotulo(cartao, semRotulo ? 'globo-sem-rotulo' : papel);
  }
}

function distribuirVagas(estado) {
  const { grupos, porAgente } = agruparPorPapel(estado);
  rotularCartoes(estado, grupos.globo.length);
  const ordenar = (lista) => lista.sort((a, b) => a.tarefa.indice - b.tarefa.indice);
  for (const papel of ['globo', 'anel']) {
    ordenar(grupos[papel]).forEach((c, indice, lista) => { c.vaga = { papel, indice, total: lista.length }; });
  }
  for (const [agente, lista] of porAgente) {
    ordenar(lista).forEach((c, indice) => { c.vaga = { papel: 'satelite', indice, total: lista.length, agente }; });
  }
  for (const personagem of estado.agentes.values()) {
    const lista = porAgente.get(personagem.nome) ?? [];
    atualizarProgresso(personagem, lista.map((c) => ({ tarefa: c.tarefa.tarefa, progresso: c.tarefa.progresso ?? null })));
  }
  return { globo: grupos.globo.length, anel: grupos.anel.length };
}

function criarLinha(estado, cartao) {
  const personagem = estado.agentes.get(cartao.tarefa.agente);
  const linha = criarRamo(personagem.cor);
  const fio = criarFio();
  estado.cena.add(linha, fio);
  return { linha, fio, cartao, personagem };
}

function sincronizarLinhas(estado) {
  for (const [id, item] of estado.linhas) {
    const cartao = estado.cartoes.get(id);
    if (!cartao || !segura(cartao) || item.personagem.nome !== cartao.tarefa.agente) {
      for (const objeto of [item.linha, item.fio]) {
        objeto.removeFromParent();
        objeto.geometry.dispose();
        objeto.material.dispose();
      }
      estado.linhas.delete(id);
    }
  }
  for (const [id, cartao] of estado.cartoes) {
    if (segura(cartao) && !estado.linhas.has(id)) estado.linhas.set(id, criarLinha(estado, cartao));
  }
}

function reorganizar(estado) {
  const totais = distribuirVagas(estado);
  sincronizarLinhas(estado);
  atualizarPlaca(estado.placas.globo, ['Pendentes', `${totais.globo} no globo`],
    new THREE.Vector3(0, RAIO_GLOBO + 0.9, 0), estado.cena);
  atualizarPlaca(estado.placas.anel, ['Concluídas', `${totais.anel} no anel`],
    new THREE.Vector3(0, -RAIO_GLOBO - 1.1, 0), estado.cena);
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
    pulsar(cartao, tipo);
    garantirAgente(estado, tarefa.agente);
  }
  reorganizar(estado);
}

function posicaoNoGlobo({ indice, total }, angulo, destino) {
  const y = 1 - (2 * (indice + 0.5)) / total;
  const raio = Math.sqrt(1 - y * y);
  const theta = indice * ANGULO_DOURADO + angulo;
  return destino.set(Math.cos(theta) * raio, y, Math.sin(theta) * raio).multiplyScalar(RAIO_GLOBO + 0.2);
}

function posicaoNoAnel({ indice, total }, tempo, destino) {
  const angulo = (indice / Math.max(total, 1)) * Math.PI * 2 + tempo * GIRO_ANEL;
  const z = Math.sin(angulo) * RAIO_ANEL;
  return destino.set(Math.cos(angulo) * RAIO_ANEL, -z * Math.sin(INCLINACAO_ANEL), z * Math.cos(INCLINACAO_ANEL));
}

/** Agentes parados nos seus lugares (só voam ao chegar um agente novo); o galho segue o agente. */
function desenharAgentes(estado, fator) {
  let indice = 0;
  for (const personagem of estado.agentes.values()) {
    posicaoDoAgente(indice, estado.agentes.size, personagem.alvo);
    personagem.base.lerp(personagem.alvo, fator);
    personagem.grupo.position.copy(personagem.base);
    if (personagem.posicaoGalho.distanceToSquared(personagem.base) > 1e-6) {
      atualizarGalho(personagem.galho, RAIO_GLOBO, personagem.base);
      personagem.posicaoGalho.copy(personagem.base);
    }
    indice += 1;
  }
}

function desenharCartoes(estado, fator, dt, tempo) {
  const piscar = 0.5 + 0.5 * Math.sin(tempo * 4);
  for (const cartao of estado.cartoes.values()) {
    const { vaga } = cartao;
    if (vaga.papel === 'globo') posicaoNoGlobo(vaga, tempo * GIRO_GLOBO, cartao.alvo);
    else if (vaga.papel === 'anel') posicaoNoAnel(vaga, tempo, cartao.alvo);
    else posicaoNoRamo(vaga, estado.agentes.get(vaga.agente).grupo.position, cartao.alvo);
    cartao.grupo.position.lerp(cartao.alvo, fator);
    cartao.pulso = Math.max(0, cartao.pulso - dt * QUEDA_PULSO);
    const alerta = COR_ALERTA[cartao.tarefa.status];
    if (alerta !== undefined && cartao.pulso === 0) cartao.malha.material.emissive.setHex(alerta);
    const brilho = alerta !== undefined && cartao.pulso === 0 ? piscar * 0.8 : cartao.pulso * 1.4;
    cartao.malha.material.emissiveIntensity = brilho;
    const base = vaga.papel === 'globo' ? estado.escalaGlobo : 1;
    cartao.malha.scale.setScalar(estado.reduzir ? base : base * (1 + cartao.pulso * 0.8));
  }
}

function desenharLinhas(estado) {
  for (const { linha, fio, cartao, personagem } of estado.linhas.values()) {
    atualizarRamo(linha, personagem.grupo.position, cartao.grupo.position);
    atualizarFio(fio, RAIO_GLOBO, cartao.grupo.position);
  }
}

function sincronizar(estado, tarefas) {
  for (const tarefa of tarefas.filter((t) => !t.mae)) {
    estado.cartoes.set(tarefa.tarefa, criarCartao(estado.cena, tarefa));
    garantirAgente(estado, tarefa.agente);
  }
  reorganizar(estado);
  estado.inicio = true; // o primeiro quadro põe tudo no lugar, sem voo
}

/**
 * Monta a cena dos agentes.
 * @param {THREE.Scene} cena - Cena Three.js.
 * @param {{reduzir: boolean}} opcoes - true quando o sistema pede movimento reduzido.
 * @returns {object} sincronizar(tarefas), aplicarEvento(evento), desenhar(dt, tempo) e contagem().
 */
export function montarCenaAgentes(cena, { reduzir }) {
  const estado = {
    cena, reduzir, inicio: false, cartoes: new Map(), agentes: new Map(), linhas: new Map(),
    globo: criarGlobo(cena), placas: { globo: {}, anel: {} }, escalaGlobo: 1,
  };
  criarAnel(cena);
  return {
    sincronizar: (tarefas) => sincronizar(estado, tarefas),
    aplicarEvento: (evento) => aplicarEvento(estado, evento),
    desenhar(dt, tempoReal) {
      const tempo = estado.reduzir ? 0 : tempoReal;
      const fator = estado.reduzir || estado.inicio ? 1 : 1 - Math.exp(-dt * VELOCIDADE);
      estado.inicio = false;
      estado.globo.rotation.y = -tempo * GIRO_GLOBO;
      desenharAgentes(estado, fator);
      desenharCartoes(estado, fator, dt, tempo);
      desenharLinhas(estado);
    },
    contagem() {
      const totais = Object.fromEntries(TRILHAS.map((t) => [t.status, 0]));
      estado.cartoes.forEach((c) => { totais[c.tarefa.status] = (totais[c.tarefa.status] ?? 0) + 1; });
      return totais;
    },
  };
}

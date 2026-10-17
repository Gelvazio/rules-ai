// Personagens da página "Agentes ao vivo": um por nome da coluna "Em uso por" do quadro.
// A forma e a cor vêm do modelo citado no nome (Haiku, Sonnet, Opus/Fable, Gemini, DeepSeek).
import * as THREE from 'three';
import { criarObjeto } from '../cenas/formas.js';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { criarRotulo } from './rotulos.js';

const MODELOS = [
  [/haiku/i, { forma_simples: 'voxel', cor: '#f59e0b' }],
  [/sonnet/i, { forma_simples: 'esfera', cor: '#3b82f6' }],
  [/opus|fable/i, { forma_simples: 'esfera', cor: '#ec4899' }],
  [/gemini/i, { forma_simples: 'hexagono', cor: '#a78bfa' }],
  [/deepseek/i, { forma_simples: 'hexagono', cor: '#38bdf8' }],
];
const PADRAO = { forma_simples: 'esfera', cor: '#94a3b8' };
const TAMANHO_CORPO = 0.7;
const ALTURA_ROTULO = 0.8;
const ALTURA_PROGRESSO = 1.35;

/**
 * Forma e cor do personagem a partir do nome do agente.
 * @param {string} nome - Ex.: "Claude Code (Opus 5.5) (local · main)".
 * @returns {{forma_simples: string, cor: string}} Definição aceita por criarObjeto.
 */
export function definicaoDoAgente(nome) {
  const achado = MODELOS.find(([padrao]) => padrao.test(nome));
  return { ...(achado ? achado[1] : PADRAO) };
}

/**
 * Divide o nome em duas linhas: a ferramenta e os detalhes entre parênteses.
 * @param {string} nome - Ex.: "Claude Code (Opus 5.5) (local · main)".
 * @returns {string[]} Ex.: ["Claude Code", "Opus 5.5 · local · main"].
 */
export function linhasDoNome(nome) {
  const principal = nome.split('(')[0].trim() || nome;
  const detalhes = [...nome.matchAll(/\(([^()]*)\)/g)].map((m) => m[1].trim());
  return [principal, detalhes.join(' · ')];
}

/**
 * Nome curto para o histórico: o primeiro trecho entre parênteses (o modelo), ou o nome inteiro.
 * @param {string} nome - Nome do agente.
 * @returns {string} Ex.: "Opus 5.5".
 */
export function nomeCurto(nome) {
  const trecho = nome.match(/\(([^()]*)\)/);
  return trecho ? trecho[1].trim() : nome;
}

/**
 * Cria o personagem com o nome escrito em cima.
 * @param {string} nome - Nome completo do agente, como no quadro.
 * @returns {{nome: string, cor: string, grupo: THREE.Group, base: THREE.Vector3, alvo: THREE.Vector3}}
 */
export function criarPersonagem(nome) {
  const definicao = definicaoDoAgente(nome);
  const grupo = new THREE.Group();
  criarObjeto(definicao, TAMANHO_CORPO).then(({ grupo: corpo }) => grupo.add(corpo));
  const rotulo = criarRotulo(linhasDoNome(nome), { cor: definicao.cor, escala: 0.9 });
  rotulo.position.y = ALTURA_ROTULO;
  grupo.add(rotulo);
  const progresso = new CSS2DObject(document.createElement('div'));
  progresso.element.className = 'progresso3d';
  progresso.element.style.setProperty('--cor-rotulo', definicao.cor);
  progresso.position.y = ALTURA_PROGRESSO;
  progresso.visible = false;
  grupo.add(progresso);
  return { nome, cor: definicao.cor, grupo, progresso, chaveProgresso: '', base: new THREE.Vector3(), alvo: new THREE.Vector3() };
}

function linhaProgresso({ tarefa, progresso }, mostrarId) {
  const linha = document.createElement('div');
  linha.className = 'progresso3d__linha';
  const conhecido = Number.isInteger(progresso);
  const id = document.createElement('span');
  id.className = 'progresso3d__id';
  id.textContent = mostrarId ? tarefa.slice(tarefa.lastIndexOf('.')) : '';
  const barra = document.createElement('span');
  barra.className = 'progresso3d__barra';
  barra.style.setProperty('--valor', `${conhecido ? progresso : 0}%`);
  const valor = document.createElement('strong');
  valor.textContent = conhecido ? `${progresso}%` : '—%';
  linha.append(id, barra, valor);
  linha.title = conhecido ? `${tarefa}: ${progresso}%` : `${tarefa}: o agente ainda não informou o percentual (regra C31)`;
  return linha;
}

/**
 * Mostra na cabeça do agente o percentual de cada tarefa que ele está fazendo (some se não trabalha).
 * @param {object} personagem - Criado por criarPersonagem.
 * @param {Array<{tarefa: string, progresso: ?number}>} itens - Tarefas em andamento do agente.
 */
export function atualizarProgresso(personagem, itens) {
  const chave = JSON.stringify(itens);
  if (personagem.chaveProgresso === chave) return;
  personagem.chaveProgresso = chave;
  personagem.progresso.visible = itens.length > 0;
  personagem.progresso.element.replaceChildren(...itens.map((item) => linhaProgresso(item, itens.length > 1)));
}

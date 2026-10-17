// Personagens da página "Agentes ao vivo": um por nome da coluna "Em uso por" do quadro.
// A forma e a cor vêm do modelo citado no nome (Haiku, Sonnet, Opus/Fable, Gemini, DeepSeek).
import * as THREE from 'three';
import { criarObjeto } from '../cenas/formas.js';
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
  return { nome, cor: definicao.cor, grupo, base: new THREE.Vector3(), alvo: new THREE.Vector3() };
}

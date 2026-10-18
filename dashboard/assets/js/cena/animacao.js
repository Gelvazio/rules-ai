// Animação da propagação: cada camada acende depois da anterior; o sinal pulsa nas ligações.
import * as THREE from 'three';
import { COR_NEURONIO_APAGADO } from '../config/cores.js';
import { CASAS_DECIMAIS } from '../config/rede.js';
import {
  DURACAO_CAMADA_MS,
  DURACAO_TRANSICAO_MS,
  ESCALA_ATIVO_EXTRA,
  BRILHO_ATIVO,
  OPACIDADE_EXTRA_PULSO,
} from '../config/cena.js';

const TIPO_SAIDA = 'saida';

/**
 * Converte as ativações de uma camada em intensidades de 0 a 1.
 * Na saída a ativação já é probabilidade; nas outras, divide pelo maior valor da camada.
 * @param {{tipo: string, neuronios: {ativacao: number}[]}} camada - Camada calculada.
 * @returns {number[]} Intensidade de cada neurônio.
 */
export function calcularIntensidadesDaCamada(camada) {
  const valores = camada.neuronios.map((neuronio) => Math.abs(neuronio.ativacao));
  if (camada.tipo === TIPO_SAIDA) return valores;

  const maior = Math.max(...valores);
  if (maior === 0) return valores.map(() => 0);
  return valores.map((valor) => valor / maior);
}

/**
 * Diz quanto da transição de uma camada já passou.
 * @param {number} decorrido - Milissegundos desde que a camada deveria começar a acender.
 * @returns {number} Progresso entre 0 e 1.
 */
function calcularProgresso(decorrido) {
  return THREE.MathUtils.clamp(decorrido / DURACAO_TRANSICAO_MS, 0, 1);
}

/**
 * Pinta e escala um neurônio conforme a intensidade já alcançada.
 * @param {{malha: THREE.Mesh, rotulo: object}} neuronio - Neurônio da cena.
 * @param {{nivel: number, texto: string}} estado - Intensidade atual e texto do rótulo.
 * @param {{apagada: THREE.Color, ativa: THREE.Color}} cores - Cores de início e fim.
 * @returns {void}
 */
function pintarNeuronio(neuronio, { nivel, texto }, cores) {
  const material = neuronio.malha.material;
  material.color.copy(cores.apagada).lerp(cores.ativa, nivel);
  material.emissive.copy(cores.ativa).multiplyScalar(nivel * BRILHO_ATIVO);
  neuronio.malha.scale.setScalar(1 + ESCALA_ATIVO_EXTRA * nivel);

  const elemento = neuronio.rotulo.element;
  if (elemento.textContent !== texto) elemento.textContent = texto;
}

/**
 * Faz o sinal pulsar nas ligações que chegam à camada (sobe e desce durante a transição).
 * @param {{linha: THREE.Line, opacidadeBase: number}[]} ligacoes - Ligações da camada.
 * @param {number} progresso - Progresso da camada, de 0 a 1.
 * @returns {void}
 */
function pulsarLigacoes(ligacoes, progresso) {
  const pulso = Math.sin(Math.PI * progresso) * OPACIDADE_EXTRA_PULSO;
  ligacoes.forEach(({ linha, opacidadeBase }) => {
    linha.material.opacity = Math.min(opacidadeBase + pulso, 1);
  });
}

/**
 * Prepara, para cada camada, as intensidades-alvo e os textos dos rótulos.
 * @param {{camadas: object[]}} resultado - Saída de propagar().
 * @returns {{intensidades: number[], textos: string[]}[]} Alvos por camada.
 */
function prepararAlvos(resultado) {
  return resultado.camadas.map((camada) => ({
    intensidades: calcularIntensidadesDaCamada(camada),
    textos: camada.neuronios.map((neuronio) => neuronio.ativacao.toFixed(CASAS_DECIMAIS)),
  }));
}

/**
 * Cria o controlador da animação. Ele só lê o resultado do modelo; não calcula a rede.
 * @param {{neuronios: object[][], ligacoes: object[][], corAtiva: string}} dados - Peças da cena.
 * @returns {{iniciar: function(object, number): void, atualizar: function(number): void}}
 *   iniciar(resultado, agora) começa do zero; atualizar(agora) roda a cada quadro.
 */
export function criarAnimacao({ neuronios, ligacoes, corAtiva }) {
  const cores = {
    apagada: new THREE.Color(COR_NEURONIO_APAGADO),
    ativa: new THREE.Color(corAtiva),
  };
  let estado = null;

  const atualizarCamada = (alvo, indiceCamada, agora) => {
    const progresso = calcularProgresso(agora - estado.inicio - indiceCamada * DURACAO_CAMADA_MS);
    neuronios[indiceCamada].forEach((neuronio, j) => {
      const texto = progresso > 0 ? alvo.textos[j] : '';
      pintarNeuronio(neuronio, { nivel: alvo.intensidades[j] * progresso, texto }, cores);
    });
    pulsarLigacoes(ligacoes[indiceCamada], progresso);
    return progresso;
  };

  const atualizar = (agora) => {
    if (!estado) return;
    const progressos = estado.alvos.map((alvo, k) => atualizarCamada(alvo, k, agora));
    const terminou = progressos.every((progresso) => progresso === 1);
    if (terminou) estado = null;
  };

  const iniciar = (resultado, agora) => {
    estado = { inicio: agora, alvos: prepararAlvos(resultado) };
  };
  return { iniciar, atualizar };
}

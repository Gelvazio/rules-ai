// Liga o modelo da rede à cena 3D e avisa o painel (eventos) do que aconteceu.
import {
  TAMANHOS_CAMADAS,
  SEMENTE_PESOS,
  ENTRADAS_PADRAO,
  NOMES_CAMADAS,
} from './config/rede.js';
import { criarRede, propagar } from './rede/rede-neural.js';
import { criarCenaRede } from './cena/cena-rede.js';

/** Disparado em window depois de cada propagação: detail = { rede, resultado }. */
export const EVENTO_PROPAGADA = 'rede:propagada';

/**
 * Disparado em window ao clicar num neurônio:
 * detail = { indiceCamada, indiceNeuronio, nomeCamada, neuronio } (neuronio vem de propagar()).
 */
export const EVENTO_SELECIONADO = 'rede:neuronio-selecionado';

const ID_CENA = 'cena';
const ID_FORMULARIO = 'form-entradas';
const ID_BOTAO_PROPAGAR = 'botao-propagar';
const ID_AVISO = 'aviso';
const PREFIXO_ID_ENTRADA = 'entrada-';
const MSG_SEM_WEBGL = 'Não foi possível abrir a cena 3D (o navegador precisa de WebGL).';

const estado = { rede: null, resultado: null };

/**
 * Devolve a rede e o último resultado (para quem carregar depois do primeiro evento).
 * @returns {{rede: object|null, resultado: object|null}} Estado atual.
 */
export function obterEstado() {
  return { ...estado };
}

/**
 * Lê os campos de entrada; campo ausente usa o valor padrão.
 * @returns {number[]} Valores de entrada (podem vir NaN; o modelo recusa).
 */
function lerEntradas() {
  return ENTRADAS_PADRAO.map((padrao, i) => {
    const campo = document.getElementById(`${PREFIXO_ID_ENTRADA}${i}`);
    if (!campo) return padrao;
    return Number.parseFloat(campo.value);
  });
}

/**
 * Mostra ou esconde a mensagem de aviso da página.
 * @param {string} [mensagem] - Texto; vazio esconde o aviso.
 * @returns {void}
 */
function mostrarAviso(mensagem = '') {
  const aviso = document.getElementById(ID_AVISO);
  if (!aviso) return;
  aviso.textContent = mensagem;
  aviso.hidden = !mensagem;
}

/**
 * Dispara um evento da rede em window.
 * @param {string} nome - Nome do evento.
 * @param {object} detalhe - Dados do evento.
 * @returns {void}
 */
function emitir(nome, detalhe) {
  window.dispatchEvent(new CustomEvent(nome, { detail: detalhe }));
}

/**
 * Propaga as entradas digitadas, anima a cena e avisa o painel.
 * @param {{animarPropagacao: function(object): void}} cena - Cena da rede.
 * @returns {void}
 */
function executarPropagacao(cena) {
  try {
    estado.resultado = propagar(estado.rede, lerEntradas());
  } catch (erro) {
    mostrarAviso(erro.message);
    return;
  }
  mostrarAviso();
  cena.animarPropagacao(estado.resultado);
  emitir(EVENTO_PROPAGADA, { rede: estado.rede, resultado: estado.resultado });
}

/**
 * Avisa o painel do neurônio clicado, com o cálculo vindo do último resultado.
 * @param {{indiceCamada: number, indiceNeuronio: number}} indices - Neurônio clicado.
 * @returns {void}
 */
function avisarSelecao({ indiceCamada, indiceNeuronio }) {
  const camada = estado.resultado?.camadas[indiceCamada];
  emitir(EVENTO_SELECIONADO, {
    indiceCamada,
    indiceNeuronio,
    nomeCamada: NOMES_CAMADAS[indiceCamada],
    neuronio: camada?.neuronios[indiceNeuronio] ?? null,
  });
}

/**
 * Cria a rede e a cena, liga o botão Propagar e faz a primeira propagação.
 * @returns {void}
 */
function iniciar() {
  const container = document.getElementById(ID_CENA);
  if (!container) return;

  estado.rede = criarRede({ tamanhos: [...TAMANHOS_CAMADAS], semente: SEMENTE_PESOS });
  let cena;
  try {
    cena = criarCenaRede({ container, rede: estado.rede, nomesCamadas: NOMES_CAMADAS });
  } catch {
    mostrarAviso(MSG_SEM_WEBGL);
    return;
  }
  cena.aoSelecionarNeuronio(avisarSelecao);

  document.getElementById(ID_BOTAO_PROPAGAR)?.addEventListener('click', () => {
    executarPropagacao(cena);
  });
  document.getElementById(ID_FORMULARIO)?.addEventListener('submit', (evento) => {
    evento.preventDefault();
    executarPropagacao(cena);
  });
  executarPropagacao(cena);
}

iniciar();

import { LIMITE_PESO, LIMITE_VIES } from '../config/rede.js';

const MINIMO_CAMADAS = 2;
const TIPO_ENTRADA = 'entrada';
const TIPO_OCULTA = 'oculta';
const TIPO_SAIDA = 'saida';
const MSG_TAMANHOS_INVALIDOS =
  'Tamanhos inválidos: informe ao menos 2 camadas com inteiros positivos.';
const MSG_ENTRADAS_INVALIDAS =
  'Entradas inválidas: quantidade diferente da camada de entrada ou valor não numérico.';

// Constantes do gerador mulberry32.
const MULBERRY_INCREMENTO = 0x6d2b79f5;
const MULBERRY_DESLOCAMENTO_A = 15;
const MULBERRY_DESLOCAMENTO_B = 7;
const MULBERRY_DESLOCAMENTO_C = 14;
const MULBERRY_MULTIPLICADOR_B = 61;
const MULBERRY_DIVISOR = 4294967296;

/**
 * Cria um gerador pseudoaleatório determinístico (mulberry32).
 * @param {number} semente - Semente inicial.
 * @returns {function(): number} Função que devolve números em [0, 1).
 */
export function criarGeradorAleatorio(semente) {
  let estado = semente >>> 0;
  return () => {
    estado = (estado + MULBERRY_INCREMENTO) >>> 0;
    let t = estado;
    t = Math.imul(t ^ (t >>> MULBERRY_DESLOCAMENTO_A), t | 1);
    t ^= t + Math.imul(t ^ (t >>> MULBERRY_DESLOCAMENTO_B), t | MULBERRY_MULTIPLICADOR_B);
    return ((t ^ (t >>> MULBERRY_DESLOCAMENTO_C)) >>> 0) / MULBERRY_DIVISOR;
  };
}

/**
 * Sorteia um número uniforme em [-limite, +limite].
 * @param {function(): number} aleatorio - Gerador em [0, 1).
 * @param {number} limite - Valor absoluto máximo.
 * @returns {number} Número sorteado.
 */
function sortearSimetrico(aleatorio, limite) {
  return (aleatorio() * 2 - 1) * limite;
}

/**
 * Valida a lista de tamanhos das camadas.
 * @param {number[]} tamanhos - Neurônios por camada.
 * @returns {void}
 * @throws {Error} Se houver menos de 2 camadas ou valores inválidos.
 */
function validarTamanhos(tamanhos) {
  const ehLista = Array.isArray(tamanhos);
  if (!ehLista || tamanhos.length < MINIMO_CAMADAS) throw new Error(MSG_TAMANHOS_INVALIDOS);

  const todosValidos = tamanhos.every((valor) => Number.isInteger(valor) && valor > 0);
  if (!todosValidos) throw new Error(MSG_TAMANHOS_INVALIDOS);
}

/**
 * Cria uma camada com pesos e vieses sorteados.
 * @param {{entradas: number, neuronios: number}} formato - Tamanho anterior e desta camada.
 * @param {function(): number} aleatorio - Gerador em [0, 1).
 * @returns {{pesos: number[][], vieses: number[]}} Camada criada.
 */
function criarCamada({ entradas, neuronios }, aleatorio) {
  const pesos = [];
  const vieses = [];
  for (let j = 0; j < neuronios; j += 1) {
    const linha = [];
    for (let i = 0; i < entradas; i += 1) linha.push(sortearSimetrico(aleatorio, LIMITE_PESO));
    pesos.push(linha);
    vieses.push(sortearSimetrico(aleatorio, LIMITE_VIES));
  }
  return { pesos, vieses };
}

/**
 * Cria uma rede neural com pesos e vieses determinísticos.
 * @param {{tamanhos: number[], semente: number}} configuracao - Formato e semente.
 * @returns {{tamanhos: number[], camadas: {pesos: number[][], vieses: number[]}[]}} Rede.
 * @throws {Error} Se os tamanhos forem inválidos.
 */
export function criarRede({ tamanhos, semente }) {
  validarTamanhos(tamanhos);
  const aleatorio = criarGeradorAleatorio(semente);
  const camadas = [];
  for (let k = 1; k < tamanhos.length; k += 1) {
    camadas.push(criarCamada({ entradas: tamanhos[k - 1], neuronios: tamanhos[k] }, aleatorio));
  }
  return { tamanhos: [...tamanhos], camadas };
}

/**
 * Função de ativação ReLU.
 * @param {number} valor - Entrada.
 * @returns {number} O maior entre 0 e o valor.
 */
export function relu(valor) {
  return valor > 0 ? valor : 0;
}

/**
 * Softmax numericamente estável (subtrai o máximo).
 * @param {number[]} valores - Pontuações (z) da camada de saída.
 * @returns {number[]} Probabilidades que somam 1.
 */
export function softmax(valores) {
  const maximo = Math.max(...valores);
  const exponenciais = valores.map((valor) => Math.exp(valor - maximo));
  const soma = exponenciais.reduce((total, valor) => total + valor, 0);
  return exponenciais.map((valor) => valor / soma);
}

/**
 * Valida o vetor de entradas contra a camada de entrada da rede.
 * @param {{tamanhos: number[]}} rede - Rede neural.
 * @param {number[]} entradas - Valores de entrada.
 * @returns {void}
 * @throws {Error} Se a quantidade ou os valores forem inválidos.
 */
function validarEntradas(rede, entradas) {
  const tamanhoCorreto = Array.isArray(entradas) && entradas.length === rede.tamanhos[0];
  if (!tamanhoCorreto) throw new Error(MSG_ENTRADAS_INVALIDAS);

  const todosFinitos = entradas.every((valor) => Number.isFinite(valor));
  if (!todosFinitos) throw new Error(MSG_ENTRADAS_INVALIDAS);
}

/**
 * Calcula um neurônio: parcelas, soma ponderada com viés (z).
 * @param {{pesos: number[], vies: number}} parametros - Pesos de entrada e viés.
 * @param {number[]} entradas - Ativações da camada anterior.
 * @returns {{parcelas: {entrada: number, peso: number, produto: number}[],
 *   vies: number, z: number}} Neurônio sem ativação.
 */
function calcularNeuronio({ pesos, vies }, entradas) {
  const parcelas = entradas.map((entrada, i) => ({
    entrada,
    peso: pesos[i],
    produto: entrada * pesos[i],
  }));
  const z = parcelas.reduce((total, parcela) => total + parcela.produto, vies);
  return { parcelas, vies, z };
}

/**
 * Calcula uma camada inteira; oculta usa ReLU, saída usa softmax.
 * @param {{pesos: number[][], vieses: number[]}} camada - Parâmetros da camada.
 * @param {number[]} entradas - Ativações da camada anterior.
 * @param {boolean} ehSaida - Se é a última camada.
 * @returns {{tipo: string, neuronios: object[]}} Camada calculada (sem índice).
 */
function calcularCamada(camada, entradas, ehSaida) {
  const neuronios = camada.pesos.map((pesos, j) =>
    calcularNeuronio({ pesos, vies: camada.vieses[j] }, entradas),
  );
  const zs = neuronios.map((neuronio) => neuronio.z);
  const ativacoes = ehSaida ? softmax(zs) : zs.map(relu);
  neuronios.forEach((neuronio, j) => {
    neuronio.ativacao = ativacoes[j];
  });
  return { tipo: ehSaida ? TIPO_SAIDA : TIPO_OCULTA, neuronios };
}

/**
 * Executa a propagação para frente, guardando todos os passos.
 * @param {{tamanhos: number[], camadas: object[]}} rede - Rede neural.
 * @param {number[]} entradas - Valores de entrada.
 * @returns {{camadas: object[], probabilidades: number[]}} Resultado detalhado.
 * @throws {Error} Se as entradas forem inválidas.
 */
export function propagar(rede, entradas) {
  validarEntradas(rede, entradas);
  const resultado = [
    {
      indice: 0,
      tipo: TIPO_ENTRADA,
      neuronios: entradas.map((ativacao) => ({ ativacao })),
    },
  ];
  let ativacoes = [...entradas];
  rede.camadas.forEach((camada, posicao) => {
    const ehSaida = posicao === rede.camadas.length - 1;
    const calculada = calcularCamada(camada, ativacoes, ehSaida);
    resultado.push({ indice: posicao + 1, ...calculada });
    ativacoes = calculada.neuronios.map((neuronio) => neuronio.ativacao);
  });
  return { camadas: resultado, probabilidades: ativacoes };
}

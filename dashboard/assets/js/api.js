// Chamadas ao servidor local. A chave do localStorage vai só para ele (cabeçalho
// X-Tripo-Key), que a repassa à Tripo; sem ela, o servidor usa o dashboard/.env.
import { lerChave } from './chave.js';
import { INTERVALO_CONSULTA_MS, ROTAS, TEMPO_MAXIMO_MS } from './config.js';

const CABECALHO_CHAVE = 'X-Tripo-Key';

async function pedirJson(url, opcoes = {}) {
  const cabecalhos = { ...(opcoes.headers || {}) };
  const chave = lerChave();
  if (chave) cabecalhos[CABECALHO_CHAVE] = chave;
  const resposta = await fetch(url, { ...opcoes, headers: cabecalhos });
  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new Error(dados.erro || `Erro ${resposta.status}`);
  return dados;
}

/**
 * Estado do servidor (chave configurada, custo, limite).
 * @returns {Promise<object|null>} Estado, ou null se a página não veio do servidor local.
 */
export async function lerEstado() {
  try {
    return await pedirJson(ROTAS.estado);
  } catch {
    return null;
  }
}

/** @returns {Promise<Array<object>>} Modelos já gerados e baixados. */
export async function listarModelos() {
  const dados = await pedirJson(ROTAS.modelos);
  return dados.modelos;
}

/**
 * Pede uma geração texto → 3D (o servidor exige confirmação de custo).
 * @param {string} prompt - Descrição do objeto.
 * @returns {Promise<string>} task_id criado.
 */
export async function gerarModelo(prompt) {
  const dados = await pedirJson(ROTAS.gerar, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, confirmado: true }),
  });
  return dados.task_id;
}

/** @returns {Promise<{saldo: number, congelado: number}>} Créditos da conta Tripo. */
export async function lerSaldo() {
  return pedirJson(ROTAS.saldo);
}

/**
 * Tarefas do quadro de um projeto, atraso padrão e intervalo de coleta.
 * @param {string} [projeto] - Pasta do projeto em C:ontes; vazio = projeto padrão do servidor.
 * @returns {Promise<object>} Resposta de /api/agentes.
 */
export async function lerAgentes(projeto = '') {
  const consulta = projeto ? `?projeto=${encodeURIComponent(projeto)}` : '';
  return pedirJson(ROTAS.agentes + consulta);
}

/** @returns {Promise<Array<object>>} Cenas dos prompts com o estado dos GLB de cada objeto. */
export async function listarCenas() {
  const dados = await pedirJson(ROTAS.cenas);
  return dados.cenas;
}

/**
 * Gera na Tripo um objeto de uma cena (o servidor usa o prompt_tripo do JSON da cena).
 * @param {string} cena - Id da cena (ex.: "prompt-04").
 * @param {string} objeto - Id do objeto (ex.: "assento").
 * @returns {Promise<string>} task_id criado.
 */
export async function gerarObjetoCena(cena, objeto) {
  const dados = await pedirJson(ROTAS.gerar, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cena, objeto, confirmado: true }),
  });
  return dados.task_id;
}

const esperar = (ms) => new Promise((resolver) => { setTimeout(resolver, ms); });

/**
 * Consulta a tarefa até terminar, avisando cada mudança.
 * @param {string} taskId - Tarefa da Tripo.
 * @param {function(object): void} aoAtualizar - Recebe {status, progresso}.
 * @returns {Promise<object>} Estado final (com `arquivo` quando pronto).
 */
export async function acompanharTarefa(taskId, aoAtualizar) {
  const limite = Date.now() + TEMPO_MAXIMO_MS;
  while (Date.now() < limite) {
    const estado = await pedirJson(ROTAS.tarefa + encodeURIComponent(taskId));
    aoAtualizar(estado);
    if (estado.arquivo || estado.final) return estado;
    await esperar(INTERVALO_CONSULTA_MS);
  }
  throw new Error('Tempo esgotado acompanhando a geração; ela continua na Tripo.');
}

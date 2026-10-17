// Chamadas ao servidor local. A chave da Tripo fica só no servidor (.env).
import { INTERVALO_CONSULTA_MS, ROTAS, TEMPO_MAXIMO_MS } from './config.js';

async function pedirJson(url, opcoes = {}) {
  const resposta = await fetch(url, opcoes);
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

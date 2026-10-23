// Chamadas ao servidor local dos Agentes ao vivo.
import { ROTAS } from './config.js';

async function pedirJson(url) {
  const resposta = await fetch(url);
  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new Error(dados.erro || `Erro ${resposta.status}`);
  return dados;
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

// Canal de Broadcast + estado inicial pelo GitHub raw (MIGRAR-AGENTES-BROADCAST.3).
// Uso: iniciarCanal({ aoEstado, aoAviso }); aoEstado recebe o mesmo formato de /api/agentes.
import { CANAL } from '../config.js';
import { lerQuadro } from './quadro.js';

const CAMPOS_TEXTO = ['projeto'];

function mensagemValida(carga, ultimaSequencia) {
  if (!carga || typeof carga !== 'object') return false;
  if (carga.versao !== CANAL.versaoContrato) return false;
  if (CAMPOS_TEXTO.some((campo) => carga[campo] !== CANAL.projeto)) return false;
  if (!Number.isInteger(carga.sequencia) || carga.sequencia <= ultimaSequencia) return false;
  return Array.isArray(carga.tarefas);
}

/** Estado inicial lido do STATUS.md público, no mesmo formato da mensagem (sequência 0). */
export async function lerEstadoInicial() {
  const resposta = await fetch(CANAL.urlQuadro, { cache: 'no-store' });
  if (!resposta.ok) throw new Error(`GitHub raw respondeu ${resposta.status}`);
  const { tarefas } = lerQuadro(await resposta.text());
  return { versao: CANAL.versaoContrato, projeto: CANAL.projeto, sequencia: 0, tarefas };
}

async function assinar(aoMensagem, aoAviso) {
  const { createClient } = await import(CANAL.urlCliente);
  const cliente = createClient(CANAL.url, CANAL.chavePublicavel);
  cliente
    .channel(`quadro:${CANAL.projeto}`)
    .on('broadcast', { event: CANAL.evento }, (m) => aoMensagem(m.payload))
    .subscribe((situacao) => {
      if (situacao !== 'SUBSCRIBED') aoAviso(`Canal: ${situacao}`);
    });
  return cliente;
}

/**
 * Entrega o estado inicial (ou usa `inicial`, já lido) e, havendo chave publicável, aplica cada mensagem do canal.
 * Falha em qualquer etapa vira aviso; nunca lança.
 * @returns {Promise<object|null>} Cliente do Supabase, ou null sem chave/sem canal.
 */
export async function iniciarCanal({ aoEstado, aoAviso = () => {}, inicial = null }) {
  let ultima = 0;
  if (!inicial) {
    try {
      aoEstado(await lerEstadoInicial());
    } catch (erro) {
      aoAviso(`Estado inicial indisponível: ${erro.message}`);
    }
  }
  if (!CANAL.chavePublicavel) return null;
  const aplicar = (carga) => {
    if (!mensagemValida(carga, ultima)) return;
    ultima = carga.sequencia;
    aoEstado(carga);
  };
  try {
    return await assinar(aplicar, aoAviso);
  } catch (erro) {
    aoAviso(`Canal indisponível: ${erro.message}`);
    return null;
  }
}

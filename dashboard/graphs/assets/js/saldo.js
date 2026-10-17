// Saldo de créditos da Tripo no cabeçalho (ao lado da engrenagem ⚙).
import { lerSaldo } from './api.js';

const FORMATO = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });
const VALOR_CREDITO_USD = 0.01;

function mostrar(texto, titulo, variacao) {
  const alvo = document.getElementById('saldo');
  if (!alvo) return;
  alvo.textContent = texto;
  alvo.title = titulo;
  alvo.className = `abas__saldo abas__saldo--${variacao}`;
}

/**
 * Consulta o saldo pelo servidor local e atualiza o cabeçalho.
 * @param {boolean} temChave - Se há chave (navegador ou .env); sem ela nem consulta.
 */
export async function atualizarSaldo(temChave) {
  if (!temChave) {
    mostrar('Saldo: —', 'Salve a chave da Tripo na ⚙ para ver o saldo.', 'neutro');
    return;
  }
  mostrar('Saldo: …', 'Consultando a Tripo…', 'neutro');
  try {
    const { saldo, congelado } = await lerSaldo();
    const dolares = (saldo * VALOR_CREDITO_USD).toFixed(2);
    const reservado = congelado ? ` · ${FORMATO.format(congelado)} reservados` : '';
    mostrar(`Saldo: ${FORMATO.format(saldo)} créditos${reservado}`,
      `≈ US$ ${dolares}. Créditos reservados ficam presos enquanto uma geração está em andamento.`,
      saldo >= 10 ? 'ok' : 'baixo');
  } catch (erro) {
    mostrar('Saldo: erro', erro.message, 'baixo');
  }
}

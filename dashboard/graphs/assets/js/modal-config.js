// Modal de configuração (ícone ⚙): salvar, mostrar/ocultar e remover a chave da Tripo.
import { lerChave, mascarar, removerChave, salvarChave } from './chave.js';

const $ = (id) => document.getElementById(id);
const PADRAO_CHAVE = /^[\w.-]{8,200}$/;

function atualizarSituacao() {
  const chave = lerChave();
  $('config-situacao').textContent = chave
    ? `Chave salva neste navegador: ${mascarar(chave)}`
    : 'Nenhuma chave salva neste navegador.';
  $('config-remover').disabled = !chave;
}

function abrir() {
  $('config-chave').value = lerChave();
  $('config-chave').type = 'password';
  $('config-mostrar').textContent = 'Mostrar';
  $('config-erro').textContent = '';
  atualizarSituacao();
  $('modal-config').showModal();
  $('config-chave').focus();
}

function alternarVisibilidade() {
  const campo = $('config-chave');
  const oculto = campo.type === 'password';
  campo.type = oculto ? 'text' : 'password';
  $('config-mostrar').textContent = oculto ? 'Ocultar' : 'Mostrar';
}

function aoSalvar(evento, aoMudar) {
  evento.preventDefault();
  const chave = $('config-chave').value.trim();
  if (!PADRAO_CHAVE.test(chave)) {
    $('config-erro').textContent = 'Chave inválida: use só letras, números, ponto, _ ou - (8 a 200 caracteres).';
    return;
  }
  if (!salvarChave(chave)) {
    $('config-erro').textContent = 'O navegador bloqueou o armazenamento (janela privada?).';
    return;
  }
  $('modal-config').close();
  aoMudar();
}

function aoRemover(aoMudar) {
  removerChave();
  $('config-chave').value = '';
  atualizarSituacao();
  aoMudar();
}

/**
 * Liga o ícone de configuração ao modal.
 * @param {function(): void} aoMudar - Chamada quando a chave é salva ou removida.
 */
export function iniciarModalConfig(aoMudar) {
  $('botao-config').addEventListener('click', abrir);
  $('config-mostrar').addEventListener('click', alternarVisibilidade);
  $('config-cancelar').addEventListener('click', () => $('modal-config').close());
  $('config-remover').addEventListener('click', () => aoRemover(aoMudar));
  $('form-config').addEventListener('submit', (evento) => aoSalvar(evento, aoMudar));
}

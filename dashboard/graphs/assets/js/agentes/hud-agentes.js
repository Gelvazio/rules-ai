// Painéis sobre a cena "Agentes ao vivo": transmissão (atraso), contagem por status e últimos eventos.
import { TRILHAS } from './cena-agentes.js';
import { nomeCurto } from './personagens.js';

const $ = (id) => document.getElementById(id);
const CHAVE_ATRASO = 'agentes-ao-vivo:atraso';
const OPCOES_ATRASO = [0, 10, 30, 60, 120];
const MAX_EVENTOS = 8;
const VERBOS = Object.freeze({
  reservada: 'reservou',
  concluida: 'concluiu',
  bloqueada: 'bloqueou',
  aguardando: 'deixou aguardando o usuário',
  liberada: 'liberou',
  nova: 'nova tarefa',
  removida: 'saiu do quadro',
  mudou: 'mudou',
});
const horaAgora = () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

function lerAtrasoSalvo(padrao) {
  try {
    const texto = window.localStorage.getItem(CHAVE_ATRASO);
    return texto !== null && OPCOES_ATRASO.includes(Number(texto)) ? Number(texto) : padrao;
  } catch {
    return padrao;
  }
}

function salvarAtraso(valor) {
  try {
    window.localStorage.setItem(CHAVE_ATRASO, String(valor));
  } catch {
    // Sem armazenamento (janela privada): o atraso vale só nesta visita.
  }
}

function mostrarSelo(atraso) {
  $('selo-ao-vivo').textContent = atraso ? `● ao vivo −${atraso} s` : '● ao vivo';
}

/**
 * Prepara o seletor de atraso.
 * @param {number} padrao - Atraso do servidor (ATRASO_AGENTES).
 * @param {function(number): void} aoMudar - Recebe o novo atraso em segundos.
 * @returns {number} Atraso inicial (o salvo neste navegador ou o padrão).
 */
export function ligarAtraso(padrao, aoMudar) {
  const seletor = $('atraso');
  const opcoes = [...new Set([...OPCOES_ATRASO, padrao])].sort((a, b) => a - b);
  seletor.replaceChildren(...opcoes.map((valor) => new Option(valor ? `${valor} s` : 'sem atraso', valor)));
  const inicial = lerAtrasoSalvo(padrao);
  seletor.value = String(inicial);
  mostrarSelo(inicial);
  seletor.addEventListener('change', () => {
    const valor = Number(seletor.value);
    salvarAtraso(valor);
    mostrarSelo(valor);
    aoMudar(valor);
  });
  return inicial;
}

/**
 * Mostra a hora da última leitura do quadro e quantos eventos esperam o atraso.
 * @param {number} pendentes - Eventos na fila.
 * @param {string} [erro] - Mensagem quando a leitura falhou.
 */
export function marcarLeitura(pendentes, erro = '') {
  const alvo = $('estado-leitura');
  alvo.classList.toggle('transmissao__estado--erro', Boolean(erro));
  alvo.textContent = erro
    ? `Falha ao ler o quadro: ${erro}`
    : `Lido às ${new Date().toLocaleTimeString('pt-BR')} · ${pendentes} na fila`;
}

/**
 * Atualiza a contagem por status (só reescreve quando muda).
 * @param {object} contagem - status → total.
 */
export function atualizarContagem(contagem) {
  const lista = $('contagem');
  const chave = JSON.stringify(contagem);
  if (lista.dataset.valor === chave) return;
  lista.dataset.valor = chave;
  lista.replaceChildren(...TRILHAS.map(({ status, nome }) => {
    const item = document.createElement('li');
    item.className = `contagem__item contagem__item--${status}`;
    item.textContent = `${nome}: ${contagem[status] ?? 0}`;
    return item;
  }));
}

/**
 * Acrescenta um evento no topo do histórico ("17:24 · Opus 5.5 reservou X").
 * @param {object} evento - {tipo, tarefa, anterior?}.
 */
export function registrarEvento(evento) {
  const { tipo, tarefa, anterior } = evento;
  const agente = tarefa.agente || anterior?.agente || '';
  const hora = tipo === 'reservada' && tarefa.desde ? tarefa.desde.slice(11) : horaAgora();
  const item = document.createElement('li');
  item.className = `eventos__item eventos__item--${tipo}`;
  item.textContent = `${hora} · ${agente ? `${nomeCurto(agente)} ` : ''}${VERBOS[tipo] ?? tipo} ${tarefa.tarefa}`;
  item.title = tarefa.titulo;
  const lista = $('eventos');
  $('eventos-vazio').hidden = true;
  lista.prepend(item);
  while (lista.children.length > MAX_EVENTOS) lista.lastElementChild.remove();
}

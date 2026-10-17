// Compara dois retratos do quadro e transforma as diferenças em eventos, que esperam o atraso na fila.
// Sem DOM e sem Three.js: dá para conferir com `node`.

const TIPO_POR_STATUS = Object.freeze({
  progresso: 'reservada',
  concluido: 'concluida',
  bloqueado: 'bloqueada',
  aguardando: 'aguardando',
  pendente: 'liberada',
});

/**
 * Indexa as subtarefas do quadro pelo id (as tarefas-mãe não são reservadas e ficam de fora).
 * @param {Array<object>} tarefas - Tarefas vindas de /api/agentes.
 * @returns {Map<string, object>} id → tarefa.
 */
export function indexar(tarefas) {
  return new Map(tarefas.filter((t) => !t.mae).map((t) => [t.tarefa, t]));
}

function eventoDaMudanca(anterior, tarefa) {
  if (anterior.status !== tarefa.status) {
    return { tipo: TIPO_POR_STATUS[tarefa.status] ?? 'mudou', tarefa, anterior };
  }
  if (anterior.agente !== tarefa.agente) {
    return { tipo: tarefa.agente ? 'reservada' : 'liberada', tarefa, anterior };
  }
  return null;
}

/**
 * Diferenças entre dois retratos do quadro.
 * @param {Map<string, object>} antes - Retrato anterior.
 * @param {Map<string, object>} depois - Retrato novo.
 * @returns {Array<object>} Eventos {tipo, tarefa, anterior?}.
 */
export function compararRetratos(antes, depois) {
  const eventos = [];
  for (const [id, tarefa] of depois) {
    const anterior = antes.get(id);
    const evento = anterior ? eventoDaMudanca(anterior, tarefa) : { tipo: 'nova', tarefa };
    if (evento) eventos.push(evento);
  }
  for (const [id, tarefa] of antes) {
    if (!depois.has(id)) eventos.push({ tipo: 'removida', tarefa });
  }
  return eventos;
}

/**
 * Fila que só solta cada evento depois do atraso.
 * @param {number} atrasoSegundos - Espera entre perceber a mudança e mostrá-la.
 * @returns {object} enfileirar, retirarProntos, definirAtraso e pendentes.
 */
export function criarFila(atrasoSegundos) {
  let atrasoMs = atrasoSegundos * 1000;
  let itens = [];
  return {
    enfileirar(eventos, agora = Date.now()) {
      itens.push(...eventos.map((evento) => ({ ...evento, recebidoEm: agora })));
    },
    retirarProntos(agora = Date.now()) {
      const vencido = (evento) => evento.recebidoEm + atrasoMs <= agora;
      const prontos = itens.filter(vencido);
      itens = itens.filter((evento) => !vencido(evento));
      return prontos;
    },
    definirAtraso(segundos) {
      atrasoMs = segundos * 1000;
    },
    get pendentes() {
      return itens.length;
    },
  };
}

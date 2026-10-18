// Seção dos modelos 3D abertos do Hugging Face (dados de dashboard/scripts/coletar_hf.py).
import { criar, criarLink } from './elementos.js';
import { dataCurta } from './formatar.js';

const COLUNAS = ['Modelo', 'Tarefa', 'Downloads', 'Likes', 'Licença', 'Biblioteca', 'Atualizado'];
const FONTE_PADRAO = 'https://huggingface.co/models?pipeline_tag=text-to-3d';

function numero(valor) {
  return typeof valor === 'number' ? valor.toLocaleString('pt-BR') : '—';
}

function celulas(modelo) {
  return [
    criarLink(modelo.url, modelo.id),
    modelo.tarefas.join(', ') || modelo.pipeline_tag || '—',
    numero(modelo.downloads),
    numero(modelo.likes),
    modelo.licenca === 'nao_declarada' ? 'não declarada' : modelo.licenca,
    modelo.biblioteca || '—',
    modelo.atualizado_em ? dataCurta(modelo.atualizado_em) : '—',
  ];
}

function criarTabela(modelos) {
  const tabela = criar('table', 'tabela');
  const linhaTopo = criar('tr');
  COLUNAS.forEach((coluna) => linhaTopo.append(criar('th', 'tabela__celula', coluna)));
  tabela.append(criar('thead'), criar('tbody'));
  tabela.tHead.append(linhaTopo);
  modelos.forEach((modelo) => {
    const linha = criar('tr');
    celulas(modelo).forEach((valor) => {
      const celula = criar('td', 'tabela__celula');
      celula.append(valor);
      linha.append(celula);
    });
    tabela.tBodies[0].append(linha);
  });
  const rolagem = criar('div', 'tabela__rolagem');
  rolagem.append(tabela);
  return rolagem;
}

function criarNota(dados) {
  const quando = dados.data_consulta ? dataCurta(dados.data_consulta) : 'nunca';
  const nota = criar('p', 'ferramentas__nota',
    `${dados.modelos.length} modelos com metadados públicos do Hub, sem token. `
    + `Downloads e likes são do Hub inteiro (não do dashboard). Coleta: ${quando}. Atualize com `
    + 'python dashboard/scripts/coletar_hf.py. Fonte: ');
  nota.append(criarLink(dados.fonte || FONTE_PADRAO, 'ver no Hub'));
  nota.append(document.createTextNode('.'));
  return nota;
}

/**
 * Seção "Modelos 3D abertos (Hugging Face)" da aba Ferramentas de IA 3D.
 * @param {object} dados - Bloco modelos_3d_abertos do ferramentas.js.
 * @returns {HTMLElement} Seção pronta.
 */
export function criarSecaoModelosHf(dados) {
  const seguros = dados ?? { modelos: [] };
  const secao = criar('section', 'ferramentas__secao');
  secao.append(
    criar('h2', 'ferramentas__titulo', 'Modelos 3D abertos (Hugging Face)'),
    criarNota(seguros),
  );
  if (seguros.modelos.length) {
    secao.append(criarTabela(seguros.modelos));
  } else {
    secao.append(criar('p', 'cartao__vazio',
      'Nenhum modelo coletado ainda: rode python dashboard/scripts/coletar_hf.py.'));
  }
  return secao;
}

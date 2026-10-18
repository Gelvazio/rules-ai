// Monta a aba "Ferramentas de IA 3D": resumo, tabela comparativa, modelos abertos do HF,
// cartões e reels.
import { DADOS_FERRAMENTAS } from '../dados/ferramentas.js';
import { criarCartaoReel, criarCartaoSite } from './cartoes.js';
import { criar, criarEtiqueta, criarLink } from './elementos.js';
import { NOMES_TIPOS, dataCurta, dominio, emReais, menorPrecoPago } from './formatar.js';
import { criarSecaoModelosHf } from './modelos-hf.js';

const COLUNAS = ['Link', 'Ferramenta', 'Tipo', 'Coletou', 'Formatos', 'Menor preço pago', 'Preço em R$ no site'];
const CASAS_COTACAO = { minimumFractionDigits: 4 };

function textoMenorPreco(site) {
  if (site.tipo === 'artigo_comparativo') return '— (artigo)';
  const menor = menorPrecoPago(site.precos);
  if (!menor) return '—';
  return menor.moeda === 'USD' ? `${menor.texto} (${emReais(menor.valor_brl)})` : menor.texto;
}

function criarResumo(dados) {
  const total = dados.sites.length + dados.reels.length;
  const ok = dados.sites.filter((s) => s.acessou).length + dados.reels.filter((r) => r.salvo).length;
  const cotacao = dados.cotacao_usd_brl;
  const itens = [
    ['Coleta', dataCurta(dados.data_consulta)],
    ['Cotação USD → BRL', cotacao.valor ? `R$ ${cotacao.valor.toLocaleString('pt-BR', CASAS_COTACAO)}` : 'indisponível'],
    ['Links com dados', `${ok} de ${total}`],
  ];
  const resumo = criar('dl', 'resumo');
  itens.forEach(([termo, valor]) => {
    const item = criar('div', 'resumo__item');
    item.append(criar('dt', 'resumo__termo', termo), criar('dd', 'resumo__valor', valor));
    resumo.append(item);
  });
  return resumo;
}

function celulasSite(site) {
  const temReal = site.precos.some((p) => p.moeda === 'BRL');
  return [
    site.id,
    criarLink(site.url, site.titulo ? site.titulo.split(/[|-]/)[0].trim() : dominio(site.url)),
    NOMES_TIPOS[site.tipo] ?? site.tipo,
    criarEtiqueta(site.acessou ? 'sim' : 'não', site.acessou ? 'ok' : 'erro'),
    site.formatos.join(', ') || '—',
    textoMenorPreco(site),
    temReal ? 'sim' : 'não',
  ];
}

function criarTabela(sites) {
  const tabela = criar('table', 'tabela');
  const linhaTopo = criar('tr');
  COLUNAS.forEach((coluna) => linhaTopo.append(criar('th', 'tabela__celula', coluna)));
  tabela.append(criar('thead'), criar('tbody'));
  tabela.tHead.append(linhaTopo);
  sites.forEach((site) => {
    const linha = criar('tr');
    celulasSite(site).forEach((valor) => {
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

function criarSecao(titulo, nota, conteudo) {
  const secao = criar('section', 'ferramentas__secao');
  secao.append(criar('h2', 'ferramentas__titulo', titulo));
  if (nota) secao.append(criar('p', 'ferramentas__nota', nota));
  secao.append(conteudo);
  return secao;
}

function criarGrade(cartoes) {
  const grade = criar('div', 'grade');
  grade.append(...cartoes);
  return grade;
}

/**
 * Preenche o contêiner da aba com os dados gerados por gerar_dados_painel.py.
 * @param {HTMLElement} conteiner - Elemento da aba.
 */
export function montarPainelFerramentas(conteiner) {
  const dados = DADOS_FERRAMENTAS;
  const notaPrecos = 'Trechos de preço lidos da página e das páginas de preço; '
    + 'confira no site antes de decidir (natureza: fato com fonte, valores podem mudar).';
  conteiner.replaceChildren(
    criarResumo(dados),
    criarSecao('Comparativo', notaPrecos, criarTabela(dados.sites)),
    criarSecao('Sites (L04 a L10)', '', criarGrade(dados.sites.map(criarCartaoSite))),
    criarSecaoModelosHf(dados.modelos_3d_abertos),
    criarSecao('Reels do Instagram (L01 a L03)', 'Legendas das páginas salvas em MODELOS-DE-IA.',
      criarGrade(dados.reels.map(criarCartaoReel))),
  );
}

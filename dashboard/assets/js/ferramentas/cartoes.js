// Cartões de cada site (L04 a L10) e de cada reel (L01 a L03).
import { criar, criarBloco, criarEtiqueta, criarLink, criarLista } from './elementos.js';
import { NOMES_TIPOS, dataCurta, dominio, textoPreco } from './formatar.js';

const MAX_PRECOS = 12;

function cabecalhoCartao(registro, titulo) {
  const topo = criar('header', 'cartao__topo');
  const natureza = registro.tipo_natureza === 'fato' ? 'ok' : 'aviso';
  topo.append(
    criar('span', 'cartao__id', registro.id),
    criarEtiqueta(NOMES_TIPOS[registro.tipo] ?? registro.tipo, 'neutro'),
    criarEtiqueta(registro.tipo_natureza === 'fato' ? 'tipo confirmado' : 'tipo provável', natureza),
  );
  const nome = criar('h3', 'cartao__titulo', titulo);
  return [topo, nome, criarLink(registro.url, dominio(registro.url), 'cartao__url')];
}

function blocoPrecos(precos) {
  if (!precos.length) return criar('p', 'cartao__vazio', 'Nenhum preço na página (nao_verificado).');
  const itens = precos.slice(0, MAX_PRECOS).map((p) => textoPreco(p));
  const lista = criarLista(itens, 'precos');
  if (precos.length > MAX_PRECOS) {
    lista.append(criar('li', 'precos__item precos__item--mais', `+${precos.length - MAX_PRECOS}`));
  }
  return lista;
}

function blocoExtras(extras) {
  const itens = extras.map((extra) => {
    const linha = criar('span', 'extra');
    linha.append(
      criarEtiqueta(extra.acessou ? 'ok' : 'bloqueado', extra.acessou ? 'ok' : 'erro'),
      criarLink(extra.url, new URL(extra.url).pathname || extra.url),
    );
    return linha;
  });
  return criarLista(itens, 'extras');
}

/**
 * Cartão de um site coletado.
 * @param {object} site - Registro de site do ferramentas.js.
 * @returns {HTMLElement} Cartão.
 */
export function criarCartaoSite(site) {
  const cartao = criar('article', `cartao${site.acessou ? '' : ' cartao--falha'}`);
  cartao.append(...cabecalhoCartao(site, site.titulo || dominio(site.url)));
  if (!site.acessou) {
    cartao.append(criar('p', 'cartao__erro', site.erro || 'Não foi possível acessar.'));
    return cartao;
  }
  if (site.descricao) cartao.append(criar('p', 'cartao__descricao', site.descricao));
  if (site.formatos.length) {
    cartao.append(criarBloco('Formatos de exportação', criarLista(site.formatos, 'chips')));
  }
  cartao.append(criarBloco('Preços encontrados (US$ → R$)', blocoPrecos(site.precos)));
  if (site.ferramentas_citadas.length) {
    cartao.append(criarBloco('Títulos do artigo', criarLista(site.ferramentas_citadas, 'lista')));
  }
  if (site.paginas_extras.length) {
    cartao.append(criarBloco('Páginas extras', blocoExtras(site.paginas_extras)));
  }
  return cartao;
}

function metricasReel(reel) {
  const itens = [`@${reel.perfil}`];
  if (reel.data_iso) itens.push(dataCurta(reel.data_iso));
  if (reel.curtidas) itens.push(`${reel.curtidas} curtidas`);
  if (reel.comentarios) itens.push(`${reel.comentarios} comentários`);
  return criar('p', 'cartao__metricas', itens.join(' · '));
}

/**
 * Cartão de um reel, com a legenda da página salva em MODELOS-DE-IA.
 * @param {object} reel - Registro de reel do ferramentas.js.
 * @returns {HTMLElement} Cartão.
 */
export function criarCartaoReel(reel) {
  const cartao = criar('article', 'cartao cartao--reel');
  cartao.append(...cabecalhoCartao(reel, reel.autor || `@${reel.perfil}`), metricasReel(reel));
  if (!reel.salvo) {
    cartao.append(criar('p', 'cartao__erro', 'Página não salva em MODELOS-DE-IA (nao_verificado).'));
    return cartao;
  }
  cartao.append(
    criarBloco('Legenda', criar('p', 'cartao__legenda', reel.legenda || '—')),
    criar('p', 'cartao__fonte', `Fonte: MODELOS-DE-IA/${reel.pasta}`),
  );
  return cartao;
}

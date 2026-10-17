// Fábrica de elementos do DOM. Usa textContent (os dados vêm de páginas de terceiros).

/**
 * Cria um elemento com classe e texto.
 * @param {string} tag - Nome da tag.
 * @param {string} [classe] - Classes CSS.
 * @param {string} [texto] - Texto (inserido como textContent).
 * @returns {HTMLElement} Elemento criado.
 */
export function criar(tag, classe = '', texto = '') {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto) elemento.textContent = texto;
  return elemento;
}

/**
 * Cria um link externo que abre em nova aba.
 * @param {string} url - Endereço.
 * @param {string} texto - Texto do link.
 * @param {string} [classe] - Classes CSS.
 * @returns {HTMLAnchorElement} Link criado.
 */
export function criarLink(url, texto, classe = 'link') {
  const link = criar('a', classe, texto);
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}

/**
 * Cria uma etiqueta (chip) com variação de cor.
 * @param {string} texto - Texto da etiqueta.
 * @param {string} [variacao] - Sufixo BEM (ok, erro, aviso, neutro).
 * @returns {HTMLElement} Etiqueta.
 */
export function criarEtiqueta(texto, variacao = 'neutro') {
  return criar('span', `etiqueta etiqueta--${variacao}`, texto);
}

/**
 * Cria um bloco com título h3 e o conteúdo dado.
 * @param {string} titulo - Título do bloco.
 * @param {HTMLElement} conteudo - Conteúdo.
 * @returns {HTMLElement} Bloco.
 */
export function criarBloco(titulo, conteudo) {
  const bloco = criar('div', 'cartao__bloco');
  bloco.append(criar('h4', 'cartao__subtitulo', titulo), conteudo);
  return bloco;
}

/**
 * Cria uma lista ul a partir de itens (texto ou elemento).
 * @param {Array<string|HTMLElement>} itens - Itens da lista.
 * @param {string} [classe] - Classe da lista.
 * @returns {HTMLUListElement} Lista.
 */
export function criarLista(itens, classe = 'lista') {
  const lista = criar('ul', classe);
  itens.forEach((item) => {
    const li = criar('li', `${classe}__item`);
    li.append(item);
    lista.append(li);
  });
  return lista;
}

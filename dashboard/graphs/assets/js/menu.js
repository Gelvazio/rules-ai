// Menu único das páginas do 3D GRAPHS AI: preenche todo <nav data-menu> com os mesmos links,
// destaca a página aberta e põe acima dele a linha dos projetos, com o projeto atual em destaque.
// Para acrescentar uma página ou um projeto, basta uma linha em ITENS_MENU ou em PROJETOS.

const PROJETOS = Object.freeze([
  { nome: 'Rules Ai', atual: true },
]);

const ITENS_MENU = Object.freeze([
  { texto: 'Dashboard', href: '../index.html' },
  { texto: '3D GRAPHS AI', href: 'index.html' },
  { texto: 'Cena do prompt 04', href: 'cena.html' },
  { texto: 'Agentes ao vivo', href: 'agentes.html' },
]);

function paginaAtual() {
  const arquivo = window.location.pathname.split('/').pop();
  return arquivo || 'index.html';
}

function criarLink({ texto, href }, atual) {
  const link = document.createElement('a');
  link.className = 'abas__botao';
  link.href = href;
  link.textContent = texto;
  if (href === atual) {
    link.classList.add('abas__botao--atual');
    link.setAttribute('aria-current', 'page');
  }
  return link;
}

function criarProjeto({ nome, atual }) {
  const item = document.createElement('span');
  item.className = atual ? 'abas__botao abas__botao--atual abas__botao--projeto' : 'abas__botao abas__botao--projeto';
  item.textContent = nome;
  if (atual) item.setAttribute('aria-current', 'true');
  return item;
}

function criarLinhaProjetos() {
  const linha = document.createElement('nav');
  linha.className = 'abas abas--projetos';
  linha.setAttribute('aria-label', 'Projeto atual');
  linha.append(...PROJETOS.map(criarProjeto));
  return linha;
}

/**
 * Põe a linha dos projetos acima do <nav> e os links no começo dele (o que já houver nele, como
 * saldo e ⚙, fica depois).
 * @param {HTMLElement} nav - Elemento <nav data-menu>.
 */
export function montarMenu(nav) {
  const atual = paginaAtual();
  nav.before(criarLinhaProjetos());
  nav.prepend(...ITENS_MENU.map((item) => criarLink(item, atual)));
}

document.querySelectorAll('nav[data-menu]').forEach(montarMenu);

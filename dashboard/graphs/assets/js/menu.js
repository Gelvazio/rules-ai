// Menu único das páginas do 3D GRAPHS AI: preenche todo <nav data-menu> com os mesmos links e
// destaca a página aberta. Para acrescentar uma página, basta uma linha em ITENS_MENU.

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

/**
 * Põe os links do menu no começo do <nav> (o que já houver nele, como saldo e ⚙, fica depois).
 * @param {HTMLElement} nav - Elemento <nav data-menu>.
 */
export function montarMenu(nav) {
  const atual = paginaAtual();
  nav.prepend(...ITENS_MENU.map((item) => criarLink(item, atual)));
}

document.querySelectorAll('nav[data-menu]').forEach(montarMenu);

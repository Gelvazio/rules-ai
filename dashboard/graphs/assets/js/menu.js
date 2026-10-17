// Menu único das páginas do 3D GRAPHS AI: preenche todo <nav data-menu> com os mesmos links,
// destaca a página aberta e põe acima dele a linha dos projetos. Escolher um projeto recarrega a
// página com ?projeto=<pasta>, e a página "Agentes ao vivo" passa a ler o quadro dele.
// Para acrescentar uma página, basta uma linha em ITENS_MENU; os projetos vêm de /api/projetos.

const ROTA_PROJETOS = '/api/projetos';
/** Usado quando a página não veio do servidor local (sem /api/projetos). */
const PROJETOS_PADRAO = Object.freeze({ padrao: 'rules-ai', projetos: [{ id: 'rules-ai', nome: 'Rules Ai' }] });

const ITENS_MENU = Object.freeze([
  { texto: 'Dashboard', href: '../index.html' },
  { texto: '3D GRAPHS AI', href: 'index.html' },
  { texto: 'Cena do prompt 04', href: 'cena.html' },
  { texto: 'Agentes ao vivo', href: 'agentes.html' },
]);

const parametroProjeto = () => new URLSearchParams(window.location.search).get('projeto') ?? '';

function paginaAtual() {
  const arquivo = window.location.pathname.split('/').pop();
  return arquivo || 'index.html';
}

function comProjeto(href) {
  const projeto = parametroProjeto();
  if (!projeto || href.startsWith('../')) return href;
  return `${href}?projeto=${encodeURIComponent(projeto)}`;
}

function criarLink({ texto, href }, atual) {
  const link = document.createElement('a');
  link.className = 'abas__botao';
  link.href = comProjeto(href);
  link.textContent = texto;
  if (href === atual) {
    link.classList.add('abas__botao--atual');
    link.setAttribute('aria-current', 'page');
  }
  return link;
}

function criarProjeto({ id, nome }, atual) {
  const link = document.createElement('a');
  link.className = 'abas__botao abas__botao--projeto';
  link.href = `${paginaAtual()}?projeto=${encodeURIComponent(id)}`;
  link.textContent = nome;
  if (id === atual) {
    link.classList.add('abas__botao--atual');
    link.setAttribute('aria-current', 'true');
  }
  return link;
}

function preencherProjetos(linha, { padrao, projetos }) {
  const atual = parametroProjeto() || padrao;
  linha.replaceChildren(...projetos.map((projeto) => criarProjeto(projeto, atual)));
}

async function carregarProjetos(linha) {
  try {
    const resposta = await fetch(ROTA_PROJETOS);
    if (!resposta.ok) throw new Error(String(resposta.status));
    preencherProjetos(linha, await resposta.json());
  } catch {
    // Sem servidor local (ou servidor antigo): fica só o projeto padrão.
  }
}

/**
 * Põe a linha dos projetos acima do <nav> e os links no começo dele (o que já houver nele, como
 * saldo e ⚙, fica depois).
 * @param {HTMLElement} nav - Elemento <nav data-menu>.
 */
export function montarMenu(nav) {
  const linha = document.createElement('nav');
  linha.className = 'abas abas--projetos';
  linha.setAttribute('aria-label', 'Projetos');
  preencherProjetos(linha, PROJETOS_PADRAO);
  nav.before(linha);
  nav.prepend(...ITENS_MENU.map((item) => criarLink(item, paginaAtual())));
  carregarProjetos(linha);
}

document.querySelectorAll('nav[data-menu]').forEach(montarMenu);

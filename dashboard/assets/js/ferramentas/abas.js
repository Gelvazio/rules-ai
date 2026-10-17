// Troca entre as abas do dashboard e lembra a última aberta (só neste navegador).
import { montarPainelFerramentas } from './painel-ferramentas.js';

const CHAVE_ABA = 'dashboard-aba';
const ABA_PADRAO = 'rede';

function lerAbaSalva() {
  try {
    return localStorage.getItem(CHAVE_ABA) || ABA_PADRAO;
  } catch {
    return ABA_PADRAO;
  }
}

function salvarAba(aba) {
  try {
    localStorage.setItem(CHAVE_ABA, aba);
  } catch {
    // Sem armazenamento (janela privada): a aba só não é lembrada.
  }
}

function mostrarAba(aba, botoes) {
  botoes.forEach((botao) => {
    const ativa = botao.dataset.aba === aba;
    botao.setAttribute('aria-selected', String(ativa));
    document.getElementById(botao.getAttribute('aria-controls')).hidden = !ativa;
    if (ativa) {
      document.getElementById('titulo-pagina').textContent = botao.dataset.titulo;
      document.getElementById('subtitulo-pagina').textContent = botao.dataset.subtitulo;
    }
  });
  window.dispatchEvent(new Event('resize')); // a cena 3D reajusta o tamanho ao voltar
  salvarAba(aba);
}

/** Liga os botões das abas e monta a aba de ferramentas. */
export function iniciarAbas() {
  const botoes = [...document.querySelectorAll('.abas__botao')];
  montarPainelFerramentas(document.getElementById('conteudo-ferramentas'));
  botoes.forEach((botao) => {
    botao.addEventListener('click', () => mostrarAba(botao.dataset.aba, botoes));
  });
  const salva = lerAbaSalva();
  mostrarAba(botoes.some((b) => b.dataset.aba === salva) ? salva : ABA_PADRAO, botoes);
}

iniciarAbas();

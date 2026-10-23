// Página "Agentes ao vivo": lê o tasks/STATUS.md pelo servidor local a cada intervalo, guarda as
// mudanças numa fila e só as anima na cena 3D depois do atraso escolhido.
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { lerAgentes } from './api.js';
import { CANAL } from './config.js';
import { iniciarCanal, lerEstadoInicial } from './agentes/canal.js';
import { montarCenaAgentes } from './agentes/cena-agentes.js';
import { compararRetratos, criarFila, indexar } from './agentes/fila-atrasada.js';
import { atualizarContagem, ligarAtraso, marcarLeitura, registrarEvento } from './agentes/hud-agentes.js';
import { ajustarTamanho, criarBase } from './visualizador.js';

const $ = (id) => document.getElementById(id);
const reduzirMovimento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/** Projeto escolhido no menu de projetos (?projeto=<pasta>); vazio = padrão do servidor. */
const PROJETO = new URLSearchParams(window.location.search).get('projeto') ?? '';

/** Valores que o GitHub raw não traz (iguais aos do servidor: atraso 30 s, coleta a cada 10 s). */
const PADROES_RAW = Object.freeze({ atraso_padrao: 30, intervalo: 10 });

function avisar(texto) {
  $('aviso').textContent = texto;
  $('aviso').hidden = !texto;
}

/** Camada HTML dos rótulos, do tamanho da cena e sem capturar o mouse (os controles seguem no canvas). */
function criarCamadaRotulos(conteiner) {
  const rotulos = new CSS2DRenderer();
  rotulos.domElement.className = 'camada-rotulos';
  conteiner.append(rotulos.domElement);
  return rotulos;
}

function prepararBase() {
  const conteiner = $('cena');
  const base = criarBase(conteiner);
  base.rotulos = criarCamadaRotulos(conteiner);
  base.controles.autoRotate = false;
  base.camera.position.set(0, 1.5, 23);
  base.controles.target.set(0, 0, 0);
  const ajustar = () => {
    ajustarTamanho(base, conteiner);
    base.rotulos.setSize(conteiner.clientWidth, conteiner.clientHeight);
  };
  ajustar();
  window.addEventListener('resize', ajustar);
  return base;
}

/** Compara o estado novo com o último e põe as diferenças na fila (que aplica o atraso). */
function criarAplicador(primeiro, fila) {
  let retrato = indexar(primeiro.tarefas);
  return (estado) => {
    const novo = indexar(estado.tarefas);
    fila.enfileirar(compararRetratos(retrato, novo));
    retrato = novo;
    marcarLeitura(fila.pendentes);
  };
}

/** Lê o quadro pela fonte que funcionou na abertura, a cada intervalo. */
function vigiarQuadro(primeiro, aplicar, fila, fonte) {
  const ler = async () => {
    try {
      aplicar(await fonte());
    } catch (erro) {
      marcarLeitura(fila.pendentes, erro.message);
    }
  };
  window.setInterval(ler, primeiro.intervalo * 1000);
}

/** Estado inicial pelo GitHub raw (projeto do canal) ou, se falhar, pelo servidor local. */
async function lerPrimeiro() {
  if (!PROJETO || PROJETO === CANAL.projeto) {
    try {
      const fonte = async () => ({ ...PADROES_RAW, ...(await lerEstadoInicial()) });
      return { primeiro: await fonte(), fonte, raw: true };
    } catch (erro) {
      avisar(`GitHub raw indisponível (${erro.message}); usando o servidor local.`);
    }
  }
  const fonte = () => lerAgentes(PROJETO);
  return { primeiro: await fonte(), fonte, raw: false };
}

function animar(base, cenaAgentes, fila) {
  const relogio = new THREE.Clock();
  base.renderizador.setAnimationLoop(() => {
    const dt = Math.min(relogio.getDelta(), 0.1);
    for (const evento of fila.retirarProntos()) {
      cenaAgentes.aplicarEvento(evento);
      registrarEvento(evento);
    }
    atualizarContagem(cenaAgentes.contagem());
    cenaAgentes.desenhar(dt, relogio.elapsedTime);
    base.controles.update();
    base.renderizador.render(base.cena, base.camera);
    base.rotulos.render(base.cena, base.camera);
  });
}

async function iniciar() {
  const base = prepararBase();
  const reduzir = reduzirMovimento();
  $('nota-movimento').hidden = !reduzir;
  let leitura;
  try {
    leitura = await lerPrimeiro();
  } catch (erro) {
    if (erro instanceof TypeError || /404/.test(erro.message)) {
      throw new Error('abra pelo servidor local (python dashboard/servidor.py); '
        + 'se ele já estava rodando, reinicie-o para ganhar a rota /api/agentes.');
    }
    throw erro;
  }
  const { primeiro, fonte, raw } = leitura;
  const cenaAgentes = montarCenaAgentes(base.cena, { reduzir });
  cenaAgentes.sincronizar(primeiro.tarefas);
  const fila = criarFila(0);
  fila.definirAtraso(ligarAtraso(primeiro.atraso_padrao, (segundos) => fila.definirAtraso(segundos)));
  marcarLeitura(0);
  const aplicar = criarAplicador(primeiro, fila);
  vigiarQuadro(primeiro, aplicar, fila, fonte);
  if (raw) iniciarCanal({ aoEstado: aplicar, aoAviso: avisar, inicial: primeiro });
  animar(base, cenaAgentes, fila);
}

iniciar().catch((erro) => avisar(`Não foi possível montar a cena: ${erro.message}`));

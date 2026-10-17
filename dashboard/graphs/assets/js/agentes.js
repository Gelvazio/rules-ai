// Página "Agentes ao vivo": lê o tasks/STATUS.md pelo servidor local a cada intervalo, guarda as
// mudanças numa fila e só as anima na cena 3D depois do atraso escolhido.
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { lerAgentes } from './api.js';
import { montarCenaAgentes } from './agentes/cena-agentes.js';
import { compararRetratos, criarFila, indexar } from './agentes/fila-atrasada.js';
import { atualizarContagem, ligarAtraso, marcarLeitura, registrarEvento } from './agentes/hud-agentes.js';
import { ajustarTamanho, criarBase } from './visualizador.js';

const $ = (id) => document.getElementById(id);
const reduzirMovimento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  base.camera.position.set(0, 5.5, 15);
  base.controles.target.set(0, 0.3, 0);
  const ajustar = () => {
    ajustarTamanho(base, conteiner);
    base.rotulos.setSize(conteiner.clientWidth, conteiner.clientHeight);
  };
  ajustar();
  window.addEventListener('resize', ajustar);
  return base;
}

/** Lê o quadro a cada intervalo e põe as diferenças na fila. */
function vigiarQuadro(primeiro, fila) {
  let retrato = indexar(primeiro.tarefas);
  const ler = async () => {
    try {
      const novo = indexar((await lerAgentes()).tarefas);
      fila.enfileirar(compararRetratos(retrato, novo));
      retrato = novo;
      marcarLeitura(fila.pendentes);
    } catch (erro) {
      marcarLeitura(fila.pendentes, erro.message);
    }
  };
  window.setInterval(ler, primeiro.intervalo * 1000);
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
  let primeiro;
  try {
    primeiro = await lerAgentes();
  } catch {
    throw new Error('abra pelo servidor local (python dashboard/graphs/servidor.py); '
      + 'se ele já estava rodando, reinicie-o para ganhar a rota /api/agentes.');
  }
  const cenaAgentes = montarCenaAgentes(base.cena, { reduzir });
  cenaAgentes.sincronizar(primeiro.tarefas);
  const fila = criarFila(0);
  fila.definirAtraso(ligarAtraso(primeiro.atraso_padrao, (segundos) => fila.definirAtraso(segundos)));
  marcarLeitura(0);
  vigiarQuadro(primeiro, fila);
  animar(base, cenaAgentes, fila);
}

iniciar().catch((erro) => avisar(`Não foi possível montar a cena: ${erro.message}`));

// Página "Cenas dos prompts": monta a cena 3D animada e gera na Tripo os objetos que faltam.
import * as THREE from 'three';
import { acompanharTarefa, gerarObjetoCena, lerEstado, listarCenas } from './api.js';
import { CENA_PADRAO, NOMES_STATUS } from './config.js';
import { atualizarContadores, ligarControles, mostrarObjetos } from './cenas/hud.js';
import { criarLinhaDoTempo } from './cenas/linha-do-tempo.js';
import { montarCenaPrompt04 } from './cenas/prompt-04.js';
import { iniciarModalConfig } from './modal-config.js';
import { ajustarTamanho, criarBase } from './visualizador.js';

const $ = (id) => document.getElementById(id);
const MONTADORES = { 'prompt-04': montarCenaPrompt04 };

function avisar(texto) {
  $('aviso').textContent = texto;
  $('aviso').hidden = !texto;
}

async function carregarDados() {
  try {
    const cenas = await listarCenas();
    return { cenas, doServidor: true };
  } catch {
    const resposta = await fetch(CENA_PADRAO);
    return { cenas: [await resposta.json()], doServidor: false };
  }
}

function prepararBase() {
  const conteiner = $('cena');
  const base = criarBase(conteiner);
  base.controles.autoRotate = false;
  base.camera.position.set(0.8, 3.2, 11);
  base.controles.target.set(0.8, 0.9, 0);
  ajustarTamanho(base, conteiner);
  window.addEventListener('resize', () => ajustarTamanho(base, conteiner));
  return base;
}

function animar(base, cenaMontada, dados) {
  const linha = criarLinhaDoTempo({
    duracao: dados.config.duracao_segundos,
    pausaFinal: dados.config.pausa_final_segundos,
  });
  ligarControles(linha);
  const relogio = new THREE.Clock();
  base.renderizador.setAnimationLoop(() => {
    const dt = Math.min(relogio.getDelta(), 0.1);
    const estado = cenaMontada.desenhar(linha.avancar(dt), relogio.elapsedTime);
    atualizarContadores(dados.config, estado.assumidos);
    base.controles.update();
    base.renderizador.render(base.cena, base.camera);
  });
}

async function gerarFaltantes(dados, faltam) {
  const custo = `${faltam.length * 10} a ${faltam.length * 20} créditos`;
  if (!window.confirm(`Gerar ${faltam.length} modelos na Tripo?\nCusto estimado: ${custo}.`)) return;
  $('botao-gerar-faltam').disabled = true;
  for (const objeto of faltam) {
    $('progresso-cena').textContent = `${objeto.nome}: enviando…`;
    const taskId = await gerarObjetoCena(dados.id, objeto.id);
    const final = await acompanharTarefa(taskId, ({ status, progresso }) => {
      $('progresso-cena').textContent = `${objeto.nome}: ${NOMES_STATUS[status] ?? status} · ${progresso ?? 0}%`;
    });
    if (!final.arquivo) throw new Error(`${objeto.nome}: terminou como "${NOMES_STATUS[final.status] ?? final.status}".`);
  }
  window.location.reload(); // recarrega para trocar as formas pelos GLB
}

function textoSemChave(doServidor) {
  return doServidor
    ? 'Para gerar: clique na engrenagem ⚙ e salve a sua chave da Tripo.'
    : 'Para gerar: abra pelo servidor local (python dashboard/graphs/servidor.py).';
}

/** Consulta o servidor (com a chave do navegador) e liga ou desliga o botão de gerar. */
async function atualizarGeracao(contexto) {
  const estado = contexto.doServidor ? await lerEstado() : null;
  const podeGerar = Boolean(estado && (estado.chave_no_pedido || estado.chave_configurada));
  contexto.faltam = mostrarObjetos(contexto.dados, contexto.origens, podeGerar);
  $('progresso-cena').textContent = podeGerar ? '' : textoSemChave(contexto.doServidor);
}

async function iniciar() {
  const base = prepararBase();
  const { cenas, doServidor } = await carregarDados();
  const dados = cenas.find((c) => c.id === 'prompt-04') ?? cenas[0];
  $('titulo-cena').textContent = dados.titulo;
  $('aviso-cena').textContent = dados.aviso;
  const cenaMontada = await MONTADORES[dados.id](base.cena, dados);
  const contexto = { dados, doServidor, origens: cenaMontada.origens, faltam: [] };
  iniciarModalConfig(() => atualizarGeracao(contexto));
  await atualizarGeracao(contexto);
  $('botao-gerar-faltam').addEventListener('click', () => gerarFaltantes(dados, contexto.faltam).catch((e) => {
    avisar(e.message);
    $('botao-gerar-faltam').disabled = false;
  }));
  animar(base, cenaMontada, dados);
}

iniciar().catch((erro) => avisar(`Não foi possível montar a cena: ${erro.message}`));

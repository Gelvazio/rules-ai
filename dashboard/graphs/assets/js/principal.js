// Liga o visualizador, a galeria, o formulário de geração e o modal de configuração.
import { acompanharTarefa, gerarModelo, lerEstado, listarModelos } from './api.js';
import { NOMES_STATUS, PASTA_MODELOS } from './config.js';
import { iniciarModalConfig } from './modal-config.js';
import { criarVisualizador } from './visualizador.js';

const $ = (id) => document.getElementById(id);
const visualizador = criarVisualizador($('cena'));
let estadoAtual = null;

function avisar(texto) {
  $('aviso').textContent = texto;
  $('aviso').hidden = !texto;
}

async function abrirModelo(modelo, botao) {
  document.querySelectorAll('.galeria__item').forEach((b) => b.removeAttribute('aria-current'));
  botao?.setAttribute('aria-current', 'true');
  $('rotulo-cena').textContent = `“${modelo.prompt}” · gerado pela Tripo`;
  try {
    await visualizador.carregarModelo(PASTA_MODELOS + encodeURIComponent(modelo.arquivo));
  } catch (erro) {
    avisar(`Não foi possível abrir o modelo: ${erro.message}`);
  }
}

function itemGaleria(modelo) {
  const li = document.createElement('li');
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'galeria__item';
  botao.textContent = modelo.prompt;
  const data = document.createElement('span');
  data.className = 'galeria__data';
  data.textContent = new Date(modelo.criado_em).toLocaleString('pt-BR');
  botao.append(data);
  botao.addEventListener('click', () => abrirModelo(modelo, botao));
  li.append(botao);
  return li;
}

async function carregarGaleria(abrirPrimeiro) {
  const modelos = await listarModelos().catch(() => []);
  const lista = $('galeria');
  lista.replaceChildren(...modelos.map(itemGaleria));
  if (!modelos.length) {
    lista.innerHTML = '<li class="galeria__vazia">Nenhum modelo gerado ainda.</li>';
    visualizador.mostrarExemplo();
    $('rotulo-cena').textContent = 'Exemplo procedural (sem IA) — gere um modelo para substituir';
  } else if (abrirPrimeiro) {
    abrirModelo(modelos[0], lista.querySelector('.galeria__item'));
  }
}

function mostrarProgresso({ status, progresso }) {
  $('progresso').hidden = false;
  $('progresso-barra').style.width = `${progresso ?? 0}%`;
  $('progresso-texto').textContent = `${NOMES_STATUS[status] ?? status} · ${progresso ?? 0}%`;
}

const temChave = (estado) => Boolean(estado && (estado.chave_no_pedido || estado.chave_configurada));

async function aoGerar(evento) {
  evento.preventDefault();
  const prompt = $('prompt').value.trim();
  if (!prompt || !temChave(estadoAtual)) return;
  const custo = `${estadoAtual.custo_creditos} créditos (US$ 0,10 a 0,20)`;
  if (!window.confirm(`Gerar "${prompt}"?\nCusto estimado: ${custo} na sua conta Tripo.`)) return;
  $('botao-gerar').disabled = true;
  avisar('');
  try {
    const final = await acompanharTarefa(await gerarModelo(prompt), mostrarProgresso);
    if (!final.arquivo) throw new Error(`Geração terminou como "${NOMES_STATUS[final.status] ?? final.status}".`);
    await carregarGaleria(true);
  } catch (erro) {
    avisar(erro.message);
  } finally {
    await atualizarEstado();
  }
}

function descreverEstado(estado) {
  if (!estado) return 'Abra pelo servidor local (python dashboard/graphs/servidor.py) para gerar e ver a galeria.';
  if (!temChave(estado)) return 'Sem chave da Tripo: clique na engrenagem ⚙ para informar a sua.';
  const origem = estado.chave_no_pedido ? 'chave deste navegador' : 'chave do graphs/.env';
  return `Pronto para gerar (${origem}) · ${estado.geracoes_feitas}/${estado.limite_geracoes} gerações nesta execução.`;
}

async function atualizarEstado() {
  estadoAtual = await lerEstado();
  $('estado-api').textContent = descreverEstado(estadoAtual);
  $('botao-gerar').disabled = !temChave(estadoAtual);
  return estadoAtual;
}

async function iniciar() {
  $('custo').textContent = 'Custo por modelo: 10 a 20 créditos (1 crédito = US$ 0,01).';
  $('form-gerar').addEventListener('submit', aoGerar);
  iniciarModalConfig(atualizarEstado);
  if (await atualizarEstado()) await carregarGaleria(true);
  else visualizador.mostrarExemplo();
}

iniciar();

// Liga o visualizador, a galeria e o formulário de geração.
import { acompanharTarefa, gerarModelo, lerEstado, listarModelos } from './api.js';
import { NOMES_STATUS, PASTA_MODELOS } from './config.js';
import { criarVisualizador } from './visualizador.js';

const $ = (id) => document.getElementById(id);
const visualizador = criarVisualizador($('cena'));

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

async function aoGerar(evento, estado) {
  evento.preventDefault();
  const prompt = $('prompt').value.trim();
  if (!prompt) return;
  const custo = `${estado.custo_creditos} créditos (US$ 0,10 a 0,20)`;
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
    $('botao-gerar').disabled = false;
  }
}

function descreverEstado(estado) {
  if (!estado) return 'Abra pelo servidor local (python dashboard/graphs/servidor.py) para gerar e ver a galeria.';
  if (!estado.chave_configurada) return 'Chave da Tripo não configurada: copie graphs/.env.example para .env e preencha TRIPO_API_KEY.';
  return `Pronto para gerar · ${estado.geracoes_feitas}/${estado.limite_geracoes} gerações nesta execução.`;
}

async function iniciar() {
  const estado = await lerEstado();
  $('estado-api').textContent = descreverEstado(estado);
  $('custo').textContent = 'Custo por modelo: 10 a 20 créditos (1 crédito = US$ 0,01).';
  if (estado?.chave_configurada) {
    $('botao-gerar').disabled = false;
    $('form-gerar').addEventListener('submit', (evento) => aoGerar(evento, estado));
  }
  if (estado) await carregarGaleria(true);
  else visualizador.mostrarExemplo();
}

iniciar();

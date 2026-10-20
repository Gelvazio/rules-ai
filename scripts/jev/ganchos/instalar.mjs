// Instala o gancho de prompt do Jev (JEV-GLOBAL-AI-FINAL.11 e .12) no Claude Code (conta padrão e
// contas A, B e C) e no Codex. Chamado pelo `scripts/sincronizar.mjs`: sem --aplicar só mostra o
// que faria. Só ACRESCENTA a entrada do Jev em `UserPromptSubmit`: ganchos existentes ficam como
// estão, o arquivo antigo vira `.bak` e o JSON novo é conferido antes de gravar. JSON inválido no
// arquivo atual → pula sem gravar. Nenhuma chave vai para os arquivos: o gancho lê a chave do
// ambiente ou do `.env` da raiz do rules-ai (config.mjs).
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const PASTA_GANCHOS = dirname(fileURLToPath(import.meta.url));
const EVENTO = 'UserPromptSubmit';
const TIPO_COMANDO = 'command';
/** Folga do Claude Code sobre o tempo máximo interno do gancho (4 s, R1.3). */
const TIMEOUT_CLAUDE_SEGUNDOS = 10;
const INDENTACAO_JSON = 2;
const CONTAS_EXTRAS_CLAUDE = ['A', 'B', 'C'];
const PADRAO_FLAG_CODEX = /^\s*codex_hooks\s*=\s*true\b/m;
const AVISO_FLAG_CODEX = 'aviso    Codex: ganchos exigem `codex_hooks = true` em [features] do '
  + '~/.codex/config.toml (não editado aqui; ligue à mão)';

/**
 * Monta o comando que roda um gancho, com barras normais (funciona no Windows e no Linux).
 * @param {string} arquivo Nome do script em `scripts/jev/ganchos/`.
 * @returns {string} Comando `node "<caminho>"`.
 */
function montarComando(arquivo) {
  return `node "${join(PASTA_GANCHOS, arquivo).replaceAll('\\', '/')}"`;
}

/**
 * Lista os destinos dos ganchos: Claude Code (4 contas) e Codex.
 * @param {string} [pastaUsuario] Pasta do usuário (injetável para teste).
 * @returns {{ia: string, arquivo: string, pasta: string, entrada: object, marca: string}[]}
 */
export function listarDestinosDeGancho(pastaUsuario = homedir()) {
  const claude = { type: TIPO_COMANDO, command: montarComando('claude-prompt.mjs'),
    timeout: TIMEOUT_CLAUDE_SEGUNDOS };
  const pastasClaude = [
    ['Claude Code', '.claude'],
    ...CONTAS_EXTRAS_CLAUDE.map(
      (conta) => [`Claude Code (conta${conta})`, `.claude-conta${conta}`],
    ),
  ];
  const destinosClaude = pastasClaude.map(([ia, pasta]) => ({
    ia, pasta: join(pastaUsuario, pasta), arquivo: join(pastaUsuario, pasta, 'settings.json'),
    entrada: claude, marca: 'scripts/jev/ganchos/claude-prompt.mjs',
  }));
  const codex = {
    ia: 'Codex', pasta: join(pastaUsuario, '.codex'),
    arquivo: join(pastaUsuario, '.codex', 'hooks.json'),
    entrada: { type: TIPO_COMANDO, command: montarComando('codex-prompt.mjs') },
    marca: 'scripts/jev/ganchos/codex-prompt.mjs',
  };
  return [...destinosClaude, codex];
}

/**
 * Diz se um grupo de ganchos já tem a entrada do Jev (pela marca no comando).
 * @param {{hooks?: {command?: string}[]}} grupo Grupo do evento.
 * @param {string} marca Trecho do caminho do script do Jev.
 * @returns {boolean} true quando o grupo chama o gancho do Jev.
 */
function grupoTemJev(grupo, marca) {
  return (grupo?.hooks ?? []).some(
    (gancho) => String(gancho?.command ?? '').replaceAll('\\', '/').includes(marca),
  );
}

/**
 * Acrescenta (ou atualiza) a entrada do Jev no evento, sem tocar nos outros ganchos.
 * @param {object} configuracao JSON atual (objeto).
 * @param {{entrada: object, marca: string}} destino Entrada e marca do Jev.
 * @returns {object} JSON novo (cópia).
 * @throws {Error} Se `hooks` ou o evento não tiverem o formato esperado.
 */
export function acrescentarGancho(configuracao, destino) {
  const novo = structuredClone(configuracao);
  novo.hooks ??= {};
  novo.hooks[EVENTO] ??= [];
  const grupos = novo.hooks[EVENTO];
  const formatoValido = typeof novo.hooks === 'object' && Array.isArray(grupos);
  if (!formatoValido) throw new Error(`"hooks.${EVENTO}" não é uma lista`);

  const indice = grupos.findIndex((grupo) => grupoTemJev(grupo, destino.marca));
  const grupoJev = { hooks: [destino.entrada] };
  if (indice < 0) grupos.push(grupoJev);
  else grupos[indice] = grupoJev;
  return novo;
}

/**
 * Lê o JSON atual do destino (vazio quando o arquivo não existe).
 * @param {string} arquivo Caminho do JSON.
 * @returns {{texto: string, objeto: object}} Texto e objeto.
 * @throws {SyntaxError} Se o arquivo existir com JSON inválido.
 */
function lerJson(arquivo) {
  if (!existsSync(arquivo)) return { texto: '', objeto: {} };
  const texto = readFileSync(arquivo, 'utf8');
  const semBom = texto.replace(/^﻿/, '');
  return { texto, objeto: semBom.trim() === '' ? {} : JSON.parse(semBom) };
}

/**
 * Monta o texto novo do destino, conferindo que é JSON válido antes de devolver.
 * @param {{arquivo: string, entrada: object, marca: string}} destino Destino.
 * @returns {{atual: string, novo: string}} Texto atual e texto novo.
 * @throws {Error} Se o JSON atual for inválido ou o formato de `hooks` não for o esperado.
 */
function montarTextoNovo(destino) {
  const { texto, objeto } = lerJson(destino.arquivo);
  const novo = `${JSON.stringify(acrescentarGancho(objeto, destino), null, INDENTACAO_JSON)}\n`;
  JSON.parse(novo);
  return { atual: texto, novo };
}

/**
 * Sincroniza o gancho de um destino (ou só informa, sem `aplicar`).
 * @param {object} destino Destino de {@link listarDestinosDeGancho}.
 * @param {boolean} aplicar true grava; false só mostra.
 * @returns {void}
 */
function sincronizarGancho(destino, aplicar) {
  const rotulo = `${destino.ia} (gancho)`;
  if (!existsSync(destino.pasta)) return console.log(`pulado   ${rotulo}: pasta não existe`);

  let textos;
  try {
    textos = montarTextoNovo(destino);
  } catch (erro) {
    return console.warn(`pulado   ${rotulo}: ${destino.arquivo} (${erro.message}; nada gravado)`);
  }
  if (textos.novo === textos.atual) return console.log(`igual    ${rotulo}: ${destino.arquivo}`);
  if (!aplicar) return console.log(`mudaria  ${rotulo}: ${destino.arquivo} (use --aplicar)`);

  if (textos.atual) copyFileSync(destino.arquivo, `${destino.arquivo}.bak`);
  writeFileSync(destino.arquivo, textos.novo, 'utf8');
  console.log(`gravado  ${rotulo}: ${destino.arquivo}`);
}

/**
 * Avisa quando o Codex existe mas os ganchos estão desligados no `config.toml`.
 * @param {string} pastaUsuario Pasta do usuário.
 * @returns {void}
 */
function avisarFlagDoCodex(pastaUsuario) {
  const pasta = join(pastaUsuario, '.codex');
  if (!existsSync(pasta)) return;
  const arquivo = join(pasta, 'config.toml');
  const ligado = existsSync(arquivo) && PADRAO_FLAG_CODEX.test(readFileSync(arquivo, 'utf8'));
  if (!ligado) console.warn(AVISO_FLAG_CODEX);
}

/**
 * Sincroniza o gancho do Jev em todos os destinos.
 * @param {{aplicar: boolean, pastaUsuario?: string}} opcoes Gravar ou só mostrar.
 * @returns {void}
 */
export function sincronizarGanchos({ aplicar, pastaUsuario = homedir() }) {
  const pasta = resolve(pastaUsuario);
  listarDestinosDeGancho(pasta).forEach((destino) => sincronizarGancho(destino, aplicar));
  avisarFlagDoCodex(pasta);
}

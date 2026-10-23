#!/usr/bin/env node
/**
 * Grava o marker `.ai-memory.toml` na raiz de um projeto (AI-MEMORY-INTEGRATION.7).
 *
 * Uso: node scripts/instalar-ai-memory.mjs <pasta-do-projeto> [--dry-run] [--nome <projeto>]
 *
 * - Idempotente: marker já existente nunca é sobrescrito.
 * - `--dry-run` mostra o que gravaria e não grava nada.
 * - Recusa projeto dentro de `DEMAIS-PROJETOS-*` (C20, C23) sem abrir a pasta.
 * - Não mexe em `.claude/settings.json` (isso é da subtarefa .8).
 */
import { existsSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { basename, join, resolve, sep } from 'node:path';

const NOME_MARKER = '.ai-memory.toml';
const PREFIXO_PASTA_PROIBIDA = 'demais-projetos-';
const WORKSPACE_PADRAO = 'default';
const PASTA_RAIZ_FONTES = 'rules-ai';
const CODIGO_ERRO = 1;

const IGNORE_PATHS = [
  '.env', '**/.env', '.env.*', '**/.env.*',
  'scripts/variaveis.js', '**/variaveis.js',
  'tasks/**', 'rules-local/**', 'graphify-out/**',
  '**/gabarito*/**', '**/*gabarito*',
  '**/*alunos*.csv', '**/*alunos*.xlsx', '**/*alunos*.json',
  '*.pdf', '**/*.pdf',
  'node_modules/**', '**/node_modules/**',
  'DEMAIS-PROJETOS-*/**',
];

/**
 * Diz se o caminho está dentro de uma pasta `DEMAIS-PROJETOS-*`, só pelo texto do caminho.
 * @param {string} caminho Caminho absoluto do projeto.
 * @returns {boolean} true se algum trecho do caminho começa com o prefixo proibido.
 */
function estaEmPastaProibida(caminho) {
  return caminho.toLowerCase().split(sep).some((trecho) =>
    trecho.startsWith(PREFIXO_PASTA_PROIBIDA));
}

/**
 * Deduz o nome do projeto: remoto Git sem host em minúsculas, ou o nome da pasta.
 * @param {string} pasta Pasta do projeto.
 * @returns {string} Nome do projeto para o marker.
 */
function deduzirNome(pasta) {
  try {
    const remoto = execFileSync('git', ['-C', pasta, 'remote', 'get-url', 'origin'], {
      encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const partes = remoto.replace(/\.git$/, '').split(/[/:]/).filter(Boolean);
    if (partes.length >= 2) return partes.slice(-2).join('-').toLowerCase();
  } catch {
    // sem Git ou sem remoto: cai no nome da pasta
  }
  return basename(pasta).toLowerCase();
}

/**
 * Monta o texto do `.ai-memory.toml`.
 * @param {string} nome Nome do projeto.
 * @returns {string} Conteúdo do marker.
 */
function montarMarker(nome) {
  const linhas = IGNORE_PATHS.map((padrao) => `  "${padrao}",`).join('\n');
  return [
    `# ${NOME_MARKER} gerado por rules-ai/scripts/instalar-ai-memory.mjs`,
    `workspace = "${WORKSPACE_PADRAO}"`,
    `project = "${nome}"`,
    '',
    '[capture]',
    'ignore_paths = [',
    linhas,
    ']',
    '',
  ].join('\n');
}

/**
 * Lê os argumentos da linha de comando.
 * @param {string[]} argv Argumentos sem node e script.
 * @returns {{pasta: string|null, dryRun: boolean, nome: string|null}} Opções.
 */
function lerArgumentos(argv) {
  const opcoes = { pasta: null, dryRun: false, nome: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--dry-run') opcoes.dryRun = true;
    else if (argv[i] === '--nome') { i += 1; opcoes.nome = argv[i] ?? null; }
    else opcoes.pasta = argv[i];
  }
  return opcoes;
}

/**
 * Valida o projeto e devolve o motivo da recusa, ou null se pode instalar.
 * @param {string|null} pasta Caminho informado.
 * @returns {string|null} Motivo da recusa.
 */
function motivoDaRecusa(pasta) {
  if (!pasta) return 'informe a pasta do projeto';
  const absoluta = resolve(pasta);
  if (estaEmPastaProibida(absoluta)) return 'projeto em DEMAIS-PROJETOS-* (C20, C23)';
  if (basename(absoluta) === PASTA_RAIZ_FONTES) return 'rules-ai é a fonte, não recebe marker';
  if (!existsSync(absoluta)) return `pasta não existe: ${absoluta}`;
  return null;
}

/**
 * Executa a instalação do marker.
 * @returns {number} Código de saída.
 */
function principal() {
  const { pasta, dryRun, nome } = lerArgumentos(process.argv.slice(2));
  const motivo = motivoDaRecusa(pasta);
  if (motivo) {
    console.error(`ai-memory: recusado — ${motivo}`);
    return CODIGO_ERRO;
  }
  const destino = join(resolve(pasta), NOME_MARKER);
  if (existsSync(destino)) {
    console.log(`ai-memory: ${NOME_MARKER} já existe; nada a fazer (${destino}).`);
    return 0;
  }
  const texto = montarMarker(nome ?? deduzirNome(resolve(pasta)));
  if (dryRun) {
    console.log(`ai-memory: [dry-run] gravaria ${destino}:\n${texto}`);
    return 0;
  }
  writeFileSync(destino, texto, 'utf8');
  console.log(`ai-memory: gravado ${destino}`);
  return 0;
}

process.exitCode = principal();

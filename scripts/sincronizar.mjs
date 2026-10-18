// Liga a pasta `regras/` aos arquivos globais de cada IA (bloco gerenciado, sem tocar no resto).
// Uso: node scripts/sincronizar.mjs            -> só mostra o que faria (nada é gravado)
//      node scripts/sincronizar.mjs --aplicar  -> grava, com cópia .bak do arquivo original
import {
  copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync,
} from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PASTA_REGRAS = join(RAIZ, 'regras');
const ARQUIVO_UNIFICADO = join(RAIZ, 'dist', 'REGRAS-GLOBAIS.md');
const ARQUIVO_INDICE = 'INDEX.md';
/** Link de regra local no índice: `](nome.md)`, sem barra no nome. */
const PADRAO_LINK_INDICE = /\]\(([^/()\s]+\.md)\)/g;
const MARCA_INICIO = '<!-- rules-ai:inicio (gerado por C:/fontes/rules-ai; não editar) -->';
const MARCA_FIM = '<!-- rules-ai:fim -->';
const APLICAR = process.argv.includes('--aplicar');
/** Pasta de configuração do usuário: %APPDATA% no Windows, ~/.config nos outros sistemas. */
const PASTA_CONFIG_USUARIO = process.env.APPDATA ?? join(homedir(), '.config');

/**
 * Destinos: `importar` usa `@arquivo` (a IA lê o unificado); `embutir` copia o texto.
 * `criarPasta` cria a pasta do arquivo quando ela ainda não existe (só com --aplicar).
 * Cursor (regras do usuário só nas configurações) e DeepSeek ficam de fora: sem arquivo global.
 */
const DESTINOS = [
  { ia: 'Claude Code', arquivo: join(homedir(), '.claude', 'CLAUDE.md'), modo: 'importar' },
  // Contas extras do Claude Code (CLAUDE_CONFIG_DIR); sem isto as regras não carregam nelas
  ...['A', 'B', 'C'].map((conta) => ({
    ia: `Claude Code (conta${conta})`,
    arquivo: join(homedir(), `.claude-conta${conta}`, 'CLAUDE.md'),
    modo: 'importar',
  })),
  // Gemini CLI recusa @import fora da pasta do GEMINI.md global ("Path traversal attempt")
  { ia: 'Gemini CLI', arquivo: join(homedir(), '.gemini', 'GEMINI.md'), modo: 'embutir' },
  { ia: 'Codex', arquivo: join(homedir(), '.codex', 'AGENTS.md'), modo: 'embutir' },
  { ia: 'Grok', arquivo: join(homedir(), '.grok', 'AGENTS.md'), modo: 'embutir' },
  { ia: 'Qoder', arquivo: join(homedir(), '.qoder', 'AGENTS.md'), modo: 'embutir' },
  { ia: 'opencode', arquivo: join(homedir(), '.config', 'opencode', 'AGENTS.md'), modo: 'embutir' },
  { ia: 'Devin', arquivo: join(PASTA_CONFIG_USUARIO, 'devin', 'AGENTS.md'), modo: 'embutir' },
  {
    ia: 'Kiro',
    arquivo: join(homedir(), '.kiro', 'steering', 'rules-ai.md'),
    modo: 'embutir',
    criarPasta: true,
  },
];

/**
 * Lê do `regras/INDEX.md` a ordem dos arquivos linkados (só arquivos locais, sem `/`).
 * @returns {string[]} Nomes dos arquivos na ordem do índice, sem repetir; vazio sem índice.
 */
function lerOrdemDoIndice() {
  const caminho = join(PASTA_REGRAS, ARQUIVO_INDICE);
  if (!existsSync(caminho)) return [];

  const texto = readFileSync(caminho, 'utf8');
  const nomes = [...texto.matchAll(PADRAO_LINK_INDICE)].map((achado) => achado[1]);
  return [...new Set(nomes)].filter((nome) => nome !== ARQUIVO_INDICE);
}

/**
 * Monta a lista final de regras: primeiro as do índice, na ordem dele; depois as que
 * não estão no índice (alfabética, com aviso). Sem índice, tudo em ordem alfabética.
 * @returns {string[]} Nomes dos arquivos de `regras/` que entram no unificado.
 */
function listarArquivosDeRegras() {
  const existentes = readdirSync(PASTA_REGRAS)
    .filter((nome) => nome.endsWith('.md') && nome !== ARQUIVO_INDICE)
    .sort();
  const ordemDoIndice = lerOrdemDoIndice();

  const inexistentes = ordemDoIndice.filter((nome) => !existentes.includes(nome));
  inexistentes.forEach((nome) => {
    console.warn(`aviso: ${ARQUIVO_INDICE} aponta para "${nome}", que não existe (ignorado)`);
  });

  const indexadas = ordemDoIndice.filter((nome) => existentes.includes(nome));
  const foraDoIndice = existentes.filter((nome) => !indexadas.includes(nome));
  if (ordemDoIndice.length > 0) {
    foraDoIndice.forEach((nome) => {
      console.warn(`aviso: "${nome}" não está no ${ARQUIVO_INDICE}; inclua-o no índice`);
    });
  }
  return [...indexadas, ...foraDoIndice];
}

/**
 * Junta os arquivos de `regras/` em um texto único, na ordem do `regras/INDEX.md`
 * (o próprio índice fica de fora; sem índice, ordem alfabética).
 * @returns {string} Texto unificado das regras globais.
 */
function montarUnificado() {
  const nomes = listarArquivosDeRegras();
  const partes = nomes.map((nome) => readFileSync(join(PASTA_REGRAS, nome), 'utf8').trim());
  const cabecalho = '# Regras globais de IA (fonte: C:/fontes/rules-ai/regras)\n\n'
    + 'Valem em todos os projetos. A regra do projeto (`AGENTS.md`/`CLAUDE.md`) vale no projeto; '
    + 'divergências entre projetos ficam em `C:/fontes/rules-ai/CONFLITOS.md` '
    + 'até o usuário decidir.';
  return `${cabecalho}\n\n${partes.join('\n\n---\n\n')}\n`;
}

/**
 * Monta o bloco gerenciado de um destino.
 * @param {{modo: string}} destino - Destino com o modo de ligação.
 * @param {string} unificado - Texto unificado das regras.
 * @returns {string} Bloco entre as marcas de início e fim.
 */
function montarBloco(destino, unificado) {
  const corpo = destino.modo === 'importar'
    ? `@${ARQUIVO_UNIFICADO.replaceAll('\\', '/')}`
    : unificado;
  return `${MARCA_INICIO}\n${corpo.trim()}\n${MARCA_FIM}\n`;
}

/**
 * Troca o bloco gerenciado no texto, ou o acrescenta no fim se ainda não existir.
 * @param {string} atual - Conteúdo atual do arquivo.
 * @param {string} bloco - Bloco novo.
 * @returns {string} Conteúdo atualizado.
 */
function aplicarBloco(atual, bloco) {
  const inicio = atual.indexOf(MARCA_INICIO);
  const fim = atual.indexOf(MARCA_FIM);
  const temBloco = inicio !== -1 && fim > inicio;
  if (!temBloco) return `${atual.replace(/\s+$/, '')}\n\n${bloco}`;

  return atual.slice(0, inicio) + bloco + atual.slice(fim + MARCA_FIM.length).replace(/^\r?\n/, '');
}

/**
 * Sincroniza um destino (ou só informa, sem --aplicar).
 * @param {{ia: string, arquivo: string, modo: string, criarPasta?: boolean}} destino - Destino.
 * @param {string} unificado - Texto unificado das regras.
 */
function sincronizarDestino(destino, unificado) {
  const pastaArquivo = dirname(destino.arquivo);
  const pastaDaIa = destino.criarPasta ? dirname(pastaArquivo) : pastaArquivo;
  if (!existsSync(pastaDaIa)) return console.log(`pulado   ${destino.ia}: pasta não existe`);

  const atual = existsSync(destino.arquivo) ? readFileSync(destino.arquivo, 'utf8') : '';
  const novo = aplicarBloco(atual, montarBloco(destino, unificado));
  if (novo === atual) return console.log(`igual    ${destino.ia}: ${destino.arquivo}`);
  if (!APLICAR) return console.log(`mudaria  ${destino.ia}: ${destino.arquivo} (use --aplicar)`);

  mkdirSync(pastaArquivo, { recursive: true });
  if (atual) copyFileSync(destino.arquivo, `${destino.arquivo}.bak`);
  writeFileSync(destino.arquivo, novo, 'utf8');
  console.log(`gravado  ${destino.ia}: ${destino.arquivo}`);
}

/** Gera o unificado e sincroniza todos os destinos. */
function principal() {
  const unificado = montarUnificado();
  mkdirSync(dirname(ARQUIVO_UNIFICADO), { recursive: true });
  writeFileSync(ARQUIVO_UNIFICADO, unificado, 'utf8');
  console.log(`unificado: ${ARQUIVO_UNIFICADO}`);
  DESTINOS.forEach((destino) => sincronizarDestino(destino, unificado));
}

principal();

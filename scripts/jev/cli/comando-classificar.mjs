// Subcomando `classificar`: sugere nível, effort e modelos elegíveis das subtarefas do quadro.
// Somente leitura: não escreve no quadro, não reserva e não altera nível (INV-3). Exige a chave
// do Jev (sem chave → código 1, R1.2) e respeita JEV_MODO=off
// (código 2: siga só pelos sinais da skill).
import { resolve } from 'node:path';
import { criarClientePadrao } from '../cliente.mjs';
import { MODOS, carregarConfiguracao } from '../config.mjs';
import { classificarSubtarefa } from '../decidir.mjs';
import { gravarClassificacao } from '../gravador.mjs';
import {
  ARQUIVO_QUADRO, ehSubtarefa, estaLivre, lerQuadro, selecionarSubtarefas,
} from '../estado.mjs';
import { lerTexto } from './argumentos.mjs';
import { CODIGOS_SAIDA, formatarConfianca, imprimir, montarTabela } from './saida.mjs';

const LIMITE_PADRAO = 10;
const MENSAGEM_DESLIGADO = 'JEV_MODO=off: o Jev está desligado; siga só pelos sinais da skill '
  + 'classificar-tarefa.';
const COLUNAS = ['Tarefa', 'Nível sugerido', 'Nível final', 'Effort', 'Confiança', 'Ação',
  'Modelos elegíveis', 'Motivos'];

/**
 * Escolhe as subtarefas a classificar: a do `--id`, ou as primeiras livres com seção na etapa.
 * @param {Record<string, string|true>} opcoes Opções da linha de comando.
 * @param {string} arquivoQuadro Quadro lido.
 * @returns {object[]} Itens do quadro.
 * @throws {Error} Se o `--id` não existir no quadro.
 */
function escolherItens(opcoes, arquivoQuadro) {
  const itens = lerQuadro(arquivoQuadro);
  const id = lerTexto(opcoes, 'id');
  if (id) {
    const achado = itens.find((item) => item.id === id && ehSubtarefa(item));
    if (!achado) throw new Error(`Subtarefa "${id}" não encontrada em ${arquivoQuadro}.`);
    return [achado];
  }
  const limite = Number(lerTexto(opcoes, 'limite', String(LIMITE_PADRAO)));
  const candidatas = opcoes.todas ? itens : itens.filter(estaLivre);
  return selecionarSubtarefas(candidatas, { limite, arquivoQuadro });
}

/**
 * Monta o texto da tabela de sugestões.
 * @param {object[]} sugestoes Sugestões de {@link classificarSubtarefa}.
 * @returns {string} Tabela Markdown.
 */
function montarTexto(sugestoes) {
  const linhas = sugestoes.map((s) => [
    s.subtarefa, s.nivel_sugerido, s.nivel_final_proposto, s.effort_final_proposto,
    formatarConfianca(s.confianca), s.acao, s.modelos_elegiveis.join('; '), s.motivos.join('; '),
  ]);
  const aviso = '_Somente leitura: sugestão, nada foi escrito no quadro nem reservado._';
  return `${montarTabela(COLUNAS, linhas)}\n\n${aviso}`;
}

/**
 * Executa o subcomando.
 * @param {{opcoes: Record<string, string|true>}} argumentos Argumentos lidos.
 * @returns {Promise<number>} Código de saída.
 * @throws {ErroJev} `CHAVE_AUSENTE` ou `CONFIGURACAO_INVALIDA` (a CLI converte em código 1).
 */
export async function executarClassificar({ opcoes }) {
  if (opcoes.gravar) return executarGravar({ opcoes });
  if (carregarConfiguracao().modo === MODOS.DESLIGADO) {
    console.error(MENSAGEM_DESLIGADO);
    return CODIGOS_SAIDA.DESLIGADO;
  }
  const cliente = criarClientePadrao();
  const arquivoQuadro = resolve(lerTexto(opcoes, 'quadro', ARQUIVO_QUADRO));
  const sugestoes = [];
  for (const item of escolherItens(opcoes, arquivoQuadro)) {
    sugestoes.push(await classificarSubtarefa(item, { cliente, arquivoQuadro }));
  }
  imprimir({ json: Boolean(opcoes.json), objeto: sugestoes, texto: montarTexto(sugestoes) });
  const jevFalhou = sugestoes.some((sugestao) => sugestao.erro_codigo);
  return jevFalhou ? CODIGOS_SAIDA.JEV_INDISPONIVEL : CODIGOS_SAIDA.OK;
}

/** Sugestão sem Jev (modo `off` ou sem chave): a gravação cai no nível mais restritivo (R4). */
const SUGESTAO_SEM_JEV = Object.freeze({
  nivel_sugerido: null, nivel_final_proposto: null, confianca: null, sinais: {},
  erro_codigo: 'JEV_INDISPONIVEL',
});
const COLUNAS_GRAVACAO = ['Tarefa', 'Gravado', 'Nível', 'Effort', 'JEV-AI-SUGGESTION', 'Fonte',
  'Recusa'];

/**
 * Classifica e GRAVA o nível das subtarefas livres e sem nível (C47). Com `--dry-run` só mostra.
 * @param {{opcoes: Record<string, string|true>}} argumentos Argumentos lidos.
 * @returns {Promise<number>} Código de saída (`REVISAR` se algo precisa de revisão humana).
 */
export async function executarGravar({ opcoes }) {
  const arquivoQuadro = resolve(lerTexto(opcoes, 'quadro', ARQUIVO_QUADRO));
  const desligado = carregarConfiguracao().modo === MODOS.DESLIGADO;
  const cliente = desligado ? null : criarClientePadrao();
  const linhas = [];
  let revisar = false;
  for (const item of escolherItens(opcoes, arquivoQuadro)) {
    const sugestao = cliente
      ? await classificarSubtarefa(item, { cliente, arquivoQuadro })
      : { ...SUGESTAO_SEM_JEV, subtarefa: item.id };
    const resultado = gravarClassificacao({ item, sugestao, arquivoQuadro },
      { reclassificar: Boolean(opcoes.reclassificar), simular: Boolean(opcoes['dry-run']) });
    const decisao = resultado.decisao;
    revisar = revisar || Boolean(decisao?.revisar);
    linhas.push([item.id, resultado.gravado ? 'sim' : 'não', decisao?.nivel ?? '—',
      decisao?.effort ?? '—', decisao ? (decisao.jevDecidiu ? 'SIM' : 'NAO') : '—',
      decisao?.fonte ?? '—', resultado.recusa ?? '—']);
  }
  const texto = linhas.length ? montarTabela(COLUNAS_GRAVACAO, linhas) : 'Nada a gravar.';
  imprimir({ json: Boolean(opcoes.json), objeto: linhas, texto });
  return revisar ? CODIGOS_SAIDA.REVISAR : CODIGOS_SAIDA.OK;
}

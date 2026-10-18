// Subcomando `classificar`: sugere nível, effort e modelos elegíveis das subtarefas do quadro.
// Somente leitura: não escreve no quadro, não reserva e não altera nível (INV-3). Exige a chave
// do Jev (sem chave → código 1, R1.2) e respeita JEV_MODO=off (código 2: use o fluxo Laya/sinais).
import { resolve } from 'node:path';
import { criarClientePadrao } from '../cliente.mjs';
import { MODOS, carregarConfiguracao } from '../config.mjs';
import { classificarSubtarefa } from '../decidir.mjs';
import {
  ARQUIVO_QUADRO, ehSubtarefa, estaLivre, lerQuadro, selecionarSubtarefas,
} from '../estado.mjs';
import { lerTexto } from './argumentos.mjs';
import { CODIGOS_SAIDA, formatarConfianca, imprimir, montarTabela } from './saida.mjs';

const LIMITE_PADRAO = 10;
const MENSAGEM_DESLIGADO = 'JEV_MODO=off: o Jev está desligado; use o fluxo Laya/sinais da skill '
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

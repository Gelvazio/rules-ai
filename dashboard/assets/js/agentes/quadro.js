// Leitura do quadro de tarefas (tasks/STATUS.md) para a página "Agentes ao vivo".
// Porta de dashboard/quadro_tarefas.py: mesmos campos e valores (INV-4). Sem dependências.

const TITULO_SECAO = "## 📌 Tarefas";
const COLUNAS = { tarefa: "Tarefa", titulo: "Título", modelo: "Modelo", status: "Status",
                  em_uso_por: "Em uso por" };
const STATUS_POR_EMOJI = [["🔄", "progresso"], ["✅", "concluido"], ["⏹", "concluido"],
                          ["⛔", "bloqueado"], ["👀", "aguardando"], ["⬜", "pendente"]];
const NIVEIS = ["LEVE", "MEDIO", "PESADO"];
const PADRAO_DESDE = /\(?desde (\d{4}-\d{2}-\d{2} \d{2}:\d{2})\)?/;
const PADRAO_DESDE_TODOS = new RegExp(PADRAO_DESDE.source, "g");
const PADRAO_MARCAS = /[*`]/g;
const PADRAO_PERCENTUAL = /\s*·\s*(\d{1,3})\s*%\s*$/; // regra C31: "... · 40%" no fim
const QUEBRA_DE_LINHA = /\r\n|[\n\r\v\f\x1c-\x1e\x85\u2028\u2029]/;

function limpar(texto) {
  return texto.replace(PADRAO_MARCAS, "").trim();
}

function celulas(linha) {
  return linha.trim().replace(/^\|+|\|+$/g, "").split("|").map((c) => c.trim());
}

function linhasDaTabela(texto) {
  const inicio = texto.indexOf(TITULO_SECAO);
  if (inicio < 0) return [[], []];
  const linhas = [];
  for (const linha of texto.slice(inicio).split(QUEBRA_DE_LINHA).slice(1)) {
    if (linha.startsWith("|")) linhas.push(linha);
    else if (linhas.length) break;
  }
  if (linhas.length < 2) return [[], []];
  return [celulas(linhas[0]), linhas.slice(2)];
}

function mapaDeColunas(cabecalho) {
  const posicoes = new Map(cabecalho.map((nome, indice) => [limpar(nome), indice]));
  const mapa = {};
  for (const [chave, nome] of Object.entries(COLUNAS)) {
    if (posicoes.has(nome)) mapa[chave] = posicoes.get(nome);
  }
  return mapa;
}

function nivelDaColuna(modelo) {
  const texto = modelo.toUpperCase();
  if (texto.startsWith("USU")) return "USUARIO";
  return NIVEIS.find((n) => texto.includes(n)) || "";
}

function statusDaColuna(status) {
  const achado = STATUS_POR_EMOJI.find(([emoji]) => status.includes(emoji));
  return achado ? achado[1] : "pendente";
}

function agenteDaColuna(emUsoPor) {
  if (!emUsoPor || emUsoPor.startsWith("—")) return ["", "", null];
  const percentual = PADRAO_PERCENTUAL.exec(emUsoPor);
  const texto = emUsoPor.replace(PADRAO_PERCENTUAL, "");
  const desde = PADRAO_DESDE.exec(texto);
  const nome = texto.replace(PADRAO_DESDE_TODOS, "").trim();
  const progresso = percentual ? Math.min(parseInt(percentual[1], 10), 100) : null;
  return [nome, desde ? desde[1] : "", progresso];
}

function tarefaDaLinha(colunas, mapa, indice) {
  const valor = (chave) => {
    const posicao = mapa[chave];
    return posicao !== undefined && posicao < colunas.length ? colunas[posicao] : "";
  };
  const tarefa = limpar(valor("tarefa"));
  const [agente, desde, progresso] = agenteDaColuna(valor("em_uso_por"));
  const ponto = tarefa.indexOf(".");
  return {
    tarefa,
    titulo: limpar(valor("titulo")),
    pai: ponto < 0 ? tarefa : tarefa.slice(0, ponto),
    mae: ponto < 0,
    nivel: nivelDaColuna(valor("modelo")),
    status: statusDaColuna(valor("status")),
    agente,
    desde,
    progresso,
    global: valor("titulo").includes("🌐"),
    indice,
  };
}

// Tarefas do quadro a partir do texto do STATUS.md (mesmo formato de ler_quadro()["tarefas"]).
export function lerQuadro(texto) {
  const [cabecalho, linhas] = linhasDaTabela(texto);
  const mapa = mapaDeColunas(cabecalho);
  if (mapa.tarefa === undefined || mapa.status === undefined) {
    throw new Error("O quadro não tem as colunas Tarefa e Status na tabela de tarefas.");
  }
  const tarefas = [];
  for (const linha of linhas) {
    const colunas = celulas(linha);
    if (colunas[mapa.tarefa]) tarefas.push(tarefaDaLinha(colunas, mapa, tarefas.length));
  }
  return { tarefas };
}

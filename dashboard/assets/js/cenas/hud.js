// Contadores sobre a cena, controles da animação e lista de objetos com o botão de gerar.

const $ = (id) => document.getElementById(id);
const FORMATO_REAL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

/**
 * Atualiza os contadores (só reescreve quando o número de assentos muda).
 * @param {object} config - Configuração da cena.
 * @param {number} assumidos - Assentos assumidos até agora.
 */
export function atualizarContadores(config, assumidos) {
  const alvo = $('contador-assentos');
  if (alvo.dataset.valor === String(assumidos)) return;
  alvo.dataset.valor = String(assumidos);
  alvo.textContent = `${assumidos} de ${config.assentos} assentos`;
  $('contador-equipe').textContent = FORMATO_REAL.format(assumidos * config.custo_pessoa_mes);
  $('contador-agente').textContent = FORMATO_REAL.format(assumidos * config.custo_agente_mes);
}

/**
 * Liga os botões Pausar/Continuar, Reiniciar e a velocidade à linha do tempo.
 * @param {object} linha - Linha do tempo (alternarPausa, reiniciar, definirVelocidade, estatico).
 */
export function ligarControles(linha) {
  if (linha.estatico) {
    $('controles').hidden = true;
    $('nota-movimento').hidden = false;
    return;
  }
  $('botao-pausa').addEventListener('click', () => {
    $('botao-pausa').textContent = linha.alternarPausa() ? 'Continuar' : 'Pausar';
  });
  $('botao-reiniciar').addEventListener('click', () => linha.reiniciar());
  $('velocidade').addEventListener('change', (e) => linha.definirVelocidade(Number(e.target.value)));
}

function itemObjeto(objeto, origem) {
  const li = document.createElement('li');
  li.className = 'objetos__item';
  const nome = document.createElement('strong');
  nome.textContent = objeto.nome;
  const estado = document.createElement('span');
  estado.className = `objetos__estado objetos__estado--${origem === 'glb' ? 'glb' : 'forma'}`;
  estado.textContent = origem === 'glb' ? 'modelo da Tripo' : 'forma simples';
  const prompt = document.createElement('code');
  prompt.className = 'objetos__prompt';
  prompt.textContent = objeto.prompt_tripo;
  li.append(nome, estado, prompt);
  return li;
}

/**
 * Lista os objetos da cena e prepara o botão "Gerar os que faltam".
 * @param {object} dados - JSON da cena.
 * @param {object} origens - id do objeto → "glb" ou "forma".
 * @param {boolean} podeGerar - true se há chave e servidor.
 * @returns {Array<object>} Objetos que ainda usam forma simples.
 */
export function mostrarObjetos(dados, origens, podeGerar) {
  $('lista-objetos').replaceChildren(...dados.objetos.map((o) => itemObjeto(o, origens[o.id])));
  const faltam = dados.objetos.filter((o) => origens[o.id] !== 'glb');
  const botao = $('botao-gerar-faltam');
  botao.textContent = faltam.length ? `Gerar os ${faltam.length} que faltam na Tripo` : 'Todos os modelos gerados';
  botao.disabled = !podeGerar || !faltam.length;
  $('custo-cena').textContent = faltam.length
    ? `Custo estimado: ${faltam.length * 10} a ${faltam.length * 20} créditos (US$ ${(faltam.length * 0.1).toFixed(2)} a ${(faltam.length * 0.2).toFixed(2)}).`
    : '';
  return faltam;
}

// Relógio único da cena: transforma o tempo em progresso de 0 a 1, com laço, pausa e velocidade.
// Não desenha nada: quem desenha só lê o progresso.

const reduzirMovimento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Cria a linha do tempo.
 * @param {{duracao: number, pausaFinal: number}} opcoes - Segundos da animação e da espera no fim.
 * @returns {object} Controles e a função avancar(dtSegundos) → progresso.
 */
export function criarLinhaDoTempo({ duracao, pausaFinal }) {
  let decorrido = 0;
  let velocidade = 1;
  let pausado = false;
  const estatico = reduzirMovimento();
  return {
    avancar(dt) {
      if (estatico) return 1;
      if (!pausado) decorrido += dt * velocidade;
      if (decorrido >= duracao + pausaFinal) decorrido = 0; // recomeça o laço
      return Math.min(decorrido / duracao, 1);
    },
    alternarPausa() {
      pausado = !pausado;
      return pausado;
    },
    reiniciar() {
      decorrido = 0;
    },
    definirVelocidade(valor) {
      velocidade = valor;
    },
    estatico,
  };
}

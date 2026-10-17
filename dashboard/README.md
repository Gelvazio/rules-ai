# Dashboard — rede neural em 3D

Visualização das camadas de uma rede neural em 3D, feita com Three.js 0.170.0. Mostra a
propagação dos valores pelas camadas, o cálculo de cada neurônio clicado e as probabilidades
da saída.

Não usa IA, login, banco nem token: tudo roda no navegador, com cálculo comum.

## Como abrir

Os módulos ES não abrem com duplo clique. Dentro da pasta `dashboard`, rode:

```
python -m http.server 8080
```

Depois abra http://localhost:8080 no navegador.

## Estrutura

- `index.html`: estrutura da página e import map do Three.js.
- `assets/css/`: `base.css` (tokens e layout) e `painel.css` (painel e rótulos 3D).
- `assets/js/config/`: constantes e configurações.
- `assets/js/rede/`: cálculo da rede (pesos, propagação).
- `assets/js/cena/`: desenho das camadas, neurônios e conexões em 3D.
- `assets/js/tela/`: painel 2D (entradas, cálculo, barras e legenda).
- `scripts/`: coletor Python dos links do `CLAUDE.md` (`python dashboard/scripts/coletar.py`,
  saída em `scripts/saida/coleta.json`, fora do Git). Guia: `WEB-SCRAP.md`.

Tarefa de origem: DASHBOARD-REDE-NEURAL
(`tasks/etapas/ETAPA-013-1b79ba45-DASHBOARD-REDE-NEURAL.md`).

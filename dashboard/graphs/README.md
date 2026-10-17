# 3D GRAPHS AI

Página do dashboard que gera modelos 3D por IA a partir de texto e os mostra num visualizador
Three.js 0.170.0 (girar, aproximar). Abre pelo menu **3D GRAPHS AI** do `dashboard/index.html`.

## API escolhida: Tripo (a mais barata da coleta)

| API | Cobrança | Custo de 1 modelo |
|---|---|---|
| **Tripo** | Paga pelo uso, sem assinatura (1 crédito = US$ 0,01) | Texto → 3D: 10 a 20 créditos = US$ 0,10 a 0,20 |
| Hyper3D Rodin | API só no plano Business | US$ 96/mês |
| Hi3D | Sem preço de API na página | `nao_verificado` |
| Kling | API de vídeo e imagem, não gera 3D | — |

Fonte: `dashboard/scripts/saida/coleta.json` (coleta de 2026-10-17).

## Como usar

1. Copie `.env.example` para `.env` (fica fora do Git) e preencha `TRIPO_API_KEY`
   (crie em https://platform.tripo3d.ai). Sem chave, a página abre, mostra a galeria e um
   exemplo procedural, e o botão Gerar fica desligado.
2. Rode, a partir de `C:\fontes\rules-ai`:

   ```
   python dashboard/graphs/servidor.py
   ```

3. Abra http://localhost:8080/ (dashboard) ou http://localhost:8080/graphs/.

Cada geração pede confirmação de custo; o servidor aceita no máximo `LIMITE_GERACOES` (padrão 5)
por execução. Os GLB gerados ficam em `graphs/modelos/` (fora do Git).

## Arquivos

- `servidor.py`: serve o dashboard e as rotas `/api/estado`, `/api/modelos`, `/api/gerar`,
  `/api/tarefa/<id>`, `/api/saldo`. Nunca serve `.env`, arquivos ocultos nem `.py`.
- `cliente_tripo.py`: chamadas à Tripo (a chave só existe aqui).
- `galeria_modelos.py`: grava e lista os modelos em `modelos/`.
- `config_graphs.py`: constantes e leitura do `.env`.
- `index.html`, `assets/css/graphs.css`, `assets/js/` (`principal.js`, `api.js`,
  `visualizador.js`, `config.js`).

## Pendente

Os endpoints da Tripo (`/v2/openapi/task`, `/task/{id}`, `/user/balance`, campos `output.pbr_model`
e `output.model`) foram escritos sem conferir a documentação, que só abre com JavaScript. Confira
na primeira geração com chave; se algo mudar, ajuste só `config_graphs.py` e `cliente_tripo.py`.

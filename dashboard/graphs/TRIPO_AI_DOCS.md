# Tripo AI — como usar a API e os SDKs

Guia em português da API de geração 3D da Tripo, montado a partir da documentação oficial em
<https://developers.tripo3d.ai/pt/docs/sdk> e das páginas ligadas a ela (lidas em 2026-10-17):
`sdk`, `quick-start`, `authentication`, `task-lifecycle`, `task-query`, `billing`, `rate-limits` e
`error-handling`.

> As páginas **"Texto para modelo 3D"** (`/pt/docs/text-to-model`) e **"Modelos e Versões"**
> (`/pt/docs/models`) só abrem com JavaScript e não foram lidas. Por isso a lista completa de
> campos do texto → 3D, a tabela de versões e o custo em créditos por operação ficam como
> **não verificados** neste guia. Confira lá antes de depender deles.

---

## 1. Visão geral

- A API é **assíncrona**: toda geração devolve um `task_id`; depois você consulta a tarefa até ela
  terminar e baixa o arquivo (GLB).
- **Versão atual: V3**, com URL base `https://openapi.tripo3d.ai/v3`.
- **Versão antiga: V2**, com URL base `https://api.tripo3d.ai/v2/openapi`. Hoje aparece só no SDK
  de Python (0.4.2).
- Uma geração típica leva **de 10 a 120 segundos**.
- As URLs dos modelos gerados **expiram em 5 minutos**: baixe o arquivo logo que a tarefa terminar.

## 2. Chave da API (autenticação)

1. Entre no console <https://platform.tripo3d.ai> e crie uma conta.
2. Abra **API Keys** e clique em **Criar chave**. A chave aparece **uma única vez**: copie e guarde.
3. Guarde a chave numa variável de ambiente, nunca no código:

   ```bash
   export TRIPO_API_KEY="tsk_..."        # Linux/macOS
   setx TRIPO_API_KEY "tsk_..."          # Windows (vale para novos terminais)
   ```

   A documentação mostra o prefixo `tsk_` na página do SDK e `sk-` no início rápido.

4. Toda requisição leva o cabeçalho:

   ```
   Authorization: Bearer <sua_chave>
   ```

5. Teste a chave consultando o saldo:

   ```bash
   curl -X GET https://openapi.tripo3d.ai/v3/account/balance \
     -H "Authorization: Bearer YOUR_API_KEY"
   ```

**Segurança (recomendação da própria Tripo):** não coloque a chave no front-end. O navegador deve
falar com o seu servidor, que chama a Tripo. Não versione a chave e troque-a de tempos em tempos
(apague no console e crie outra).

## 3. Fluxo pela API REST (V3)

### 3.1 Criar a tarefa (texto → 3D)

```bash
curl -X POST https://openapi.tripo3d.ai/v3/generation/text-to-model \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "prompt": "a cute cat",
    "model": "v3.1-20260211"
  }'
```

Resposta:

```json
{ "code": 0, "data": { "task_id": "task_abc123" } }
```

Campos confirmados: `prompt` e `model`. Os exemplos dos SDKs também usam `texture: true`,
`pbr: true` e `texture_quality: "detailed"`, mas a página da API que lista todos os campos não foi
lida (**não verificado** como nome exato na REST).

### 3.2 Consultar a tarefa

```bash
curl -s -H "Authorization: Bearer YOUR_API_KEY" \
  https://openapi.tripo3d.ai/v3/tasks/task_abc123
```

Resposta de sucesso:

```json
{
  "code": 0,
  "data": {
    "task_id": "task_abc123",
    "type": "text_to_model",
    "status": "success",
    "progress": 100,
    "output": {
      "model_url": "https://...",
      "rendered_image_url": "https://..."
    }
  }
}
```

| Campo | Tipo | O que é |
|---|---|---|
| `task_id` | texto | Identificador (costuma começar com `task_`) |
| `type` | texto | `text_to_model`, `image_to_model`, `rig`, `convert`… |
| `status` | texto | Ver tabela de status abaixo |
| `progress` | inteiro | 0 a 100 |
| `output` | objeto | Preenchido no `success`: `model_url`, `rendered_image_url` (ou `model_urls` no retarget) |
| `credits_consumed` | número | Créditos gastos |
| `created_at` / `completed_at` | texto ISO 8601 | Criação e conclusão |

**Status da tarefa**

| Status | Significado | O que fazer |
|---|---|---|
| `queued` | Na fila (progresso 0) | Continuar consultando |
| `running` | Processando (0 a 100) | Continuar consultando |
| `success` | Pronto, `output` disponível | Baixar o arquivo em até 5 min |
| `failed` | Falha, geralmente do servidor | Tentar de novo ou falar com o suporte |
| `banned` | Entrada viola a política de conteúdo | Mudar o prompt/imagem |
| `expired` | Arquivos de saída não estão mais disponíveis | Gerar de novo |
| `cancelled` | Cancelada | — |

**Como consultar:** a cada 2 segundos (sem passar de 1 requisição por segundo por tarefa), com um
tempo máximo (ex.: 5 minutos). Para muitas tarefas de uma vez, use `POST /v3/tasks/list`.

### 3.3 Baixar o modelo

Faça um GET simples na `output.model_url` (sem o cabeçalho `Authorization`) e salve como `.glb`.
O GLB abre no Blender, Unity, Unreal Engine, Three.js, Babylon.js e `<model-viewer>`.

## 4. SDKs oficiais

| Linguagem | API | Versão fixada | Instalação |
|---|---|---|---|
| JavaScript / TypeScript | V3 | commit `e351348` | `npm install github:VAST-AI-Research/tripo-js-sdk#e35134801b339caac0b84f36fe02d08e73e217b2` |
| Python | V2 + V3 limitada | `0.4.2` | `python -m pip install tripo3d==0.4.2` |
| Go | V3 | commit `2c8c8d4` | `go get github.com/VAST-AI-Research/tripo-go-sdk@v0.0.0-20260713072120-2c8c8d4e6a9e` |
| Rust | V3 | commit `f992f6a` | dependência git no `Cargo.toml` (abaixo) |
| Java | V3 | commit `7b6a68d` | compilar do código (abaixo) |

Todos seguem o mesmo fluxo: **criar a tarefa → esperar terminar → baixar o arquivo**.

| Etapa | JavaScript | Python | Go | Rust | Java |
|---|---|---|---|---|---|
| Cliente | `new TripoClient({ apiKey, baseUrl })` | `TripoClient(api_key=...)` (async) | `tripo3d.NewClient(...)` | `TripoClient::new(...)` | `TripoClient.create(config)` |
| Texto → 3D | `textToModel({...})` | `text_to_model(...)` | `TextToModel(ctx, ...)` | `text_to_model(...)` | `textToModel(payload)` |
| Esperar | `waitForTask(id, {...})` | `wait_for_task(id)` | `WaitForTask(ctx, id, ...)` | `wait_for_task(&id, ...)` | `pollUntilTerminal(id)` |
| Baixar | `fetch(url)` | `urlopen(url)` | `DownloadModel(ctx, task)` | `download_model(&task)` | `URL.openStream()` |
| Versão do modelo | `model: ModelVersion.H3_1` | `model_version="v2.5-20250123"` | `Model: ModelVersionH31` | `model: H3_1` | `.model("v3.1-20260211")` |

### 4.1 JavaScript / TypeScript (exemplo oficial)

```javascript
import { writeFile } from 'node:fs/promises';
import { TripoClient, ModelVersion, TaskStatus } from 'tripo3d-sdk-js';

const apiKey = process.env.TRIPO_API_KEY;
if (!apiKey) throw new Error('TRIPO_API_KEY is required');

const client = new TripoClient({
  apiKey,
  baseUrl: 'https://openapi.tripo3d.ai/v3',
});

const taskId = await client.textToModel({
  prompt: 'a cute red panda holding bamboo',
  model: ModelVersion.H3_1,
  texture: true,
  pbr: true,
  texture_quality: 'detailed',
});

const task = await client.waitForTask(taskId, {
  pollingIntervalMs: 2000,
  onProgress: (value) => console.log(`${value.status} — ${value.progress ?? 0}%`),
});

if (task.status !== TaskStatus.SUCCESS) {
  throw new Error(`Task did not succeed: ${task.status}`);
}

const modelUrl = task.output.model_url ?? task.output.model;
if (!modelUrl) throw new Error('Task returned no model URL');

const response = await fetch(modelUrl);
if (!response.ok) throw new Error(`Download failed: HTTP ${response.status}`);

await writeFile(`tripo-${taskId}.glb`, Buffer.from(await response.arrayBuffer()));
```

O pacote é instalado do GitHub (`tripo-js-sdk`), mas o `import` usa o nome `tripo3d-sdk-js`.

### 4.2 Python (exemplo oficial, cliente V2)

```python
import asyncio
import os
import shutil
from urllib.request import urlopen

from tripo3d import TripoClient
from tripo3d.models import TaskStatus


def download_file(url, path):
    with urlopen(url) as response, open(path, "wb") as output:
        shutil.copyfileobj(response, output)


async def main():
    api_key = os.environ["TRIPO_API_KEY"]
    os.makedirs("./output", exist_ok=True)

    async with TripoClient(api_key=api_key) as client:
        task_id = await client.text_to_model(
            prompt="a cute red panda holding bamboo",
            model_version="v2.5-20250123",
        )
        task = await client.wait_for_task(task_id, verbose=True)

        if task.status != TaskStatus.SUCCESS:
            raise RuntimeError(f"Task did not succeed: {task.status}")

        model_url = task.output.model
        if not model_url:
            raise RuntimeError("Task returned no model URL")

        output_path = "./output/model.glb"
        await asyncio.to_thread(download_file, model_url, output_path)
        print(f"Downloaded model: {output_path}")


asyncio.run(main())
```

No cliente Python (V2) o arquivo vem em `task.output.model`; na V3 o campo é `output.model_url`.

### 4.3 Go

```go
client := tripo3d.NewClient(tripo3d.ClientOptions{
    APIKey:  apiKey,
    BaseURL: "https://openapi.tripo3d.ai/v3",
})
// client.TextToModel(ctx, tripo3d.TextToModelParams{Prompt: ..., Model: tripo3d.String(tripo3d.ModelVersionH31), ...})
// client.WaitForTask(ctx, taskID, tripo3d.WaitOptions{PollInterval: 2 * time.Second})
// client.DownloadModel(ctx, task)  // bytes em downloaded.Data
```

### 4.4 Rust

```toml
[dependencies]
tripo3d-sdk = { git = "https://github.com/VAST-AI-Research/tripo-rust-sdk.git", rev = "f992f6a7cf7a28c10781f9fa28e4630c7802291c" }
tokio = { version = "1", features = ["full"] }
anyhow = "1"
```

```rust
let client = TripoClient::new(ClientOptions {
    api_key: Some(api_key),
    base_url: Some("https://openapi.tripo3d.ai/v3".into()),
    ..Default::default()
})?;
// client.text_to_model(TextToModelParams { prompt, model: Some(model_version::H3_1.to_string()), .. })
// client.wait_for_task(&task_id, WaitOptions::default())
// client.download_model(&task)  // bytes em .data
```

### 4.5 Java

```bash
git clone https://github.com/VAST-AI-Research/tripo-java-sdk.git
cd tripo-java-sdk
git checkout 7b6a68d855e01a0b098775b1ee14ce7f3c8ac7d9
./mvnw install        # instala ai.tripo3d:tripo-sdk:0.1.0-SNAPSHOT no Maven local
```

```java
try (TripoClient client = TripoClient.create(
        TripoClientConfig.builder(apiKey).region(TripoRegion.GLOBAL).build())) {
    // client.textToModel(TaskRequestPayload.builder().prompt("a wooden chair").model("v3.1-20260211").build())
    // client.pollUntilTerminal(created.taskId())  -> em falha, done.errorMsg()
}
```

## 5. Endpoints da V3

| Grupo | Endpoints |
|---|---|
| Geração | `POST /v3/generation/text-to-model`, `image-to-model`, `multiview-to-model`, `text-to-image`, `image-to-image`, `image-to-multiview`, `edit-multiview`, `image-to-splat` (só Java) |
| Modelos | `POST /v3/models/texture`, `convert`, `refine` (só Java), `stylize` (só Java), `import` (só Java) |
| Malha | `POST /v3/mesh/segment`, `complete`, `decimate` |
| Animação | `POST /v3/animations/rig-check`, `rig`, `retarget` |
| Tarefas | `GET /v3/tasks/{task_id}`, `POST /v3/tasks/list` |
| Arquivos | `POST /v3/files`, `POST /v3/files/presign` (só Java) |
| Conta | `GET /v3/account/balance`, `GET /v3/account/usage` |

**V2 (cliente Python 0.4.2):** `POST /v2/openapi/task`, `GET /v2/openapi/task/{task_id}`,
`GET /v2/openapi/user/balance`, `POST /v2/openapi/upload/sts/token` (precisa de `boto3`) e
`POST /v2/openapi/upload`.

**Fluxo avançado (início rápido):** imagem → 3D (`model: "P1-20260311"`, `face_limit: 5000`,
`texture: true`, imagem por `file_token` ou URL) → `rig-check` → `rig` (`rig_type: "biped"`,
`spec: "mixamo"` ou `"tripo"`) → `retarget` (`animations: ["preset:walk", "preset:idle",
"preset:run"]`, passando o `task_id` do rig, nunca o da geração). Estimativa da própria página:
cerca de 105 s e 85 créditos.

## 6. Versões do modelo

Identificadores vistos nos exemplos (a tabela oficial não foi lida):

| Identificador | Onde aparece |
|---|---|
| `v3.1-20260211` | curl do início rápido, exemplo Java |
| `tripo-v3.1` | abas Python/JavaScript do início rápido (diverge do curl) |
| `H3.1` (`ModelVersion.H3_1`) | exemplos JS, Go e Rust |
| `P1-20260311` | fluxo avançado (série P) |
| `v2.5-20250123` | SDK Python (V2) |
| `v2.0-20260430` | segmentação de malha no Python |

Os modelos se dividem nas séries **H** e **P**, que têm limites de concorrência diferentes (seção 8).

## 7. Créditos e cobrança

- **Congela e depois cobra:** ao criar a tarefa, os créditos ficam congelados; no `success` são
  consumidos; em `failed` ou `cancelled` voltam para o saldo. Tarefa falhada ou cancelada não é
  cobrada.
- Saldo: `GET /v3/account/balance` → `{"balance": 10000.00, "frozen": 200.00}`.
- Uso: `GET /v3/account/usage` → lista com `task_id`, `type`, `credits_consumed`, `created_at`.
- **Preço:** a página de desenvolvedores (coletada em 2026-10-17) diz 1 crédito = US$ 0,01;
  texto → 3D de 10 a 20 créditos; imagem → 3D de 20 a 30 créditos. A página de cobrança da
  documentação não traz tabela de preços, e não há menção a créditos grátis para contas novas.

## 8. Limites

**Taxa (requisições por janela), por chave:** cada grupo de endpoints tem limite próprio
(`/v3/generation/*` é menor que `/v3/tasks/*`); os números não são publicados. Toda resposta traz
`X-RateLimit-Limit`, `X-RateLimit-Remaining` e `X-RateLimit-Reset` (segundos Unix). Passou do
limite: HTTP `429` com `code: 1007`.

**Concorrência (tarefas rodando ao mesmo tempo), por conta:**

| Categoria | Tarefas | Padrão |
|---|---|---|
| Geração 3D série H | texto/imagem/multivisão → 3D (H) | 10 |
| Geração 3D série P | texto/imagem/multivisão → 3D (P) | 5 |
| Geração de imagem | texto/imagem → imagem, multivisão | 1 |
| Animação | rig, rig-check, retarget | 10 |
| Processamento de modelo | textura, conversão, refino | 5 |
| Operações de malha | segmentação, conclusão, retopologia | 10 |

Categoria cheia: HTTP `429` com `code: 2000` e cabeçalho `Retry-After` (segundos). Para mais
concorrência, fale com o suporte.

## 9. Erros

Formato:

```json
{
  "code": 2010,
  "message": "Insufficient credits",
  "suggestion": "Please top up your account at https://platform.tripo3d.ai",
  "request_id": "req_abc123"
}
```

| HTTP | Significado |
|---|---|
| 200 | Sucesso |
| 400 | Parâmetro inválido |
| 401 | Sem autenticação (chave ausente ou inválida) |
| 403 | Sem permissão ou sem créditos |
| 404 | Não encontrado |
| 429 | Limite de taxa ou de concorrência |
| 500 | Erro interno |

| Código | Significado | O que fazer |
|---|---|---|
| 1000 | Chave inválida | Conferir a chave |
| 1001 | Não autorizado | Conferir o cabeçalho `Authorization` |
| 1002 | Falha de autenticação (visto na prática com chave inválida) | Conferir a chave |
| 1007 | Limite de taxa excedido | Esperar `X-RateLimit-Reset` |
| 2000 | Limite de concorrência/geração excedido | Esperar `Retry-After` |
| 2002 | Parâmetro não suportado | Conferir nomes e valores |
| 2003 | Arquivo de entrada vazio | — |
| 2004 | Tipo de arquivo não suportado | — |
| 2008 | Violação da política de conteúdo | Mudar a entrada |
| 2010 | Créditos insuficientes | Recarregar no console |
| 2015 | Versão da API desatualizada | Atualizar a versão |
| 2018 | Modelo complexo demais | Reduzir a complexidade |

**Novas tentativas:** só para `429` e `500`, com espera crescente (1 s, 2 s, 4 s… até 32 s),
respeitando `Retry-After` ou `X-RateLimit-Reset` quando vierem. Nunca repita `400`, `401` ou `403`.

**Na prática (teste de 2026-10-17):** o Cloudflare da Tripo devolve `403` com `error code: 1010`
para o User-Agent padrão do Python (`urllib`). Mande um User-Agent próprio.

## 10. Divergências da própria documentação

- Modelo no início rápido: `v3.1-20260211` no curl e `tripo-v3.1` nos exemplos Python/JS.
- Código `2000`: "limite de taxa" na página de erros e "limite de concorrência" na de limites
  (que usa `1007` para taxa).
- Esperas entre tentativas: 1-2-4 s (máx. 5 tentativas) na página de erros; dobrar até 32 s na de
  limites.
- Lista de status: 5 na consulta de tarefa, 7 no ciclo de vida (com `banned` e `expired`).
- A página do SDK mostra a mesma URL para global e China; a URL da China não foi confirmada.
- Prefixo da chave: `tsk_` na página do SDK, `sk-` no início rápido.

## 11. Situação no nosso dashboard (`dashboard/graphs/`)

O `servidor.py` usa a **V2** (`https://api.tripo3d.ai/v2/openapi`, `POST /task` com
`type: "text_to_model"`, saída em `output.pbr_model`/`output.model`), que continua listada (cliente
Python 0.4.2) e já respondeu `401` a uma chave falsa. Para migrar à **V3**, ajuste só
`config_graphs.py` e `cliente_tripo.py`:

| Item | V2 (atual no dashboard) | V3 |
|---|---|---|
| URL base | `https://api.tripo3d.ai/v2/openapi` | `https://openapi.tripo3d.ai/v3` |
| Criar texto → 3D | `POST /task` + `{"type": "text_to_model", "prompt": ...}` | `POST /generation/text-to-model` + `{"prompt": ..., "model": ...}` |
| Consultar | `GET /task/{id}` | `GET /tasks/{id}` |
| Saída | `output.pbr_model` / `output.model` | `output.model_url` |
| Saldo | `GET /user/balance` | `GET /account/balance` |

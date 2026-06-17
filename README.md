# Generador de Videos AI — Vos en el Campo

SPA frontend-only que toma una foto de tu cara, una elección de ambiente / acción / estilo, y genera un **video vertical de 4 segundos sin audio** tuyo en una escena rural usando **fal.ai** con el modelo **`fal-ai/veo3.1/lite/image-to-video`** (image-to-video).

## Stack

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui (Radix primitives)
- fal.ai Queue API (`fal-ai/veo3.1/lite/image-to-video`)

## Cómo correr

```bash
npm install
npm run dev
```

Abrí http://localhost:5173. La primera vez te pide tu API key de fal.ai — la conseguís en https://fal.ai/dashboard/keys. Se guarda solo en `localStorage`, nunca sale de tu navegador.

## Conseguir la API key

1. Creá cuenta en https://fal.ai
2. Agregá una tarjeta de crédito en **Billing** (no pre-pagás créditos: te facturan por uso real cada mes).
3. Generá una clave en https://fal.ai/dashboard/keys → "Add key".
4. Copiala (empieza con `fal_...`) y pegala en el dialog de la app.

## Modelo

`fal-ai/veo3.1/lite/image-to-video`, en una sola etapa: la selfie se usa como primer cuadro y se anima en un clip vertical 9:16 de **4 segundos, sin audio** (`generate_audio: false`).

**Importante sobre los estilos:** veo3.1 mantiene la **cara realista** de la persona y no la re-estiliza. El estilo elegido (Pixar 3D, Caricatura 3D, Claymation, LEGO) se pide por prompt y afecta sobre todo la escena, el ambiente y el movimiento — no transforma la cara a 2D. Por eso esta versión usa solo estilos 3D.

## Costo

Pay-per-use directo en fal.ai. La app es BYOK: no hay backend, no se cobra desde nuestro lado. La generación de video tarda bastante más que una imagen (el polling espera hasta 6 minutos).

## Limitaciones

- Las URLs de los videos generados por fal.ai expiran después de un tiempo. La app descarga el resultado a un Blob inmediatamente, así podés verlo y descargarlo sin riesgo.
- La marca de agua de BNA se muestra como overlay en la página de descarga (`/video`), pero **no queda quemada** en el MP4 descargado. Quemarla requeriría re-encodear el video en el navegador (MediaRecorder/WebCodecs).

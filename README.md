# DUA Inclusive Club — Frontend v2

Sitio de **DUA Inclusive Club** (Av. Juárez 2707, La Paz, Puebla). Concepto: *Welcome to our paradise*, neón rosa de lujo.
Frontend completo, en modo demostración, listo para que Agentia conecte backend, agentes y canales.

- Vista previa: https://duapro.netlify.app/
- Documento para integración: [`INTEGRATION_HANDOFF.md`](INTEGRATION_HANDOFF.md)
- Estado de contenidos (qué es real y qué es de prueba): [`CONTENT_STATUS.md`](CONTENT_STATUS.md)

## Stack

| Pieza | Versión | Por qué |
|---|---|---|
| HTML + CSS + JavaScript (ES modules), sin framework | — | Conserva el diseño aprobado (v1.1) sin reconstruirlo. |
| [Vite](https://vite.dev) | 8.3.5 | Servidor de desarrollo, build de producción y variables `VITE_*`. |
| Node.js | ≥ 20.19 (Netlify usa 22) | Requisito de Vite 8. |

Misma arquitectura que El Güero (`el-guero-web`): capa de servicios + mocks + adaptador HTTP.

## Comandos

```bash
npm install
cp .env.example .env.local   # opcional; sin él corre en modo demo
npm run dev                  # http://localhost:3032
npm run build                # → dist/
npm run preview              # sirve dist/ en http://localhost:4173
```

**Despliegue:** Netlify publica solo con cada push a `main` usando `netlify.toml` (`npm ci && npm run build`, carpeta `dist`). En Cloudflare Pages: mismo comando y carpeta.

## Dónde se cambian los datos (para reemplazar los de prueba)

| Qué | Archivo |
|---|---|
| Dirección, mapa, horario, teléfono RSV, Instagram, reseñas, FAQ, aviso de privacidad | `src/config/site.js` — el HTML los toma de aquí. Un `null` se ve como «por confirmar». |
| Número de WhatsApp | `VITE_WHATSAPP_NUMBER` (o `WHATSAPP_PLACEHOLDER` en `src/config/env.js`) |
| Cartelera (mientras no haya backend) | `src/data/mocks/events.js` — el staff solo agrega flyer, fecha y precios; la página decide sola cuál es el próximo show y cuáles «se vivieron». |
| Fotos | `public/img/` — reemplazar el archivo con el mismo nombre. Al tener las reales: `samplePhotos: false`. |
| Textos de diseño (manifiesto, pilares, ambiente) | `index.html` |

## Estructura

```
index.html                 Estructura de todas las secciones (datos del cliente desde site.js)
src/
  main.js                  Punto de entrada
  config/env.js            Configuración pública (VITE_*) y banderas de demo por URL
  config/site.js           Datos institucionales del cliente
  services/                index.js (puerta única), types.js, adapters/{mock,http,request}.js
  data/mocks/events.js     Cartelera de demostración
  components/
    status.js              Abierto / cerrado (hora de Puebla) y tabla de horario
    shows.js               Próximo show con cuenta regresiva + cartelera
    pass.js                «Tu pase»: preventa / mesa / cumpleaños → WhatsApp o API
    location.js            Mapa, reseñas y datos estructurados (JSON-LD)
    faq.js, effects.js     FAQ, marquesinas, brillo holográfico, escarcha
  lib/                     dom (escape, bindSite), time (hora de Puebla), reservation (flujos whatsapp/api),
                           validation, whatsapp, track (analítica), reveal
  styles/main.css
public/img/                Flyers (del Instagram) y fotos de muestra
```

## Variables de entorno

Ver [`.env.example`](.env.example). Todas son **públicas**: nunca poner tokens ni claves.

| Variable | Por defecto | Uso |
|---|---|---|
| `VITE_DATA_SOURCE` | `mock` | `mock` = demo · `http` = API de Agentia |
| `VITE_API_BASE_URL` | vacío | URL base de la API |
| `VITE_RESERVATION_FLOW` | `whatsapp` | `whatsapp` = abre WhatsApp y registra en segundo plano · `api` = pide nombre/teléfono y muestra el estado |
| `VITE_WHATSAPP_NUMBER` | vacío → `522211630619` | RSV de los flyers, **por confirmar** como oficial |
| `VITE_SITE_URL` | `https://duapro.netlify.app` | URL pública |

## Banderas de demostración (solo con el mock)

`?mock=error` (envíos fallan) · `?mock=confirmado` (responde «confirmada») · `?mock=lento` (4× más lento) · `?mock=vacio` (sin cartelera).
En modo mock aparece la cinta «Modo demostración · datos de prueba».

## Pruebas hechas (29-oct-2026)

Navegador (Playwright) a 390 y 1366 px, en ambos flujos: sin errores de consola propios (el único aviso es de WebGL dentro del mapa de OpenStreetMap en navegador sin GPU), sin scroll horizontal, cartelera y próximo show desde la capa de servicios, flujo `whatsapp` con el mensaje correcto, flujo `api` con validación y «Solicitud recibida», `?mock=error` y `?mock=vacio` con sus estados.

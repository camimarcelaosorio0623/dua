# CONTENT_STATUS — DUA Inclusive Club

Actualizado: 29-oct-2026 · Frontend v2

Todo lo que no está en «✅ Del cliente» es **de prueba** y se reemplaza sin tocar código de componentes (ver README).

## ✅ Del cliente (Instagram @dua_inclusive y flyers, oct-2026)

| Dato | Dónde vive |
|---|---|
| Nombre, «Welcome to our paradise», «The night belongs to us» | `index.html` |
| Av. Juárez 2707, La Paz, Puebla | `site.js → address` |
| RSV 221 163 0619 | `site.js → phone` |
| Flyers: Gaylloween Vol. 6 (Nayla Downs, $200/$300), Duaween Monstruos, Mista Boo | `data/mocks/events.js`, `public/img/fl1-3.jpg` |

Precios y artistas de los flyers: confirmar que siguen vigentes.

## 🧪 De prueba / por confirmar

| Dato | Estado en el sitio | Dónde se cambia |
|---|---|---|
| Horario jue–sáb 9 PM a 3 AM | Visible con nota «Horario por confirmar con DUA» | `site.js → hours` (y `note: null` al confirmar) |
| WhatsApp | Usa el RSV de los flyers | `VITE_WHATSAPP_NUMBER` |
| 2 shows «(ejemplo)» en los próximos viernes | **Ficticios**, para que la demo siempre tenga próximo show | borrar `demo` en `data/mocks/events.js` |
| Coordenadas del mapa | Aproximadas | `site.js → address.mapEmbed` |
| Reseñas de Google | Aviso «aquí irán 3 reseñas reales» | `site.js → reviews` (nunca inventar) |
| Textos del espacio seguro y FAQ | Propuesta | `index.html`, `site.js → faq` |
| Aviso de privacidad | No hay | `site.js → privacyPolicyUrl` |

## 🖼️ Fotos

| Archivo | Uso | Estado |
|---|---|---|
| `public/img/fl1-3.jpg` | Flyers | Del Instagram de DUA |
| `public/img/hero.jpg`, `event.jpg`, `crowd.jpg` | Hero, ambiente, cierre, shows de ejemplo | Muestra |
| `public/img/logo.jpg` | Favicon | Del Instagram |

Con las fotos reales: reemplazar con el mismo nombre y `samplePhotos: false`.

## Textos de metadatos

`<title>` y `<meta description>` mencionan Av. Juárez 2707 y «shows drag cada viernes»: revisar si cambia.

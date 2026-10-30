# CONTENT_STATUS — DUA Inclusive Club

Actualizado: 29-oct-2026 · Frontend v2.1 (material de noviembre que mandó DUA)

Todo lo que no está en «✅ Del cliente» es **de prueba** y se reemplaza sin tocar código de componentes (ver README).

## ✅ Del cliente (Instagram @dua_inclusive y flyers, oct-2026)

| Dato | Dónde vive |
|---|---|
| Nombre, «Welcome to our paradise», «The night belongs to us» | `index.html` |
| Av. Juárez 2707, La Paz, Puebla | `site.js → address` |
| RSV 221 163 0619 | `site.js → phone` |
| Flyers: Gaylloween Vol. 6 (Nayla Downs, $200/$300), Duaween Monstruos, Mista Boo | `data/mocks/events.js`, `public/img/fl1-3.jpg` |
| Cartelera de noviembre (bloc + audios del 29-oct): Fraternidad/Harry Potter, Catrinxs, Imitador, Estudio 54, Pelucas Shakira. Los sábados (Vol. 2) se publican solos el viernes | `data/mocks/events.js` (`publishAt`) |
| «No cover hasta las 12 AM» | `site.js → offers.cover`, `coverNote` de cada evento |
| Promos de botella: Nacional $699, Internacional $990, Premium $1,499, con 3 mezcladores, 8 a 10:30 PM, y sus marcas | `data/mocks/promotions.js`, `public/img/promo/` |
| Apertura 8 PM | `site.js → hours` |
| Logo oficial (blanco, PNG) | `public/img/logo-dua.png` (aún sin usar: el sitio usa el logo neón en texto) |

Precios y artistas de los flyers: confirmar que siguen vigentes.

## 🧪 De prueba / por confirmar

| Dato | Estado en el sitio | Dónde se cambia |
|---|---|---|
| Días jue–sáb y cierre 3 AM | Visible con nota «Días y hora de cierre por confirmar» | `site.js → hours` (y `note: null` al confirmar) |
| WhatsApp | Usa el RSV de los flyers | `VITE_WHATSAPP_NUMBER` |
| 2 shows «(ejemplo)» en los próximos viernes | **Ficticios**, para que la demo siempre tenga próximo show | borrar `demo` en `data/mocks/events.js` |
| Coordenadas del mapa | Aproximadas | `site.js → address.mapEmbed` |
| Reseñas de Google | Aviso «aquí irán 3 reseñas reales» | `site.js → reviews` (nunca inventar) |
| 13 y 14 de noviembre | Pendientes según DUA: no se publica nada | `data/mocks/events.js` |
| Nombre del imitador (12 y 26 nov) | «Imitador por anunciar» | `data/mocks/events.js → headliners` |
| Flyers de noviembre | Sin flyer: cada evento usa una foto real del club | `public/img/ev/` |
| ¿Sigue el «no cover» después de noviembre? | Visible | `site.js → offers.cover` (null = se oculta) |
| Textos del espacio seguro y FAQ | Propuesta | `index.html`, `site.js → faq` |
| Aviso de privacidad | No hay | `site.js → privacyPolicyUrl` |

## 🖼️ Fotos

| Archivo | Uso | Estado |
|---|---|---|
| `public/img/fl1-3.jpg` | Flyers | Del Instagram de DUA |
| `public/img/hero.jpg`, `event.jpg`, `crowd.jpg`, `amb/`, `ev/`, `og.jpg` | Hero, ambiente, cierre, cartelera, vista previa al compartir | Reales (carpeta FOTOS que mandó DUA) |
| `public/img/hero.mp4` | Video del arco del hero, sin audio (no carga con «ahorro de datos» o «reducir movimiento») | Real (recap de DUA) |
| `public/img/logo.jpg` | Favicon | Del Instagram |

Las fotos ya son reales (`samplePhotos: false`). Para cambiar una, reemplazar el archivo con el mismo nombre.

## Textos de metadatos

`<meta description>` menciona Av. Juárez 2707, «no cover hasta las 12 AM» y «botellas desde $699»: actualizar si cambian las promos.

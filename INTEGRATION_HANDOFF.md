# INTEGRATION_HANDOFF — DUA Inclusive Club

**Para:** equipo de backend / agentes de Agentia Labs
**De:** Marce (frontend)
**Fecha:** 29-oct-2026 · Frontend v2

> Las rutas y formatos son una **propuesta**: ninguna API está implementada. El frontend se ajusta en un solo archivo (`src/services/adapters/http.js`).

## 1. Cómo se conecta

1. `VITE_DATA_SOURCE=http` y `VITE_API_BASE_URL=https://…`.
2. Ajustar `ENDPOINTS` en `src/services/adapters/http.js`.
3. Elegir el flujo de reservas con `VITE_RESERVATION_FLOW` (§4).
4. Los componentes no se tocan: solo consumen `src/services/index.js`.

Reglas que el frontend ya cumple: sin credenciales en el navegador (`credentials: 'omit'`), todo texto del backend escapado, URLs filtradas, validación solo de ayuda (**el backend valida de nuevo**), nunca inventa IDs ni confirma por su cuenta. El código `DUA-1234` del pase es **decorativo** (sale de un hash de lo elegido) y no se envía.

## 2. Módulos que requieren backend

| Módulo | Función | Necesita | Estado |
|---|---|---|---|
| Cartelera + próximo show | `getEvents()` | Eventos publicados (pasados incluidos, para «Se vivió») | Mock (3 flyers reales + 2 de ejemplo) |
| Reservas / preventa / cumpleaños | `submitReservation()`, `getReservationStatus()` | Recibir solicitud, confirmación por el agente | Mock |
| WhatsApp | `VITE_WHATSAPP_NUMBER` | Número oficial + agente | Provisional `522211630619` (RSV de los flyers) |
| Reseñas de Google | `site.reviews` | 3 reseñas reales (texto, autor, estrellas) | Vacío → aviso «aquí irán…» |
| CRM / analítica | `track()` en `src/lib/track.js` | Destino de eventos | Emite `CustomEvent('dua:track')` |

## 3. Estructuras de datos

Fuente de verdad: `src/services/types.js`.

```ts
EventItem {
  id: string; title: string;
  headliners: string[];            // [] = sin anunciar
  startsAt: string;                // ISO 8601 con zona, ej. '2026-10-30T21:00:00-06:00'
  endsAt: string|null;             // null = startsAt + 6 h; al terminar pasa solo a «Se vivió»
  presalePrice: number|null;       // MXN
  doorPrice: number|null;          // MXN (taquilla)
  image: string|null; imageAlt: string|null;
  status: 'draft'|'published'|'cancelled'
}

ReservationRequest {
  type: 'presale'|'table'|'birthday';
  eventId: string|null; eventTitle: string|null;   // solo presale
  date: 'YYYY-MM-DD';              // hora de Puebla
  partySize: number;               // 2–10
  partySizeOrMore: boolean;        // true = «10 o más»
  name: string|null; phone: string|null;           // null en flujo whatsapp
  consent: boolean;
  channel: 'whatsapp'|'web'
}
ReservationResult { requestId: string; status: 'received'|'pending'|'confirmed'|'rejected'|'cancelled'; message?: string|null }
```

## 4. Flujos de reserva (`VITE_RESERVATION_FLOW`)

**`whatsapp` (por defecto):** «Tu pase» abre WhatsApp con el mensaje y en paralelo hace `POST /reservations` con `channel: "whatsapp"`. Los botones «Apartar mi preventa» y «Preventa $X →» de la cartelera abren WhatsApp directo (evento `presale_whatsapp_click`).

Mensajes que llegan por WhatsApp:
```
Hola DUA 💖 Quiero apartar preventa para Gaylloween Vol. 6 (viernes 30 de oct) para 4 personas. ¿Cómo la aparto?
Hola DUA 🎂 Quiero festejar mi cumpleaños el sábado 31 de oct. Somos 6. ¿Me apartan mesa?
Hola DUA 💖 Quiero apartar mesa para 4 personas el jueves 5 de nov. ¿Tienen lugar?
```

**`api`:** «Tu pase» pide nombre, teléfono y autorización, envía y muestra el estado. Los CTA de preventa llevan a «Tu pase» en vez de abrir WhatsApp.

## 5. Operaciones de API propuestas

| Método y ruta | Respuesta |
|---|---|
| `GET /events?status=published` | `200 EventItem[]` |
| `POST /reservations` | `201 ReservationResult` |
| `GET /reservations/{requestId}` | `200 ReservationResult` *(preparado)* |

Errores: 400/422 → `validation` (marca `fields`: `name`, `phone`, `consent`) · 404 → `not_found` · 5xx / red / timeout 12 s → error con enlace a WhatsApp.

## 6. Eventos de analítica

`window` → `dua:track`: `presale_whatsapp_click {eventId}`, `reservation_whatsapp_opened {type}`, `reservation_log_failed {code}`, `reservation_submitted {type,status}`, `reservation_failed {type,code}`.

## 7. Dependencias pendientes

- [ ] Contratos API definitivos · CORS (dominio + `localhost:3032`).
- [ ] WhatsApp oficial → `VITE_WHATSAPP_NUMBER`.
- [ ] Destino de `track()`.
- [ ] Aviso de privacidad → `privacyPolicyUrl`.
- [ ] Hosting de flyers.
- [ ] Reseñas reales de Google → `site.reviews`.
- [ ] Dominio definitivo.

## 8. Preguntas técnicas

1. ¿La preventa se paga? Hoy no hay pagos en la web; si se cobra, ¿link de pago que manda el agente?
2. ¿Cupo de preventa por evento? Si sí, agregar `presaleAvailable` a `EventItem`.
3. ¿Anti-spam en el flujo `api`?
4. ¿Mapa con coordenadas validadas? El marcador de OpenStreetMap es aproximado.

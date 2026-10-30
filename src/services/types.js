/**
 * Modelo de datos que el frontend espera del backend.
 * Es la fuente de verdad de INTEGRATION_HANDOFF.md: si cambia aquí, se actualiza allá.
 *
 * @typedef {Object} EventItem  Show / evento de la cartelera
 * @property {string} id
 * @property {string} title
 * @property {string[]} headliners     Show estelar (artistas). [] = sin anunciar.
 * @property {string} startsAt         ISO 8601 con zona (ej. '2026-10-30T21:00:00-06:00')
 * @property {string|null} endsAt      null = startsAt + 6 h. Al terminar pasa solo a «Se vivió».
 * @property {string|null} [publishAt] ISO 8601. El evento no se muestra antes de esta fecha (regla de DUA:
 *                                    el sábado de un fin doble se anuncia hasta el viernes). null/ausente = ya.
 * @property {string|null} [tagline]   Una línea: temática o gancho («Temática Harry Potter · regalamos botellas»).
 * @property {number|null} presalePrice  MXN entero. null = no hay preventa.
 * @property {number|null} doorPrice     MXN entero (taquilla). null = no publicado.
 * @property {string|null} [coverNote]   Condición de entrada cuando no hay precio («No cover hasta las 12 AM»).
 * @property {string|null} [dressCode]   «Peluca», etc. null = libre.
 * @property {string|null} image       Flyer (URL absoluta o ruta pública)
 * @property {string|null} imageAlt
 * @property {'draft'|'published'|'cancelled'} status
 *
 * @typedef {Object} Promotion  Promo de barra (botellas)
 * @property {string} id
 * @property {string} title
 * @property {number} price          MXN entero
 * @property {string} includes       «3 mezcladores de 355 ml»
 * @property {string} schedule       Texto libre: días y horario de la promo
 * @property {string[]} brands       Marcas que entran
 * @property {string|null} image
 * @property {string|null} imageAlt
 * @property {'draft'|'published'} status
 *
 * @typedef {Object} ReservationRequest
 * @property {'presale'|'table'|'birthday'} type
 * @property {string|null} eventId     Evento elegido (preventa o mesa para esa noche). null = noche sin evento.
 * @property {string|null} eventTitle
 * @property {string|null} promotionId Botella en promo que quiere apartar. null = sin botella.
 * @property {string} date             'YYYY-MM-DD' (hora de Puebla)
 * @property {number} partySize        2–10
 * @property {boolean} partySizeOrMore true = «10 o más»
 * @property {string|null} name
 * @property {string|null} phone       E.164 (+52…). null en el flujo 'whatsapp' (el número llega por WhatsApp).
 * @property {boolean} consent         Autorización de tratamiento de datos (LFPDPPP). false en el flujo 'whatsapp'.
 * @property {'whatsapp'|'web'} channel
 *
 * @typedef {'received'|'pending'|'confirmed'|'rejected'|'cancelled'} ReservationStatus
 *
 * @typedef {Object} ReservationResult
 * @property {string} requestId  Generado por el backend. El frontend nunca lo inventa.
 * @property {ReservationStatus} status
 * @property {string|null} [message]
 */

/** Error normalizado de la capa de servicios. */
export class ServiceError extends Error {
  /**
   * @param {'network'|'timeout'|'validation'|'not_found'|'server'|'unknown'} code
   * @param {string} message
   * @param {Record<string,string>} [fields] errores por campo devueltos por el backend
   */
  constructor(code, message, fields) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
    this.fields = fields || null;
  }
}

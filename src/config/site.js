/**
 * Contenido institucional de DUA Inclusive Club (lo que NO viene del backend).
 * ÚNICO archivo que hay que tocar cuando lleguen los datos reales: el HTML los toma de aquí
 * (atributos data-site). Un valor null se muestra como «por confirmar».
 * Cada dato lleva su estado en CONTENT_STATUS.md.
 */
export const site = {
  name: 'DUA Inclusive Club',

  address: {
    street: 'Av. Juárez 2707',
    area: 'La Paz',
    city: 'Puebla, Pue.',
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Av.%20Ju%C3%A1rez%202707%2C%20La%20Paz%2C%20Puebla',
    /** Mapa embebido (OpenStreetMap). El marcador es aproximado: PENDIENTE validar coordenadas. */
    mapEmbed: 'https://www.openstreetmap.org/export/embed.html?bbox=-98.2320%2C19.0510%2C-98.2170%2C19.0610&layer=mapnik&marker=19.0558%2C-98.2245',
  },

  /**
   * Apertura 8 PM: REAL (flyers de promos de oct-2026, «todos los días 8:00 PM»).
   * Días (jue–sáb, por la cartelera de noviembre) y cierre 3 AM: POR CONFIRMAR.
   * days: 0=domingo … 6=sábado. open/close en horas (close < open = cierra de madrugada).
   * Cuando DUA lo confirme: ajustar y poner note: null.
   */
  hours: {
    openDays: [4, 5, 6],
    open: 20,
    close: 3,
    openLabel: '8 PM',
    closeLabel: '3 AM',
    doorsLabel: '8:00 PM',
    label: 'Jue a sáb · 8 PM a 3 AM',
    note: 'Días y hora de cierre por confirmar con DUA.',
  },

  /**
   * Ganchos de entrada (plan de noviembre 2026 que mandó DUA). Se muestran en el hero y en la sección Barra.
   * null = no se muestra. PENDIENTE: confirmar si «no cover» sigue después de noviembre.
   */
  offers: {
    cover: 'No cover hasta las 12 AM',
    happyHour: 'Botellas desde $699 de 8 a 10:30 PM',
  },

  /** Teléfono de reservas de los flyers. El WhatsApp sale de config/env.js (mismo número, provisional). */
  phone: { display: '221 163 0619', label: 'RSV 221 163 0619', href: 'tel:+522211630619' },
  instagram: { handle: '@dua_inclusive', url: 'https://www.instagram.com/dua_inclusive/' },

  minAge: 18,
  /** true mientras las fotos de public/img sean de muestra. */
  samplePhotos: false, // fotos y video reales que mandó DUA (oct-2026)
  privacyPolicyUrl: null, // aviso de privacidad (LFPDPPP): PENDIENTE

  /** Reseñas reales de Google (texto, autor, estrellas). Vacío = se muestra el aviso «aquí irán…». Nunca inventar. */
  reviews: [],

  marquee: ['The night belongs to us', 'No cover hasta las 12', 'Welcome to our paradise', 'Botellas desde $699'],

  reservation: {
    partySizes: [2, 3, 4, 6, 8, '10+'],
    defaultPartySize: 4,
  },

  faq: [
    ['¿Cuánto cuesta entrar?', 'Llega antes de las 12 AM y no pagas cover. En eventos especiales con preventa, el flyer trae el precio y la apartas por WhatsApp.'],
    ['¿Tienen promo de botellas?', 'Sí, todos los días de 8:00 a 10:30 PM: Nacional $699, Internacional $990 y Premium $1,499, cada una con 3 mezcladores. Apártala junto con tu mesa.'],
    ['¿Cuál es la edad mínima?', '18 años, con identificación oficial.'],
    ['¿A qué hora empieza el show?', 'Abrimos a las 8 PM y el show va más tarde. La hora exacta viene en cada flyer.'],
    ['¿Hay dress code?', 'Ven como te sientas tú. En noches temáticas (como la de pelucas) el dress code te da beneficios: lo verás en la cartelera.'],
    ['¿Puedo festejar mi cumpleaños?', 'Sí. Dinos cuántos son al armar tu pase y te apartamos la mesa.'],
    ['¿Cómo aparto mesa?', 'Arma tu pase arriba (puedes sumar tu botella) o escríbenos al RSV 221 163 0619.'],
  ],
};

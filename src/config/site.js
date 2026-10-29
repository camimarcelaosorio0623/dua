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
   * DEMO: horario sin confirmar (jue–sáb 9 PM a 3 AM).
   * days: 0=domingo … 6=sábado. open/close en horas (close < open = cierra de madrugada).
   * Cuando DUA lo confirme: ajustar y poner note: null.
   */
  hours: {
    openDays: [4, 5, 6],
    open: 21,
    close: 3,
    openLabel: '9 PM',
    closeLabel: '3 AM',
    doorsLabel: '9:00 PM',
    label: 'Jue a sáb · 9 PM a 3 AM',
    note: 'Horario por confirmar con DUA.',
  },

  /** Teléfono de reservas de los flyers. El WhatsApp sale de config/env.js (mismo número, provisional). */
  phone: { display: '221 163 0619', label: 'RSV 221 163 0619', href: 'tel:+522211630619' },
  instagram: { handle: '@dua_inclusive', url: 'https://www.instagram.com/dua_inclusive/' },

  minAge: 18,
  /** true mientras las fotos de public/img sean de muestra. Pasar a false con las reales. */
  samplePhotos: true,
  privacyPolicyUrl: null, // aviso de privacidad (LFPDPPP): PENDIENTE

  /** Reseñas reales de Google (texto, autor, estrellas). Vacío = se muestra el aviso «aquí irán…». Nunca inventar. */
  reviews: [],

  marquee: ['The night belongs to us', 'Welcome to our paradise'],

  reservation: {
    partySizes: [2, 3, 4, 6, 8, '10+'],
    defaultPartySize: 4,
  },

  faq: [
    ['¿Cuánto cuesta entrar?', 'Depende del evento. Cada flyer trae preventa y taquilla; la preventa sale más barata y la apartas por WhatsApp.'],
    ['¿Cuál es la edad mínima?', '18 años, con identificación oficial.'],
    ['¿A qué hora empieza el show?', 'Las puertas abren a las 9 PM y el show va más tarde. La hora exacta viene en cada flyer.'],
    ['¿Hay dress code?', 'Ven como te sientas tú. Aquí se vale todo el brillo.'],
    ['¿Puedo festejar mi cumpleaños?', 'Sí. Dinos cuántos son al armar tu pase y te apartamos la mesa.'],
    ['¿Cómo aparto mesa?', 'Arma tu pase arriba o escríbenos al RSV 221 163 0619.'],
  ],
};

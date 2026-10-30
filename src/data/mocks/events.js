/**
 * Cartelera (mock hasta que Agentia conecte su API).
 * - Octubre: de los flyers del Instagram de DUA; precios y artistas sin confirmar.
 * - Noviembre: del plan que mandó DUA (recomendaciones/bloc.txt + audios del 29-oct-2026).
 *   Sin flyer todavía: la imagen es una foto real del club. Cambiarla por el flyer cuando salga.
 *   Sin precio de preventa: «No cover hasta las 12 AM» (coverNote).
 * - Regla de DUA para fines de semana dobles (20–21 y 27–28): el sábado NO se anuncia antes
 *   del viernes, para no dividir a la gente. Por eso el sábado lleva publishAt.
 * - Los 13 y 14 de noviembre siguen pendientes: no se publica nada.
 * - Los «(ejemplo)» solo aparecen si ya no queda ningún evento real por venir. Son FICTICIOS.
 * @type {import('../../services/types.js').EventItem[]}
 */
const NO_COVER = 'No cover hasta las 12 AM';

const real = [
  {
    id: 'gaylloween-vol-6',
    title: 'Gaylloween Vol. 6',
    headliners: ['Nayla Downs'],
    startsAt: '2026-10-30T21:00:00-06:00',
    endsAt: null,
    presalePrice: 200,
    doorPrice: 300,
    image: '/img/fl1.jpg',
    imageAlt: 'Flyer Gaylloween Vol. 6 con Nayla Downs',
    status: 'published',
  },
  {
    id: 'duaween-monstruos',
    title: 'Duaween · Monstruos',
    headliners: ['Stacey Teen', 'Lola Bosh', 'Sair Inventada'],
    startsAt: '2026-10-23T21:00:00-06:00',
    endsAt: null,
    presalePrice: 150,
    doorPrice: 200,
    image: '/img/fl2.jpg',
    imageAlt: 'Flyer Duaween edición Monstruos',
    status: 'published',
  },
  {
    id: 'mista-boo',
    title: 'Mista Boo',
    headliners: ['Open door 9 PM'],
    startsAt: '2026-10-16T21:00:00-06:00',
    endsAt: null,
    presalePrice: 100,
    doorPrice: 150,
    image: '/img/fl3.jpg',
    imageAlt: 'Flyer Mista Boo',
    status: 'published',
  },
  {
    id: 'jueves-fraternidad-hp',
    title: 'Jueves de Fraternidad',
    tagline: 'Temática Harry Potter · regalamos botellas',
    headliners: [],
    startsAt: '2026-11-05T20:00:00-06:00',
    endsAt: null,
    presalePrice: null,
    doorPrice: null,
    coverNote: NO_COVER,
    image: '/img/ev/fraternidad.jpg',
    imageAlt: 'Amigos celebrando en DUA',
    status: 'published',
  },
  {
    id: 'concurso-catrinxs',
    title: 'Concurso de Catrinxs',
    tagline: 'Ven de catrina o catrín y súbete a concursar',
    headliners: [],
    startsAt: '2026-11-06T20:00:00-06:00',
    endsAt: null,
    presalePrice: null,
    doorPrice: null,
    coverNote: NO_COVER,
    image: '/img/ev/catrinxs.jpg',
    imageAlt: 'Drag con tocado de flores en DUA',
    status: 'published',
  },
  {
    id: 'jueves-imitador-12nov',
    title: 'Jueves de Imitador',
    tagline: 'Tu diva favorita, en vivo',
    headliners: ['Imitador por anunciar'],
    startsAt: '2026-11-12T20:00:00-06:00',
    endsAt: null,
    presalePrice: null,
    doorPrice: null,
    coverNote: NO_COVER,
    image: '/img/ev/imitador.jpg',
    imageAlt: 'Show en vivo con micrófono en DUA',
    status: 'published',
  },
  {
    id: 'estudio-54',
    title: 'Fiesta Estudio 54',
    tagline: 'Disco, brillo y glamour de los 70',
    headliners: [],
    startsAt: '2026-11-20T20:00:00-06:00',
    endsAt: null,
    presalePrice: null,
    doorPrice: null,
    coverNote: NO_COVER,
    image: '/img/ev/estudio54.jpg',
    imageAlt: 'Invitado con abrigo blanco de plumas en marco dorado',
    status: 'published',
  },
  {
    id: 'estudio-54-vol-2',
    title: 'Estudio 54 Vol. 2',
    tagline: 'La segunda vuelta de la fiesta disco',
    headliners: [],
    startsAt: '2026-11-21T20:00:00-06:00',
    endsAt: null,
    publishAt: '2026-11-20T12:00:00-06:00',
    presalePrice: null,
    doorPrice: null,
    coverNote: NO_COVER,
    image: '/img/ev/estudio54-vol2.jpg',
    imageAlt: 'Invitado con abrigo blanco de plumas en marco dorado',
    status: 'published',
  },
  {
    id: 'jueves-imitador-26nov',
    title: 'Jueves de Imitador',
    tagline: 'Tu diva favorita, en vivo',
    headliners: ['Imitador por anunciar'],
    startsAt: '2026-11-26T20:00:00-06:00',
    endsAt: null,
    presalePrice: null,
    doorPrice: null,
    coverNote: NO_COVER,
    image: '/img/ev/imitador-2.jpg',
    imageAlt: 'Drag cantando en el escenario de DUA',
    status: 'published',
  },
  {
    id: 'pelucas-shakira',
    title: 'Noche de Pelucas',
    tagline: 'Temática Shakira',
    headliners: [],
    startsAt: '2026-11-27T20:00:00-06:00',
    endsAt: null,
    presalePrice: null,
    doorPrice: null,
    coverNote: 'No cover con peluca',
    dressCode: 'Peluca',
    image: '/img/ev/pelucas.jpg',
    imageAlt: 'Bailarina de cabello largo en la pista de DUA',
    status: 'published',
  },
  {
    id: 'pelucas-shakira-vol-2',
    title: 'Noche de Pelucas Vol. 2',
    tagline: 'Temática Shakira',
    headliners: [],
    startsAt: '2026-11-28T20:00:00-06:00',
    endsAt: null,
    publishAt: '2026-11-27T12:00:00-06:00',
    presalePrice: null,
    doorPrice: null,
    coverNote: 'No cover con peluca',
    dressCode: 'Peluca',
    image: '/img/ev/pelucas-2.jpg',
    imageAlt: 'Drag con peluca rosa en DUA',
    status: 'published',
  },
];

/** Próximos `n` viernes a las 9 PM (hora de Puebla, UTC-6) que no choquen con un evento real. */
function demoFridays(n) {
  const taken = new Set(real.map((e) => e.startsAt.slice(0, 10)));
  const out = [];
  const d = new Date(Date.now() - 6 * 3600e3);
  d.setUTCHours(12, 0, 0, 0);
  while (out.length < n) {
    const ymd = d.toISOString().slice(0, 10);
    if (d.getUTCDay() === 5 && !taken.has(ymd)) out.push(ymd);
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return out;
}

const hasUpcoming = real.some((e) => new Date(e.startsAt).getTime() > Date.now());

const demo = hasUpcoming ? [] : demoFridays(2).map((ymd, i) => ({
  id: `show-ejemplo-${i + 1}`,
  title: i === 0 ? 'Viernes de show (ejemplo)' : 'Drag night (ejemplo)',
  headliners: ['Artista por anunciar'],
  startsAt: `${ymd}T21:00:00-06:00`,
  endsAt: null,
  presalePrice: 150,
  doorPrice: 200,
  image: i === 0 ? '/img/event.jpg' : '/img/crowd.jpg',
  imageAlt: 'Imagen de muestra',
  status: 'published',
}));

export const eventsMock = [...real, ...demo];

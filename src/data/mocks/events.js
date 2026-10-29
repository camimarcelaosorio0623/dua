/**
 * DATOS DE DEMOSTRACIÓN — cartelera.
 * - Los 3 primeros salen de los flyers del Instagram de DUA (oct-2026); precios y artistas sin confirmar.
 * - Los «(ejemplo)» se generan siempre en los próximos viernes para que la demo nunca se quede
 *   sin próximo show. Son FICTICIOS: borrarlos cuando DUA mande su cartelera real.
 * @type {import('../../services/types.js').EventItem[]}
 */
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

const demo = demoFridays(2).map((ymd, i) => ({
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

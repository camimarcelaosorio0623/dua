/**
 * Promos de botella — REALES, de los flyers que mandó DUA (29-oct-2026, «Estas son mis nuevas Promos»).
 * Si cambian precios o marcas, se cambia aquí (o en la API cuando Agentia la conecte).
 * @type {import('../../services/types.js').Promotion[]}
 */
export const promotionsMock = [
  {
    id: 'botella-nacional',
    title: 'Botella Nacional',
    price: 699,
    includes: '3 mezcladores de 355 ml',
    schedule: 'Todos los días · 8:00 a 10:30 PM',
    brands: ['Bacardí Blanco', 'Bacardí Mango', 'Bacardí Coco', 'Bacardí Raspberry', 'José Cuervo Especial', 'Smirnoff', 'Smirnoff Tamarindo', 'Absolut Azul'],
    image: '/img/promo/nacional.jpg',
    imageAlt: 'Promo Botella Nacional 1 x $699',
    status: 'published',
  },
  {
    id: 'botella-internacional',
    title: 'Botella Internacional',
    price: 990,
    includes: '3 mezcladores de 355 ml',
    schedule: 'Todos los días · 8:00 a 10:30 PM',
    brands: ['Johnnie Walker Etiqueta Roja', 'Torres 10', 'Asti Martini'],
    image: '/img/promo/internacional.jpg',
    imageAlt: 'Promo Botella Internacional 1 x $990',
    status: 'published',
  },
  {
    id: 'botella-premium',
    title: 'Botella Premium',
    price: 1499,
    includes: '3 mezcladores de 355 ml',
    schedule: 'Todos los días · 8:00 a 10:30 PM',
    brands: ['Grey Goose', 'Tanqueray', 'Johnnie Walker Etiqueta Negra', "Buchanan's 12 años", 'Maestro Dobel', 'Don Julio 70', 'Hpnotiq'],
    image: '/img/promo/premium.jpg',
    imageAlt: 'Promo Botella Premium 1 x $1,499',
    status: 'published',
  },
];

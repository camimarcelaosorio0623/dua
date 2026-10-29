import { $, esc, safeUrl } from '../lib/dom.js';
import { site } from '../config/site.js';

/** Mapa embebido y reseñas (si ya hay reseñas reales cargadas en site.js). */
export function initLocation() {
  const map = $('#mapa');
  const src = safeUrl(site.address.mapEmbed);
  if (src) map.src = src;
  else map.hidden = true;

  const box = $('#resenas');
  if (site.reviews.length) {
    box.innerHTML = site.reviews.map((r) => `<blockquote><p>${'⭐'.repeat(r.stars || 5)} ${esc(r.text)}</p><cite>${esc(r.author)}</cite></blockquote>`).join('');
  }
}

/** Datos estructurados para buscadores, a partir de site.js. */
export function injectJsonLd() {
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NightClub',
    name: site.name,
    address: { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: 'Puebla', addressRegion: 'Puebla', addressCountry: 'MX' },
    telephone: '+52 ' + site.phone.display,
    sameAs: [site.instagram.url],
  });
  document.head.appendChild(s);
}

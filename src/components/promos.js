import { $, esc, safeUrl, setState } from '../lib/dom.js';
import { track } from '../lib/track.js';
import { site } from '../config/site.js';

export const money = (n) => '$' + n.toLocaleString('es-MX');

/**
 * Sección «Barra»: promos de botella. El botón de cada una la deja elegida en «Tu pase»
 * (evento dua:bottle) y baja hasta ahí, para que mesa + botella salgan en un solo mensaje.
 * @param {HTMLElement} box
 * @param {import('../services/types.js').Promotion[]} promos
 */
export function renderPromos(box, promos, state = promos.length ? 'ready' : 'empty') {
  setState(box, state);
  if (state !== 'ready') {
    box.innerHTML = `<p class="vacio">${state === 'error' ? 'No pudimos cargar las promos.' : 'Pronto publicamos las promos de la barra.'} Pregúntalas por WhatsApp o en <a href="${site.instagram.url}" target="_blank" rel="noopener">${site.instagram.handle}</a>.</p>`;
    return;
  }
  box.innerHTML = promos.map((p, i) => `
    <article class="bt reveal${i === 1 ? ' top' : ''}">
      <div class="ph"><img src="${esc(safeUrl(p.image))}" alt="${esc(p.imageAlt || p.title)}" loading="lazy"></div>
      <div class="b">
        <h3>${esc(p.title)}</h3>
        <div class="pr"><small>1 x</small>${money(p.price)}</div>
        <p class="inc">Con ${esc(p.includes)} · ${esc(p.schedule)}</p>
        <details class="marcas"><summary>Qué botellas entran (${p.brands.length})</summary><p>${p.brands.map(esc).join(' · ')}</p></details>
        <a class="btn btn-glass" href="#pase" data-promo="${esc(p.id)}">Apartar con esta botella</a>
      </div>
    </article>`).join('');
  box.querySelectorAll('a[data-promo]').forEach((a) => a.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('dua:bottle', { detail: a.dataset.promo }));
    track('promo_pick', { promotionId: a.dataset.promo });
  }));
}

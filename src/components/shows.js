import { $, esc, safeUrl, setState } from '../lib/dom.js';
import { pueblaDate, shortDate, DAYS } from '../lib/time.js';
import { waLink } from '../lib/whatsapp.js';
import { track } from '../lib/track.js';
import { config } from '../config/env.js';
import { site } from '../config/site.js';

const ms = (iso) => new Date(iso).getTime();
const endOf = (e) => (e.endsAt ? ms(e.endsAt) : ms(e.startsAt) + 6 * 3600e3);
export const eventDate = (e) => pueblaDate(ms(e.startsAt));
const label = (e) => shortDate(eventDate(e));
const hasPresale = (e) => e.presalePrice != null;
const presaleMsg = (e) => hasPresale(e)
  ? `Hola DUA 💖 Quiero apartar preventa para ${e.title} (${label(e)}). ¿Cómo la aparto?`
  : `Hola DUA 💖 Quiero apartar mesa para ${e.title} (${label(e)}). ¿Tienen lugar?`;
/** Texto del CTA según haya preventa o no. */
export const ctaLabel = (e) => (hasPresale(e) ? 'Apartar mi preventa' : 'Apartar mesa para esa noche');
const PAST_SHOWN = 3;

/**
 * Próximos (del más cercano al más lejano) y los que se vivieron (del más reciente al más viejo).
 * @param {import('../services/types.js').EventItem[]} events
 */
export function splitEvents(events, now = Date.now()) {
  const future = events.filter((e) => endOf(e) > now).sort((a, b) => ms(a.startsAt) - ms(b.startsAt));
  const past = events.filter((e) => endOf(e) <= now).sort((a, b) => ms(b.startsAt) - ms(a.startsAt)).slice(0, PAST_SHOWN);
  return { future, past, next: future[0] || null };
}

/** En el flujo 'whatsapp' los CTA abren WhatsApp; en 'api' llevan al pase (que registra la solicitud). */
function wireCta(a, e) {
  if (config.reservationFlow === 'api') { a.href = '#pase'; a.removeAttribute('target'); return; }
  a.href = waLink(presaleMsg(e));
  a.target = '_blank';
  a.rel = 'noopener';
  a.addEventListener('click', () => track(hasPresale(e) ? 'presale_whatsapp_click' : 'event_table_whatsapp_click', { eventId: e.id }));
}

let timer;
/** Bloque «Próximo show» con cuenta regresiva. */
export function renderNextShow(next, fallbackImage) {
  clearInterval(timer);
  const img = $('#s-img');
  if (!next) {
    $('#s-title').textContent = 'Muy pronto';
    $('#s-estelar').textContent = `Estamos cocinando el próximo flyer. Síguenos en Instagram ${site.instagram.handle}.`;
    $('#cd').hidden = true;
    $('#s-precios').innerHTML = '';
    $('#s-meta').innerHTML = '';
    $('#s-badge').hidden = true;
    $('#s-cta').href = '#pase';
    $('#s-cta-txt').textContent = 'Apartar mesa';
    img.src = fallbackImage;
    img.alt = '';
    return;
  }
  const start = ms(next.startsAt);
  const now = Date.now();
  const d = eventDate(next);
  const days = Math.floor((start - now) / 864e5);
  $('#s-badge').hidden = false;
  $('#s-badge').textContent = start <= now ? '¡Es hoy!' : days < 7 ? 'Este ' + DAYS[d.getUTCDay()] : label(next);
  img.src = safeUrl(next.image) || fallbackImage;
  img.alt = next.imageAlt || next.title;
  $('#s-title').textContent = next.title;
  $('#s-estelar').innerHTML = next.headliners.length
    ? `Show estelar <b>${next.headliners.map(esc).join(' · ')}</b>`
    : next.tagline ? `<b>${esc(next.tagline)}</b>` : '';
  const pre = next.presalePrice, door = next.doorPrice;
  $('#s-precios').innerHTML =
    (pre != null ? `<div class="precio pre"><small>Preventa</small><b>$${pre}</b></div>` : '') +
    (door != null ? `<div class="precio"><small>Taquilla</small><b>$${door}</b></div>` : '') +
    (pre != null && door != null && door > pre ? `<span class="ahorro">¡Ahorras $${door - pre}!</span>` : '') +
    (pre == null && next.coverNote ? `<div class="precio pre"><small>Entrada</small><b>${esc(next.coverNote)}</b></div>` : '') +
    (next.dressCode ? `<div class="precio"><small>Dress code</small><b>${esc(next.dressCode)}</b></div>` : '');
  $('#s-meta').innerHTML = `<span>${label(next)} · abrimos ${esc(site.hours.openLabel)}</span>${next.headliners.length && next.tagline ? `<span>${esc(next.tagline)}</span>` : ''}<span>+${site.minAge} con identificación</span><span>${esc(site.phone.label)}</span>`;
  $('#s-cta-txt').textContent = ctaLabel(next);
  wireCta($('#s-cta'), next);

  const cd = $('#cd');
  cd.hidden = false;
  const p = (n) => String(n).padStart(2, '0');
  const tick = () => {
    const s = Math.floor(Math.max(0, start - Date.now()) / 1000);
    $('#cd-d').textContent = p(Math.floor(s / 86400));
    $('#cd-h').textContent = p(Math.floor((s % 86400) / 3600));
    $('#cd-m').textContent = p(Math.floor((s % 3600) / 60));
    $('#cd-s').textContent = p(s % 60);
  };
  tick();
  timer = setInterval(tick, 1000);
}

/** Cartelera: próximos primero, luego los que se vivieron. */
export function renderRail(box, { future, past, next }, state = future.length + past.length ? 'ready' : 'empty') {
  setState(box, state);
  if (state !== 'ready') {
    box.innerHTML = `<p class="vacio">${state === 'error' ? 'No pudimos cargar la cartelera.' : 'La cartelera se está armando.'} Mientras, checa <a href="${site.instagram.url}" target="_blank" rel="noopener">${site.instagram.handle}</a>.</p>`;
    return;
  }
  box.innerHTML = [...future, ...past].map((e) => {
    const isPast = past.includes(e), isNext = e === next;
    return `<article class="fc reveal ${isPast ? 'pasado' : ''}${isNext ? ' prox' : ''}">
      <div class="ph"><span class="sello">${isPast ? 'Se vivió' : isNext ? 'Próximo' : 'Muy pronto'}</span><img src="${esc(safeUrl(e.image))}" alt="${esc(e.imageAlt || e.title)}" loading="lazy"></div>
      <div class="b"><div class="d">${label(e)}</div><h3>${esc(e.title)}</h3><div class="l">${[e.tagline, ...e.headliners].filter(Boolean).map(esc).join(' · ')}</div>
      ${!isPast && e.coverNote && !hasPresale(e) ? `<span class="cover">${esc(e.coverNote)}</span>` : ''}
      ${isPast ? '' : `<a class="a" data-event="${esc(e.id)}">${hasPresale(e) ? `Preventa $${e.presalePrice}` : 'Apartar mesa'} →</a>`}</div>
    </article>`;
  }).join('');
  box.querySelectorAll('a[data-event]').forEach((a) => wireCta(a, future.find((e) => e.id === a.dataset.event)));
}

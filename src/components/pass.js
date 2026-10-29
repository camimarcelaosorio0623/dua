import { $ } from '../lib/dom.js';
import { pueblaDate, ymdOf, DAYS, DAYS_SHORT, MONTHS_SHORT } from '../lib/time.js';
import { reservationForm } from '../lib/reservation.js';
import { site } from '../config/site.js';
import { eventDate } from './shows.js';

/** Próximas 6 noches abiertas (si el horario no está cargado, los próximos 6 días). */
function nextNights() {
  const days = site.hours.openDays;
  const out = [];
  let d = pueblaDate();
  d.setUTCHours(12, 0, 0, 0);
  while (out.length < 6) {
    if (!days.length || days.includes(d.getUTCDay())) out.push(new Date(d));
    d = new Date(d.getTime() + 864e5);
  }
  return out;
}

/** Código de barras decorativo del pase (no es un ID de reserva). */
function barcode(s) {
  let h = 2166136261;
  for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  const r = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return (h >>> 0) / 4294967296; };
  let x = 0, o = '';
  while (x < 236) { const w = 1 + Math.floor(r() * 3); o += `<rect x="${x}" y="0" width="${w}" height="46"/>`; x += w + 1 + Math.floor(r() * 3); }
  return o;
}

/**
 * «Tu pase»: qué (preventa del próximo show / mesa / cumpleaños) + noche + personas.
 * @param {import('../services/types.js').EventItem|null} next
 */
export function initPass(next) {
  const form = $('#form');
  const noches = nextNights();
  const PPL = site.reservation.partySizes;
  const P = { ev: next ? 'show' : 'mesa', dia: 0, ppl: site.reservation.defaultPartySize };
  const EV = [];
  if (next) EV.push(['show', 'Preventa show', next.title]);
  EV.push(['mesa', 'Apartar mesa', 'Para mi grupo'], ['cumple', 'Cumpleaños', 'Festejo 🎂']);

  const opts = (el, items, key, fmt) => {
    el.innerHTML = '';
    items.forEach((it, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.innerHTML = fmt(it);
      b.onclick = () => { P[key] = key === 'dia' ? i : Array.isArray(it) ? it[0] : it; paint(); };
      el.appendChild(b);
    });
  };
  opts($('#o-ev'), EV, 'ev', (e) => `<small>${e[2]}</small><b>${e[1]}</b>`);
  opts($('#o-dia'), noches, 'dia', (n) => `<small>${DAYS_SHORT[n.getUTCDay()]}</small><b>${n.getUTCDate()} ${MONTHS_SHORT[n.getUTCMonth()]}</b>`);
  opts($('#o-ppl'), PPL, 'ppl', (p) => `<b>${p}</b>`);

  const pplLabel = () => (P.ppl === '10+' ? '10 o más' : P.ppl);
  function paint() {
    // si eligió el show, la noche es la del show
    if (P.ev === 'show' && next) {
      const pd = eventDate(next);
      const i = noches.findIndex((n) => ymdOf(n) === ymdOf(pd));
      if (i >= 0) P.dia = i;
    }
    [...$('#o-ev').children].forEach((b, i) => b.setAttribute('aria-pressed', EV[i][0] === P.ev));
    [...$('#o-dia').children].forEach((b, i) => b.setAttribute('aria-pressed', i === P.dia));
    [...$('#o-ppl').children].forEach((b, i) => b.setAttribute('aria-pressed', PPL[i] === P.ppl));
    const n = P.ev === 'show' && next ? eventDate(next) : noches[P.dia], e = EV.find((x) => x[0] === P.ev);
    $('#p-tit').textContent = P.ev === 'show' ? next.title : e[1];
    $('#p-sub').textContent = P.ev === 'show' ? (next.presalePrice != null ? `Preventa $${next.presalePrice}` : 'Preventa') : e[2];
    $('#p-dia').textContent = `${DAYS_SHORT[n.getUTCDay()]} ${n.getUTCDate()} ${MONTHS_SHORT[n.getUTCMonth()]}`;
    $('#p-ppl').textContent = pplLabel();
    const key = P.ev + P.dia + P.ppl;
    $('#p-bc').innerHTML = barcode(key);
    $('#p-code').textContent = 'DUA-' + String(1000 + (Math.abs([...key].reduce((a, c) => a * 31 + c.charCodeAt(0), 7)) % 9000));
  }
  paint();

  const sender = reservationForm(form);
  form.onsubmit = (ev) => {
    ev.preventDefault();
    const n = P.ev === 'show' && next ? eventDate(next) : noches[P.dia];
    const cuantos = pplLabel();
    const dia = `${DAYS[n.getUTCDay()]} ${n.getUTCDate()} de ${MONTHS_SHORT[n.getUTCMonth()]}`;
    const message = P.ev === 'show'
      ? `Hola DUA 💖 Quiero apartar preventa para ${next.title} (${dia}) para ${cuantos} personas. ¿Cómo la aparto?`
      : P.ev === 'cumple'
        ? `Hola DUA 🎂 Quiero festejar mi cumpleaños el ${dia}. Somos ${cuantos}. ¿Me apartan mesa?`
        : `Hola DUA 💖 Quiero apartar mesa para ${cuantos} personas el ${dia}. ¿Tienen lugar?`;
    /** @type {import('../services/types.js').ReservationRequest} */
    const payload = {
      type: P.ev === 'show' ? 'presale' : P.ev === 'cumple' ? 'birthday' : 'table',
      eventId: P.ev === 'show' ? next.id : null,
      eventTitle: P.ev === 'show' ? next.title : null,
      date: ymdOf(n),
      partySize: P.ppl === '10+' ? 10 : P.ppl,
      partySizeOrMore: P.ppl === '10+',
    };
    sender.send(payload, message);
  };
}

import { $ } from '../lib/dom.js';
import { nowInPuebla, DAYS, capitalize } from '../lib/time.js';
import { site } from '../config/site.js';

const h = site.hours;

/** Abierto según el horario de site.js (cierres de madrugada incluidos). */
export function isOpen(t = nowInPuebla()) {
  return (h.openDays.includes(t.dow) && t.hour >= h.open) || (h.openDays.includes((t.dow + 6) % 7) && t.hour < h.close);
}

/** Etiqueta «Abierto ahora / Hoy abrimos / Hoy descansamos» del hero. */
export function initStatus() {
  const el = $('#estado');
  const paint = () => {
    const t = nowInPuebla();
    let txt, cls = '';
    if (!h.openDays.length) txt = 'Horario por confirmar';
    else if (isOpen(t)) { txt = `Abierto ahora · hasta las ${h.closeLabel}`; cls = 'on'; }
    else if (h.openDays.includes(t.dow)) { txt = `Hoy abrimos a las ${h.openLabel}`; cls = 'soon'; }
    else {
      let k = 1;
      while (!h.openDays.includes((t.dow + k) % 7)) k++;
      txt = `Hoy descansamos · abrimos el ${DAYS[(t.dow + k) % 7]} a las ${h.openLabel}`;
    }
    el.innerHTML = `<span class="dot ${cls}"></span>${txt}`;
  };
  paint();
  setInterval(paint, 60000);
}

/** Tabla de horario con el día de hoy marcado. */
export function renderHours() {
  const dw = nowInPuebla().dow;
  $('#hrs').innerHTML = [1, 2, 3, 4, 5, 6, 0].map((k) =>
    `<li class="${k === dw ? 'hoy' : ''}"><span>${capitalize(DAYS[k])}</span><span>${h.openDays.includes(k) ? `${h.openLabel} – ${h.closeLabel}` : 'Cerrado'}</span></li>`).join('');
}

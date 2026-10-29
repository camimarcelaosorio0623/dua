import { $, reducedMotion } from '../lib/dom.js';
import { site } from '../config/site.js';

export function renderMarquees() {
  const h = site.marquee.map((x) => `<span>${x}</span>`).join('<b>✦</b>') + '<b>✦</b>';
  $('#mq1').innerHTML = h.repeat(6);
  $('#mq2').innerHTML = h.repeat(6);
}

/** Brillo holográmico del flyer y luz en el arco siguiendo el puntero. */
export function initHolo() {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches || reducedMotion()) return;
  const h = $('#holo');
  h.addEventListener('pointermove', (e) => {
    const r = h.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    h.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 14}deg) rotateX(${(0.5 - y) * 14}deg)`;
    h.style.setProperty('--gx', x * 100 + '%');
  });
  h.addEventListener('pointerleave', () => (h.style.transform = ''));
  const a = $('#arco .in');
  a.addEventListener('pointermove', (e) => {
    const r = a.getBoundingClientRect();
    a.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
    a.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
  });
}

/** Escarcha que titila en el hero. */
export function initSparkles() {
  if (reducedMotion()) return;
  const c = $('#escarcha');
  for (let i = 0; i < 34; i++) {
    const e = document.createElement('i');
    if (i % 4 === 0) e.className = 'e';
    e.style.left = Math.random() * 100 + '%';
    e.style.top = Math.random() * 100 + '%';
    e.style.animationDuration = 2 + Math.random() * 4 + 's';
    e.style.animationDelay = -Math.random() * 5 + 's';
    c.appendChild(e);
  }
}

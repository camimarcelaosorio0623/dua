import { $, reducedMotion } from '../lib/dom.js';

/**
 * Video del arco del hero (recap real de DUA, sin audio). Se carga después de la página y
 * no se carga con «reducir movimiento» o «ahorro de datos»: ahí se queda la foto (poster).
 */
export function initHeroVideo() {
  const v = $('#hero-vid');
  if (!v || reducedMotion() || navigator.connection?.saveData) return;
  const start = () => {
    v.src = v.dataset.src;
    v.play().catch(() => {});
  };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

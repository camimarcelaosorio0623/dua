import './styles/main.css';
import { $, $$, bindSite } from './lib/dom.js';
import { initHeader, initReveal } from './lib/reveal.js';
import { waLink } from './lib/whatsapp.js';
import { isDemo } from './config/env.js';
import { site } from './config/site.js';
import { getEvents } from './services/index.js';
import { initStatus, renderHours } from './components/status.js';
import { splitEvents, renderNextShow, renderRail } from './components/shows.js';
import { initPass } from './components/pass.js';
import { renderFaq } from './components/faq.js';
import { initLocation, injectJsonLd } from './components/location.js';
import { renderMarquees, initHolo, initSparkles } from './components/effects.js';

const STAGGER = '.rail,.pilares';
const FALLBACK_IMG = '/img/hero.jpg';

document.getElementById('demo-flag').hidden = !isDemo;
bindSite(site);
injectJsonLd();
initStatus();
renderHours();
renderMarquees();
renderFaq();
initLocation();
initHolo();
initSparkles();
initHeader();
initReveal(STAGGER);

$$('#wa, #f-wa').forEach((a) => {
  a.href = waLink('Hola DUA 💖 Tengo una pregunta');
  a.target = '_blank';
  a.rel = 'noopener';
});

const rail = $('#rail');
getEvents()
  .then((events) => {
    const split = splitEvents(events);
    renderNextShow(split.next, split.past[0]?.image || FALLBACK_IMG);
    renderRail(rail, split);
    initPass(split.next);
  })
  .catch(() => {
    renderNextShow(null, FALLBACK_IMG);
    renderRail(rail, { future: [], past: [], next: null }, 'error');
    initPass(null);
  })
  .finally(() => initReveal(STAGGER));

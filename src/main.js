import './styles/main.css';
import { $, $$, bindSite } from './lib/dom.js';
import { initHeader, initReveal } from './lib/reveal.js';
import { waLink } from './lib/whatsapp.js';
import { isDemo } from './config/env.js';
import { site } from './config/site.js';
import { getEvents, getPromotions } from './services/index.js';
import { initStatus, renderHours } from './components/status.js';
import { splitEvents, renderNextShow, renderRail } from './components/shows.js';
import { initPass } from './components/pass.js';
import { renderPromos } from './components/promos.js';
import { initHeroVideo } from './components/hero.js';
import { renderFaq } from './components/faq.js';
import { initLocation, injectJsonLd } from './components/location.js';
import { renderMarquees, initHolo, initSparkles } from './components/effects.js';

const STAGGER = '.rail,.pilares,.promos';
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
initHeroVideo();
initReveal(STAGGER);

$$('#wa, #f-wa').forEach((a) => {
  a.href = waLink('Hola DUA 💖 Tengo una pregunta');
  a.target = '_blank';
  a.rel = 'noopener';
});

const rail = $('#rail');
const promoBox = $('#promos');
Promise.allSettled([getEvents(), getPromotions()]).then(([ev, pr]) => {
  const promos = pr.status === 'fulfilled' ? pr.value : [];
  renderPromos(promoBox, promos, pr.status === 'fulfilled' ? undefined : 'error');

  let next = null;
  if (ev.status === 'fulfilled') {
    const split = splitEvents(ev.value);
    next = split.next;
    renderNextShow(next, split.past[0]?.image || FALLBACK_IMG);
    renderRail(rail, split);
  } else {
    renderNextShow(null, FALLBACK_IMG);
    renderRail(rail, { future: [], past: [], next: null }, 'error');
  }
  initPass(next, promos);
  initReveal(STAGGER);
});

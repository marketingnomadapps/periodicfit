/**
 * Cookie consent + Google Consent Mode v2.
 * Nothing non-essential loads until the visitor agrees. Choice is stored in localStorage
 * (wrapped in try/catch). GA4 / AdSense scripts are injected only after consent.
 */
type Consent = { analytics: boolean; ads: boolean; at: string };
const KEY = 'pf-consent-v1';

declare global { interface Window { dataLayer: unknown[]; gtag: (...args: unknown[]) => void; adsbygoogle?: unknown[] } }

const read = (): Consent | null => { try { const v = localStorage.getItem(KEY); return v ? JSON.parse(v) : null; } catch { return null; } };
const write = (c: Consent) => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* storage blocked: choice lasts this page view */ } };

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
}

let gaLoaded = false, adsLoaded = false;
function apply(c: Consent, cfg: { ga4: string; adsClient: string; adsEnabled: boolean }) {
  ensureGtag();
  window.gtag('consent', 'update', {
    analytics_storage: c.analytics ? 'granted' : 'denied',
    ad_storage: c.ads ? 'granted' : 'denied',
    ad_user_data: c.ads ? 'granted' : 'denied',
    ad_personalization: c.ads ? 'granted' : 'denied',
  });
  if (c.analytics && cfg.ga4 && !gaLoaded) {
    gaLoaded = true;
    const s = document.createElement('script');
    s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cfg.ga4)}`;
    document.head.appendChild(s);
    window.gtag('js', new Date());
    window.gtag('config', cfg.ga4, { anonymize_ip: true });
  }
  if (c.ads && cfg.adsEnabled && cfg.adsClient && !adsLoaded) {
    adsLoaded = true;
    const s = document.createElement('script');
    s.async = true; s.crossOrigin = 'anonymous';
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(cfg.adsClient)}`;
    document.head.appendChild(s);
    document.querySelectorAll('ins.adsbygoogle').forEach(() => (window.adsbygoogle = window.adsbygoogle || []).push({}));
  }
}

export function initConsent() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  const cfg = { ga4: banner.dataset.ga4 ?? '', adsClient: banner.dataset.adsClient ?? '', adsEnabled: banner.dataset.adsEnabled === 'true' };
  ensureGtag();
  window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });

  const panel = banner.querySelector<HTMLElement>('[data-cb-custom]')!;
  const toggles = { analytics: banner.querySelector<HTMLInputElement>('[name="cb-analytics"]')!, ads: banner.querySelector<HTMLInputElement>('[name="cb-ads"]')! };
  const show = () => {
    const c = read();
    toggles.analytics.checked = c?.analytics ?? false;
    toggles.ads.checked = c?.ads ?? false;
    banner.hidden = false;
    requestAnimationFrame(() => banner.classList.add('is-open'));
  };
  const hide = () => { banner.classList.remove('is-open'); setTimeout(() => (banner.hidden = true), 300); };
  const save = (analytics: boolean, ads: boolean) => { const c = { analytics, ads, at: new Date().toISOString() }; write(c); apply(c, cfg); hide(); };

  banner.querySelector('[data-cb-accept]')?.addEventListener('click', () => save(true, true));
  banner.querySelector('[data-cb-reject]')?.addEventListener('click', () => save(false, false));
  banner.querySelector('[data-cb-customize]')?.addEventListener('click', () => { panel.hidden = !panel.hidden; });
  banner.querySelector('[data-cb-save]')?.addEventListener('click', () => save(toggles.analytics.checked, toggles.ads.checked));
  document.addEventListener('click', (e) => { if ((e.target as HTMLElement).closest('[data-cookie-settings]')) { e.preventDefault(); panel.hidden = false; show(); } });

  const existing = read();
  if (existing) apply(existing, cfg); else show();
}

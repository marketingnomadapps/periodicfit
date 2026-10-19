/**
 * Inquiry forms (Web3Forms) + the sitewide inquiry modal.
 */
import { stopScroll, startScroll } from './lenis';

const SUCCESS = 'Thanks! Our coach will contact you within 24 hours.';
const ENDPOINT = 'https://api.web3forms.com/submit';

/* ───────── Forms ───────── */
function fillContext(form: HTMLFormElement) {
  const params = new URLSearchParams(location.search);
  const set = (name: string, v: string) => { const el = form.elements.namedItem(name) as HTMLInputElement | null; if (el) el.value = v; };
  set('page_url', location.href);
  set('utm_source', params.get('utm_source') ?? '');
  set('utm_medium', params.get('utm_medium') ?? '');
  set('utm_campaign', params.get('utm_campaign') ?? '');
}

function validate(form: HTMLFormElement): boolean {
  let firstBad: HTMLElement | null = null;
  form.querySelectorAll<HTMLInputElement>('input[required], select[required], textarea[required]').forEach((el) => {
    const ok = el.type === 'checkbox' ? el.checked : el.checkValidity() && el.value.trim() !== '';
    el.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (!ok && !firstBad) firstBad = el;
  });
  if (firstBad) (firstBad as HTMLElement).focus();
  return !firstBad;
}

function setStatus(form: HTMLFormElement, state: 'success' | 'error' | 'hidden', msg = '') {
  const el = form.querySelector<HTMLElement>('.iq-status')!;
  el.classList.toggle('hidden', state === 'hidden');
  el.dataset.state = state;
  el.textContent = msg;
}

function setLoading(form: HTMLFormElement, on: boolean) {
  const btn = form.querySelector<HTMLButtonElement>('.iq-submit')!;
  btn.disabled = on;
  btn.querySelector('.iq-label')!.classList.toggle('hidden', on);
  btn.querySelector('.iq-loading')!.classList.toggle('hidden', !on);
  btn.querySelector('.iq-loading')!.classList.toggle('inline-flex', on);
}

let turnstileLoaded = false;
function loadTurnstile() {
  if (turnstileLoaded) return;
  turnstileLoaded = true;
  const s = document.createElement('script');
  s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  s.async = true; s.defer = true;
  document.head.appendChild(s);
}

async function submit(form: HTMLFormElement, e: SubmitEvent) {
  e.preventDefault();
  setStatus(form, 'hidden');
  if ((form.elements.namedItem('botcheck') as HTMLInputElement)?.checked) return; // bot
  if (!validate(form)) { setStatus(form, 'error', 'Please fill the highlighted fields.'); return; }

  const key = form.dataset.key;
  if (!key) {
    // TODO: add PUBLIC_WEB3FORMS_KEY to .env / Cloudflare Pages to receive leads.
    setStatus(form, 'error', 'The form is in demo mode: the Web3Forms key has not been added yet.');
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
  if (form.dataset.turnstile && !data['cf-turnstile-response']) { setStatus(form, 'error', 'Please complete the security check.'); return; }

  setLoading(form, true);
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: key, subject: `New PeriodicFit inquiry: ${data.service || 'general'}`, from_name: 'PeriodicFit website', ...data }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false) throw new Error(json.message || 'Request failed');
    form.reset();
    fillContext(form);
    setStatus(form, 'success', SUCCESS);
    form.dispatchEvent(new CustomEvent('inquiry:sent', { bubbles: true }));
  } catch {
    setStatus(form, 'error', 'Something went wrong. Please try again or message us on WhatsApp.');
  } finally {
    setLoading(form, false);
  }
}

export function initInquiryForms() {
  document.querySelectorAll<HTMLFormElement>('[data-inquiry-form]:not([data-ready])').forEach((form) => {
    form.dataset.ready = '';
    fillContext(form);
    if (form.dataset.turnstile) loadTurnstile();
    form.addEventListener('submit', (e) => submit(form, e as SubmitEvent));
    form.addEventListener('input', (e) => (e.target as HTMLElement).setAttribute('aria-invalid', 'false'));
  });
}

/* ───────── Modal ───────── */
const SESSION_KEY = 'pf-inquiry-auto-shown';
const safeGet = (k: string) => { try { return sessionStorage.getItem(k); } catch { return null; } };
const safeSet = (k: string, v: string) => { try { sessionStorage.setItem(k, v); } catch { /* storage blocked */ } };

export function initInquiryModal() {
  const modal = document.getElementById('inquiry-modal');
  if (!modal || modal.dataset.ready !== undefined) return;
  modal.dataset.ready = '';
  const panel = modal.querySelector<HTMLElement>('.iq-panel')!;
  const form = modal.querySelector<HTMLFormElement>('[data-inquiry-form]')!;
  let lastFocus: HTMLElement | null = null;

  const focusables = () => Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([type=hidden]):not(.hidden), select, textarea')).filter((el) => el.offsetParent !== null);

  const open = (service?: string) => {
    if (!modal.hidden) return;
    lastFocus = document.activeElement as HTMLElement;
    if (service) { const sel = form.elements.namedItem('service') as HTMLSelectElement; sel.value = service; (form.elements.namedItem('service_slug') as HTMLInputElement).value = service; }
    modal.hidden = false;
    stopScroll();
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      (form.querySelector('input[name=name]') as HTMLInputElement)?.focus({ preventScroll: true });
    });
    safeSet(SESSION_KEY, '1');
  };
  const close = () => {
    if (modal.hidden) return;
    modal.classList.remove('is-open');
    startScroll();
    setTimeout(() => { modal.hidden = true; lastFocus?.focus(); }, 300);
  };

  document.addEventListener('click', (e) => {
    const trigger = (e.target as HTMLElement).closest<HTMLElement>('[data-open-inquiry]');
    if (trigger) { e.preventDefault(); open(trigger.dataset.service || document.body.dataset.service); }
  });
  modal.querySelectorAll('[data-close-inquiry]').forEach((b) => b.addEventListener('click', close));
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    if (e.key === 'Tab') {
      const els = focusables(); if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  form.addEventListener('inquiry:sent', () => setTimeout(close, 2600));

  // Auto-open: only on pages that opt in (service pages), once per session.
  const auto = document.body.dataset.autoInquiry;
  if (auto && !safeGet(SESSION_KEY)) {
    const delay = Number(auto) || 25000;
    let fired = false;
    const fire = () => { if (fired || safeGet(SESSION_KEY)) return; fired = true; cleanup(); open(document.body.dataset.service); };
    const onScroll = () => { const h = document.documentElement.scrollHeight - innerHeight; if (h > 0 && scrollY / h >= 0.5) fire(); };
    const onLeave = (e: MouseEvent) => { if (e.clientY <= 0 && !e.relatedTarget) fire(); };
    const timer = window.setTimeout(fire, delay);
    const cleanup = () => { clearTimeout(timer); removeEventListener('scroll', onScroll); document.removeEventListener('mouseout', onLeave); };
    addEventListener('scroll', onScroll, { passive: true });
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) document.addEventListener('mouseout', onLeave);
  }
}

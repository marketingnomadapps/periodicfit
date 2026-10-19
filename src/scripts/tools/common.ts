/** Shared helpers for every tool: form state, URL sync, units, formatting and the result event. */

export type Sex = 'male' | 'female';

export const num = (form: HTMLFormElement, name: string): number => {
  const el = form.elements.namedItem(name) as HTMLInputElement | RadioNodeList | null;
  if (!el) return NaN;
  const v = (el as HTMLInputElement).value ?? '';
  return v === '' ? NaN : Number(v);
};
export const str = (form: HTMLFormElement, name: string): string => {
  const el = form.elements.namedItem(name) as HTMLInputElement | RadioNodeList | null;
  return el ? String((el as HTMLInputElement).value ?? '') : '';
};

export const KG_PER_LB = 0.45359237;
export const CM_PER_IN = 2.54;
export const round = (n: number, d = 0) => { const f = 10 ** d; return Math.round(n * f) / f; };
export const fmt = (n: number, d = 0) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
export const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));

/** Reads height in cm and weight in kg whatever unit system the form is in. */
export function bodyMetrics(form: HTMLFormElement): { cm: number; kg: number; unit: 'metric' | 'imperial' } {
  const unit = (str(form, 'unit') || 'metric') as 'metric' | 'imperial';
  if (unit === 'imperial') {
    const cm = (num(form, 'ft') * 12 + (num(form, 'in') || 0)) * CM_PER_IN;
    return { cm, kg: num(form, 'lb') * KG_PER_LB, unit };
  }
  return { cm: num(form, 'cm'), kg: num(form, 'kg'), unit };
}

/** Show/hide [data-unit] blocks to match the selected unit radio. */
export function syncUnits(form: HTMLFormElement) {
  const unit = str(form, 'unit') || 'metric';
  form.querySelectorAll<HTMLElement>('[data-unit]').forEach((el) => {
    const on = el.dataset.unit === unit;
    el.hidden = !on;
    el.querySelectorAll<HTMLInputElement>('input,select').forEach((i) => (i.disabled = !on));
  });
}

/** Mifflin-St Jeor BMR (kcal/day). */
export function bmr(sex: Sex, kg: number, cm: number, age: number) {
  return 10 * kg + 6.25 * cm - 5 * age + (sex === 'male' ? 5 : -161);
}
export const ACTIVITY: Record<string, { f: number; label: string }> = {
  sedentary: { f: 1.2, label: 'Sedentary (desk job, little exercise)' },
  light: { f: 1.375, label: 'Light (exercise 1–3 days/week)' },
  moderate: { f: 1.55, label: 'Moderate (exercise 3–5 days/week)' },
  active: { f: 1.725, label: 'Very active (hard exercise 6–7 days/week)' },
  athlete: { f: 1.9, label: 'Athlete (physical job + training)' },
};

/* ───────── URL state: shareable links reproduce the same result ───────── */
export function restoreFromUrl(form: HTMLFormElement) {
  const p = new URLSearchParams(location.search);
  if (![...p.keys()].length) return false;
  let touched = false;
  // Hardening: only short, plain values are accepted from shared links (no markup, no scripts)
  const SAFE = /^[\w.\-]{1,24}$/;
  p.forEach((v, k) => {
    if (!SAFE.test(k) || !SAFE.test(v)) return;
    const el = form.elements.namedItem(k);
    if (!el) return;
    if (el instanceof RadioNodeList) {
      (Array.from(el) as HTMLInputElement[]).forEach((r) => { if (r.value === v) { r.checked = true; touched = true; } });
    } else if (el instanceof HTMLInputElement && el.type === 'checkbox') {
      el.checked = v === '1'; touched = true;
    } else if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement) {
      el.value = v; touched = true;
    }
  });
  return touched;
}
export function shareUrl(form: HTMLFormElement, extra: Record<string, string> = {}) {
  const p = new URLSearchParams();
  Array.from(form.elements).forEach((el) => {
    const i = el as HTMLInputElement;
    if (!i.name || i.disabled || i.type === 'hidden' || i.type === 'submit' || i.type === 'button') return;
    if ((i.type === 'radio') && !i.checked) return;
    if (i.type === 'checkbox') { p.set(i.name, i.checked ? '1' : '0'); return; }
    if (i.value !== '') p.set(i.name, i.value);
  });
  Object.entries(extra).forEach(([k, v]) => p.set(k, v));
  return `${location.origin}${location.pathname}?${p.toString()}`;
}

/* ───────── Result event → share card ───────── */
export interface CardData {
  tool: string;           // e.g. "Calorie Calculator"
  kicker: string;         // small line above the hero number
  hero: string;           // the big number / headline
  heroUnit?: string;      // e.g. "kcal / day"
  sub?: string;           // one line under it
  stats?: { label: string; value: string }[];
  list?: string[];        // optional bullet lines (plans, splits)
  shareText: string;      // text for social posts
  url: string;            // link that reproduces the result
}
export function emitResult(form: HTMLFormElement, data: CardData) {
  const root = form.closest<HTMLElement & { __lastResult?: CardData }>('[data-tool]');
  if (!root) return;
  root.__lastResult = data; // picked up by initShare if it initialises later
  root.dispatchEvent(new CustomEvent('tool:result', { detail: data, bubbles: true }));
}

/** Wire a tool form: units + live recompute + URL restore. */
export function wireTool(form: HTMLFormElement, compute: () => void) {
  form.addEventListener('submit', (e) => { e.preventDefault(); compute(); });
  form.addEventListener('input', () => { syncUnits(form); compute(); });
  form.addEventListener('change', () => { syncUnits(form); compute(); });
  restoreFromUrl(form);
  syncUnits(form);
  compute();
}

/** Animate a number inside an element (cheap rAF tween). */
export function countTo(el: HTMLElement | null, to: number, decimals = 0, ms = 600) {
  if (!el) return;
  const from = Number(el.dataset.v ?? 0) || 0;
  el.dataset.v = String(to);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { el.textContent = fmt(to, decimals); return; }
  const t0 = performance.now();
  const step = (t: number) => {
    const k = Math.min(1, (t - t0) / ms);
    const e = 1 - Math.pow(1 - k, 3);
    el.textContent = fmt(from + (to - from) * e, decimals);
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

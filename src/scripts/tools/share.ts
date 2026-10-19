/**
 * Branded share cards: draws the result on a canvas (1080×1350, Instagram portrait) and
 * offers download, native share (with the image on mobile), copy link and social links.
 */
import type { CardData } from './common';

const W = 1080, H = 1350;
const C = { bg: '#0E0F12', surface: '#17191E', line: '#2A2E36', lime: '#C6FF3D', orange: '#FF6B2C', ink: '#F4F5F7', muted: '#9AA0AA' };
const DISPLAY = '"Space Grotesk Variable", "Space Grotesk", system-ui, sans-serif';
const SANS = '"Inter Variable", "Inter", system-ui, sans-serif';

function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const t = line ? `${line} ${w}` : w;
    if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fitFont(ctx: CanvasRenderingContext2D, text: string, weight: number, max: number, min: number, maxW: number, family = DISPLAY) {
  let size = max;
  do { ctx.font = `${weight} ${size}px ${family}`; size -= 4; } while (ctx.measureText(text).width > maxW && size > min);
  return size + 4;
}

export async function drawCard(d: CardData): Promise<HTMLCanvasElement> {
  try { await document.fonts.ready; } catch { /* ignore */ }
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d')!;
  const P = 80;

  // Background + glow
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
  const g = ctx.createRadialGradient(W * 0.85, H * 0.1, 0, W * 0.85, H * 0.1, 700);
  g.addColorStop(0, 'rgba(198,255,61,0.22)'); g.addColorStop(1, 'rgba(198,255,61,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

  // Brand: the "P" mark + uppercase wordmark
  const markH = 64, k = markH / 772;
  ctx.fillStyle = C.lime;
  const poly = (pts: number[][]) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(P + x * k, P + y * k) : ctx.moveTo(P + x * k, P + y * k))); ctx.closePath(); ctx.fill(); };
  poly([[0, 0], [412, 0], [590, 181], [590, 409], [417, 409], [417, 174], [0, 174]]);
  poly([[0, 409], [417, 409], [417, 583], [174, 583], [174, 772], [0, 599]]);
  ctx.font = `700 34px ${DISPLAY}`; ctx.textBaseline = 'middle';
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = '6px';
  ctx.fillStyle = C.ink; ctx.fillText('PERIODIC', P + 72, P + 33);
  const pw = ctx.measureText('PERIODIC').width;
  ctx.fillStyle = C.lime; ctx.fillText('FIT', P + 72 + pw, P + 33);
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = '0px';

  // Tool pill
  ctx.font = `600 26px ${SANS}`;
  const pill = d.tool.toUpperCase();
  const pillW = ctx.measureText(pill).width + 48;
  roundRect(ctx, W - P - pillW, P + 8, pillW, 50, 25); ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = C.muted; ctx.textAlign = 'center'; ctx.fillText(pill, W - P - pillW / 2, P + 34); ctx.textAlign = 'left';

  // ── Content blocks: measured first, then centred between header and footer ──
  type Block = { h: number; draw: (y: number) => void };
  const blocks: Block[] = [];
  const inner = W - P * 2;

  blocks.push({ h: 44, draw: (y) => { ctx.font = `600 34px ${SANS}`; ctx.fillStyle = C.lime; ctx.textBaseline = 'top'; ctx.fillText(d.kicker, P, y); } });
  blocks.push({ h: 28, draw: () => {} });

  const heroSize = fitFont(ctx, d.hero, 700, 220, 84, inner);
  blocks.push({ h: heroSize * 1.02, draw: (y) => { ctx.font = `700 ${heroSize}px ${DISPLAY}`; ctx.fillStyle = C.ink; ctx.textBaseline = 'top'; ctx.fillText(d.hero, P - 4, y - heroSize * 0.06); } });

  if (d.heroUnit) {
    ctx.font = `500 40px ${SANS}`;
    const lines = wrap(ctx, d.heroUnit, inner).slice(0, 2);
    blocks.push({ h: 24 + lines.length * 52, draw: (y) => { ctx.font = `500 40px ${SANS}`; ctx.fillStyle = C.muted; ctx.textBaseline = 'top'; lines.forEach((l, i) => ctx.fillText(l, P, y + 24 + i * 52)); } });
  }
  if (d.sub) {
    ctx.font = `500 36px ${SANS}`;
    const lines = wrap(ctx, d.sub, inner).slice(0, 2);
    blocks.push({ h: 20 + lines.length * 48, draw: (y) => { ctx.font = `500 36px ${SANS}`; ctx.fillStyle = C.ink; ctx.textBaseline = 'top'; lines.forEach((l, i) => ctx.fillText(l, P, y + 20 + i * 48)); } });
  }

  if (d.stats?.length) {
    const stats = d.stats.slice(0, 6);
    const cols = Math.min(3, stats.length), gap = 20, cw = (inner - gap * (cols - 1)) / cols, ch = 168;
    const rows = Math.ceil(stats.length / cols);
    blocks.push({ h: 56 + rows * ch + (rows - 1) * gap, draw: (y0) => {
      const y = y0 + 56;
      stats.forEach((st, i) => {
        const cx = P + (i % cols) * (cw + gap), cy = y + Math.floor(i / cols) * (ch + gap);
        roundRect(ctx, cx, cy, cw, ch, 28); ctx.fillStyle = C.surface; ctx.fill();
        ctx.textBaseline = 'top';
        ctx.font = `500 26px ${SANS}`; ctx.fillStyle = C.muted; ctx.fillText(st.label, cx + 28, cy + 30);
        const vs = fitFont(ctx, st.value, 700, 64, 28, cw - 56);
        ctx.font = `700 ${vs}px ${DISPLAY}`; ctx.fillStyle = C.ink; ctx.fillText(st.value, cx + 28, cy + 76);
      });
    } });
  }

  if (d.list?.length) {
    const items = d.list.slice(0, 7);
    const rh = 78, gap = 12;
    blocks.push({ h: 48 + items.length * rh + (items.length - 1) * gap, draw: (y0) => {
      items.forEach((item, i) => {
        const y = y0 + 48 + i * (rh + gap);
        roundRect(ctx, P, y, inner, rh, 22); ctx.fillStyle = C.surface; ctx.fill();
        ctx.fillStyle = C.lime; ctx.beginPath(); ctx.arc(P + 34, y + rh / 2, 8, 0, Math.PI * 2); ctx.fill();
        ctx.font = `500 32px ${SANS}`; ctx.fillStyle = C.ink; ctx.textBaseline = 'middle';
        let line = item;
        while (ctx.measureText(line).width > inner - 90 && line.length > 4) line = line.slice(0, -2);
        if (line !== item) line = line.trimEnd() + '…';
        ctx.fillText(line, P + 62, y + rh / 2 + 1);
      });
    } });
  }

  const top = 210, bottom = H - 190;
  const total = blocks.reduce((sum, bl) => sum + bl.h, 0);
  let y = Math.max(top, top + (bottom - top - total) / 2);
  for (const bl of blocks) { bl.draw(y); y += bl.h; }
  ctx.textBaseline = 'alphabetic';

  // Footer
  ctx.fillStyle = C.line; ctx.fillRect(P, H - 150, W - P * 2, 2);
  ctx.font = `600 32px ${SANS}`; ctx.fillStyle = C.ink;
  ctx.fillText('Try it free → periodicfit.com/tools', P, H - 88);
  ctx.font = `400 22px ${SANS}`; ctx.fillStyle = C.muted;
  ctx.fillText('Estimate for general guidance, not medical advice.', P, H - 50);
  return cv;
}

const toBlob = (cv: HTMLCanvasElement) => new Promise<Blob>((res) => cv.toBlob((b) => res(b!), 'image/png'));

export function initShare(root: HTMLElement) {
  const panel = root.querySelector<HTMLElement>('[data-share]');
  if (!panel) return;
  const preview = panel.querySelector<HTMLImageElement>('[data-share-preview]');
  const status = panel.querySelector<HTMLElement>('[data-share-status]');
  let current: CardData | null = null;
  let timer = 0;
  let canvas: HTMLCanvasElement | null = null;
  const fileName = () => `periodicfit-${(current?.tool ?? 'result').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
  const say = (m: string) => { if (status) { status.textContent = m; setTimeout(() => { if (status.textContent === m) status.textContent = ''; }, 2500); } };

  const onResult = (data: CardData) => {
    current = data;
    panel.querySelectorAll<HTMLElement>('[data-share-btn]').forEach((b) => b.removeAttribute('disabled'));
    clearTimeout(timer);
    timer = window.setTimeout(async () => {
      canvas = await drawCard(current!);
      if (preview) preview.src = canvas.toDataURL('image/png');
    }, 350);
  };
  root.addEventListener('tool:result', (e) => onResult((e as CustomEvent<CardData>).detail));
  const last = (root as HTMLElement & { __lastResult?: CardData }).__lastResult;
  if (last) onResult(last);

  const ensure = async () => (canvas ??= current ? await drawCard(current) : null);

  panel.addEventListener('click', async (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-share-btn]');
    if (!btn || !current) return;
    const action = btn.dataset.shareBtn;
    const text = `${current.shareText} ${current.url}`;
    if (action === 'download') {
      const cv = await ensure(); if (!cv) return;
      const a = document.createElement('a'); a.href = cv.toDataURL('image/png'); a.download = fileName(); a.click();
      say('Image downloaded. Post it to your story!');
    } else if (action === 'share') {
      const cv = await ensure();
      try {
        const file = cv ? new File([await toBlob(cv)], fileName(), { type: 'image/png' }) : null;
        if (file && navigator.canShare?.({ files: [file] })) await navigator.share({ files: [file], text, title: current.tool });
        else if (navigator.share) await navigator.share({ text: current.shareText, url: current.url, title: current.tool });
        else { await navigator.clipboard.writeText(text); say('Link copied.'); }
      } catch { /* user cancelled */ }
    } else if (action === 'copy') {
      try { await navigator.clipboard.writeText(current.url); say('Link copied.'); } catch { say(current.url); }
    } else {
      const u = encodeURIComponent(current.url), t = encodeURIComponent(current.shareText);
      const urls: Record<string, string> = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
        x: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      };
      if (urls[action!]) window.open(urls[action!], '_blank', 'noopener,width=640,height=640');
    }
  });
}

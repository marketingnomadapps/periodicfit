/**
 * Blog data layer. One function, two sources:
 *  - WordPress (headless) when WP_URL is set at build time → posts come from /wp-json/wp/v2
 *  - Local Markdown sample posts in src/content/blog otherwise (so the design can be previewed)
 * All HTML is sanitized at build time, headings get ids for the table of contents,
 * images are lazy-loaded and reading time is calculated.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import { BLOG, BLOG_CATEGORIES } from '../config/site';

export interface PostImage { src: string | ImageMetadata; alt: string; width?: number; height?: number }
export interface PostAuthor { name: string; bio?: string; credentials?: string; avatar?: string }
export interface TocItem { id: string; text: string; level: 2 | 3 }
export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  html: string;
  toc: TocItem[];
  date: Date;
  updated: Date;
  category: { name: string; slug: string };
  categories: { name: string; slug: string }[];
  tags: string[];
  image?: PostImage;
  author: PostAuthor;
  reviewer?: string;
  seoTitle: string;
  seoDescription: string;
  readingTime: number;
  featured: boolean;
  source: 'wordpress' | 'local';
}

/* ───────── HTML processing ───────── */
const decode = (s: string) => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
  .replace(/&hellip;/g, '…').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—').replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘').replace(/&rdquo;/g, '”').replace(/&ldquo;/g, '“');
const stripTags = (s: string) => decode(s.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
export const slugify = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);

const SANITIZE: sanitizeHtml.IOptions = {
  allowedTags: ['h2', 'h3', 'h4', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'u', 's', 'blockquote', 'code', 'pre', 'br', 'hr',
    'img', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption', 'sup', 'sub', 'span', 'div', 'iframe', 'mark', 'small'],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'srcset', 'sizes', 'alt', 'width', 'height', 'title', 'loading', 'decoding'],
    iframe: ['src', 'title', 'width', 'height', 'allow', 'allowfullscreen', 'loading'],
    th: ['colspan', 'rowspan', 'scope'], td: ['colspan', 'rowspan'],
    '*': ['id'],
  },
  allowedSchemes: ['https', 'mailto', 'tel'],
  allowedSchemesAppliedToAttributes: ['href', 'src'],
  // Only YouTube (privacy mode) embeds are allowed
  allowedIframeHostnames: ['www.youtube-nocookie.com', 'www.youtube.com'],
  transformTags: {
    a: (tag, attribs) => {
      const external = /^https?:\/\//.test(attribs.href ?? '') && !(attribs.href ?? '').includes('periodicfit.com');
      return { tagName: 'a', attribs: external ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' } : attribs };
    },
    img: (tag, attribs) => ({ tagName: 'img', attribs: { ...attribs, loading: 'lazy', decoding: 'async' } }),
    iframe: (tag, attribs) => ({ tagName: 'iframe', attribs: { ...attribs, src: (attribs.src ?? '').replace('www.youtube.com/embed', 'www.youtube-nocookie.com/embed'), loading: 'lazy' } }),
    h1: 'h2', // only one H1 per page (the post title)
  },
};

function processHtml(raw: string): { html: string; toc: TocItem[]; words: number } {
  let html = sanitizeHtml(raw, SANITIZE);
  const toc: TocItem[] = [];
  const used = new Set<string>();
  html = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g, (_m, lvl: string, attrs: string, inner: string) => {
    const text = stripTags(inner);
    let id = (/id="([^"]+)"/.exec(attrs)?.[1]) ?? slugify(text);
    let n = 2; while (used.has(id)) id = `${slugify(text)}-${n++}`;
    used.add(id);
    toc.push({ id, text, level: Number(lvl) as 2 | 3 });
    return `<h${lvl} id="${id}">${inner}</h${lvl}>`;
  });
  html = html.replace(/<table/g, '<div class="table-wrap"><table').replace(/<\/table>/g, '</table></div>');
  const words = stripTags(html).split(' ').filter(Boolean).length;
  return { html, toc, words };
}

const categoryBySlug = (slug: string) => BLOG_CATEGORIES.find((c) => c.slug === slug);

/* ───────── WordPress source ───────── */
interface WpTerm { id: number; name: string; slug: string; taxonomy: string }
async function wpFetch<T>(path: string): Promise<{ data: T; totalPages: number }> {
  const res = await fetch(`${BLOG.wpUrl}/wp-json/wp/v2/${path}`, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`WordPress request failed (${res.status}) for ${path}`);
  return { data: (await res.json()) as T, totalPages: Number(res.headers.get('x-wp-totalpages') ?? 1) };
}

async function fromWordPress(): Promise<Post[]> {
  const raw: any[] = [];
  let page = 1, total = 1;
  do {
    const { data, totalPages } = await wpFetch<any[]>(`posts?status=publish&per_page=100&page=${page}&_embed=1`);
    raw.push(...data); total = totalPages; page++;
  } while (page <= total);

  return raw.map((p) => {
    const terms: WpTerm[] = (p._embedded?.['wp:term'] ?? []).flat();
    const cats = terms.filter((t) => t.taxonomy === 'category' && t.slug !== 'uncategorized').map((t) => ({ name: decode(t.name), slug: t.slug }));
    const tags = terms.filter((t) => t.taxonomy === 'post_tag').map((t) => decode(t.name));
    const media = p._embedded?.['wp:featuredmedia']?.[0];
    const { html, toc, words } = processHtml(p.content?.rendered ?? '');
    const excerpt = stripTags(p.excerpt?.rendered ?? '').replace(/\s*\[…\]$/, '…');
    const title = decode(p.title?.rendered ?? '');
    // pf_* fields come from the periodicfit-headless mu-plugin (see /wordpress)
    const a = p.pf_author ?? {};
    return {
      slug: p.slug,
      title,
      excerpt,
      html, toc,
      date: new Date(p.date_gmt ? p.date_gmt + 'Z' : p.date),
      updated: new Date(p.modified_gmt ? p.modified_gmt + 'Z' : p.modified),
      category: cats[0] ?? { name: 'Lifestyle & Recovery', slug: 'lifestyle-recovery' },
      categories: cats,
      tags,
      image: media?.source_url ? { src: media.source_url, alt: media.alt_text || title, width: media.media_details?.width, height: media.media_details?.height } : undefined,
      author: { name: a.name || p._embedded?.author?.[0]?.name || 'PeriodicFit Team', bio: a.bio, credentials: a.credentials, avatar: a.avatar },
      reviewer: p.pf_reviewer || undefined,
      seoTitle: p.pf_seo?.title || title,
      seoDescription: p.pf_seo?.description || excerpt.slice(0, 158),
      readingTime: Math.max(1, Math.round(words / 220)),
      featured: Boolean(p.sticky),
      source: 'wordpress' as const,
    };
  });
}

/* ───────── Local fallback (src/content/blog) ───────── */
async function fromLocal(): Promise<Post[]> {
  const entries: CollectionEntry<'blog'>[] = await getCollection('blog', ({ data }) => !data.draft);
  return entries.map((e) => {
    const d = e.data;
    const { html, toc, words } = processHtml(e.rendered?.html ?? '');
    const cat = categoryBySlug(d.category) ?? { name: d.category, slug: d.category };
    return {
      slug: e.id, title: d.title, excerpt: d.description, html, toc,
      date: d.pubDate, updated: d.updatedDate ?? d.pubDate,
      category: { name: cat.name, slug: cat.slug }, categories: [{ name: cat.name, slug: cat.slug }], tags: d.tags,
      image: d.heroImage ? { src: d.heroImage, alt: d.heroAlt ?? d.title } : undefined,
      author: { name: d.author, bio: d.authorBio, credentials: d.authorCredentials },
      reviewer: d.reviewer, seoTitle: d.title, seoDescription: d.description,
      readingTime: Math.max(1, Math.round(words / 220)), featured: d.featured, source: 'local' as const,
    };
  });
}

let cache: Promise<Post[]> | null = null;
/** All published posts, newest first. Cached for the whole build. */
export function getPosts(): Promise<Post[]> {
  cache ??= (BLOG.wpUrl ? fromWordPress() : fromLocal()).then((list) => list.sort((a, b) => b.date.getTime() - a.date.getTime()));
  return cache;
}

/** Categories that should get a page: the configured ones plus any extra WordPress categories with posts. */
export async function getCategories() {
  const posts = await getPosts();
  const map = new Map<string, { name: string; slug: string; count: number }>();
  BLOG_CATEGORIES.forEach((c) => map.set(c.slug, { name: c.name, slug: c.slug, count: 0 }));
  posts.forEach((p) => p.categories.forEach((c) => { const m = map.get(c.slug) ?? { ...c, count: 0 }; m.count++; map.set(c.slug, m); }));
  return [...map.values()];
}

export async function getRelated(post: Post, n = 3) {
  const posts = (await getPosts()).filter((p) => p.slug !== post.slug);
  const score = (p: Post) => (p.category.slug === post.category.slug ? 3 : 0) + p.tags.filter((t) => post.tags.includes(t)).length;
  return posts.sort((a, b) => score(b) - score(a) || b.date.getTime() - a.date.getTime()).slice(0, n);
}

/** Splits article HTML after the Nth paragraph (for the mid-article ad slot / CTA). */
export function splitAfterParagraph(html: string, n = 3): [string, string] {
  let idx = -1, from = 0;
  for (let i = 0; i < n; i++) { idx = html.indexOf('</p>', from); if (idx === -1) return [html, '']; from = idx + 4; }
  return [html.slice(0, from), html.slice(from)];
}

/** Latest posts for teasers (home / service pages). Prefers posts in `preferCategory` (slug). */
export async function getTeaserPosts(n = 3, preferCategory?: string) {
  const posts = await getPosts();
  if (!preferCategory) return posts.slice(0, n);
  const inCat = posts.filter((p) => p.categories.some((c) => c.slug === preferCategory));
  return [...inCat, ...posts.filter((p) => !inCat.includes(p))].slice(0, n);
}

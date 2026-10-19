import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/posts';
import { SITE } from '../config/site';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${SITE.name} Journal`,
    description: 'Science-backed articles on training, nutrition, diet plans and recovery.',
    site: context.site ?? SITE.url,
    items: posts.map((p) => ({ title: p.title, description: p.excerpt, link: `/blog/${p.slug}`, pubDate: p.date, categories: [p.category.name, ...p.tags] })),
    customData: '<language>en</language>',
  });
}

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
    title: z.string(),            // <title> / SEO title
    description: z.string(),      // meta description
    h1: z.string(),
    intro: z.string(),            // hero sub-heading
    service: z.string(),          // related service slug for the CTA
    related: z.array(z.string()), // related tool slugs
    updated: z.coerce.date(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })),
  }),
});

/** Local sample posts — used only when WP_URL is NOT set (design preview / fallback). */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('PeriodicFit Team'),
    authorBio: z.string().optional(),
    authorCredentials: z.string().optional(),
    reviewer: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    heroImage: image().optional(),
    heroAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { tools, blog };

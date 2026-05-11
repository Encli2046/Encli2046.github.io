import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const sourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  publisher: z.string(),
  accessed: z.coerce.date()
});

const baseEntrySchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  sourceType: z.enum(['原创', '资料整理', '观点札记']).default('原创'),
  sources: z.array(sourceSchema).default([])
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: baseEntrySchema
});

const briefs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/briefs' }),
  schema: baseEntrySchema.extend({
    sources: z.array(sourceSchema).min(1)
  })
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: baseEntrySchema
});

const timeline = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/timeline' }),
  schema: baseEntrySchema.extend({
    year: z.number().int(),
    sources: z.array(sourceSchema).min(1)
  })
});

export const collections = { posts, briefs, notes, timeline };

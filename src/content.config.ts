import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const sourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  publisher: z.string(),
  accessed: z.coerce.date(),
});

// 文章集合（兼容 Bookworm 和旧格式）
const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/posts" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    image: z.string().optional(),
    categories: z.array(z.string()).default(() => ["others"]),
    authors: z.array(z.string()).default(() => ["Encli"]),
    tags: z.array(z.string()).default(() => ["others"]),
    draft: z.boolean().optional(),
    // 旧格式兼容字段
    category: z.string().optional(),
    updated: z.coerce.date().optional(),
    sourceType: z.enum(["原创", "资料整理", "观点札记"]).optional(),
    sources: z.array(sourceSchema).default([]),
  }),
});

// 简报集合（每条必须有来源）
const briefsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/briefs" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    image: z.string().optional(),
    categories: z.array(z.string()).default(() => ["资讯"]),
    authors: z.array(z.string()).default(() => ["Encli"]),
    tags: z.array(z.string()).default(() => ["others"]),
    draft: z.boolean().optional(),
    sourceType: z.enum(["原创", "资料整理", "观点札记"]).default("资料整理"),
    sources: z.array(sourceSchema).min(1),
  }),
});

// 札记集合
const notesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/notes" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    image: z.string().optional(),
    categories: z.array(z.string()).default(() => ["札记"]),
    authors: z.array(z.string()).default(() => ["Encli"]),
    tags: z.array(z.string()).default(() => ["others"]),
    draft: z.boolean().optional(),
    sourceType: z.enum(["原创", "资料整理", "观点札记"]).default("原创"),
    sources: z.array(sourceSchema).default([]),
  }),
});

// 时间线集合
const timelineCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/timeline" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    image: z.string().optional(),
    categories: z.array(z.string()).default(() => ["时间线"]),
    authors: z.array(z.string()).default(() => ["Encli"]),
    tags: z.array(z.string()).default(() => ["others"]),
    draft: z.boolean().optional(),
    year: z.number().int().optional(),
    sources: z.array(sourceSchema).default([]),
  }),
});

const authorsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/authors" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    social: z
      .object({
        github: z.string().optional(),
        website: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  posts: postsCollection,
  briefs: briefsCollection,
  notes: notesCollection,
  timeline: timelineCollection,
  authors: authorsCollection,
};

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { entryUrl, publicEntries } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = publicEntries(await getCollection('posts'));
  const timeline = publicEntries(await getCollection('timeline'));
  const briefs = publicEntries(await getCollection('briefs'));
  const notes = publicEntries(await getCollection('notes'));
  const items = publicEntries([...posts, ...timeline, ...briefs, ...notes]).map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    pubDate: entry.data.date,
    link: entryUrl(entry.collection, entry.id)
  }));

  return rss({
    title: 'Encli2046',
    description: '互联网观察、技术记录与生活札记。',
    site: context.site ?? 'https://encli2046.github.io',
    items
  });
}

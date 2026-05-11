import type { CollectionEntry } from 'astro:content';

export type SiteEntry =
  | CollectionEntry<'posts'>
  | CollectionEntry<'briefs'>
  | CollectionEntry<'notes'>
  | CollectionEntry<'timeline'>;

export function byDateDesc<T extends SiteEntry>(items: T[]) {
  return items.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

export function entryUrl(collection: SiteEntry['collection'], id: string) {
  if (collection === 'timeline') return `/timeline/${id}/`;
  return `/${collection}/${id}/`;
}

export function publicEntries<T extends SiteEntry>(items: T[]) {
  return byDateDesc(items.filter((entry) => !entry.data.draft));
}

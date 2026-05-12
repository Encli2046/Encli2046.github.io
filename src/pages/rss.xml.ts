import rss from "@astrojs/rss";
import { getSinglePage } from "@/lib/contentParser.astro";
import { sortByDate } from "@/lib/utils/sortFunctions";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = sortByDate(await getSinglePage("posts"));
  const briefs = sortByDate(await getSinglePage("briefs"));
  const notes = sortByDate(await getSinglePage("notes"));
  const timeline = sortByDate(await getSinglePage("timeline"));
  const all = sortByDate([...posts, ...briefs, ...notes, ...timeline]).slice(0, 20);

  return rss({
    title: "Encli2046",
    description: "记录互联网、技术与生活的长期线索。",
    site: context.site ?? "https://encli2046.github.io",
    items: all.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description ?? "",
      pubDate: entry.data.date ?? new Date(),
      link: (entry.collection === "posts" ? "/blog/" : `/${entry.collection}/`) + entry.id + "/",
    })),
  });
}

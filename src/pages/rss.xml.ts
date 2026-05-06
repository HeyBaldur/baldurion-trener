import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const enArticulos = await getCollection('articulos', ({ id, data }) => id.startsWith('en/') && !data.draft);
  const esArticulos = await getCollection('articulos', ({ id, data }) => id.startsWith('es/') && !data.draft);
  const articulos = enArticulos.length > 0 ? enArticulos : esArticulos;
  const prefix = enArticulos.length > 0 ? 'en/' : 'es/';

  return rss({
    title: 'Baldurion — Articles',
    description: 'Science-based fitness, training and sports nutrition.',
    site: context.site!.toString(),
    items: articulos
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .slice(0, 20)
      .map(entry => ({
        title: entry.data.title,
        pubDate: entry.data.pubDate,
        description: entry.data.description,
        link: `/en/articulos/${entry.id.replace(prefix, '')}/`,
      })),
    customData: '<language>en-US</language>',
  });
}

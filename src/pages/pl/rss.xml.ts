import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const plArticulos = await getCollection('articulos', ({ id, data }) => id.startsWith('pl/') && !data.draft);
  const esArticulos = await getCollection('articulos', ({ id, data }) => id.startsWith('es/') && !data.draft);
  const articulos = plArticulos.length > 0 ? plArticulos : esArticulos;
  const prefix = plArticulos.length > 0 ? 'pl/' : 'es/';

  return rss({
    title: 'Baldurion — Artykuły',
    description: 'Fitness, trening i żywienie sportowe oparte na nauce.',
    site: context.site!.toString(),
    items: articulos.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()).slice(0, 20).map(entry => ({
      title: entry.data.title, pubDate: entry.data.pubDate, description: entry.data.description,
      link: `/pl/articulos/${entry.id.replace(prefix, '')}/`,
    })),
    customData: '<language>pl-PL</language>',
  });
}

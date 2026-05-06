import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articulos = await getCollection('articulos', ({ id, data }) => {
    return id.startsWith('es/') && !data.draft;
  });

  return rss({
    title: 'Baldurion — Artículos',
    description: 'Fitness, entrenamiento y nutrición deportiva con base científica.',
    site: context.site!.toString(),
    items: articulos
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .slice(0, 20)
      .map(entry => ({
        title: entry.data.title,
        pubDate: entry.data.pubDate,
        description: entry.data.description,
        link: `/es/articulos/${entry.id.replace('es/', '')}/`,
      })),
    customData: '<language>es-ES</language>',
  });
}

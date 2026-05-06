import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articulos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articulos' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Rudolf'),
    category: z.enum([
      'entrenamiento',
      'nutricion',
      'lesiones',
      'metodologia',
      'ciencia',
      'casos-de-estudio',
    ]),
    tags: z.array(z.string()),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    readingTime: z.number().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articulos };

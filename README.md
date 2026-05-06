# Baldurion Magazine

Blog/revista digital especializado en fitness, entrenamiento y nutrición deportiva con base científica. Propiedad de Rodolfo A. Calvo Jaubert (Rudolf), entrenador personal certificado por FitAcademy, desde Katowice, Polonia.

## Stack

- **Framework:** Astro 6 (output estático)
- **Estilos:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Contenido:** Astro Content Layer API con archivos `.md` / `.mdx`
- **i18n:** i18n nativo de Astro (`es` | `en` | `pl`)
- **Deploy:** Cloudflare Pages
- **TypeScript:** modo `strict`

## Comandos

```bash
npm install       # Instalar dependencias
npm run dev       # Servidor de desarrollo en http://localhost:4321
npm run build     # Build estático en dist/
npm run preview   # Preview del build local
```

## Añadir un nuevo artículo

1. Crea un archivo `.md` en `src/content/articulos/es/` con el slug como nombre de archivo (ej. `mi-articulo.md`).

2. Añade el frontmatter completo:

```yaml
---
title: "Título del artículo"
description: "Descripción de máximo 160 caracteres para la meta description."
pubDate: 2024-12-01
author: "Rudolf"
category: "entrenamiento"
tags: ["tag1", "tag2"]
heroImage: "https://images.unsplash.com/photo-XXX?w=1200&h=675&fit=crop"
heroImageAlt: "Descripción de la imagen para accesibilidad"
featured: false
draft: false
---
```

**Categorías válidas:** `entrenamiento` | `nutricion` | `lesiones` | `metodologia` | `ciencia` | `casos-de-estudio`

3. Escribe el contenido en Markdown. El tiempo de lectura se calcula automáticamente (200 palabras/min). Puedes sobreescribirlo con `readingTime: 5`.

4. Usa `draft: true` para que no aparezca en producción mientras lo redactas.

## Añadir una traducción

1. Crea el mismo archivo en `src/content/articulos/en/` o `src/content/articulos/pl/` con el **mismo nombre de archivo** que la versión española.

2. El sistema detecta automáticamente si existe traducción. Si no, muestra el artículo en español con un aviso visible.

## Estructura de carpetas

```
src/
├── content.config.ts            # Schema de Zod para los artículos
├── content/articulos/
│   ├── es/                      # Artículos en español
│   ├── en/                      # Artículos en inglés
│   └── pl/                      # Artículos en polaco
├── i18n/
│   ├── es.ts | en.ts | pl.ts   # Strings de UI por idioma
│   └── index.ts                 # useTranslations, categoryColors, etc.
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── ArticuloCard.astro       # Card estándar (grid)
│   ├── ArticuloCardLarge.astro  # Card grande con imagen de fondo
│   ├── ArticuloCardFeatured.astro  # Card con color sólido (bento)
│   ├── BentoGrid.astro          # Layout bento de la homepage
│   ├── CategoryChip.astro
│   ├── CTACoaching.astro        # Bloque CTA al final de artículos
│   ├── LanguageSwitcher.astro
│   └── ThemeToggle.astro
├── layouts/
│   ├── BaseLayout.astro         # Layout base con head, header y footer
│   └── ArticuloLayout.astro    # Layout para páginas de artículo
├── pages/
│   ├── index.astro              # Redirección a /es/
│   ├── 404.astro
│   ├── es/                      # Homepage, artículos, sobre, coaching, contacto, RSS
│   ├── en/                      # Misma estructura
│   └── pl/                      # Misma estructura
└── styles/
    └── global.css               # CSS variables de tema, tipografías, animaciones
```

## Desplegar en Cloudflare Pages

1. Sube el repositorio a GitHub.
2. En Cloudflare Pages, conecta el repositorio.
3. Configura el build:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Actualiza `site` en `astro.config.mjs` con la URL definitiva antes de desplegar.

## Dark/Light mode

El toggle persiste en `localStorage`. En la primera visita, respeta `prefers-color-scheme` del sistema. Los colores se definen como CSS variables en `src/styles/global.css` bajo `:root` (light) y `[data-theme="dark"]`.

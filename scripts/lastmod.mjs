import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = path.join(ROOT, 'src', 'pages');
const RESOLVE_EXTENSIONS = ['', '.astro', '.ts', '.tsx', '.js', '.mjs', '/index.ts', '/index.astro'];

function git(...args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
}

/** Prefix marking a date line in the log below; no repo path can start with it. */
const MARKER = 'commit:';

/**
 * Last commit date for every tracked file, from a single `git log` pass.
 * The log is newest-first, so the first time a path appears is its last change.
 */
function commitDates() {
  const map = new Map();
  let current = null;

  for (const raw of git('log', `--format=${MARKER}%cI`, '--name-only').split('\n')) {
    const line = raw.trimEnd();
    if (line.startsWith(MARKER)) current = line.slice(MARKER.length);
    else if (line && current && !map.has(line)) map.set(line, current);
  }

  return map;
}

/** Resolve a relative import specifier to a file on disk, or null if it is a bare/asset import. */
function resolveImport(fromFile, specifier) {
  if (!specifier.startsWith('.')) return null;

  const base = path.resolve(path.dirname(fromFile), specifier);
  for (const ext of RESOLVE_EXTENSIONS) {
    const candidate = base + ext;
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
}

/** Every local file a page depends on, transitively — its components, layouts and translations. */
function dependencies(entry) {
  const seen = new Set();
  const queue = [entry];

  while (queue.length) {
    const file = queue.pop();
    if (seen.has(file)) continue;
    seen.add(file);

    const source = readFileSync(file, 'utf8');
    for (const [, specifier] of source.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
      const resolved = resolveImport(file, specifier);
      if (resolved) queue.push(resolved);
    }
  }

  return seen;
}

/** `src/pages/es/sobre-mi.astro` -> `/es/sobre-mi/`, `src/pages/index.astro` -> `/`. */
function routeOf(file) {
  const relative = path.relative(PAGES, file).split(path.sep).join('/');
  const segments = relative.replace(/\.astro$/, '').split('/');
  if (segments.at(-1) === 'index') segments.pop();
  return segments.length ? `/${segments.join('/')}/` : '/';
}

function pageFiles(dir = PAGES) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return pageFiles(full);
    return entry.name.endsWith('.astro') && entry.name !== '404.astro' ? [full] : [];
  });
}

/**
 * Map of route -> ISO date of the newest commit touching that page or anything it
 * imports. Returns an empty map when the history is unavailable (shallow clone, no
 * git, tarball build) so the sitemap simply omits `lastmod` rather than inventing one.
 */
export function buildLastmodMap() {
  try {
    if (git('rev-parse', '--is-shallow-repository').trim() === 'true') {
      console.warn('[sitemap] shallow clone — omitting lastmod. Set fetch-depth: 0 in CI.');
      return new Map();
    }

    const dates = commitDates();
    const routes = new Map();

    for (const page of pageFiles()) {
      let newest = null;
      for (const file of dependencies(page)) {
        const date = dates.get(path.relative(ROOT, file).split(path.sep).join('/'));
        if (date && (!newest || date > newest)) newest = date;
      }
      if (newest) routes.set(routeOf(page), newest);
    }

    return routes;
  } catch (error) {
    console.warn(`[sitemap] could not read git history — omitting lastmod (${error.message})`);
    return new Map();
  }
}

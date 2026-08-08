// @ts-check

import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightTypeDoc, {
  createStarlightTypeDocPlugin,
  typeDocSidebarGroup,
} from 'starlight-typedoc';

// The API reference is auto-generated from TypeScript source (already
// English-only, since the source comments are English) — Starlight's
// sidebar `autogenerate` entries are locale-scoped by directory
// (`en/reference/api/...` vs `reference/api/...`), so without a real
// second copy under `en/`, every API sidebar link on the English site
// would 404 (Starlight still renders the full link tree, just with a
// prefix pointing at files that don't exist). `createStarlightTypeDocPlugin`
// exists exactly for this: a second, independent plugin instance with its
// own sidebar placeholder, generating the same content into `en/reference/api`.
const [starlightTypeDocEn] = createStarlightTypeDocPlugin();

export default defineConfig({
  output: 'static',
  site: 'https://rroblf01.github.io/graphojs',
  base: '/',
  integrations: [
    starlight({
      title: 'GraphoJS',
      favicon: '/favicon.ico',
      defaultLocale: 'root',
      locales: {
        root: { label: 'Español', lang: 'es' },
        en: { label: 'English', lang: 'en' },
      },
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/rroblf01/graphojs' }],
      components: {
        // Añade el badge de "última release" de shields.io junto al icono
        // de GitHub en la barra de navegación — ver el componente para el
        // porqué de usar shields.io en vez de una llamada a la API en build.
        SocialIcons: './src/components/SocialIcons.astro',
      },
      sidebar: [
        {
          label: 'Empezar',
          translations: { en: 'Getting Started' },
          link: '/getting-started/',
        },
        {
          label: 'Conceptos básicos',
          translations: { en: 'Core Concepts' },
          items: [
            {
              label: 'Usar GraphoJS sin npm (CDN)',
              translations: { en: 'Using GraphoJS without npm (CDN)' },
              link: '/guide/cdn/',
            },
            {
              label: 'Reducir el tamaño de tu bundle',
              translations: { en: 'Reducing your bundle size' },
              link: '/guide/bundle-size/',
            },
            { label: 'Diagrama', translations: { en: 'Diagram' }, link: '/guide/diagram/' },
            { label: 'Modelo', translations: { en: 'Model' }, link: '/guide/model/' },
            { label: 'Templates', translations: { en: 'Templates' }, link: '/guide/templates/' },
            {
              label: 'Figuras de Shape',
              translations: { en: 'Shape figures' },
              link: '/guide/shapes/',
            },
            {
              label: 'Figuras personalizadas',
              translations: { en: 'Custom shapes' },
              link: '/guide/custom-shapes/',
            },
            { label: 'Layouts', translations: { en: 'Layouts' }, link: '/guide/layouts/' },
          ],
        },
        {
          label: 'Interacción',
          translations: { en: 'Interaction' },
          items: [
            {
              label: 'Interacción',
              translations: { en: 'Interaction' },
              link: '/guide/interaction/',
            },
            {
              label: 'Drag & drop',
              translations: { en: 'Drag & drop' },
              link: '/guide/drag-drop/',
            },
            {
              label: 'Guías de alineación',
              translations: { en: 'Alignment guides' },
              link: '/guide/guided-dragging/',
            },
            {
              label: 'Arrastrar la etiqueta de un enlace',
              translations: { en: 'Dragging a link label' },
              link: '/guide/link-label-dragging/',
            },
            {
              label: 'Deshacer y rehacer',
              translations: { en: 'Undo and redo' },
              link: '/guide/undo-redo/',
            },
            { label: 'Validación', translations: { en: 'Validation' }, link: '/guide/validation/' },
            {
              label: 'Menú contextual y tooltips',
              translations: { en: 'Context menu and tooltips' },
              link: '/guide/context-menu/',
            },
          ],
        },
        {
          label: 'Estructuras',
          translations: { en: 'Structures' },
          items: [
            { label: 'Grupos', translations: { en: 'Groups' }, link: '/guide/groups/' },
            { label: 'Árboles', translations: { en: 'Trees' }, link: '/guide/tree/' },
            {
              label: 'Layout circular',
              translations: { en: 'Circular layout' },
              link: '/guide/circular/',
            },
          ],
        },
        {
          label: 'Import/Export',
          translations: { en: 'Import/Export' },
          items: [
            { label: 'Export', translations: { en: 'Export' }, link: '/guide/export/' },
            {
              label: 'Import/export GraphML',
              translations: { en: 'GraphML import/export' },
              link: '/guide/graphml/',
            },
          ],
        },
        {
          label: 'Accesibilidad y rendimiento',
          translations: { en: 'Accessibility and performance' },
          items: [
            {
              label: 'Accesibilidad',
              translations: { en: 'Accessibility' },
              link: '/guide/accessibility/',
            },
            {
              label: 'Rendimiento',
              translations: { en: 'Performance' },
              link: '/guide/performance/',
            },
          ],
        },
        {
          label: 'Ejemplos completos',
          translations: { en: 'Full examples' },
          items: [
            {
              label: 'Flujo de negocio',
              translations: { en: 'Business flow' },
              link: '/guide/business-flow/',
            },
            {
              label: 'Diagrama de flujo con carriles',
              translations: { en: 'Swimlane flowchart' },
              link: '/guide/flowchart/',
            },
            {
              label: 'Diagrama de Gantt',
              translations: { en: 'Gantt chart' },
              link: '/guide/gantt/',
            },
            {
              label: 'Organigrama',
              translations: { en: 'Org chart' },
              link: '/guide/org-chart/',
            },
          ],
        },
        {
          label: 'Integraciones',
          translations: { en: 'Integrations' },
          items: [
            {
              label: 'React y Vue',
              translations: { en: 'React and Vue' },
              link: '/guide/react-vue/',
            },
            {
              label: 'Migración desde GoJS',
              translations: { en: 'Migrating from GoJS' },
              link: '/guide/migration/',
            },
          ],
        },
        {
          label: 'Referencia',
          translations: { en: 'Reference' },
          items: [
            {
              label: 'Compatibilidad con GoJS',
              translations: { en: 'GoJS compatibility' },
              link: '/reference/compatibility/',
            },
            typeDocSidebarGroup,
          ],
        },
      ],
      customCss: ['./src/styles/global.css'],
      plugins: [
        starlightTypeDoc({
          entryPoints: [
            '../core/src/index.ts',
            '../core/src/go.ts',
            '../core/src/templates.ts',
            '../core/src/react/index.tsx',
            '../core/src/vue/index.ts',
          ],
          tsconfig: '../core/tsconfig.json',
          output: 'reference/api',
          sidebar: { label: 'API', collapsed: true },
          typeDoc: {
            readme: 'none',
            excludeInternal: true,
            excludeExternals: true,
          },
        }),
        // Same source, same output — just under `en/` so Starlight's
        // locale-scoped `autogenerate` sidebar entries (tied to the single
        // `typeDocSidebarGroup` placeholder above) find real files instead
        // of 404ing. This placeholder is intentionally never referenced in
        // `sidebar` — its only job here is generating the files; the
        // visible "Reference" > API group is Starlight's own autogenerate
        // logic finding them.
        starlightTypeDocEn({
          entryPoints: [
            '../core/src/index.ts',
            '../core/src/go.ts',
            '../core/src/templates.ts',
            '../core/src/react/index.tsx',
            '../core/src/vue/index.ts',
          ],
          tsconfig: '../core/tsconfig.json',
          output: 'en/reference/api',
          sidebar: { label: 'API', collapsed: true },
          typeDoc: {
            readme: 'none',
            excludeInternal: true,
            excludeExternals: true,
          },
        }),
      ],
    }),
    mdx(),
  ],
});

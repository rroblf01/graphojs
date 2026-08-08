// @ts-check

import mdx from '@astrojs/mdx';
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';

export default defineConfig({
  output: 'static',
  site: 'https://rroblf01.github.io/graphojs',
  base: '/',
  integrations: [
    starlight({
      title: 'GraphoJS',
      favicon: '/favicon.ico',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/rroblf01/graphojs' }],
      components: {
        // Añade el badge de "última release" de shields.io junto al icono
        // de GitHub en la barra de navegación — ver el componente para el
        // porqué de usar shields.io en vez de una llamada a la API en build.
        SocialIcons: './src/components/SocialIcons.astro',
      },
      sidebar: [
        { label: 'Empezar', link: '/getting-started/' },
        {
          label: 'Conceptos básicos',
          items: [
            { label: 'Usar GraphoJS sin npm (CDN)', link: '/guide/cdn/' },
            { label: 'Reducir el tamaño de tu bundle', link: '/guide/bundle-size/' },
            { label: 'Diagrama', link: '/guide/diagram/' },
            { label: 'Modelo', link: '/guide/model/' },
            { label: 'Templates', link: '/guide/templates/' },
            { label: 'Figuras de Shape', link: '/guide/shapes/' },
            { label: 'Figuras personalizadas', link: '/guide/custom-shapes/' },
            { label: 'Layouts', link: '/guide/layouts/' },
          ],
        },
        {
          label: 'Interacción',
          items: [
            { label: 'Interacción', link: '/guide/interaction/' },
            { label: 'Drag & drop', link: '/guide/drag-drop/' },
            { label: 'Guías de alineación', link: '/guide/guided-dragging/' },
            { label: 'Arrastrar la etiqueta de un enlace', link: '/guide/link-label-dragging/' },
            { label: 'Deshacer y rehacer', link: '/guide/undo-redo/' },
            { label: 'Validación', link: '/guide/validation/' },
            { label: 'Menú contextual y tooltips', link: '/guide/context-menu/' },
          ],
        },
        {
          label: 'Estructuras',
          items: [
            { label: 'Grupos', link: '/guide/groups/' },
            { label: 'Árboles', link: '/guide/tree/' },
            { label: 'Layout circular', link: '/guide/circular/' },
          ],
        },
        {
          label: 'Import/Export',
          items: [
            { label: 'Export', link: '/guide/export/' },
            { label: 'Import/export GraphML', link: '/guide/graphml/' },
          ],
        },
        {
          label: 'Accesibilidad y rendimiento',
          items: [
            { label: 'Accesibilidad', link: '/guide/accessibility/' },
            { label: 'Rendimiento', link: '/guide/performance/' },
          ],
        },
        {
          label: 'Ejemplos completos',
          items: [
            { label: 'Flujo de negocio', link: '/guide/business-flow/' },
            { label: 'Diagrama de flujo con carriles', link: '/guide/flowchart/' },
            { label: 'Diagrama de Gantt', link: '/guide/gantt/' },
            { label: 'Organigrama', link: '/guide/org-chart/' },
          ],
        },
        {
          label: 'Integraciones',
          items: [
            { label: 'React y Vue', link: '/guide/react-vue/' },
            { label: 'Migración desde GoJS', link: '/guide/migration/' },
          ],
        },
        {
          label: 'Referencia',
          items: [
            { label: 'Compatibilidad con GoJS', link: '/reference/compatibility/' },
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
      ],
    }),
    mdx(),
  ],
});

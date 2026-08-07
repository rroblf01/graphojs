// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';

export default defineConfig({
  output: 'static',
  site: 'https://rroblf01.github.io/graphojs',
  base: '/',
  integrations: [
    starlight({
      title: 'GraphoJS',
      favicon: '/favicon.ico',
      sidebar: [
        { label: 'Empezar', link: '/getting-started/' },
        {
          label: 'Guía',
          items: [{ autogenerate: { directory: 'guide' } }],
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

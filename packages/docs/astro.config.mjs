// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  site: 'https://rroblf01.github.io/graphojs',
  base: '/',
  integrations: [
    starlight({
      title: 'GraphoJS',
      sidebar: [
        { label: 'Empezar', link: '/getting-started/' },
        {
          label: 'Guía',
          items: [{ autogenerate: { directory: 'guide' } }],
        },
        {
          label: 'Referencia',
          items: [{ autogenerate: { directory: 'reference' } }],
        },
      ],
      customCss: ['./src/styles/global.css'],
    }),
    mdx(),
  ],
});

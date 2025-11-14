// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwind()],
	},
	image: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			}
		],
	},
	integrations: [
		react(),
		starlight({
			title: 'Base de Conhecimento - Saúde',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Português',
					lang: 'pt-BR',
				},
			},
			logo: {
				src: './public/logo.svg',
				replacesTitle: false,
			},
			customCss: [
				'./src/assets/app.css',
				'./src/assets/custom.css',
			],
			components: {
				ContentPanel: './src/components/overrides/ContentPanel.astro',
				Footer: './src/components/overrides/Footer.astro',
				PageTitle: './src/components/overrides/PageTitle.astro',
			},
			pagefind: {
				forceLanguage: 'pt-br',
			},
			sidebar: [
				{
					label: 'Protocolos e Normas',
					autogenerate: { directory: 'protocolos-e-normas' },
				},
				{
					label: 'Formulários e Fichas',
					autogenerate: { directory: 'formularios-e-fichas' },
				},
				{
					label: 'Manuais e Guias',
					autogenerate: { directory: 'manuais-e-guias' },
				},
			],
		}),
	],
});

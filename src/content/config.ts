import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'zod';

// Extend Starlight's docs schema with governance metadata
export const collections = {
	docs: defineCollection({
		schema: docsSchema({
			extend: z.object({
				// Document governance metadata (optional to avoid breaking pages without them)
				version: z.string().optional(),
				status: z.enum(['Rascunho', 'Publicado', 'Revisão', 'Revogado']).optional(),
				author: z.string().optional(),
				// Note: lastUpdated is already in Starlight's schema, so we don't redefine it
			}),
		}),
	}),
};

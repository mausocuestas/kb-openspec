import { defineCollection } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'zod';

// Extend Starlight's docs schema with governance metadata
export const collections = {
	docs: defineCollection({
		schema: docsSchema({
			extend: z.object({
				// Document metadata fields
				tipo_documento: z.string().optional(),
				area_responsavel: z.string().optional(),
				status: z.string().optional(),
				versao: z.string().optional(),
				codigo: z.string().optional(),
				data_publicacao: z.string().optional(),
				data_ultima_atualizacao: z.string().optional(),
				data_proxima_revisao: z.string().optional(),
				data_criacao_original: z.string().optional(),
				data_revogacao: z.string().optional(),
				
				// Author fields
				autor_original: z.array(z.string()).optional(),
				ultima_atualizacao_por: z.array(z.string()).optional(),
				responsaveis_tecnicos: z.array(z.string()).optional(),
				
				// Other metadata
				tema_principal: z.string().optional(),
				publico_alvo: z.string().optional(),
				nivel_de_atencao: z.string().optional(),
				documentos_relacionados: z.array(z.string()).optional(),
				origem_normativa: z.array(z.string()).optional(),
				documento_substituto: z.string().optional(),
				visibilidade: z.string().optional(),
			}),
		}),
	}),
};

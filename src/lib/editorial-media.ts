import { z } from 'astro/zod';
export const editorialImageSchema = z.object({
  url: z.url().refine((value) => {
    const url = new URL(value);
    return (
      url.origin === 'https://cdn.sanity.io' &&
      url.pathname.startsWith('/images/') &&
      !url.search &&
      !url.hash
    );
  }, 'Origen de imagen no permitido.'),
  width: z.number().int().positive().max(16000),
  height: z.number().int().positive().max(16000),
  alt: z.string().trim().min(1).max(250),
  credit: z.string().trim().min(1).max(150),
  caption: z.string().max(350).default(''),
  kind: z.enum(['institutional', 'reference']),
});
export type EditorialImage = z.infer<typeof editorialImageSchema>;

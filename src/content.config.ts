import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file } from 'astro/loaders';

const text = z.string().trim().min(1);
const order = z.number().int().nonnegative();
const institution = defineCollection({
  loader: file('src/content/institution.json'),
  schema: z.object({
    name: text, title: text, description: text, email: z.email(),
    address: text, city: text, province: text, postalCode: text,
    mapUrl: z.url().startsWith('https://www.google.com/maps/'),
    history: z.array(text).min(1),
  }),
});
const services = defineCollection({
  loader: file('src/content/services.json'),
  schema: z.object({ order, name: text, caption: text, description: text, action: text, initiallyOpen: z.boolean() }).and(
    z.discriminatedUnion('target', [
      z.object({ target: z.literal('email'), subject: text }),
      z.object({ target: z.literal('alojamiento') }),
    ]),
  ),
});
const branches = defineCollection({ loader: file('src/content/branches.json'), schema: z.object({ order, name: text }) });
const stays = defineCollection({ loader: file('src/content/stays.json'), schema: z.object({ order, name: text, description: text }) });
export const collections = { institution, services, branches, stays };

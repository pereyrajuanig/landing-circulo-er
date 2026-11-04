import { defineField, defineType, defineArrayMember } from 'sanity';
const photoFields = [
  defineField({
    name: 'kind',
    title: 'Tipo de fotografía',
    type: 'string',
    initialValue: 'institutional',
    options: {
      list: [
        { title: 'Institucional', value: 'institutional' },
        { title: 'Referencia visual', value: 'reference' },
      ],
    },
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'alt',
    title: 'Descripción de la imagen',
    type: 'string',
    description: 'Describí lo que se ve para las personas que usan un lector de pantalla.',
    validation: (Rule) => Rule.required().min(8).max(250),
  }),
  defineField({
    name: 'caption',
    title: 'Pie de foto',
    type: 'string',
    description: 'Localidad, actividad o aclaración necesaria para interpretar la imagen.',
    validation: (Rule) => Rule.max(350),
  }),
  defineField({
    name: 'credit',
    title: 'Autor o procedencia',
    type: 'string',
    description: 'Por ejemplo: Archivo del Círculo. Publicá solo imágenes autorizadas.',
    validation: (Rule) => Rule.required().max(150),
  }),
];
export const publication = defineType({
  name: 'publication',
  type: 'document',
  title: 'Noticia o logro',
  groups: [
    { name: 'content', title: 'Contenido', default: true },
    { name: 'photos', title: 'Fotografías' },
    { name: 'publication', title: 'Publicación' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(5).max(140),
    }),
    defineField({
      name: 'slug',
      title: 'Dirección de la publicación',
      type: 'slug',
      group: 'publication',
      description:
        'Usá Generar antes de publicar. Mantené esta dirección después para conservar los enlaces.',
      options: {
        source: 'title',
        maxLength: 100,
        slugify: (value) =>
          value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 100)
            .replace(/-$/, ''),
      },
      validation: (Rule) =>
        Rule.required().custom(
          (value) =>
            !value?.current ||
            (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current) && value.current.length <= 100) ||
            'Usá minúsculas, números y guiones; hasta 100 caracteres.',
        ),
    }),
    defineField({
      name: 'category',
      title: 'Tipo de publicación',
      type: 'string',
      group: 'content',
      initialValue: 'noticia',
      options: {
        list: [
          { title: 'Noticia', value: 'noticia' },
          { title: 'Logro de gestión', value: 'logro' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Resumen',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Se muestra en Inicio y en el listado de novedades.',
      validation: (Rule) => Rule.required().min(20).max(350),
    }),
    defineField({
      name: 'body',
      title: 'Texto de la publicación',
      type: 'text',
      rows: 16,
      group: 'content',
      description:
        'Separá los párrafos con una línea en blanco. El texto se publica sin código HTML.',
      validation: (Rule) => Rule.required().min(40).max(30000),
    }),
    defineField({
      name: 'cover',
      title: 'Fotografía principal',
      type: 'image',
      group: 'photos',
      options: { hotspot: true, accept: 'image/jpeg,image/png,image/webp' },
      fields: photoFields,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Más fotografías',
      type: 'array',
      group: 'photos',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true, accept: 'image/jpeg,image/png,image/webp' },
          fields: photoFields,
        }),
      ],
      validation: (Rule) => Rule.max(12),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      group: 'publication',
      initialValue: () => new Date().toISOString(),
      description:
        'Fecha que verá el público. La publicación en el sitio se actualiza después del despliegue.',
      validation: (Rule) =>
        Rule.required().custom(
          (value) =>
            !value ||
            Date.parse(value) <= Date.now() ||
            'Usá una fecha actual o pasada; la publicación programada todavía no está habilitada.',
        ),
    }),
    defineField({
      name: 'sourceContext',
      title: 'Aclaración sobre la información',
      type: 'text',
      rows: 3,
      group: 'publication',
      description:
        'Indicá si es material de archivo, si la fecha del hecho es distinta o si hay condiciones por confirmar.',
      validation: (Rule) => Rule.max(1500),
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Enlace original de Facebook (opcional)',
      type: 'url',
      group: 'publication',
      description:
        'Este campo guarda el enlace original; la sincronización automática se activa en otra etapa.',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https'] }).custom((value) => {
          if (!value) return true;
          try {
            return (
              ['facebook.com', 'www.facebook.com', 'm.facebook.com'].includes(
                new URL(value).hostname,
              ) || 'Usá un enlace de la página en facebook.com.'
            );
          } catch {
            return 'Ingresá un enlace válido de Facebook.';
          }
        }),
    }),
  ],
  orderings: [
    { title: 'Más recientes', name: 'newest', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', category: 'category', media: 'cover' },
    prepare: ({ title, category, media }) => ({
      title,
      subtitle: category === 'logro' ? 'Logro de gestión' : 'Noticia',
      media,
    }),
  },
});

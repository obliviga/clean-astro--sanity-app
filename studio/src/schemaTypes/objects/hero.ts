import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Background image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLinkType',
      title: 'CTA Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'External URL', value: 'external'},
          {title: 'Internal (reference)', value: 'internal'},
        ],
        layout: 'radio',
      },
      initialValue: 'external',
    }),
    defineField({
      name: 'ctaInternalRef',
      title: 'Internal reference',
      description: 'Pick a post to link to. Renders as /post/[slug] in the site.',
      type: 'reference',
      to: [{type: 'post'}],
      hidden: ({parent}) => parent?.ctaLinkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((val, context) => {
          const parent = (context as any).parent as {ctaLinkType?: string}
          if (parent?.ctaLinkType === 'internal') {
            return val && (val as any)._ref ? true : 'Reference is required for internal links'
          }
          return true
        }),
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA URL',
      type: 'url',
      hidden: ({parent}) => parent?.ctaLinkType !== 'external',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }).custom((val, context) => {
          const parent = (context as any).parent as {ctaLinkType?: string}
          if (parent?.ctaLinkType === 'external') {
            return val ? true : 'URL is required for external links'
          }
          return true
        }),
    }),
    defineField({
      name: 'align',
      title: 'Text alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'center',
    }),
  ],
})

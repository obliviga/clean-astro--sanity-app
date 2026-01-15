import {defineType, defineField} from 'sanity'
import {WidthSliderInput} from '../../components/WidthSliderInput'

export default defineType({
  name: 'imageWithText',
  title: 'Image with text',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'align',
      title: 'Image alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'width',
      title: 'Image width (%)',
      type: 'number',
      initialValue: 40,
      validation: (Rule) => Rule.min(20).max(80),
      components: {
        input: WidthSliderInput,
      },
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})

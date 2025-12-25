import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'scrapbookPage',
  title: 'Scrapbook Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'stickers',
      title: 'Stickers',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Emoji stickers on this page',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color code for background',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

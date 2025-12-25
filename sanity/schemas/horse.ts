import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'horse',
  title: 'Horse',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Horse Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Coat Color',
      type: 'string',
      description: 'Hex color code like #FF69B4',
    }),
    defineField({
      name: 'personality',
      title: 'Personality',
      type: 'string',
      options: {
        list: [
          {title: 'Friendly 😊', value: 'Friendly'},
          {title: 'Magical 🦄', value: 'Magical'},
          {title: 'Speedy 🏃', value: 'Speedy'},
          {title: 'Sleepy 😴', value: 'Sleepy'},
          {title: 'Playful 🥳', value: 'Playful'},
          {title: 'Wise 🤔', value: 'Wise'},
          {title: 'Cuddly 💖', value: 'Cuddly'},
          {title: 'Star ⭐', value: 'Star'},
        ],
      },
    }),
    defineField({
      name: 'story',
      title: 'Story',
      type: 'text',
      rows: 5,
      description: "This horse's backstory",
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'personality',
      media: 'image',
    },
  },
})

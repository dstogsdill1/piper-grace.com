import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'diaryEntry',
  title: 'Diary Entry',
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
      rows: 10,
    }),
    defineField({
      name: 'mood',
      title: 'Mood',
      type: 'string',
      options: {
        list: [
          {title: 'Happy 😊', value: '😊'},
          {title: 'Loved 🥰', value: '🥰'},
          {title: 'Cool 😎', value: '😎'},
          {title: 'Thoughtful 🤔', value: '🤔'},
          {title: 'Sleepy 😴', value: '😴'},
          {title: 'Excited 🥳', value: '🥳'},
          {title: 'Sad 😢', value: '😢'},
          {title: 'Frustrated 😤', value: '😤'},
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'mood',
    },
  },
})

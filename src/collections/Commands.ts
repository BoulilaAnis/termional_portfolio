import { CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
  HeadingFeature,
  OrderedListFeature,
  UnorderedListFeature,
  InlineCodeFeature,
  BlockquoteFeature,
} from '@payloadcms/richtext-lexical'

export const Commands: CollectionConfig = {
  slug: 'commands',
  admin: {
    useAsTitle: 'command',
  },
  fields: [
    {
      name: 'command',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'What the user types in the terminal',
      },
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'response',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: () => [
          // ...defaultFeatures,
          BoldFeature(),
          FixedToolbarFeature(),
          ItalicFeature(),
          LinkFeature({}),
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
          OrderedListFeature(),
          UnorderedListFeature(),
          InlineCodeFeature(),
          BlockquoteFeature(),
        ],
      }),
    },
  ],
}

import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blogs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    summary: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
  },
}))

export const Paper = defineDocumentType(() => ({
  name: 'Paper',
  filePathPattern: `papers/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    summary: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog, Paper],
  mdx: { remarkPlugins: [remarkGfm] },
})

// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "../content/blogs/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    date: { type: "date", required: true },
    summary: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "../content",
  documentTypes: [Blog],
  mdx: { remarkPlugins: [remarkGfm] }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-G6NHCLUN.mjs.map

// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import path from "path";
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blogs/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    date: { type: "date", required: true },
    summary: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false }
  }
}));
var Paper = defineDocumentType(() => ({
  name: "Paper",
  filePathPattern: "papers/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    slug: { type: "string", required: true },
    summary: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" } }
  }
}));
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    slug: { type: "string", required: true },
    description: { type: "string", required: false },
    github: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" } }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: path.join(process.cwd(), "../../content"),
  documentTypes: [Blog, Paper, Project],
  mdx: { remarkPlugins: [remarkGfm] }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-FVNM57LF.mjs.map

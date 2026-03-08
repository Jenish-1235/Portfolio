import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

// ═══════════════════════════════════════════════════════════════════
// Markdown → HTML pipeline
//
// Architecture (order matters):
//   1. normalizeNotionMarkdown()  – fix Notion quirks
//   2. extractMermaidBlocks()     – pull mermaid fences out of the
//                                   markdown and leave placeholders
//   3. marked.parse()             – convert markdown → HTML
//      └─ markedHighlight/hljs    – syntax-highlight code blocks
//      └─ custom renderer         – wrap code in UI (label + copy)
//   4. restoreMermaidBlocks()     – swap placeholders with raw
//                                   <pre class="mermaid"> elements
//
// Mermaid source never enters marked or highlight.js, so it can
// never be corrupted regardless of future changes to either lib.
// ═══════════════════════════════════════════════════════════════════

// ── 1. Normalise Notion markdown ───────────────────────────────────
function normalizeNotionMarkdown(markdown: string): string {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(/&#96;/g, "`")
    .replace(/\\`/g, "`");
}

// ── 2. Extract / restore mermaid ───────────────────────────────────
interface MermaidExtraction {
  markdown: string;                      // markdown with placeholders
  blocks: Map<string, string>;           // placeholder → raw source
}

function extractMermaidBlocks(md: string): MermaidExtraction {
  const blocks = new Map<string, string>();
  let counter = 0;

  // Match ```mermaid ... ``` fences (handles optional whitespace)
  const fenceRe = /^```mermaid\s*\n([\s\S]*?)^```\s*$/gm;

  const cleaned = md.replace(fenceRe, (_match, code: string) => {
    const id = `<!--MERMAID_BLOCK_${counter++}-->`;
    blocks.set(id, code.trimEnd());
    return id;
  });

  return { markdown: cleaned, blocks };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function restoreMermaidBlocks(html: string, blocks: Map<string, string>): string {
  for (const [placeholder, source] of blocks) {
    html = html.replace(
      // marked may wrap the HTML-comment placeholder in a <p>
      new RegExp(`(<p>)?${placeholder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(</p>)?`),
      `<pre class="mermaid">${escapeHtml(source)}</pre>`,
    );
  }
  return html;
}

// ── 3. Configure marked + highlight.js ─────────────────────────────
// highlight.js never sees mermaid (it was already extracted).
marked.use(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    },
  }),
);

const renderer = new marked.Renderer();
const originalCode = renderer.code.bind(renderer);
renderer.code = function (token: {
  type: "code";
  raw: string;
  text: string;
  lang?: string;
}) {
  const highlighted = originalCode(token);
  const label = token.lang || "code";

  return `<div class="code-block">
    <div class="code-block-header">
      <span class="code-lang">${label}</span>
      <button class="copy-btn" aria-label="Copy code">Copy</button>
    </div>
    ${highlighted}
  </div>`;
};

renderer.codespan = function (token: {
  type: "codespan";
  raw: string;
  text: string;
}) {
  return `<code class="inline-code">${token.text}</code>`;
};

marked.use({ renderer });

// ── 4. Public helper used by getItemBySlug ─────────────────────────
async function renderNotionMarkdown(raw: string): Promise<string> {
  const normalized = normalizeNotionMarkdown(raw);
  const { markdown, blocks } = extractMermaidBlocks(normalized);
  const html = await marked.parse(markdown);
  return restoreMermaidBlocks(html, blocks);
}

// Bypass local TLS certificate issues for Notion API (local dev)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Initialize Notion Client
const notion = new Client({
  auth: import.meta.env.NOTION_API_KEY,
});

// Initialize Notion to Markdown converter
const n2m = new NotionToMarkdown({ notionClient: notion });

export type ContentType = "blog" | "project" | "paper";

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  date: string;
  type: ContentType;
  published: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function mapPageToItem(page: any): ContentItem | null {
  const typeName: string | undefined =
    page.properties.Type?.select?.name ||
    page.properties.Type?.multi_select?.[0]?.name;

  if (!typeName) {
    return null;
  }

  const normalized = typeName.toLowerCase() as ContentType;
  if (!["blog", "project", "paper"].includes(normalized)) {
    return null;
  }

  const title = page.properties.Title?.title?.[0]?.plain_text || "Untitled";

  return {
    id: page.id,
    title,
    slug: slugify(title),
    date:
      page.properties.Date?.date?.start ||
      new Date().toISOString().split("T")[0],
    type: normalized,
    published: page.properties.Published?.checkbox || false,
  };
}

async function queryByType(type: ContentType): Promise<ContentItem[]> {
  const databaseId = import.meta.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    console.warn("No NOTION_DATABASE_ID provided. Returning empty array.");
    return [];
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    const items = response.results
      .map(mapPageToItem)
      .filter((item): item is ContentItem => !!item && item.type === type);

    return items;
  } catch (error) {
    console.error(`Error fetching Notion items for type ${type}:`, error);
    return [];
  }
}

export async function getPublishedPosts(): Promise<ContentItem[]> {
  return queryByType("blog");
}

export async function getProjects(): Promise<ContentItem[]> {
  return queryByType("project");
}

export async function getPapers(): Promise<ContentItem[]> {
  return queryByType("paper");
}

async function getItemBySlug(
  slug: string,
  type: ContentType,
): Promise<{ item: ContentItem | null; html: string }> {
  const databaseId = import.meta.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    return { item: null, html: "" };
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
    });

    // Find the item whose title-derived slug matches
    let page: any = null;
    let mapped: ContentItem | null = null;
    for (const result of response.results) {
      const candidate = mapPageToItem(result as any);
      if (candidate && candidate.type === type && candidate.slug === slug) {
        page = result;
        mapped = candidate;
        break;
      }
    }

    if (!page || !mapped) {
      return { item: null, html: "" };
    }

    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString: any = n2m.toMarkdownString(mdblocks);
    const raw = mdString.parent || mdString.toString?.() || "";

    const html = await renderNotionMarkdown(raw);

    return { item: mapped, html };
  } catch (error) {
    console.error(`Error fetching ${type} by slug ${slug}:`, error);
    return { item: null, html: "" };
  }
}

export async function getPostBySlug(
  slug: string,
): Promise<{ post: ContentItem | null; html: string }> {
  const { item, html } = await getItemBySlug(slug, "blog");
  return { post: item, html };
}

export async function getProjectBySlug(
  slug: string,
): Promise<{ project: ContentItem | null; html: string }> {
  const { item, html } = await getItemBySlug(slug, "project");
  return { project: item, html };
}

export async function getPaperBySlug(
  slug: string,
): Promise<{ paper: ContentItem | null; html: string }> {
  const { item, html } = await getItemBySlug(slug, "paper");
  return { paper: item, html };
}

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";

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

    const html = await marked.parse(
      mdString.parent || mdString.toString?.() || "",
    );

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

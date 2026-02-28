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
  summary: string;
  type: ContentType;
  published: boolean;
}

const TYPE_SELECT_MAP: Record<ContentType, string> = {
  blog: "Blog",
  project: "Project",
  paper: "Paper",
};

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

  return {
    id: page.id,
    title: page.properties.Title?.title?.[0]?.plain_text || "Untitled",
    slug:
      page.properties.Slug?.rich_text?.[0]?.plain_text ||
      page.id,
    date:
      page.properties.Date?.date?.start ||
      new Date().toISOString().split("T")[0],
    summary:
      page.properties.Summary?.rich_text?.[0]?.plain_text || "",
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
        and: [
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
          {
            property: "Type",
            select: {
              equals: TYPE_SELECT_MAP[type],
            },
          },
        ],
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
      .filter(
        (item): item is ContentItem =>
          !!item && item.type === type
      );

    return items;
  } catch (error) {
    console.error(
      `Error fetching Notion items for type ${type}:`,
      error
    );
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

export async function getPostBySlug(
  slug: string
): Promise<{ post: ContentItem | null; html: string }> {
  const databaseId = import.meta.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    return { post: null, html: "" };
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Type",
            select: {
              equals: TYPE_SELECT_MAP.blog,
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) {
      return { post: null, html: "" };
    }

    const page: any = response.results[0];
    const mapped = mapPageToItem(page);

    if (!mapped || mapped.type !== "blog") {
      return { post: null, html: "" };
    }

    const mdblocks = await n2m.pageToMarkdown(page.id);
    const mdString: any = n2m.toMarkdownString(mdblocks);

    const html = await marked.parse(
      mdString.parent || mdString.toString?.() || ""
    );

    return { post: mapped, html };
  } catch (error) {
    console.error(`Error fetching post by slug ${slug}:`, error);
    return { post: null, html: "" };
  }
}


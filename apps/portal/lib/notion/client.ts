const NOTION_API_BASE = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

function getNotionHeaders(): HeadersInit {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) {
    throw new Error('NOTION_API_KEY is not set');
  }
  return {
    Authorization: `Bearer ${apiKey}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json',
  };
}

export async function queryNotionDatabase(
  databaseId: string,
  body: Record<string, unknown> = {}
): Promise<NotionDatabaseQueryResponse> {
  const response = await fetch(`${NOTION_API_BASE}/databases/${databaseId}/query`, {
    method: 'POST',
    headers: getNotionHeaders(),
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Notion API error (${response.status}): ${error}`);
  }

  return response.json();
}

// Notion property extraction helpers

export function getTitle(property: NotionProperty): string {
  if (property.type === 'title') {
    return property.title?.map((t) => t.plain_text).join('') ?? '';
  }
  return '';
}

export function getRichText(property: NotionProperty): string {
  if (property.type === 'rich_text') {
    return property.rich_text?.map((t) => t.plain_text).join('') ?? '';
  }
  return '';
}

export function getSelect(property: NotionProperty): string | null {
  if (property.type === 'select') {
    return property.select?.name ?? null;
  }
  return null;
}

export function getMultiSelect(property: NotionProperty): string[] {
  if (property.type === 'multi_select') {
    return property.multi_select?.map((s) => s.name) ?? [];
  }
  return [];
}

export function getUrl(property: NotionProperty): string | null {
  if (property.type === 'url') {
    return property.url ?? null;
  }
  return null;
}

export function getEmail(property: NotionProperty): string | null {
  if (property.type === 'email') {
    return property.email ?? null;
  }
  return null;
}

export function getFileUrl(property: NotionProperty): string | null {
  if (property.type === 'files' && property.files && property.files.length > 0) {
    const file = property.files[0];
    // Notion files can be either external URLs or Notion-hosted files
    if (file.type === 'external') return file.external?.url ?? null;
    if (file.type === 'file') return file.file?.url ?? null;
  }
  return null;
}

// Minimal Notion API types

export interface NotionDatabaseQueryResponse {
  results: NotionPage[];
  next_cursor: string | null;
  has_more: boolean;
}

export interface NotionPage {
  id: string;
  properties: Record<string, NotionProperty>;
}

export interface NotionProperty {
  type: string;
  title?: Array<{ plain_text: string }>;
  rich_text?: Array<{ plain_text: string }>;
  select?: { name: string } | null;
  multi_select?: Array<{ name: string }>;
  url?: string | null;
  email?: string | null;
  files?: Array<{
    type: 'external' | 'file';
    external?: { url: string };
    file?: { url: string };
  }>;
}

export interface Env {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
  NEXT_PUBLIC_FLAGSMITH_ENV_KEY: string;
  // Notion integration (server-side only — no NEXT_PUBLIC_ prefix)
  NOTION_API_KEY: string;
  NOTION_MEMBERS_DATABASE_ID: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

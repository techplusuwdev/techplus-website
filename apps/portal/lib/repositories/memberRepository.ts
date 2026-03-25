import {
  queryNotionDatabase,
  getTitle,
  getRichText,
  getSelect,
  getMultiSelect,
  getUrl,
  getEmail,
  getFileUrl,
  type NotionPage,
} from '../notion/client';

export interface MemberData {
  id: string;
  name: string;
  role: string;
  department: string | null;
  teams: string[];
  photo_url: string | null;
  linkedin: string | null;
  email: string | null;
}

// Maps a raw Notion page to a MemberData object.
// Property names below must match the column names in the Notion members database.
function mapNotionPageToMember(page: NotionPage): MemberData {
  const props = page.properties;

  return {
    id: page.id,
    name: getTitle(props['Name']),
    role: getRichText(props['Role']),
    department: getSelect(props['Department']),
    teams: getMultiSelect(props['Teams']),
    photo_url: getFileUrl(props['Photo']),
    linkedin: getUrl(props['LinkedIn']),
    email: getEmail(props['Email']),
  };
}

class MemberRepository {
  private get databaseId(): string {
    const id = process.env.NOTION_MEMBERS_DATABASE_ID;
    if (!id) {
      throw new Error('NOTION_MEMBERS_DATABASE_ID is not set');
    }
    return id;
  }

  async getAllMembers(): Promise<MemberData[]> {
    const response = await queryNotionDatabase(this.databaseId);
    return response.results.map(mapNotionPageToMember);
  }

  async getMembersByDepartment(department: string): Promise<MemberData[]> {
    const response = await queryNotionDatabase(this.databaseId, {
      filter: {
        property: 'Department',
        select: { equals: department },
      },
    });
    return response.results.map(mapNotionPageToMember);
  }
}

export const memberRepository = new MemberRepository();

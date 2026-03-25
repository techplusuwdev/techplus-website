import { NextRequest, NextResponse } from 'next/server';
import { memberService } from '@/lib/services/memberService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get('department');

    const result = department
      ? await memberService.getMembersByDepartment(department)
      : await memberService.getAllMembers();

    if (result.success) {
      return NextResponse.json({ success: true, data: result.data });
    }

    return NextResponse.json(
      { error: result.error || 'Failed to get members' },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

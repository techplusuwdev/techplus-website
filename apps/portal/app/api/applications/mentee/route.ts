import { NextRequest, NextResponse } from 'next/server';
import { applicationService } from '@/lib/services/applicationService';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const result = await applicationService.submitMenteeApplication({
      ...body,
      user_id: user.id,
      profile_id: user.id,
    });

    if (result.success) {
      return NextResponse.json({ success: true, data: result.data });
    }

    return NextResponse.json(
      { error: result.error || 'Failed to submit application' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const result = await applicationService.getMenteeApplication(user.id);

    if (result.success) {
      return NextResponse.json({ success: true, data: result.data });
    }

    return NextResponse.json(
      { error: result.error || 'Failed to get application' },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

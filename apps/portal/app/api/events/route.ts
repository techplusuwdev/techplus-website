import { NextRequest, NextResponse } from 'next/server';
import { eventService } from '@/lib/services/eventService';

export async function GET(request: NextRequest) {
  try {
    const result = await eventService.getAllEvents();

    if (result.success) {
      return NextResponse.json({ success: true, data: result.data });
    }

    return NextResponse.json(
      { error: result.error || 'Failed to get events' },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      activities: [
        { id: 1, type: 'login', message: 'User logged in', timestamp: new Date().toISOString() },
        { id: 2, type: 'update', message: 'Profile updated', timestamp: new Date().toISOString() },
        { id: 3, type: 'create', message: 'New project created', timestamp: new Date().toISOString() },
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

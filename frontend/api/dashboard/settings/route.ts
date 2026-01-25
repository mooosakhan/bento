import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      notifications: true,
      emailUpdates: false,
      theme: 'light',
      language: 'en',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const settings = await request.json();
    
    return NextResponse.json({
      message: 'Settings updated successfully',
      settings: settings,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

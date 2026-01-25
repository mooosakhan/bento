import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Read the registered persons data
    const dataPath = path.join(process.cwd(), 'public', 'data', 'registered-persons.json');
    const fileData = fs.readFileSync(dataPath, 'utf-8');
    const persons = JSON.parse(fileData);

    // Calculate today's stats
    let totalMarked = 0;
    let byVolunteer = 0;

    persons.forEach((person: any) => {
      if (person.attendance && person.attendance[today]?.marked) {
        totalMarked++;
      }
    });

    // Get current volunteer's stats (in a real app, use auth context)
    // For now, we'll return the first volunteer's count
    const volunteer = persons.find((p: any) => p.type === 'volunteer');
    if (volunteer) {
      byVolunteer = volunteer.totalAttendanceMarked || 0;
    }

    return NextResponse.json({
      totalMarked,
      byVolunteer,
      date: today,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

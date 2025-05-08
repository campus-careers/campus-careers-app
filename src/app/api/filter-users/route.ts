import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Adjust the path if your prisma file is located elsewhere

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const skill = searchParams.get('skill');
  const location = searchParams.get('location');

  try {
    const users = await prisma.student.findMany({
      where: {
        AND: [
          skill ? { skills: { has: skill } } : {},
          location ? { location } : {},
        ],
      },
      select: {
        id: true,
        name: true,
        image: true,
        skills: true,
        location: true,
        companies: true,
        interviews: true,
      },
    });

    // Convert id from Int to string if needed
    const formattedUsers = users.map((user) => ({
      ...user,
      id: user.id.toString(),
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('[FILTER-USER-API] Error:', error);
    return NextResponse.json({ error: 'Failed to fetch filtered users' }, { status: 500 });
  }
}

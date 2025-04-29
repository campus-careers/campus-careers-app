/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { Locations } from '@prisma/client';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, major, skills, interests, location, portfolio } = body;

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        major,
        skills: Array.isArray(skills) ? skills : skills.split(',').map((s: string) => s.trim()),
        interests: Array.isArray(interests) ? interests : interests.split(',').map((i: string) => i.trim()),
        location: location as Locations,
        portfolio,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Failed to update profile:', error);
    return NextResponse.json({ error: 'Update failed', details: error }, { status: 500 });
  }
}

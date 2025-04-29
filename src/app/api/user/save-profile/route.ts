/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { Locations } from '@prisma/client'; // ✅ only Locations needed

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, major, skills, interests, location, portfolio } = body;

    // Validate location properly
    if (!Object.values(Locations).includes(location)) {
      return NextResponse.json({ success: false, error: 'Invalid location' }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        major,
        skills: skills.split(',').map((s: string) => s.trim()),
        interests: interests.split(',').map((i: string) => i.trim()),
        location: location as Locations,
        portfolio,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('❌ Error saving profile:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
};

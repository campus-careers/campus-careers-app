/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { Locations } from '@prisma/client';

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, major, skills, interests, location, portfolio } = body;

    const trimmedLocation = location.trim();
    const validLocations = Object.values(Locations) as string[];

    if (!validLocations.includes(trimmedLocation)) {
      return NextResponse.json({ success: false, error: 'Invalid location' }, { status: 400 });
    }

    // 🔥 Update User table
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        major,
        skills: skills.map((s: string) => s.trim()),
        interests: interests.map((i: string) => i.trim()),
        location: trimmedLocation as Locations,
        portfolio,
      },
    });

    // 🔥 Update or create in Student table
    await prisma.student.upsert({
      where: { email: session.user.email },
      update: {
        name,
        skills: skills.map((s: string) => s.trim()),
        interests: interests.map((i: string) => i.trim()),
        location: trimmedLocation,
        image: updatedUser.image,
        companies: [],
        interviews: [],
      },
      create: {
        name,
        email: session.user.email,
        skills: skills.map((s: string) => s.trim()),
        interests: interests.map((i: string) => i.trim()),
        location: trimmedLocation,
        image: updatedUser.image,
        companies: [],
        interviews: [],
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('❌ Error saving profile:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
};

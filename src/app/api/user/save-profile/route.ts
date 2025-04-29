/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { Locations, Skill } from '@prisma/client'; // 🛠 import Skill enum too

export const POST = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, major, skills, interests, location, portfolio } = body;

    // 🛠 Validate skills and location
    const validSkills = (skills.split(',')
      .map((s: string) => s.trim()) as Skill[])
      .filter((skill) => Object.values(Skill).includes(skill as Skill));

    const validLocation = Object.values(Locations).includes(location as Locations)
      ? (location as Locations)
      : Locations.Remote; // fallback to "Remote" if invalid

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        major,
        skills: validSkills,
        interests: interests.split(',').map((i: string) => i.trim()),
        location: validLocation,
        portfolio,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('❌ Error saving profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};

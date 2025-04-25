/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { Skill, Locations } from '@prisma/client';

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const {
    name,
    major,
    skills,
    interests,
    location,
    portfolio,
  }: {
    name: string;
    major: string;
    skills: string;
    interests: string;
    location: string;
    portfolio: string;
  } = body;

  const updatedUser = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name,
      major,
      skills: skills.split(',').map((s) => s.trim() as Skill),
      interests: interests.split(',').map((i) => i.trim()),
      location: location as Locations,
      portfolio,
    },
  });

  return NextResponse.json({ success: true, user: updatedUser });
};

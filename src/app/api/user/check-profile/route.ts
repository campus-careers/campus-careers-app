/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ hasProfile: false }, { status: 200 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        name: true,
        major: true,
        skills: true,
        interests: true,
        location: true,
        portfolio: true,
      },
    });

    const hasProfile = Boolean(
      user?.name
      && user?.major
      && user?.skills?.length
      && user?.interests?.length
      && user?.location
      && user?.portfolio,
    );

    return NextResponse.json({ hasProfile });
  } catch (error) {
    console.error('❌ check-profile route error:', error);
    return NextResponse.json({ hasProfile: false }, { status: 200 });
  }
}

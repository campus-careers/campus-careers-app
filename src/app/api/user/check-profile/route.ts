/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // <-- ✅ Add this

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ hasProfile: false }, { status: 401 });
  }

  const student = await prisma.student.findUnique({
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
    student?.name
    && student?.major
    && student?.skills?.length
    && student?.interests?.length
    && student?.location
    && student?.portfolio,
  );

  return NextResponse.json({ hasProfile });
}

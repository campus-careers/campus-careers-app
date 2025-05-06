// api/get-user/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const student = await prisma.student.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      location: true,
      skills: true,
      interests: true,
      portfolio: true,
      image: true,
      major: true,
    },
  });

  if (!student) {
    return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, user: student });
}

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || session.user.email !== 'admin@foo.com') {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const students = await prisma.student.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        skills: true,
        interests: true,
        location: true,
        companies: true,
        interviews: true,
      },
    });

    return NextResponse.json({ success: true, students });
  } catch (error) {
    console.error('❌ Failed to fetch students:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch students' },
      { status: 500 },
    );
  }
}

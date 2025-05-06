import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const data = await req.json();

  const studentData = {
    email: session.user.email,
    name: data.name || '',
    major: data.major || '',
    location: data.location || '',
    skills: data.skills || [],
    interests: data.interests || [],
    portfolio: data.portfolio || '',
    companies: [],
    interviews: [],
    image: typeof session.user.image === 'string' ? session.user.image : 'default.png',
  };

  try {
    const existing = await prisma.student.findUnique({
      where: { email: session.user.email },
    });

    if (existing) {
      await prisma.student.update({
        where: { email: session.user.email },
        data: studentData,
      });
    } else {
      await prisma.student.create({ data: studentData });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error saving student profile:', error);
    return NextResponse.json({ success: false, error: 'Failed to save profile' }, { status: 500 });
  }
}

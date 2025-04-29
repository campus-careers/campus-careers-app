/* eslint-disable import/prefer-default-export */
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('⚠️ Database error in API:', error);
    return NextResponse.json({ error: 'Database temporarily unavailable' }, { status: 503 });
  }
}


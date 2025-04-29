/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    console.error('🔥 Prisma error:', error);

    return NextResponse.json({
      error: {
        message: error.message,
        stack: error.stack,
        code: error.code,
        clientVersion: error.clientVersion,
      },
    }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message } = body;

  console.log('📩 New Contact Message:', { name, email, message });

  return NextResponse.json({ success: true });
}

export async function GET() {
  return NextResponse.json({ message: 'Contact route is working' });
}

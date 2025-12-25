import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  
  // Password stored in Vercel environment variables
  const correctPassword = process.env.PIPER_SECRET_PASSWORD || 'piper2025';
  
  if (password === correctPassword) {
    // Generate a simple session token
    const token = Buffer.from(`piper:${Date.now()}`).toString('base64');
    return NextResponse.json({ success: true, token });
  }
  
  return NextResponse.json({ success: false, message: 'Wrong password!' }, { status: 401 });
}

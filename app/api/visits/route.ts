import { NextResponse } from 'next/server';

export async function GET() {
  // Visitor counter stub - returns placeholder values
  // In production, connect to Upstash Redis
  return NextResponse.json({
    today: 0,
    total: 0,
    message: 'Visitor counter ready — connect Upstash Redis via UPSTASH_REDIS_REST_URL env var'
  });
}

export async function POST() {
  // Increment visitor count stub
  return NextResponse.json({ success: true });
}

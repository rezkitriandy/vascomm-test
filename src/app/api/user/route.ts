import { users } from '@/lib/dummyData';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(users);
}

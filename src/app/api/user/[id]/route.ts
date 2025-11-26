// app/api/user/[id]/route.ts
import { users } from '@/lib/dummyData';
import { NextResponse } from 'next/server';

interface IParams {
  params: { id: string };
}

export async function GET(_: Request, { params }: IParams) {
  const user = users.find((u) => u.id === params.id);

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

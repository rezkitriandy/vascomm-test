import { dummyUsers } from '@/lib/dummyData';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = dummyUsers.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ success: true, user });
  response.cookies.set(
    'currentUser',
    JSON.stringify({
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    }),
    {
      httpOnly: false,
      path: '/',
    },
  );

  return response;
}

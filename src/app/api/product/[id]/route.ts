// app/api/user/[id]/route.ts
import { products } from '@/lib/dummyData';
import { NextResponse } from 'next/server';

interface IParams {
  params: { id: string };
}

export async function GET(_: Request, { params }: IParams) {
  const product = products.find((u) => u.id === params.id);

  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

import { prisma } from '../prismaClient'
import { NextResponse } from 'next/server';

export const GET = async () => {
  const data = await prisma.toppings.findMany({
    orderBy: {
      id: 'asc'
    }
  })
  await prisma.$disconnect();
  return NextResponse.json({ data })
};

export const POST = async (req) => {
  // for whoever reads this, apparently you can't make a DELETE handler in Next.js 13.4:
  // https://github.com/vercel/next.js/discussions/48072
  // much time was wasted. thisIsFine.jpeg
  const isDelete = req.headers.get('x-http-method-override') === 'DELETE'
  if (isDelete) {
    const { ids } = await req.json()
    const data = await prisma.toppings.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
    await prisma.$disconnect();
    return NextResponse.json({ data })
  } else {
    const body = await req.json();
    const data = await prisma.toppings.create({ data: body })
    await prisma.$disconnect();
    return NextResponse.json({ data })
  }
}

export const PUT = async (req) => {
  const { id, name } = await req.json();
  const data = await prisma.toppings.update({
    where: { id },
    data: { name },
  })
  await prisma.$disconnect();
  return NextResponse.json({ data })
}

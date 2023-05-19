import { NextResponse } from 'next/server';
import { prisma } from '../prismaClient';

export const GET = async () => {
  const data = await prisma.pizzas.findMany({
    orderBy: {
      id: 'asc',
    },
    include: {
      toppings: true,
    },
  });
  await prisma.$disconnect();
  return NextResponse.json({ data });
};

export const POST = async (req) => {
  // see src/app/api/toppings/route.js:11
  const isDelete = req.headers.get('x-http-method-override') === 'DELETE';
  if (isDelete) {
    const { id } = await req.json();
    const data = await prisma.pizzas.delete({
      where: {
        id,
      },
    });
    await prisma.$disconnect();
    return NextResponse.json({ data });
  }
  const body = await req.json();
  const data = await prisma.pizzas.create({
    data: {
      name: body.data.name,
      toppings: {
        connect: body.data.toppings,
      },
    },
  });
  await prisma.$disconnect();
  return NextResponse.json({ data });
};

export const PUT = async (req) => {
  const { id, name, toppings } = await req.json();

  const data = await prisma.pizzas.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(toppings && {
        toppings: {
          set: toppings,
        },
      }),
    },
  });
  await prisma.$disconnect();
  return NextResponse.json({ data });
};

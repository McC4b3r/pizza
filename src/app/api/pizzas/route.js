import { prisma } from '../prismaClient'
import { NextResponse } from 'next/server';

export const GET = async () => {
  const data = await prisma.pizzas.findMany({
    include: {
      toppings: true,
    }
  });
  await prisma.$disconnect();
  return NextResponse.json({ data });
};

export const POST = async (req) => {
  // see src/app/api/toppings/route.js:11
  const isDelete = req.headers.get('x-http-method-override') === 'DELETE';
  if (isDelete) {
    const { id } = await req.json()
    const data = await prisma.pizzas.delete({
      where: {
        id
      }
    })
    await prisma.$disconnect();
    return NextResponse.json({ data });
  } else {
    const body = await req.json();
    console.log({ body });
    const data = await prisma.pizzas.create({
      data: {
        name: body.data.name,
        toppings: {
          connect: body.data.toppings
        }
      }
    });
    await prisma.$disconnect();
    return NextResponse.json({ data });
  }
}

export const PUT = async (req) => {
  const { id, name, toppings } = await req.json();
  console.log({ toppings })

  const data = await prisma.pizzas.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(toppings && {
        toppings: {
          set: toppings.map(toppingId => ({ id: toppingId })),
        },
      }),
    },
  });
  await prisma.$disconnect();
  return NextResponse.json({ data });
}

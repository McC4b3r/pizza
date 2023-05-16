import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export const GET = async () => {
  const data = await prisma.pizzas.findMany({
    include: {
      toppings: true,
    }
  })
  return NextResponse.json({ data })
};

export const POST = async (req) => {
  // for whoever reads this, apparently you can't make a DELETE handler in Next.js 13.4:
  // https://github.com/vercel/next.js/discussions/48072
  // much time was wasted. thisIsFine.jpeg
  const isDelete = req.headers.get('x-http-method-override') === 'DELETE'
  if (isDelete) {
    // const { ids } = await req.json()
    // const data = await prisma.toppings.deleteMany({
    //   where: {
    //     id: {
    //       in: ids
    //     }
    //   }
    // })
    return NextResponse.json({ data })
  } else {
    const body = await req.json();
    console.log({ body })
    const data = await prisma.pizzas.create({
      data: {
        name: body.data.name,
        toppings: {
          connect: body.data.toppings
        }
      }
    })
    console.log(data);
    return NextResponse.json({ data })
  }
}
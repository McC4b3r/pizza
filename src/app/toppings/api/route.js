import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async() => {
  const data = await prisma.toppings.findMany()
  console.log({data: data})
  return {"key": "fuck"};
};

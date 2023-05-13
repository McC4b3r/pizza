import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export const GET = async() => {
  const data = await prisma.toppings.findMany()
  return NextResponse.json({ data })
};

export const POST = async (req) => {
  const body = await req.json();
  const data = await prisma.toppings.create({data: body})
  return NextResponse.json({ data })
}

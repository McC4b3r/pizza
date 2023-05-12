import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export const POST = async (req, {params: { name }}) => {
    const data = await prisma.toppings.create({
      data: {
        name
      }
    })
    return NextResponse.json({ data })
  }
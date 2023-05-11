import { NextResponse } from 'next/server';
import { createEdgeRouter } from "next-connect";
import pool from '../../../../db';

const router = createEdgeRouter();

export async function GET() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM TOPPINGS');
    const data = result.rows;
    return NextResponse.json({ data });
  } finally {
    client.release();
  }
}

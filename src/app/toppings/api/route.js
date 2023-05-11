import { createEdgeRouter } from "next-connect";
import pool from '../../../../db';
import { NextResponse } from "next/server";

const router = createEdgeRouter();

router
  .get(async () => {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM TOPPINGS');
      const data = result.rows;
      return NextResponse.json({data});
    } finally {
      client.release();
    }
  })

export async function GET(request, ctx) {
  return router.run(request, ctx);
};

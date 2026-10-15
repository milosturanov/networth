import { pool } from "@/lib/db";

export async function LoadCurrencies() {
  const result = await pool.query(`
        SELECT DISTINCT id from Currency
        `);

  return result.rows;
}

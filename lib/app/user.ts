"use server";

import { pool } from "../db";

export async function LoadUser(userId: number) {
  const result = await pool.query(
    `
    SELECT
     U.id,
     U.name,
     C.id as "currencyCode",
     C.name as "currencyName"
    FROM Users U JOIN Currency C
    ON U.currencyId = C.id
    WHERE U.id = $1`,
    [userId],
  );

  return result.rows[0];
}

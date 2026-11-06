"use server";

import { pool } from "../db";

export async function LoadUser(userId: number) {
  const result = await pool.query(
    `
    SELECT
     id,
     name,
     currencyid as "currencyId",
     networthgoal as "networthGoal"
    FROM Users
    WHERE id =$1`,
    [userId],
  );

  return result.rows[0];
}

export async function UpdateNetworthGoal(userId: number, nextGoal: number) {
  await pool.query(
    `
    UPDATE Users
    SET NetworthGoal = $1
    WHERE id = $2
    `,
    [nextGoal, userId],
  );
}

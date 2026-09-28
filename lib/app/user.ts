"use server";

import { pool } from "../db";

export async function LoadUser(userId: number) {
  const result = await pool.query("SELECT * FROM Users WHERE id = $1", [
    userId,
  ]);

  return result.rows[0];
}

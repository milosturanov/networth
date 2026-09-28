"use server";

import { pool } from "../db";

export async function LoadCategories() {
  const result = await pool.query(`
    SELECT * FROM Category
    `);

  return result.rows;
}

export async function LoadCategoryOverview(userId: number) {
  const result = await pool.query(
    `
    SELECT
      C.Name as "categoryName",
      sum(T.amount) as "transactionAmount"
      FROM Transaction T
      JOIN Category C ON T.categoryId = C.id
      WHERE T.userId = $1
      GROUP BY C.id, C.Name
    `,
    [userId],
  );

  try {
    return result.rows;
  } catch {
    return false;
  }
}

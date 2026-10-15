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
	    sum(Round(T.amount * (SELECT Rate from ExchangeRate WHERE secondCurrencyId = (SELECT currencyId FROM Users WHERE id = $1) AND firstCurrencyId = A.currencyId),2)) as "categorySpentAmount",
	    (SELECT CurrencyId FROM USERS WHERE id = $1) as "userCurrencyId",
      C.hexCode as "hexCode"
    FROM Transaction T
    JOIN Account A ON T.accountId = A.id
    JOIN Category C ON T.CategoryId = C.id
    WHERE T.userid = $1
    GROUP BY C.id
    `,
    [userId],
  );

  try {
    return result.rows;
  } catch {
    return false;
  }
}

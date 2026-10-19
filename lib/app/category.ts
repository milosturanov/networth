"use server";

import { pool } from "../db";

export async function LoadCategories() {
  const result = await pool.query(`
    SELECT * FROM Category
    `);

  return result.rows;
}

export async function LoadCategoryOverview(userId: number, period: number) {
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
    WHERE T.userid = $1 AND T.CreatedAt < CURRENT_DATE AND (CURRENT_DATE - T.CreatedAt::DATE) < $2
    GROUP BY C.id
    `,
    [userId, period],
  );

  try {
    return result.rows;
  } catch {
    return false;
  }
}

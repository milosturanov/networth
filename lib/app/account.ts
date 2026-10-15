"use server";

import { pool } from "../db";
import { redirect } from "next/navigation";

export async function LoadAccounts(userId: number) {
  const result = await pool.query(
    `SELECT 
        A.id,
        A.name,
        A.balance,
        C.id as CurrencyId,
        ( SELECT Rate From ExchangeRate WHERE firstCurrencyId = A.currencyId AND secondCurrencyId = (SELECT currencyId FROM Users WHERE id = $1)) as Rate
    FROM Account A 
    JOIN Currency C ON A.currencyId = C.id
    WHERE userId = $1 ORDER BY A.id asc`,
    [userId],
  );

  try {
    return result.rows;
  } catch {
    return [];
  }
}

export async function CreateNewAccount(
  userId: number,
  accountName: string,
  currencyId: string,
) {
  await pool.query(
    "INSERT INTO Account(userId, name, currencyId) values($1,$2,$3)",
    [userId, accountName, currencyId],
  );
}

export async function AccountRebalance(accountId: number) {
  await pool.query(
    `
    UPDATE Account
      SET balance = (
	      (SELECT COALESCE(SUM(amount),0) FROM Transaction WHERE accountId = $1 AND TransactionTypeId = 'INC')
	      -
	      (SELECT COALESCE(SUM(amount),0) FROM Transaction WHERE accountId = $1 AND TransactionTypeId = 'EXP'))
	      WHERE id = $1
    `,
    [accountId],
  );
}

export async function CalculateNetworth(userId: number) {
  // Sum of all accounts = networth ( balance * rate cuz different currencies )
  const result = await pool.query(
    `
    SELECT
	    sum(A.balance * ER.Rate)
    FROM Account A JOIN
    ExchangeRate ER ON A.currencyId = ER.firstCurrencyId 
    WHERE A.userId = $1 AND ER.secondCurrencyId = ( SELECT currencyId FROM Users WHERE id = $1)
    `,
    [userId],
  );

  return result.rows[0];
}

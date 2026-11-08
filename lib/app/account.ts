"use server";

import { pool } from "../db";

export async function LoadAccounts(userId: number) {
  const result = await pool.query(
    `SELECT 
        A.id,
        A.name,
        A.balance,
        C.id as "currencyId",
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

export async function LoadAccountsById(userId: number) {
  const result = await pool.query(
    `SELECT 
        id,
        userid as "userId",
        name,
        balance,
        createdat as "createdAt",
        currencyid as "currencyId",
        hexcode as "hexCode",
        ( SELECT Rate From ExchangeRate WHERE firstCurrencyId = currencyid AND secondCurrencyId = (SELECT currencyId FROM Users WHERE id = $1)) as Rate
    FROM Account
    WHERE userId = $1 ORDER BY id asc`,
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
	      (SELECT COALESCE(SUM(amount),0) 
        FROM Transaction T JOIN Category C ON T.categoryid = C.id
        WHERE accountId = $1 AND C.categorytype = 'INC')
	      -
	      (SELECT COALESCE(SUM(amount),0) 
        FROM Transaction T JOIN Category C ON T.categoryid = C.id
        WHERE accountId = $1 AND C.categorytype = 'EXP'))
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

export async function NetworthLastSixMonths(userId: number) {
  const result = await pool.query(
    `
    WITH NetworthReport as (
    WITH MonthlyBalance as ( SELECT 
	    EXTRACT(YEAR FROM T.CreatedAt) as YEAR,
	    EXTRACT(MONTH FROM T.CreatedAt) as MONTH,
	    sum(
		    CASE
			    WHEN C.categorytype = 'INC' THEN (T.Amount * (SELECT Rate FROM ExchangeRate WHERE firstCurrencyid = A.currencyId AND secondCurrencyId = (SELECT currencyId FROM Users where id = $1)))
			    WHEN C.categorytype = 'EXP' THEN (-T.Amount * (SELECT Rate FROM ExchangeRate WHERE firstCurrencyid = A.currencyId AND secondCurrencyId = (SELECT currencyId FROM Users where id = $1)))
			    ELSE 0
		    END
	        ) as Difference
    FROM Transaction T 
    JOIN Category C ON T.CategoryId = C.id
    JOIN Account A ON T.accountid = A.id
    WHERE T.Userid = $1
    GROUP BY EXTRACT(YEAR FROM T.CreatedAt),EXTRACT(MONTH FROM T.CreatedAt))

    SELECT 
      YEAR,
      MONTH,
      SUM(difference) OVER (
        ORDER BY YEAR, MONTH
      ) as NetWorth,
      TRUE as "isUser"
    FROM MonthlyBalance
    ORDER BY YEAR desc, MONTH desc
    LIMIT 6)
    
    SELECT * FROM NetworthReport
    ORDER BY YEAR, MONTH ASC
    `,
    [userId],
  );

  return result.rows;
}

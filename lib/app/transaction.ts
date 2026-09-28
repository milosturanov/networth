"use server";

import { pool } from "../db";
import { AccountRebalance } from "./account";

export async function SubmitTransaction(
  name: string,
  userId: number,
  transactionTypeId: string,
  categoryId: number,
  accountId: number,
  amount: number,
) {
  await pool.query(
    "INSERT INTO Transaction(name,userId,transactionTypeId,categoryId,accountId,amount) VALUES($1,$2,$3,$4,$5,$6)",
    [name, userId, transactionTypeId, categoryId, accountId, amount],
  );
  await AccountRebalance(userId, accountId);
}

export async function LoadTransactions(userId: number) {
  const result = await pool.query(
    `
    SELECT 
    T.id as TransactionId,
    T.Name as TransactionName,
    T.CreatedAt as CreatedAt,
    A.Name as AccountName,
    T.Amount as Amount
    FROM Transaction T JOIN
    Account A ON T.accountId = A.id
    WHERE T.userId = $1
    ORDER BY CreatedAt desc`,
    [userId],
  );

  return result.rows;
}

export async function LoadTransactionDetails(transactionId: number) {
  const result = await pool.query(
    `
    SELECT 
      T.id as TransactionId,
      T.Name as TransactionName,
      T.CreatedAt as CreatedAt,
      A.Name as AccountName,
	    C.Name as CategoryName,
      T.Amount as Amount
    FROM Transaction T JOIN
    Account A ON T.accountId = A.id 
	  JOIN Category C ON T.CategoryId = C.id
    WHERE T.id = $1
  `,
    [transactionId],
  );

  return result.rows[0];
}

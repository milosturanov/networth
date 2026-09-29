"use server";

import { pool } from "../db";
import { redirect } from "next/navigation";

export async function CreateAccount(id: number) {
  pool.query(
    "INSERT INTO Account(userId, name) VALUES($1,'Cash'), VALUES($2,'Card')",
    [id, id],
  );
}

export async function LoadAccounts(userId: number) {
  const result = await pool.query(
    "SELECT * FROM Account WHERE userId = $1 ORDER BY id asc",
    [userId],
  );

  try {
    return result.rows;
  } catch {
    return [];
  }
}

export async function CreateNewAccount(userId: number, accountName: string) {
  await pool.query("INSERT INTO Account(userId, name) values($1,$2)", [
    userId,
    accountName,
  ]);

  redirect("/dashboard/accounts");
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

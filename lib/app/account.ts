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

export async function AccountRebalance(userId: number, accountId: number) {
  console.log(userId, accountId);
  await pool.query(
    `
    UPDATE ACCOUNT
    SET balance = ((SELECT sum(amount) FROM Transaction WHERE userId = $1 AND transactionTypeId = 'INC' AND accountId = $2) - (SELECT COALESCE(sum(amount), 0) FROM Transaction WHERE userId = $3 AND transactionTypeId = 'EXP' AND accountId = $4))
    WHERE id = $5
    `,
    [userId, accountId, userId, accountId, accountId],
  );

  redirect("/dashboard");
}

"use server";
import crypto from "crypto";

import { pool } from "./db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function RegisterUser(username: string, password: string) {
  const result = await pool.query(
    "INSERT INTO Users(name,password_hash) VALUES($1, $2) RETURNING id",
    [username, password],
  );

  const userId = result.rows[0].id;

  await CreateAccount(userId);
  await CreateSession(userId);

  redirect("/dashboard");
}

export async function LoginUser(username: string, password: string) {
  const CookieStore = await cookies();

  const sessionToken = CookieStore.get("session_token")?.value;

  if (sessionToken) {
    redirect("/dashboard");
  }

  const { rows } = await pool.query("SELECT * FROM Users WHERE name = $1", [
    username,
  ]);

  const { id, password_hash, name } = rows[0];

  if (password === password_hash) {
    CreateSession(id);
    console.log("Login successful");
    redirect("/dashboard");
  } else {
    console.log("Login unsuccessful");
  }
}

async function CreateSession(id: number) {
  const experiesAt = new Date();
  experiesAt.setDate(experiesAt.getDate() + 14);

  const sessionToken = crypto.randomBytes(32).toString("hex");

  pool.query(
    "INSERT INTO Session(userId,sessionToken,experiesAt) VALUES($1,$2,$3)",
    [id, sessionToken, experiesAt],
  );

  const cookieStore = await cookies();

  cookieStore.set("session_token", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: experiesAt,
    path: "/",
  });
}

async function CreateAccount(id: number) {
  pool.query("INSERT INTO Account(userId, name) VALUES($1,'Cash')", [id]);
  pool.query("INSERT INTO Account(userId, name) VALUES($1,'Card')", [id]);
}

export async function GetSession(sessionToken: string) {
  const now = new Date();
  const { rows } = await pool.query(
    "SELECT userId FROM Session WHERE sessionToken = $1 AND experiesAt > $2",
    [sessionToken, now],
  );

  return rows[0].userid;
}

export async function CheckSession() {
  const CookieStore = await cookies();

  const sessionToken = CookieStore.get("session_token")?.value;

  const now = new Date();
  const { rows } = await pool.query(
    "SELECT userId FROM Session WHERE sessionToken = $1 AND experiesAt > $2",
    [sessionToken, now],
  );

  if (!rows[0]) {
    return;
  } else {
    return rows[0];
  }
}

export async function LoadUser(userId: number) {
  const result = await pool.query("SELECT * FROM Users WHERE id = $1", [
    userId,
  ]);

  return result.rows[0];
}

export async function LoadAccounts(userId: number) {
  const results = await pool.query(
    "SELECT * FROM Account WHERE userId = $1 ORDER BY id asc",
    [userId],
  );

  return results.rows;
}

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
  await AccountBalanceRecalculate(userId, accountId);
}

export async function AccountBalanceRecalculate(
  userId: number,
  accountId: number,
) {
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

export async function SignOut() {
  const CookieStore = await cookies();

  const sessionToken = CookieStore.get("session_token")?.value;

  await pool.query(
    `
    DELETE FROM Session
    WHERE sessionToken = $1
    `,
    [sessionToken],
  );

  CookieStore.delete("session_token");

  redirect("/login");
}

export async function GetTransaction(userId: number) {
  const result = await pool.query(
    `
    SELECT 
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

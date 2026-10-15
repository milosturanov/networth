"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { pool } from "../db";

import { CreateNewAccount } from "../app/account";
import { CreateSession } from "./session";

export async function Register(
  username: string,
  password: string,
  currencyId: string,
) {
  const result = await pool.query(
    "INSERT INTO Users(name,password_hash,currencyId) VALUES($1, $2, $3 ) RETURNING id",
    [username, password, currencyId],
  );

  const userId = result.rows[0].id;

  await CreateNewAccount(userId, "CASH ACCOUNT", currencyId);
  await CreateNewAccount(userId, "BANK ACCOUNT", currencyId);
  await CreateSession(userId);

  redirect("/dashboard");
}

export async function Login(username: string, password: string) {
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

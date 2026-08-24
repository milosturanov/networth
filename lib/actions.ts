"use server";
import crypto from "crypto";

import { pool } from "./db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function RegisterUser(username: string, password: string) {
  await pool.query("INSERT INTO Users(name,password_hash) VALUES($1, $2)", [
    username,
    password,
  ]);
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

export async function GetSession(sessionToken: string) {
  const now = new Date();
  const { rows } = await pool.query(
    "SELECT userId FROM Session WHERE sessionToken = $1 AND experiesAt > $2",
    [sessionToken, now],
  );

  return rows[0].userId;
}

export async function CheckSession() {
  const CookieStore = await cookies();

  const sessionToken = CookieStore.get("session_token")?.value;

  const now = new Date();
  const { rows } = await pool.query(
    "SELECT userId FROM Session WHERE sessionToken = $1 AND experiesAt > $2",
    [sessionToken, now],
  );

  return rows[0].userId;
}

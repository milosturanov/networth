"use server";

import crypto from "crypto";
import { pool } from "../db";
import { cookies } from "next/headers";

export async function CreateSession(id: number) {
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

export async function GetSession() {
  const now = new Date();
  const CookieStore = await cookies();
  const sessionToken = CookieStore.get("session_token")?.value;

  const { rows } = await pool.query(
    "SELECT userId FROM Session WHERE sessionToken = $1 AND experiesAt > $2",
    [sessionToken, now],
  );
  try {
    return rows[0].userid;
  } catch {
    return false;
  }
}

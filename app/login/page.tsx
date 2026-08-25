"use server";

import { CheckSession } from "@/lib/actions";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Login() {
  const userId = await CheckSession();

  const CookieStored = await cookies();

  const sessionToken = CookieStored.get("session_token")?.value;

  if (!sessionToken) {
  } else {
    redirect("/dashboard");
  }

  if (!userId) {
  } else {
    redirect("/dashboard");
  }

  return <LoginForm />;
}

"use server";

import { GetSession } from "@/lib/auth/session";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";

export default async function Login() {
  const userId = await GetSession();

  if (userId) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}

"use server";

import { CheckSession } from "@/lib/actions";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";

export default async function Login() {
  const userId = CheckSession();

  if (!userId) {
  } else {
    redirect("/dashboard");
  }

  return <LoginForm />;
}

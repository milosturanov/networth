"use server";
import { GetSession } from "@/lib/actions";
import SignUpForm from "./SignUpForm";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const userId = await GetSession();

  if (userId) {
    redirect("/dashboard");
  }

  return <SignUpForm />;
}

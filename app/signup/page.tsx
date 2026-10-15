"use server";
import { GetSession } from "@/lib/auth/session";
import SignUpForm from "./SignUpForm";
import { redirect } from "next/navigation";
import { LoadCurrencies } from "@/lib/app/currency";

export default async function SignUp() {
  const userId = await GetSession();

  if (userId) {
    redirect("/dashboard");
  }

  const Currencies = await LoadCurrencies();

  return <SignUpForm currencies={Currencies} />;
}

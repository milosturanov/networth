"use server";

import AccountsClient from "./accountsClient";
import { GetSession, LoadAccounts } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Accounts() {
  const userId = await GetSession();

  if (!userId) {
    redirect("/login");
  }

  const Accounts = await LoadAccounts(userId);

  return <AccountsClient accounts={Accounts} />;
}

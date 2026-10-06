"use server";

import AccountsClient from "./accountsClient";

import { GetSession } from "@/lib/auth/session";
import { LoadAccounts } from "@/lib/app/account";
import { LoadUser } from "@/lib/app/user";

import { redirect } from "next/navigation";

export default async function Accounts() {
  const userId = await GetSession();

  if (!userId) {
    redirect("/login");
  }

  const Accounts = await LoadAccounts(userId);
  const UserInfo = await LoadUser(userId);

  return <AccountsClient accounts={Accounts} userInfo={UserInfo} />;
}

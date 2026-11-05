"use server";

import SubmitTransactionClient from "./submitTransactionClient";

import { redirect } from "next/navigation";

import { LoadCategories } from "@/lib/app/category";
import { LoadAccounts, LoadAccountsById } from "@/lib/app/account";
import { GetSession } from "@/lib/auth/session";

export default async function SubmitTransaction() {
  const userId = await GetSession();

  if (!userId) {
    redirect("/login");
  }

  const Categories = await LoadCategories();
  const Accounts = await LoadAccountsById(userId);

  return (
    <SubmitTransactionClient
      categories={Categories}
      accounts={Accounts}
      userId={userId}
    />
  );
}

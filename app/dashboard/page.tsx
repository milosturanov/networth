"use server";

import { GetSession } from "@/lib/auth/session";
import { LoadUser } from "@/lib/app/user";
import { CalculateNetworth, LoadAccounts } from "@/lib/app/account";
import { LoadTransactions } from "@/lib/app/transaction";
import { LoadCategories } from "@/lib/app/category";

import { redirect } from "next/navigation";
import DashboardForm from "./dashboardForm";

export default async function Dashboard() {
  const userId = await GetSession();

  if (!userId) {
    redirect("/login");
  }

  const userInfo = await LoadUser(userId);
  const accountInfo = await LoadAccounts(userId);
  const TransactionInfo = await LoadTransactions(userId);
  const Category = await LoadCategories();
  const Networth = await CalculateNetworth(userId);

  return (
    <DashboardForm
      userInfo={userInfo}
      accountInfo={accountInfo}
      transactionInfo={TransactionInfo}
      category={Category}
      networth={Networth.sum}
    />
  );
}

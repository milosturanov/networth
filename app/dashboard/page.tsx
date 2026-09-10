"use server";

import {
  AccountBalanceRecalculate,
  getCategory,
  GetSession,
  GetTransaction,
  LoadAccounts,
  LoadUser,
} from "@/lib/actions";
import { redirect } from "next/navigation";
import DashboardForm from "./dashboardForm";

export default async function Dashboard() {
  const userId = await GetSession();

  if (!userId) {
    redirect("/login");
  }

  const userInfo = await LoadUser(userId);
  const accountInfo = await LoadAccounts(userId);
  const TransactionInfo = await GetTransaction(userId);
  const Category = await getCategory();

  return (
    <DashboardForm
      userInfo={userInfo}
      accountInfo={accountInfo}
      transactionInfo={TransactionInfo}
      Category={Category}
    />
  );
}

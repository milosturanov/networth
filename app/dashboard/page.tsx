"use server";

import {
  AccountBalanceRecalculate,
  GetSession,
  GetTransaction,
  LoadAccounts,
  LoadUser,
} from "@/lib/actions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DashboardForm from "./dashboardForm";

export default async function Dashboard() {
  const CookieStore = await cookies();

  const SessionToken = CookieStore.get("session_token")?.value;

  if (!SessionToken) {
    redirect("/login");
  }

  const userId = await GetSession(SessionToken);

  if (!userId) {
    redirect("/login");
  }

  const userInfo = await LoadUser(userId);
  const accountInfo = await LoadAccounts(userId);
  const TransactionInfo = await GetTransaction(userId);

  return (
    <DashboardForm
      userInfo={userInfo}
      accountInfo={accountInfo}
      transactionInfo={TransactionInfo}
    />
  );
}

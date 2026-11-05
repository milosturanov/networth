"use server";

import { GetSession } from "@/lib/auth/session";
import { LoadUser } from "@/lib/app/user";
import {
  CalculateNetworth,
  LoadAccounts,
  NetworthLastSixMonths,
} from "@/lib/app/account";
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
  const Networth = await CalculateNetworth(userId);
  const NetworthLast6 = await NetworthLastSixMonths(userId);

  return (
    <DashboardForm
      userInfo={userInfo}
      networth={Networth.sum}
      networthLast6={NetworthLast6}
    />
  );
}

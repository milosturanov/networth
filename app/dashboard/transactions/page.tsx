"use server";

import { GetSession } from "@/lib/auth/session";
import { LoadTransactions } from "@/lib/app/transaction";
import TransactionsClient from "./transactionsClient";
import { redirect } from "next/navigation";

export default async function Transactions() {
  const userId = await GetSession();
  if (!userId) {
    redirect("/login");
  }

  const Transactions = await LoadTransactions(userId);

  return <TransactionsClient Transactions={Transactions} />;
}

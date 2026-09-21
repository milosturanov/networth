"use server";

import { GetSession, GetTransaction } from "@/lib/actions";
import TransactionsClient from "./transactionsClient";
import { redirect } from "next/navigation";

export default async function Transactions() {
  const userId = await GetSession();
  if (!userId) {
    redirect("/login");
  }

  const Transactions = await GetTransaction(userId);

  return <TransactionsClient Transactions={Transactions} />;
}

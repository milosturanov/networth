"use server";

import { GetSession } from "@/lib/auth/session";
import { LoadTransactionDetails } from "@/lib/app/transaction";

import { redirect } from "next/navigation";
import TransactionDetailsClient from "./transactionDetailsClient";

export default async function TransactionDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = await GetSession();

  if (!userId) {
    redirect("/login");
  }

  const { id } = await params;
  const transactionId = Number(id);

  const transactionDetails = await LoadTransactionDetails(transactionId);
  return (
    <TransactionDetailsClient
      transactionDetails={transactionDetails}
    ></TransactionDetailsClient>
  );
}

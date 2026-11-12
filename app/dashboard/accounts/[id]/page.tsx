"use server";

import { LoadAccountById } from "@/lib/app/account";
import AccountInfoClient from "./accountInfoClient";
import { GetTransactionsByAccountId } from "@/lib/app/transaction";

export default async function AccountInfo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const accountId = Number((await params).id);

  const AccountInfo = await LoadAccountById(accountId);
  const Transactions = await GetTransactionsByAccountId(accountId);

  return (
    <AccountInfoClient accountInfo={AccountInfo} transactions={Transactions} />
  );
}

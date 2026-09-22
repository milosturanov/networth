"use client";

import { ChevronLeft, CircleChevronRight } from "lucide-react";
import Link from "next/link";

type Transaction = {
  transactionid: number;
  transactionname: string;
  accountname: string;
  amount: number;
  createdat: Date;
};

export default function TransactionsClient({
  Transactions,
}: {
  Transactions: Transaction[];
}) {
  return (
    <div className="flex px-5 pt-5 gap-4  flex-col">
      <Link href="/dashboard" className="flex gap-4">
        <ChevronLeft height={32} width={32} />
        <h1 className="text-2xl font-medium">Transactions</h1>
      </Link>
      <div className="grid grid-cols-5 gap-2 text-sm text-accent3 font-medium">
        <h4>Name</h4>
        <h4>Date</h4>
        <h4 className="truncate">Billed Account</h4>
        <h4>Amount</h4>
        <h4></h4>
      </div>
      {Transactions.map((transaction, index) => {
        return (
          <div
            className="grid grid-cols-5 text-xs font-medium gap-2"
            key={index}
          >
            <h1 className="truncate">{transaction.transactionname}</h1>
            <h1 className="truncate">
              {transaction.createdat.toLocaleDateString("en-GB")}
            </h1>
            <h1 className="truncate">{transaction.accountname}</h1>
            <h1 className="truncate">${transaction.amount}</h1>
            <Link href={`/dashboard/transactions/${transaction.transactionid}`}>
              <CircleChevronRight
                width={16}
                height={16}
                className="ml-auto mr-auto"
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

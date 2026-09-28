"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type TransactionDetails = {
  transactionid: number;
  transactionname: string;
  createdat: Date;
  accountname: string;
  categoryname: string;
  amount: number;
};

export default function TransactionDetailsClient({
  transactionDetails,
}: {
  transactionDetails: TransactionDetails;
}) {
  console.log(transactionDetails);
  return (
    <div className="flex flex-col px-5 mx-auto pt-5 w-full gap-9">
      <div className="flex flex-col gap-9">
        <Link
          className="flex gap-4 items-center"
          href="/dashboard/transactions"
        >
          <ChevronLeft width={32} height={32} />
          <h1 className="text-2xl font-medium">Transaction</h1>
        </Link>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div>
              <h2 className="transactionDetailsLabel">Name</h2>
              <h1>{transactionDetails.transactionname}</h1>
            </div>
            <div>
              <h2 className="transactionDetailsLabel">Category</h2>
              <h1>{transactionDetails.categoryname}</h1>
            </div>
            <div>
              <h2 className="transactionDetailsLabel">Date</h2>
              <h1>
                {transactionDetails.createdat.toLocaleDateString("en-GB")}
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div>
              <h2 className="transactionDetailsLabel">Account Billed</h2>
              <h1>{transactionDetails.accountname}</h1>
            </div>
            <div>
              <h2 className="transactionDetailsLabel">Amount</h2>
              <h1>{transactionDetails.amount}</h1>
            </div>
          </div>
        </div>
      </div>
      <Button className="bg-[#DC2626] text-primary text-sm p-2 rounded-sm font-medium">
        Delete Transaction
      </Button>
    </div>
  );
}

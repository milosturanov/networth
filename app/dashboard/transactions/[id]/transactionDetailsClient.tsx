"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { DeleteTransaction } from "@/lib/app/transaction";

type TransactionDetails = {
  transactionid: number;
  transactionname: string;
  createdat: Date;
  accountid: number;
  accountname: string;
  categoryname: string;
  amount: number;
};

export default function TransactionDetailsClient({
  transactionDetails,
}: {
  transactionDetails: TransactionDetails;
}) {
  return (
    <div className="flex flex-col p-5 mx-auto w-full min-h-screen justify-between ">
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

      <Dialog>
        <DialogTrigger className="bg-[#DC2626] text-primary w-min text-sm p-2 rounded-sm font-medium h-min text-nowrap flex justify-end ml-auto">
          Delete Transaction
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="w-full text-nowrap">
            Delete {transactionDetails.transactionname} ?
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete this transaction?
          </DialogDescription>
          <DialogFooter className="flex flex-row justify-end items-center">
            <DialogClose className="bg-gray-400 text-white p-2 h-max w-min rounded-sm">
              Cancel
            </DialogClose>
            <Button
              className="bg-[#DC2626] text-primary p-2 h-max w-min rounded-sm"
              onClick={async () => {
                await DeleteTransaction(
                  transactionDetails.transactionid,
                  transactionDetails.accountid,
                );
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

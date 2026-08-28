"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { SignOut, SubmitTransaction } from "@/lib/actions";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

const TransactionType = [
  { label: "Select Transaction Type", value: null },
  { label: "Expense", value: "EXP" },
  { label: "Income", value: "INC" },
];

const Category = [
  { label: "Select Category", value: null },
  { label: "Groceries", value: "1" },
  { label: "Paycheck", value: "2" },
  { label: "Travel", value: "3" },
];

const BilledAccount = [
  { label: "Select Billed Acccount", value: null },
  { label: "Cash", value: 1 },
  { label: "Card", value: 2 },
];

type User = {
  id: number;
  name: string;
};

type Account = {
  id: number;
  userId: number;
  name: string;
  balance: number;
  createdAt: Date;
};

type Transaction = {
  transactionname: string;
  createdat: Date;
  accountname: string;
  amount: number;
};

export default function DashboardForm({
  userInfo,
  accountInfo,
  transactionInfo,
}: {
  userInfo: User;
  accountInfo: Account[];
  transactionInfo: Transaction[];
}) {
  const [Open, setOpen] = useState(false);
  const [transactionCategory, setTransactionCategory] = useState(null);
  const [transactionType, setTransactionType] = useState(null);
  const [transactionName, setTransationName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [billedAccount, setBilledAccount] = useState(null);

  return (
    <>
      <div className="flex flex-col w-full mx-auto px-5">
        <div className="flex justify-end py-5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image src="/ova 1.png" alt="" width={43} height={43}></Image>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Button
                className="bg-accent1"
                onClick={async () => await SignOut()}
              >
                Log Out
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col max-w-62.5 gap-2 mb-6">
          <h1 className="text-3xl font-medium">
            Welcome back, <span className="capitalize">{userInfo.name}</span>!
          </h1>
          <p className="text-xs font-bold ">
            Your today’s networth is{" "}
            <span className="text-accent1">1.2% bigger</span> than yesterday.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-3xl bg-accent2 text-primary text-center py-7 rounded-2xl italic flex-4">
            {(
              Number(accountInfo[0].balance) + Number(accountInfo[1].balance)
            ).toFixed(2)}{" "}
            din.
          </h1>
          <div className="flex gap-2">
            <h1 className="font-semibold text-2xl bg-accent1 text-primary text-center py-5 rounded-2xl italic flex-2">
              {accountInfo[0].balance}
            </h1>
            <h1 className="font-semibold text-2xl bg-accent3 text-primary text-center py-5 rounded-2xl italic flex-2">
              {accountInfo[1].balance}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-5 mx-auto">
        <h1 className="font-medium text-xl mb-2 mt-4">Last Transactions</h1>
        <div className="grid grid-cols-4 text-nowrap text-center text-primary bg-accent1 gap-2 py-2.5 rounded-t-lg text-sm">
          <h2>Name</h2>
          <h2>Date</h2>
          <h2 className="truncate">Billed Account</h2>
          <h2>Amount</h2>
        </div>
        <div className="flex flex-col">
          {transactionInfo.map((transaction, index) => {
            return (
              <div
                className="grid grid-cols-4 gap-2 text-sm text-center p-2 border-b"
                key={index}
              >
                <h2 className="truncate">{transaction.transactionname}</h2>
                <h2 className="truncate">
                  {transaction.createdat.toLocaleDateString("en-GB")}
                </h2>
                <h2 className="truncate">{transaction.accountname}</h2>
                <h2 className="truncate">{transaction.amount}</h2>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        className="flex items-center justify-center text-[50px] font-light bg-secondary text-primary rounded-full w-[50px] h-[50px] absolute bottom-[20px] right-[20px]"
        onClick={() => {
          setOpen(true);
        }}
      >
        +
      </Button>

      <Dialog open={Open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction</DialogTitle>
            <form
              onSubmit={async () => {
                await SubmitTransaction(
                  transactionName,
                  userInfo.id,
                  transactionType!,
                  transactionCategory!,
                  billedAccount!,
                  transactionAmount,
                );
              }}
            >
              <DialogDescription className="flex flex-col gap-2">
                <Label>Transaction Name</Label>

                <Input
                  placeholder="breakfast, groceries, paycheck"
                  className="text-sm"
                  onChange={(e) => setTransationName(e.target.value)}
                />
                <Select
                  items={TransactionType}
                  onValueChange={setTransactionType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Transaction Type</SelectLabel>
                      {TransactionType.map((transaction) => (
                        <SelectItem
                          key={transaction.value}
                          value={transaction.value}
                        >
                          {transaction.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select items={Category} onValueChange={setTransactionCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {Category.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  items={accountInfo.map((account) => ({
                    label: account.name,
                    value: account.id,
                  }))}
                  onValueChange={setBilledAccount}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Billed Account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {accountInfo.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Label>Amount</Label>
                <Input
                  placeholder="$49.99"
                  className="text-sm"
                  onChange={(e) => setTransactionAmount(Number(e.target.value))}
                />
                <Button className="bg-accent1" type="submit">
                  Submit Transaction
                </Button>
              </DialogDescription>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

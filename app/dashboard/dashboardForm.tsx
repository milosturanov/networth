"use client";

import Link from "next/link";
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

import { SubmitTransaction } from "@/lib/app/transaction";
import { CompleteNetworth } from "@/lib/formatData/actions";

const TransactionType = [
  { label: "Select Transaction Type", value: null },
  { label: "Expense", value: "EXP" },
  { label: "Income", value: "INC" },
];

type User = {
  id: number;
  name: string;
  currencyCode: string;
  currencyName: string;
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

type Category = {
  id: number;
  name: string;
};

type NetworthLast6 = {
  year: number;
  month: number;
  networth: number;
  isUser: boolean;
};

export default function DashboardForm({
  userInfo,
  accountInfo,
  transactionInfo,
  category,
  networth,
  networthLast6,
}: {
  userInfo: User;
  accountInfo: Account[];
  transactionInfo: Transaction[];
  category: Category[];
  networth: number;
  networthLast6: NetworthLast6[];
}) {
  const [Open, setOpen] = useState(false);
  const [transactionCategory, setTransactionCategory] = useState(null);
  const [transactionType, setTransactionType] = useState(null);
  const [transactionName, setTransationName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [billedAccount, setBilledAccount] = useState(null);

  if (networthLast6.length < 6) {
    var NetworthBars = CompleteNetworth(networthLast6);
  } else {
    NetworthBars = networthLast6;
  }

  console.log(NetworthBars);
  return (
    <div className="w-full px-5 py-6 flex flex-col gap-4">
      {/* Hero Section */}
      <div className="text-accent2 flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl">
            Welcome back, <br /> <span className="text-[40px]">Miloš!</span>
          </h1>
          {/* Your todays networth is... */}
          <div className="flex flex-col ">
            <h1 className="font-thin text-xs">YOUR TODAYS NETWORTH IS</h1>
            <h1 className="text-[40px] text-accent1 font-semibold">
              {Number(networth).toLocaleString("DE-de")}{" "}
              <span className="text-xl">rsd</span>
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {/* Networth slider */}
          <div className="w-full bg-secondary rounded-[6px] h-2.25 flex items-center pl-0.5">
            <div className="w-[68.5%] bg-accent1 h-1 rounded-[6px]" />
          </div>
          {/* Slider text follow up */}
          <div className="flex w-full justify-end">
            <h1 className="flex gap-2 font-bold text-xl items-center">
              / 150.000<span className="text-xs text-accent1">68.5%</span>
            </h1>
          </div>
        </div>
      </div>

      {/* NETWORTH LAST 6 MONTHS */}
      <div className="w-full rounded-[20px] bg-secondary p-6 flex  flex-col gap-4">
        <h1 className="text-xs font-light text-accent2">
          NETWORTH LAST 6 MONTHS
        </h1>
        <div className="flex gap-6 w-full h-full max-h- items-end justify-center">
          {NetworthBars.map((element, index) => {
            return (
              /* One of 6 candles in Networth*/
              <div className="flex flex-col gap-1 items-center" key={index}>
                <h1
                  className={`font-semibold text-sm text-accent1 ${!element.isUser ? "hidden" : ""}`}
                >
                  {Math.round(element.networth / 1000) + "k"}{" "}
                </h1>
                <div
                  className={`w-5 ${element.isUser ? "bg-accent1" : "bg-[#616765]"} rounded-t-[6px] min-h-8 max-h-30 `}
                  style={{
                    height:
                      (element.networth / NetworthBars.at(-1)?.networth!) * 60 +
                      17 +
                      30,
                  }}
                ></div>
                <h1
                  className={`text-[10px] font-semibold text-accent2 uppercase `}
                >
                  {new Date(element.year, element.month - 1).toLocaleString(
                    "en-EN",
                    { month: "short" },
                  )}
                </h1>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dashboard Buttons Add Transaction & View All Accounts */}
      <div className="w-full mx-auto flex flex-col gap-2">
        <Link
          href="/dashboard/submit-transaction"
          className="text-xs font-regular w-full py-2 bg-secondary text-accent2 flex justify-center rounded-xl"
        >
          ADD TRANSACTION
        </Link>
        <Link
          href="/dashboard/accounts"
          className="text-xs font-bold w-full py-2 flex justify-center rounded-xl bg-accent1 text-primary"
        >
          VIEW ALL ACCOUNTS
        </Link>
      </div>

      {/* Dialog for Adding New Transaction will be placed at /add-transaction soon*/}
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
                <Select
                  items={category.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                  onValueChange={setTransactionCategory}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {category.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
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
    </div>
  );
}

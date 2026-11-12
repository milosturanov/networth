"use client";
import Link from "next/link";
import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import CurrencyCombobox from "@/components/custom/currencyCombobox";

import { useState } from "react";

import { CreateNewAccount } from "@/lib/app/account";

import { Currency } from "@/lib/types";
import { redirect } from "next/navigation";
import { div } from "framer-motion/client";

type AccountInfo = {
  id: number;
  userId: number;
  name: string;
  balance: number;
  createdAt: string;
  currencyId: string;
  hexCode: string;
  rate: number;
};

type User = {
  id: number;
  name: string;
  currencyId: string;
  networthGoal: number;
};

export default function AccountsClient({
  accounts,
  userInfo,
  currencies,
}: {
  accounts: AccountInfo[];
  userInfo: User;
  currencies: Currency[];
}) {
  const [Open, SetOpen] = useState(false);
  const [AccountName, setAccountName] = useState("");

  const [SelectedCurrencyId, setSelectedCurrencyId] = useState<string | null>(
    "",
  );

  return (
    <div className="flex flex-col px-5 pt-5 gap-8">
      <Link href="/dashboard">
        <div className="flex items-center gap-4 text-accent2!">
          <ChevronLeft width={50} height={50} />
          <h1 className="text-2xl font-medium">Accounts Overview</h1>
        </div>
      </Link>
      <div className="flex flex-col gap-4 w-full">
        {accounts.map((item) => {
          const accountBalance = Number(item.balance).toLocaleString("de-DE", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          });

          const accountBalanceConverted = (
            item.balance * item.rate
          ).toLocaleString("de-DE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          const [ABintegerPart, ABdecimalPart] = accountBalance.split(",");
          const [ABCintegerPart, ABCdecimalPart] =
            accountBalanceConverted.split(",");

          return (
            <div key={item.id} className="w-full relative overflow-hidden">
              <div
                className="w-full flex flex-col gap-6 p-4 rounded-[16px]"
                style={{ background: item.hexCode }}
              >
                {/* Account Name */}
                <h1 className="uppercase font-semibold text-xl text-accent2">
                  {item.name}
                </h1>
                {/* Account Numbers */}
                <div className="flex flex-col gap-[-4px]">
                  <h1 className="font-semibold text-base text-accent2 opacity-50">
                    {ABintegerPart}
                    <span className="text-xs">
                      ,{!ABdecimalPart ? "00" : ABdecimalPart}
                      {" " + item.currencyId}
                    </span>
                  </h1>
                  <h1 className="font-semibold text-3xl text-accent2">
                    {ABCintegerPart}
                    <span className="text-base">
                      ,{ABCdecimalPart + " "}
                      {userInfo.currencyId}
                    </span>
                  </h1>
                </div>
                {/* View Details */}
                <Link
                  href={`accounts/${item.id}`}
                  className="w-full flex justify-end items-center text-accent2 opacity-80 font-semibold text-sm"
                >
                  VIEW DETAILS
                  <ChevronRight />
                </Link>
              </div>
              {/* Decoration */}
              <div className="absolute top-7 -right-5 rounded-full h-12.5 w-12.5 bg-accent2 opacity-80"></div>
            </div>
          );
        })}

        <Button
          className="bg-accent1 font-bold text-xs text-primary py-2 rounded-3xl flex justify-center"
          onClick={() => {
            SetOpen(!Open);
          }}
        >
          CREATE NEW ACCOUNT
        </Button>
      </div>

      <Dialog open={Open} onOpenChange={() => SetOpen(!Open)}>
        <DialogContent>
          <DialogHeader>Add New Account</DialogHeader>
          <form
            onSubmit={async () => {
              if (SelectedCurrencyId)
                await CreateNewAccount(
                  userInfo.id,
                  AccountName,
                  SelectedCurrencyId,
                );
              redirect("/dashboard/accounts");
            }}
          >
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Enter Account Name"
                onChange={(e) => {
                  setAccountName(e.target.value);
                }}
              />
              <CurrencyCombobox
                onValueChange={setSelectedCurrencyId}
                currencies={currencies}
              />

              <Button type="submit" className="bg-accent1 font-medium text-sm">
                Finish
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

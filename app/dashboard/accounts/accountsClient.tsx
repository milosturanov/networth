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

type AccountInfo = {
  id: number;
  name: string;
  balance: number;
  currencyId: string;
  rate: number;
};

type User = {
  id: number;
  name: string;
  currencyCode: string;
  currencyName: string;
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
  console.log(accounts);
  return (
    <div className="flex flex-col px-5 pt-5 gap-8">
      <Link href="/dashboard">
        <div className="flex items-center gap-4">
          <ChevronLeft width={32} height={32} />
          <h1 className="text-2xl font-medium">Accounts Overview</h1>
        </div>
      </Link>
      <div className="flex flex-col gap-3">
        {accounts.map((account) => (
          <div
            className="flex flex-col gap-3 p-3 cardGradient rounded-[10px] uppercase text-[#ffffff]"
            key={account.id}
          >
            <h1 className="font-semibold text-2xl text-[#ffffff] flex items-center justify-between">
              {account.name}{" "}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-max bg-transparent border-none shadow-none p-0">
                  <Button className="text-white bg-[#C9240E] rounded-xl font-semibold">
                    Delete Account?
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </h1>
            <div className="flex justify-between items-center">
              <div>
                <Image
                  src="/accountIcon.svg"
                  width={110}
                  height={110}
                  alt="accountIcon"
                />
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                  <h2 className="font-semibold text-sm text-[#EBEBEB]">
                    {Number(account.balance).toLocaleString("de-DE") +
                      " " +
                      account.currencyId}
                  </h2>
                  <h1 className="font-semibold text-2xl ">
                    {Number(account.balance * account.rate).toLocaleString(
                      "de-DE",
                    )}{" "}
                    {userInfo.currencyCode}
                  </h1>
                </div>

                <Link href="#" className="flex">
                  LAST TRANSACTIONS <ChevronRight />
                </Link>
              </div>
            </div>
          </div>
        ))}

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

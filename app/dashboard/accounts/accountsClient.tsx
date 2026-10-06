"use client";
import Link from "next/link";
import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { CreateNewAccount } from "@/lib/app/account";

type AccountInfo = {
  id: number;
  name: string;
  balance: number;
  code: string;
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
}: {
  accounts: AccountInfo[];
  userInfo: User;
}) {
  const [Open, SetOpen] = useState(false);
  const [AccountName, setAccountName] = useState("");
  const [CurrencyId, setCurrencyId] = useState(0);

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
              {account.name} <EllipsisVertical />
            </h1>
            <div className="flex justify-between items-center">
              <div>
                <Image
                  src="/accountIcon.svg"
                  width={120}
                  height={120}
                  alt="accountIcon"
                />
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col">
                  <h2 className="font-semibold text-sm text-[#EBEBEB]">
                    {account.balance.toLocaleString("sr-RS")} {account.code}
                  </h2>
                  <h1 className="font-semibold text-2xl ">
                    {(account.balance * account.rate).toLocaleString("de-DE")}{" "}
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
              await CreateNewAccount(userInfo.id, AccountName, CurrencyId);
            }}
          >
            <DialogDescription className="flex flex-col gap-2">
              <Input
                placeholder="Enter Account Name"
                onChange={(e) => {
                  setAccountName(e.target.value);
                }}
              />
              <Input
                placeholder="Enter Currency Id"
                onChange={(e) => {
                  setCurrencyId(Number(e.target.value));
                }}
              />

              <Button type="submit" className="bg-accent1 font-medium text-sm">
                Finish
              </Button>
            </DialogDescription>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

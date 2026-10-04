"use client";
import Link from "next/link";
import { ChevronLeft, ArrowRight } from "lucide-react";
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

export default function AccountsClient({
  accounts,
  userId,
}: {
  accounts: AccountInfo[];
  userId: number;
}) {
  const [Open, SetOpen] = useState(false);
  const [AccountName, setAccountName] = useState("");
  const [CurrencyId, setCurrencyId] = useState(0);

  return (
    <div className="flex flex-col px-5 pt-5 gap-5">
      <Link href="/dashboard">
        <div className="flex items-center gap-4">
          <ChevronLeft width={32} height={32} />
          <h1 className="text-2xl font-medium">Accounts Overview</h1>
        </div>
      </Link>
      {accounts.map((account) => (
        <div
          className="flex gap-3 py-4 px-3 border rounded-2xl"
          key={account.id}
        >
          <Image
            src="/cashIcon.svg"
            width={120}
            height={91}
            alt="cashIcon"
            loading="eager"
          />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-medium leading-none">
                {account.name}
              </h2>
              <h1 className="text-3xl font-medium leading-none">
                {account.balance} {account.code}
              </h1>
              <h1 className="text-3xl font-medium leading-none">
                {account.balance * account.rate}
              </h1>
            </div>
            <Link href="#" className="flex text-xs font-medium gap-1">
              VIEW LAST TRANSACTIONS <ArrowRight width={16} height={16} />
            </Link>
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

      <Dialog open={Open} onOpenChange={() => SetOpen(!Open)}>
        <DialogContent>
          <DialogHeader>Add New Account</DialogHeader>
          <form
            onSubmit={async () => {
              await CreateNewAccount(userId, AccountName, CurrencyId);
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

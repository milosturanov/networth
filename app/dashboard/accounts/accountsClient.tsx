"use client";
import Link from "next/link";
import { ChevronLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

type AccountInfo = {
  id: number;
  userId: number;
  name: string;
  balance: number;
  createdAt: string;
};

export default function AccountsClient({
  accounts,
}: {
  accounts: AccountInfo[];
}) {
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
                {account.balance}
              </h1>
            </div>
            <Link href="#" className="flex text-xs font-medium gap-1">
              VIEW LAST TRANSACTIONS <ArrowRight width={16} height={16} />
            </Link>
          </div>
        </div>
      ))}

      <h2 className="bg-accent1 font-bold text-xs text-primary py-2 rounded-3xl flex justify-center">
        CREATE NEW ACCOUNT
      </h2>
    </div>
  );
}

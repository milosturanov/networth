"use client";

import { MoreVertical } from "lucide-react";

type AccountInfo = {
  id: number;
  name: string;
  balance: number;
  rate: number;
  hexCode: string;
  userCurrencyId: string;
  accountCurrencyId: string;
};

type Transaction = {
  id: number;
  name: string;
  createdAt: Date;
  amount: number;
  categoryType: string;
  currencyId: string;
};

export default function AccountInfoClient({
  accountInfo,
  transactions,
}: {
  accountInfo: AccountInfo;
  transactions: Transaction[];
}) {
  const AccountBalance = Number(accountInfo.balance).toLocaleString("de-DE");
  const AccountBalanceConverted = (
    accountInfo.balance * accountInfo.rate
  ).toLocaleString("de-DE");

  const [ABinteger, ABdecimal] = AccountBalance.split(",");
  const [ABCinteger, ABCdecimal] = AccountBalanceConverted.split(",");

  const createdAtArray = transactions.map((item) => {
    return item.createdAt.toLocaleString("sr-Latn", { month: "long" });
  });

  const Months: string[] = [...new Set(createdAtArray)];

  return (
    <div className="w-full mx-auto px-5 py-6 flex flex-col gap-8 pb-25">
      {/* Account Presentation */}
      <div
        className="w-full flex flex-col p-4 text-accent2 gap-6 rounded-[16px] relative overflow-clip"
        style={{ background: accountInfo.hexCode }}
      >
        <h1 className="uppercase font-semibold text-xl">{accountInfo.name}</h1>
        {/* Account Balance in Both Currencies */}
        <div className="flex flex-col">
          <h2 className="-mb-1 font-semibold opacity-50">
            {ABinteger}
            <span className="text-xs">
              ,{ABdecimal + " " + accountInfo.accountCurrencyId}
            </span>
          </h2>
          <h1 className="text-3xl font-semibold">
            {ABCinteger}
            <span className="text-base">
              ,{ABCdecimal + " " + accountInfo.userCurrencyId}
            </span>
          </h1>
        </div>
        {/* Three Dots for More Options */}
        <div className="w-full flex justify-end items-center">
          <MoreVertical />
        </div>
        {/* Decoration */}
        <div className="absolute w-12.5 h-12.5 bg-accent2 rounded-full top-7 -right-5" />
      </div>
      {/* Transactions separated by Months*/}
      <div className="flex flex-col gap-3">
        {Months.map((month, index) => (
          <div className="flex flex-col gap-2 w-full" key={index}>
            <h1 className="font-semibold text-sm opacity-50 text-accent2 capitalize px-2">
              {month}
            </h1>
            <div className="flex flex-col gap-0.5 ">
              {transactions.map((transaction) => {
                if (
                  month ===
                  transaction.createdAt.toLocaleString("sr-Latn", {
                    month: "long",
                  })
                ) {
                  return (
                    /* Each Transaction */
                    <div className="w-full grid grid-cols-3 px-2 py-4 bg-secondary text-accent2 text-sm font-semibold  first:rounded-t-[16px] last:rounded-b-[16px]  text-center items-center">
                      <h1 className="text-left capitalize">
                        {transaction.name}
                      </h1>
                      <h1>
                        {transaction.createdAt.toLocaleString("EN-gb", {
                          dateStyle: "short",
                        })}
                      </h1>

                      <h1
                        style={{
                          color:
                            transaction.categoryType === "EXP"
                              ? "#FF0000"
                              : "#11DD11",
                        }}
                        className="lowercase opacity-50"
                      >
                        {transaction.amount + " " + transaction.currencyId}
                      </h1>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

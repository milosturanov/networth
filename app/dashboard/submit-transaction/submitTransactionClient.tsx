"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Repeat,
  ChevronLeft,
  Delete,
  Verified,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

import { Category, Account } from "@/lib/types";
import { motion } from "framer-motion";

import { SubmitTransaction } from "@/lib/app/transaction";

export default function SubmitTransactionClient({
  categories,
  accounts,
  userId,
}: {
  categories: Category[];
  accounts: Account[];
  userId: number;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState("0");
  const [selectedName, setSelectedName] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");

  const NumberPad = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <motion.div
      key={currentStep}
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      className="h-screen"
    >
      {(() => {
        console.log(currentStep);
        switch (currentStep) {
          case 1:
            return (
              <div className="flex flex-col px-5 py-6 w-full h-full mx-auto relative">
                {/* Progress bar & Header*/}
                <div className="flex flex-col gap-6">
                  {/* Progress bar */}
                  <div className="flex w-full h-2.5 bg-secondary rounded-xl items-center">
                    <div className="w-20 h-1.5 bg-accent1 rounded-xl" />
                  </div>
                  {/* Header */}
                  <h1 className="text-2xl font-medium text-accent2 text-center">
                    What was type of transaction?
                  </h1>
                </div>
                {/* Type of transactions*/}
                <div className="h-full w-full flex flex-col gap-2 items-center justify-center text-accent2 font-normal text-base">
                  <button
                    className="flex gap-6 bg-secondary w-full rounded-[20px] items-center px-6 py-2"
                    onClick={() => {
                      setCategoryFilter("INC");
                      setCurrentStep(2);
                    }}
                  >
                    <TrendingUp
                      width={50}
                      height={50}
                      className="text-accent1"
                      strokeWidth={1}
                    />
                    <h1>INCOME TRANSACTION</h1>
                  </button>
                  <button
                    className="flex gap-6 bg-secondary w-full rounded-[20px] items-center px-6 py-2"
                    onClick={() => {
                      setCategoryFilter("EXP");
                      setCurrentStep(2);
                    }}
                  >
                    <TrendingDown
                      width={50}
                      height={50}
                      className="text-[#EF0707]"
                      strokeWidth={1}
                    />
                    <h1>EXPENSE TRANSACTION</h1>
                  </button>
                  <button
                    className="flex gap-6 bg-secondary w-full rounded-[20px] items-center px-6 py-2 opacity-50"
                    onClick={() => {
                      setCurrentStep(2);
                    }}
                    disabled={true}
                  >
                    <Repeat
                      width={50}
                      height={50}
                      className="text-[#CF7D1F]"
                      strokeWidth={1}
                    />
                    <h1>TRANSFER TRANSACTION</h1>
                  </button>
                </div>
                {/* DASHBOARD BACK BUTTON*/}
                <Link
                  href="/dashboard"
                  className="flex gap-1 text-accent1 bg-secondary rounded-[20px] px-4 py-2 w-min absolute bottom-6 left-5"
                >
                  <ChevronLeft /> DASHBOARD
                </Link>
              </div>
            );
            break;
          case 2:
            return (
              <div className="flex flex-col px-5 py-6 w-full h-screen mx-auto relative">
                {/* Progress bar & Header*/}
                <div className="flex flex-col gap-6">
                  {/* Progress bar */}
                  <div className="flex w-full h-2.5 bg-secondary rounded-xl items-center">
                    <div className="w-32.5 h-1.5 bg-accent1 rounded-xl" />
                  </div>
                  {/* Header */}
                  <h1 className="text-2xl font-medium text-accent2 text-center">
                    What was category of transaction?
                  </h1>
                </div>
                {/* Categories Listed*/}
                <div className="h-full w-full flex flex-col gap-2 items-center justify-center text-accent2 font-normal text-base">
                  {categories.map((item) => {
                    if (item.categoryType === categoryFilter) {
                      return (
                        <button
                          key={item.id}
                          className="w-full flex items-center justify-center uppercase py-2 text-xl font-normal text-accent2 rounded-[16px]"
                          style={{ background: item.hexCode }}
                          onClick={() => {
                            setSelectedCategory(item.id);
                            setCurrentStep(3);
                          }}
                        >
                          {item.name}
                        </button>
                      );
                    }
                  })}
                </div>
                {/* BACK BUTTON*/}
                <button
                  className="flex gap-1 text-accent1 bg-secondary rounded-[20px] px-4 py-2 w-min absolute bottom-6 left-5"
                  onClick={() => {
                    setCurrentStep(1);
                  }}
                >
                  <ChevronLeft /> BACK
                </button>
              </div>
            );
            break;
          case 3:
            return (
              <div className="flex flex-col px-5 py-6 w-full h-screen mx-auto relative gap-8">
                {/* Progress bar & Header*/}
                <div className="flex flex-col gap-6">
                  {/* Progress bar */}
                  <div className="flex w-full h-2.5 bg-secondary rounded-xl items-center">
                    <div className="w-52.5 h-1.5 bg-accent1 rounded-xl" />
                  </div>
                  {/* Header */}
                  <h1 className="text-2xl font-medium text-accent2 text-center">
                    Which account was used for this transaction?
                  </h1>
                </div>
                {/* Accounts Listed */}
                <div className="h-full w-full flex flex-col gap-3 items-center justify-center text-accent2 font-normal text-base">
                  {accounts.map((item) => {
                    return (
                      <button
                        className="relative w-full flex flex-col gap-1 p-4 pb-16 text-accent2 rounded-[16px] overflow-hidden items-start"
                        style={{ background: item.hexCode }}
                        key={item.id}
                        onClick={() => {
                          setSelectedAccount(item.id);
                          setCurrentStep(4);
                        }}
                      >
                        <h1 className="font-semibold text-2xl uppercase">
                          {item.name}
                        </h1>
                        <h1 className="text-4xl font-normal lowercase">
                          {Number(item.balance).toLocaleString("de-DE") +
                            " " +
                            item.currencyId}
                        </h1>
                        <div className="h-12.5 w-12.5 absolute right-12.5 -bottom-6.25 bg-accent2 rounded-[100%]"></div>
                      </button>
                    );
                  })}
                </div>
                {/* BACK BUTTON*/}
                <button
                  className="flex gap-1 text-accent1 bg-secondary rounded-[20px] px-4 py-2 w-min absolute bottom-6 left-5"
                  onClick={() => {
                    setCurrentStep(2);
                  }}
                >
                  <ChevronLeft /> BACK
                </button>
              </div>
            );
          case 4:
            return (
              <div className="flex flex-col px-5 py-6 w-full h-screen mx-auto relative">
                {/* Progress bar & Header*/}
                <div className="flex flex-col gap-6">
                  {/* Progress bar */}
                  <div className="flex w-full h-2.5 bg-secondary rounded-xl items-center">
                    <div className="w-72.5 h-1.5 bg-accent1 rounded-xl" />
                  </div>
                  {/* Header */}
                  <h1 className="text-2xl font-medium text-accent2 text-center">
                    Enter value regarding this transaction
                  </h1>
                </div>
                {/* Number Pad */}
                <div className="h-full w-full flex flex-col gap-3 items-center justify-center text-accent2 font-semibold text-2xl">
                  <h1 className="text-4xl lowercase">
                    {Number(selectedAmount.replace(",", ".")).toLocaleString(
                      "de-DE",
                    ) +
                      " " +
                      accounts.find((element) => element.id === selectedAccount)
                        ?.currencyId}{" "}
                  </h1>
                  <div className="flex flex-col gap-2.5">
                    {/* Num Pad */}
                    <div className="grid grid-cols-3 grid-rows-4 gap-2.5">
                      {NumberPad.map((item, index) => {
                        return (
                          <button
                            key={index}
                            className="flex items-center justify-center w-11.25 h-11.25 bg-secondary rounded-[10px]"
                            onClick={() => {
                              if (selectedAmount === "0") {
                                setSelectedAmount(item.toString());
                              } else {
                                setSelectedAmount(selectedAmount + item);
                              }
                            }}
                          >
                            {item}
                          </button>
                        );
                      })}
                      {/* Comma Button */}
                      <button
                        className="flex items-center justify-center w-11.25 h-11.25 bg-secondary rounded-[10px] disabled:opacity-50"
                        disabled={selectedAmount.includes(",")}
                        onClick={() => {
                          setSelectedAmount(selectedAmount + ",");
                        }}
                      >
                        ,
                      </button>
                      {/* Button 0 */}
                      <button
                        className="flex items-center justify-center w-11.25 h-11.25 bg-secondary rounded-[10px]"
                        onClick={() => {
                          if (selectedAmount === "0") {
                          } else {
                            setSelectedAmount(selectedAmount + 0);
                          }
                        }}
                      >
                        0
                      </button>
                      {/* Erase Button */}
                      <button
                        className="flex items-center justify-center w-11.25 h-11.25 bg-secondary rounded-[10px] disabled:opacity-50"
                        disabled={selectedAmount === "0" ? true : false}
                        onClick={() => {
                          if (selectedAmount.length === 1) {
                            setSelectedAmount("0");
                          } else {
                            setSelectedAmount(
                              selectedAmount.slice(
                                0,
                                selectedAmount.length - 1,
                              ),
                            );
                          }
                        }}
                      >
                        <Delete />
                      </button>
                    </div>
                    {/* Submit Button */}
                    <button
                      className="text-base bg-secondary text-accent1 w-full py-2 rounded-[10px]"
                      onClick={() => {
                        setCurrentStep(5);
                      }}
                    >
                      CONFIRM
                    </button>
                  </div>
                </div>
                {/* BACK BUTTON*/}
                <button
                  className="flex gap-1 text-accent1 bg-secondary rounded-[20px] px-4 py-2 w-min absolute bottom-6 left-5"
                  onClick={() => {
                    setCurrentStep(3);
                  }}
                >
                  <ChevronLeft /> BACK
                </button>
              </div>
            );
            break;
          case 5:
            return (
              <div className="flex flex-col px-5 py-6 w-full h-screen mx-auto relative">
                {/* Progress bar & Header*/}
                <div className="flex flex-col gap-6">
                  {/* Progress bar */}
                  <div className="flex w-full h-2.5 bg-secondary rounded-xl items-center">
                    <div className="w-[95%] h-1.5 bg-accent1 rounded-xl" />
                  </div>
                  {/* Header */}
                  <h1 className="text-2xl font-medium text-accent2 text-center">
                    Enter Transaction Name and Description
                  </h1>
                </div>
                {/* Transaction Name, Description & Submit Button */}
                <div className="h-full w-full flex flex-col gap-3 items-center justify-center text-accent2 font-semibold text-2xl">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-secondary text-base text-accent2 px-4 py-2 font-medium rounded-[12px]"
                    maxLength={20}
                    onChange={(e) => {
                      setSelectedName(e.target.value);
                    }}
                  />
                  <div className="relative w-full">
                    <textarea
                      placeholder="Description (Optional)"
                      className="text-sm font-medium bg-secondary text-accent2 w-full h-25 relative px-4 py-2 rounded-[12px] z-1 submitStroke"
                      aria-multiline={true}
                      maxLength={100}
                      onChange={(e) => {
                        setSelectedDescription(e.target.value);
                      }}
                    />
                    <h1 className="font-light text-xs text-accent2 opacity-30 absolute top-2 right-2 z-10">
                      {selectedDescription.length + "/100"}
                    </h1>
                  </div>

                  <button
                    className="w-full bg-secondary text-accent1 font-semibold text-base rounded-[16px] py-3"
                    onClick={async () => {
                      await SubmitTransaction(
                        selectedName,
                        userId,
                        selectedCategory,
                        selectedAccount,
                        Number(selectedAmount.replace(",", ".")),
                        selectedDescription,
                      );

                      setCurrentStep(6);
                    }}
                  >
                    SUBMIT
                  </button>
                </div>
                {/* BACK BUTTON*/}
                <button
                  className="flex gap-1 text-accent1 bg-secondary rounded-[20px] px-4 py-2 w-min absolute bottom-6 left-5"
                  onClick={() => {
                    setCurrentStep(4);
                  }}
                >
                  <ChevronLeft /> BACK
                </button>
              </div>
            );
            break;
          case 6:
            return (
              <div className="flex flex-col px-5 py-6 w-full h-screen mx-auto relative">
                <div className="flex flex-col gap-1 items-center justify-center text-accent1 w-full h-full">
                  <Verified width={100} height={100} strokeWidth={0.5} />
                  <h1 className="font-medium text-xs">
                    SUCCESSFUL TRANSACTION
                  </h1>
                </div>
                <div className="flex h-full w-full items-center justify-center">
                  <Link
                    href="/dashboard"
                    className="flex gap-2 text-accent1 bg-secondary px-4 py-2 rounded-[20px] font-medium"
                  >
                    GO TO DASHBOARD <ExternalLink />
                  </Link>
                </div>
              </div>
            );
            break;
        }
      })()}
    </motion.div>
  );
}

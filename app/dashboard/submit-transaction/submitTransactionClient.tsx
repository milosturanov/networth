"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Repeat, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SubmitTransactionClient() {
  const [currentStep, setCurrentStep] = useState(1);

  switch (currentStep) {
    case 1:
      return (
        <div className="flex flex-col px-5 py-6 w-full h-screen mx-auto relative">
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
          <div className="h-full w-full flex flex-col gap-2 items-center justify-center text-accent2 font-normal text-base"></div>
          {/* DASHBOARD BACK BUTTON*/}
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
  }
}

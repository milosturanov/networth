"use client";

import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

import { CompleteNetworth } from "@/lib/formatData/actions";
import { PartyPopper } from "lucide-react";

import { User } from "@/lib/types";
import { useState } from "react";
import { UpdateNetworthGoal } from "@/lib/app/user";

type NetworthLast6 = {
  year: number;
  month: number;
  networth: number;
  isUser: boolean;
};

export default function DashboardForm({
  userInfo,
  networth,
  networthLast6,
}: {
  userInfo: User;
  networth: number;
  networthLast6: NetworthLast6[];
}) {
  if (networthLast6.length < 6) {
    var NetworthBars = CompleteNetworth(networthLast6);
  } else {
    NetworthBars = networthLast6;
  }

  const [nextGoal, setNextGoal] = useState("");

  return (
    <div className="h-screen relative">
      {/* Dashboard App */}
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
              <motion.div
                className="bg-accent1 h-1 rounded-[6px]"
                initial={{ width: "0%" }}
                animate={{
                  width: (networth / userInfo.networthGoal) * 100 + "%",
                }}
              />
            </div>
            {/* Slider text follow up */}
            <div className="flex w-full justify-end">
              <h1 className="flex gap-2 font-bold text-xl items-center">
                / {userInfo.networthGoal.toLocaleString("de-DE")}
                <span className="text-xs text-accent1">
                  {((networth / userInfo.networthGoal) * 100).toFixed(1) + "%"}
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* NETWORTH LAST 6 MONTHS */}
        <div className="w-full rounded-[20px] bg-secondary p-6 flex  flex-col gap-4 h-[230px] ">
          <h1 className="text-xs font-light text-accent2">
            NETWORTH LAST 6 MONTHS
          </h1>
          <div className="flex gap-6 w-full h-full items-end justify-center">
            {NetworthBars.map((element, index) => {
              return (
                /* One of 6 candles in Networth*/
                <div
                  className="flex flex-col gap-1 items-center h-full justify-end"
                  key={index}
                >
                  <h1
                    className={`font-semibold text-sm text-accent1 ${!element.isUser ? "hidden" : ""}`}
                  >
                    {Math.round(element.networth / 1000) + "k"}{" "}
                  </h1>
                  <motion.div
                    className={`w-5 ${element.isUser ? "opacity-100" : "opacity-20"} rounded-t-[6px]  max-h-30 bg-accent1 `}
                    initial={{ height: "0%" }}
                    animate={{
                      height:
                        (
                          (element.networth / NetworthBars.at(-1)?.networth!) *
                          100
                        ).toString() + "%",
                    }}
                  ></motion.div>
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
      </div>
      <AnimatePresence>
        {/* Goal Reached Pop Up*/}
        {networth > userInfo.networthGoal && (
          <div
            className="absolute top-0 right-0 left-0 bottom-0 z-101 w-full h-full px-5 flex items-center justify-center backdrop-blur-[10px]"
            style={{
              visibility:
                networth > userInfo.networthGoal ? "visible" : "hidden",
            }}
          >
            {/* Pop Up */}

            <motion.div
              className="w-full h-max flex flex-col px-5 py-8 gap-8 bg-secondary rounded-[20px]"
              initial={{ y: "-100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
            >
              {/* Congratulation Text */}
              <div className="w-full flex flex-col mx-auto gap-2 items-center text-accent1  text-center">
                <PartyPopper height={100} width={100} strokeWidth={0.5} />
                <h1 className="text-xl font-semibold spacing tracking-tight">
                  Congrats on reaching your goal!
                </h1>
                <p className="text-sm font-normal text-accent2">
                  Your New Goal is right behind corner. <br />
                  <span className="text-accent1 font-semibold text-base">
                    Good Luck!
                  </span>
                </p>
              </div>
              {/* Input & Confirm Button */}
              <div className="flex flex-col gap-4">
                <input
                  type="number"
                  className="bg-[#2A2929] rounded-[8px] w-full px-4 py-2 text-base font-normal text-accent2"
                  placeholder="New Goal"
                  onChange={(e) => {
                    setNextGoal(e.target.value);
                  }}
                />
                <button
                  className="w-full py-2 text-accent1 font-light text-base border-accent1 border-[0.5px]  rounded-[8px]"
                  onClick={async () => {
                    await UpdateNetworthGoal(userInfo.id, Number(nextGoal));
                  }}
                >
                  CONFIRM
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

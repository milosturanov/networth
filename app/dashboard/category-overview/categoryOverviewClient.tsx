"use client";

type categoryDetails = {
  categoryName: string;
  categorySpentAmount: number;
  userCurrencyId: string;
  hexCode: string;
};

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function CategoryOverviewClient({
  categoryDetails,
}: {
  categoryDetails: categoryDetails[];
}) {
  const router = useRouter();

  const Periods: { name: string; days: number }[] = [
    { name: "Last Month", days: 30 },
    { name: "Last Three Months", days: 90 },
    { name: "Last Six Months", days: 180 },
    { name: "Last Year", days: 365 },
  ];

  const [selectedPeriod, setSelectedPeriod] = useState("Last Month");

  return (
    <div className="w-full px-5 pt-5 flex flex-col gap-4">
      <Link href="/dashboard">
        <div className="flex items-center gap-4">
          <ChevronLeft width={32} height={32} />
          <h1 className="text-2xl font-medium">Category Overview</h1>
        </div>
      </Link>
      <Combobox
        items={Periods.map((item) => {
          return item.name;
        })}
        onValueChange={(newValue: string | null) => {
          console.log("ON VALUE CHANGE");
          if (!newValue) {
            newValue = selectedPeriod;
          }
          setSelectedPeriod(newValue);

          Periods.map((item) => {
            if (item.name === newValue) {
              router.replace(
                `/dashboard/category-overview?period=${item.days}`,
              );
            }
          });
        }}
      >
        <ComboboxInput placeholder={`${selectedPeriod}`} />
        <ComboboxContent>
          <ComboboxList>
            {Periods.map((item, index) => {
              return (
                <ComboboxItem key={index} value={item.name}>
                  {item.name}
                </ComboboxItem>
              );
            })}
          </ComboboxList>

          <ComboboxEmpty>No period was found.</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
      <div className="flex flex-col gap-4 w-full">
        {categoryDetails.map((element, index) => {
          return (
            <div
              className={`flex pl-7 rounded-[10px] uppercase relative h-[150px] items-center`}
              style={{ backgroundColor: element.hexCode }}
              key={index}
            >
              <div className="w-1 h-full bg-primary" />
              <div className="w-full  text-primary  pt-5 pb-7  ">
                <div className="flex flex-col items-center">
                  <div className="flex flex-col gap-7">
                    <h1 className="font-bold text-xl">
                      {element.categoryName}
                    </h1>
                    <div className="flex flex-col gap-1 items-left w-max">
                      <h1 className="font-bold text-3xl">
                        {Number(element.categorySpentAmount).toLocaleString(
                          "de-DE",
                        )}{" "}
                        {element.userCurrencyId}
                      </h1>
                      <h2 className="text-xs">1,4% MORE THAN LAST MONTH</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

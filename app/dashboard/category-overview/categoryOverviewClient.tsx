"use client";

type categoryDetails = {
  categoryName: string;
  transactionAmount: number;
};

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CategoryOverviewClient({
  categoryDetails,
}: {
  categoryDetails: categoryDetails[];
}) {
  return (
    <div className="w-full px-5 pt-5 flex flex-col gap-4">
      <Link href="/dashboard">
        <div className="flex items-center gap-4">
          <ChevronLeft width={32} height={32} />
          <h1 className="text-2xl font-medium">Category Overview</h1>
        </div>
      </Link>

      <div className="flex flex-col gap-4 w-full">
        {categoryDetails.map((element, index) => {
          return (
            <div
              key={index}
              className="w-full flex flex-col border border-secondary gap-4 items-center text-2xl font-medium py-4 rounded-2xl "
            >
              <h1>{element.categoryName}</h1>
              <h1>{element.transactionAmount}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

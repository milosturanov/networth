"use server";

import CategoryOverviewClient from "./categoryOverviewClient";

import { GetSession } from "@/lib/auth/session";
import { LoadCategoryOverview } from "@/lib/app/category";

import { redirect } from "next/navigation";

export default async function CategoryOverview({
  searchParams,
}: {
  searchParams: Promise<{ period: string }>;
}) {
  const userId = await GetSession();

  if (!userId) {
    redirect("/login");
  }

  const { period } = await searchParams;

  const interval = Number(period);

  const categoryDetails = await LoadCategoryOverview(
    userId,
    interval ? interval : 30,
  );

  if (!categoryDetails) {
    return false;
  }

  return <CategoryOverviewClient categoryDetails={categoryDetails} />;
}

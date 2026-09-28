"use server";

import CategoryOverviewClient from "./categoryOverviewClient";

import { GetSession } from "@/lib/auth/session";
import { LoadCategoryOverview } from "@/lib/app/category";

import { redirect } from "next/navigation";

export default async function CategoryOverview() {
  const userId = await GetSession();

  if (!userId) {
    redirect("/login");
  }

  const categoryDetails = await LoadCategoryOverview(userId);

  if (!categoryDetails) {
    return false;
  }

  return <CategoryOverviewClient categoryDetails={categoryDetails} />;
}

"use server";

import CategoryOverviewClient from "./categoryOverviewClient";
import { GetSession, getCategoryOverview } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function CategoryOverview() {
  const userId = await GetSession();

  if (!userId) {
    redirect("/login");
  }

  const categoryDetails = await getCategoryOverview(userId);

  if (!categoryDetails) {
    return false;
  }

  return <CategoryOverviewClient categoryDetails={categoryDetails} />;
}

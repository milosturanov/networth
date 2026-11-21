"use server";

import { GetSession } from "@/lib/auth/session";
import ProfileClient from "./profileClient";
import { redirect } from "next/navigation";
import { LoadUser } from "@/lib/app/user";

export default async function Profile() {
  const userId = await GetSession();

  if (userId) {
  } else {
    redirect("/dashboard");
  }

  const UserInfo = await LoadUser(userId);

  return <ProfileClient userInfo={UserInfo} />;
}

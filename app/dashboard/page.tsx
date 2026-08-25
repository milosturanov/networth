import { GetSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const CookieStore = await cookies();

  const SessionToken = CookieStore.get("session_token")?.value;

  const userId = await GetSession(SessionToken!);

  if (!userId) {
    redirect("/login");
  }

  return <div>Dashboard</div>;
}

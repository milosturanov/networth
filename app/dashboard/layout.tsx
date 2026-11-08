"use client";

import { SignOut } from "@/lib/auth/auth";
import { Home, ChartLine, UserGroup, CircleUserRound } from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathName = usePathname();
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className={`min-h-full flex flex-col`}>
        {children}
        {pathName !== "/dashboard/submit-transaction" && (
          <div className="flex gap-12.5 bg-secondary fixed bottom-6 right-5 left-5 px-6 py-4 items-center justify-center rounded-[12px] text-accent1 z-100">
            <Link href="/dashboard">
              <Home width={24} height={24} />
            </Link>
            <Link href="/dashboard/category-overview">
              <ChartLine width={24} height={24} />
            </Link>
            <Link href="#">
              <UserGroup width={24} height={24} />
            </Link>
            <Link href="#" onClick={() => SignOut()}>
              <CircleUserRound width={24} height={24} />
            </Link>
          </div>
        )}
      </body>
    </html>
  );
}

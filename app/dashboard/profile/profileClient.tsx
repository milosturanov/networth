"use client";

import { SignOut } from "@/lib/auth/auth";
import { User } from "@/lib/types";
import { User2 } from "lucide-react";

export default function ProfileClient({ userInfo }: { userInfo: User }) {
  return (
    <div className="flex flex-col w-full py-6 px-5 gap-16">
      {/* UserInfo */}
      <div className="flex flex-col gap-2 items-center">
        {/* Profile Picture */}
        <div className="p-4 bg-secondary w-min rounded-[100%]">
          <User2
            width={50}
            height={50}
            className="text-accent2"
            strokeWidth={1}
          />
        </div>
        <h1 className="text-sm opacity-50 font-semibold text-accent2 capitalize">
          {userInfo.name + " Turanov"}
        </h1>
      </div>

      {/* Buttons Feedback and Log Out*/}
      <div className="flex flex-col gap-2">
        <button className="w-full py-4 bg-secondary text-accent2 rounded-[16px]">
          SUBMIT FEEDBACK
        </button>
        <button
          className="w-full py-4 bg-secondary text-accent2 rounded-[16px]"
          onClick={async () => {
            await SignOut();
          }}
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
}

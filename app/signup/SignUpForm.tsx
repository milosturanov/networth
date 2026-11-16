"use client";

import { Button, Input } from "@base-ui/react";
import { Register } from "@/lib/auth/auth";
import { useState } from "react";
import Link from "next/link";

import CurrencyCombobox from "@/components/custom/currencyCombobox";
import { Currency } from "@/lib/types";

export default function SignUpForm({ currencies }: { currencies: Currency[] }) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [NetworthGoal, setNetworthGoal] = useState(0);
  const [SelectedCurrencyId, setSelectedCurrencyId] = useState<string | null>(
    "",
  );

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <h1 className="text-accent1 text-3xl font-bold">NETWORTH</h1>
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={async (e) => {
          setIsLoading(true);
          e.preventDefault();
          try {
            await Register(
              Username,
              Password,
              SelectedCurrencyId!,
              NetworthGoal,
            );
          } catch {
            setIsLoading(false);
          }
        }}
      >
        <Input
          placeholder="Username"
          className="rounded-[8px] text-accent2 py-2 bg-secondary px-4 w-full"
          value={Username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          value={Password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          type="password"
          className="rounded-[8px] text-accent2 py-2 bg-secondary px-4 w-full"
        />
        <div className="w-full">
          <CurrencyCombobox
            onValueChange={setSelectedCurrencyId}
            currencies={currencies}
          />
        </div>
        <Input
          placeholder="Networth Goal"
          className="rounded-[8px] text-accent2 py-2 bg-secondary px-4 w-full"
          type="number"
          onChange={(e) => {
            setNetworthGoal(Number(e.target.value));
          }}
        />

        <Link
          href="/login"
          className="w-full text-left underline text-accent1 text-xs"
        >
          Already have account? Sign in
        </Link>
        <Button
          className="bg-accent1 text-secondary w-min text-nowrap px-5 py-2 rounded-sm disabled:opacity-50"
          type="submit"
          disabled={isLoading}
        >
          SIGN UP
        </Button>
      </form>
    </div>
  );
}

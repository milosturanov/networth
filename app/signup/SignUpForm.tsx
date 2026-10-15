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
  const [SelectedCurrencyId, setSelectedCurrencyId] = useState<string | null>(
    "",
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-accent1 text-3xl font-bold">NETWORTH</h1>
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          if (SelectedCurrencyId)
            await Register(Username, Password, SelectedCurrencyId);
        }}
      >
        <Input
          placeholder="Username"
          className="border pl-4 rounded-sm w-full"
          value={Username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></Input>
        <Input
          value={Password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          type="password"
          className="border rounded-sm pl-4 w-full"
        ></Input>
        <div className="w-full">
          <CurrencyCombobox
            onValueChange={setSelectedCurrencyId}
            currencies={currencies}
          />
        </div>

        <Link
          href="/login"
          className="w-full text-left underline text-accent1 text-xs"
        >
          Already have account? Sign in
        </Link>
        <Button
          className="bg-accent1 text-secondary w-min text-nowrap px-5 py-2 rounded-sm"
          type="submit"
        >
          SIGN UP
        </Button>
      </form>
    </div>
  );
}

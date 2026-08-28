"use client";

import { Button, Input } from "@base-ui/react";
import { RegisterUser } from "@/lib/actions";
import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-accent1 text-3xl font-bold">NETWORTH</h1>
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          await RegisterUser(Username, Password);
        }}
      >
        <Input
          placeholder="Username"
          className="border pl-4 rounded-sm"
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
          className="border rounded-sm pl-4"
        ></Input>
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

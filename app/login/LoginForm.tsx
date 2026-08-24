"use client";

import { Button, Input } from "@base-ui/react";
import { LoginUser } from "@/lib/actions";
import { useState } from "react";

export default function LoginForm() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-accent1 text-3xl font-bold">NETWORTH</h1>
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          await LoginUser(Username, Password);
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
        <Button
          className="bg-accent1 text-secondary w-min text-nowrap px-5 py-2 rounded-sm"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

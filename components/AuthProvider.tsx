"use client";
import React from "react";
import { useActiveAccount } from "thirdweb/react";

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const account = useActiveAccount();

  if (!account?.address) {
    return (
      <div className="flex justify-center items-center bg-black min-h-screen text-neutral-300">
        <p className="font-bold text-center text-xl">
          Oops! Looks like your wallet took a coffee break.
          <br />
          ☕️ Connect it to join the fun!
        </p>
      </div>
    );
  }
  return <>{children}</>;
}

"use client";
import React from "react";
import { useActiveAccount } from "thirdweb/react";
import { AuthorDetails } from "./Footer";

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const account = useActiveAccount();

  if (!account?.address) {
    return (
      <div className="flex justify-center items-center h-[90vh] text-neutral-300">
        <p className="flex flex-col gap-y-4 font-bold text-center text-xl">
          <span>Oops! Looks like your wallet took a coffee break ☕️</span>
          <span>Connect it to join the fun!</span>
        </p>
        <AuthorDetails className="absolute bottom-6" />
      </div>
    );
  }
  return <>{children}</>;
}

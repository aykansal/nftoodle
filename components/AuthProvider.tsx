"use client";
import Link from "next/link";
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
      <div className="flex justify-center items-center bg-black h-[90vh] text-neutral-300">
        <p className="font-bold text-center text-xl">
          Oops! Looks like your wallet took a coffee break.
          <br />
          ☕️ Connect it to join the fun!
        </p>
        <footer className="bottom-4 absolute text-gray-400 text-sm">
          Made with 💖 by{" "}
          <Link
            href="https://x.com/aykansal"
            className="text-[#FF0B7A] hover:underline"
          >
            Aykansal
          </Link>
        </footer>
      </div>
    );
  }
  return <>{children}</>;
}

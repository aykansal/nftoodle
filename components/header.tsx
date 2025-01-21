"use client";

import { ConnectButton } from "thirdweb/react";
import { client, wallet } from "@/lib/thirdweb";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex justify-between items-center bg-[#FF0B7A] mx-auto px-4 py-2 h-[10vh] container">
      <Link href="/">
        <h1 className="flex justify-center items-center mb-6 font-bold text-3xl text-white">
          NFToodle
        </h1>
      </Link>
      <ConnectButton autoConnect={true} client={client} wallets={[wallet]} />
    </header>
  );
}

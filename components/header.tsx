"use client";

import { ConnectButton } from "thirdweb/react";
import { client, wallet } from "@/lib/thirdweb";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-[#FF0B7A] bg-[#0A0A0A] border-b-2 h-[10vh]">
      <div className="flex justify-between items-center mx-auto px-4 py-3 container">
        <Link href="/" className="group">
          <h1 className="group-hover:text-[#FF0B7A] font-bold text-4xl text-white transition-colors duration-300 ease-in-out">
            NFT
            <span className="group-hover:text-white text-[#FF0B7A] transition-colors duration-300 ease-in-out">
              oodle
            </span>
          </h1>
        </Link>
        <ConnectButton
          // className="bg-[#FF0B7A] hover:bg-[#FF3B9A] px-4 py-2 rounded-full text-white transition-colors duration-300 ease-in-out"
          client={client}
          wallets={[wallet]}
          autoConnect={true}
        />
      </div>
    </header>
  );
}

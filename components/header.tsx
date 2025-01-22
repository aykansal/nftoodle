"use client";

import { ConnectButton, useActiveAccount, useConnect } from "thirdweb/react";
import { client, wallet } from "@/lib/thirdweb";
import Link from "next/link";
import { Button } from "./ui/button";
import { createWallet, injectedProvider } from "thirdweb/wallets";

export function Header() {
  const { connect, isConnecting } = useConnect();
  const account = useActiveAccount();

  return (
    <header className="bg-[#0A0A0A] border-b-2 border-[#FF0B7A] h-[10vh] ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="group">
          <h1 className="font-bold text-4xl text-white group-hover:text-[#FF0B7A] transition-colors duration-300 ease-in-out">
            NFT
            <span className="text-[#FF0B7A] group-hover:text-white transition-colors duration-300 ease-in-out">
              oodle
            </span>
          </h1>
        </Link>
        {/* {!account?.address ? (
          <Button
            onClick={() =>
              connect(async () => {
                const metamask = createWallet("io.metamask");
                await metamask.connect({ client});
                return metamask;
              })
            }
            className="bg-[#FF0B7A] text-white px-4 py-2 rounded-full hover:bg-[#FF3B9A] transition-colors duration-300 ease-in-out"
            >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
            ) : ( */}
          <ConnectButton
            // className="bg-[#FF0B7A] text-white px-4 py-2 rounded-full hover:bg-[#FF3B9A] transition-colors duration-300 ease-in-out"
            autoConnect={true}
            client={client}
            wallets={[wallet]}
          />
        {/* )} */}
      </div>
    </header>
  );
}

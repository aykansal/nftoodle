"use client";

import { ConnectButton } from "thirdweb/react";
import { client, wallet } from "@/lib/thirdweb";
import { motion } from "framer-motion";
import Link from "next/link";

export function Header() {
  const navItems = [
    { name: "Create", href: "/create" },
    { name: "Gallery", href: "/gallery" },
    // { name: "Profile", href: "/profile" },
  ];

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
        <nav className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-white hover:text-[#FF0B7A] transition-colors duration-200 ease-in-out group"
            >
              <span className="relative z-10">{item.name}</span>
              <motion.div
                className="bottom-0 left-0 absolute bg-[#FF0B7A] w-0 hover:w-full h-0.5 transition-all duration-200 ease-in-out"
                whileHover={{ width: "100%" }}
              />
            </Link>
          ))}
        </nav>
        <ConnectButton
          // className="bg-[#FF0B7A] hover:bg-[#FF3B9A] px-4 py-2 rounded-full text-white transition-colors duration-300 ease-in-out"
          client={client}
          wallets={[wallet]}
          autoConnect={true}
          // className="relative z-10 bg-[#FF0B7A] hover:bg-[#FF3B9A] hover:shadow-lg hover:shadow-[#FF0B7A]/30 px-6 py-2 rounded-full font-semibold text-white transform transition-all duration-300 ease-in-out hover:scale-105"page
        />
      </div>
    </header>
  );
}

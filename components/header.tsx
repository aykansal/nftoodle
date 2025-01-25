"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Wallet from "@/components/thirdweb/ConnectWallet";

export function Header() {
  const navItems = [
    { name: "Create", href: "/create" },
    { name: "Gallery", href: "/gallery" },
    { name: "MyMemes", href: "/my-memes" },
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
              <span className="relative text-2xl mt-20 font-ibm z-10">{item.name}</span>
              <motion.div
                className="bottom-0 left-0 absolute bg-[#FF0B7A] w-0 hover:w-full h-0.5 transition-all duration-200 ease-in-out"
                whileHover={{ width: "100%" }}
              />
            </Link>
          ))}
        </nav>
        <Wallet />
      </div>
    </header>
  );
}

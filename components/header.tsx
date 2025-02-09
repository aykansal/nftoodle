'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Wallet from '@/components/thirdweb/ConnectWallet';

export default function Header() {
  const navItems = [
    // { name: 'Create', href: '/create' },
    { name: 'Platforms', href: '/platforms' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'MyMemes', href: '/my-memes' },
    { name: 'GameZone', href: '/gamezone' },
    // { name: "Profile", href: "/profile" },
  ];

  return (
    <header className="border-[#FF0B7A] bg-[#0A0A0A] border-b-2 h-[10vh]">
      <div className="flex justify-between items-center mx-auto px-4 py-3 container">
        <Link href="/" className="group">
          <h1 className="group-hover:text-[#FF0B7A] font-bold font-squid text-4xl text-white transition-colors duration-300 ease-in-out">
            NFT
            <span className="group-hover:text-white font-squid text-[#FF0B7A] transition-colors duration-300 ease-in-out">
              oodle
            </span>
          </h1>
        </Link>
        <nav className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative text-white hover:text-[#FF0B7A] transition-colors duration-200 ease-in-out"
            >
              <span className="relative z-10 mt-20 font-ibm text-2xl">
                {item.name}
              </span>
              <motion.div
                className="bottom-0 left-0 absolute bg-[#FF0B7A] w-0 hover:w-full h-0.5 transition-all duration-200 ease-in-out"
                whileHover={{ width: '100%' }}
              />
            </Link>
          ))}
        </nav>
        <Wallet />
      </div>
    </header>
  );
}

import { Outlet } from "react-router";
import { Toaster } from "../ui/sonner";
import AuthProvider from "../AuthProvider";
import MintingOverlayWrapper from "../thirdweb/MintingOverlayWrapper";
import { MintingProvider } from "@/contexts/MintingContext";
import { motion } from "motion/react";
import { floatingElements, floatingVariants } from "@/lib/data";

export default function SecondaryLayout() {
  return (
    <AuthProvider>
      <MintingProvider>
        <div className="relative">
          <div className="relative z-10 flex flex-col h-full">
            <div className="relative px-3 xs:px-4 md:px-6 lg:px-8 py-4 xs:py-6 md:py-8 w-full min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-100px)] h-full grow overflow-auto text-white">
              <Outlet />
              <div className="absolute inset-0 pointer-events-none overflow-hidden max-w-full">
                {floatingElements.map((item, index) => (
                  <motion.div
                    key={index}
                    initial="initial"
                    animate="float"
                    variants={floatingVariants}
                    className={`absolute ${item.position}`}
                  >
                    <item.Icon className={`${item.size} text-[#FF0B7A]/30`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <MintingOverlayWrapper />
          <Toaster />
        </div>
      </MintingProvider>
    </AuthProvider>
  );
}

;

import { motion } from "motion/react";
import { floatingElements, floatingVariants } from "@/lib/data";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative px-3 xs:px-4 md:px-6 lg:px-8 py-4 xs:py-6 md:py-8 w-full min-h-[calc(100vh-70px)] md:min-h-[calc(100vh-100px)] h-full grow overflow-auto text-white">
      {children}
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
  );
};

export default MainContainer;

;

import { useEffect, useState } from "react";
import { motion, useAnimation } from "motion/react";
import { floatingElements, floatingVariants } from "@/lib/data";

const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const backgroundControls = useAnimation();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Calculate position relative to center of screen
      const moveX = clientX - windowSize.width / 2;
      const moveY = clientY - windowSize.height / 2;

      // Set mouse position for glow effect (constrained to viewport)
      setMousePosition({
        x: Math.max(0, Math.min(clientX, windowSize.width)),
        y: Math.max(0, Math.min(clientY, windowSize.height)),
      });

      // For background parallax effect, use a dampened value
      const offsetFactor = 0.008; // Reduced from 0.01 for subtler effect
      backgroundControls.start({
        x: moveX * offsetFactor,
        y: moveY * offsetFactor,
        transition: { type: "spring", stiffness: 150, damping: 15 },
      });
    };

    if (windowSize.width > 0) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [backgroundControls, windowSize]);

  return (
    <>
      {/* Static background elements */}
      <div className="fixed inset-0 bg-linear-to-r from-[#0A0A0A] via-[#1a1a1a] to-[#0A0A0A] z-0"></div>
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-[#FF0B7A]/5 to-transparent z-0"></div>

      {/* Circuit pattern overlay */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <svg className="w-full h-full opacity-10">
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path d="M0 50h100M50 0v100" stroke="#FF0B7A" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="3" fill="#FF0B7A" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Static glowing orbs */}
      {/* <div className="fixed top-1/4 right-1/4 w-32 h-32 rounded-full bg-[#FF0B7A]/10 blur-3xl z-0"></div>
      <div className="fixed bottom-1/4 left-1/3 w-40 h-40 rounded-full bg-[#FF0B7A]/10 blur-3xl z-0"></div> */}

      {/* Floating Elements with Mouse Interaction */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ maxWidth: "100%" }}
      >
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

      {/* Interactive glow effect following cursor */}
      <div
        className="fixed pointer-events-none"
        style={{
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "300px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(255,11,122,0.27) 0%, rgba(255,11,122,0) 70%)", // Increased opacity from 0.15 to 0.3
            left: mousePosition.x,
            top: mousePosition.y,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </>
  );
};

export default Background;

"use client";

import { Github, Twitter } from "lucide-react";
import { motion } from "motion/react";
import { Link, NavLink } from "react-router";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    textShadow: "0 0 8px rgb(255,11,122)",
    boxShadow: "0 0 8px rgb(255,11,122)",
    transition: {
      duration: 0.3,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const cardVariants = {
  hover: {
    scale: 1.05,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="w-full px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <motion.h1
                  className="text-6xl md:text-8xl font-bold leading-tight"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.span
                    className="text-[#FF0B7A] block"
                    whileHover={{
                      rotate: [0, -2, 2, 0],
                      transition: { duration: 0.3 },
                    }}
                  >
                    BLAST THE
                  </motion.span>
                  <motion.span
                    className="text-white block"
                    whileHover={{
                      rotate: [0, 1, -1, 0],
                      transition: { duration: 0.3 },
                    }}
                  >
                    NFTs.
                  </motion.span>
                </motion.h1>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <p className="text-xl text-gray-300 max-w-lg">
                  Step in bold, move fast, and rewrite the rules. Own your
                  space, outshine the competition, and make every moment count.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-8 py-4 text-lg bg-black border-2 border-[#FF0B7A] rounded-lg hover:bg-[#FF0B7A]/10 transition-all duration-300"
                >
                  Launch with a Meme
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right side - Character */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <img
                  src="/mascot2.png?height=400&width=400"
                  alt="NFToodle Mascot"
                  width={400}
                  height={400}
                  className="object-contain drop-shadow-xl"
                  style={{ filter: "drop-shadow(0 0 30px #FF0B7A88)" }}
                />
                {/* Social media cards floating around character */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute top-10 right-0 bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-lg border border-[#FF0B7A]/30"
                >
                  <div className="text-xs text-gray-400">Meme posted</div>
                  <div className="text-sm text-[#FF0B7A]"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Get Started Section */}
      <section className="w-full px-4 md:px-8 py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              HOW TO GET <span className="text-[#FF0B7A]">STARTED</span>
            </h2>
            <p className="text-xl text-gray-300">
              Break boundaries, shatter expectations, and lead with fearless
              ambition.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Step 1 */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 p-8 rounded-2xl border-2 border-[#FF0B7A]/30 backdrop-blur-sm"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">@</span>
                </div>
                <h3 className="text-2xl font-bold">Meme</h3>
                <p className="text-gray-300">
                  Start your meme with{" "}
                  <span className="text-[#FF0B7A] font-mono">@NFToodle</span>{" "}
                  this post and we'll handle the rest.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gradient-to-br from-pink-400/20 to-purple-500/20 p-8 rounded-2xl border-2 border-[#FF0B7A]/30 backdrop-blur-sm"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl font-bold">Instantly Deployed</h3>
                <p className="text-gray-300">
                  Our AI deploys your token. No Forms, No Bullshit.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gradient-to-br from-green-400/20 to-blue-500/20 p-8 rounded-2xl border-2 border-[#FF0B7A]/30 backdrop-blur-sm"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-2xl font-bold">Start Trading</h3>
                <p className="text-gray-300">
                  Our AI Agents will instantly reply with the CA of your token.
                  Launch before the herd.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center"
          >
            <div className="text-lg font-bold mb-2">
              <span className="text-[#FF0B7A]">DEPLOY FOR FREE.</span> PAY ONLY
              WITH CLOUT.
            </div>
          </motion.div>
        </div>
      </section>

      {/* Try It Now Section */}
      <section className="w-full px-4 md:px-8 py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-6xl font-bold">
              TRY IT <span className="text-[#FF0B7A]">NOW</span>
            </h2>

            <div className="space-y-4">
              <p className="text-xl text-gray-300">
                Break through barriers, spark a movement, and dominate the space
                with fearless energy.
              </p>
              <p className="text-lg text-gray-400">
                This isn't just a launch—it's a market takeover.
              </p>
            </div>

            <NavLink to="/platforms" className="text-lg">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-4 text-lg bg-black border-2 border-[#FF0B7A] rounded-lg hover:bg-[#FF0B7A]/10 transition-all duration-300"
              >
                Launch with a Meme
              </motion.button>
            </NavLink>
          </motion.div>
        </div>
      </section>

      {/* Footer with Multiple Characters */}
      <footer className="w-full px-4 md:px-8 py-8 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h3 className="text-2xl font-bold">
                <span className="text-[#FF0B7A]">NFT</span>oodle
              </h3>
              <p className="text-gray-400 mt-1">
                The next generation of NFT creation
              </p>
            </div>

            <div className="flex space-x-6">
              <Link
                to="https://x.com/nftoodlehq"
                className="text-gray-400 hover:text-[#FF0B7A] transition-colors"
                target="_blank"
              >
                <Twitter className="h-5 w-5 inline-block" />
              </Link>
              <Link
                to="https://github.com/aykansal/nftoodle"
                className="text-gray-400 hover:text-[#FF0B7A] transition-colors"
                target="_blank"
              >
                <Github className=" h-5 w-5 inline-block" />
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 NFToodle. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-gray-400">Made with ❤️ by</span>
              <Link
                to="https://x.com/aykansal"
                className="text-gray-400 hover:text-[#FF0B7A] transition-colors"
              >
                Aykansal
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

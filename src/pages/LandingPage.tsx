import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
      yoyo: Infinity,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const socialIconVariants = {
  hover: {
    scale: 1.2,
    color: "#FF0B7A",
    transition: {
      duration: 0.2,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 min-h-[80vh] w-full flex flex-col md:flex-row justify-center items-center px-4 md:px-8 overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left space-y-8 relative z-10 max-w-4xl mx-auto md:mx-0 md:flex-1"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h1
              className="text-5xl md:text-7xl font-bold font-squid text-white"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <motion.span
                className="text-[#FF0B7A] inline-block"
                whileHover={{
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.3 },
                }}
              >
                Game
              </motion.span>{" "}
              On,{" "}
              <motion.span
                className="text-[#FF0B7A] inline-block"
                whileHover={{
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.3 },
                }}
              >
                Meme
              </motion.span>{" "}
              On
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-2xl mx-auto md:mx-0"
            >
              Create, trade, and showcase unique NFTs with our next-gen platform
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start items-center pt-8"
          >
            <Link to="/platforms">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-3 text-xl rounded-lg bg-gradient-to-r from-[#FF0B7A] to-[#FF0B7A]/80 hover:from-[#FF0B7A]/90 hover:to-[#FF0B7A]/70 transition-all duration-300"
              >
                Start Creating
              </motion.button>
            </Link>

            <Link to="/gallery">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-8 py-3 text-xl rounded-lg border-2 border-[#FF0B7A] hover:bg-[#FF0B7A]/10 transition-all duration-300"
              >
                View Gallery
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex-1 flex justify-center md:justify-end items-center mt-12 md:mt-0"
        >
          <img
            src="/mascot2.png"
            alt="NFToodle Mascot"
            className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-xl squid-filter-neon"
            style={{ filter: "drop-shadow(0 0 30px #FF0B7A88)" }}
          />
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="py-16 px-4 md:px-8 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Why Choose <span className="text-[#FF0B7A]">NFToodle</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 backdrop-blur-sm"
            >
              <div className="text-[#FF0B7A] text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">Create Unique NFTs</h3>
              <p className="text-gray-300">Express your creativity with our easy-to-use tools and turn your ideas into valuable digital assets.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 backdrop-blur-sm"
            >
              <div className="text-[#FF0B7A] text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Trade Securely</h3>
              <p className="text-gray-300">Buy and sell NFTs on our secure marketplace with transparent transactions and low fees.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 backdrop-blur-sm"
            >
              <div className="text-[#FF0B7A] text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold mb-2">Join the Community</h3>
              <p className="text-gray-300">Connect with creators and collectors from around the world in our growing NFT community.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white">
                <span className="text-[#FF0B7A]">NFT</span>oodle
              </h3>
              <p className="text-gray-400 mt-2">The next generation of NFT creation</p>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex space-x-6"
            >
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
                className="text-gray-400 hover:text-[#FF0B7A] text-2xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
                className="text-gray-400 hover:text-[#FF0B7A] text-2xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
                className="text-gray-400 hover:text-[#FF0B7A] text-2xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover="hover"
                className="text-gray-400 hover:text-[#FF0B7A] text-2xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
            </motion.div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 NFToodle. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/terms" className="text-gray-500 hover:text-[#FF0B7A] text-sm">Terms</a>
              <a href="/privacy" className="text-gray-500 hover:text-[#FF0B7A] text-sm">Privacy</a>
              <a href="/contact" className="text-gray-500 hover:text-[#FF0B7A] text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
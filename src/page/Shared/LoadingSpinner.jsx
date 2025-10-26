import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaStar, FaVideo } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden bg-black sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#0084FF] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-[#66B5FF] rounded-full opacity-30 animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#0084FF] rounded-full opacity-25 animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-[#66B5FF] rounded-full opacity-40 animate-pulse"></div>
      </div>

      <div className="space-y-8 text-center">
        {/* Main Spinner */}
        <div className="relative flex items-center justify-center">
          {/* Outer Orbital Ring */}
          <motion.div
            className="absolute w-32 h-32 border-2 border-[#0084FF]/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Middle Orbital Ring */}
          <motion.div
            className="absolute w-24 h-24 border-2 border-[#66B5FF]/30 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Central Spinner */}
          <motion.div
            className="relative w-20 h-20 bg-gradient-to-br from-[#0084FF] to-[#66B5FF] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#0084FF]/30"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {/* Inner Icon */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <FaVideo className="w-8 h-8 text-white" />
            </motion.div>

            {/* Pulsing Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-[#0084FF] rounded-2xl"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Orbiting Elements */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute w-4 h-4 bg-gradient-to-r from-[#0084FF] to-[#66B5FF] rounded-full shadow-lg shadow-[#0084FF]/50"
              animate={{
                rotate: 360,
                x: 60 * Math.cos((index * 2 * Math.PI) / 3),
                y: 60 * Math.sin((index * 2 * Math.PI) / 3),
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.2,
              }}
            >
              <div className="w-full h-full rounded-full bg-white/20 animate-pulse" />
            </motion.div>
          ))}
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-[#0084FF]/10 to-[#66B5FF]/10 backdrop-blur-sm border border-[#0084FF]/20 shadow-lg shadow-[#0084FF]/5">
            <div className="w-1.5 h-1.5 bg-[#0084FF] rounded-full animate-pulse"></div>
            <span className="text-[#0084FF] font-semibold text-sm tracking-wider">
              LOADING EXPERIENCE
            </span>
            <div className="w-1.5 h-1.5 bg-[#66B5FF] rounded-full animate-pulse"></div>
          </div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-white md:text-4xl"
          >
            Preparing Your
            <span className="bg-gradient-to-r from-[#66B5FF] via-[#0084FF] to-[#66B5FF] bg-clip-text text-transparent bg-size-200 animate-gradient block">
              Cosmic Journey
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-md mx-auto text-lg font-light tracking-wide text-gray-300/80"
          >
            Loading stellar content and cinematic experiences...
          </motion.p>

          {/* Progress Dots */}
          <motion.div
            className="flex justify-center gap-2 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-[#0084FF] rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Additional Decorative Elements */}
        <div className="absolute transform -translate-x-1/2 bottom-8 left-1/2">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center"
          >
            <span className="text-[#0084FF] text-sm tracking-widest font-light flex items-center gap-2">
              <FaRocket className="w-3 h-3" />
              PREPARING FOR LAUNCH
              <FaStar className="w-3 h-3" />
            </span>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Custom CSS */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }

        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;

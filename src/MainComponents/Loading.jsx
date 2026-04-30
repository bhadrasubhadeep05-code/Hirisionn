import React from 'react';
import { motion } from 'motion/react';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0F172A] flex flex-col items-center justify-center">
      {/* Background subtle glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-[#FB923C]/5 to-transparent rounded-full blur-3xl" />
      
      {/* Main container */}
      <div className="relative w-72 flex flex-col items-center gap-8">
        {/* Logo that ascends with progress */}
        <motion.div
          className="absolute -top-16 left-0"
          style={{ y: -20 }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Hirisonn Cloud Logo SVG */}
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M22 38C22 33.5817 25.5817 30 30 30H34C38.4183 30 42 33.5817 42 38V50H22V38Z"
              stroke="#FB923C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.path
              d="M28 38L32 32L36 38"
              stroke="#FB923C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            />
            
            <motion.path
              d="M32 32V46"
              stroke="#FB923C"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
            />
            
            {/* Cloud shape */}
            <motion.path
              d="M20 26C16.6863 26 14 28.6863 14 32C14 35.3137 16.6863 38 20 38H44C47.3137 38 50 35.3137 50 32C50 28.6863 47.3137 26 44 26C44 20.4772 39.5228 16 34 16C30.2715 16 27.0403 18.0361 25.4294 21.2538"
              stroke="#FB923C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
          
          {/* Glow effect around logo */}
          <motion.div
            className="absolute inset-0 rounded-full blur-xl bg-[#FB923C]"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Progress bar container */}
        <div className="w-full h-2 rounded-full bg-[#1E293B]/80 overflow-hidden relative">
          {/* Progress fill gradient */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FB923C] via-[#FDBA74] to-[#FB923C] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Trailing glow effect */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-6 bg-gradient-to-r from-[#FB923C]/60 via-[#FDBA74]/30 to-transparent blur-md"
            initial={{ left: "-10%", width: "40%" }}
            animate={{ left: ["-10%", "90%", "-10%"] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Loading text */}
        <motion.p 
          className="text-[#94A3B8] text-sm font-medium tracking-wider uppercase mt-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          Taking Your Dreams to Greater Heights
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;
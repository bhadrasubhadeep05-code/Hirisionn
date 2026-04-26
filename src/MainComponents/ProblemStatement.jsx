import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import CountUp from "./CountUp";
const ProblemStatement = () => {
  const navigate = useNavigate();
  return (
    <section className="screen2 min-h-screen relative overflow-hidden bg-[#F8FAFC] flex items-center justify-center">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#22D3EE]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[550px] h-[550px] bg-[#818CF8]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 p-8 sm:p-14 lg:p-20"
        >
          {/* TOP SECTION */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
            {/* Left: 82% */}
            <div className="flex-1">
              <motion.h1
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[10rem] font-heading font-black leading-none tracking-tight text-[#0F172A] flex gap-2 md:gap-4"
              >
                <span><CountUp to={82} /></span><span className="text-[#22D3EE]">%</span>
              </motion.h1>

              <p className="mt-4 text-[#0F172A] font-extrabold font-body leading-tight text-2xl sm:text-4xl md:text-5xl">
                employers struggle to hire
              </p>

              <p className="mt-2 text-slate-700 font-bold font-body text-xl sm:text-3xl md:text-4xl leading-snug">
                the right person
              </p>
            </div>

            {/* Right: 5th */}
            <div className="flex-1 flex flex-col items-start lg:items-end">
              <p className="text-slate-700 font-bold text-xl font-body sm:text-3xl md:text-4xl mb-2">
                India ranks
              </p>

              <motion.h2
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-[4.5rem] font-heading sm:text-[6rem] md:text-[8rem] lg:text-[9rem] font-black leading-none text-[#0F172A] flex gap-2 md:gap-4"
              >
                <span><CountUp to={5} /></span><span className="text-[#818CF8] text-[0.55em] align-top">th</span>
              </motion.h2>

              <p className="mt-3 text-[#0F172A] font-body font-extrabold text-2xl sm:text-4xl md:text-5xl text-left lg:text-right">
                in global talent shortage
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="my-12 sm:my-16 flex items-center justify-center gap-4">
            <div className="h-[2px] w-16 sm:w-24 bg-slate-300" />
            <div className="w-4 h-4 rounded-full bg-[#22D3EE]" />
            <div className="h-[2px] w-16 sm:w-24 bg-slate-300" />
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Source */}
            <p className="text-slate-500 italic text-sm font-body sm:text-lg text-center lg:text-left">
              (Courtesy: 2026 Global Talent Shortage Survey)
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="bg-[#22D3EE] hover:bg-[#1cb8cf] font-heading transition-all duration-300 text-[#0F172A] font-bold text-lg sm:text-xl px-20 md:px-10 py-4 rounded-2xl shadow-lg"
              onClick={()=> navigate('/manpower')}
            >
              Find a Job
            </motion.button>
          </div>

         
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;
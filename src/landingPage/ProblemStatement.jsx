import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import CountUp from "../MainComponents/CountUp";
const ProblemStatement = () => {
  const navigate = useNavigate();
  return (
   <section className="screen2 h-full relative overflow-hidden bg-[#F8FAFC] flex items-center justify-center">

  {/* Locomotive wrapper */}
  <div
    data-scroll
    data-scroll-speed="-0.05"
    className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-16 md:py-20"
  >

    {/* Framer Motion animation */}
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
      className="bg-[#12171B] rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl border border-slate-200 p-6 sm:p-10 md:p-14 lg:p-20 shadow-[#12171B]"
    >

      {/* ================= TOP ================= */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 sm:gap-10 lg:gap-12">

        {/* Left */}
        <div
          data-scroll
          data-scroll-speed="-0.02"
          className="flex-1"
        >
          <motion.h1
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-[3rem] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] xl:text-[10rem] font-heading font-black leading-none tracking-tight text-white flex gap-2 md:gap-4"
          >
            <span>
              <CountUp to={82} />
            </span>
            <span className="text-[#E8791E]">%</span>
          </motion.h1>

          <p className="mt-3 sm:mt-4 text-white font-extrabold font-body leading-tight text-xl sm:text-2xl md:text-4xl lg:text-5xl">
            employers struggle to hire
          </p>

          <p className="mt-1 sm:mt-2 text-white font-bold font-body text-lg sm:text-xl md:text-3xl lg:text-4xl leading-snug">
            the right person
          </p>
        </div>

        {/* Right */}
        <div
          data-scroll
          data-scroll-speed="0.02"
          className="flex-1 flex flex-col items-start lg:items-end"
        >
          <p className="text-white font-bold text-lg sm:text-xl md:text-3xl lg:text-4xl mb-2">
            India ranks
          </p>

          <motion.h2
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-[2.8rem] sm:text-[4.5rem] md:text-[6.5rem] lg:text-[8rem] xl:text-[9rem] font-heading font-black leading-none text-white flex gap-2 md:gap-4"
          >
            <span>
              <CountUp to={5} />
            </span>
            <span className="text-[#E8791E] text-[0.55em] align-top">
              th
            </span>
          </motion.h2>

          <p className="mt-2 sm:mt-3 text-white font-body font-extrabold text-xl sm:text-2xl md:text-4xl lg:text-5xl text-left lg:text-right">
            in global talent shortage
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        data-scroll
        data-scroll-speed="-0.01"
        className="my-8 sm:my-12 md:my-16 flex items-center justify-center gap-4"
      >
        <div className="h-[2px] w-10 sm:w-16 md:w-24 bg-slate-300" />
        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#E8791E]" />
        <div className="h-[2px] w-10 sm:w-16 md:w-24 bg-slate-300" />
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">

        <p
          data-scroll
          data-scroll-speed="-0.01"
          className="text-slate-500 italic text-xs sm:text-sm md:text-lg text-center lg:text-left"
        >
          (Courtesy: 2026 Global Talent Shortage Survey)
        </p>

        <div
          data-scroll
          data-scroll-speed="0.03"
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="bg-[#E8791E] hover:bg-[#f0710a] transition-all duration-300 text-[#0F172A] font-heading font-bold text-base sm:text-lg md:text-xl px-8 sm:px-12 md:px-20 py-3 sm:py-4 rounded-2xl shadow-lg w-full sm:w-auto"
            onClick={() => navigate("/manpower")}
          >
            Find a Job
          </motion.button>
        </div>

      </div>

    </motion.div>

  </div>

</section>
  );
};

export default ProblemStatement;
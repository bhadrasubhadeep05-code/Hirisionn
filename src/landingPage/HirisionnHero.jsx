import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  GraduationCap,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

const SERVICES = [
  {
    id: "jobs",
    step: "Step 01",
    title: "Jobs",
    blurb: "Full-time roles, matched to where you want to go",
    Icon: Briefcase,
  },
  {
    id: "internships",
    step: "Step 02",
    title: "Internships",
    blurb: "Real employer projects that build real confidence",
    Icon: GraduationCap,
  },
  {
    id: "readiness",
    step: "Step 03",
    title: "Corporate Readiness",
    blurb: "Training that gets you hired, and helps you stay",
    Icon: ShieldCheck,
  },
  {
    id: "skilling",
    step: "Step 04",
    title: "Skilling Programmes",
    blurb: "Courses in what employers are hiring for right now",
    Icon: BookOpen,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function HirisionnHero() {
  const reducedMotion = useReducedMotion();
  const [isRingHovered, setIsRingHovered] = useState(false);
  const navigate = useNavigate()

  return (
    <main
      data-scroll
      data-scroll-speed="-0.05"
      className="min-h-screen overflow-x-hidden bg-[#12171B] font-['Work_Sans',sans-serif] text-[#F6F8F8] antialiased"
    >
      <header className="relative isolate mx-auto grid max-w-[1280px] items-center gap-8 overflow-x-hidden px-5 pb-12 pt-28 sm:gap-10 sm:px-[5vw] sm:pb-20 sm:pt-32 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.9fr)] lg:gap-16 lg:px-14 lg:pb-24 lg:pt-[180px]">
        {/* Decorative glow — clipped safely inside the hero */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.35)_0%,transparent_68%)] blur-[10px] sm:-right-20 sm:-top-20 sm:h-[420px] sm:w-[420px] lg:-right-[6%] lg:-top-[10%] lg:h-[520px] lg:w-[520px]" />

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
          className="relative z-10 max-w-[610px]"
        >
          <motion.div
            variants={reveal}
            transition={{ duration: 0.45 }}
            className="mb-4 inline-flex items-center gap-2 text-xs font-medium text-[#F2A93C] sm:mb-5 sm:gap-2.5 sm:text-base"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#F2A93C] to-[#E8791E] sm:h-2 sm:w-2" />
            connecting potential with possibilities
          </motion.div>

          <motion.h1
            variants={reveal}
            transition={{ duration: 0.45 }}
            className="font-['Manrope',sans-serif] text-[clamp(2rem,10vw,3.5rem)] font-extrabold leading-[1.08] tracking-[-0.01em]"
          >
            Four ways in.{" "}
            <span className="bg-gradient-to-br from-[#F2A93C] to-[#E8791E] bg-clip-text text-transparent">
              One direction: forward.
            </span>
          </motion.h1>

          <motion.p
            variants={reveal}
            transition={{ duration: 0.45 }}
            className="mt-4 max-w-[500px] pr-5 md:pr-0 text-sm leading-relaxed text-[#AAB5BA] sm:mt-5 sm:text-base sm:leading-[1.7]"
          >
            Hirisionn brings jobs, internships, corporate-readiness training and
            skilling programmes into one place — so wherever you&apos;re
            starting from, there&apos;s a way through.
          </motion.p>

          <motion.div
            variants={reveal}
            transition={{ duration: 0.45 }}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>{
                navigate('/register')
              }}
              className="inline-flex min-h-12 w-[240px] md:w-[340px] items-center justify-center rounded-lg bg-gradient-to-br from-[#F2A93C] to-[#E8791E] px-5 py-3 text-sm font-semibold text-[#12171B] shadow-[0_10px_24px_-10px_rgba(232,121,30,0.45)] sm:px-6 sm:text-[0.95rem]"
            >
              Explore Opportunities →
            </motion.button>

            <motion.button
              whileHover={{ y: -2, borderColor: "#859299" }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>navigate('/business-enquiry')}
              className="inline-flex min-h-12 w-[200px] md:w-[340px] items-center justify-center rounded-lg border border-white/[0.14] px-5 py-3 text-sm font-semibold text-[#F6F8F8] transition-colors hover:bg-white/[0.04] sm:px-6 sm:text-[0.95rem]"
            >
              Partner With Us
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D services ring */}
        <div className="relative z-10 flex h-[210px] w-full max-w-[520px] items-center justify-center justify-self-center [perspective:700px] sm:h-[300px] sm:[perspective:1100px] lg:h-[400px] lg:[perspective:1300px]">
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-8 w-[180px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(232,121,30,0.28),transparent_70%)] sm:h-10 sm:w-[280px]" />

          <motion.div
            animate={
              reducedMotion || isRingHovered ? undefined : { rotateY: 360 }
            }
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
            onHoverStart={() => setIsRingHovered(true)}
            onHoverEnd={() => setIsRingHovered(false)}
            className="relative h-[170px] w-[170px] [--ring-depth:110px] [transform-style:preserve-3d] sm:h-[190px] sm:w-[190px] sm:[--ring-depth:160px] lg:h-[230px] lg:w-[230px] lg:[--ring-depth:200px]"
          >
            {SERVICES.map(({ id, title, blurb, Icon }, index) => (
              <article
                key={id}
                style={{ "--ring-angle": `${index * 90}deg` }}
                className="absolute inset-0 flex h-[170px] w-[170px] flex-col items-center justify-center rounded-[14px] border border-white/[0.1] bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-2 text-center shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md [transform:rotateY(var(--ring-angle))_translateZ(var(--ring-depth))] sm:h-[190px] sm:w-[190px] sm:rounded-[20px] sm:p-4 lg:h-[230px] lg:w-[230px] lg:p-5"
              >
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#F2A93C] to-[#E8791E] sm:mb-3 sm:h-11 sm:w-11 sm:rounded-xl lg:h-[46px] lg:w-[46px]">
                  <Icon
                    strokeWidth={1.8}
                    className="h-6 w-6 text-[#12171B] sm:h-5 sm:w-5 lg:h-6 lg:w-6"
                  />
                </div>

                <b className="font-['Manrope',sans-serif] text-[14px] font-bold leading-tight sm:text-sm lg:text-base">
                  {title}
                </b>

                <span className="mt-1 block text-[9px] leading-tight text-[#AAB5BA] sm:block md:text-[0.82rem]">
                  {blurb}
                </span>
              </article>
            ))}
          </motion.div>
        </div>
      </header>
    </main>
  );
}
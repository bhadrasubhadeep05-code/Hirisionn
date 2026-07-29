import React from 'react'
import { motion } from "framer-motion";

const CorporatePage3 = () => {
   const TESTIMONIALS = [
  {
    quote:
      "The readiness training completely changed how I approached interviews. I had two offers within a month of graduating.",
    name: "Ananya R.",
    role: "Placed — Business Analyst",
    initial: "A",
  },
  {
    quote:
      "Hirisionn's campus drive brought us candidates who were genuinely prepared. Our time-to-hire dropped significantly.",
    name: "Rohit M.",
    role: "HR Lead, Manufacturing Firm",
    initial: "R",
  },
  {
    quote:
      "My internship through Hirisionn turned into a full-time offer. The mentorship along the way made all the difference.",
    name: "Sneha K.",
    role: "Former Intern, now Associate",
    initial: "S",
  },
];


  /* ─── ANIMATION VARIANTS ─── */
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: i * 0.12,
      },
    }),
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  return (
    <>
      <div
      data-scroll
       data-scroll-speed="0.1"
        className="bg-[#f6f9fb] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={stagger}
                  className="mx-auto max-w-xl text-center"
                >
                  <motion.div
                    variants={fadeUp}
                    className="mb-4 inline-flex items-center gap-2.5 font-heading text-xs font-bold uppercase tracking-[0.14em] text-[#f2872e]"
                  >
                    <span className="inline-block h-0.5 w-5 rounded-full bg-[#f2872e]" />
                    Success Stories
                  </motion.div>
                  <motion.h2
                    variants={fadeUp}
                    className="font-heading text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#0f2b38]"
                  >
                    Trusted by students,{" "}
                    <span className="bg-gradient-to-r from-[#f2872e] to-[#ffc857] bg-clip-text text-transparent">
                      colleges and companies
                    </span>
                  </motion.h2>
                </motion.div>
      
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={stagger}
                  className="mt-12 grid gap-6 md:grid-cols-3"
                >
                  {TESTIMONIALS.map((t) => (
                    <motion.article
                      key={t.name}
                      variants={fadeUp}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      className="rounded-2xl border border-[#e3ebef] bg-[#f6f9fb] p-7"
                    >
                      <div className="mb-3 tracking-[2px] text-[#f2872e]">★★★★★</div>
                      <p className="text-[0.92rem] leading-relaxed text-[#164257]">
                        "{t.quote}"
                      </p>
                      <div className="mt-5 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#f2872e] to-[#ffc857] font-heading text-sm font-extrabold text-white">
                          {t.initial}
                        </div>
                        <div>
                          <b className="block text-sm font-bold text-[#0f2b38]">
                            {t.name}
                          </b>
                          <span className="text-xs text-[#5c7182]">{t.role}</span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </div>
      </div>
    </>
  )
}

export default CorporatePage3
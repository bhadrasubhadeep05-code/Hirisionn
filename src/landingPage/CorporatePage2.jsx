import { motion } from "framer-motion";

const CorporatePage2 = () => {
const PROCESS = [
  {
    step: "01",
    title: "Register & Assess",
    desc: "Candidates share their goals and current skill level; we assess readiness and identify the gaps to close.",
  },
  {
    step: "02",
    title: "Train & Prepare",
    desc: "Corporate readiness workshops build communication, interview skills, and workplace competencies employers look for.",
  },
  {
    step: "03",
    title: "Match & Interview",
    desc: "We connect candidates with roles that fit their profile and coordinate the interview process end to end.",
  },
  {
    step: "04",
    title: "Place & Support",
    desc: "We stay involved post-placement, supporting both candidate and employer well beyond day one.",
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
        id="process"
        data-scroll
        data-scroll-speed="0.2"
        className="bg-[#f6f9fb] py-20 sm:py-28"
      >
       <div className="mx-auto max-w-6xl px-5 sm:px-8">
                 <motion.div
                   initial="hidden"
                   whileInView="visible"
                   viewport={{ once: true, margin: "-80px" }}
                   variants={stagger}
                   className="mx-auto max-w-2xl text-center"
                 >
                   <motion.div
                     variants={fadeUp}
                     className="mb-4 inline-flex items-center gap-2.5 font-heading text-xs font-bold uppercase tracking-[0.14em] text-[#f2872e]"
                   >
                     <span className="inline-block h-0.5 w-5 rounded-full bg-[#f2872e]" />
                     How It Works
                   </motion.div>
                   <motion.h2
                     variants={fadeUp}
                     className="font-heading text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#0f2b38]"
                   >
                     A clear path from{" "}
                     <span className="bg-gradient-to-r from-[#f2872e] to-[#ffc857] bg-clip-text text-transparent">
                       potential to placement
                     </span>
                   </motion.h2>
                   <motion.p
                     variants={fadeUp}
                     className="mt-4 text-[0.95rem] leading-relaxed text-[#5c7182]"
                   >
                     Every candidate moves through the same disciplined process — built
                     for speed, quality and fit.
                   </motion.p>
                 </motion.div>
       
                 {/* Timeline */}
                 <div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                   {/* Connecting line */}
                   <div className="pointer-events-none absolute left-[18px] top-0 h-full w-0.5 bg-[repeating-linear-gradient(to_bottom,#f2872e_0px_8px,transparent_8px_16px)] sm:left-1/2 sm:-translate-x-1/2 sm:top-[34px] sm:h-0.5 sm:w-[calc(100%-3rem)]" />
       
                   {PROCESS.map((p, i) => (
                     <motion.div
                       key={p.step}
                       initial={{ opacity: 0, y: 40 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true, margin: "-60px" }}
                       transition={{
                         duration: 0.55,
                         ease: [0.25, 0.46, 0.45, 0.94],
                         delay: i * 0.12,
                       }}
                       className="relative pl-12 sm:pl-0 sm:text-center"
                     >
                       <motion.div
                         initial={{ scale: 0 }}
                         whileInView={{ scale: 1 }}
                         viewport={{ once: true, margin: "-40px" }}
                         transition={{
                           type: "spring",
                           stiffness: 260,
                           damping: 16,
                           delay: i * 0.12,
                         }}
                         className="absolute left-0 top-0 z-10 flex h-[44px] w-[44px] items-center justify-center rounded-full border-2 border-[#f2872e] bg-white font-heading text-base font-extrabold text-[#f2872e] shadow-[0_12px_24px_-10px_rgba(242,135,46,0.4)] sm:static sm:mx-auto sm:mb-5 sm:h-[68px] sm:w-[68px] sm:text-[1.4rem]"
                       >
                         {p.step}
                       </motion.div>
                       <div className="mt-0 sm:mt-0">
                         <h4 className="font-heading text-[1.05rem] font-bold text-[#0f2b38]">
                           {p.title}
                         </h4>
                         <p className="mt-1.5 text-[0.88rem] leading-relaxed text-[#5c7182]">
                           {p.desc}
                         </p>
                       </div>
                     </motion.div>
                   ))}
                 </div>
               </div>
      </div>
    </>
  );
};

export default CorporatePage2;
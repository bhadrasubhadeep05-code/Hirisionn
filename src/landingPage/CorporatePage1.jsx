import { motion } from "framer-motion";

const CorporatePage1 = () => {
  const MODULES = [
    {
      icon: "📝",
      title: "Resume & LinkedIn Building",
      desc: "Craft ATS-friendly resumes and LinkedIn profiles that get you noticed by recruiters and hiring managers.",
    },
    {
      icon: "🎤",
      title: "Mock Interviews",
      desc: "Simulated interview sessions with real feedback from industry professionals — technical, HR, and case-based rounds.",
    },
    {
      icon: "💬",
      title: "Communication & Soft Skills",
      desc: "Business writing, presentation skills, and workplace communication that set you apart from other candidates.",
    },
    {
      icon: "🏢",
      title: "Workplace Etiquette",
      desc: "Understand corporate culture, professional conduct, email protocols, and how to navigate office dynamics.",
    },
    {
      icon: "📜",
      title: "Industry Certifications",
      desc: "Get certified in high-demand skills aligned with what employers are actively screening for across sectors.",
    },
    {
      icon: "🧮",
      title: "Aptitude & Case Prep",
      desc: "Numerical reasoning, logical thinking, and case study preparation for consulting, finance, and tech roles.",
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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <>
      {/* ────── WHAT WE COVER ────── */}
      <div
        id="programs"
        data-scroll
        data-scroll-speed="-0.02"
        className="bg-[white] py-20 sm:py-28"
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
              Training Modules
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#0f2b38]"
            >
              Everything you need to be{" "}
              <span className="bg-gradient-to-r from-[#f2872e] to-[#ffc857] bg-clip-text text-transparent">
                interview-ready
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 text-[0.95rem] leading-relaxed text-[#5c7182]"
            >
              Each module is built with direct input from our hiring partners,
              so you're learning exactly what employers are screening for.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {MODULES.map((m) => (
              <motion.article
                key={m.title}
                variants={scaleIn}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative overflow-hidden rounded-2xl border border-[#e3ebef] bg-white p-7 transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(15,43,56,0.25)]"
              >
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#164257] to-[#0f2b38] text-2xl shadow-[0_10px_22px_-8px_rgba(28,88,114,0.55)]">
                  {m.icon}
                </span>
                <h3 className="font-heading text-[1.1rem] font-bold text-[#0f2b38]">
                  {m.title}
                </h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-[#5c7182]">
                  {m.desc}
                </p>
                <div className="mt-4 inline-block text-xs font-bold tracking-wide text-[#f2872e] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn More →
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default CorporatePage1;
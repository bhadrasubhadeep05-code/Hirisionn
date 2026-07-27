import { useNavigate } from 'react-router-dom';
import GlassCard from './GlassCard'
import { motion } from "framer-motion";

const FinalCta = () => {
  const navigate = useNavigate()
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
      <div data-scroll data-scroll-speed="-0.02" className="pt-6 pb-32 sm:pt-10 md:pb-36">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
           <GlassCard
          icon="🎓"
          value="3,000+"
          label="Internships Facilitated"
          className="-left-[10px] top-[140px] md:-left-[80px] md:top-[180px] z-10"
          delay={0.2}
        />
        <GlassCard
          icon="💬"
          value="48 hrs"
          label="Average. Candidate Response"
          className="left-[170px] top-[20px] md:left-[770px] md:top-[80px] z-10"
          delay={0.6}
        />
        <GlassCard
          icon="📈"
          value="92%"
          label="Training-to-Placement Rate"
          className="-left-[16px] top-[440px] md:left-[30px] md:top-[280px] z-10"
          delay={0.8}
        />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="relative overflow-hidden rounded-3xl bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-8 py-14 sm:px-14 sm:py-16"
          >
            {/* Glow dot */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(242,135,46,0.45),transparent_70%)]" />

            <div className="relative z-10 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-[460px]">
                <motion.h2
                  variants={fadeUp}
                  className="font-heading text-[clamp(1.4rem,3.5vw,2.2rem)] font-extrabold leading-[1.15] tracking-[-0.02em] text-white"
                >
                  Ready to build what's next?
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="mt-3 text-[0.95rem] leading-relaxed text-[#c9dbe3]"
                >
                  Whether you're chasing your first offer or your next hire,
                  Hirisionn is ready to help. Let's connect potential with
                  possibility.
                </motion.p>
              </div>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={()=>navigate('register')}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff9d42] via-[#f2872e] to-[#e56f16] px-6 py-3 font-heading text-sm font-bold text-white shadow-[0_14px_26px_-10px_rgba(242,135,46,0.55)]"
                >
                  Find Your Placement →
                </motion.button>
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={()=>navigate('/business-enquiry')}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-heading text-sm font-bold text-white backdrop-blur-sm"
                >
                  Request Talent
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FinalCta;

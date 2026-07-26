import { motion } from "framer-motion";

/* ─── FLOATING GLASS CARD ─── */
function GlassCard({ icon, value, label, className, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, 20] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: delay,
        ease: "easeInOut",
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`relative flex items-center gap-3 h-[60px] w-[180px] md:w-[240px] md:h-[80px] rounded-2xl border border-white/30 bg-[#12171B]/40 px-4 py-3 shadow-xl backdrop-blur-lg ${className}`}
    >
      <span className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffc857] to-[#f2872e] text-lg">
        {icon}
      </span>
      <div>
        <b className="block font-heading text-sm md:text-lg text-white">{value}</b>
        <span className="text-[8px] text-xs font-medium text-[#c9dbe3]">{label}</span>
      </div>
    </motion.div>
  );
}
export default GlassCard;

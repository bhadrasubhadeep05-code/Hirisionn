import { motion, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

const CountUp = ({ to, suffix = "", duration = 1.6 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const count = useMotionValue(0);

  const display = useTransform(count, latest =>
    `${Math.round(latest)}${suffix}`
  );

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
    });

    return controls.stop;
  }, [isInView, to]);

  return (
    <motion.h2 ref={ref}>
      {display}
    </motion.h2>
  );
};

export default CountUp;

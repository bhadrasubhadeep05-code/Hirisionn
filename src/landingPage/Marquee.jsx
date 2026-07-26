import { motion } from 'framer-motion'
import React from 'react'

const Marquee = () => {
  return (
    <div data-scroll data-scroll-speed="0.15" className='w-full py-6 sm:py-16  bg-[#E8791E]'>
      <div className="text text-[#F6F8F8] border-t-[0.5px] border-b-[0.5px] border-zinc-300 flex overflow-hidden whitespace-nowrap">
        <motion.h1 initial={{x:0}} animate={{x:"-100%"}} transition={{ease: "linear", repeat: Infinity, duration: 10 }} className='md:text-[12vw] text-[16vw] leading-none font-["Founders_Grotesk_X_Condensed"] font-extrabold md:font-semibold pr-10 uppercase -mb-[2vw] md:-mb-[4vw] py-6 md:py-8 '>CONNECTING POTIENTIAL WITH POSIBILITES</motion.h1>
        <motion.h1 initial={{x:0}} animate={{x:"-100%"}} transition={{ease: "linear", repeat: Infinity, duration: 10 }} className='md:text-[12vw] text-[16vw] leading-none font-["Founders_Grotesk_X_Condensed"] font-extrabold md:font-semibold pr-10 uppercase -mb-[2vw] md:-mb-[8vw] py-6 '>CONNECTING POTIENTIAL WITH POSIBILITES</motion.h1>
      </div>
    </div>
  )
}

export default Marquee


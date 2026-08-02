import React from 'react'
import CountUp from "../MainComponents/CountUp";

const Stats = () => {
  return (
    <div data-scroll data-scroll-speed="0.1" className='bg-gradient-to-br from-[#F2A93C] to-[#E8791E] w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 rounded-2xl p-4 h-[340px] sm:p-0 md:h-40'>
        <div data-scroll data-scroll-speed="0.02" className='font-heading text-2xl sm:text-4xl font-bold text-white flex flex-col items-center justify-center text-center'>
            <CountUp to={2500} suffix='+' />
            <h4 className='font-heading text-sm sm:text-lg font-bold'>Successful Placements</h4>
        </div>
          <div data-scroll data-scroll-speed="0.01" className='font-heading text-2xl sm:text-4xl font-bold text-white flex flex-col items-center justify-center text-center'>
            <CountUp to={250} suffix='+' />
            <h4 className='font-heading text-sm sm:text-lg font-bold'>Hiring Partners</h4>
        </div>
          <div data-scroll data-scroll-speed="-0.01" className='font-heading text-2xl sm:text-4xl font-bold text-white flex flex-col items-center justify-center text-center'>
            <CountUp to={3000} suffix='+' />
            <h4 className='font-heading text-sm sm:text-lg font-bold'>Internships Facilitated</h4>
        </div>
          <div data-scroll data-scroll-speed="-0.02" className='font-heading text-2xl sm:text-4xl font-bold text-white flex flex-col items-center justify-center text-center'>
            <CountUp to={10} suffix='+' />
            <h4 className='font-heading text-sm sm:text-lg font-bold'>States Covered</h4>
        </div>
    </div>
  )
}

export default Stats

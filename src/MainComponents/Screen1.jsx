import React from 'react';
import { motion } from 'motion/react';
import logo from '../assets/logo2.jpeg';
import video from '../assets/video4.mp4'
import { useNavigate } from 'react-router-dom';

const Screen1 = () => {
  const navigate = useNavigate();
  return (
    <section className='relative w-full flex items-center justify-center overflow-hidden min-h-screen sm:h-screen'>
      {/* Blurred Video Background - Mobile 90vh/90vw, Desktop Full Screen */}
      <div className='absolute inset-0 w-full h-full sm:w-screen sm:h-screen'>
        {/* Video Container with Blur Effect */}
        <motion.div 
          className='relative w-full h-full sm:w-full sm:h-full mx-auto sm:mx-0 rounded-2xl sm:rounded-none overflow-hidden shadow-2xl sm:shadow-none'
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Video Background with Blur */}
          <video 
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter blur-sm"
          >
            <source src={video} type="video/mp4" />
          </video>
          
          {/* Dark Gradient Overlay for Content Clarity */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />
        </motion.div>
      </div>

      {/* Content Overlay - Centered Over Blurred Video */}
      <div className='relative z-20 text-center max-w-xs sm:max-w-xl md:max-w-2xl px-4 sm:px-6 md:px-8 py-8 sm:py-0 md:m-0 mb-36'>
        {/* Logo */}
        <motion.img
          src={logo}
          alt="Hirisonn Logo"
          className='h-40 sm:h-20 md:h-56 w-44 sm:w-20 md:w-64 mx-auto mb-4 sm:mb-8 shadow-2xl rounded-3xl shadow-white'
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        />

        {/* Main Heading */}
        <motion.h1
          className='text-2xl sm:text-4xl md:text-6xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight drop-shadow-lg'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Taking Your Dreams to Greater Heights
        </motion.h1>

        {/* Divider Line */}
        <motion.div
          className='h-1 w-16 sm:w-20 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mb-4 sm:mb-6 md:mb-8 rounded-full shadow-lg'
          initial={{ width: 0 }}
          animate={{ width: 'auto' }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Subheading */}
        <motion.p
          className='text-xs sm:text-lg md:text-xl lg:text-xl text-gray-100 mb-6 sm:mb-8 md:mb-10 leading-relaxed font-light drop-shadow-md'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Hirisionn stands at the forefront of workforce solutions linking human capability with business power and delivering services to organizations of every size across multiple industries through its brands.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className='flex gap-2 sm:gap-4 justify-center flex-wrap'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Hire Talent Button */}
          <motion.button 
            className='px-5 sm:px-8 py-2.5 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-base rounded-lg transition-all duration-300 shadow-lg transform'
            whileHover={{ scale: 1.05, boxShadow: '0 15px 35px rgba(249, 115, 22, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>navigate("/register")}
          >
            Register
          </motion.button>

          {/* Apply Now Button */}
          <motion.button 
            className='px-5 sm:px-8 py-2.5 sm:py-4 bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold text-xs sm:text-base rounded-lg transition-all duration-300'
            whileHover={{ scale: 1.05, borderColor: '#f97316', backgroundColor: 'rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.button>
        </motion.div>

        {/* Scroll Indicator - Hidden on Mobile */}
        <motion.div
          className='hidden sm:block absolute bottom-6 sm:bottom-10 -translate-x-1/2'
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className='text-white/60 text-xs sm:text-sm'>
            ↓ Scroll to explore ↓
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Screen1;

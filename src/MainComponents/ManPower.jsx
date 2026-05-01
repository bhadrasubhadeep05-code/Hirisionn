import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'
import video from '../assets/video4.mp4'
import NavBar2 from './NavBar2'

const ManPower = () => {
  const { ProfileComplete } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div className="w-full overflow-x-hidden">
      <NavBar2 />
      {/* 1. Statistical Hero Section - Deep Navy Background */}
      <section className="relative bg-[#0F172A] min-h-[70vh] flex items-center justify-center px-6 py-28 md:py-48">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-white text-[clamp(2.5rem,6vw,4rem)] font-bold mb-6 leading-tight">
            Over 60 Million Enterprises
          </h1>
          <p className="text-gray-300 text-[clamp(1.1rem,2vw,1.35rem)] max-w-3xl mx-auto mb-8">
            India has over 3 million formal companies, and over 60 million total enterprises including MSMEs. But do you have a job yet?
          </p>
            <p className="text-gray-500 text-sm mb-8 mt-4 opacity-70">
            Sources: India Today, Indian Express, Business Standard, Indiadatamap.com, Tereg.com
          </p>
          <p className="text-cyan-400 text-[clamp(1.3rem,3vw,1.7rem)] font-semibold">
            Don't worry we are there to assist you get yours.
          </p>
          
        
        </div>

        {/* Wave Divider Transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* 2. Dual-Force Manpower Section - Split Layout */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#0F172A] mb-4">Register MANPOWER</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We connect ambitious job seekers with forward-thinking employers through flexible staffing and permanent hiring solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Side - Job Seekers */}
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">
                For <span className="text-[#22D3EE]">Ambitious</span> Job Seekers
              </h3>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Unlock opportunities faster with our expertise. We connect you with forward-thinking employers that value your skills. 
                Ready to take the next step?
              </p>
              <p className="text-xl font-semibold text-[#0F172A]">
                Let's make the <span className="text-[#22D3EE]">right match</span> today!
              </p>
            </div>

            {/* Right Side - Employers */}
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">
                For Organizations Seeking <span className="text-[#22D3EE]">Top Talent</span>
              </h3>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Finding the right talent is within reach. With decades of expertise and a powerful multi-channel approach, 
                we connect skilled professionals with organizations faster than ever.
              </p>
              <p className="text-xl font-semibold text-[#0F172A]">
                Let's build the <span className="text-[#22D3EE]">perfect match</span> today!
              </p>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center items-center mt-6'>
                  <button
            onClick={() => navigate('/register')}
            disabled={ProfileComplete}
            className={`px-12 py-5 text-xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
              ProfileComplete
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-[#22D3EE] text-[#0F172A] hover:shadow-[0_0_35px_rgba(34,211,238,0.7)]'
            }`}
          >
            {ProfileComplete ? 'You have already registered' : 'Register Here'}
          </button>
          </div>
      </section>

      {/* 3. Impact Video Footer - Final CTA */}
      <section className="relative h-[450px] overflow-hidden">
        {/* Background Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* Dark Overlay with Blur Effect */}
        <div className="absolute inset-0 bg-[#0F172A]/75 backdrop-blur-md"></div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-white text-[clamp(1.8rem,4vw,2.8rem)] font-bold mb-8 max-w-3xl">
            To take a step further towards your dream
          </h2>


        </div>
      </section>
    </div>
  )
}

export default ManPower
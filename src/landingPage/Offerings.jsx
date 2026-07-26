import React from "react";
import { useNavigate } from "react-router-dom";
const Offerings = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full bg-white flex flex-col justify-center items-center px-4 sm:px-10 py-8 sm:p-10 font-body">
      <div className="flex flex-col justify-start w-full max-w-7xl mb-6 sm:mb-10 mt-6 sm:mt-10 ml-0 sm:ml-[100px] lg:ml-[228px]">
        <div className="flex items-center">
          <span className="h-[3px] w-6 rounded inline-block bg-[#f2872e] mr-2" />
          <h4 className="text-[#f2872e] font-heading text-base sm:text-lg font-bold">Built for Both Sides</h4>
        </div>
        <h1 className="text-black font-body text-2xl sm:text-[36px] font-extrabold mt-2 mb-6 sm:mb-10">
          Whichever side of the table<br className="hidden sm:block" /> you're on
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 md:gap-4 w-full max-w-7xl">
        {/*block 1*/}
        <div data-scroll data-scroll-speed="0.02" className="h-[460px] sm:h-[500px] w-full lg:w-[600px] bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center rounded-[20px] shrink-0">
          <div className="bg-gradient-to-br from-[#0f2b38]/80 from-70% to-[#164257]/80 h-full w-full rounded-[20px] text-white p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-2xl sm:text-[33px] mb-3 sm:mb-4">
                For Students & Job Seekers
              </h3>
              <p className="text-sm sm:text-[16px] text-[#ffffffe6] text-wrap pr-0 sm:pr-16 mb-8 sm:mb-14">
                Whether you're on campus, graduating soon, or looking to switch
                careers, we help you get placement-ready and placed.
              </p>
              <ul className="flex flex-col gap-2 mb-8 sm:mb-12">
                <li className="flex gap-4 font-semibold text-sm sm:text-[16px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" stroke="#ffc857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Access curated internships and campus placement drives
                </li>
                <li className="flex gap-4 font-semibold text-sm sm:text-[16px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" stroke="#ffc857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Free corporate readiness & interview coaching
                </li>
                <li className="flex gap-4 font-semibold text-sm sm:text-[16px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" stroke="#ffc857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  One-on-one career guidance from real recruiters
                </li>
              </ul>
            </div>
            <button 
            onClick={()=>navigate('/job-placements')}
            className="bg-gradient-to-br from-[#F2A93C] to-[#E8791E] shadow-[0_14px_30px_-8px_rgba(242,135,46,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] font-extrabold text-base sm:text-xl w-full sm:w-[500px] px-6 sm:px-10 py-3 sm:py-4 rounded-full">
              Start Your Journey
            </button>
          </div>
        </div>

        {/*block 2*/}
        <div data-scroll data-scroll-speed="-0.02" className="h-[460px] sm:h-[500px] w-full lg:w-[600px] bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center rounded-[20px] shrink-0">
          <div className="bg-gradient-to-br from-[#E8791E]/80 from-70% to-[#F2A93C]/80 h-full w-full rounded-[20px] text-white p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-2xl sm:text-[33px] mb-3 sm:mb-4">
                For Employers & Partners
              </h3>
              <p className="text-sm sm:text-[16px] text-[#ffffffe6] text-wrap pr-0 sm:pr-16 mb-8 sm:mb-14">
                Whether you're looking for talent, running training programmes, or building your employer brand — we help you connect with the right people.
              </p>
              <ul className="flex flex-col gap-2 mb-8 sm:mb-12">
                <li className="flex gap-4 font-semibold text-sm sm:text-[16px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" stroke="#0f2b38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Access pre-vetted, placement-ready candidates
                </li>
                <li className="flex gap-4 font-semibold text-sm sm:text-[16px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" stroke="#0f2b38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Campus hiring & corporate training partnerships
                </li>
                <li className="flex gap-4 font-semibold text-sm sm:text-[16px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" stroke="#0f2b38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  End-to-end recruitment lifecycle support
                </li>
              </ul>
            </div>
            <button 
            onClick={()=>navigate('/business-enquiry')}
            className="bg-gradient-to-br from-[#164257] to-[#0f2b38] shadow-[0_14px_30px_-8px_rgba(242,135,46,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] font-extrabold text-base sm:text-xl w-full sm:w-[500px] px-6 sm:px-10 py-3 sm:py-4 rounded-full">
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offerings;
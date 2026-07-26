import React, { use } from "react";
import { useNavigate } from "react-router-dom";
const TraningLanding = () => {
  const navigate = useNavigate()
  return (
    <div className="h-full w-full bg-white flex flex-col justify-center items-center px-4 sm:px-10 py-8 sm:p-10 font-body">
      <div className="flex flex-col justify-start w-full max-w-7xl mb-6 sm:mb-10 mt-6 sm:mt-10 ml-0 sm:ml-[100px] lg:ml-[228px]">
        <div className="flex items-center">
          <span className="h-[3px] w-6 rounded inline-block bg-[#f2872e] mr-2" />
          <h4 className="text-[#f2872e] font-heading text-base sm:text-lg font-bold">Skills That Set You Apart</h4>
        </div>
        <h1 className="text-black font-body text-2xl sm:text-[36px] font-extrabold mt-2 mb-6 sm:mb-10">
          Blogs & Videos<br className="hidden sm:block" /> to fuel your growth
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 md:gap-4 w-full max-w-7xl">
        {/*block 1 — Blogs*/}
        <div data-scroll data-scroll-speed="0.02" className="h-[460px] sm:h-[500px] w-full lg:w-[600px] bg-[url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center rounded-[20px] shrink-0">
          <div className="bg-gradient-to-br from-[#0f2b38]/80 from-70% to-[#164257]/80 h-full w-full rounded-[20px] text-white p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-2xl sm:text-[33px] mb-3 sm:mb-4">
                Blogs
              </h3>
              <p className="text-sm sm:text-[16px] text-[#ffffffe6] text-wrap pr-0 sm:pr-16 mb-8 sm:mb-14">
                Dive into insightful articles on career growth, industry trends, skill-building tips, and everything you need to stay ahead in your professional journey.
              </p>
              <ul className="flex flex-col gap-2 mb-8 sm:mb-12">
                <li className="flex gap-4 font-semibold text-sm sm:text-[16px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" stroke="#ffc857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Career advice & industry deep-dives
                </li>
                <li className="flex gap-4 font-semibold text-sm sm:text-[16px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" stroke="#ffc857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Skill-building guides & how-tos
                </li>
                <li className="flex gap-4 font-semibold text-sm sm:text-[16px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" stroke="#ffc857" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Expert opinions & success stories
                </li>
              </ul>
            </div>
            <button 
            onClick={()=>navigate('/blog-page')}
            className="bg-gradient-to-br from-[#F2A93C] to-[#E8791E] shadow-[0_14px_30px_-8px_rgba(242,135,46,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] font-extrabold text-base sm:text-xl w-full sm:w-[500px] px-6 sm:px-10 py-3 sm:py-4 rounded-full">
              Read Blogs
            </button>
          </div>
        </div>

        {/*block 2 — Videos*/}
        <div data-scroll data-scroll-speed="-0.02" className="h-[460px] sm:h-[500px] w-full lg:w-[600px] bg-[url('https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center rounded-[20px] shrink-0">
          <div className="bg-gradient-to-br from-[#E8791E]/80 from-70% to-[#F2A93C]/80 h-full w-full rounded-[20px] text-white p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-2xl sm:text-[33px] mb-3 sm:mb-4">
                Videos
              </h3>
              <p className="text-sm sm:text-[16px] text-[#ffffffe6] text-wrap pr-0 sm:pr-16 mb-8 sm:mb-14">
                Watch curated video content featuring expert talks, tutorial walkthroughs, and real-life career journeys to learn visually and stay inspired.
              </p>
              <ul className="flex flex-col gap-2 mb-8 sm:mb-12">
                <li className="flex gap-4 font-semibold text-sm sm:text-[16px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" stroke="#0f2b38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Expert-led tutorials & walkthroughs
                </li>
                <li className="flex gap-4 font-semibold text-sm sm:text-[16px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" stroke="#0f2b38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Industry insights & panel discussions
                </li>
                <li className="flex gap-4 font-semibold text-sm sm:text-[16px]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" stroke="#0f2b38" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Success stories & career journey vlogs
                </li>
              </ul>
            </div>
            <button  
            onClick={()=>navigate('/video-page')}
            className="bg-gradient-to-br from-[#164257] to-[#0f2b38] shadow-[0_14px_30px_-8px_rgba(242,135,46,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] font-extrabold text-base sm:text-xl w-full sm:w-[500px] px-6 sm:px-10 py-3 sm:py-4 rounded-full">
              Watch Videos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraningLanding;
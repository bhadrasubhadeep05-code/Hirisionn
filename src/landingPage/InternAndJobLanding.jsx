import React from "react";
import { useNavigate } from "react-router-dom";

const InternAndJobLanding = () => {
    const navigate = useNavigate();
  return (
    <div className="h-full w-full bg-[#f6f9fb] flex flex-col justify-center items-center px-4 sm:px-10 py-8 sm:p-10 font-body pb-16 sm:pb-0">
      <div className="flex flex-col justify-start w-full max-w-7xl mb-6 sm:mb-10 mt-6 sm:mt-10 ml-0 sm:ml-[100px] lg:ml-[228px]">
        <div className="flex items-center">
          <span className="h-[3px] w-6 rounded inline-block bg-[#f2872e] mr-2" />
          <h4 className="text-[#f2872e] font-heading text-base sm:text-lg font-bold">Your Next Move Starts Here</h4>
        </div>
        <h1 className="text-black font-body text-2xl sm:text-[36px] font-extrabold mt-2 mb-6 sm:mb-10">
          Internships & Certifications<br className="hidden sm:block" /> built for your career
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-16 md:gap-8 w-full max-w-7xl justify-center">
        {/*block 1 — Internships*/}
        <div
          data-scroll
          data-scroll-speed="0.02"
          className="group relative h-[340px] sm:h-[500px] w-full lg:w-[600px] overflow-hidden rounded-[10px] shrink-0 shadow-lg shadow-black"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% via-[#12171B]/80 to-[#12171B] transition-all duration-500" />
          <div className="relative z-10 flex h-full flex-col justify-end p-6">
            <h2 className="text-white font-archivo transition-all duration-300 sm:translate-y-0 sm:group-hover:-translate-y-1 sm:group-focus-within:-translate-y-1 text-2xl pl-3">Internships</h2>
            <div className="mt-3 flex items-center justify-start opacity-100 transition-all duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 sm:group-focus-within:translate-y-0">
              <button
              onClick={()=> navigate('/internship')}
               className="w-fit rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#12171B] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:bg-white sm:px-4 sm:py-2 sm:text-sm">
                View Internships
              </button>
            </div>
          </div>
        </div>

        {/*block 2 — Certifications*/}
        <div
          data-scroll
          data-scroll-speed="-0.02"
          className="group relative h-[340px] sm:h-[500px] w-full lg:w-[600px] overflow-hidden rounded-[10px] shrink-0 shadow-lg shadow-black"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105 group-hover:blur-sm"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1484807352052-23338990c6c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% via-[#12171B]/80 to-[#12171B] transition-all duration-500" />
          <div className="relative z-10 flex h-full flex-col justify-end p-6">
            <h2 className="text-white font-archivo  transition-all duration-300 sm:translate-y-0 sm:group-hover:-translate-y-1 sm:group-focus-within:-translate-y-1 text-2xl pl-3">Certification Courses</h2>
            <div className="mt-3 flex items-center justify-start opacity-100 transition-all duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 sm:group-focus-within:translate-y-0">
              <button 
              onClick={()=> navigate('/soft-skills-training')}
              className="w-fit rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#12171B] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:bg-white sm:px-4 sm:py-2 sm:text-sm">
                View Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternAndJobLanding;
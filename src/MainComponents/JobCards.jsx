import React from 'react';
import { useNavigate } from 'react-router-dom';


const formatDate = (dateStr) => {
  if (!dateStr) return "Rolling";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const JobCards = ({ job }) => {
  const navigate = useNavigate();
  const { _id, jobTitle, location, CTC, deadLine, experience, jobType, industries, domain } = job;

  return (
    <div className="md:w-[800px] md:h-[240px] w-[336px] h-[190px] rounded-xl  bg-[#fff] p-3 md:p-5 text-white shadow-[0_6px_12px_rgba(30,10,58,0.04)] transition duration-200  hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="md:mt-2 mt-1 text-[14px] md:text-lg font-bold text-[#E8791E]">{jobTitle}</h3>
        </div>
        <span className="rounded-full border border-[#F2A93C]/30 bg-[#F2A93C]/10 px-3 py-1 text-[10px] md:text-xs font-semibold text-[#F2A93C]">
          Active
        </span>
      </div>

      <div className="md:mt-4 mt-2 flex flex-wrap gap-2">
        {experience && (
          <span className="rounded-full border border-[#12171B] px-2 py-1  md:px-3 md:py-1 text-[9px] md:text-xs font-medium text-[#12171B]">
            Exp: {experience} yrs
          </span>
        )}
        {jobType && (
          <span className="rounded-full border border-[#12171B]  px-2 py-1  md:px-3 md:py-1 text-[9px] md:text-xs font-medium text-[#12171B]">
            {jobType}
          </span>
        )}
        {industries && (
          <span className='rounded-full border border-[#12171B]  px-2 py-1  md:px-3 md:py-1 text-[9px] md:text-xs font-medium text-[#12171B]'>
            {industries}
          </span>
        )}
         {domain && (
          <span className="rounded-full border border-[#12171B]  px-2 py-1  md:px-3 md:py-1 text-[9px] md:text-xsfont-medium text-[#12171B]">
            {domain}
          </span>
        )}
      </div>

      <div className="md:mt-6 mt-4 border-t border-slate-700/60 pt-4 flex justify-evenly">
        <div className="flex items-center gap-1 md:gap-6 text-[10px] md:text-sm">
          <span className="text-[#12171B]">Location:</span>
          <span className="font-semibold text-[#12171B]">{location}</span>
        </div>
        <div className="flex items-center gap-1 md:gap-6 text-[10px] md:text-sm">
          <span className="text-[#12171B]">CTC:</span>
          <span className="font-semibold text-[#12171B]">{CTC} LPA</span>
        </div>
        <div className="flex items-center gap-1 md:gap-6 text-[10px] md:text-sm">
          <span className="text-[#12171B]">Apply till:</span>
          <span className="font-semibold text-[#F2A93C]">{formatDate(deadLine)}</span>
        </div>
      </div>

      <button
        onClick={() => navigate(`/job/${_id}`)}
        className="md:mt-6 mt-2 w-full rounded-full bg-[#E8791E] py-1 md:px-6 md:py-3 text-[12px] md:text-sm font-semibold text-white transition hover:bg-[#F2A93C] hover:text-[#0F172A]"
      >
        View details
      </button>
    </div>
  );
};

export default JobCards;
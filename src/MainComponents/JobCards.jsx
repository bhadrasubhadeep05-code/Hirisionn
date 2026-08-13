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
  const { 
    _id, 
    jobTitle, 
    location, 
    CTC, 
    deadLine, 
    experience, 
    jobType, 
    industries, 
    domain, 
    formLink
  } = job;

  // Format link ensuring it starts with http:// or https:// for external URLs
  const formattedFormLink = formLink && !/^https?:\/\//i.test(formLink) 
    ? `https://${formLink}` 
    : formLink;

  return (
    <div className="w-[336px] h-fit rounded-xl bg-[#fff] p-3 text-white shadow-[0_6px_12px_rgba(30,10,58,0.04)] transition duration-200 hover:shadow-xl md:h-fit md:w-[800px] md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="mt-1 text-[14px] font-bold text-[#E8791E] md:mt-2 md:text-lg">
            {jobTitle}
          </h3>
        </div>
        <span className="rounded-full border border-[#F2A93C]/30 bg-[#F2A93C]/10 px-3 py-1 text-[10px] font-semibold text-[#F2A93C] md:text-xs">
          Active
        </span>
      </div>

      <div className="mt-2 flex flex-wrap gap-2 md:mt-4">
        {experience && (
          <span className="rounded-full border border-[#12171B] px-2 py-1 text-[9px] font-medium text-[#12171B] md:px-3 md:py-1 md:text-xs">
            Exp: {experience} yrs
          </span>
        )}
        {jobType && (
          <span className="rounded-full border border-[#12171B] px-2 py-1 text-[9px] font-medium text-[#12171B] md:px-3 md:py-1 md:text-xs">
            {jobType}
          </span>
        )}
        {industries && (
          <span className="rounded-full border border-[#12171B] px-2 py-1 text-[9px] font-medium text-[#12171B] md:px-3 md:py-1 md:text-xs">
            {industries}
          </span>
        )}
        {domain && (
          <span className="rounded-full border border-[#12171B] px-2 py-1 text-[9px] font-medium text-[#12171B] md:px-3 md:py-1 md:text-xs">
            {domain}
          </span>
        )}
      </div>

      <div className="mt-2 flex flex-col gap-1 border-t border-slate-700/60 pt-2 md:mt-6 md:flex-row md:justify-evenly md:gap-0 md:pt-4">
        <div className="flex items-center gap-1 text-[10px] md:gap-6 md:text-sm">
          <span className="text-[#12171B]">Location:</span>
          <span className="font-semibold text-[#12171B]">{location}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] md:gap-6 md:text-sm">
          <span className="text-[#12171B]">CTC:</span>
          <span className="font-semibold text-[#12171B]">{CTC}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] md:gap-6 md:text-sm">
          <span className="text-[#12171B]">Apply till:</span>
          <span className="font-semibold text-[#F2A93C]">{formatDate(deadLine)}</span>
        </div>
        {formLink && (
          <div className="flex items-center gap-1 text-[10px] md:gap-6 md:text-sm">
            <span className="text-[#12171B]">Form Link:</span>
            <a 
              href={formattedFormLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-[#F2A93C] hover:underline"
            >
              click me
            </a>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate(`/job/${_id}`)}
        className="mt-2 w-full rounded-full bg-[#E8791E] py-1 text-[12px] font-semibold text-white transition hover:bg-[#F2A93C] hover:text-[#0F172A] md:mt-6 md:px-6 md:py-3 md:text-sm"
      >
        View details
      </button>
    </div>
  );
};

export default JobCards;
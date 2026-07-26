import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, title, img, itm }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog/${id}`, {
      state: { blog: itm },
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  const publishedDate = itm?.createdAt
    ? new Date(itm.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Latest insight";

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
      className="group relative w-[320px] min-w-[320px] max-w-[320px] cursor-pointer rounded-3xl border border-white bg-white p-7 pt-12 shadow-xl outline-none transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus-visible:ring-4 focus-visible:ring-[#E8791E]/30"
    >
      {/* Offset Category Tag */}
      <div className="absolute -left-3 top-8 z-20 bg-gradient-to-r from-[#F2A93C] to-[#E8791E] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-md max-sm:left-4">
        {itm?.subCategory || "Article"}
      </div>

      {/* Floating Offset Image Container */}
      <div className="relative -mr-12 mb-6 h-48 w-[130%] overflow-hidden rounded-2xl border-4 border-white shadow-2xl max-sm:mr-0 max-sm:w-full">
        <div className="absolute -bottom-3 -left-3 h-full w-full rounded-2xl bg-[#E8791E]/15" />
        
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover z-10 relative group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Title - Fixed height container */}
      <div className="min-h-[60px]">
        <h3 className="mb-4 text-lg font-bold leading-snug text-[#0F172A] line-clamp-2">
        {title}
      </h3>

      {/* Meta Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
        <span>{publishedDate}</span>
        <span className="text-[#E8791E]">5 min read</span>
      </div>
      </div>

    </div>
  );
};

export default Card;

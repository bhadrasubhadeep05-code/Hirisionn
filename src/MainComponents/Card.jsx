import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ id, title, img, itm }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog/${id}`, {
      state: { blog: itm },
    });
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex="0"
      className="relative bg-white p-8 pt-12 rounded-2xl shadow-xl max-w-sm cursor-pointer group hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Offset Category Tag */}
      <div className="absolute -left-3 top-8 max-sm:left-4 bg-[#22D3EE] text-[#0F172A] px-4 py-1 text-xs font-bold uppercase tracking-widest shadow-md z-20">
        {itm?.category || "Article"}
      </div>

      {/* Floating Offset Image Container */}
      <div className="relative -mr-12 mb-6 h-48 w-[110%] max-sm:w-full max-sm:mr-0 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
        {/* Soft Lavender Blue Glow Shadow */}
        <div className="absolute -top-4 -left-4 w-full h-full bg-[#818CF8]/20 blur-2xl z-0" />
        
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover z-10 relative group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg text-[#0F172A] font-medium leading-snug line-clamp-2 mb-4">
        {title}
      </h3>

      {/* Meta Footer */}
      <div className="pt-4 border-t border-slate-100 text-xs text-[#818CF8] flex justify-between items-center">
        <span>{new Date(itm?.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</span>
        <span>5 min read</span>
      </div>

    </div>
  );
};

export default Card;
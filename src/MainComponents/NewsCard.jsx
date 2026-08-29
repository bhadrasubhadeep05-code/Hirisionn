import React from "react";

const NewsCard = ({ news }) => {
  const {
    title = "Untitled Story",
    description = "",
    image,
    url = "#",
    publishedAt,
    author,
    source = "Business",
  } = news || {};

  const publishedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Latest insight";

  const authorName = author || "Hirisionn News";
  const initials = authorName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read article: ${title}`}
      className="group relative flex aspect-square w-full max-w-[480px] flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 ease-out outline-none hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)] focus-visible:ring-4 focus-visible:ring-[#E8791E]/30"
    >
      {/* ══════════ IMAGE SECTION ══════════ */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#0F172A]">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#0F172A] to-[#1E3A5F]">
            <svg
              className="h-10 w-10 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 19.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v10.5a2.25 2.25 0 0 0 2.25 2.25Z M12 7.5h1.5m-1.5 3h5.25M12 13.5h5.25m-5.25 3h5.25m-9-8.25h4.5"
              />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
              Article image
            </span>
          </div>
        )}

        {/* Bottom scrim for a clean structured seam */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

        {/* Source tag */}
        <div className="absolute left-5 top-5 z-10 max-w-[70%] truncate rounded-full bg-white/95 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-[#E8791E] shadow-md backdrop-blur-sm">
          {source}
        </div>
      </div>

      {/* ══════════ CONTENT SECTION ══════════ */}
      <div className="flex flex-1 flex-col bg-white px-6 pb-5 pt-5">
        {/* Meta row */}
        <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
          <span className="truncate">{source}</span>
          <span className="shrink-0">{publishedDate}</span>
        </div>

        {/* Title */}
        <h3 className="mt-2 line-clamp-2 text-xl font-bold leading-snug text-[#0F172A]">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-slate-500">
          {description}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
          <span className="flex min-w-0 items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F2A93C] to-[#E8791E] text-[10px] font-bold text-white">
              {initials || "N"}
            </span>
            <span className="truncate text-xs font-semibold text-slate-600">
              {authorName}
            </span>
          </span>

          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#F8FAFC] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#E8791E] transition-colors duration-300 group-hover:bg-[#FDE7D3]">
            Read article
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
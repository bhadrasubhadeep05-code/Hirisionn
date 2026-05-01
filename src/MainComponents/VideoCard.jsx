import React from "react";

const VideoCard = ({ youtubeLink, title,  category,  createdAt}) => {

  // ✅ Robust YouTube URL → Embed URL converter
 const getEmbedUrl = (url) => {
  if (!url || typeof url !== "string") return null;

  try {
    const parsed = new URL(url);

    let videoId = null;

    // youtu.be/VIDEO_ID
    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.split("/")[1];
    }

    // youtube.com/watch?v=VIDEO_ID
    if (parsed.searchParams.get("v")) {
      videoId = parsed.searchParams.get("v");
    }

    // youtube.com/live/VIDEO_ID
    if (parsed.pathname.includes("/live/")) {
      videoId = parsed.pathname.split("/live/")[1];
    }

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`
      : null;

  } catch {
    return null;
  }
};

  // ✅ Compute once
  const embedUrl = getEmbedUrl(youtubeLink);

  return (
    <div className="group relative bg-white p-6 pt-10 rounded-[2rem] shadow-xl
                    hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out
                    w-[320px] min-w-[320px] max-w-[320px]">

      {/* Category Tag */}
      <div className="absolute left-4 top-4 z-20 bg-[#22D3EE] text-[#0F172A] px-4 py-1
                      text-[10px] font-black uppercase tracking-widest shadow-md
                      transition-all duration-500">
        {category || "General"}
      </div>

      {/* Glow Background */}
      <div className="absolute top-4 right-4 w-[90%] h-48 bg-[#818CF8]/10 rounded-2xl blur-xl
                      group-hover:bg-[#818CF8]/20 transition-all duration-500" />

      {/* Video Section */}
      <div className="relative -mr-10 -mt-6 aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            loading="lazy"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
            No Video Available
          </div>
        )}
      </div>

      {/* Content - Fixed height container */}
      <div className="mt-8 min-h-[80px]">
        <h3 className="text-[#0F172A] text-lg font-bold line-clamp-2">
          {title || "Untitled Video"}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          

          <span className="text-[#818CF8] text-[10px] uppercase font-medium">
            {createdAt}
          </span>
        </div>
      </div>

    </div>
  );
};

export default VideoCard;
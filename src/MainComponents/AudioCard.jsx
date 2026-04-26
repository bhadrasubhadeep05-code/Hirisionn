import React from "react";

const AudioCard = ({ youtubeLink, title, description, author }) => {
  // Convert youtube watch/live links to embed format
  const getEmbedUrl = (url) => {
    if (!url || typeof url !== 'string' || !url.trim()) {
      return null;
    }
    
    let videoId = "";
    
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtube.com/live/")) {
      videoId = url.split("live/")[1].split("?")[0];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}?modestbranding=1&iv_load_policy=3&rel=0` : null;
  };

  const embedUrl = getEmbedUrl(youtubeLink);

  return (
    <div className="relative bg-white p-4 pb-6 rounded-[2rem] shadow-xl w-full max-w-md
                    hover:scale-[1.02] hover:shadow-[0_25px_50px_-12px_rgba(34,211,238,0.15)]
                    transition-all duration-500 ease-out">

      {/* Offset Signature Tag */}
      <div className="absolute -left-3 top-10 z-10 bg-[#22D3EE] text-[#0F172A] px-4 py-1
                      text-[10px] font-black uppercase tracking-widest shadow-lg
                      hover:-translate-x-1 transition-transform duration-500">
        {author}
      </div>

      {/* Video Frame - Native Iframe */}
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-inner bg-slate-100">
        {embedUrl ? (
          <iframe
            src={embedUrl}
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

      {/* Content Area */}
      <div className="mt-5 px-2">
        <h2 className="text-[#0F172A] text-lg font-bold line-clamp-1">{title}</h2>
        <p className="text-[#818CF8] text-[10px] uppercase tracking-wider mt-2 line-clamp-2">
          {description}
        </p>
      </div>

    </div>
  );
};

export default AudioCard;
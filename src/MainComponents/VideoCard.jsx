import React from 'react';

const VideoCard = ({ youtubeLink, title, category, createdAt }) => {
  const getEmbedUrl = (url) => {
    if (!url || typeof url !== 'string') return null;

    try {
      const parsed = new URL(url);
      let videoId = null;

      if (parsed.hostname.includes('youtu.be')) {
        videoId = parsed.pathname.split('/')[1];
      }

      if (parsed.searchParams.get('v')) {
        videoId = parsed.searchParams.get('v');
      }

      if (parsed.pathname.includes('/live/')) {
        videoId = parsed.pathname.split('/live/')[1];
      }

      return videoId ? `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0` : null;
    } catch {
      return null;
    }
  };

  const embedUrl = getEmbedUrl(youtubeLink);

  return (
    <div className="group relative flex h-full w-[320px] min-w-[320px] max-w-[320px] flex-col rounded-[2rem] border border-slate-200 bg-white p-6 pt-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
      <div className="absolute left-4 top-4 z-20 rounded-full bg-[#FDE7D3] px-4 py-1 text-[9px] font-black uppercase tracking-[0.35em] text-[#E8791E]">
        {category || 'General'}
      </div>

      <div className="absolute right-4 top-4 h-48 w-[90%] rounded-2xl bg-[#818CF8]/10 blur-xl transition-all duration-500 group-hover:bg-[#818CF8]/20" />

      <div className="relative -mr-10 -mt-6 overflow-hidden rounded-[1.2rem] border-4 border-white shadow-2xl">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            loading="lazy"
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full"
          />
        ) : (
          <div className="flex h-[180px] w-full items-center justify-center bg-slate-200 text-slate-500">
            No Video Available
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-lg font-bold text-[#0F172A]">{title || 'Untitled Video'}</h3>
        <div className="mt-4 flex items-center justify-between pt-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#818CF8]">
            {createdAt}
          </span>
          <span className="rounded-full bg-[#F8FAFC] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
            Watch now
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
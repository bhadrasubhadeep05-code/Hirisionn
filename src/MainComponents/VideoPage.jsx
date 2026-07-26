import React, { useState, useEffect, useCallback } from 'react';
import { motion as Motion } from 'framer-motion';
import NavBar2 from './NavBar2';
import VideoCard from './VideoCard';
import { getVideo } from '../services/video.api';


const videoCategories = [
  { id: 1, name: 'All Videos', description: 'View all video content', isLive: false },
  { id: 2, name: 'Company Updates', description: 'Announcements & behind-the-scenes', isLive: true },
  { id: 3, name: 'Leadership Perspectives', description: 'Founder & executive insights', isLive: true },
  { id: 4, name: 'Opinion Pieces', description: 'Trends & industry opinions', isLive: false },
  { id: 5, name: 'Case Studies', description: 'Success stories & learnings', isLive: true },
  { id: 6, name: 'Event Recaps', description: 'Partnerships, milestones & events', isLive: false },
  { id: 7, name: 'Problem Solving', description: 'How we solved challenges', isLive: true },
];

const VideoPage = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getVideo(page);
      setVideos(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    const loadVideos = async () => {
      await fetchVideos();
    };

    loadVideos();
  }, [fetchVideos]);

  const filteredVideos = activeCategory === 1
    ? videos
    : videos.filter((videoItem) => {
        const subcategoryMap = {
          2: 'Company Updates & Announcements',
          3: 'Leadership Perspectives',
          4: 'Opinion Pieces & Trends',
          5: 'Case Studies & Success Stories',
          6: 'Event Recaps & Milestones',
          7: 'Problem Solving Narratives',
        };
        return videoItem.subCategory === subcategoryMap[activeCategory];
      });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
      <NavBar2 progress={1} />

      <Motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mt-16 flex min-h-[60vh] items-center justify-center overflow-hidden bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-6 py-24 md:mt-24 md:py-52"
      >
      
        <div className="pointer-events-none absolute right-0 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.25)_0%,transparent_68%)] blur-[10px] sm:-right-20 sm:-top-20 sm:h-[420px] sm:w-[420px] lg:-right-[6%] lg:-top-[10%] lg:h-[520px] lg:w-[520px]" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-300"
          >
            Insights in motion
          </Motion.div>
          <Motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 text-4xl font-bold text-white md:text-5xl"
          >
            See your future in motion
          </Motion.h1>
          <Motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-10 max-w-2xl text-lg text-slate-300"
          >
            Masterclasses, expert perspectives, and industry stories curated for today’s ambitious professional.
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative w-full max-w-lg"
          >
            <input
              type="text"
              placeholder="Search videos, themes or speakers..."
              className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-4 text-white outline-none backdrop-blur-md placeholder:text-white/50 focus:border-[#F2A93C]"
            />
            <svg className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#F2A93C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Motion.div>
        </div>
      </Motion.section>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 md:px-8">
        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="sticky top-32 hidden w-64 self-start lg:block">
            <h3 className="mb-6 text-lg font-bold text-[#0F172A]">Video channels</h3>
            <div className="space-y-2">
              {videoCategories.map((category) => (
                <Motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ x: 4 }}
                  className={`relative w-full overflow-hidden rounded-xl p-4 text-left transition-all ${
                    activeCategory === category.id ? 'bg-white shadow-md' : 'bg-transparent hover:bg-white/50'
                  }`}
                >
                  {activeCategory === category.id && <div className="absolute bottom-0 left-0 top-0 w-1 rounded-l-xl bg-[#E8791E]" />}
                  <div className="flex items-center gap-3">
                    <div>
                      <p className={`font-medium transition-colors ${activeCategory === category.id ? 'font-bold text-[#0F172A]' : 'text-slate-700 hover:text-[#E8791E]'}`}>
                        {category.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{category.description}</p>
                    </div>
                    {category.isLive && (
                      <span className="ml-auto flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 rounded-full bg-[#E8791E] opacity-75 animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E8791E]" />
                      </span>
                    )}
                  </div>
                </Motion.button>
              ))}
            </div>
          </div>

          <div className="-mx-4 overflow-x-auto px-4 py-4 lg:hidden">
            <div className="flex w-max gap-3">
              {videoCategories.map((category) => (
                <Motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileTap={{ scale: 0.95 }}
                  className={`whitespace-nowrap rounded-full px-5 py-3 transition-all ${
                    activeCategory === category.id ? 'bg-[#E8791E] font-medium text-white shadow-md' : 'border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {category.name}
                </Motion.button>
              ))}
            </div>
          </div>

          <div className="flex-1 lg:pl-10 lg:pr-16">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[#E8791E]" />
              </div>
            ) : videos.length === 0 ? (
              <div className="py-20 text-center text-slate-500">No videos found</div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                  {filteredVideos.map((item, index) => (
                    <Motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="overflow-visible"
                    >
                      <VideoCard
                        title={item.title}
                        category={item.subCategory}
                        youtubeLink={item.vid_link}
                        createdAt={item.createdAt}
                      />
                    </Motion.div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="rounded-lg bg-white px-4 py-2 text-slate-600 shadow-md transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="font-medium text-slate-600">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="rounded-lg bg-white px-4 py-2 text-slate-600 shadow-md transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import NavBar2 from './NavBar2';
import AudioCard from './AudioCard';
import video from '../assets/video4.mp4'
import { getAudio } from '../services/audio';

// BlogSubcategories for Audio
const audioCategories = [
  { id: 1, name: "All Audio", description: "View all podcast episodes", isLive: false },
  { id: 2, name: "Company Updates", description: "Announcements & behind-the-scenes", isLive: true },
  { id: 3, name: "Leadership Perspectives", description: "Founder & executive insights", isLive: true },
  { id: 4, name: "Opinion Pieces", description: "Trends & industry opinions", isLive: false },
  { id: 5, name: "Case Studies", description: "Success stories & learnings", isLive: true },
  { id: 6, name: "Event Recaps", description: "Partnerships, milestones & events", isLive: false },
  { id: 7, name: "Problem Solving", description: "How we solved challenges", isLive: true },
];


const AudioLibrary = () => {
  const [activeCategory, setActiveCategory] = useState(1);
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAudios = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAudio(page);
      setAudios(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      console.error('Error fetching audios:', err);
      setAudios([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchAudios();
  }, [fetchAudios]);

  // Filter audios based on selected subcategory
  const filteredAudios = activeCategory === 1 
    ? audios 
    : audios.filter(audio => {
        const subcategoryMap = {
          2: "Company Updates & Announcements",
          3: "Leadership Perspectives",
          4: "Opinion Pieces & Trends",
          5: "Case Studies & Success Stories",
          6: "Event Recaps & Milestones",
          7: "Problem Solving Narratives"
        };
        return audio.subCategory === subcategoryMap[activeCategory];
      });
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavBar2 progress={1} />
      
      {/* Hero Section with Video Background - LIGHT EDITION */}
      <div className="relative h-[450px] overflow-hidden mt-24">
        {/* Background Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* Light Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/60 via-[#F8FAFC]/70 to-[#F8FAFC]" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4"
          >
            Hirisionn Podcast: Learning in Motion
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-600 max-w-xl mb-10"
          >
            Bite-sized micro-learning and expert interviews designed for the flow of work.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative w-full max-w-lg"
          >
            <input 
              type="text"
              placeholder="Search episodes or speakers..."
              className="w-full px-6 py-4 bg-white border border-[#818CF8]/30 rounded-full text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#818CF8] focus:shadow-[0_0_20px_rgba(129,140,248,0.2)] transition-all shadow-lg"
            />
            <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#818CF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row px-4 md:px-8 pb-16 pt-8">
        
        {/* Desktop Sticky Sidebar */}
        <div className="hidden lg:block w-1/5 sticky top-32 h-fit pr-8">
          <h3 className="text-[#0F172A] font-bold text-lg mb-6">Sound Categories</h3>
          <div className="space-y-2">
            {audioCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ x: 4 }}
                className={`w-full text-left p-4 rounded-xl transition-all relative ${
                  activeCategory === category.id 
                    ? 'bg-white shadow-md' 
                    : 'bg-transparent hover:bg-white/50'
                }`}
              >
                {activeCategory === category.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#22D3EE] rounded-l-xl" />
                )}
                
                <div className="flex items-center gap-3">
                  <span className="text-lg">{category.icon}</span>
                  <div>
                    <p className={`font-medium ${activeCategory === category.id ? 'text-[#0F172A] font-bold' : 'text-slate-700'}`}>
                      {category.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{category.description}</p>
                  </div>
                  {category.isLive && (
                    <span className="ml-auto flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#22D3EE] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22D3EE]"></span>
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile Horizontal Scrollable Categories */}
        <div className="lg:hidden overflow-x-auto py-4 -mx-4 px-4 scrollbar-hide mb-6">
          <div className="flex gap-3 w-max">
            {audioCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-3 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === category.id 
                    ? 'bg-[#22D3EE] text-[#0F172A] font-medium shadow-md' 
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  {category.icon} {category.name}
                  {category.isLive && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Audio Cards Grid */}
        <div className="lg:w-4/5">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#818CF8]"></div>
            </div>
          ) : audios.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              No audio found
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
                {filteredAudios.map((item, index) => (
              
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <AudioCard 
                      title={item.title}
                      description={item.description}
                      author={item.authorName}
                      youtubeLink={item.vid_link}
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg bg-white shadow-md text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    Previous
                  </button>
                  <span className="text-slate-600 font-medium">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded-lg bg-white shadow-md text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
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
  );
};

export default AudioLibrary;
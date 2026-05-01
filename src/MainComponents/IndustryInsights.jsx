import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import NavBar2 from './NavBar2';
import Card from './Card';
import VideoCard from './VideoCard';
import AudioCard from './AudioCard';
import video from '../assets/video2.mp4';
import { getIndustry } from '../services/blog.api'
import { getIndustryVideo } from '../services/video.api';
import { getIndustryAudio } from '../services/audio';

const IndustryInsights = () => {
  const [activeSubCategory, setActiveSubCategory] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Industry Insights Subcategories (exactly as specified)
  const subCategories = [
    { id: 0, name: "All Content" },
    { id: 1, name: "Industry Reports", description: "Industry reports and forecasts" },
    { id: 2, name: "Market Trends", description: "Market trends and emerging technologies" },
    { id: 3, name: "Competitor Analysis", description: "Competitor or ecosystem analysis" },
    { id: 4, name: "Regulatory Updates", description: "Regulatory or policy updates" },
    { id: 5, name: "Economic Factors", description: "Economic factors impacting sector" },
    { id: 6, name: "Vertical Deep Dives", description: "Fintech, Healthcare, Manufacturing etc." },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [blogsRes, videosRes, audiosRes] = await Promise.all([
        getIndustry(),
        getIndustryVideo(),
        getIndustryAudio()
      ]);
      
      setBlogs(blogsRes.data || []);
      setVideos(videosRes.data || []);
      setAudios(audiosRes.data || []);
    } catch (err) {
      console.error('Error fetching industry content:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter all content types by selected subcategory
  const filterBySubCategory = (items) => {
    if (activeSubCategory === 0) return items;
    
    const subcategoryMap = {
      1: "Industry Reports & Forecasts",
      2: "Market Trends & Emerging Technologies",
      3: "Competitor & Ecosystem Analysis",
      4: "Regulatory & Policy Updates",
      5: "Economic Factor Analysis",
      6: "Vertical Deep Dives (Fintech, Healthcare, etc.)"
    };
    
    return items.filter(item => item.subCategory === subcategoryMap[activeSubCategory]);
  };

  const filteredBlogs = filterBySubCategory(blogs);
  const filteredVideos = filterBySubCategory(videos);
  const filteredAudios = filterBySubCategory(audios);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavBar2 progress={1} />
      
      {/* Pulse Hero Section */}
      <div className="relative h-[500px] overflow-hidden mt-24">
        {/* Background Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* Deep Navy Overlay */}
        <div className="absolute inset-0 bg-[#0F172A]/75 backdrop-blur-md" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Industry Insights
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-300 max-w-2xl mb-10"
          >
            Data-driven and outward-looking. Industry reports, market trends, regulatory updates and economic analysis.
          </motion.p>

          {/* Unified Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative w-full max-w-2xl"
          >
            <input 
              type="text"
              placeholder="Search across all industry content..."
              className="w-full px-8 py-5 bg-white/10 backdrop-blur-md border border-[#22D3EE]/50 rounded-full text-white placeholder-slate-400
                        focus:outline-none focus:border-[#22D3EE] focus:shadow-[0_0_40px_rgba(34,211,238,0.25)] transition-all shadow-xl text-lg"
            />
            <svg className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[#22D3EE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 pt-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sticky Sidebar Filter */}
          <div className="hidden lg:block w-64 sticky top-32 self-start">
            <h3 className="text-[#0F172A] font-bold text-lg mb-6">Industry Categories</h3>
            <div className="flex flex-col gap-3">
              {subCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveSubCategory(category.id)}
                  className={`text-left py-3 px-4 rounded-xl transition-all duration-300 group ${
                    activeSubCategory === category.id 
                      ? 'bg-white shadow-md text-[#22D3EE] border-l-2 border-[#22D3EE]' 
                      : 'text-slate-700 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{category.icon}</span>
                    <div>
                      <span className="font-medium">{category.name}</span>
                      <p className="text-xs text-slate-400 mt-0.5">{category.description}</p>
                    </div>
                    {activeSubCategory === category.id && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Horizontal Scrollable Categories */}
          <div className="lg:hidden overflow-x-auto py-4 -mx-4 px-4 scrollbar-hide mb-6">
            <div className="flex gap-3 w-max">
              {subCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveSubCategory(category.id)}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-3 rounded-full whitespace-nowrap transition-all ${
                    activeSubCategory === category.id 
                      ? 'bg-[#22D3EE] text-[#0F172A] font-medium shadow-md' 
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {category.icon} {category.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main Content Feed - 3 Sections */}
          <div className="flex-1 space-y-20">
            
            {/* Section 1: Blogs / Written Analysis */}
            <section>
              <h2 className="text-[#0F172A] text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="text-3xl">📝</span> Analysis & Reports
              </h2>
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22D3EE]"></div>
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div className="text-center py-16 text-slate-500 bg-white/50 rounded-2xl">
                  No industry blogs available
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredBlogs.map((blog, index) => (
                    <motion.div
                      key={blog._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card 
                        id={blog._id}
                        title={blog.title}
                        img={blog.thumbnail?.url || blog.img}
                        itm={blog}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </section>

            {/* Section Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#818CF8]/20 to-transparent" />

            {/* Section 2: Video Content */}
            <section className="pt-4">
              <h2 className="text-[#0F172A] text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="text-3xl">🎬</span> Video Insights
              </h2>
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22D3EE]"></div>
                </div>
              ) : filteredVideos.length === 0 ? (
                <div className="text-center py-16 text-slate-500 bg-white/50 rounded-2xl">
                  No industry videos available
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {filteredVideos.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="overflow-visible"
                    >
                      <VideoCard 
                        title={item.title}
                        author={item.author}
                        category={item.subCategory}
                        youtubeLink={item.vid_link}
                        createdAt={item.createdAt}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </section>

            {/* Section Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#10B981]/20 to-transparent" />

            {/* Section 3: Audio / Podcast Content */}
            <section className="pt-4">
              <h2 className="text-[#0F172A] text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="text-3xl">🎧</span> Podcast & Audio
              </h2>
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22D3EE]"></div>
                </div>
              ) : filteredAudios.length === 0 ? (
                <div className="text-center py-16 text-slate-500 bg-white/50 rounded-2xl">
                  No industry audio available
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredAudios.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
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
              )}
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryInsights;
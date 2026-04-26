import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavBar2 from './NavBar2';
import Card from './Card';
import VideoCard from './VideoCard';
import video from '../assets/video2.mp4';
import { getLetastIndustryBlog } from '../services/blog.api';
import { getLetastIndustryVideo } from '../services/video.api';
import { getAllIndustryBlogs } from '../services/blog.api';
import { getAllIndustryVideos } from '../services/video.api';

const IndustryInsights = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogPage, setBlogPage] = useState(1);
  const [videoPage, setVideoPage] = useState(1);
  const [blogTotalPages, setBlogTotalPages] = useState(1);
  const [videoTotalPages, setVideoTotalPages] = useState(1);

  // Industry Categories
  const industries = [
    { id: 0, name: "Blogs" },
    { id: 1, name: "Videos"},
  ];

  useEffect(() => {
    fetchData();
  }, [blogPage, videoPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      
      
      // Fetch all with pagination
      const [allBlogsRes, allVideosRes] = await Promise.all([
        getAllIndustryBlogs(blogPage),
        getAllIndustryVideos(videoPage)
      ]);
      
      setBlogs(allBlogsRes.data || []);
      setVideos(allVideosRes.data || []);
      setBlogTotalPages(allBlogsRes.totalPages || 1);
      setVideoTotalPages(allVideosRes.totalPages || 1);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter both content types simultaneously
  const filteredBlogs = activeIndustry === 0 
    ? blogs 
    : blogs;

  const filteredVideos = activeIndustry === 0 
    ? videos 
    : videos;

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
            Industry Insights: The 2026 Roadmap
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-300 max-w-2xl mb-10"
          >
            Where data meets strategy. Explore deep-dive articles and visual masterclasses across 12+ sectors.
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
              placeholder="Search across all articles and videos..."
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
          
          {/* Sticky Industry Sidebar Filter */}
          <div className="hidden lg:block w-56 sticky top-32 self-start">
            <h3 className="text-[#0F172A] font-bold text-lg mb-6">Global Industries</h3>
            <div className="flex flex-col gap-3">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => setActiveIndustry(industry.id)}
                  className={`text-left py-3 px-4 rounded-xl transition-all duration-300 group ${
                    activeIndustry === industry.id 
                      ? 'bg-white shadow-md text-[#22D3EE] border-l-2 border-[#22D3EE]' 
                      : 'text-slate-700 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{industry.icon}</span>
                    <span className="font-medium">{industry.name}</span>
                    {activeIndustry === industry.id && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Feed */}
          <div className="flex-1 space-y-24">
            
            {/* Section 1: Insights in Detail (Blogs) */}
            <section>
              <h2 className="text-[#0F172A] text-2xl font-bold mb-8">Latest Analysis & Reports</h2>
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22D3EE]"></div>
                </div>
              ) : filteredBlogs.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                  No blogs found
                </div>
              ) : (
                <>
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
                          img={blog.thumbnail || blog.img}
                          itm={blog}
                        />
                      </motion.div>
                    ))}
                  </div>
                  {blogTotalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                      <button
                        onClick={() => setBlogPage(p => Math.max(1, p - 1))}
                        disabled={blogPage === 1}
                        className="px-4 py-2 rounded-lg bg-white shadow-md text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                      >
                        Previous
                      </button>
                      <span className="text-slate-600 font-medium">
                        Page {blogPage} of {blogTotalPages}
                      </span>
                      <button
                        onClick={() => setBlogPage(p => Math.min(blogTotalPages, p + 1))}
                        disabled={blogPage === blogTotalPages}
                        className="px-4 py-2 rounded-lg bg-white shadow-md text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>

            {/* Section Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#818CF8]/20 to-transparent" />

            {/* Section 2: Insights in Motion (Videos) */}
            <section className="pt-4">
              <h2 className="text-[#0F172A] text-2xl font-bold mb-8">Expert Masterclasses & Briefs</h2>
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22D3EE]"></div>
                </div>
              ) : filteredVideos.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                  No videos found
                </div>
              ) : (
                <>
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
                          category={item.category}
                          duration={item.duration}
                          date={item.date}
                          youtubeLink={item.vid_link}
                        />
                      </motion.div>
                    ))}
                  </div>
                  {videoTotalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                      <button
                        onClick={() => setVideoPage(p => Math.max(1, p - 1))}
                        disabled={videoPage === 1}
                        className="px-4 py-2 rounded-lg bg-white shadow-md text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                      >
                        Previous
                      </button>
                      <span className="text-slate-600 font-medium">
                        Page {videoPage} of {videoTotalPages}
                      </span>
                      <button
                        onClick={() => setVideoPage(p => Math.min(videoTotalPages, p + 1))}
                        disabled={videoPage === videoTotalPages}
                        className="px-4 py-2 rounded-lg bg-white shadow-md text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryInsights;
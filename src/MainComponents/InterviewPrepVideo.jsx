import React, { useEffect, useState, useRef } from 'react'
import Img1 from "../assets/cardImg.png"
import VideoCard from "./VideoCard";
import NavBar from './NavBar2';
import Footer from './Footer';
import { getAllInterviewVideos } from "../services/video.api";
import { motion } from "motion/react";

const createExcerpt = (text, length = 120) => {
  if (!text) return "";
  if (text.length <= length) return text;
  const trimmed = text.slice(0, length);
  return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "...";
};

const InterviewPrepVideo = () => {
  const loaderRef = useRef(null);
  const [video, setVideo] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!hasMore || loading) return;

      try {
        setLoading(true);
        const res = await getAllInterviewVideos(page);

        if (res.data.length === 0) {
          setHasMore(false);
          return;
        }

        setVideo((prev) => {
          const existingIds = new Set(prev.map((b) => b._id));
          const newBlogs = res.data.filter((b) => !existingIds.has(b._id));
          return [...prev, ...newBlogs];
        });

        if (page >= res.totalPages) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Failed to load videos", err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [page]);

  useEffect(() => {
    if (!loaderRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <>
      <NavBar />
      <main className="w-full bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] py-16 sm:py-20 md:py-24 pt-48 sm:pt-56 lg:pt-48">
        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0F172A] mb-3">
              Interview <span className="bg-gradient-to-r from-[#22D3EE] to-[#06D0D6] bg-clip-text text-transparent">Preparation</span>
            </h1>
            <p className="text-base sm:text-lg text-[#4A5568] max-w-2xl mx-auto">
              Explore all the latest video tutorials and expert tips to ace your interviews
            </p>
          </motion.div>

          {/* Video Header */}
          <motion.div 
            className="flex items-center gap-4 mb-8 px-4 sm:px-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-8 bg-gradient-to-b from-[#22D3EE] to-[#818CF8] rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">All Video Tutorials</h2>
          </motion.div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {video.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              >
                <VideoCard
                  id={item._id}
                  title={item.title}
                  desc={createExcerpt(item.description, 120)}
                  img={item.thumbnail?.url || Img1}
                  itm={item}
                />
              </motion.div>
            ))}
          </div>

          {/* Loader & Loading State */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div
              ref={loaderRef}
              className="h-10 w-10"
            />
            {loading && (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-2 h-2 bg-[#22D3EE] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#22D3EE] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-[#22D3EE] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <p className="ml-2 text-[#4A5568] font-medium">Loading more videos...</p>
              </motion.div>
            )}
            {!hasMore && video.length > 0 && (
              <motion.p
                className="text-[#A0AEC0] text-center py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No more videos to load
              </motion.p>
            )}
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default InterviewPrepVideo

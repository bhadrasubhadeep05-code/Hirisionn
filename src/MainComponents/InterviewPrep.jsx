import React from "react";
import Card from "./Card";
import Img1 from "../assets/cardImg.png";
import VideoCard from "./VideoCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getLetastInterviewBlog } from "../services/blog.api";
import { getLetastInterviewVideo } from "..//services/video.api"
import { motion } from "motion/react";

const createExcerpt = (text, length = 120) => {
  if (!text) return "";
  if (text.length <= length) return text;
  const trimmed = text.slice(0, length);
  return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "...";
};

const InterviewPrep = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getLetastInterviewBlog();
        setBlog(res);
      } catch (err) {
        console.log("failed to fetch blog ❌" + err);
        setBlog([])
      }
    };
    const fetchVideo = async () => {
      try {
        const res = await getLetastInterviewVideo();
        setVideo(res);
      } catch (err) {
        console.log("failed to create video ❌" + err);
        setBlog([]);
      }
    };
    fetchBlog();
    fetchVideo();
  }, []);

  const blogCards = blog.slice(0, 3);
  const videoCards = video.slice(0, 3);

  return (
    <div className="w-full bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] py-16 sm:py-20 md:py-24">
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
            Master the art of interviews with our comprehensive guides and expert tips
          </p>
        </motion.div>

        {/* Blogs Section */}
        <div className="mb-16 sm:mb-20">
          {/* Blog Header */}
          <motion.div 
            className="flex items-center justify-between mb-8 px-4 sm:px-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-8 bg-gradient-to-b from-[#22D3EE] to-[#818CF8] rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Blog Articles</h2>
            </div>
            <motion.button
              onClick={() => navigate(`/interview-prep-blog`)}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#22D3EE]/20 to-[#818CF8]/20 border border-[#22D3EE]/40 rounded-full text-[#22D3EE] font-semibold text-sm sm:text-base hover:border-[#22D3EE]/70 transition-all duration-300"
              whileHover={{ scale: 1.05, x: 4 }}
            >
              See More
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </motion.div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogCards.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  id={item._id}
                  title={item.title}
                  desc={createExcerpt(item.content, 120)}
                  img={item.thumbnail?.url || Img1}
                  itm={item}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Videos Section */}
        <div>
          {/* Video Header */}
          <motion.div 
            className="flex items-center justify-between mb-8 px-4 sm:px-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-8 bg-gradient-to-b from-[#818CF8] to-[#22D3EE] rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">Video Tutorials</h2>
            </div>
            <motion.button
              onClick={() => navigate(`/interview-prep-video`)}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#22D3EE]/20 to-[#818CF8]/20 border border-[#22D3EE]/40 rounded-full text-[#22D3EE] font-semibold text-sm sm:text-base hover:border-[#22D3EE]/70 transition-all duration-300"
              whileHover={{ scale: 1.05, x: 4 }}
            >
              See More
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </motion.div>

          {/* Video Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {videoCards.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;

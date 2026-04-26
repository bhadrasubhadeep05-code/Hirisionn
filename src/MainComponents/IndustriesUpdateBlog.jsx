import React, { useEffect, useState } from 'react'
import Card from "./Card";
import Img1 from "../assets/cardImg.png"
import NavBar from './NavBar2';
import Footer from './Footer';
import { getAllIndustryBlogs } from "../services/blog.api";
import { useRef } from "react";
import { motion } from "motion/react";

const createExcerpt = (text, length = 120) => {
  if (!text) return "";
  if (text.length <= length) return text;
  const trimmed = text.slice(0, length);
  return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "...";
};

const IndustriesUpdateBlog = () => {
  const loaderRef = useRef(null);
  const [blog, setBlog] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!hasMore || loading) return;

      try {
        setLoading(true);
        const res = await getAllIndustryBlogs(page);

        if (res.data.length === 0) {
          setHasMore(false);
          return;
        }

        setBlog((prev) => {
          const existingIds = new Set(prev.map((b) => b._id));
          const newBlogs = res.data.filter((b) => !existingIds.has(b._id));
          return [...prev, ...newBlogs];
        });

        if (page >= res.totalPages) {
          setHasMore(false);
        }
      } catch (err) {
        console.error("Failed to load blogs", err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
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
              Industries <span className="bg-gradient-to-r from-[#22D3EE] to-[#06D0D6] bg-clip-text text-transparent">Updates</span>
            </h1>
            <p className="text-base sm:text-lg text-[#4A5568] max-w-2xl mx-auto">
              Explore all the latest insights and trends in staffing and recruitment
            </p>
          </motion.div>

          {/* Blog Header */}
          <motion.div 
            className="flex items-center gap-4 mb-8 px-4 sm:px-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-8 bg-gradient-to-b from-[#22D3EE] to-[#818CF8] rounded-full" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">All Blog Articles</h2>
          </motion.div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {blog.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
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
                <p className="ml-2 text-[#4A5568] font-medium">Loading more articles...</p>
              </motion.div>
            )}
            {!hasMore && blog.length > 0 && (
              <motion.p
                className="text-[#A0AEC0] text-center py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No more articles to load
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

export default IndustriesUpdateBlog

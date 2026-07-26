import React, { useState } from "react";
import NavBar from "./NavBar2";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { getBlogById } from "../services/blog.api";

const Blog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data.blog || {});
      } catch (err) {
        console.error('Error fetching blog:', err);
        setBlog(null);
      }
    };
    
    fetchBlog();
  }, [id]);

  // Handle case where blog data might be missing (e.g., direct URL access)
  if (!blog) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F8FAFC] px-6 text-[#0F172A]">
        <div className="rounded-3xl border border-slate-100 bg-white p-10 text-center shadow-xl">
          <p className="font-medium">Blog content not found.</p>
          <button onClick={() => navigate("/")} className="mt-4 font-semibold text-[#E8791E] underline underline-offset-4">
          Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-[#F8FAFC]">
      <NavBar />

      <main className="relative flex-grow pt-16 md:pt-24">
        {/* Article hero */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-[radial-gradient(120%_160%_at_100%_0%,#1c5872,#12171B_70%)] px-4 pb-32 pt-16 md:px-8 md:pb-40 md:pt-24"
        >
          <div className="pointer-events-none absolute right-0 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,121,30,0.25)_0%,transparent_68%)] blur-[10px] sm:-right-20 sm:-top-20 sm:h-[420px] sm:w-[420px]" />
          <div className="relative z-10 mx-auto max-w-4xl">
            <button
              onClick={() => navigate(-1)}
              className="group mb-12 flex items-center gap-2 text-sm font-medium text-[#AAB5BA] transition-colors hover:text-white"
            >
              <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Articles
            </button>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#F2A93C]"
            >
              Hirisionn Insights
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-4xl text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
            >
              {blog.title}
            </motion.h1>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 52 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="mt-8 w-0.5 bg-gradient-to-b from-[#F2A93C] to-[#E8791E]"
            />
          </div>
        </motion.section>

        {/* Content Container */}
        <div className="relative z-10 mx-auto -mt-16 max-w-4xl px-4 pb-24 md:-mt-20 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="overflow-hidden rounded-[2rem] border border-white bg-white shadow-2xl"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-[#F2A93C] to-[#E8791E]" />

            <div className="p-6 md:p-12">
              {/* Blog Header */}
              <header className="mb-10 border-b border-slate-100 pb-8">
                <div className="flex flex-wrap items-center gap-3 text-sm md:text-base">
                  <div className="flex items-center gap-2 rounded-full border border-[#E8791E]/15 bg-[#E8791E]/5 px-4 py-2 font-medium text-slate-600">
                    <span className="h-2 w-2 rounded-full bg-[#E8791E]" />
                    Author:{" "}
                    <span className="text-[#0F172A] font-bold">
                      {blog.authorName}
                    </span>
                  </div>
                  {blog.createdAt && <div className="font-medium text-slate-400">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>}
                </div>
              </header>

              {/* Blog Content */}
              <article className="prose prose-lg max-w-none prose-headings:text-[#0F172A] prose-p:leading-relaxed prose-p:text-slate-600 prose-a:text-[#E8791E] prose-a:font-semibold hover:prose-a:text-[#F2A93C] prose-strong:text-[#0F172A] prose-li:text-slate-600">
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.content,
                  }}
                />
              </article>

              {/* Bottom Decorative Element */}
              <div className="mt-16 flex justify-center border-t border-slate-100 pt-8">
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#E8791E] to-transparent opacity-60" />
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

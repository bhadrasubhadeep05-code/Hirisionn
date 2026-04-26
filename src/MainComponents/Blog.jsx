import React from "react";
import NavBar from "./NavBar2";
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "./Footer";

const Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog;

  // Handle case where blog data might be missing (e.g., direct URL access)
  if (!blog) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] text-[#0F172A] font-medium">
        Blog content not found. <button onClick={() => navigate("/")} className="ml-2 underline">Go Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col">
      <NavBar />
      
      <main className="flex-grow relative px-4 py-28 md:py-28">
        {/* Background Atmospheric Glows */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#818CF8] opacity-10 blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#22D3EE] opacity-10 blur-[120px] pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="group mb-8 flex items-center gap-2 text-slate-500 hover:text-[#0F172A] transition-colors font-medium text-sm"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Articles
          </button>

          {/* The Blog "Glass" Card */}
          <div className="bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden">
            
            {/* Metallic Top Accent Bar */}
            <div className="h-2 w-full bg-gradient-to-r from-[#B3448E] via-[#523E77] to-[#DF9236]" />

            <div className="p-6 md:p-12">
              {/* Blog Header */}
              <header className="mb-10">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0F172A] via-[#475569] to-[#0F172A]">
                    {blog.title}
                  </span>
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium border border-slate-200">
                    <span className="w-2 h-2 rounded-full bg-[#818CF8]" />
                    Author: <span className="text-[#0F172A] font-bold">{blog.authorName}</span>
                  </div>
                  <div className="text-slate-400 font-medium">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              </header>

              {/* Blog Content */}
              <article className="prose prose-slate max-w-none">
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
                  {blog.content}
                </p>
              </article>

              {/* Bottom Decorative Element */}
              <div className="mt-16 pt-8 border-t border-slate-100 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

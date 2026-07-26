import React from 'react';
import { motion } from 'framer-motion';
import NavBar from './NavBar2';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';

const getEmbedUrl = (url) => {
  if (!url) return '';

  if (url.includes('youtu.be')) {
    return `https://www.youtube.com/embed/${url.split('/').pop()}`;
  }

  try {
    const params = new URL(url).searchParams;
    const videoId = params.get('v');
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  } catch (e) {
    console.log(e);
    return '';
  }
};

const Video = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const video = location.state?.video;

  if (!video) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#F8FAFC] font-medium text-[#0F172A]">
        Video content not found.
        <button onClick={() => navigate('/')} className="ml-2 underline">
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F8FAFC] text-slate-800">
      <NavBar progress={1} />

      <main className="relative flex-grow px-4 py-24 md:py-28">
        <div className="pointer-events-none fixed right-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-[#818CF8] opacity-10 blur-[120px]" />
        <div className="pointer-events-none fixed bottom-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-[#22D3EE] opacity-10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <button
            onClick={() => navigate(-1)}
            className="group mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#0F172A]"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Gallery
          </button>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-6"
          >
            <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-950 p-2 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(232,121,30,0.15),_transparent_35%)]" />
              <div className="relative aspect-video overflow-hidden rounded-[1.2rem] bg-black">
                <iframe
                  className="h-full w-full"
                  src={getEmbedUrl(video.vid_link)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="space-y-5">
              <div className="inline-flex rounded-full bg-[#FDE7D3] px-3 py-1 text-sm font-semibold text-[#E8791E]">
                Featured content
              </div>
              <h1 className="text-3xl font-bold leading-tight text-[#0F172A] md:text-5xl">
                {video.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">
                {video.description || 'No description available for this video.'}
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-[#0F172A] to-[#12171B] p-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#F2A93C]">Why this matters</p>
              <h2 className="mt-3 text-2xl font-semibold">A premium viewing experience for meaningful learning</h2>
              <p className="mt-4 text-lg leading-8 text-slate-300">
                Each video is presented with the same polished, immersive feel as the rest of the platform so the experience feels thoughtful from start to finish.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Video;
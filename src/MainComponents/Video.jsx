import React from "react";
import NavBar from "./NavBar2";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";

const getEmbedUrl = (url) => {
  if (!url) return "";

  // youtu.be/abc123
  if (url.includes("youtu.be")) {
    return `https://www.youtube.com/embed/${url.split("/").pop()}`;
  }

  // youtube.com/watch?v=abc123
  try {
    const params = new URL(url).searchParams;
    const videoId = params.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  } catch (e) {
    return "error ",
    console.log(e)
  }
};

const Video = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const video = location.state?.video;

  // Handle case where video data might be missing
  if (!video) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8FAFC] text-[#0F172A] font-medium">
        Video content not found. <button onClick={() => navigate("/")} className="ml-2 underline">Go Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col">
      <NavBar />
      
      <main className="flex-grow relative px-4 py-24 md:py-28">
        {/* Background Atmospheric Glows */}
        <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#818CF8] opacity-10 blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#22D3EE] opacity-10 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="group mb-8 flex items-center gap-2 text-slate-500 hover:text-[#0F172A] transition-colors font-medium text-sm"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Gallery
          </button>

          {/* THE CINEMATIC PLAYER SECTION */}
          <div className="relative group">
            {/* Neon Outer Glow - pulses slightly on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#22D3EE] via-[#818CF8] to-[#22D3EE] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            {/* Metallic Frame */}
            <div className="relative bg-white rounded-2xl p-1 shadow-2xl overflow-hidden">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
                <iframe
                  className="w-full h-full"
                  src={getEmbedUrl(video.vid_link)}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* VIDEO DATA SECTION */}
          <div className="mt-10 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0F172A] via-[#475569] to-[#0F172A]">
                {video.title}
              </span>
            </h1>
            
            <div className="bg-white/50 backdrop-blur-sm border border-white/50 p-6 md:p-8 rounded-3xl shadow-sm max-w-4xl">
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                {video.description || "No description available for this video."}
              </p>
              
              {/* Bottom Decorative Accent */}
              <div className="mt-8 flex justify-center md:justify-start">
                <div className="w-16 h-1 bg-gradient-to-r from-[#22D3EE] to-transparent rounded-full opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Video;
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavBar2 from '../MainComponents/NavBar2';
import Footer from '../MainComponents/Footer';
import { createVideo } from '../services/video.api';

const CreateVideo = () => {
  const navigate = useNavigate();
  const [formData, SetFormData] = useState({
    title: "",
    desc: "",
    url: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const handelChange = (e) => {
    const { name, value } = e.target;
    SetFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    
    try {
      setLoading(true);
     

      //create video
      const videoPayload = {
        title: formData.title,
        description: formData.desc,
        vid_link: formData.url,
        category: formData.category,
      };
      await createVideo(videoPayload);
      alert("Video is created ✅");

      SetFormData({
        title: "",
        desc: "",
        url: "",
        category: "",
      });
    } catch (err) {
      console.log("error message: " + err);
      alert("failed to create video ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col relative overflow-hidden">
      <NavBar2 progress={1} />
      
      <main className="flex-grow relative flex items-center justify-center px-4 py-20 mt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#818CF8] opacity-10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#22D3EE] opacity-10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-3xl">
          {/* Header */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0F172A] via-[#475569] to-[#0F172A]">
                Create Video
              </span>
            </h1>
            <p className="text-slate-500 font-medium">
              Upload new video content.
            </p>
          </motion.div>

          {/* Glass Form Card */}
          <motion.div
            className="backdrop-blur-2xl bg-white/60 rounded-[2.5rem] p-8 md:p-12 border border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#22D3EE] via-[#06B6D4] to-[#22D3EE] rounded-t-[3rem]" />

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Title */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Video Title</label>
                <input 
                  type="text" name="title" required
                  value={formData.title} onChange={handelChange}
                  placeholder="Enter video title"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Video Description</label>
                <textarea 
                  name="desc" required rows={6}
                  value={formData.desc} onChange={handelChange}
                  placeholder="Write video description here..."
                  className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm resize-none"
                />
              </div>

              {/* Youtube Link */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Youtube Video Link</label>
                <input 
                  type="text" name="url" required
                  value={formData.url} onChange={handelChange}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handelChange}
                  required
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE] focus:border-transparent focus:bg-white shadow-sm appearance-none"
                >
                  <option value="">-- Select a category --</option>
                    <option value="HR">HR</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Digital">Digital</option>
                  <option value="Retail">Retail</option>
                  <option value="International Affairs">International Affairs</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Civil">Civil</option>
                  <option value="Automation">Automation</option>
                  <option value="AI">AI</option>
                  <option value="IT">IT</option>
                  <option value="Industry Updates">Industry Updates</option>
                </select>
              </div>

            

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/admin/dashboard')}
                  className="flex-1 py-4 rounded-2xl font-bold text-lg text-slate-600 bg-white/70 border border-slate-200 transition-all duration-300"
                >
                  Cancel
                </motion.button>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex-1 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-[#22D3EE] to-[#06B6D4] transition-all duration-300 shadow-xl shadow-[#22D3EE]/20 overflow-hidden"
                  disabled={loading}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10">
                    {loading ? "Uploading Video..." : "Publish Video"}
                  </span>
                </motion.button>
              </div>

            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateVideo;
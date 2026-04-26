import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import NavBar2 from '../MainComponents/NavBar2';
import Footer from '../MainComponents/Footer';
import { uploadImage } from '../services/image.api';
import { createBlog } from '../services/blog.api';
import { convertToBase64 } from '../services/convertToBase64';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    authorName: "",
    category: "",
    imageUrl: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let thumbnailData = null;
      
      // If file image was uploaded
      if (image) {
        // 1️⃣ Convert image to Base64
        const base64Image = await convertToBase64(image);

        // 2️⃣ Upload image
        const imageRes = await uploadImage(base64Image);
        // imageRes = { url, public_id }
        
        thumbnailData = {
          url: imageRes.url,
          public_id: imageRes.public_id,
        };
      } 
      // If direct image url was provided
      else if (formData.imageUrl && formData.imageUrl.trim()) {
        thumbnailData = {
          url: formData.imageUrl.trim(),
          public_id: null
        };
      }

      // 3️⃣ Create blog payload
      const blogPayload = {
        title: formData.title,
        content: formData.content,
        authorName: formData.authorName,
        category: formData.category,
        thumbnail: thumbnailData,
      };

      // 4️⃣ Create blog
      await createBlog(blogPayload);

      alert("Blog created successfully!");

      // reset
      setFormData({
        title: "",
        content: "",
        authorName: "",
        category: "",
        imageUrl: "",
      });
      setImage(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to create blog");
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
                Create Blog
              </span>
            </h1>
            <p className="text-slate-500 font-medium">
              Publish new article content.
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
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#818CF8] via-[#6366F1] to-[#818CF8] rounded-t-[3rem]" />

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Title */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Blog Title</label>
                <input 
                  type="text" name="title" required
                  value={formData.title} onChange={handleChange}
                  placeholder="Enter blog title"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#818CF8] focus:border-transparent focus:bg-white shadow-sm"
                />
              </div>

              {/* Blog Content */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Blog Content</label>
                <textarea 
                  name="content" required rows={8}
                  value={formData.content} onChange={handleChange}
                  placeholder="Write your blog content here..."
                  className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#818CF8] focus:border-transparent focus:bg-white shadow-sm resize-none"
                />
              </div>

              {/* Author Name */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Author Name</label>
                <input 
                  type="text" name="authorName"
                  value={formData.authorName} onChange={handleChange}
                  placeholder="Enter author name"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#818CF8] focus:border-transparent focus:bg-white shadow-sm"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#818CF8] focus:border-transparent focus:bg-white shadow-sm appearance-none"
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

              {/* Thumbnail: Direct Image URL */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Thumbnail Image URL</label>
                <input 
                  type="url" name="imageUrl"
                  value={formData.imageUrl} onChange={handleChange}
                  placeholder="Enter direct image URL (optional)"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-slate-200 text-[#0F172A] placeholder-slate-400 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#818CF8] focus:border-transparent focus:bg-white shadow-sm"
                />
                <p className="text-xs text-slate-400 ml-1 mt-1">OR upload image file below</p>
              </div>

              {/* Thumbnail Upload */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-bold text-slate-500 ml-1">Upload Thumbnail File</label>
                <div className="relative">
                  <input 
                    type="file" accept="image/*" onChange={handleImageChange}
                    className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-slate-200 border-dashed text-[#0F172A] font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#818CF8] focus:border-transparent focus:bg-white shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#818CF8] file:text-white file:font-medium hover:file:bg-[#6366F1]"
                  />
                </div>
                {previewUrl && (
                  <div className="mt-3 rounded-2xl overflow-hidden border border-slate-200">
                    <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover" />
                  </div>
                )}
                <p className="text-xs text-slate-400 ml-1 mt-1">Both image options are optional</p>
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
                  className="group relative flex-1 py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-[#818CF8] to-[#6366F1] transition-all duration-300 shadow-xl shadow-[#818CF8]/20 overflow-hidden"
                  disabled={loading}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <span className="relative z-10">
                    {loading ? "Creating Blog..." : "Publish Blog"}
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

export default CreateBlog;
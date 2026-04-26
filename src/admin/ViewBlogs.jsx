import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import NavBar2 from '../MainComponents/NavBar2';
import Footer from '../MainComponents/Footer';
import Card from '../MainComponents/Card';
import { getAllInterviewBlogs, getAllIndustryBlogs, getAllOtherBlogs } from '../services/blog.api';
import { deleteBlog } from '../services/admin.api';

const ViewBlogs = () => {
  const [activeTab, setActiveTab] = useState('interview');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, [activeTab]);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      let response;
      if (activeTab === 'interview') {
        response = await getAllInterviewBlogs();
      } else if (activeTab === 'industry') {
        response = await getAllIndustryBlogs();
      } else {
        response = await getAllOtherBlogs();
      }
      if (response.data) {
        setBlogs(response.data);
      }
    } catch (err) {
      console.error('Error loading blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      setDeletingId(blogId);
      try {
        await deleteBlog(blogId);
        setBlogs(prev => prev.filter(blog => blog._id !== blogId));
      } catch (err) {
        console.error('Error deleting blog:', err);
        alert('Failed to delete blog. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const tabs = [
    { id: 'interview', label: 'Interview Preparation' },
    { id: 'industry', label: 'Industry Updates' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col relative overflow-hidden">
      <NavBar2 progress={1} />
      
      <main className="flex-grow relative px-4 py-16 mt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#818CF8] opacity-10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#22D3EE] opacity-10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0F172A] via-[#475569] to-[#0F172A]">
                Manage Blogs
              </span>
            </h1>
            <p className="text-slate-500 font-medium text-lg">
              View and manage all blog content.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-2 mb-8 bg-white/40 backdrop-blur-sm p-2 rounded-2xl w-fit mx-auto"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#818CF8] to-[#6366F1] text-white shadow-lg shadow-[#818CF8]/20'
                    : 'text-slate-600 hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Blog Cards Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {loading ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-slate-500 font-medium">Loading blogs...</p>
                </div>
              ) : blogs.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-slate-500 font-medium">No blogs found in this category</p>
                </div>
              ) : (
                blogs.map((blog, index) => (
                  <motion.div
                    key={blog._id || index}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex justify-center"
                  >
                    <div className="relative group">
                      <Card
                        id={blog._id}
                        title={blog.title}
                        desc={blog.content}
                        img={blog.thumbnail?.url}
                        itm={blog}
                      />
                      <button
                        onClick={() => handleDeleteBlog(blog._id)}
                        disabled={deletingId === blog._id}
                        className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300 font-bold text-lg ${
                          deletingId === blog._id
                            ? 'bg-red-500 animate-pulse'
                            : 'bg-white/90 hover:bg-red-500 hover:text-white shadow-md opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        🗑️
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ViewBlogs;
import React, { useState, useEffect, useContext } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Card from './Card'
import Video from '../assets/video4.mp4'
import NavBar2 from './NavBar2'
import { getBlog } from '../services/blog.api';
import AppContext from '../context/AppContext';

const BlogPage = () => {
  const { startLoading, stopLoading } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Blogs Category Subcategories (exactly as specified)
  const categories = [
    { id: 1, name: "All Blogs", description: "View all blog articles", isLive: false },
    { id: 2, name: "Company Updates", description: "Announcements & behind-the-scenes", isLive: true },
    { id: 3, name: "Leadership Perspectives", description: "Founder & executive insights", isLive: true },
    { id: 4, name: "Opinion Pieces", description: "Trends & industry opinions", isLive: false },
    { id: 5, name: "Case Studies", description: "Success stories & learnings", isLive: true },
    { id: 6, name: "Event Recaps", description: "Partnerships, milestones & events", isLive: false },
    { id: 7, name: "Problem Solving", description: "How we solved challenges", isLive: true },
  ];

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      startLoading();

      try {
        const response = await getBlog(page);
        setBlogs(response.data || []);
        setTotalPages(response.totalPages || 1);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setBlogs([]);
      } finally {
        setLoading(false);
        stopLoading();
      }
    };

    loadBlogs();
  }, [page, startLoading, stopLoading]);

  // Filter blogs based on selected subcategory
  const filteredBlogs = activeCategory === 1 
    ? blogs 
    : blogs.filter(blog => {
        const subcategoryMap = {
          2: "Company Updates & Announcements",
          3: "Leadership Perspectives",
          4: "Opinion Pieces & Trends",
          5: "Case Studies & Success Stories",
          6: "Event Recaps & Milestones",
          7: "Problem Solving Narratives"
        };
        return blog.subCategory === subcategoryMap[activeCategory];
      });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <NavBar2 />
      
      {/* Visionary Hero Section */}
      <section className="relative h-80 md:h-96 overflow-hidden my-20 md:my-36">
        {/* Blurred Background Video/Image */}
        <div className="absolute inset-0">
          <video autoPlay muted loop className="absolute w-full h-full object-cover">
                   <source src={Video} type="video/mp4" />
                 </video>
          <div className="absolute inset-0 bg-[#0F172A]/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Blogs & Thought Leadership
            </h1>
            <p className="text-white/80 max-w-2xl mb-8 leading-relaxed">
              This is your most flexible, conversational space. Company updates, leadership perspectives, trend analysis and real world stories.
            </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-md">
            <input 
              type="text"
              placeholder="Search articles..."
              className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-[#22D3EE]/50 text-white placeholder:text-white/50 outline-none focus:border-[#22D3EE] transition-colors"
            />
            
          </div>
        </div>
      </section>

      {/* Blog Content Layout */}
      <div className="flex flex-col lg:flex-row px-4 md:px-8 pb-16 pt-8">
        
        {/* Desktop Sticky Sidebar */}
        <div className="hidden lg:block w-1/5 sticky top-32 h-fit pr-8">
          <h3 className="text-[#0F172A] font-bold text-lg mb-6">Blog Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ x: 4 }}
                className={`w-full text-left p-4 rounded-xl transition-all relative ${
                  activeCategory === category.id 
                    ? 'bg-white shadow-md' 
                    : 'bg-transparent hover:bg-white/50'
                }`}
              >
                {activeCategory === category.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#22D3EE] rounded-l-xl" />
                )}
                
                <div className="flex items-center gap-3">
                  <span className="text-lg">{category.icon}</span>
                  <div>
                    <p className={`font-medium ${activeCategory === category.id ? 'text-[#0F172A] font-bold' : 'text-slate-700'}`}>
                      {category.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{category.description}</p>
                  </div>
                  {category.isLive && (
                    <span className="ml-auto flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#22D3EE] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22D3EE]"></span>
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mobile Horizontal Scrollable Categories */}
        <div className="lg:hidden overflow-x-auto py-4 -mx-4 px-4 scrollbar-hide mb-6">
          <div className="flex gap-3 w-max">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-3 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === category.id 
                    ? 'bg-[#22D3EE] text-[#0F172A] font-medium shadow-md' 
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  {category.icon} {category.name}
                  {category.isLive && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="lg:w-4/5">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22D3EE]"></div>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                No blogs found
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-0 md:ml-10">
                  {filteredBlogs.map((blog) => (
                    <Card 
                      key={blog._id || blog.id}
                      id={blog._id || blog.id}
                      title={blog.title}
                      img={blog.thumbnail.url }
                      itm={blog}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-12">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg bg-white shadow-md text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                    >
                      Previous
                    </button>
                    <span className="text-slate-600 font-medium">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg bg-white shadow-md text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
        </div>
      </div>

    </div>
  )
}

export default BlogPage
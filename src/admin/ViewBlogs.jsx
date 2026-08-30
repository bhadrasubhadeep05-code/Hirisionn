import React, { useState, useEffect, useMemo } from 'react'
import Card from '../MainComponents/Card'
import { getBlog } from '../services/blog.api'
import { deleteBlog } from '../services/admin.api'
import { useToast } from '../MainComponents/AlertNotification'

const ViewBlogs = () => {
  const toast = useToast()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(items.map((item) => item.category).filter(Boolean))
    )
    return ['All', ...uniqueCategories]
  }, [items])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const response = await getBlog()
      setItems(response.data || [])
    } catch (err) {
      console.error('Error fetching items:', err)
      toast.error('Failed to load blogs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this item?')) {
      setDeletingId(id)
      try {
        await deleteBlog(id)
        setItems(prev => prev.filter(item => (item._id || item.id) !== id))
        toast.success('Blog deleted successfully')
      } catch (err) {
        console.error('Error deleting item:', err)
        toast.error('Failed to delete item')
      } finally {
        setDeletingId(null)
      }
    }
  }

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Manage Blogs</h1>
          <p className="text-slate-600 mb-6">View, filter, and delete blog articles</p>
          
          {/* Category Tabs */}
          <div className="flex gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all text-sm ${
                  activeCategory === category
                    ? 'bg-[#22D3EE] text-[#0F172A] shadow-md font-semibold'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#22D3EE]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22D3EE]"></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No items found in this category
          </div>
        ) : (
          <div className="flex flex-wrap gap-8 justify-center">
            {filteredItems.map((item) => (
              <div key={item._id || item.id} className="relative group">
                <Card 
                  id={item._id || item.id}
                  title={item.title}
                  img={item.thumbnail?.url}
                  itm={item}
                />
                
                {/* Delete Button */}
                <button
                  onClick={(e) => handleDelete(item._id || item.id, e)}
                  disabled={deletingId === (item._id || item.id)}
                  className="absolute top-4 right-4 z-30 p-2 rounded-full bg-red-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 hover:bg-red-600"
                >
                  {deletingId === (item._id || item.id) ? (
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewBlogs
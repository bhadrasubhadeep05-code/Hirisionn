import React, { useState, useEffect } from 'react'
import AudioCard from '../MainComponents/AudioCard'
import { getAudio, getIndustryAudio, getworkforceAudio } from '../services/audio'
import { deleteAudio } from '../services/admin.api'

const ViewAudios = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [activeCategory, setActiveCategory] = useState('audio')

  const categories = [
    { id: 'audio', name: 'Audios', fetch: getAudio, deleteApi: deleteAudio },
    { id: 'industry', name: 'Industry Audios', fetch: getIndustryAudio, deleteApi: deleteAudio },
    { id: 'workforce', name: 'Workforce Audios', fetch: getworkforceAudio, deleteApi: deleteAudio }
  ]

  const fetchItems = async () => {
    setLoading(true)
    try {
      const category = categories.find(c => c.id === activeCategory)
      const response = await category.fetch()
      setItems(response.data ? response.data : Array.isArray(response) ? response : [])
    } catch (err) {
      console.error('Error fetching audios:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [activeCategory])

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this audio?')) {
      setDeletingId(id)
      try {
        const category = categories.find(c => c.id === activeCategory)
        await category.deleteApi(id)
        setItems(prev => prev.filter(item => (item._id || item.id) !== id))
      } catch (err) {
        console.error('Error deleting audio:', err)
        alert('Failed to delete audio')
      } finally {
        setDeletingId(null)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Manage Audios</h1>
          <p className="text-slate-600 mb-6">View and manage podcast audio content</p>
          
          {/* Category Tabs */}
          <div className="flex gap-3 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-[#22D3EE] text-[#0F172A] shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#22D3EE]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22D3EE]"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            No audios found in this category
          </div>
        ) : (
          <div className="flex flex-wrap gap-8 justify-center">
            {items.map((item) => (
              <div key={item._id || item.id} className="relative group">
                <AudioCard 
                  youtubeLink={item.vid_link}
                  title={item.title}
                  description={item.description}
                  author={item.authorName}
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

export default ViewAudios
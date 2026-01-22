import { useState, useRef, useEffect } from 'react'
import { Smile, X, Search, Loader2 } from 'lucide-react'

const COMMON_EMOJIS = [
  '👍', '👎', '❤️', '😂', '😮', '😢', '😡', '🎉',
  '🔥', '👏', '💯', '✅', '❌', '🤔', '👀', '🙌',
  '💪', '🚀', '⭐', '💡', '🐛', '🔧', '✨', '🎯'
]

const EMOJI_CATEGORIES = {
  'Frequentes': ['👍', '👎', '❤️', '😂', '😮', '😢', '😡', '🎉'],
  'Gestos': ['👏', '🙌', '💪', '👀', '🤝', '✋', '👋', '🤞'],
  'Símbolos': ['✅', '❌', '💯', '⭐', '🔥', '💡', '🎯', '⚡'],
  'Objetos': ['🐛', '🔧', '🚀', '📝', '💻', '🔍', '📌', '🏷️'],
  'Rostos': ['😀', '😊', '🤔', '😅', '🥳', '😎', '🤯', '😴']
}

const GIPHY_API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65'

export default function ReactionPicker({ onSelect, onClose, position = 'bottom' }) {
  const [activeTab, setActiveTab] = useState('emoji')
  const [searchTerm, setSearchTerm] = useState('')
  const [gifs, setGifs] = useState([])
  const [loadingGifs, setLoadingGifs] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Frequentes')
  const pickerRef = useRef(null)
  const searchTimeoutRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  useEffect(() => {
    if (activeTab === 'gif' && searchTerm.length === 0) {
      fetchTrendingGifs()
    }
  }, [activeTab])

  const fetchTrendingGifs = async () => {
    setLoadingGifs(true)
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=20&rating=g`
      )
      const data = await response.json()
      setGifs(data.data || [])
    } catch (error) {
      console.error('Erro ao buscar GIFs:', error)
    } finally {
      setLoadingGifs(false)
    }
  }

  const searchGifs = async (query) => {
    if (!query.trim()) {
      fetchTrendingGifs()
      return
    }
    setLoadingGifs(true)
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=20&rating=g`
      )
      const data = await response.json()
      setGifs(data.data || [])
    } catch (error) {
      console.error('Erro ao buscar GIFs:', error)
    } finally {
      setLoadingGifs(false)
    }
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    
    if (activeTab === 'gif') {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
      searchTimeoutRef.current = setTimeout(() => {
        searchGifs(value)
      }, 500)
    }
  }

  const handleEmojiSelect = (emoji) => {
    onSelect({ type: 'emoji', value: emoji })
    onClose()
  }

  const handleGifSelect = (gif) => {
    onSelect({
      type: 'gif',
      value: gif.images.fixed_height_small.url,
      preview: gif.images.fixed_height_small.url,
      title: gif.title
    })
    onClose()
  }

  const filteredEmojis = searchTerm
    ? Object.values(EMOJI_CATEGORIES).flat().filter(emoji => 
        emoji.includes(searchTerm)
      )
    : EMOJI_CATEGORIES[selectedCategory] || COMMON_EMOJIS

  const positionClasses = position === 'top' 
    ? 'bottom-full mb-2' 
    : 'top-full mt-2'

  return (
    <div 
      ref={pickerRef}
      className={`absolute ${positionClasses} left-0 z-50 bg-white rounded-lg shadow-xl border border-gray-200 w-72`}
    >
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('emoji')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'emoji' 
              ? 'text-primary-600 border-b-2 border-primary-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          😀 Emojis
        </button>
        <button
          onClick={() => setActiveTab('gif')}
          className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'gif' 
              ? 'text-primary-600 border-b-2 border-primary-600' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🎬 GIFs
        </button>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-2">
        <div className="relative mb-2">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={activeTab === 'emoji' ? 'Buscar emoji...' : 'Buscar GIF...'}
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {activeTab === 'emoji' && (
          <>
            {!searchTerm && (
              <div className="flex gap-1 mb-2 overflow-x-auto pb-1">
                {Object.keys(EMOJI_CATEGORIES).map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-2 py-1 text-xs rounded whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
            <div className="grid grid-cols-8 gap-1 max-h-40 overflow-y-auto">
              {filteredEmojis.map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="p-1.5 text-xl hover:bg-gray-100 rounded transition-colors"
                  title={emoji}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === 'gif' && (
          <div className="max-h-48 overflow-y-auto">
            {loadingGifs ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
              </div>
            ) : gifs.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                Nenhum GIF encontrado
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {gifs.map(gif => (
                  <button
                    key={gif.id}
                    onClick={() => handleGifSelect(gif)}
                    className="relative overflow-hidden rounded-lg hover:ring-2 hover:ring-primary-500 transition-all"
                  >
                    <img
                      src={gif.images.fixed_height_small.url}
                      alt={gif.title}
                      className="w-full h-20 object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
            <div className="mt-2 text-center">
              <img 
                src="https://giphy.com/static/img/giphy_logo_square_social.png" 
                alt="Powered by GIPHY" 
                className="h-4 inline-block opacity-50"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function ReactionButton({ onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`p-1 text-gray-400 hover:text-primary-600 rounded hover:bg-gray-100 transition-colors ${className}`}
      title="Reagir"
    >
      <Smile className="w-4 h-4" />
    </button>
  )
}

export function ReactionDisplay({ reactions = [], currentUserId, onToggle }) {
  if (!reactions || reactions.length === 0) return null

  const groupedReactions = reactions.reduce((acc, reaction) => {
    const key = `${reaction.type}:${reaction.value}`
    if (!acc[key]) {
      acc[key] = {
        ...reaction,
        count: 0,
        users: [],
        hasCurrentUser: false
      }
    }
    acc[key].count++
    acc[key].users.push(reaction.userName)
    if (reaction.userId === currentUserId) {
      acc[key].hasCurrentUser = true
    }
    return acc
  }, {})

  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {Object.values(groupedReactions).map((reaction, idx) => (
        <button
          key={idx}
          onClick={() => onToggle({ type: reaction.type, value: reaction.value })}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-colors ${
            reaction.hasCurrentUser
              ? 'bg-primary-100 text-primary-700 border border-primary-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
          }`}
          title={reaction.users.join(', ')}
        >
          {reaction.type === 'emoji' ? (
            <span className="text-sm">{reaction.value}</span>
          ) : (
            <img src={reaction.value} alt="GIF" className="h-4 rounded" />
          )}
          <span>{reaction.count}</span>
        </button>
      ))}
    </div>
  )
}

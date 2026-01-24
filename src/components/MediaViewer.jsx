import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, Download, Maximize2 } from 'lucide-react'

export default function MediaViewer({ media, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  
  if (!media || media.length === 0) return null
  
  const currentMedia = media[currentIndex]
  // Detectar vídeo pelo type ou pela extensão da URL
  const isVideo = currentMedia?.type === 'video' || 
    currentMedia?.url?.includes('.mp4') || 
    currentMedia?.url?.includes('.webm') || 
    currentMedia?.url?.includes('.mov') ||
    currentMedia?.url?.includes('.avi') ||
    currentMedia?.name?.includes('.mp4') ||
    currentMedia?.name?.includes('.webm')
  
  const goNext = () => {
    if (currentIndex < media.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }
  
  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight') goNext()
    if (e.key === 'ArrowLeft') goPrev()
  }

  return (
    <div 
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100]"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Download Button */}
      <a
        href={currentMedia.url}
        download
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 right-16 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
        title="Baixar"
      >
        <Download className="w-6 h-6" />
      </a>

      {/* Navigation - Previous */}
      {media.length > 1 && currentIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev() }}
          className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Navigation - Next */}
      {media.length > 1 && currentIndex < media.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext() }}
          className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Media Content */}
      <div 
        className="max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            src={currentMedia.url}
            controls
            autoPlay
            className="max-w-full max-h-[85vh] rounded-lg"
          />
        ) : (
          <img
            src={currentMedia.url}
            alt={currentMedia.name || 'Evidência'}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
        )}
      </div>

      {/* Counter */}
      {media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 rounded-full text-white text-sm">
          {currentIndex + 1} / {media.length}
        </div>
      )}

      {/* Filename */}
      {currentMedia.name && (
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/10 rounded text-white text-sm truncate max-w-[200px]">
          {currentMedia.name}
        </div>
      )}
    </div>
  )
}

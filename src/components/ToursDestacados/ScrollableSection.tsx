// ScrollableSection.tsx
import React, { useRef, useState, useEffect, ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ScrollableSectionProps {
  children: ReactNode
}

const ScrollableSection: React.FC<ScrollableSectionProps> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const updateArrows = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 0)
      setShowRightArrow(
        scrollRef.current.scrollLeft <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
      )
    }
  }

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', updateArrows)
      return () => scrollElement.removeEventListener('scroll', updateArrows)
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className='relative'>
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full z-10 hover:bg-opacity-75 transition-all duration-300'
          aria-label='Scroll left'
        >
          <ChevronLeft className='text-white' />
        </button>
      )}
      <div ref={scrollRef} className='flex space-x-6 overflow-x-hidden pb-6'>
        {children}
      </div>
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full z-10 hover:bg-opacity-75 transition-all duration-300'
          aria-label='Scroll right'
        >
          <ChevronRight className='text-white' />
        </button>
      )}
    </div>
  )
}

export default ScrollableSection

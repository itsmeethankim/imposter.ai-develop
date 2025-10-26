import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import ghostsImage from 'figma:asset/5e0b12821583070be76f4bb50ed63461f8fbc85f.png';
import cluesImage from 'figma:asset/da905a3bd37f52aa006fcefa1f91f99a2530fc0a.png';
import categoryCharacters from 'figma:asset/5d1ba539a2177307d851ca16ebe70f599f370265.png';

type CategoryTutorialProps = {
  onComplete: () => void;
};

export function CategoryTutorial({ onComplete }: CategoryTutorialProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const startY = useRef(0);
  const currentY = useRef(0);

  const slides = [
    {
      title: 'Choose Your Themes',
      description: 'Pick one or more themes to set the mood and match your vibe and party.',
      visual: (
        <div className="w-full flex items-center justify-center h-56">
          <img 
            src={categoryCharacters} 
            alt="Choose your themes" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      ),
    },
    {
      title: 'Check Your Role',
      description: 'Everyone sees the secret word... except the imposter — they only see their role. Their goal? Blend in.',
      visual: (
        <div className="w-full flex items-center justify-center h-56">
          <img 
            src={ghostsImage} 
            alt="Check your role" 
            className="max-w-full max-h-full object-contain"
          />
        </div>
      ),
    },
    {
      title: 'Drop a Clue',
      description: 'Give a clever hint or association. Clear for those in the know — confusing for the imposter.',
      visual: (
        <div className="w-full flex items-center justify-center h-64">
          <img 
            src={cluesImage} 
            alt="Drop a clue" 
            className="w-72 h-auto object-contain mx-auto"
          />
        </div>
      ),
    },
  ];

  const currentSlideData = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;
    
    // Only allow downward swipe
    if (diff > 0) {
      setTranslateY(diff);
    }
  };

  const handleTouchEnd = () => {
    // If swiped down more than 150px, close
    if (translateY > 150) {
      onComplete();
    } else {
      setTranslateY(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end pointer-events-none">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
        onClick={onComplete}
      />

      {/* Tutorial Card - Bottom Half */}
      <div 
        className="relative w-full bg-[#2D2D2D] rounded-t-[2.5rem] pointer-events-auto flex flex-col border-t border-[rgba(255,255,255,0.08)] transition-transform duration-300"
        style={{ 
          height: '70vh',
          minHeight: '550px',
          maxHeight: '85vh',
          transform: `translateY(${translateY}px)`
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Swipe Indicator */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[rgba(255,255,255,0.15)] rounded-full" />

        {/* Close Button */}
        <button
          onClick={onComplete}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center transition-all active:scale-90 z-10"
        >
          <X className="w-5 h-5 text-white" strokeWidth={2} />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 pt-8 pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Title */}
          <h2 className="text-white text-2xl text-center mb-4">
            {currentSlideData.title}
          </h2>

          {/* Description */}
          <p className="text-[#999] text-center mb-6 leading-relaxed px-4">
            {currentSlideData.description}
          </p>

          {/* Visual */}
          <div className="mb-8">
            {currentSlideData.visual}
          </div>
        </div>

        {/* Fixed Bottom Section */}
        <div className="flex-shrink-0 px-8 pb-8">
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-white'
                    : 'w-2 bg-[#404040]'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-full py-5 bg-white text-[#1A1A1A] rounded-2xl transition-all duration-200 active:scale-[0.98] border-2 border-white"
          >
            <div className="flex items-center justify-center">
              {currentSlide < slides.length - 1 ? 'Next' : 'Got it'}
            </div>
          </button>

          {/* Bottom Indicator */}
          <div className="mt-4 w-24 h-1 bg-[rgba(255,255,255,0.08)] rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
}

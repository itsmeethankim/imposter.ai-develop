import { useState } from 'react';
import { ArrowRight, Users, Brain, Trophy } from 'lucide-react';

type IntroSlidesProps = {
  onComplete: () => void;
};

export function IntroSlides({ onComplete }: IntroSlidesProps) {
  console.log('🎬 IntroSlides component rendering');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Users,
      step: '01',
      title: 'Gather Your Crew',
      description: 'Bring together 3 or more friends for an unforgettable social experience filled with deception and discovery.',
      accent: 'from-[#1A1A1A] to-[#2D2D2D]',
      pattern: 'circles'
    },
    {
      icon: Brain,
      step: '02',
      title: 'Master the Mind Game',
      description: 'Use wit and strategy to hide your role or expose the hidden players. Every word counts.',
      accent: 'from-[#2D2D2D] to-[#404040]',
      pattern: 'squares'
    },
    {
      icon: Trophy,
      step: '03',
      title: 'Claim Victory',
      description: 'Deceive or detect—only the sharpest minds will triumph in this battle of words and wits.',
      accent: 'from-[#404040] to-[#525252]',
      pattern: 'triangles'
    }
  ];

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black"
      style={{ 
        backgroundColor: '#000000',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50
      }}
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 animate-blob-float"
          style={{
            background: `radial-gradient(circle, ${currentSlideData.accent.includes('cyan') ? 'rgba(6, 182, 212, 0.4)' : currentSlideData.accent.includes('purple') ? 'rgba(168, 85, 247, 0.4)' : 'rgba(251, 146, 60, 0.4)'} 0%, transparent 70%)`,
            top: '10%',
            left: '5%'
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 animate-blob-float-delayed"
          style={{
            background: `radial-gradient(circle, ${currentSlideData.accent.includes('cyan') ? 'rgba(59, 130, 246, 0.35)' : currentSlideData.accent.includes('purple') ? 'rgba(236, 72, 153, 0.35)' : 'rgba(234, 179, 8, 0.35)'} 0%, transparent 70%)`,
            bottom: '15%',
            right: '10%',
            animationDelay: '4s'
          }}
        />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-elegant-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>
      
      {/* Geometric Pattern Background */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {currentSlideData.pattern === 'circles' && (
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border-2 border-current"
                style={{
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
          </div>
        )}
        {currentSlideData.pattern === 'squares' && (
          <div className="absolute inset-0 rotate-45">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute border-2 border-current"
                style={{
                  width: `${80 + i * 40}px`,
                  height: `${80 + i * 40}px`,
                  left: `${Math.random() * 120 - 10}%`,
                  top: `${Math.random() * 120 - 10}%`,
                }}
              />
            ))}
          </div>
        )}
        {currentSlideData.pattern === 'triangles' && (
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: 0,
                  height: 0,
                  borderLeft: `${30 + i * 5}px solid transparent`,
                  borderRight: `${30 + i * 5}px solid transparent`,
                  borderBottom: `${50 + i * 8}px solid currentColor`,
                  opacity: 0.3
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-8 py-6">
          <div className={`text-sm tracking-widest ${
            'text-gray-400'
          }`}>
            {currentSlideData.step}
          </div>
          <button
            onClick={onComplete}
            className={`text-sm tracking-wide px-4 py-2 transition-colors ${
              'text-gray-500 hover:text-gray-300'
            }`}
          >
            SKIP
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-md w-full">
            {/* Icon */}
            <div className="mb-12 flex justify-center">
              <div className={`relative inline-block`}>
                {/* Background Shape */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${currentSlideData.accent} opacity-10 scale-150 blur-2xl`} />
                
                {/* Icon Container */}
                <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${currentSlideData.accent} flex items-center justify-center shadow-2xl`}>
                  <Icon className="w-16 h-16 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="text-center space-y-6">
              <h1 className={`text-4xl ${
                'text-white'
              }`}>
                {currentSlideData.title}
              </h1>
              <p className={`text-lg leading-relaxed ${
                'text-gray-400'
              }`}>
                {currentSlideData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-8 pb-12 space-y-8">
          {/* Progress Bar */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  index <= currentSlide
                    ? 'bg-white'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={handleNext}
            className="relative w-full py-5 rounded-full transition-all duration-300 transform active:scale-95 bg-white text-[#1A1A1A] font-semibold shadow-md hover:bg-[#E5E5E5]"
          >
            <div className="flex items-center justify-center">
              <span className="tracking-wide text-base">
                {currentSlide < slides.length - 1 ? 'CONTINUE' : 'GET STARTED'}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 absolute right-6 top-1/2 -translate-y-1/2" />
          </button>
        </div>
      </div>
    </div>
  );
}
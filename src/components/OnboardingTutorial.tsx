import { useState } from 'react';
import { Users, Layers, Timer, X } from 'lucide-react';
import categoryCharacters from 'figma:asset/5d1ba539a2177307d851ca16ebe70f599f370265.png';
import playersImage from 'figma:asset/57f012b20529a2c9bc151ec516d758df494f7035.png';
import passPhoneImage from 'figma:asset/5037a96775081331822ea0f5251de835167c7704.png';

type OnboardingTutorialProps = {
  onComplete: () => void;
};

type TooltipStep = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
};

const TOOLTIP_STEPS: TooltipStep[] = [
  {
    icon: <Users className="w-6 h-6" strokeWidth={2} />,
    title: 'Add Your Players',
    description: 'Start by adding at least 3 players. Each person gets a unique role - innocent or imposter.',
    color: '#8B5CF6'
  },
  {
    icon: <Layers className="w-6 h-6" strokeWidth={2} />,
    title: 'Pick a Category',
    description: 'Choose from preset categories or create your own custom word lists. Premium categories unlock with subscription.',
    color: '#06B6D4'
  },
  {
    icon: <Timer className="w-6 h-6" strokeWidth={2} />,
    title: 'Pass the Phone',
    description: 'Each player views their role by the fingerprint thumb scan. Discuss clues, then vote to find the imposter!',
    color: '#10B981'
  }
];

export function OnboardingTutorial({ onComplete }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < TOOLTIP_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      if (navigator.vibrate) navigator.vibrate(10);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = TOOLTIP_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-fade-in flex items-center justify-center p-6">
      {/* Tooltip Card */}
      <div className="bg-[#2D2D2D] rounded-[24px] p-6 max-w-md w-full shadow-2xl animate-slide-up border-2 border-[rgba(255,255,255,0.08)] relative">
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center transition-all active:scale-90"
        >
          <X className="w-4 h-4 text-white" strokeWidth={2} />
        </button>

        {/* Icon */}
        {currentStep === 0 ? (
          <div className="w-full rounded-[20px] flex items-center justify-center mb-4 overflow-hidden">
            <img 
              src={playersImage} 
              alt="Add players" 
              className="w-full max-w-[280px] h-auto"
            />
          </div>
        ) : currentStep === 1 ? (
          <div className="w-full rounded-[20px] flex items-center justify-center mb-4 overflow-hidden">
            <img 
              src={categoryCharacters} 
              alt="Category characters" 
              className="w-full max-w-[280px] h-auto"
            />
          </div>
        ) : currentStep === 2 ? (
          <div className="w-full rounded-[20px] flex items-center justify-center mb-4 overflow-hidden">
            <img 
              src={passPhoneImage} 
              alt="Pass the phone" 
              className="w-full max-w-[240px] h-auto"
            />
          </div>
        ) : (
          <div 
            className="w-16 h-16 rounded-[20px] flex items-center justify-center mb-4 shadow-lg bg-[#404040]"
          >
            <div className="text-white">
              {step.icon}
            </div>
          </div>
        )}

        {/* Content */}
        <h3 className="text-white mb-2">
          {step.title}
        </h3>
        <p className="text-[#999999] mb-6">
          {step.description}
        </p>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {TOOLTIP_STEPS.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentStep
                  ? 'w-8 bg-white'
                  : 'w-1.5 bg-[#404040]'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 py-3 rounded-[20px] bg-[#1A1A1A] text-[#999999] transition-all active:scale-95 border border-[rgba(255,255,255,0.06)] flex items-center justify-center"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-[20px] bg-white text-[#1A1A1A] transition-all active:scale-95 shadow-lg flex items-center justify-center"
          >
            {currentStep < TOOLTIP_STEPS.length - 1 ? 'Next' : 'Get Started'}
          </button>
        </div>
      </div>
    </div>
  );
}

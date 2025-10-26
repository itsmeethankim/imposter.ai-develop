import { Play } from 'lucide-react';
import appIcon from 'figma:asset/de57ea74cc02b7b1f8eed18aca21806de60acb15.png';

type WelcomeScreenProps = {
  onStart: () => void;
};

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A1A] relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-[0.03] animate-blob-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
            top: '10%',
            left: '-10%'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-[0.03] animate-blob-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
            bottom: '10%',
            right: '-10%',
            animationDelay: '5s'
          }}
        />
        
        {/* Minimal floating dots */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-5 animate-elegant-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${10 + Math.random() * 8}s`
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-12 text-center">
          <div className="mb-8 inline-flex items-center justify-center">
            <img 
              src={appIcon} 
              alt="Imposter App Icon" 
              className="w-32 h-32 rounded-3xl"
            />
          </div>
          
          <h1 className="text-5xl mb-3 text-white">
            Imposter
          </h1>
          <p className="text-[#999] text-lg">
            Find the imposter among you
          </p>
        </div>

        {/* Features */}
        <div className="w-full space-y-4 mb-12">
          <div className="bg-[#2D2D2D] rounded-2xl p-6 border border-[rgba(255,255,255,0.08)]">
            <h3 className="text-white mb-2">How to Play</h3>
            <p className="text-[#999] text-sm leading-relaxed">
              Everyone gets a secret word except the imposter. Exchange clues, discuss carefully, and vote to find who doesn't belong.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#2D2D2D] rounded-2xl p-5 border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
              <div className="text-white text-sm text-center">3+ Players</div>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-5 border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
              <div className="text-white text-sm text-center">Find Them</div>
            </div>
            <div className="bg-[#2D2D2D] rounded-2xl p-5 border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
              <div className="text-white text-sm text-center">Vote<br />Out</div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full py-5 rounded-2xl bg-white border-2 border-white text-[#1A1A1A] transition-all duration-200 hover:bg-[#E5E5E5] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" />
          Start Game
        </button>

        {/* Bottom Indicator */}
        <div className="mt-8 w-24 h-1 bg-[rgba(255,255,255,0.08)] rounded-full" />
      </div>
    </div>
  );
}

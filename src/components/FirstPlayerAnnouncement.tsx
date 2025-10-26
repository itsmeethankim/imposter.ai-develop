import { useEffect } from 'react';
import { Player } from '../App';
import { AVAILABLE_AVATARS } from '../utils/avatars';
import { ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

type FirstPlayerAnnouncementProps = {
  firstPlayer: Player;
  onContinue: () => void;
};

export function FirstPlayerAnnouncement({ firstPlayer, onContinue }: FirstPlayerAnnouncementProps) {
  useEffect(() => {
    // Play a sound when this screen appears
    soundManager.play('confirm');
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #1A1A1A 0%, #252525 50%, #2D2D2D 100%)'
    }}>
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Minimal grey orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full blur-[120px] opacity-08 animate-blob-float"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
            top: '10%',
            right: '-10%'
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full blur-[120px] opacity-06 animate-blob-float-delayed"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
            bottom: '10%',
            left: '-10%',
            animationDelay: '3s'
          }}
        />
        
        {/* Minimal tech grid */}
        <div 
          className="absolute inset-0 opacity-03"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Minimal floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-elegant-float"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-white/80 text-xs font-mono tracking-wider uppercase">
                Random Selection
              </span>
            </div>
            <h2 className="text-3xl text-white">First to Speak</h2>
            <p className="text-white/60 text-sm">
              This player will begin the discussion
            </p>
          </div>

          {/* Player Card */}
          <div className="relative backdrop-blur-xl rounded-3xl p-8 border-2 bg-[#2D2D2D] border-[rgba(255,255,255,0.2)] shadow-2xl">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20 bg-gradient-to-br from-cyan-400 to-blue-500 animate-pulse" />
            
            {/* Content */}
            <div className="relative space-y-6">
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full blur-2xl opacity-30 bg-gradient-to-br from-cyan-400 to-blue-500 animate-pulse" />
                  <img
                    src={AVAILABLE_AVATARS.find(a => a.id === firstPlayer.avatarId)?.image || AVAILABLE_AVATARS[0].image}
                    alt={firstPlayer.name}
                    className="relative w-full h-full animate-reveal-blur"
                  />
                </div>
              </div>

              {/* Player Name */}
              <div className="text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[#404040] border-2 border-[rgba(255,255,255,0.2)]">
                  <h3 className="text-2xl text-white">
                    {firstPlayer.name}
                  </h3>
                </div>
              </div>

              {/* Instruction */}
              <div className="rounded-2xl p-4 bg-[#404040]/50 border border-[rgba(255,255,255,0.1)]">
                <p className="text-center text-white/80 text-sm">
                  <span className="font-medium text-cyan-400">{firstPlayer.name}</span> will describe their word first, then continue clockwise
                </p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={onContinue}
            className="relative w-full py-5 rounded-2xl bg-[#1A1A1A] text-white font-bold transition-all duration-200 hover:shadow-lg hover:bg-[#2D2D2D] active:scale-[0.98] overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative flex items-center justify-center gap-2">
              Start Discussion
              <ArrowRight className="w-5 h-5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

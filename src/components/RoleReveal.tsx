import { useState, useEffect } from 'react';
import { ArrowLeft, Fingerprint, Shield, Eye, Lock } from 'lucide-react';
import { Player } from '../App';
import { AVAILABLE_AVATARS } from '../utils/avatars';
import imposterIcon from 'figma:asset/88f96b2be2ecf56e846ac1b153054bb388382435.png';
import innocentIcon from 'figma:asset/f1cdee4ec99bf1719ba404833d4625f1bf8cbdeb.png';

type RoleRevealProps = {
  player: Player;
  playerNumber: number;
  totalPlayers: number;
  onNext: () => void;
  onBack?: () => void;
};

export function RoleReveal({ player, playerNumber, totalPlayers, onNext, onBack }: RoleRevealProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Immediately hide sensitive content and show transition screen
    setIsTransitioning(true);
    setIsScanning(false);
    setScanProgress(0);
    setIsFullyRevealed(false);
    setIsAuthenticated(false);
    
    // Short delay to ensure smooth transition without flashing
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 150);
    
    return () => clearTimeout(timer);
  }, [player.id]);

  // Scanning animation - Sped up
  useEffect(() => {
    if (!isScanning || scanProgress >= 100) return;

    const interval = setInterval(() => {
      setScanProgress(prev => {
        const next = prev + 3.5; // Increased from 2 to 3.5 for faster scan
        if (next >= 100) {
          setIsAuthenticated(true);
          setTimeout(() => {
            setIsFullyRevealed(true);
            if (navigator.vibrate) {
              navigator.vibrate([50, 50, 50]);
            }
          }, 500);
          return 100;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isScanning, scanProgress]);

  const handleScanStart = () => {
    if (!isScanning && !isAuthenticated) {
      setIsScanning(true);
      setScanProgress(0);
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }
  };

  const handleScanEnd = () => {
    if (scanProgress < 100) {
      setIsScanning(false);
      setScanProgress(0);
      if (navigator.vibrate) {
        navigator.vibrate(20);
      }
    }
  };

  const handleNext = () => {
    // Immediately enter transition state to hide current player's info
    setIsTransitioning(true);
    setIsScanning(false);
    setScanProgress(0);
    setIsFullyRevealed(false);
    setIsAuthenticated(false);
    
    // Small delay before calling onNext to ensure UI updates
    setTimeout(() => {
      onNext();
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #1A1A1A 0%, #252525 50%, #2D2D2D 100%)'
    }}>
      {/* Minimal scanning animation background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle scanning beams */}
        <div 
          className="absolute w-full h-1 animate-scan-beam"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            top: '30%',
            animationDuration: '3s'
          }}
        />
        <div 
          className="absolute w-full h-1 animate-scan-beam"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
            top: '60%',
            animationDuration: '4s',
            animationDelay: '1s'
          }}
        />
        
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

      {/* Header */}
      <div className="relative flex items-center justify-between px-6 py-6">
        {onBack && (
          <button
            onClick={onBack}
            className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-2 ml-auto px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span className="text-white text-sm font-medium">
            {playerNumber}/{totalPlayers}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6">
        {/* Fingerprint Scan Area - Clean Fullscreen Layout */}
        <div className="relative w-full flex-1 flex flex-col items-center justify-center max-w-md">
          {isTransitioning ? (
            /* Transition Screen - Prevents flashing */
            <div className="relative w-full flex flex-col items-center justify-center opacity-0 animate-fade-in">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
            </div>
          ) : !isAuthenticated ? (
            /* Fingerprint Scanner - Fullscreen */
            <div className="relative w-full flex flex-col items-center justify-center space-y-10">
              {/* Player Identity Section */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                  <Shield className="w-5 h-5 text-white/80" />
                  <h2 className="text-white font-bold">{player.name}</h2>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-white animate-pulse' : 'bg-white/40'}`} />
                <span className="text-white/90 text-xs font-mono tracking-widest uppercase">
                  {isScanning ? 'Scanning' : 'Ready'}
                </span>
                <Lock className="w-3.5 h-3.5 text-white/60" />
              </div>

              {/* Fingerprint Scan Circle - Thumb-sized */}
              <div className="relative">
                <div 
                  className="relative w-44 h-44 rounded-full cursor-pointer"
                  onTouchStart={handleScanStart}
                  onTouchEnd={handleScanEnd}
                  onMouseDown={handleScanStart}
                  onMouseUp={handleScanEnd}
                  onMouseLeave={handleScanEnd}
                >
                  {/* Outer glow ring */}
                  <div className={`absolute -inset-4 rounded-full transition-all duration-300 ${
                    isScanning ? 'bg-white/5 blur-xl' : 'bg-transparent'
                  }`} />
                  
                  {/* Background rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                  <div className="absolute inset-4 rounded-full border border-white/8" />
                  
                  {/* Progress Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeDasharray={`${scanProgress * 3.015}, 301.5`}
                      strokeLinecap="round"
                      className="transition-all duration-100"
                      opacity="0.9"
                    />
                  </svg>
                  
                  {/* Center content - Thumb-sized fingerprint */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`transition-all duration-300 ${isScanning ? 'scale-105' : 'scale-100'}`}>
                      <Fingerprint 
                        className={`w-20 h-20 transition-all duration-300 ${
                          isScanning 
                            ? 'text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.7)]' 
                            : 'text-white/40'
                        }`}
                      />
                    </div>
                  </div>
                  
                  {/* Scan lines effect */}
                  {isScanning && (
                    <>
                      <div 
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent animate-scan-line"
                        style={{ top: `${scanProgress}%` }}
                      />
                      {/* Radial scan effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/8 to-transparent animate-pulse" />
                    </>
                  )}
                </div>
                
                {/* Progress Percentage - Below circle */}
                {isScanning && (
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
                      <span className="text-white text-sm font-mono font-medium">{Math.floor(scanProgress)}%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Instruction Text */}
              <div className="text-center space-y-2 pt-4">
                <p className="text-white/90 font-medium">
                  {isScanning ? 'Authenticating...' : 'Press & hold to scan'}
                </p>
                <p className="text-white/50 text-xs font-mono tracking-wider uppercase">
                  Biometric Security
                </p>
              </div>

              {/* Privacy Warning */}
              <div className="mt-6">
                <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                  <Eye className="w-3.5 h-3.5 text-white/60" />
                  <p className="text-white/60 text-xs">Keep your screen private</p>
                </div>
              </div>
            </div>
          ) : (
            /* Revealed Role */
            <div className="relative animate-fade-in">
              <div className={`backdrop-blur-xl rounded-3xl p-8 border-2 shadow-2xl ${
                player.isImposter 
                  ? 'bg-red-950/40 border-red-500/40' 
                  : 'bg-[#2D2D2D] border-[rgba(255,255,255,0.2)]'
              }`}>
                {/* Success indicator */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    player.isImposter ? 'bg-red-500' : 'bg-white'
                  }`} />
                  <span className={`text-xs font-mono tracking-wider ${
                    player.isImposter ? 'text-red-400' : 'text-white'
                  }`}>ACCESS GRANTED</span>
                </div>

                {/* Scan lines effect during reveal */}
                {!isFullyRevealed && (
                  <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: player.isImposter 
                        ? 'repeating-linear-gradient(0deg, rgba(239, 68, 68, 0.05) 0px, transparent 2px, transparent 4px)'
                        : 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0px, transparent 2px, transparent 4px)',
                      animation: 'scan-down 0.5s ease-out'
                    }}
                  />
                )}

                {/* Role Icon - Player Avatar */}
                <div className="relative mx-auto w-40 h-40 mb-6">
                  <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 animate-pulse ${
                    player.isImposter ? 'bg-red-500' : 'bg-white'
                  }`} />
                  <img
                    src={AVAILABLE_AVATARS.find(a => a.id === player.avatarId)?.image || AVAILABLE_AVATARS[0].image}
                    alt={player.name}
                    className="relative w-full h-full animate-reveal-blur"
                  />
                </div>

                {/* Role Title */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-3 border-2 ${
                    player.isImposter
                      ? 'bg-red-950/60 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                      : 'bg-[#404040] border-[rgba(255,255,255,0.2)]'
                  }`}>
                    <Shield className={`w-6 h-6 ${
                      player.isImposter ? 'text-red-400' : 'text-white'
                    }`} />
                    <h3 className={`text-2xl font-bold ${
                      player.isImposter ? 'text-red-500' : 'text-white'
                    }`}>
                      {player.isImposter ? 'IMPOSTER' : 'INNOCENT'}
                    </h3>
                  </div>
                </div>

                {/* Word Display */}
                {player.word && (
                  <div className={`rounded-2xl p-6 border-2 ${
                    player.isImposter
                      ? 'bg-red-950/40 border-red-500/30'
                      : 'bg-[#404040] border-[rgba(255,255,255,0.15)]'
                  }`}>
                    <p className={`text-xs font-mono tracking-wider mb-2 text-center ${
                      player.isImposter ? 'text-red-400/80' : 'text-white/70'
                    }`}>
                      {player.isImposter ? 'YOUR HINT' : 'SECRET WORD'}
                    </p>
                    <p className={`text-2xl font-bold text-center ${
                      player.isImposter ? 'text-red-400' : 'text-white'
                    }`}>{player.word}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Continue Button */}
      {isFullyRevealed && !isTransitioning && (
        <div className="relative px-6 pb-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          <button
            onClick={handleNext}
            className="relative w-full py-5 rounded-2xl bg-[#1A1A1A] text-white font-bold transition-all duration-200 hover:shadow-lg hover:bg-[#2D2D2D] active:scale-[0.98] overflow-hidden group mt-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative flex items-center justify-center gap-2">
              {playerNumber === totalPlayers ? (
                <>
                  <Shield className="w-5 h-5" />
                  Start Discussion
                </>
              ) : (
                <>
                  Next Player
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </>
              )}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

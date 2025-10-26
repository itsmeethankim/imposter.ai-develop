import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { Category } from '../App';
import { Switch } from './ui/switch';

type GameSettingsProps = {
  category: Category;
  playerCount: number;
  imposterCount: number;
  setImposterCount: (count: number) => void;
  hintWordEnabled: boolean;
  setHintWordEnabled: (enabled: boolean) => void;
  roundDuration: number;
  setRoundDuration: (duration: number) => void;
  onStart: () => void;
  onBack: () => void;
};

export function GameSettings({
  category,
  playerCount,
  imposterCount,
  setImposterCount,
  hintWordEnabled,
  setHintWordEnabled,
  roundDuration,
  setRoundDuration,
  onStart,
  onBack
}: GameSettingsProps) {
  const maxImposters = Math.max(1, Math.floor(playerCount / 2));
  const minImposters = 1;
  
  const timerOptions = [120, 180, 300, 420]; // 2, 3, 5, 7 minutes in seconds

  const incrementImposters = () => {
    if (imposterCount < maxImposters) {
      setImposterCount(imposterCount + 1);
      if (navigator.vibrate) navigator.vibrate(10);
    }
  };

  const decrementImposters = () => {
    if (imposterCount > minImposters) {
      setImposterCount(imposterCount - 1);
      if (navigator.vibrate) navigator.vibrate(10);
    }
  };
  
  const incrementTimer = () => {
    const currentIndex = timerOptions.indexOf(roundDuration);
    if (currentIndex < timerOptions.length - 1) {
      setRoundDuration(timerOptions[currentIndex + 1]);
      if (navigator.vibrate) navigator.vibrate(10);
    }
  };
  
  const decrementTimer = () => {
    const currentIndex = timerOptions.indexOf(roundDuration);
    if (currentIndex > 0) {
      setRoundDuration(timerOptions[currentIndex - 1]);
      if (navigator.vibrate) navigator.vibrate(10);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${mins} min`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #1A1A1A 0%, #252525 50%, #2D2D2D 100%)'
    }}>
      {/* Minimal elegant background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grey blobs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 animate-blob-float"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
            top: '-10%',
            right: '-15%'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-08 animate-blob-float-delayed"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
            bottom: '-5%',
            left: '-10%',
            animationDelay: '4s'
          }}
        />
        <div 
          className="absolute w-[450px] h-[450px] rounded-full blur-[100px] opacity-06 animate-blob-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: '7s'
          }}
        />
        
        {/* Minimal sparkle particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-elegant-float"
            style={{
              width: '2px',
              height: '2px',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 pt-6 mb-8">
          <button
            onClick={onBack}
            className="w-11 h-11 rounded-[20px] bg-[#2D2D2D] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] flex items-center justify-center transition-all active:scale-95 hover:bg-[#404040]"
          >
            <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
          <div className="flex-1">
            <h2 className="text-white">Game Settings</h2>
            <p className="text-white/80 text-sm">{category.name}</p>
          </div>
        </div>

        {/* Scrollable Settings */}
        <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-32">
          {/* Imposters Count */}
          <div className="bg-[#2D2D2D] backdrop-blur-xl rounded-[20px] p-6 shadow-xl border-2 border-[rgba(255,255,255,0.08)]">
            <div className="mb-6">
              <h3 className="text-white mb-1">Imposters</h3>
              <p className="text-[#999] text-sm">
                Number of secret imposters in the game
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-6 py-2">
              <button
                onClick={decrementImposters}
                disabled={imposterCount <= minImposters}
                className={`w-11 h-11 rounded-[20px] flex items-center justify-center transition-all border-2 ${
                  imposterCount <= minImposters
                    ? 'border-[#404040] text-[#666] cursor-not-allowed'
                    : 'border-white text-white active:scale-90'
                }`}
              >
                <Minus className="w-5 h-5" strokeWidth={2} />
              </button>
              
              <div className="text-white text-4xl min-w-[60px] text-center">
                {imposterCount}
              </div>
              
              <button
                onClick={incrementImposters}
                disabled={imposterCount >= maxImposters}
                className={`w-11 h-11 rounded-[20px] flex items-center justify-center transition-all border-2 ${
                  imposterCount >= maxImposters
                    ? 'border-[#404040] text-[#666] cursor-not-allowed'
                    : 'border-white text-white active:scale-90'
                }`}
              >
                <Plus className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Hints Toggle - Now using Switch */}
          <div className="bg-[#2D2D2D] backdrop-blur-xl rounded-[20px] p-6 shadow-xl border-2 border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-white mb-1">Imposter Hints</h3>
                <p className="text-[#999] text-sm">
                  Give imposters contextual clues to help them blend in
                </p>
              </div>
              <Switch
                checked={hintWordEnabled}
                onCheckedChange={(checked) => {
                  setHintWordEnabled(checked);
                  if (navigator.vibrate) navigator.vibrate(10);
                }}
                className="flex-shrink-0"
              />
            </div>
          </div>

          {/* Round Duration */}
          <div className="bg-[#2D2D2D] backdrop-blur-xl rounded-[20px] p-6 shadow-xl border-2 border-[rgba(255,255,255,0.08)]">
            <div className="mb-6">
              <h3 className="text-white mb-1">Round Duration</h3>
              <p className="text-[#999] text-sm">
                Discussion time before voting begins
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-6 py-2">
              <button
                onClick={decrementTimer}
                disabled={timerOptions.indexOf(roundDuration) === 0}
                className={`w-11 h-11 rounded-[20px] flex items-center justify-center transition-all border-2 ${
                  timerOptions.indexOf(roundDuration) === 0
                    ? 'border-[#404040] text-[#666] cursor-not-allowed'
                    : 'border-white text-white active:scale-90'
                }`}
              >
                <Minus className="w-5 h-5" strokeWidth={2} />
              </button>
              
              <div className="text-white text-4xl min-w-[100px] text-center">
                {formatTime(roundDuration)}
              </div>
              
              <button
                onClick={incrementTimer}
                disabled={timerOptions.indexOf(roundDuration) === timerOptions.length - 1}
                className={`w-11 h-11 rounded-[20px] flex items-center justify-center transition-all border-2 ${
                  timerOptions.indexOf(roundDuration) === timerOptions.length - 1
                    ? 'border-[#404040] text-[#666] cursor-not-allowed'
                    : 'border-white text-white active:scale-90'
                }`}
              >
                <Plus className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Bottom CTA Area */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A1A] via-[rgba(26,26,26,0.98)] to-transparent pt-4 pb-8 px-4 border-t border-[rgba(255,255,255,0.04)]">
          <div className="max-w-2xl mx-auto">
            {/* Summary */}
            <div className="mb-4 flex items-center justify-center gap-2 text-sm">
              <span className="text-[#999]">
                {playerCount} players • {imposterCount} imposter{imposterCount > 1 ? 's' : ''}
              </span>
            </div>

            {/* Primary CTA */}
            <button
              onClick={onStart}
              className="w-full py-4 rounded-[20px] bg-white text-[#1A1A1A] transition-all active:scale-[0.98] shadow-lg"
            >
              <div className="flex items-center justify-center">
                Start Game
              </div>
            </button>

            {/* Bottom Indicator */}
            <div className="mt-4 w-24 h-1 bg-[#404040] rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

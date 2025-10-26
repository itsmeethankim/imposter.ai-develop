import { useState } from 'react';
import { Player } from '../App';
import { Lock } from 'lucide-react';
import { AVAILABLE_AVATARS } from '../utils/avatars';
import magnifyingGlass from 'figma:asset/334fcb0fdf74b28d9c247237e5b9df155373af95.png';

type VotingScreenProps = {
  players: Player[];
  onVote: (playerIds: string[]) => void;
  imposterCount: number;
};

// Minimal elegant color options for avatars - all same shade
const AVATAR_COLORS = [
  '#404040', '#404040', '#404040', '#404040', 
  '#404040', '#404040', '#404040', '#404040'
];

export function VotingScreen({ players, onVote, imposterCount }: VotingScreenProps) {
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([]);

  const handleVote = (playerId: string) => {
    setSelectedPlayerIds(prev => {
      // If already selected, remove it (toggle off)
      if (prev.includes(playerId)) {
        return prev.filter(id => id !== playerId);
      }
      
      // If we haven't reached the limit, add it
      if (prev.length < imposterCount) {
        return [...prev, playerId];
      }
      
      // If at limit, replace the last selection with the new one
      return [...prev.slice(0, -1), playerId];
    });
    if (navigator.vibrate) navigator.vibrate(10);
  };

  const handleLockVote = () => {
    if (selectedPlayerIds.length === imposterCount) {
      onVote(selectedPlayerIds);
    }
  };

  const totalPlayers = players.length;
  const votedCount = selectedPlayerIds.length;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #1A1A1A 0%, #252525 50%, #2D2D2D 100%)'
    }}>
      {/* Minimal elegant background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grey blobs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
            top: '-10%',
            right: '-15%',
            animation: 'blob-float 25s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-08"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
            bottom: '-5%',
            left: '-10%',
            animation: 'blob-float-delayed 30s ease-in-out infinite 4s'
          }}
        />
        <div 
          className="absolute w-[450px] h-[450px] rounded-full blur-[100px] opacity-06"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'blob-float-slow 20s ease-in-out infinite 7s'
          }}
        />
        
        {/* Minimal sparkle particles */}
        {[...Array(8)].map((_, i) => {
          const delay = Math.random() * 10;
          const duration = 12 + Math.random() * 8;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: '2px',
                height: '2px',
                background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `elegant-float ${duration}s ease-in-out infinite ${delay}s`
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col px-4 py-8 max-w-2xl mx-auto pb-32">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={magnifyingGlass} 
              alt="Detective" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <h2 className="text-white mb-2">
            Voting Phase
          </h2>
          <p className="text-[#999]">
            Select {imposterCount} suspected imposter{imposterCount > 1 ? 's' : ''}
          </p>
          {imposterCount > 1 && (
            <p className="text-white/50 text-sm mt-2">
              {selectedPlayerIds.length}/{imposterCount} selected
            </p>
          )}
        </div>

        {/* Player Grid */}
        <div className="flex-1 mb-8">
          <div className="grid grid-cols-2 gap-3">
            {players.map((player, index) => {
              const isSelected = selectedPlayerIds.includes(player.id);
              const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
              
              return (
                <button
                  key={player.id}
                  onClick={() => handleVote(player.id)}
                  className={`relative bg-[#2D2D2D] backdrop-blur-xl rounded-[20px] p-5 border transition-all active:scale-95 shadow-md ${
                    isSelected
                      ? 'border-white border-2 shadow-lg'
                      : 'border-[rgba(255,255,255,0.08)]'
                  }`}
                >
                  {/* Selection ring */}
                  {isSelected && (
                    <div className="absolute -inset-1 rounded-[22px] bg-white opacity-10 blur-sm" />
                  )}
                  
                  <div className="relative flex flex-col items-center">
                    {/* Avatar */}
                    <div className="w-16 h-16 flex items-center justify-center mb-3">
                      <img 
                        src={AVAILABLE_AVATARS.find(a => a.id === player.avatarId)?.image || AVAILABLE_AVATARS[0].image}
                        alt={player.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* Player Name */}
                    <div className="text-white text-center">
                      {player.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Card */}
        <div className="p-4 rounded-[20px] mb-6 bg-[#2D2D2D]/80 backdrop-blur-sm border border-[rgba(255,255,255,0.06)] shadow-sm">
          <p className="text-center text-[#999] text-sm">
            {imposterCount > 1 
              ? `Tap to select or deselect players. Choose ${imposterCount} suspects.`
              : 'Ensure consensus before locking your vote'
            }
          </p>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A1A] via-[rgba(26,26,26,0.98)] to-transparent pt-4 pb-8 px-4 border-t border-[rgba(255,255,255,0.04)]">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleLockVote}
            disabled={selectedPlayerIds.length !== imposterCount}
            className={`w-full py-4 rounded-[20px] flex items-center justify-center gap-2 transition-all shadow-md ${
              selectedPlayerIds.length === imposterCount
                ? 'bg-white text-[#1A1A1A] active:scale-[0.98]'
                : 'bg-[#404040] text-[#666] cursor-not-allowed'
            }`}
          >
            <Lock className="w-5 h-5" strokeWidth={2} />
            {selectedPlayerIds.length === imposterCount 
              ? `Lock Vote${imposterCount > 1 ? 's' : ''}` 
              : `Select ${imposterCount - selectedPlayerIds.length} More`
            }
          </button>

          {/* Bottom Indicator */}
          <div className="mt-4 w-24 h-1 bg-[#404040] rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { X, Plus, Users, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/soundManager';
import { AVAILABLE_AVATARS } from '../utils/avatars';

type LobbySetupProps = {
  onStart: (playerData: { name: string; avatarId: string }[]) => void;
};

type PlayerData = {
  name: string;
  avatarId: string;
  colorIndex: number;
};

const MAX_PLAYERS = 12;

// Minimal elegant color options - sophisticated grey tones
const AVATAR_COLORS = [
  '#1A1A1A', '#2D2D2D', '#404040', '#525252', 
  '#666666', '#737373', '#858585', '#999999'
];

export function LobbySetup({ onStart }: LobbySetupProps) {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [selectedAvatarId, setSelectedAvatarId] = useState(AVAILABLE_AVATARS[0].id);
  const [activePickerIndex, setActivePickerIndex] = useState<number | null>(null);

  const addPlayer = () => {
    if (currentInput.trim() !== '' && players.length < MAX_PLAYERS) {
      soundManager.play('confirm');
      const newIndex = players.length;
      const newPlayer: PlayerData = {
        name: currentInput.trim(),
        avatarId: selectedAvatarId,
        colorIndex: newIndex % AVATAR_COLORS.length
      };
      setPlayers([...players, newPlayer]);
      setCurrentInput('');
      setShowAvatarPicker(false);
      setSelectedAvatarId(AVAILABLE_AVATARS[(newIndex + 1) % AVAILABLE_AVATARS.length].id);
      
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    } else if (players.length >= MAX_PLAYERS) {
      soundManager.play('error');
    }
  };

  const removePlayer = (index: number) => {
    soundManager.play('tap');
    setPlayers(players.filter((_, i) => i !== index));
  };

  const updatePlayerName = (index: number, name: string) => {
    const updated = [...players];
    updated[index] = { ...updated[index], name };
    setPlayers(updated);
  };

  const updatePlayerAvatar = (index: number, avatarId: string) => {
    soundManager.play('avatar-select');
    const updated = [...players];
    updated[index] = { ...updated[index], avatarId };
    setPlayers(updated);
  };

  const handleStart = () => {
    if (players.length < 3) {
      soundManager.play('error');
      return;
    }
    soundManager.play('confirm');
    onStart(players.map(p => ({ name: p.name, avatarId: p.avatarId })));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addPlayer();
    }
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
        
        {/* Minimal sparkle particles - fewer and more subtle */}
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
        {/* Assemble Your Team Header */}
        <div className="px-4 pt-8">
        <div className="mb-6">
          <div className="bg-[#2D2D2D] backdrop-blur-xl rounded-[20px] p-5 shadow-lg border border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[20px] bg-white flex items-center justify-center shadow-md">
                  <Users className="w-6 h-6 text-[#1A1A1A]" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-white">Assemble Your Team</h2>
                  <p className="text-[#999] text-sm">Add players to begin</p>
                </div>
              </div>
              
              {/* Player Count Badge */}
              <div className="relative">
                <div className={`flex items-center gap-2 px-4 py-2.5 rounded-[20px] shadow-md transition-colors ${
                  players.length >= MAX_PLAYERS ? 'bg-[#EF4444] text-white' : 'bg-white text-[#1A1A1A]'
                }`}>
                  <Users className="w-4 h-4" strokeWidth={2} />
                  <span className="font-bold">{players.length}/{MAX_PLAYERS}</span>
                </div>
                {players.length >= 3 && players.length < MAX_PLAYERS && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md animate-bounce">
                      <span className="text-xs text-[#1A1A1A]">✓</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-3 bg-[#404040] rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-white transition-all duration-500 ease-out"
                    style={{ width: `${Math.min((players.length / 3) * 100, 100)}%` }}
                  />
                </div>
                {players.length >= 3 && (
                  <Sparkles className="w-5 h-5 text-white animate-pulse" strokeWidth={2} />
                )}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[#B0B0B0] text-sm font-medium">
                  {players.length >= MAX_PLAYERS
                    ? '⚠️ Maximum reached'
                    : players.length < 3 
                    ? `${3 - players.length} more needed` 
                    : '✓ Ready to play!'}
                </p>
                <p className="text-[#666] text-xs">3-{MAX_PLAYERS} players</p>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Scrollable Player List */}
        <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-32">
          {players.length === 0 && (
            <div className="text-center py-12 bg-[#2D2D2D] rounded-[20px] border border-[rgba(255,255,255,0.08)]">
              <div className="w-16 h-16 mx-auto mb-4 rounded-[20px] bg-[#404040] flex items-center justify-center">
                <Users className="w-8 h-8 text-[#666]" strokeWidth={2} />
              </div>
              <p className="text-[#999] text-sm">No players yet</p>
            </div>
          )}
          
          {players.map((player, index) => {
            const showPicker = activePickerIndex === index;
            const currentAvatar = AVAILABLE_AVATARS.find(a => a.id === player.avatarId) || AVAILABLE_AVATARS[0];
            
            return (
              <div key={index}>
                <div className="flex items-center gap-3 rounded-[20px] px-4 py-4 bg-[#2D2D2D] border border-[rgba(255,255,255,0.08)] transition-all">
                  {/* Player Avatar */}
                  <button
                    onClick={() => setActivePickerIndex(showPicker ? null : index)}
                    className="flex-shrink-0 w-12 h-12 rounded-[20px] overflow-hidden transition-transform active:scale-95 shadow-md"
                  >
                    <img src={currentAvatar.image} alt={currentAvatar.name} className="w-full h-full object-contain" />
                  </button>
                  
                  {/* Player Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[#666] text-xs mb-1">
                      Player {index + 1}
                    </div>
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => updatePlayerName(index, e.target.value)}
                      className="w-full bg-transparent text-white outline-none placeholder-[#666]"
                      placeholder="Enter name"
                    />
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removePlayer(index)}
                    className="flex-shrink-0 w-8 h-8 rounded-[20px] text-[#999] hover:bg-[#404040] transition-all active:scale-90"
                  >
                    <X className="w-4 h-4 mx-auto" strokeWidth={2} />
                  </button>
                </div>

                {/* Avatar Picker Modal */}
                {showPicker && (
                  <>
                    <div 
                      className="fixed inset-0 bg-black/40 backdrop-blur-lg z-[99] animate-fade-in"
                      onClick={() => setActivePickerIndex(null)}
                    />
                    
                    <div className="fixed inset-x-0 bottom-0 z-[100] animate-slide-up">
                      <div className="bg-[#2D2D2D] backdrop-blur-xl rounded-t-[32px] shadow-2xl border-t border-[rgba(255,255,255,0.08)]">
                        {/* Drag Handle & Header */}
                        <div className="bg-[#2D2D2D] pt-3 pb-3 z-10 relative">
                          <div className="w-12 h-1.5 bg-[#404040] rounded-full mx-auto mb-4" />
                          
                          <div className="flex items-center justify-between px-5">
                            <div>
                              <h3 className="text-white font-bold">Choose Avatar</h3>
                              <p className="text-[#999] text-sm">Pick your character</p>
                            </div>
                            
                            <button 
                              onClick={() => setActivePickerIndex(null)} 
                              className="w-10 h-10 rounded-full bg-[#404040] hover:bg-[#525252] active:scale-90 transition-all flex items-center justify-center shadow-sm"
                            >
                              <X className="w-5 h-5 text-[#999]" strokeWidth={2} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Avatar Grid - Scrollable with max height */}
                        <div className="overflow-y-auto px-5 pt-2" style={{ maxHeight: '60vh', paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
                          <div className="grid grid-cols-4 gap-3 pb-4">
                            {AVAILABLE_AVATARS.map((avatar) => {
                              const isSelected = player.avatarId === avatar.id;
                              return (
                                <button
                                  key={avatar.id}
                                  onClick={() => {
                                    updatePlayerAvatar(index, avatar.id);
                                    setActivePickerIndex(null);
                                    if (navigator.vibrate) navigator.vibrate(10);
                                  }}
                                  className={`relative rounded-2xl transition-all duration-200 ${
                                    isSelected 
                                      ? 'ring-4 ring-white scale-110 shadow-md' 
                                      : 'hover:ring-2 ring-[#404040] active:scale-90'
                                  }`}
                                >
                                  <img src={avatar.image} alt={avatar.name} className="w-full h-full object-contain" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {/* Add Player Input */}
          <div className="flex flex-col gap-3 bg-[#2D2D2D] rounded-[20px] p-4 border border-[rgba(255,255,255,0.08)]">
            {/* Avatar Selector */}
            <button
              onClick={() => {
                if (!showAvatarPicker) {
                  soundManager.play('modal-open');
                }
                setShowAvatarPicker(!showAvatarPicker);
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-[20px] bg-[#404040] w-full transition-all active:scale-95"
            >
              <div className="w-8 h-8 rounded-[20px] overflow-hidden">
                <img 
                  src={AVAILABLE_AVATARS.find(a => a.id === selectedAvatarId)?.image || AVAILABLE_AVATARS[0].image} 
                  alt="Selected avatar" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-sm text-[#999] flex-1 text-left">Tap to choose avatar</span>
            </button>
            
            {/* Avatar Picker Modal */}
            {showAvatarPicker && (
              <>
                <div 
                  className="fixed inset-0 bg-black/40 z-[99] animate-fade-in"
                  onClick={() => {
                    soundManager.play('modal-close');
                    setShowAvatarPicker(false);
                  }}
                />
                
                <div className="fixed inset-x-0 bottom-0 z-[100] animate-slide-up">
                  <div className="bg-[#2D2D2D] rounded-t-[32px] shadow-2xl border-t border-[rgba(255,255,255,0.08)]">
                    {/* Drag Handle & Header */}
                    <div className="bg-[#2D2D2D] pt-3 pb-3 z-10 relative">
                      <div className="w-12 h-1.5 bg-[#404040] rounded-full mx-auto mb-4" />
                      
                      <div className="flex items-center justify-between px-5">
                        <div>
                          <h3 className="text-white font-bold">Choose Avatar</h3>
                          <p className="text-[#999] text-sm">Pick your character</p>
                        </div>
                        
                        <button 
                          onClick={() => {
                            soundManager.play('modal-close');
                            setShowAvatarPicker(false);
                          }} 
                          className="w-10 h-10 rounded-full bg-[#404040] hover:bg-[#525252] active:scale-90 transition-all flex items-center justify-center shadow-sm"
                        >
                          <X className="w-5 h-5 text-[#999]" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Avatar Grid - Scrollable with max height */}
                    <div className="overflow-y-auto px-5 pt-2" style={{ maxHeight: '60vh', paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
                      <div className="grid grid-cols-4 gap-3 pb-4">
                        {AVAILABLE_AVATARS.map((avatar) => {
                          const isSelected = selectedAvatarId === avatar.id;
                          return (
                            <button
                              key={avatar.id}
                              onClick={() => {
                                soundManager.play('avatar-select');
                                setSelectedAvatarId(avatar.id);
                                setShowAvatarPicker(false);
                                if (navigator.vibrate) navigator.vibrate(10);
                              }}
                              className={`relative rounded-2xl transition-all duration-200 ${
                                isSelected 
                                  ? 'ring-4 ring-white scale-110 shadow-md' 
                                  : 'hover:ring-2 ring-[#404040] active:scale-90'
                              }`}
                            >
                              <img src={avatar.image} alt={avatar.name} className="w-full h-full object-contain" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {/* Name Input and Add Button */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-[#404040] px-4 py-3 rounded-[20px] text-white outline-none placeholder-[#666] border border-transparent focus:border-white transition-colors"
                placeholder="Enter name..."
                autoFocus={players.length === 0}
              />
              <button
                onClick={addPlayer}
                disabled={!currentInput.trim() || players.length >= MAX_PLAYERS}
                className={`px-4 py-3 rounded-[20px] transition-all flex items-center gap-2 ${
                  currentInput.trim() && players.length < MAX_PLAYERS
                    ? 'bg-white text-[#1A1A1A] active:scale-95'
                    : 'bg-[#525252] text-[#666] cursor-not-allowed'
                }`}
              >
                <Plus className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Bottom CTA Area */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A1A] via-[rgba(26,26,26,0.98)] to-transparent pt-4 pb-8 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Player Count Info */}
            {players.length > 0 && (
              <div className="mb-4 flex items-center justify-center gap-2 text-sm">
                <span className="text-[#999]">{players.length} player{players.length !== 1 ? 's' : ''}</span>
                {players.length >= MAX_PLAYERS && (
                  <span className="text-[#EF4444]">• Max reached</span>
                )}
                {players.length >= 3 && players.length < MAX_PLAYERS && (
                  <span className="text-white">✓ Ready</span>
                )}
                {players.length < 3 && (
                  <span className="text-[#666]">• {3 - players.length} more needed</span>
                )}
              </div>
            )}

            {/* Primary CTA */}
            <button
              onClick={handleStart}
              disabled={players.length < 3}
              className={`w-full py-4 rounded-[20px] transition-all shadow-md ${
                players.length >= 3
                  ? 'bg-white text-[#1A1A1A] active:scale-[0.98]'
                  : 'bg-[#404040] text-[#666] cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-center">
                Continue
              </div>
            </button>

            {/* Bottom Safe Area */}
            <div className="mt-4 w-24 h-1 bg-[#404040] rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

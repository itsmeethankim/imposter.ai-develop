import { Player } from '../App';
import { Trophy, X } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { RippleButton } from './RippleButton';
import { AVAILABLE_AVATARS } from '../utils/avatars';
import imposterIcon from 'figma:asset/88f96b2be2ecf56e846ac1b153054bb388382435.png';
import innocentIcon from 'figma:asset/f1cdee4ec99bf1719ba404833d4625f1bf8cbdeb.png';
import { soundManager } from '../utils/soundManager';
import { useEffect } from 'react';

type ResultsScreenProps = {
  players: Player[];
  onPlayAgain: () => void;
};

export function ResultsScreen({ players, onPlayAgain }: ResultsScreenProps) {
  // Find the player with most votes
  const votedPlayer = players.reduce((prev, current) => 
    current.votes > prev.votes ? current : prev
  );

  // Check if voted player was actually an imposter
  const correctVote = votedPlayer.isImposter;

  // Get all imposters
  const imposters = players.filter(p => p.isImposter);
  const innocents = players.filter(p => !p.isImposter);

  // Determine winners
  const winnersAreInnocents = correctVote;

  // Play win/lose sound on mount
  useEffect(() => {
    if (winnersAreInnocents) {
      soundManager.play('win-sting');
    } else {
      soundManager.play('lose-sting');
    }
  }, [winnersAreInnocents]);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #1A1A1A 0%, #252525 50%, #2D2D2D 100%)'
    }}>
      {/* Minimal elegant particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-08 animate-blob-float"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-06 animate-blob-float-slow"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
            bottom: '15%',
            right: '10%',
            animationDelay: '3s'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 py-12 pb-8">
        {/* Result Banner */}
        <div className={`rounded-3xl p-8 mb-6 text-center ${
          winnersAreInnocents
            ? 'bg-[#2D2D2D] border border-[rgba(255,255,255,0.08)] shadow-lg'
            : 'bg-[#2D2D2D] border border-[rgba(255,255,255,0.08)] shadow-lg'
        }`}>
          <div className="mb-4 animate-fade-in-up flex items-center justify-center">
            {winnersAreInnocents ? (
              <div className="flex flex-col items-center justify-center gap-2">
                {/* Top row - first 3 avatars */}
                <div className="flex items-center justify-center gap-2">
                  {innocents.slice(0, 3).map((player) => (
                    <img 
                      key={player.id}
                      src={AVAILABLE_AVATARS.find(a => a.id === player.avatarId)?.image || AVAILABLE_AVATARS[0].image} 
                      alt={player.name} 
                      className="w-16 h-16 animate-subtle-float"
                    />
                  ))}
                </div>
                {/* Bottom row - next 3 avatars */}
                {innocents.length > 3 && (
                  <div className="flex items-center justify-center gap-2">
                    {innocents.slice(3, 6).map((player) => (
                      <img 
                        key={player.id}
                        src={AVAILABLE_AVATARS.find(a => a.id === player.avatarId)?.image || AVAILABLE_AVATARS[0].image} 
                        alt={player.name} 
                        className="w-16 h-16 animate-subtle-float"
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <img 
                src={AVAILABLE_AVATARS.find(a => a.id === imposters[0]?.avatarId)?.image || imposterIcon} 
                alt="Imposters" 
                className="w-28 h-28 animate-alien-morph"
              />
            )}
          </div>
          <h2 className="text-white text-3xl text-center">
            {winnersAreInnocents ? 'INNOCENTS WIN' : 'IMPOSTERS WIN'}
          </h2>
        </div>

        {/* Voted Player Card */}
        <div className="rounded-2xl p-6 mb-6 bg-[#2D2D2D] border border-[rgba(255,255,255,0.06)] shadow-md">
          <p className="text-center mb-3 text-[#999]">
            Voted Out
          </p>
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center">
              <img 
                src={AVAILABLE_AVATARS.find(a => a.id === votedPlayer.avatarId)?.image || AVAILABLE_AVATARS[0].image} 
                alt={votedPlayer.name} 
                className="w-16 h-16 animate-subtle-float"
              />
            </div>
            <h3 className="text-white text-center">{votedPlayer.name}</h3>
            <p className={`mt-2 text-center ${
              votedPlayer.isImposter ? 'text-[#999]' : 'text-[#999]'
            }`}>
              {votedPlayer.isImposter ? 'Was Imposter' : 'Was Innocent'}
            </p>
          </div>
        </div>

        {/* Winners Section */}
        <div className="rounded-2xl p-6 mb-6 bg-[#2D2D2D] border border-[rgba(255,255,255,0.08)] shadow-md">
          <h3 className="text-center mb-4 text-white">
            Winners
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {(winnersAreInnocents ? innocents : imposters).map((player) => (
              <div
                key={player.id}
                className="p-4 rounded-xl text-center bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)]"
              >
                <div className="mb-2 flex items-center justify-center">
                  <img 
                    src={AVAILABLE_AVATARS.find(a => a.id === player.avatarId)?.image || AVAILABLE_AVATARS[0].image} 
                    alt={player.name} 
                    className="w-10 h-10 animate-subtle-float"
                  />
                </div>
                <div className="text-white text-center">{player.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Losers Section */}
        <div className="rounded-2xl p-6 mb-6 bg-[#2D2D2D] border border-[rgba(255,255,255,0.08)] shadow-md">
          <h3 className="text-center mb-4 text-white">
            {winnersAreInnocents ? 'Imposters' : 'Innocents'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {(winnersAreInnocents ? imposters : innocents).map((player) => (
              <div
                key={player.id}
                className="p-4 rounded-xl text-center bg-[#1A1A1A] border border-[rgba(255,255,255,0.06)]"
              >
                <div className="mb-2 flex items-center justify-center">
                  <img 
                    src={AVAILABLE_AVATARS.find(a => a.id === player.avatarId)?.image || AVAILABLE_AVATARS[0].image} 
                    alt={player.name} 
                    className="w-10 h-10 animate-subtle-float"
                  />
                </div>
                <div className="text-[#999] text-center">{player.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Words Revealed */}
        <div className="rounded-2xl p-6 mb-6 bg-[#2D2D2D] border border-[rgba(255,255,255,0.08)] shadow-md">
          <p className="text-center mb-4 text-[#999]">
            Words Revealed
          </p>
          <div className="grid grid-cols-2 gap-2">
            {players.map((player) => (
              <div
                key={player.id}
                className="p-3 rounded-lg text-center bg-[#1A1A1A]"
              >
                <div className="text-sm mb-1 text-[#666] text-center">
                  {player.name}
                </div>
                <div className="text-center text-white">
                  {player.word || '(No word)'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Rematch Button - Same players, new round */}
          <RippleButton
            onClick={onPlayAgain}
            className="w-full py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md bg-[#404040] text-white border border-[rgba(255,255,255,0.08)] hover:bg-[#4A4A4A]"
            variant="primary"
          >
            Rematch
          </RippleButton>

          {/* New Game Button */}
          <RippleButton
            onClick={onPlayAgain}
            className="w-full py-5 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl bg-[#2D2D2D] text-white border border-[rgba(255,255,255,0.08)] backdrop-blur-sm text-center"
            variant="secondary"
          >
            New Game
          </RippleButton>
        </div>

        {/* Bottom Indicator */}
        <div className="mt-6 w-24 h-1 bg-[#404040] rounded-full mx-auto" />
      </div>
    </div>
  );
}

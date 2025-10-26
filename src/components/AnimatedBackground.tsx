type AnimatedBackgroundProps = {
  variant?: 'minimal' | 'particles' | 'both';
};

export function AnimatedBackground({ variant = 'minimal' }: AnimatedBackgroundProps) {
  return (
    <>
      {/* Minimalistic floating orbs - very subtle */}
      {(variant === 'minimal' || variant === 'both') && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large elegant orbs */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-elegant-float"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0.3) 50%, transparent 100%)',
                top: `${20 + i * 30}%`,
                left: `${10 + i * 35}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${8 + i * 2}s`,
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
              }}
            />
          ))}
          
          {/* Cyan accents */}
          {[...Array(2)].map((_, i) => (
            <div
              key={`cyan-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full animate-elegant-float"
              style={{
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.8) 0%, rgba(6, 182, 212, 0.3) 50%, transparent 100%)',
                top: `${40 + i * 25}%`,
                right: `${15 + i * 30}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${10 + i * 2}s`,
                boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
              }}
            />
          ))}
          
          {/* Pink highlights */}
          {[...Array(2)].map((_, i) => (
            <div
              key={`pink-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full animate-elegant-float"
              style={{
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.8) 0%, rgba(236, 72, 153, 0.3) 50%, transparent 100%)',
                bottom: `${15 + i * 30}%`,
                left: `${20 + i * 40}%`,
                animationDelay: `${i * 1.8}s`,
                animationDuration: `${9 + i * 2}s`,
                boxShadow: '0 0 15px rgba(236, 72, 153, 0.4)'
              }}
            />
          ))}
        </div>
      )}

      {/* Additional particles variant (for screens that need more energy) */}
      {variant === 'particles' || variant === 'both' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Tiny twinkling stars */}
          {[...Array(12)].map((_, i) => {
            const colors = ['rgba(139, 92, 246, 0.6)', 'rgba(6, 182, 212, 0.6)', 'rgba(236, 72, 153, 0.6)'];
            return (
              <div
                key={`star-${i}`}
                className="absolute w-1 h-1 rounded-full animate-twinkle"
                style={{
                  background: colors[i % 3],
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                  boxShadow: `0 0 8px ${colors[i % 3]}`
                }}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

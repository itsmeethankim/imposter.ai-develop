import { useState, MouseEvent, TouchEvent } from 'react';

type RippleButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
};

export function RippleButton({ 
  children, 
  onClick, 
  disabled = false, 
  className = '',
  variant = 'primary'
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const addRipple = (event: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    let x: number, y: number;
    
    if ('touches' in event) {
      x = event.touches[0].clientX - rect.left;
      y = event.touches[0].clientY - rect.top;
    } else {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    }

    const newRipple = {
      x,
      y,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 800);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    addRipple(event);
    if (onClick) {
      onClick();
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLButtonElement>) => {
    addRipple(event);
  };

  return (
    <button
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      disabled={disabled}
      className={`relative overflow-hidden text-center ${className}`}
    >
      {children}
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none animate-ripple-expand"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <span className={`absolute inset-0 rounded-full ${
            variant === 'primary' 
              ? 'bg-white/40' 
              : variant === 'secondary'
              ? 'bg-purple-400/40'
              : 'bg-current/20'
          }`} />
        </span>
      ))}
      
      {/* Glow effect on hover */}
      <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className={`absolute inset-0 blur-xl ${
          variant === 'primary'
            ? 'bg-white/5'
            : 'bg-white/10'
        }`} />
      </span>
    </button>
  );
}

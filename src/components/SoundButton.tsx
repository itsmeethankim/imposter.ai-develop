import { ButtonHTMLAttributes, ReactNode } from 'react';
import { soundManager, SoundName } from '../utils/soundManager';

interface SoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  sound?: SoundName;
  playOnClick?: boolean;
}

/**
 * Button component that plays a sound effect when clicked
 * Wraps standard button functionality with audio feedback
 */
export function SoundButton({ 
  children, 
  sound = 'tap',
  playOnClick = true,
  onClick,
  ...props 
}: SoundButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (playOnClick && !props.disabled) {
      soundManager.play(sound);
    }
    onClick?.(e);
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}

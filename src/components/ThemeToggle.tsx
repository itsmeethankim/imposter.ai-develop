import { Moon, Sun } from 'lucide-react';
import { GameTheme } from '../App';

type ThemeToggleProps = {
  theme: GameTheme;
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`p-3 rounded-full transition-all duration-300 ${
        theme === 'fun'
          ? 'bg-white shadow-lg hover:shadow-xl hover:scale-110'
          : 'bg-gray-800 shadow-xl hover:shadow-2xl hover:scale-110 border border-purple-500'
      }`}
    >
      {theme === 'fun' ? (
        <Moon className="w-6 h-6 text-purple-600" />
      ) : (
        <Sun className="w-6 h-6 text-yellow-400" />
      )}
    </button>
  );
}
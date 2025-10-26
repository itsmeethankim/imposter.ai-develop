import { Info } from 'lucide-react';

type InfoButtonProps = {
  onClick: () => void;
};

export function InfoButton({ onClick }: InfoButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-9 right-6 z-40 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all flex items-center justify-center active:scale-95"
      aria-label="Show tutorial"
    >
      <Info className="w-5 h-5" strokeWidth={2} />
    </button>
  );
}

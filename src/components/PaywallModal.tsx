import { useState, useRef, useCallback } from 'react';
import { Check, X } from 'lucide-react';
import unlockIcon from 'figma:asset/d08a7c5d13e7f02feed925936d02e7a332327ac5.png';

type PaywallModalProps = {
  onSubscribe: () => void;
  onClose: () => void;
  onRestore: () => void;
  isProcessing?: boolean;
  errorMessage?: string | null;
};

export function PaywallModal({
  onSubscribe,
  onClose,
  onRestore,
  isProcessing = false,
  errorMessage,
}: PaywallModalProps) {
  const [translateY, setTranslateY] = useState(0);
  const startY = useRef(0);
  const currentY = useRef(0);
  const openLegalDocument = useCallback(
    (type: "terms" | "privacy") => {
      const path =
        type === "terms" ? "/legal/terms.html" : "/legal/privacy.html";
      try {
        const url = new URL(path, window.location.origin).toString();
        const newWindow = window.open(
          url,
          "_blank",
          "noopener,noreferrer",
        );
        if (!newWindow) {
          window.location.href = path;
        }
      } catch (error) {
        console.error("Failed to open legal document:", error);
        window.location.href = path;
      }
    },
    [],
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;
    
    // Only allow downward swipe from top portion
    if (diff > 0 && startY.current < 100) {
      setTranslateY(diff);
    }
  };

  const handleTouchEnd = () => {
    // If swiped down more than 150px, close
    if (translateY > 150) {
      onClose();
    } else {
      setTranslateY(0);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 transition-transform duration-300"
      style={{ 
        transform: `translateY(${translateY}px)`,
        background: 'linear-gradient(135deg, #1A1A1A 0%, #252525 50%, #2D2D2D 100%)'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Minimal elegant background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle grey orbs */}
        <div 
          className="absolute w-96 h-96 rounded-full blur-[120px] opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
            top: '10%',
            right: '-10%',
            animation: 'blob-float 25s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-96 h-96 rounded-full blur-[120px] opacity-08"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
            bottom: '10%',
            left: '-10%',
            animation: 'blob-float-delayed 30s ease-in-out infinite 3s'
          }}
        />
        
        {/* Minimal grid pattern */}
        <div className="absolute inset-0 opacity-03" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Swipe Indicator */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full z-50" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/15 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="Close paywall"
      >
        <X className="w-6 h-6 text-white" strokeWidth={2} />
      </button>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 py-12 pb-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={unlockIcon} 
              alt="Unlock" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <h1 className="text-white text-3xl mb-3">
            Unlock Full Access
          </h1>
          <p className="text-white/70">
            Get premium categories & unlimited custom words
          </p>
        </div>

        {/* Features Card */}
        <div className="bg-[#2D2D2D] rounded-3xl p-6 mb-6 shadow-2xl max-w-md mx-auto w-full border border-white/10">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 border border-white/30">
                <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-white mb-1">
                  Custom Categories
                </h3>
                <p className="text-white/60 text-sm">
                  Create your own word lists for any topic
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 border border-white/30">
                <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-white mb-1">
                  5 Premium Categories
                </h3>
                <p className="text-white/60 text-sm">
                  Hollywood, Music Artists, Songs, Video Games & More
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 border border-white/30">
                <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-white mb-1">
                  1000+ Total Words
                </h3>
                <p className="text-white/60 text-sm">
                  Endless variety for every game night
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Pricing */}
        <div className="text-center mb-6">
          <div className="inline-block bg-[#2D2D2D] backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/15 shadow-xl">
            <p className="text-white/50 text-sm line-through mb-1">$9.99/month</p>
            <p className="text-white text-3xl">
              $4.99<span className="text-lg text-white/70">/month</span>
            </p>
            <p className="text-white/80 text-sm mt-1">50% Launch Discount</p>
          </div>
        </div>

        {/* Subscribe Button */}
        <button
          onClick={onSubscribe}
          disabled={isProcessing}
          className={`w-full max-w-md mx-auto py-5 rounded-full text-[#1A1A1A] transition-all duration-300 transform shadow-2xl mb-4 text-center ${
            isProcessing
              ? 'bg-white/60 cursor-not-allowed'
              : 'bg-white hover:scale-105 active:scale-95 hover:bg-white/90'
          }`}
        >
          {isProcessing ? 'Processing...' : 'Start Premium'}
        </button>
        <button
          onClick={onRestore}
          disabled={isProcessing}
          className="w-full max-w-md mx-auto py-4 rounded-full border border-white/20 text-white/90 transition-all duration-300 hover:text-white hover:border-white/40 disabled:opacity-60 disabled:cursor-not-allowed mb-6"
        >
          Restore Purchases
        </button>
        {errorMessage && (
          <div className="text-center text-[#FCA5A5] text-sm mb-6">
            {errorMessage}
          </div>
        )}

        {/* Footer Links - Centered */}
        <div className="flex items-center justify-center gap-8 text-white/60 text-sm flex-wrap mb-8">
          <button
            className="hover:text-white transition-colors px-2"
            onClick={() => openLegalDocument("terms")}
            type="button"
          >
            Terms
          </button>
          <button
            className="hover:text-white transition-colors px-2"
            onClick={() => openLegalDocument("privacy")}
            type="button"
          >
            Privacy
          </button>
          <button onClick={onClose} className="hover:text-white transition-colors px-2">
            Not Now
          </button>
        </div>

        {/* Bottom Indicator */}
        <div className="w-32 h-1.5 bg-white/20 rounded-full mx-auto" />
      </div>
    </div>
  );
}

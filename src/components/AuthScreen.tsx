import { useState } from 'react';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

type AuthScreenProps = {
  onAuthSuccess: (userId: string, accessToken: string) => void;
  onSkip?: () => void;
};

type AuthMode = 'login' | 'signup';

export function AuthScreen({ onAuthSuccess, onSkip }: AuthScreenProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { createClient } = await import('../utils/supabase');
      const supabase = createClient();

      if (mode === 'signup') {
        // Sign up through backend for proper user creation
        const { projectId, publicAnonKey } = await import('../utils/supabase/info');
        
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-be273801/signup`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`
            },
            body: JSON.stringify({ email, password, name })
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create account');
        }

        // Now sign in with the new account
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) throw signInError;
        if (!signInData.session) throw new Error('No session created');

        soundManager.play('confirm');
        onAuthSuccess(signInData.user.id, signInData.session.access_token);
      } else {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          // Provide helpful error messages
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password. Please check your credentials and try again.');
          } else if (error.message.includes('Email not confirmed')) {
            throw new Error('Please confirm your email address before signing in.');
          } else {
            throw error;
          }
        }
        
        if (!data.session) throw new Error('No session created');

        soundManager.play('confirm');
        onAuthSuccess(data.user.id, data.session.access_token);
      }
    } catch (err) {
      console.error('Auth error:', err);
      let errorMessage = 'Authentication failed';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      soundManager.play('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #252525 50%, #2D2D2D 100%)'
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
            top: '-10%',
            right: '-15%',
            animation: 'blob-float 25s ease-in-out infinite'
          }}
        />
      </div>

      {/* Auth Card */}
      <div className="relative max-w-md w-full">
        <div className="bg-[#2D2D2D] backdrop-blur-xl rounded-[24px] p-8 border border-[rgba(255,255,255,0.08)] shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🕵️</div>
            <h2 className="text-white mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-[#999]">
              {mode === 'login' 
                ? 'Sign in to continue playing' 
                : 'Sign up to unlock premium features'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-[16px]">
              <p className="text-[#EF4444] text-sm text-center">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-white mb-2 text-sm">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1A1A1A] text-white pl-12 pr-4 py-3 rounded-[16px] border border-[rgba(255,255,255,0.08)] focus:border-white focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-white mb-2 text-sm">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1A1A1A] text-white pl-12 pr-4 py-3 rounded-[16px] border border-[rgba(255,255,255,0.08)] focus:border-white focus:outline-none transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1A1A1A] text-white pl-12 pr-4 py-3 rounded-[16px] border border-[rgba(255,255,255,0.08)] focus:border-white focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              {mode === 'signup' && (
                <p className="text-[#666] text-xs mt-1">
                  Minimum 6 characters
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-white text-[#1A1A1A] rounded-[16px] transition-all hover:bg-[#E5E5E5] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setError('');
                setEmail('');
                setPassword('');
                setName('');
              }}
              className="text-[#999] hover:text-white transition-colors text-sm"
            >
              {mode === 'login' ? (
                <>Don't have an account? <span className="text-white">Sign up</span></>
              ) : (
                <>Already have an account? <span className="text-white">Sign in</span></>
              )}
            </button>
          </div>

          {/* Skip Option (for development/testing) */}
          {onSkip && (
            <div className="mt-4 text-center">
              <button
                onClick={onSkip}
                className="text-[#666] text-sm hover:text-[#999] transition-colors"
              >
                Continue as guest
              </button>
            </div>
          )}
        </div>

        {/* Info Text */}
        <div className="mt-6 text-center">
          <p className="text-[#666] text-sm">
            🔒 Your data is encrypted and secure
          </p>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#404040] rounded-full" />
    </div>
  );
}

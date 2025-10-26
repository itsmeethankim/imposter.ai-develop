import { useState, useEffect } from 'react';
import { Heart, Sparkles, TrendingUp, Clock, User, Globe, Lock as LockIcon, X } from 'lucide-react';
import { Category } from '../App';
import { 
  fetchCommunityCategories, 
  toggleLike, 
  CommunityCategory,
  getUsername,
  setUsername 
} from '../utils/supabase';
import { CategoryIcon } from './CategoryIcon';
import { CategoryBackground } from './CategoryBackground';
import { RippleButton } from './RippleButton';

type CommunityCategoriesProps = {
  onSelect: (category: Category) => void;
  onClose: () => void;
};

export function CommunityCategories({ onSelect, onClose }: CommunityCategoriesProps) {
  const [categories, setCategories] = useState<CommunityCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'likes' | 'recent'>('likes');
  const [username, setUsernameState] = useState(getUsername());
  const [editingUsername, setEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
  const [databaseNotSetup, setDatabaseNotSetup] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    const data = await fetchCommunityCategories();
    
    // Check if we got an empty array - could mean tables don't exist
    if (data.length === 0) {
      // Try to detect if it's a setup issue by checking console
      const consoleLogs = console.log.toString();
      setDatabaseNotSetup(true);
    }
    
    setCategories(data);
    setLoading(false);
  };

  const handleLike = async (categoryId: string, currentlyLiked: boolean) => {
    // Optimistic update
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { 
            ...cat, 
            likes_count: currentlyLiked ? cat.likes_count - 1 : cat.likes_count + 1,
            user_has_liked: !currentlyLiked 
          }
        : cat
    ));

    const result = await toggleLike(categoryId, currentlyLiked);
    
    if (!result.success) {
      // Revert on error
      setCategories(prev => prev.map(cat => 
        cat.id === categoryId 
          ? { 
              ...cat, 
              likes_count: currentlyLiked ? cat.likes_count + 1 : cat.likes_count - 1,
              user_has_liked: currentlyLiked 
            }
          : cat
      ));
    }
  };

  const handleSelectCategory = (communityCategory: CommunityCategory) => {
    // Convert community category to app category format
    const category: Category = {
      id: `community-${communityCategory.id}`,
      name: communityCategory.name,
      words: communityCategory.words,
      isCustom: true,
      description: `by ${communityCategory.creator_name || 'Anonymous'} • ${communityCategory.words.length} words`
    };
    onSelect(category);
  };

  const saveUsername = () => {
    if (tempUsername.trim()) {
      setUsername(tempUsername.trim());
      setUsernameState(tempUsername.trim());
      setEditingUsername(false);
    }
  };

  const sortedCategories = [...categories].sort((a, b) => {
    if (sortBy === 'likes') {
      return b.likes_count - a.likes_count;
    } else {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #4c1d95 50%, #5b21b6 75%, #6d28d9 100%)'
    }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-blob-float"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            top: '5%',
            right: '-10%'
          }}
        />
        <div 
          className="absolute w-[28rem] h-[28rem] rounded-full blur-3xl opacity-15 animate-blob-float-delayed"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, transparent 70%)',
            bottom: '10%',
            left: '-10%',
            animationDelay: '3s'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-cyan-400" />
              <h2 className="text-white text-2xl">Community Library</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-white/60 text-sm">
            Discover categories created by players worldwide
          </p>
        </div>

        {/* Username section */}
        <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-400" />
              {editingUsername ? (
                <input
                  type="text"
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  onBlur={saveUsername}
                  onKeyPress={(e) => e.key === 'Enter' && saveUsername()}
                  className="bg-gray-900 border border-purple-500 rounded-lg px-3 py-1 text-white text-sm focus:outline-none"
                  autoFocus
                />
              ) : (
                <span className="text-white/80 text-sm">Playing as: <span className="text-white">{username}</span></span>
              )}
            </div>
            {!editingUsername && (
              <button
                onClick={() => {
                  setEditingUsername(true);
                  setTempUsername(username);
                }}
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                Change
              </button>
            )}
          </div>
        </div>

        {/* Sort toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSortBy('likes')}
            className={`flex-1 py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
              sortBy === 'likes'
                ? 'bg-[#1A1A1A] text-white border border-[rgba(255,255,255,0.2)]'
                : 'bg-[#2D2D2D]/50 text-[#999] border border-[rgba(255,255,255,0.1)]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Most Liked
          </button>
          <button
            onClick={() => setSortBy('recent')}
            className={`flex-1 py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
              sortBy === 'recent'
                ? 'bg-[#1A1A1A] text-white border border-[rgba(255,255,255,0.2)]'
                : 'bg-[#2D2D2D]/50 text-[#999] border border-[rgba(255,255,255,0.1)]'
            }`}
          >
            <Clock className="w-4 h-4" />
            Recent
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#1A1A1A] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/60">Loading categories...</p>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && sortedCategories.length === 0 && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center py-12 px-6">
              <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-white/80 mb-2">No community categories yet</p>
              <p className="text-white/50 text-sm mb-6">Be the first to publish a category!</p>
              
              {/* Setup Instructions */}
              <div className="mt-8 p-6 rounded-xl bg-cyan-900/30 border border-cyan-500/40 text-left max-w-md mx-auto">
                <h3 className="text-cyan-300 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Database Setup Required
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  To use community features, you need to set up the Supabase database tables.
                </p>
                <ol className="text-white/60 text-sm space-y-2 list-decimal list-inside">
                  <li>Open your Supabase project dashboard</li>
                  <li>Go to SQL Editor</li>
                  <li>Run the schema from <code className="text-cyan-300 bg-black/30 px-1 rounded">supabase-schema.sql</code></li>
                  <li>Refresh this page</li>
                </ol>
                <p className="text-white/50 text-xs mt-4">
                  See <span className="text-cyan-300">SUPABASE_SETUP.md</span> for detailed instructions
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Categories list */}
        {!loading && sortedCategories.length > 0 && (
          <div className="space-y-4 pb-8">
            {sortedCategories.map((category) => (
              <div
                key={category.id}
                className="relative w-full overflow-hidden rounded-3xl p-5 text-left transition-all duration-300 shadow-lg border bg-gradient-to-br from-cyan-900/30 via-purple-900/40 to-pink-900/30 backdrop-blur-sm border-cyan-500/30 hover:border-pink-400/40 hover:scale-102"
              >
                <CategoryBackground category={{ id: category.id, name: category.name, words: category.words }} />
                
                <div className="relative z-10 flex items-start gap-4">
                  {/* Category icon */}
                  <div className="flex-shrink-0 pt-1">
                    <CategoryIcon 
                      category={{ id: category.id, name: category.name, words: category.words }} 
                      size="md" 
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <RippleButton
                      onClick={() => handleSelectCategory(category)}
                      className="w-full text-left mb-3"
                      variant="secondary"
                    >
                      <h3 className="text-white text-lg mb-1">{category.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-cyan-200/70 mb-2">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {category.creator_name || 'Anonymous'}
                        </span>
                        <span>•</span>
                        <span>{category.words.length} words</span>
                        {!category.is_public && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <LockIcon className="w-3 h-3" />
                              Private
                            </span>
                          </>
                        )}
                      </div>
                    </RippleButton>

                    {/* Like button */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(category.id, category.user_has_liked || false);
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                          category.user_has_liked
                            ? 'bg-pink-600 text-white border border-pink-400'
                            : 'bg-white/10 text-white/80 border border-white/20 hover:bg-white/20'
                        }`}
                      >
                        <Heart 
                          className={`w-4 h-4 ${category.user_has_liked ? 'fill-current' : ''}`}
                        />
                        <span className="text-sm">{category.likes_count}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom indicator */}
        <div className="mt-6 w-32 h-1.5 bg-white/30 rounded-full mx-auto" />
      </div>
    </div>
  );
}
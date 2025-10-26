import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Trash2, Lock, Sparkles, FileText, Edit2, AlertCircle } from 'lucide-react';
import { Category, SubscriptionStatus } from '../App';
import { BUILT_IN_CATEGORIES, PREMIUM_CATEGORIES, DEFAULT_CUSTOM_CATEGORIES } from '../data/categories';
import { AnimatedBackground } from './AnimatedBackground';
import { CategoryIcon } from './CategoryIcon';
import { RippleButton } from './RippleButton';
import { CategoryBackground } from './CategoryBackground';
import { CategoryTutorial } from './CategoryTutorial';
import { generateWordsWithOpenAI } from '../utils/openai';
import { hasAIGenerationsRemaining, incrementAIGeneration, getRemainingGenerations, getAILimitMessage } from '../utils/aiLimits';

type CategorySelectorProps = {
  onSelect: (category: Category) => void;
  onBack: () => void;
  subscriptionStatus: SubscriptionStatus;
  accessToken?: string;
  showTutorial?: boolean;
  onTutorialComplete?: () => void;
  onLockedCategoryClick?: () => void;
};

export function CategorySelector({
  onSelect,
  onBack,
  subscriptionStatus,
  accessToken,
  showTutorial = false,
  onTutorialComplete,
  onLockedCategoryClick,
}: CategorySelectorProps) {
  const [customCategories, setCustomCategories] = useState<Category[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryWords, setNewCategoryWords] = useState('');
  const [creationMode, setCreationMode] = useState<'manual' | 'ai'>('manual');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTutorialState, setShowTutorialState] = useState(showTutorial);
  const [aiGenerationsRemaining, setAiGenerationsRemaining] = useState(getRemainingGenerations());

  // Determine if premium/custom categories should be locked
  const arePremiumCategoriesLocked = subscriptionStatus === 'free';

  // Load custom categories from localStorage or use defaults
  useEffect(() => {
    const saved = localStorage.getItem('customCategories');
    if (saved) {
      try {
        const loadedCategories = JSON.parse(saved);
        // Migration: Remove emojis from category names
        const migratedCategories = loadedCategories.map((cat: Category) => ({
          ...cat,
          name: cat.name.replace(/^[\u{1F000}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]\s*/u, '')
        }));
        setCustomCategories(migratedCategories);
        localStorage.setItem('customCategories', JSON.stringify(migratedCategories));
      } catch (e) {
        console.error('Failed to load custom categories:', e);
        // Use default custom categories if loading fails
        setCustomCategories(DEFAULT_CUSTOM_CATEGORIES);
        localStorage.setItem('customCategories', JSON.stringify(DEFAULT_CUSTOM_CATEGORIES));
      }
    } else {
      // First time user - set default custom categories
      setCustomCategories(DEFAULT_CUSTOM_CATEGORIES);
      localStorage.setItem('customCategories', JSON.stringify(DEFAULT_CUSTOM_CATEGORIES));
    }
  }, []);

  const saveCustomCategories = (categories: Category[]) => {
    setCustomCategories(categories);
    localStorage.setItem('customCategories', JSON.stringify(categories));
  };

  const generateWordsWithAI = async () => {
    if (!newCategoryName.trim()) {
      return;
    }

    // Check if user has remaining generations
    if (!hasAIGenerationsRemaining()) {
      alert('Daily AI generation limit reached (50/day). Try again tomorrow or use Manual Input!');
      return;
    }

    if (!accessToken) {
      alert('Secure session not ready yet. Please wait a moment and try again.');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Call OpenAI API to generate words
      const result = await generateWordsWithOpenAI({
        categoryName: newCategoryName.trim(),
        numberOfWords: 50,
        accessToken,
      });

      if (result.success && result.words.length > 0) {
        // Increment the generation count
        incrementAIGeneration();
        setAiGenerationsRemaining(getRemainingGenerations());
        
        // Set the generated words
        setNewCategoryWords(result.words.join('\n'));
      } else {
        // Fallback to sample generation if API fails
        // Don't log errors that are already handled in the openai.ts utility
        const skipLogging = 
          result.error === 'OpenAI API key not configured' ||
          result.error?.includes('exceeded your current quota') ||
          result.error?.includes('invalid') ||
          result.error?.includes('Incorrect API key');
          
        if (!skipLogging && result.error) {
          console.warn('OpenAI generation failed, using fallback:', result.error);
        }
        await generateFallbackWords();
      }
    } catch (error) {
      // Fallback to sample generation
      await generateFallbackWords();
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFallbackWords = async () => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate sample words based on category name
    const categoryLower = newCategoryName.toLowerCase();
    let generatedWords: string[] = [];
    
    if (categoryLower.includes('pokemon') || categoryLower.includes('pokémon')) {
      generatedWords = [
        'Pikachu', 'Charizard', 'Mewtwo', 'Bulbasaur', 'Squirtle', 'Eevee', 'Snorlax', 'Dragonite',
        'Gengar', 'Alakazam', 'Machamp', 'Gyarados', 'Lapras', 'Articuno', 'Zapdos', 'Moltres',
        'Mew', 'Blastoise', 'Venusaur', 'Raichu', 'Jigglypuff', 'Meowth', 'Psyduck', 'Growlithe',
        'Arcanine', 'Poliwag', 'Abra', 'Kadabra', 'Machop', 'Geodude', 'Golem', 'Onix',
        'Cubone', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Chansey', 'Tangela', 'Mr. Mime', 'Scyther',
        'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Ditto', 'Vaporeon',
        'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Kabuto', 'Aerodactyl', 'Dratini', 'Dragonair'
      ];
    } else if (categoryLower.includes('country') || categoryLower.includes('countries')) {
      generatedWords = [
        'United States', 'China', 'Japan', 'Germany', 'United Kingdom', 'France', 'India', 'Italy',
        'Brazil', 'Canada', 'Russia', 'South Korea', 'Australia', 'Spain', 'Mexico', 'Indonesia',
        'Netherlands', 'Saudi Arabia', 'Turkey', 'Switzerland', 'Poland', 'Belgium', 'Sweden', 'Argentina',
        'Thailand', 'Austria', 'Norway', 'United Arab Emirates', 'Nigeria', 'Israel', 'Ireland', 'Singapore',
        'Denmark', 'South Africa', 'Malaysia', 'Colombia', 'Philippines', 'Pakistan', 'Chile', 'Finland',
        'Vietnam', 'Czech Republic', 'Romania', 'Portugal', 'Peru', 'Greece', 'New Zealand', 'Qatar',
        'Hungary', 'Kuwait', 'Ukraine', 'Morocco', 'Ecuador', 'Slovakia', 'Ethiopia', 'Kenya'
      ];
    } else if (categoryLower.includes('city') || categoryLower.includes('cities')) {
      generatedWords = [
        'New York', 'London', 'Paris', 'Tokyo', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
        'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth',
        'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Boston', 'Nashville',
        'Berlin', 'Madrid', 'Rome', 'Barcelona', 'Vienna', 'Amsterdam', 'Brussels', 'Stockholm',
        'Dubai', 'Singapore', 'Hong Kong', 'Shanghai', 'Beijing', 'Seoul', 'Bangkok', 'Mumbai',
        'Sydney', 'Melbourne', 'Toronto', 'Montreal', 'Vancouver', 'Mexico City', 'São Paulo', 'Buenos Aires',
        'Cairo', 'Istanbul', 'Moscow', 'Athens', 'Prague', 'Budapest', 'Warsaw', 'Lisbon'
      ];
    } else if (categoryLower.includes('car') || categoryLower.includes('vehicle')) {
      generatedWords = [
        'Tesla Model 3', 'Toyota Camry', 'Honda Civic', 'Ford F-150', 'Chevrolet Silverado', 'Ram 1500', 'Honda CR-V', 'Toyota RAV4',
        'Nissan Rogue', 'Jeep Grand Cherokee', 'Honda Accord', 'Toyota Corolla', 'GMC Sierra', 'Chevrolet Equinox', 'Ford Explorer', 'Jeep Wrangler',
        'BMW 3 Series', 'Mercedes C-Class', 'Audi A4', 'Lexus RX', 'Mazda CX-5', 'Hyundai Tucson', 'Kia Sportage', 'Subaru Outback',
        'Porsche 911', 'Ferrari 488', 'Lamborghini Huracan', 'McLaren 720S', 'Corvette', 'Mustang', 'Challenger', 'Camaro',
        'Range Rover', 'Land Cruiser', 'Bronco', 'Tahoe', 'Suburban', 'Expedition', 'Yukon', 'Escalade',
        'Model S', 'Model X', 'Model Y', 'Cybertruck', 'Rivian R1T', 'Lucid Air', 'Taycan', 'e-tron'
      ];
    } else {
      // Generic generation based on common patterns
      generatedWords = [
        `${newCategoryName} Item 1`, `${newCategoryName} Item 2`, `${newCategoryName} Item 3`,
        `${newCategoryName} Item 4`, `${newCategoryName} Item 5`, `${newCategoryName} Item 6`,
        `${newCategoryName} Item 7`, `${newCategoryName} Item 8`, `${newCategoryName} Item 9`,
        `${newCategoryName} Item 10`, `${newCategoryName} Item 11`, `${newCategoryName} Item 12`,
        `${newCategoryName} Item 13`, `${newCategoryName} Item 14`, `${newCategoryName} Item 15`,
        `Popular ${newCategoryName}`, `Classic ${newCategoryName}`, `Modern ${newCategoryName}`,
        `Rare ${newCategoryName}`, `Common ${newCategoryName}`, `Best ${newCategoryName}`
      ];
    }
    
    setNewCategoryWords(generatedWords.join('\n'));
    setIsGenerating(false);
  };

  const createCategory = () => {
    if (!newCategoryName.trim() || !newCategoryWords.trim()) {
      return;
    }

    const words = newCategoryWords
      .split('\n')
      .map(w => w.trim())
      .filter(w => w.length > 0);

    if (words.length === 0) {
      return;
    }

    if (editingCategoryId) {
      // Update existing category
      const updatedCategories = customCategories.map(cat => 
        cat.id === editingCategoryId
          ? { ...cat, name: newCategoryName.trim(), words }
          : cat
      );
      saveCustomCategories(updatedCategories);
      setEditingCategoryId(null);
    } else {
      // Create new category
      const newCategory: Category = {
        id: `custom-${Date.now()}`,
        name: newCategoryName.trim(),
        words,
        isCustom: true
      };
      saveCustomCategories([...customCategories, newCategory]);
    }

    setIsCreating(false);
    setNewCategoryName('');
    setNewCategoryWords('');
    setCreationMode('manual');
  };

  const deleteCategory = (id: string) => {
    // Don't allow deleting example categories
    if (id.includes('example')) return;
    saveCustomCategories(customCategories.filter(c => c.id !== id));
  };

  const startEditingCategory = (category: Category) => {
    setEditingCategoryId(category.id);
    setNewCategoryName(category.name.replace(/^[^\s]*\s/, '')); // Remove emoji if present
    setNewCategoryWords(category.words.join('\n'));
    setCreationMode('manual');
    setIsCreating(true);
  };

  const duplicateAndEditCategory = (category: Category) => {
    // Create a copy of the category for editing
    // Don't set editingCategoryId so it creates a new category instead of editing existing
    setEditingCategoryId(null);
    setNewCategoryName(category.name);
    setNewCategoryWords(category.words.join('\n'));
    setCreationMode('manual');
    setIsCreating(true);
    // Scroll to the top to show the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setIsCreating(false);
    setEditingCategoryId(null);
    setNewCategoryName('');
    setNewCategoryWords('');
    setCreationMode('manual');
  };

  const handleCategoryClick = (category: Category) => {
    if (category.isPremium && arePremiumCategoriesLocked) {
      // Trigger paywall when clicking locked premium category
      if (onLockedCategoryClick) {
        onLockedCategoryClick();
      }
      return;
    }
    onSelect(category);
  };

  const handleCustomCategoryClick = (category: Category) => {
    if (arePremiumCategoriesLocked) {
      // Trigger paywall when clicking locked custom category
      if (onLockedCategoryClick) {
        onLockedCategoryClick();
      }
      return;
    }
    onSelect(category);
  };

  const handleTutorialComplete = () => {
    setShowTutorialState(false);
    if (onTutorialComplete) {
      onTutorialComplete();
    }
  };



  return (
    <div className="h-screen relative overflow-y-auto scrollbar-hide" style={{
      background: 'linear-gradient(135deg, #1A1A1A 0%, #252525 50%, #2D2D2D 100%)',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
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

        {/* Minimal sparkle particles */}
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
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col px-6 py-3 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-6">
          <button
            onClick={onBack}
            className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all flex items-center justify-center active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2} />
          </button>
          <h2 className="text-white text-2xl flex-1 text-center">
            Choose a Category
          </h2>
          <div className="w-11" />
        </div>

        {/* Custom Categories - Featured Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white/60 text-sm uppercase tracking-wider">
                Custom Categories
              </h3>
            </div>
            <div className="flex items-center gap-3">
              {arePremiumCategoriesLocked && (
                <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Premium
                </span>
              )}
              {!isCreating && (
                <button
                  onClick={() => setIsCreating(true)}
                  className="px-5 py-2.5 rounded-xl bg-transparent text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/5 transition-all text-sm flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create
                </button>
              )}
            </div>
          </div>

          {/* Create Category Form */}
          {isCreating && (
            <div className="p-6 rounded-xl mb-4 bg-[#2D2D2D] border-2 border-[rgba(255,255,255,0.15)]">
              {/* Premium Lock Warning */}
              {arePremiumCategoriesLocked && !editingCategoryId && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4 flex-shrink-0" />
                  <span>You can create this category, but you'll need Premium to play it.</span>
                </div>
              )}
              {/* Edit Mode Indicator */}
              {editingCategoryId && (
                <div className="mb-3 px-3 py-2 rounded-lg bg-[#404040] border border-[rgba(255,255,255,0.15)] text-white text-sm flex items-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Editing category
                </div>
              )}

              {/* Creation Mode Toggle */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setCreationMode('manual')}
                  className={`flex-1 py-3 px-5 rounded-xl transition-all duration-200 flex items-center justify-center border-2 whitespace-nowrap ${
                    creationMode === 'manual'
                      ? 'bg-white text-[#1A1A1A] border-white shadow-lg'
                      : 'bg-transparent text-white border-white/30 hover:border-white/50'
                  }`}
                >
                  Manual Input
                </button>
                <button
                  onClick={() => setCreationMode('ai')}
                  className={`flex-1 py-3 px-5 rounded-xl transition-all duration-200 flex items-center justify-center border-2 whitespace-nowrap ${
                    creationMode === 'ai'
                      ? 'bg-white text-[#1A1A1A] border-white shadow-lg'
                      : 'bg-transparent text-white border-white/30 hover:border-white/50'
                  }`}
                >
                  AI Generate
                </button>
              </div>

              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category Name (e.g., Pokémon, Countries, Cars)"
                className="w-full px-4 py-3 rounded-xl mb-4 border-2 transition-all duration-200 focus:outline-none bg-[#1A1A1A] border-[rgba(255,255,255,0.08)] focus:border-[rgba(255,255,255,0.2)] text-white"
              />

              {creationMode === 'ai' && (
                <>
                  <button
                    onClick={generateWordsWithAI}
                    disabled={isGenerating || !newCategoryName.trim() || !hasAIGenerationsRemaining()}
                    className={`w-full mb-2 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                      isGenerating || !newCategoryName.trim() || !hasAIGenerationsRemaining()
                        ? 'bg-[#404040] text-[#666] cursor-not-allowed'
                        : 'bg-white text-[#1A1A1A] hover:shadow-xl border border-white/20'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Word Bank with AI
                      </>
                    )}
                  </button>
                  
                  {/* AI Generation Limit Counter */}
                  <div className={`text-center text-sm mb-4 px-3 py-2 rounded-lg ${
                    aiGenerationsRemaining === 0 
                      ? 'bg-red-500/10 border border-red-500/30 text-red-300' 
                      : aiGenerationsRemaining <= 5 
                        ? 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-300'
                        : 'bg-white/5 border border-white/10 text-white/60'
                  }`}>
                    {aiGenerationsRemaining === 0 ? (
                      <span className="flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Daily limit reached (50/day) - Try again tomorrow!
                      </span>
                    ) : (
                      <span>{aiGenerationsRemaining} AI generation{aiGenerationsRemaining === 1 ? '' : 's'} remaining today</span>
                    )}
                  </div>
                </>
              )}

              <textarea
                value={newCategoryWords}
                onChange={(e) => setNewCategoryWords(e.target.value)}
                placeholder={creationMode === 'ai' ? 'AI will generate words here...' : 'Enter words (one per line)\nPikachu\nCharizard\nMewtwo\n...'}
                rows={8}
                readOnly={creationMode === 'ai' && !newCategoryWords}
                className="w-full px-4 py-3 rounded-xl mb-4 border-2 transition-all duration-200 focus:outline-none resize-none bg-[#1A1A1A] border-[rgba(255,255,255,0.08)] focus:border-[rgba(255,255,255,0.2)] text-white"
              />

              <div className="flex gap-2">
                <button
                  onClick={createCategory}
                  disabled={!newCategoryName.trim() || !newCategoryWords.trim()}
                  className={`flex-1 py-3 rounded-xl transition-all duration-200 flex items-center justify-center ${
                    !newCategoryName.trim() || !newCategoryWords.trim()
                      ? 'bg-[#404040] text-[#666] cursor-not-allowed'
                      : 'bg-white text-[#1A1A1A] shadow-lg border border-white/20 hover:scale-105'
                  }`}
                >
                  {editingCategoryId ? 'Update Category' : 'Save Category'}
                </button>
                <button
                  onClick={cancelEditing}
                  className="px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105 bg-[#404040] text-white hover:bg-[#4A4A4A] border border-[rgba(255,255,255,0.1)] flex items-center justify-center"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Custom Category List */}
          {customCategories.length === 0 && !isCreating && (
            <div className="text-center py-12 px-6 bg-gray-900/40 rounded-3xl border-2 border-dashed border-white/20">
              <div className="text-5xl mb-4">✨</div>
              <p className="text-white/80 mb-2">
                {arePremiumCategoriesLocked
                  ? 'Custom categories require Premium to play'
                  : 'No custom categories yet'
                }
              </p>
              <p className="text-white/50 text-sm">
                {arePremiumCategoriesLocked 
                  ? 'You can still create them now and unlock later!' 
                  : 'Create one to make the game your own!'}
              </p>
            </div>
          )}

          {/* Info message when custom categories are locked but exist */}
          {customCategories.length > 0 && arePremiumCategoriesLocked && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 flex-shrink-0" />
              <span>Upgrade to Premium to unlock and play your custom categories</span>
            </div>
          )}

          <div className="space-y-4">
            {customCategories.map((category) => {
              const isExample = category.id.includes('example');
              const isLocked = arePremiumCategoriesLocked;
              return (
                <div
                  key={category.id}
                  className={`relative w-full overflow-hidden rounded-3xl p-6 text-left transition-all duration-300 shadow-lg flex items-center gap-4 border ${
                    isLocked
                      ? 'bg-[#2D2D2D]/40 opacity-60 border-[rgba(255,255,255,0.05)] hover:opacity-70'
                      : 'bg-[#2D2D2D] backdrop-blur-sm hover:scale-102 active:scale-98 border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.12)] morph-on-hover'
                  }`}
                >
                  {!isLocked && <CategoryBackground category={category} />}
                  {isLocked && (
                    <div className="absolute top-4 right-4 z-20">
                      <Lock className="w-5 h-5 text-white/50" />
                    </div>
                  )}
                  <RippleButton
                    onClick={() => handleCustomCategoryClick(category)}
                    className={`flex-1 flex items-center gap-4 relative z-10 ${isLocked ? 'cursor-pointer' : ''}`}
                    variant="secondary"
                  >
                    <div className={`flex-shrink-0 ${isLocked ? 'opacity-50' : ''}`}>
                      <CategoryIcon category={category} size="lg" />
                    </div>
                    <div className="flex-1 min-w-0 pr-12">
                      <div className={`text-xl mb-1 ${isLocked ? 'text-white/50' : 'text-white'}`}>
                        {category.name.includes(' (') ? (
                          <>
                            <div className="whitespace-nowrap">{category.name.split(' (')[0]}</div>
                            <div>({category.name.split(' (')[1]}</div>
                          </>
                        ) : (
                          <div className="whitespace-nowrap">{category.name}</div>
                        )}
                      </div>
                      <div className={`text-sm leading-relaxed ${isLocked ? 'text-white/30' : 'text-[#999]'}`}>
                        {category.description || `${category.words.length} custom words`}
                      </div>
                    </div>
                  </RippleButton>
                  {!isLocked && (
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                      <button
                        onClick={() => startEditingCategory(category)}
                        className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
                        title="Edit category"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {!isExample && (
                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="p-2 rounded-lg bg-red-600/80 text-white hover:bg-red-600 transition-all duration-200 hover:scale-110"
                          title="Delete category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Built-in Categories (Free) */}
        <div className="mb-6">
          <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">
            Free Categories
          </h3>
          <div className="space-y-4">
            {BUILT_IN_CATEGORIES.map((category) => (
              <div key={category.id} className="relative">
                <RippleButton
                  onClick={() => handleCategoryClick(category)}
                  className="w-full relative overflow-hidden bg-[#2D2D2D] backdrop-blur-sm rounded-3xl p-6 text-left transition-all duration-300 hover:scale-102 active:scale-98 shadow-lg flex items-center gap-4 hover:shadow-xl border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.12)] morph-on-hover"
                  variant="secondary"
                >
                  <CategoryBackground category={category} />
                  <div className="flex-shrink-0 relative z-10">
                    <CategoryIcon category={category} size="lg" />
                  </div>
                  <div className="flex-1 min-w-0 relative z-10 pr-12 text-center">
                    <div className="text-white text-xl mb-1">
                      {category.name.includes(' (') ? (
                        <>
                          <div className="whitespace-nowrap">{category.name.split(' (')[0]}</div>
                          <div>({category.name.split(' (')[1]}</div>
                        </>
                      ) : (
                        <div className="whitespace-nowrap">{category.name}</div>
                      )}
                    </div>
                    <div className="text-[#999] text-sm leading-relaxed">
                      {category.description || `${category.words.length} words`}
                    </div>
                  </div>
                </RippleButton>
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={() => duplicateAndEditCategory(category)}
                    className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
                    title="Customize this category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Categories */}
        <div className="mb-6">
          <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">
            Premium Categories
          </h3>
          <div className="space-y-4">
            {PREMIUM_CATEGORIES.map((category) => {
              const isLocked = arePremiumCategoriesLocked;
              return (
                <div key={category.id} className="relative">
                  <RippleButton
                    onClick={() => handleCategoryClick(category)}
                    className={`relative w-full overflow-hidden rounded-3xl p-6 text-left transition-all duration-300 shadow-lg flex items-center gap-4 border ${
                      isLocked
                        ? 'bg-[#2D2D2D]/40 cursor-pointer opacity-60 border-[rgba(255,255,255,0.05)] hover:opacity-70'
                        : 'bg-[#2D2D2D] backdrop-blur-sm hover:scale-102 active:scale-98 hover:shadow-xl border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.12)] morph-on-hover'
                    }`}
                    variant="secondary"
                  >
                    {!isLocked && <CategoryBackground category={category} />}
                    <div className={`flex-shrink-0 relative z-10 ${isLocked ? 'opacity-50' : ''}`}>
                      <CategoryIcon category={category} size="lg" />
                    </div>
                    <div className="flex-1 min-w-0 pr-12 relative z-10 text-center">
                      <div className={`text-xl mb-1 ${isLocked ? 'text-white/50' : 'text-white'}`}>
                        {category.name.includes(' (') ? (
                          <>
                            <div className="whitespace-nowrap">{category.name.split(' (')[0]}</div>
                            <div>({category.name.split(' (')[1]}</div>
                          </>
                        ) : (
                          <div className="whitespace-nowrap">{category.name}</div>
                        )}
                      </div>
                      <div className={`text-sm leading-relaxed ${isLocked ? 'text-white/30' : 'text-[#999]'}`}>
                        {category.description || `${category.words.length} words`}
                      </div>
                    </div>
                  </RippleButton>
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    {isLocked && (
                      <div className="p-2">
                        <Lock className="w-4 h-4 text-white/50" />
                      </div>
                    )}
                    <button
                      onClick={() => duplicateAndEditCategory(category)}
                      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                        isLocked 
                          ? 'bg-white/5 text-white/50 hover:bg-white/10' 
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                      title="Customize this category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Indicator */}
        <div className="mt-6 w-32 h-1.5 bg-white/30 rounded-full mx-auto" />
      </div>

      {/* Tutorial Overlay */}
      {showTutorialState && (
        <CategoryTutorial onComplete={handleTutorialComplete} />
      )}
    </div>
  );
}

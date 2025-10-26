import { useState, useEffect, useCallback } from "react";
import { IntroSlides } from "./components/IntroSlides";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { PaywallModal } from "./components/PaywallModal";
import { LobbySetup } from "./components/LobbySetup";
import { CategorySelector } from "./components/CategorySelector";
import { CategoryTutorial } from "./components/CategoryTutorial";
import { GameSettings } from "./components/GameSettings";
import { RoleReveal } from "./components/RoleReveal";
import { FirstPlayerAnnouncement } from "./components/FirstPlayerAnnouncement";
import { VotingScreen } from "./components/VotingScreen";
import { ResultsScreen } from "./components/ResultsScreen";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { RippleButton } from "./components/RippleButton";
import { InfoButton } from "./components/InfoButton";
import { IconExportHelper } from "./components/IconExportHelper";
import { OnboardingTutorial } from "./components/OnboardingTutorial";
// Update the Figma asset imports to use local paths
import imposterIcon from "./assets/88f96b2be2ecf56e846ac1b153054bb388382435.png";
import detectiveIcon from "./assets/334fcb0fdf74b28d9c247237e5b9df155373af95.png";
import {
  registerServiceWorker,
  setupInstallPrompt,
} from "./utils/pwa";
import { soundManager } from "./utils/soundManager";
import { AVAILABLE_AVATARS } from "./utils/avatars";
import {
  ensureRevenueCatConfigured,
  getOrCreateRevenueCatAppUserId,
  purchaseDefaultPackage,
  restoreCustomerPurchases,
} from "./utils/payments/revenuecat";
import {
  ensureAnonymousSession,
  fetchEntitlements,
  UserSession,
} from "./utils/auth";

export type GamePhase =
  | "intro"
  | "welcome"
  | "lobby"
  | "category"
  | "settings"
  | "reveal"
  | "first-player"
  | "playing"
  | "voting"
  | "results"
  | "icon-helper";

export type Player = {
  id: string;
  name: string;
  isImposter: boolean;
  word?: string;
  votes: number;
  avatarId: string;
};

export type Category = {
  id: string;
  name: string;
  emoji?: string;
  description?: string;
  words: string[];
  isCustom?: boolean;
  isPremium?: boolean;
};

export type SubscriptionStatus = "free" | "premium";

export default function App() {
  console.log('🎮 App component rendering...');
  
  const [gamePhase, setGamePhase] =
    useState<GamePhase>("intro");
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);
  const [imposterCount, setImposterCount] = useState(1);
  const [hintWordEnabled, setHintWordEnabled] = useState(true);
  const [currentRevealIndex, setCurrentRevealIndex] =
    useState(0);
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus>("free");
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const [hasSeenCategoryTutorial, setHasSeenCategoryTutorial] =
    useState(false);
  const [showTutorialManually, setShowTutorialManually] =
    useState(false);
  const [roundDuration, setRoundDuration] = useState(180); // 3 minutes default
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [timerActive, setTimerActive] = useState(false);
  const [activePlayerId, setActivePlayerId] = useState<
    string | null
  >(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] =
    useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [firstPlayer, setFirstPlayer] = useState<Player | null>(null);
  const [supabaseSession, setSupabaseSession] = useState<UserSession | null>(null);
  const [isEntitlementsLoading, setIsEntitlementsLoading] = useState(true);
  const [entitlementError, setEntitlementError] = useState<string | null>(null);
  const [isPurchaseInProgress, setIsPurchaseInProgress] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  console.log('📊 Current game phase:', gamePhase);

  // Load app state on mount
  useEffect(() => {
    console.log('🔧 Running app state initialization useEffect...');
    try {
      // Load games played from localStorage (device-based)
      const savedGamesPlayed =
        localStorage.getItem("gamesPlayed");
      if (savedGamesPlayed) {
        console.log('🎮 Loaded games played:', savedGamesPlayed);
        setGamesPlayed(parseInt(savedGamesPlayed, 10));
      }

      // Load UI state from localStorage
      const seenIntro = localStorage.getItem("hasSeenIntro");
      const seenWelcome = localStorage.getItem("hasSeenWelcome");
      const seenCategoryTutorial = localStorage.getItem(
        "hasSeenCategoryTutorial",
      );
      const seenOnboarding = localStorage.getItem(
        "hasSeenOnboarding",
      );

      console.log('👀 UI state:', { seenIntro, seenWelcome, seenCategoryTutorial, seenOnboarding });

      if (seenIntro === "true") {
        setHasSeenIntro(true);
        setHasSeenWelcome(true);
        setGamePhase("lobby");
        console.log('✅ User has seen intro, going to lobby');
      }

      if (seenCategoryTutorial === "true") {
        setHasSeenCategoryTutorial(true);
      }

      if (seenOnboarding === "true") {
        setHasSeenOnboarding(true);
      } else if (seenIntro === "true" && seenWelcome === "true") {
        setShowOnboarding(true);
      }
      
      console.log('✅ App state initialization complete');
    } catch (error) {
      console.error('🚨 Error during app state initialization:', error);
    }
  }, []);

  useEffect(() => {
    const appUserId = getOrCreateRevenueCatAppUserId();
    if (!appUserId) {
      return;
    }

    ensureRevenueCatConfigured(appUserId).catch((error) =>
      console.error("?? Failed to configure RevenueCat:", error),
    );
  }, []);

  useEffect(() => {
    let cancelled = false;

    const bootstrapSession = async () => {
      setEntitlementError(null);
      setIsEntitlementsLoading(true);
      try {
        const session = await ensureAnonymousSession();
        if (!session) {
          if (!cancelled) {
            setEntitlementError("Unable to initialize secure session.");
            setIsEntitlementsLoading(false);
          }
          return;
        }
        if (!cancelled) {
          setSupabaseSession(session);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("?? Failed to initialize Supabase session:", error);
          setEntitlementError("Unable to initialize secure session.");
          setIsEntitlementsLoading(false);
        }
      }
    };

    bootstrapSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const refreshEntitlements = useCallback(async () => {
    if (!supabaseSession) return false;
    setIsEntitlementsLoading(true);
    setEntitlementError(null);
    try {
      const data = await fetchEntitlements(supabaseSession.accessToken);
      if (data) {
        setSubscriptionStatus(data.hasPremium ? "premium" : "free");
        return data.hasPremium;
      } else {
        setEntitlementError("Unable to load premium status. Using free tier.");
        setSubscriptionStatus("free");
        return false;
      }
    } catch (error) {
      console.error("?? Failed to load entitlements:", error);
      setEntitlementError("Unable to load premium status. Using free tier.");
      setSubscriptionStatus("free");
      return false;
    } finally {
      setIsEntitlementsLoading(false);
    }
    return false;
  }, [supabaseSession]);

  useEffect(() => {
    if (!supabaseSession) return;
    refreshEntitlements();
  }, [supabaseSession, refreshEntitlements]);

  // Register PWA service worker and install prompt
  useEffect(() => {
    console.log('🔧 Running PWA/platform initialization useEffect...');
    
    // Hide splash screen when app is ready (iOS)
    const hideSplash = async () => {
      try {
        const { SplashScreen } = await import('@capacitor/splash-screen');
        await SplashScreen.hide();
        console.log('[iOS] Splash screen hidden successfully');
      } catch (err) {
        // SplashScreen not available (web browser)
        console.log('[Web] Splash screen not available (expected in browser)');
      }
    };
    
    hideSplash().catch(err => {
      console.error('🚨 Error hiding splash screen:', err);
    });

    try {
      console.log('📱 Registering service worker...');
      registerServiceWorker();
      console.log('✅ Service worker registration initiated');
    } catch (error) {
      console.error('🚨 Error registering service worker:', error);
    }

    try {
      console.log('📱 Setting up install prompt...');
      setupInstallPrompt();
      console.log('✅ Install prompt setup complete');
    } catch (error) {
      console.error('🚨 Error setting up install prompt:', error);
    }

    // Initialize sound manager
    console.log('🔊 Initializing sound manager...');
    soundManager.init().catch((err) => {
      console.warn("⚠️ Sound manager initialization failed (non-critical):", err);
    });

    try {
      // Check URL for icon-helper access
      const urlParams = new URLSearchParams(
        window.location.search,
      );
      if (urlParams.get("icons") === "export") {
        console.log('🎨 Icon helper mode detected');
        setGamePhase("icon-helper");
        setHasSeenIntro(true);
        setHasSeenWelcome(true);
      }
    } catch (error) {
      console.error('🚨 Error checking URL params:', error);
    }
    
    console.log('✅ PWA/platform initialization complete');
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (!timerActive || timeRemaining <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setTimerActive(false);
          // Auto-transition to voting when time runs out
          setTimeout(() => startVoting(), 500);
          return 0;
        }
        // Play tick sound for last 10 seconds
        if (prev <= 10) {
          soundManager.play("countdown-tick");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const startGame = (
    playerData: { name: string; avatarId: string }[],
  ) => {
    const newPlayers: Player[] = playerData.map(
      (data, index) => ({
        id: `player-${index}`,
        name: data.name,
        isImposter: false,
        votes: 0,
        avatarId: data.avatarId,
      }),
    );
    setPlayers(newPlayers);

    // Show paywall before entering second game for free users
    if (subscriptionStatus === "free" && gamesPlayed >= 1) {
      setShowPaywall(true);
    } else {
      setGamePhase("category");
    }
  };

  const selectCategory = (category: Category) => {
    soundManager.play("confirm");
    setSelectedCategory(category);
    setGamePhase("settings");
  };

  const generateHintWord = async (
    word: string,
    categoryName: string,
  ): Promise<string> => {
    const accessToken = supabaseSession?.accessToken;
    // Try AI-powered hint generation first
    try {
      const { generateHintWithOpenAI } = await import(
        "./utils/openai"
      );
      if (!accessToken) {
        throw new Error("No Supabase session for AI hint generation");
      }
      const result = await generateHintWithOpenAI({
        word,
        categoryName,
        accessToken,
      });

      if (result.success && result.hint) {
        console.log(
          `💡 AI-generated hint for "${word}": "${result.hint}"`,
        );
        return result.hint;
      }
    } catch (error) {
      console.log(
        "AI hint generation failed, using fallback:",
        error,
      );
    }

    // Fallback: Smart category-based hints
    const categoryHints: { [key: string]: string } = {
      Animals: "Creature",
      Countries: "Place",
      Movies: "Film",
      Foods: "Edible",
      Sports: "Game",
      Celebrities: "Famous",
      Brands: "Company",
      "TV Shows": "Series",
      "Video Games": "Gaming",
      Books: "Story",
      "Music Artists": "Artist",
      Cities: "Location",
      Superheroes: "Hero",
      "Car Brands": "Vehicle",
      "Tech Companies": "Tech",
    };

    // Return category-specific hint if available, otherwise generic
    const hint = categoryHints[categoryName] || "Thing";

    console.log(
      `💡 Using fallback hint for "${word}" in category "${categoryName}": "${hint}"`,
    );

    return hint;
  };

  const startReveal = async () => {
    const playersCopy = [...players];

    // Create array of all player indices and shuffle it using Fisher-Yates
    const shuffledIndices = playersCopy.map((_, i) => i);
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }

    // Take the first N indices as imposters (where N = imposterCount)
    const imposterIndices = new Set(
      shuffledIndices.slice(0, Math.min(imposterCount, playersCopy.length))
    );

    console.log('🎲 Randomly selected imposter indices:', Array.from(imposterIndices));

    // Mark the randomly selected players as imposters
    playersCopy.forEach((player, index) => {
      player.isImposter = imposterIndices.has(index);
    });

    // Assign words
    if (selectedCategory && selectedCategory.words.length > 0) {
      const randomWord =
        selectedCategory.words[
          Math.floor(
            Math.random() * selectedCategory.words.length,
          )
        ];
      console.log(
        "🎯 Selected word for this round:",
        randomWord,
      );

      // Generate hint word once for all imposters
      let hintWord: string | undefined = undefined;
      if (hintWordEnabled) {
        hintWord = await generateHintWord(
          randomWord,
          selectedCategory.name,
        );
        console.log(
          "���� Generated hint for imposters:",
          hintWord,
        );
      }

      // Assign words to all players
      for (const player of playersCopy) {
        if (player.isImposter) {
          player.word = hintWord;
          console.log(
            `👽 ${player.name} (IMPOSTER) gets hint:`,
            player.word,
          );
        } else {
          player.word = randomWord;
          console.log(
            `👼 ${player.name} (INNOCENT) gets word:`,
            player.word,
          );
        }
      }
    }

    setPlayers(playersCopy);
    setCurrentRevealIndex(0);
    soundManager.play("start-match");
    setGamePhase("reveal");
  };

  const nextReveal = () => {
    soundManager.play("swipe");
    if (currentRevealIndex < players.length - 1) {
      setCurrentRevealIndex(currentRevealIndex + 1);
    } else {
      // All players have seen their roles - randomly select who goes first
      // Use more robust randomization with multiple random calls
      const randomSeed = Math.random() * Math.random();
      const randomIndex = Math.floor(randomSeed * players.length);
      const selectedPlayer = players[randomIndex];
      
      setFirstPlayer(selectedPlayer);
      console.log('🎲 Randomly selected first player:', selectedPlayer.name, `(index: ${randomIndex} of ${players.length})`);
      setGamePhase("first-player");
    }
  };

  const startDiscussion = () => {
    // Start timer when entering playing phase
    setTimeRemaining(roundDuration);
    setTimerActive(true);
    setGamePhase("playing");
  };

  const backToSettings = () => {
    // Reset reveal state and go back to settings
    setCurrentRevealIndex(0);
    setGamePhase("settings");
  };

  const startVoting = () => {
    setTimerActive(false);
    setGamePhase("voting");
  };

  const submitVote = (votedPlayerIds: string[]) => {
    soundManager.play("vote-cast");
    const updatedPlayers = players.map((p) =>
      votedPlayerIds.includes(p.id) ? { ...p, votes: p.votes + 1 } : p,
    );
    setPlayers(updatedPlayers);
    setGamePhase("results");
  };

  const resetGame = () => {
    // Show paywall after first game for free users
    if (subscriptionStatus === "free" && gamesPlayed === 0) {
      const newGamesPlayed = 1;
      setGamesPlayed(newGamesPlayed);
      localStorage.setItem(
        "gamesPlayed",
        newGamesPlayed.toString(),
      );
      setShowPaywall(true);
    }

    // Reset player game state (keep players, just reset votes and words)
    const resetPlayers = players.map((player) => ({
      ...player,
      votes: 0,
      word: undefined,
      isImposter: false,
    }));
    setPlayers(resetPlayers);

    setSelectedCategory(null);
    setCurrentRevealIndex(0);
    setFirstPlayer(null); // Reset first player selection
    setGamePhase("category");
  };

  const handleIntroComplete = () => {
    setHasSeenIntro(true);
    localStorage.setItem("hasSeenIntro", "true");
    setHasSeenWelcome(true);
    localStorage.setItem("hasSeenWelcome", "true");
    setGamePhase("lobby");
    
    // Show onboarding for first-time users
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  };

  const handleWelcomeComplete = () => {
    setHasSeenWelcome(true);
    localStorage.setItem("hasSeenWelcome", "true");
    setGamePhase("lobby");

    // Show onboarding for first-time users
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setHasSeenOnboarding(true);
    localStorage.setItem("hasSeenOnboarding", "true");
  };

  const handleCategoryTutorialComplete = () => {
    setHasSeenCategoryTutorial(true);
    localStorage.setItem("hasSeenCategoryTutorial", "true");
    setShowTutorialManually(false);
  };

  const handleShowTutorial = () => {
    setShowTutorialManually(true);
  };

  const handleSubscribe = async () => {
    if (isPurchaseInProgress) return;
    setPurchaseError(null);
    setIsPurchaseInProgress(true);
    try {
      const result = await purchaseDefaultPackage();
      if (result.success) {
        soundManager.play("confirm");
        await refreshEntitlements();
        setShowPaywall(false);
        if (players.length > 0) {
          setGamePhase("category");
        }
      } else if (result.cancelled) {
        setPurchaseError("Purchase cancelled.");
      } else {
        setPurchaseError(
          result.error || "Unable to complete purchase. Please try again.",
        );
      }
    } catch (error) {
      setPurchaseError(
        error instanceof Error
          ? error.message
          : "Unable to complete purchase. Please try again.",
      );
    } finally {
      setIsPurchaseInProgress(false);
    }
  };

  const handleRestorePurchases = async () => {
    if (isPurchaseInProgress) return;
    setPurchaseError(null);
    setIsPurchaseInProgress(true);
    try {
      const result = await restoreCustomerPurchases();
      if (result.success) {
        soundManager.play("confirm");
        await refreshEntitlements();
        setShowPaywall(false);
        if (players.length > 0) {
          setGamePhase("category");
        }
      } else {
        setPurchaseError(
          result.error ||
            "We couldn't find any purchases associated with this account.",
        );
      }
    } catch (error) {
      setPurchaseError(
        error instanceof Error
          ? error.message
          : "Unable to restore purchases right now.",
      );
    } finally {
      setIsPurchaseInProgress(false);
    }
  };

  const closePaywall = () => {
    setPurchaseError(null);
    setIsPurchaseInProgress(false);
    setShowPaywall(false);
    // If players exist, go to category screen so they can select free categories
    // If no players, go back to lobby
    if (players.length > 0) {
      setGamePhase("category");
    } else {
      setGamePhase("lobby");
    }
  };

  const handleLockedCategoryClick = () => {
    // Show paywall when user clicks on a locked category
    soundManager.play("error");
    setShowPaywall(true);
  };

  console.log('🎨 About to render App JSX, gamePhase:', gamePhase);

  return (
    <div className="min-h-screen bg-[#1A1A1A] transition-colors duration-500">
      {/* Debug overlay */}
      <div className="fixed top-0 left-0 bg-white/10 text-white text-xs p-2 z-50 space-y-1">
        <div>Phase: {gamePhase}</div>
        <div>
          Sub: {subscriptionStatus}
          {isEntitlementsLoading ? " (checking…)" : null}
        </div>
        {entitlementError ? (
          <div className="text-[#FCA5A5] max-w-xs">{entitlementError}</div>
        ) : null}
      </div>
      
      <div className="min-h-screen relative">
        {gamePhase === "intro" && (
          <>
            {console.log('✅ Rendering IntroSlides component')}
            <IntroSlides onComplete={handleIntroComplete} />
          </>
        )}

        {gamePhase === "icon-helper" && <IconExportHelper />}

        {gamePhase === "lobby" && (
          <LobbySetup onStart={startGame} />
        )}

        {gamePhase === "category" && (
          <>
            <CategorySelector
              onSelect={selectCategory}
              onBack={() => setGamePhase("lobby")}
              subscriptionStatus={subscriptionStatus}
              accessToken={supabaseSession?.accessToken}
              showTutorial={
                !hasSeenCategoryTutorial &&
                !showTutorialManually
              }
              onTutorialComplete={
                handleCategoryTutorialComplete
              }
              onLockedCategoryClick={handleLockedCategoryClick}
            />
            <InfoButton onClick={handleShowTutorial} />
          </>
        )}

        {gamePhase === "settings" && selectedCategory && (
          <GameSettings
            category={selectedCategory}
            playerCount={players.length}
            imposterCount={imposterCount}
            setImposterCount={setImposterCount}
            hintWordEnabled={hintWordEnabled}
            setHintWordEnabled={setHintWordEnabled}
            roundDuration={roundDuration}
            setRoundDuration={setRoundDuration}
            onStart={startReveal}
            onBack={() => setGamePhase("category")}
          />
        )}

        {gamePhase === "reveal" && (
          <RoleReveal
            player={players[currentRevealIndex]}
            playerNumber={currentRevealIndex + 1}
            totalPlayers={players.length}
            onNext={nextReveal}
            onBack={backToSettings}
          />
        )}

        {gamePhase === "first-player" && firstPlayer && (
          <FirstPlayerAnnouncement
            firstPlayer={firstPlayer}
            onContinue={startDiscussion}
          />
        )}

        {gamePhase === "playing" && (
          <div
            className="min-h-screen relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #1A1A1A 0%, #252525 50%, #2D2D2D 100%)",
            }}
          >
            {/* Minimal elegant background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Subtle grey blobs */}
              <div
                className="absolute w-[600px] h-[600px] rounded-full blur-[150px] opacity-10"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
                  top: "-10%",
                  right: "-15%",
                  animation:
                    "blob-float 25s ease-in-out infinite",
                }}
              />
              <div
                className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-08"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
                  bottom: "-5%",
                  left: "-10%",
                  animation:
                    "blob-float-delayed 30s ease-in-out infinite 4s",
                }}
              />
              <div
                className="absolute w-[450px] h-[450px] rounded-full blur-[100px] opacity-06"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)",
                  top: "40%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  animation:
                    "blob-float-slow 20s ease-in-out infinite 7s",
                }}
              />

              {/* Minimal sparkle particles */}
              {[...Array(8)].map((_, i) => {
                const delay = Math.random() * 10;
                const duration = 12 + Math.random() * 8;
                return (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: "2px",
                      height: "2px",
                      background:
                        "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 100%)",
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `elegant-float ${duration}s ease-in-out infinite ${delay}s`,
                    }}
                  />
                );
              })}
            </div>

            {/* Content */}
            <div className="relative min-h-screen flex flex-col px-6 py-12 pb-8 max-w-2xl mx-auto">
              {/* Header with Timer */}
              <div className="text-center mb-8">
                <div className="mb-4 flex items-center justify-center">
                  <img
                    src={detectiveIcon}
                    alt="Detective"
                    className="w-24 h-24"
                  />
                </div>
                <h2 className="text-white mb-2">
                  Discussion Time
                </h2>
                <p className="text-white/80">
                  Exchange clues carefully
                </p>

                {/* Timer */}
                <div className="mt-6 flex justify-center">
                  <div className="bg-[#2D2D2D] backdrop-blur-xl rounded-2xl px-8 py-6 border border-[rgba(255,255,255,0.08)] shadow-lg">
                    <div
                      className={`text-4xl transition-colors duration-300 ${
                        timeRemaining <= 30
                          ? "text-[#EF4444]"
                          : "text-white"
                      }`}
                    >
                      {Math.floor(timeRemaining / 60)}:
                      {(timeRemaining % 60)
                        .toString()
                        .padStart(2, "0")}
                    </div>
                    <div className="text-[#999] text-xs mt-1 text-center">
                      {timeRemaining <= 30
                        ? "Hurry!"
                        : "Time Left"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Player Grid */}
              <div className="flex-1 mb-8">
                <div className="grid grid-cols-2 gap-3">
                  {players.map((player) => (
                    <div
                      key={player.id}
                      className="bg-[#2D2D2D] backdrop-blur-xl rounded-2xl p-5 border border-[rgba(255,255,255,0.08)] text-center shadow-md"
                    >
                      <div className="flex justify-center mb-2">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <img 
                            src={AVAILABLE_AVATARS.find(a => a.id === player.avatarId)?.image || AVAILABLE_AVATARS[0].image}
                            alt={player.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      <div className="text-white text-sm">
                        {player.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Card */}
              <div className="p-5 rounded-2xl mb-6 bg-[#2D2D2D]/80 backdrop-blur-sm border border-[rgba(255,255,255,0.06)] shadow-sm">
                <p className="text-center text-[#999] text-sm">
                  Imposters have contextual hints to help
                  them blend in.
                </p>
              </div>

              {/* Start Voting Button */}
              <button
                onClick={startVoting}
                className="w-full py-5 rounded-2xl bg-white text-[#1A1A1A] transition-all duration-200 hover:bg-[#E5E5E5] active:scale-[0.98] shadow-md text-center"
              >
                Begin Voting
              </button>

              {/* Bottom Indicator */}
              <div className="mt-6 w-24 h-1 bg-[#404040] rounded-full mx-auto" />
            </div>
          </div>
        )}

        {gamePhase === "voting" && (
          <VotingScreen 
            players={players} 
            onVote={submitVote} 
            imposterCount={imposterCount}
          />
        )}

        {gamePhase === "results" && (
          <ResultsScreen
            players={players}
            onPlayAgain={resetGame}
          />
        )}

        {/* Paywall Modal */}
        {showPaywall && (
          <PaywallModal
            onSubscribe={handleSubscribe}
            onClose={closePaywall}
            onRestore={handleRestorePurchases}
            isProcessing={isPurchaseInProgress || isEntitlementsLoading}
            errorMessage={purchaseError}
          />
        )}

        {/* Tutorial Overlay - Can be triggered from any screen */}
        {showTutorialManually && (
          <CategoryTutorial
            onComplete={handleCategoryTutorialComplete}
          />
        )}

        {/* Onboarding Tutorial - Shows 3 tips for first-time hosts */}
        {showOnboarding && gamePhase === "lobby" && (
          <OnboardingTutorial
            onComplete={handleOnboardingComplete}
          />
        )}
      </div>
    </div>
  );
}





/**
 * AI Generation Rate Limiting
 * 
 * Implements device-based daily limits to prevent API abuse and control costs.
 * Uses localStorage to track generation count per day.
 */

const AI_LIMIT_KEY = 'ai_generation_limit';
const DAILY_LIMIT = 50;

type AILimitData = {
  count: number;
  date: string; // ISO date string (YYYY-MM-DD)
};

/**
 * Get today's date as ISO string (YYYY-MM-DD)
 */
function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get current AI generation data from localStorage
 */
function getAILimitData(): AILimitData {
  const today = getTodayString();
  const stored = localStorage.getItem(AI_LIMIT_KEY);
  
  if (!stored) {
    return { count: 0, date: today };
  }
  
  try {
    const data: AILimitData = JSON.parse(stored);
    
    // Reset count if it's a new day
    if (data.date !== today) {
      return { count: 0, date: today };
    }
    
    return data;
  } catch (e) {
    console.error('Failed to parse AI limit data:', e);
    return { count: 0, date: today };
  }
}

/**
 * Save AI generation data to localStorage
 */
function saveAILimitData(data: AILimitData): void {
  localStorage.setItem(AI_LIMIT_KEY, JSON.stringify(data));
}

/**
 * Check if user has remaining AI generations for today
 */
export function hasAIGenerationsRemaining(): boolean {
  const data = getAILimitData();
  return data.count < DAILY_LIMIT;
}

/**
 * Get remaining AI generations for today
 */
export function getRemainingGenerations(): number {
  const data = getAILimitData();
  return Math.max(0, DAILY_LIMIT - data.count);
}

/**
 * Get total daily limit
 */
export function getDailyLimit(): number {
  return DAILY_LIMIT;
}

/**
 * Increment AI generation count
 * Returns true if successful, false if limit exceeded
 */
export function incrementAIGeneration(): boolean {
  const data = getAILimitData();
  
  if (data.count >= DAILY_LIMIT) {
    return false;
  }
  
  data.count += 1;
  saveAILimitData(data);
  return true;
}

/**
 * Get a user-friendly message about remaining generations
 */
export function getAILimitMessage(): string {
  const remaining = getRemainingGenerations();
  
  if (remaining === 0) {
    return 'Daily AI generation limit reached. Try again tomorrow!';
  }
  
  if (remaining <= 5) {
    return `${remaining} AI generation${remaining === 1 ? '' : 's'} remaining today`;
  }
  
  return `${remaining} AI generations remaining today`;
}

/**
 * Reset AI generation count (for testing purposes)
 */
export function resetAIGenerationCount(): void {
  const today = getTodayString();
  saveAILimitData({ count: 0, date: today });
}

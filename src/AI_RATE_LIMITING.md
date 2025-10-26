# AI Generation Rate Limiting

## Overview
To prevent API abuse and control OpenAI costs, the app implements a **50 generations per day limit** for AI-powered category word generation.

## How It Works

### Daily Limit System
- **Limit**: 50 AI generations per device per day
- **Storage**: Device-based using localStorage
- **Reset**: Automatically resets at midnight (based on device timezone)

### Implementation Files

#### `/utils/aiLimits.ts`
Core rate limiting utility with the following functions:
- `hasAIGenerationsRemaining()` - Check if user can generate
- `getRemainingGenerations()` - Get count of remaining generations
- `incrementAIGeneration()` - Increment count after successful generation
- `getAILimitMessage()` - Get user-friendly status message
- `resetAIGenerationCount()` - Reset counter (for testing)

#### `/components/CategorySelector.tsx`
Updated to enforce the limit:
- Checks limit before allowing AI generation
- Only increments count on successful API calls (not on fallback)
- Shows visual counter with color-coded warnings:
  - **Green/Gray**: 6+ generations remaining
  - **Yellow**: 1-5 generations remaining  
  - **Red**: 0 generations remaining (blocked)

## User Experience

### Visual Feedback
1. **Counter Display**: Shows "X AI generations remaining today"
2. **Color-Coded Warnings**:
   - Normal (gray) when plenty remain
   - Yellow warning when 5 or fewer remain
   - Red alert when limit reached
3. **Disabled Button**: Generate button is disabled when limit reached
4. **Alert Message**: Shows friendly message when limit exceeded

### Limit Reached
When a user hits the 50/day limit:
- AI Generate button becomes disabled and grayed out
- Red warning message: "Daily limit reached (50/day) - Try again tomorrow!"
- Users can still use "Manual Input" mode to create categories
- Limit automatically resets at midnight

## Technical Details

### Storage Structure
```typescript
{
  count: number,      // Number of generations today (0-50)
  date: string        // ISO date (YYYY-MM-DD)
}
```

### Automatic Daily Reset
The system compares the stored date with today's date:
- If dates match → Use stored count
- If dates differ → Reset count to 0 for new day

### Count Increment Logic
The counter only increments when:
1. User clicks "Generate Word Bank with AI"
2. API call succeeds and returns valid words
3. Fallback generation does NOT count toward limit

## Cost Savings

### Expected Savings
- **Without limit**: Potential for unlimited API calls
- **With 50/day limit**: Maximum ~1,500 calls/month per active user
- **OpenAI GPT-4o-mini cost**: ~$0.015 per 50-word generation
- **Max cost per user**: ~$22.50/month

### Protection Against
- Accidental spam clicking
- Malicious users trying to drain API credits
- Development/testing overuse
- Bots or automated abuse

## Testing

### Reset Counter (Dev/Test Only)
```typescript
import { resetAIGenerationCount } from './utils/aiLimits';

// Reset to 0 for testing
resetAIGenerationCount();
```

### Check Current Status
```typescript
import { getRemainingGenerations, hasAIGenerationsRemaining } from './utils/aiLimits';

console.log('Remaining:', getRemainingGenerations());
console.log('Can generate:', hasAIGenerationsRemaining());
```

## Future Enhancements

Possible improvements:
1. **Premium Unlimited**: Remove limit for premium subscribers
2. **Server-Side Tracking**: Move from localStorage to backend for cross-device limits
3. **Adjustable Limits**: Different limits for free vs. premium users
4. **Usage Analytics**: Track average generations per user
5. **Grace Period**: Allow a few extra generations on first day

## Notes

- This is a **client-side limit** using localStorage
- Users can clear localStorage to reset, but this is acceptable since:
  - Most users won't know how
  - Those who do are technical enough to use manual input
  - The limit is generous (50/day) for legitimate use
- For stronger protection, consider implementing server-side tracking with user authentication

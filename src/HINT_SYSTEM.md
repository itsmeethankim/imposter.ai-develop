# Hint Word System

## Overview
The hint word system helps imposters blend in during the game by providing them with a contextual clue related to the secret word. This is especially important since imposters may need to speak first and give a clue before they can learn from others.

## How It Works

### AI-Generated Hints
- Each round, an AI generates a single hint for ALL imposters (they all receive the same hint)
- The hint is designed to be **usable as a clue** - something imposters can confidently say when their turn comes
- Hints are contextually relevant but not too obvious

### Good Hint Examples
- **"Taylor Swift"** → "Pop icon" or "Grammy winner"
  - Imposter can say: "This person is a pop icon"
  
- **"LeBron James"** → "Basketball legend" or "Lakers"
  - Imposter can say: "I'm thinking of a Lakers player"
  
- **"Pizza"** → "Italian dish" or "Cheese"
  - Imposter can say: "It's an Italian dish with cheese"
  
- **"Lion"** → "Predator" or "Mane"
  - Imposter can say: "It has a mane"

- **"iPhone"** → "Smartphone" or "Apple"
  - Imposter can say: "It's a smartphone from Apple"

### Bad Hint Examples (What We Avoid)
- ❌ "Famous" - Too vague, not usable as a specific clue
- ❌ "Popular" - Doesn't help narrow down the answer
- ❌ "Well-known" - Too generic
- ❌ "Thing" - Completely unhelpful
- ❌ "Acclaimed" - Abstract adjective, not a concrete clue

## Implementation Details

### Server-Side Generation
Located in: `/supabase/functions/server/index.tsx`

The prompt instructs GPT-4o-mini to generate hints that:
1. Work as actual clues imposters can say
2. Are specific enough to seem credible
3. Are broad enough to not expose the imposter
4. Use 1-2 words maximum

### Temperature Setting
- Set to `0.8` for creative but consistent hints
- Higher than typical to ensure variety and context-appropriate responses

### Fallback
- If API fails, falls back to generic "Thing"
- Error handling ensures game continues even if hint generation fails

## Game Balance

### When Hints Are Enabled
- Imposters receive a contextual clue
- They can use it as their first statement
- Helps them participate actively without being caught immediately
- Makes the game more balanced when imposters speak first

### When Hints Are Disabled
- Imposters receive no hint
- They must rely purely on listening to others
- More challenging for imposters
- Better for experienced players

## UI/UX

### Role Reveal Screen
- Imposters see: "Your Hint Word" 
- Clear instruction: "Use this hint as your clue to blend in"
- Encourages confident delivery

### Game Settings
- Toggle to enable/disable hints
- Description: "Give imposters a contextual clue they can use to blend in"
- Sub-text: "Hint works as a word imposters can say during discussion"

### Investigation Phase
- Warning shown: "Imposters have contextual hints to help them blend in"
- Tip: "They may give their hint word as a clue - watch for uncertainty"

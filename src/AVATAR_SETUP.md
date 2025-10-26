# Avatar System Setup

The app now uses custom image avatars instead of emojis for player selection.

## Current Avatars

The app currently has 2 avatars:
- **Secret Agent 1** - Agent with short hair
- **Secret Agent 2** - Agent with ponytail

## How to Add More Avatars

To add more avatar images:

1. **Add the image import** to `/utils/avatars.ts`:
   ```typescript
   import avatar3 from "figma:asset/YOUR_ASSET_HASH_HERE.png";
   ```

2. **Add the avatar to the array**:
   ```typescript
   export const AVAILABLE_AVATARS = [
     { id: 'avatar-1', image: avatar1, name: 'Secret Agent 1' },
     { id: 'avatar-2', image: avatar2, name: 'Secret Agent 2' },
     { id: 'avatar-3', image: avatar3, name: 'Your Avatar Name' }, // Add here
     // Add more as needed
   ];
   ```

3. The avatar will automatically appear in the avatar picker on the player setup screen.

## Avatar Display

Avatars are displayed in:
- **Lobby Setup**: Player list and avatar picker modal (4-column grid)
- **Add Player Input**: Avatar selector button
- Players can tap their avatar to change it at any time before starting the game

## Avatar Image Requirements

- Images should be square (1:1 aspect ratio)
- PNG format recommended
- Images are displayed in rounded corners with white background
- Images should work well at small sizes (as small as 32x32px on screen)

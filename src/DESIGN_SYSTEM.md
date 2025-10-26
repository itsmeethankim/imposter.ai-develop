# Design System Documentation

## Overview
This design system follows iOS Human Interface Guidelines with a clean, minimal aesthetic optimized for mobile gameplay. It features high contrast for accessibility (WCAG AA+), consistent spacing, and both light and dark mode support.

## Color Palette

### Light Mode
```css
--background: #F8F8F8        /* Soft white background */
--foreground: #1A1A1A        /* Jet black text (AAA contrast) */
--card: #FFFFFF              /* Pure white cards */
--muted-foreground: #666666  /* Medium gray for secondary text */
--secondary: #E5E5E5         /* Platinum for subtle elements */
--accent: #8B5CF6            /* Purple accent */
--border: rgba(0,0,0,0.08)   /* Subtle borders */
```

### Dark Mode
```css
--background: #1A1A1A        /* Jet black background */
--foreground: #FFFFFF        /* Pure white text */
--card: #2D2D2D              /* Dark gray cards */
--muted-foreground: #999999  /* Light gray for secondary text */
--secondary: #333333         /* Darker gray for subtle elements */
--accent: #A78BFA            /* Lighter purple accent */
--border: rgba(255,255,255,0.08) /* Subtle borders */
```

### Accent Colors
- **Primary Purple**: `#8B5CF6` / `#A78BFA` (dark)
- **Cyan**: `#06B6D4`
- **Green**: `#10B981` (success states)
- **Red**: `#EF4444` (destructive actions)

## Typography

### Font Stack
- **Primary**: Space Grotesk
- **System Fallback**: system-ui, -apple-system, sans-serif

### Type Scale
```css
h2: 20px (1.25rem) - Screen titles
h3: 18px (1.125rem) - Card headers
p: 16px (1rem) - Body text
small: 14px (0.875rem) - Helper text
xs: 12px (0.75rem) - Labels
```

### Font Weights
- **Medium**: 600 (light) / 500 (dark) - Headings
- **Normal**: 500 (light) / 400 (dark) - Body text

### Contrast Ratios
All text meets WCAG AA+ standards:
- Large text (18pt+): minimum 3:1
- Normal text: minimum 4.5:1
- Interactive elements: minimum 3:1

## Spacing System

Based on 8pt grid with 8/12/16/24 tokens:

```css
--spacing-1: 0.5rem  /* 8px - Tight spacing */
--spacing-2: 0.75rem /* 12px - Compact spacing */
--spacing-3: 1rem    /* 16px - Default spacing */
--spacing-4: 1.5rem  /* 24px - Comfortable spacing */
--spacing-5: 2rem    /* 32px - Loose spacing */
--spacing-6: 3rem    /* 48px - Extra loose */
```

### Component Spacing
- **Card padding**: 16px (1rem)
- **Screen padding**: 16px (1rem)
- **Element gaps**: 12px (0.75rem)
- **Section gaps**: 24px (1.5rem)

## Border Radius

### iOS Standard: 20pt (1.25rem)
All interactive elements and cards use consistent 20pt corner radius:

```css
--radius-ios: 1.25rem /* 20px */
```

Applied to:
- Buttons
- Cards
- Input fields
- Avatars
- Modals
- Bottom sheets

## Icons

### Specifications
- **Stroke width**: 2px (consistent across all icons)
- **Size**: 20px (1.25rem) standard
- **Library**: Lucide React

### Common Icons
- `Users` - Player management
- `ChevronRight` - Navigation
- `Plus` / `Minus` - Incrementers
- `X` - Close/Remove
- `ArrowLeft` - Back navigation

## Components

### Progress Breadcrumb
Displays current step in multi-step flow:
- Active step: primary color, medium weight
- Complete step: muted color
- Incomplete step: very muted color
- Separator: ChevronRight icon

### Cards
White/dark cards with subtle borders:
```
background: white / #2D2D2D
border: rgba(0,0,0,0.08) / rgba(255,255,255,0.08)
border-radius: 20px
padding: 16px
```

### Primary CTA
Single prominent button at bottom:
```
background: #1A1A1A / white (dark)
color: white / #1A1A1A (dark)
border-radius: 20px
padding: 16px vertical
active: scale(0.98)
```

### iOS Switch
Native iOS-style toggle:
```
width: 51px
height: 31px
thumb: 27px
checked: #10B981 (green)
unchecked: #E5E5E5 / #333333 (dark)
```

### Avatar Buttons
Colorful gradient avatars:
```
size: 48px (3rem)
border-radius: 20px
emoji: 24px (1.5rem)
ring: 4px with 20% opacity of bg color
```

### Bottom Sheet Modal
iOS-style modal for selections:
```
position: fixed bottom
background: white/95% with backdrop-blur
border-radius: 32px (top only)
drag handle: 10px wide, 4px tall, gray
padding: 24px horizontal, 32px bottom
```

## Animations

### Timing Functions
- **Default**: `ease-out` for most transitions
- **Slide-up**: `cubic-bezier(0.32, 0.72, 0, 1)`
- **Duration**: 300ms standard

### Common Animations
```css
/* Fade in */
animate-fade-in: opacity 0-1, 0.3s

/* Slide up */
animate-slide-up: translateY(100%-0), 0.3s

/* Scale press */
active:scale-95 or active:scale-90
```

### Haptic Feedback
Add vibration on interactions:
```typescript
if (navigator.vibrate) {
  navigator.vibrate(10);
}
```

## Accessibility

### High Contrast
- All text meets WCAG AA+ standards
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text and UI elements

### Interactive Elements
- Minimum 44x44pt touch targets
- Clear focus states with visible rings
- Disabled states with reduced opacity

### Dark Mode
- Automatic support via CSS custom properties
- Inverted contrast ratios maintained
- Adjusted accent colors for readability

## Layout Patterns

### Screen Template
```tsx
<div className="min-h-screen bg-[#F8F8F8] dark:bg-[#1A1A1A]">
  {/* Subtle gradient background */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Gradient orbs */}
  </div>
  
  <div className="relative min-h-screen flex flex-col px-4 py-3 max-w-2xl mx-auto">
    {/* Progress breadcrumb */}
    <ProgressBreadcrumb steps={...} />
    
    {/* Header */}
    <div className="mt-6 mb-6">...</div>
    
    {/* Content */}
    <div className="flex-1 space-y-3 mb-6">...</div>
    
    {/* Primary CTA */}
    <button className="...">Continue</button>
    
    {/* Bottom safe area */}
    <div className="mt-6 w-24 h-1 bg-[rgba(0,0,0,0.08)] rounded-full mx-auto" />
  </div>
</div>
```

### Card Pattern
```tsx
<div className="bg-white dark:bg-[#2D2D2D] rounded-[20px] p-4 border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]">
  <h3 className="text-[#1A1A1A] dark:text-white mb-1">Title</h3>
  <p className="text-[#666666] dark:text-[#999999] text-sm">Description</p>
</div>
```

## Best Practices

### Do's
✅ Use consistent 20pt border radius
✅ Maintain 16px screen padding
✅ Keep text high contrast (WCAG AA+)
✅ Add haptic feedback to interactions
✅ Use spacing tokens (8/12/16/24)
✅ Test in both light and dark modes

### Don'ts
❌ Mix different corner radii
❌ Use low contrast text colors
❌ Forget dark mode variants
❌ Use gradients on content cards (only backgrounds)
❌ Create touch targets smaller than 44pt
❌ Override iOS-standard patterns

## Progressive Enhancement

### Gradients
Subtle background gradients only, never on content:
```css
/* Good - Background only */
.background {
  background: radial-gradient(circle, #8B5CF6 0%, transparent 70%);
  opacity: 0.08;
}

/* Bad - On content cards */
.card {
  background: linear-gradient(...); /* ❌ */
}
```

### Purple/Blue Vibe
Maintain color theme through:
- Accent colors (#8B5CF6, #06B6D4)
- Subtle background gradients
- Avatar color options
- Active states and focus rings

## Implementation Examples

### Adding a New Screen
1. Copy screen template structure
2. Add ProgressBreadcrumb with current step
3. Use consistent spacing (16px padding)
4. Place primary CTA at bottom
5. Add safe area indicator
6. Test in light and dark modes

### Creating a Setting Card
1. Use white/dark card background
2. Add 16px padding
3. Use 20pt border radius
4. Include title and description
5. Add iOS switch or stepper control
6. Ensure touch targets are 44pt+

### Adding Haptic Feedback
```typescript
const handleAction = () => {
  if (navigator.vibrate) {
    navigator.vibrate(10); // 10ms pulse
  }
  // ... rest of action
};
```

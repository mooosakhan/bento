# Dark Theme - Quick Start Guide

## 🌙 How to Use Dark Theme

### In the Builder

1. **Find the Theme Toggle**: Look for the Sun/Moon/Monitor icon in the top bar (between the view mode buttons and undo/redo)

2. **Switch Themes**: Click the icon to cycle through:
   - ☀️ **Light Mode** - Bright, clean interface
   - 🌙 **Dark Mode** - Dark backgrounds, easy on the eyes
   - 💻 **System** - Automatically matches your OS theme

3. **Your Choice is Saved**: The app remembers your preference and applies it every time you return

### On Your Published Portfolio

Your published portfolio (`/u/yourhandle`) automatically uses the theme you've selected in the builder. No need to republish - it updates live!

## ✨ What's Themed

Everything has been updated to work beautifully in both light and dark modes:

### Builder Interface
- Header and navigation
- Left sidebar (block library)
- Right sidebar (inspector)
- Canvas and blocks
- All modals (Publish, Avatar Picker)
- Preview mode

### Portfolio Blocks
- Header with avatar
- Skills (chips and grid layouts)
- Experience cards
- Project cards
- Links and buttons
- Social icons
- Gallery images
- Section headers
- Dividers

### UI Components
- Buttons (all variants)
- Text inputs
- Text areas
- Dropdowns/selects
- All custom editors

## 🎨 Design Philosophy

The dark theme follows Bento's signature style:
- **Deep neutrals** instead of pure black (easier on eyes)
- **High contrast** for readability
- **Subtle shadows** for depth
- **Smooth transitions** between themes
- **Professional appearance** suitable for portfolios

## 🔧 For Developers

### Using Theme in Your Code

```tsx
import { useTheme } from '@/components/theme/ThemeProvider';

function MyComponent() {
  const { themeMode, effectiveTheme, setThemeMode } = useTheme();
  
  // themeMode: 'light' | 'dark' | 'system'
  // effectiveTheme: 'light' | 'dark' (resolved)
  
  return <div>Current theme: {effectiveTheme}</div>;
}
```

### Adding Dark Styles

Simply add `dark:` prefix to Tailwind classes:

```tsx
<div className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">
  This text works in both themes!
</div>
```

### Theme Utilities

```tsx
import { applyThemeMode, getEffectiveTheme } from '@/lib/theme';

// Apply a theme programmatically
applyThemeMode('dark');

// Check what theme is active (resolves 'system' to actual theme)
const currentTheme = getEffectiveTheme('system'); // 'light' or 'dark'
```

## 📱 System Theme

When you select **System** mode:
- The app automatically matches your operating system's theme preference
- If you change your OS theme (e.g., from light to dark), the app updates instantly
- No need to manually switch - it stays in sync with your OS

## 🐛 Troubleshooting

### Theme not applying?
- Make sure JavaScript is enabled in your browser
- Try clearing your browser cache and reloading

### Can't see theme toggle?
- It's in the top bar of the builder, between the view mode selector (mobile/tablet/desktop) and the undo/redo buttons

### Theme not persisting?
- Check if your browser allows localStorage
- Make sure you're not in private/incognito mode (theme won't save)

## 💡 Tips

1. **Preview Both Themes**: Toggle between themes to see how your portfolio looks in both before publishing
2. **Consider Your Audience**: If your portfolio is viewed by people in different time zones, they might prefer different themes
3. **Use System Mode**: Let visitors see your portfolio in their preferred theme automatically

---

**Need Help?** Check the full documentation in `DARK_THEME_IMPLEMENTATION.md`

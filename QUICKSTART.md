# 🚀 Quick Start Guide

## Setup (2 minutes)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the dev server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   ```
   http://localhost:3000
   ```

You'll be redirected to `/builder` automatically!

## First Steps

### 1. Add Your First Block
- Click or drag **Header** from the left sidebar
- Edit your name and bio in the right panel
- Click **"Choose Avatar"** to:
  - Upload your photo (drag & drop or browse)
  - Paste an image URL
  - Pick from preset avatars (Bento, Outline, Others)

### 2. Add a Link Block
- Click or drag **Link** 
- Enter a title and URL in the inspector

### 3. Reorder Blocks
- Hover over any block to see the drag handle (⋮⋮)
- Drag to reorder

### 4. Try Other Blocks
- **Gallery**: Add image URLs (one per line)
- **Card**: Content card with optional CTA
- **Social Row**: Add your social media handles
- **Divider**: Simple separator

### 5. Preview Your Profile
- Click **Preview** button (eye icon) in top bar
- Toggle between mobile 📱 and desktop 💻 views

### 6. Visit Your Public Profile
- Your profile is at: `http://localhost:3000/u/myprofile`
- Default handle is "myprofile"

## Tips

✨ **Auto-save** - All changes save automatically to localStorage

🎨 **Avatar Options** - Upload (max 2MB), URL, or 36 preset avatars

🔄 **Undo/Redo** - Use the undo/redo buttons in the top bar

🗑️ **Delete** - Select a block and click "Delete Block" in the inspector

📋 **Duplicate** - Select a block and click "Duplicate Block"

🔄 **Reset** - Click the reset button (↻) to clear everything

## Keyboard Shortcuts

- `Ctrl/Cmd + Z` - Undo (not implemented in MVP)
- `Ctrl/Cmd + Y` - Redo (not implemented in MVP)

## What's Persisted?

- ✅ All blocks and their content
- ✅ Block order
- ✅ Profile data
- ❌ History stack (resets on page reload)

## Need Help?

Check the main [README.md](README.md) for:
- Full documentation
- How to add custom blocks
- Project structure
- Tech stack details

**Enjoy building! 🎨**

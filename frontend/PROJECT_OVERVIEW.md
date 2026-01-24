# 📦 BentoBuilder - Complete Project Overview

## ✅ What's Been Built

A fully functional, frontend-only MVP of a Bento-style Profile Builder (link-in-bio / personal page builder) with a professional avatar picker feature.

## 🎯 Core Features Implemented

### ✨ Builder Interface (`/builder`)
- **Two-pane layout**: Canvas (center) + Block Library (left) + Inspector (right)
- **Drag & Drop**: Full @dnd-kit integration
  - Drag blocks from library onto canvas
  - Reorder blocks with drag handles
  - Visual feedback during dragging
- **Block Selection**: Click to select, highlighted with ring
- **Real-time Editing**: Inspector panel updates selected block
- **View Modes**: Toggle between mobile (420px) and desktop (672px) preview
- **Preview Mode**: Full-screen preview of your profile
- **Avatar Picker**: Professional modal with 3 upload methods
- **Top Bar**: 
  - Logo
  - View mode toggle
  - Undo/Redo buttons
  - Preview button
  - Publish button (UI only)
  - Reset button
  - Auto-save indicator

### 🎨 Avatar Picker Feature (NEW!)
- **Three Upload Methods**:
  1. **Upload**: Drag & drop or browse files (JPG, PNG, WebP, max 2MB)
  2. **URL**: Paste any image URL with live preview
  3. **Presets**: 36 curated avatars in 3 categories (Bento, Outline, Others)
- **Bento-style Modal**: Clean, professional UI with tabs
- **Live Preview**: See avatar before confirming
- **Validation**: File type, size, and URL checks
- **Storage**: Base64 encoding for uploads, direct URLs for others

### 🧱 6 Block Types
1. **Header Block**: Avatar, display name, bio, location
2. **Link Block**: Title, URL, icon, style (button/plain)
3. **Gallery Block**: 2-column image grid
4. **Card Block**: Title, description, image, CTA button
5. **Divider Block**: Separator with style options
6. **Social Row Block**: Social media icons (Twitter, Instagram, LinkedIn, GitHub)

### 🎨 UI/UX Features
- **Airbnb-inspired Design**:
  - Clean, bright interface
  - Rounded corners (rounded-2xl)
  - Soft shadows (shadow-sm/md)
  - Generous spacing
  - Smooth transitions
- **Empty States**: "Drag blocks here to start"
- **Hover Effects**: Block cards lift on hover
- **Loading States**: Spinner on profile page
- **Responsive**: Mobile-friendly sidebar toggle

### 💾 State Management
- **Auto-save**: Debounced localStorage saves (1 second)
- **Undo/Redo**: Full history stack
- **Persistence**: Survives page refreshes
- **No Backend**: Pure client-side

### 🌐 Public Profile Page (`/u/[handle]`)
- Renders profile from localStorage
- Clean, centered layout
- Responsive design
- "Profile not found" state
- Footer with "Create your own" CTA

### 🛠️ Developer Experience
- **TypeScript**: Full type safety
- **Clean Architecture**:
  - Separated block renderers
  - Reusable UI components
  - Centralized block registry
  - Type definitions
- **Easy to Extend**: Clear pattern for adding new blocks
- **Well Documented**: README + QUICKSTART guides

## 📂 File Structure (31 files)

```
abc/
├── app/                      # Next.js App Router
│   ├── builder/
│   │   └── page.tsx         # ⭐ Main builder (350+ lines)
│   ├── u/[handle]/
│   │   └── page.tsx         # 🌐 Public profile
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── blocks/              # 🧱 Block renderers (7 files)
│   │   ├── BlockRenderer.tsx
│   │   ├── HeaderBlock.tsx
│   │   ├── LinkBlock.tsx
│   │   ├── GalleryBlock.tsx
│   │   ├── CardBlock.tsx
│   │   ├── DividerBlock.tsx
│   │   └── SocialRowBlock.tsx
│   ├── builder/             # 🏗️ Builder UI (4 files)
│   │   ├── BlockLibrary.tsx
│   │   ├── Canvas.tsx
│   │   ├── Inspector.tsx
│   │   └── SortableBlockItem.tsx
│   └── ui/                  # 🎨 Reusable UI (5 files)
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Textarea.tsx
│       ├── Toggle.tsx
│       └── Select.tsx
├── lib/
│   └── blockRegistry.ts     # 📋 Block definitions
├── types/
│   └── index.ts            # 📝 TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
├── .eslintrc.json
├── .gitignore
├── README.md               # 📖 Full documentation
└── QUICKSTART.md           # 🚀 Quick start guide
```

## 🎨 Design System

### Colors
- **Background**: `#f7f7f7` (neutral-50)
- **Cards**: White with subtle shadows
- **Text**: neutral-900, 700, 600, 500, 400
- **Accent**: neutral-900 (black)
- **Borders**: neutral-200, 300

### Typography
- System font stack (SF Pro, Segoe UI, etc.)
- Font weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- Padding: p-4, p-6 (generous)
- Gaps: gap-2, gap-3, gap-4
- Rounded: rounded-xl, rounded-2xl, rounded-full

### Shadows
- `shadow-sm`: Subtle cards
- `shadow-md`: Hover states
- `shadow-xl`: Profile container

## 🔧 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 14 | React framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| @dnd-kit | Drag and drop |
| lucide-react | Icons |
| localStorage | Persistence |

## ✨ Key Interactions

1. **Adding Blocks**:
   - Click block in library → Added to end
   - Drag block to canvas → Added to end
   
2. **Reordering**:
   - Hover block → See grip handle
   - Drag handle → Reorder blocks
   
3. **Editing**:
   - Click block → Selects it
   - Edit in inspector → Updates immediately
   
4. **Managing**:
   - Duplicate → Creates copy below
   - Delete → Removes block
   - Undo/Redo → History navigation

## 🚀 How to Run

```bash
# Install
npm install

# Run dev server
npm run dev

# Open browser
http://localhost:3000
```

## 📝 Next Steps / Future Enhancements

- [ ] Profile settings editor (handle, avatar, theme)
- [ ] Backend API + database
- [ ] User authentication
- [ ] Multiple profiles per user
- [ ] Custom themes
- [ ] More block types
- [ ] Block animations
- [ ] Analytics
- [ ] Custom domains
- [ ] Export/Import

## 💡 Adding a New Block

1. Add type to `types/index.ts`
2. Register in `lib/blockRegistry.ts`
3. Create renderer in `components/blocks/`
4. Add case to `BlockRenderer.tsx`

See [README.md](README.md) for detailed instructions.

## 🎯 What Makes This Special

- **Zero Backend**: Runs entirely in browser
- **Production Ready**: Clean, maintainable code
- **Easy to Extend**: Clear patterns and docs
- **Beautiful UI**: Airbnb-inspired design
- **Smooth DnD**: Proper @dnd-kit implementation
- **Type Safe**: Full TypeScript coverage
- **Auto-save**: Never lose your work

## 📊 Stats

- **35+ Files**: Organized, modular structure
- **6 Block Types**: Extensible architecture
- **5 UI Components**: Reusable design system
- **4 Avatar Components**: Professional picker system
- **2 Routes**: Builder + Public profile
- **350+ lines**: Main builder component
- **0 Backend**: Pure frontend MVP

---

**Ready to use! 🎉**

Start the dev server and begin building your profile at `/builder`.

### New: Choose Your Avatar! 🎨

Click "Choose Avatar" in the Header block to:
- Upload your photo (drag & drop)
- Paste an image URL
- Pick from 36 preset avatars

See [AVATAR_FEATURE.md](AVATAR_FEATURE.md) for full documentation.

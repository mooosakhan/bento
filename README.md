# 🎨 BentoBuilder - Profile Builder MVP

A beautiful, frontend-only link-in-bio / personal page builder with drag-and-drop functionality, built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Drag & Drop Interface**: Intuitive block-based builder with @dnd-kit
- **6 Block Types**: Header, Link, Gallery, Card, Divider, and Social Row
- **Avatar Picker**: Professional avatar selection with upload, URL, and preset options
- **Real-time Preview**: Toggle between mobile and desktop views
- **Auto-save**: Changes automatically saved to localStorage
- **Undo/Redo**: Full history tracking for all edits
- **Clean UI**: Airbnb-inspired design with smooth animations
- **Public Profiles**: Share your profile at `/u/[handle]`
- **No Backend**: Everything runs client-side with localStorage

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000) - you'll be automatically redirected to the builder at `/builder`.

## 📁 Project Structure

```
abc/
├── app/
│   ├── builder/
│   │   └── page.tsx          # Main builder interface
│   ├── u/
│   │   └── [handle]/
│   │       └── page.tsx      # Public profile page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home (redirects to builder)
│
├── components/
│   ├── blocks/               # Block renderers
│   │   ├── BlockRenderer.tsx # Main block router
│   │   ├── HeaderBlock.tsx
│   │   ├── LinkBlock.tsx
│   │   ├── GalleryBlock.tsx
│   │   ├── CardBlock.tsx
│   │   ├── DividerBlock.tsx
│   │   └── SocialRowBlock.tsx
│   │
│   ├── builder/              # Builder UI components
│   │   ├── AvatarGrid.tsx    # Preset avatar selector
│   │   ├── AvatarPickerModal.tsx  # Avatar picker modal
│   │   ├── AvatarUpload.tsx  # File upload component
│   │   ├── AvatarUrlInput.tsx  # URL input component
│   │   ├── BlockLibrary.tsx  # Draggable block library
│   │   ├── Canvas.tsx        # Main canvas area
│   │   ├── Inspector.tsx     # Properties panel
│   │   └── SortableBlockItem.tsx
│   │
│   └── ui/                   # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Textarea.tsx
│       ├── Toggle.tsx
│       └── Select.tsx
│
├── lib/
│   └── blockRegistry.ts      # Block type definitions
│
├── types/
│   └── index.ts              # TypeScript type definitions
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🎯 How to Use

### Building Your Profile

1. **Navigate to `/builder`** - The main builder interface loads
2. **Add Blocks** - Drag blocks from the left sidebar onto the canvas, or click to add
3. **Choose Avatar** - Select a Header block and click "Choose Avatar" to upload, use a URL, or pick a preset
4. **Reorder Blocks** - Drag the grip handle (appears on hover) to reorder
5. **Edit Blocks** - Click any block to select it and edit in the right panel
6. **Preview** - Click "Preview" to see your profile in full-screen mode
7. **Auto-save** - Changes are automatically saved to localStorage

### Sharing Your Profile

Your profile is accessible at `/u/[handle]` where `[handle]` is your profile handle (default: "myprofile"). To change your handle, you'd need to add a profile settings editor (not included in MVP).

## 🧩 Adding a New Block Type

Want to add a new block type? Follow these steps:

### 1. Define the Block Type

Add your new type to `types/index.ts`:

```typescript
export type BlockType = 
  | 'header' 
  | 'link' 
  | 'gallery' 
  | 'card' 
  | 'divider' 
  | 'socialRow'
  | 'yourNewBlock';  // Add this

export interface YourNewBlockProps {
  // Define your block's properties
  title: string;
  content: string;
}
```

### 2. Register the Block

Add to `lib/blockRegistry.ts`:

```typescript
export const blockRegistry: Record<BlockType, BlockDefinition> = {
  // ... existing blocks
  yourNewBlock: {
    type: 'yourNewBlock',
    label: 'Your New Block',
    icon: 'Star', // lucide-react icon name
    defaultProps: {
      title: 'Default Title',
      content: 'Default content',
    } as YourNewBlockProps,
    inspectorFields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'content', label: 'Content', type: 'textarea' },
    ],
  },
};
```

### 3. Create the Block Renderer

Create `components/blocks/YourNewBlock.tsx`:

```typescript
import React from 'react';
import { YourNewBlockProps } from '@/types';

interface YourNewBlockRendererProps {
  props: YourNewBlockProps;
}

export function YourNewBlockRenderer({ props }: YourNewBlockRendererProps) {
  return (
    <div className="p-6 bg-white rounded-2xl">
      <h3 className="text-xl font-bold">{props.title}</h3>
      <p className="text-neutral-600 mt-2">{props.content}</p>
    </div>
  );
}
```

### 4. Add to Block Renderer Router

Update `components/blocks/BlockRenderer.tsx`:

```typescript
import { YourNewBlockRenderer } from './YourNewBlock';

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    // ... existing cases
    case 'yourNewBlock':
      return <YourNewBlockRenderer props={block.props} />;
    // ...
  }
}
```

That's it! Your new block will now appear in the block library and be fully functional.

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

### Default Profile

Edit the initial state in `app/builder/page.tsx`:

```typescript
const [profile, setProfile] = useState<Profile>({
  handle: 'myprofile',
  displayName: 'Your Name',
  // ... customize defaults
});
```

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **@dnd-kit** - Drag and drop functionality
- **lucide-react** - Beautiful icon library
- **Zod** - Runtime type validation (ready to use)

## 📝 Inspector Field Types

The inspector panel supports these field types:

- `text` - Single-line text input
- `textarea` - Multi-line text input
- `url` - URL input with validation
- `select` - Dropdown with options
- `toggle` - Boolean switch (not currently used)
- `image-list` - List of image URLs (one per line)

## 🔄 State Management

- **Local State**: React useState for UI state
- **History Stack**: Simple undo/redo implementation
- **localStorage**: Auto-save and persistence
- **No Redux/Zustand**: Keeps it simple for MVP

## 🚧 Image cropping for uploaded avatars
- [ ] Future Enhancements

- [ ] Theme editor (colors, fonts, backgrounds)
- [ ] Profile settings editor (handle, display name, avatar)
- [ ] Export/Import profile data
- [ ] Backend API integration
- [ ] User authentication
- [ ] Multiple profiles per user
- [ ] Analytics and link tracking
- [ ] Custom domain support
- [ ] More block types (Video, Embed, Text, etc.)
- [ ] Block animations and transitions

## 📄 License

MIT License - feel free to use this project however you'd like!

## 🤝 Contributing

This is an MVP project. Feel free to fork and extend it! Some ideas:

- Add more block types
- Improve mobile responsiveness
- Add animations
- Create themes/templates
- Build a backend API

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

# 🎨 Avatar Picker Feature

## Overview

The Avatar Picker provides a professional, Bento-style experience for selecting and customizing profile avatars. It supports three methods: uploading files, pasting URLs, and choosing from preset collections.

## Features

### 3 Avatar Sources

#### 1️⃣ Upload Avatar
- **Drag & drop** or click to browse
- **Supported formats**: JPG, PNG, WebP
- **Max size**: 2MB
- **Live preview** before confirming
- **Storage**: Converted to base64 and stored in localStorage

#### 2️⃣ Avatar via URL
- Paste any publicly accessible image URL
- **Live preview** with validation
- **URL validation** ensures http/https protocol
- **Image validation** tests if URL actually loads an image
- Helpful error messages if URL is invalid

#### 3️⃣ Preset Avatars
Three curated categories:
- **Bento**: Colorful, playful avatars for creative profiles
- **Outline**: Clean, minimalist avatars for professionals
- **Others**: Diverse styles for unique personalities

12 avatars per category (36 total presets)

## Usage

### For Users

1. **Open the builder** at `/builder`
2. **Add or select a Header block**
3. In the Inspector panel (right side), click **"Choose Avatar"**
4. Pick your method:
   - **Presets**: Browse categories and click an avatar
   - **Upload**: Drag & drop or browse your files
   - **URL**: Paste an image URL and preview

### For Developers

The avatar picker is integrated into the Header block's Inspector panel:

```tsx
import { AvatarPickerModal } from '@/components/builder/AvatarPickerModal';

// When user clicks "Choose Avatar" button
<AvatarPickerModal
  currentAvatar={avatarUrl}
  onSelect={(avatarData) => {
    // avatarData: { type: 'upload' | 'url' | 'preset', value: string }
    updateBlockProp('avatarUrl', avatarData.value);
  }}
  onClose={() => setShowPicker(false)}
/>
```

## Components

### `AvatarPickerModal.tsx`
Main modal component with tab navigation:
- Handles tab switching (Presets / Upload / URL)
- Modal overlay with backdrop blur
- Clean header with title and close button
- Footer with contextual help text

### `AvatarGrid.tsx`
Grid-based preset avatar selector:
- Segmented control for categories
- 4-column responsive grid
- Hover effects (lift + shadow)
- Selected state with checkmark
- Category descriptions

### `AvatarUpload.tsx`
File upload with drag & drop:
- Drag & drop zone with visual feedback
- File type and size validation
- Preview with circular mask
- Error handling with clear messages
- "Choose Different" option

### `AvatarUrlInput.tsx`
URL input with validation:
- URL format validation
- Image loading test
- Live preview on validation
- Error states
- Helpful tips

## Design System

### Bento-Style UI

```css
/* Card Style */
rounded-2xl, rounded-3xl
shadow-sm, shadow-md, shadow-lg

/* Colors */
bg-white (cards)
bg-neutral-50 (backgrounds)
bg-neutral-100 (controls)

/* Spacing */
p-4, p-6, p-8 (generous padding)
gap-2, gap-3, gap-4

/* Interactive */
hover:-translate-y-1 (lift effect)
hover:shadow-md (depth on hover)
transition-all duration-200
```

### Avatar Display
- **Size**: 80px (inspector), 96px (canvas)
- **Shape**: Circular with border
- **Border**: 4px white border
- **Shadow**: shadow-lg for depth

## Storage

Avatars are stored in the block's props:

```typescript
{
  avatarUrl: string // Can be: data URL, http URL, or preset path
}
```

**Note**: The current implementation uses a simple string. Future versions could use:

```typescript
{
  avatar: {
    type: 'upload' | 'url' | 'preset',
    value: string
  }
}
```

## Preset Avatar Sources

Currently using **DiceBear API** for preset avatars as placeholders:
- `https://api.dicebear.com/7.x/bottts/...` (Bento style)
- `https://api.dicebear.com/7.x/avataaars-neutral/...` (Outline style)
- `https://api.dicebear.com/7.x/personas/...` (Others style)

### Adding Custom Presets

To use your own preset avatars:

1. **Add images to public folder**:
   ```
   public/avatars/
   ├── bento/
   │   ├── avatar-1.png
   │   ├── avatar-2.png
   │   └── ...
   ├── outline/
   │   └── ...
   └── others/
       └── ...
   ```

2. **Update AvatarGrid.tsx**:
   ```tsx
   const AVATAR_PRESETS = {
     bento: Array.from({ length: 12 }, (_, i) => ({
       id: `bento-${i + 1}`,
       url: `/avatars/bento/avatar-${i + 1}.png`,
       alt: `Bento Avatar ${i + 1}`,
     })),
     // ... other categories
   };
   ```

## Validation Rules

### File Upload
- ✅ Types: `image/jpeg`, `image/png`, `image/webp`
- ✅ Max size: 2MB (2,097,152 bytes)
- ❌ Rejected: Other file types, oversized files

### URL Input
- ✅ Protocol: `http://` or `https://`
- ✅ Image loading: Must successfully load as image
- ❌ Rejected: Invalid URLs, non-image URLs, unreachable URLs

## Browser Compatibility

- **FileReader API**: All modern browsers
- **Drag & Drop**: All modern browsers
- **Base64 encoding**: All browsers
- **localStorage**: All browsers (with 5-10MB limit)

## Performance Considerations

### Base64 Storage
- Uploaded images are converted to base64
- Base64 is ~33% larger than original
- localStorage has 5-10MB limit per domain
- Consider compression for production

### Image Loading
- URL validation loads image to test
- Preset avatars load on-demand
- Consider lazy loading for large preset grids

## Future Enhancements

- [ ] Image cropping/editing before upload
- [ ] Avatar removal option
- [ ] Recent avatars history
- [ ] Search presets
- [ ] More preset categories
- [ ] Integration with avatar services (Gravatar, etc.)
- [ ] Compression for uploaded images
- [ ] Backend storage instead of localStorage

## Accessibility

- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Alt text on images
- ✅ ARIA labels on buttons
- ✅ Screen reader friendly error messages

## Examples

### Upload Example
```tsx
// User drops file
handleFile(file) → validates → converts to base64 → preview → save
```

### URL Example
```tsx
// User pastes URL
validateUrl() → test image load → preview → save
```

### Preset Example
```tsx
// User clicks preset
onSelect(avatarUrl) → immediately updates → modal closes
```

---

**The Avatar Picker is production-ready and fully integrated! 🎉**

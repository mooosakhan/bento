# 🔄 Migration Guide - From Link-in-Bio to Portfolio Builder

## What's Changed?

BentoBuilder has evolved from a simple link-in-bio tool to a **full portfolio builder**. Here's what you need to know:

### ✅ Backwards Compatible

**Good news!** All your existing blocks still work:
- Header Block ✅
- Link Block ✅
- Card Block ✅
- Gallery Block ✅
- Divider Block ✅
- Social Row Block ✅

**Nothing breaks.** Your existing profiles continue to work exactly as before.

---

## 🆕 What's New

### New Block Types Available

You now have access to four new professional block types:

1. **Section Header** - Organize your profile into clear sections
2. **Skills** - Showcase your expertise with proficiency levels
3. **Experience** - Display your work history or education
4. **Projects** - Feature your portfolio projects

### Templates System

Skip the manual setup with pre-built templates:
- Developer template
- Designer template
- Student template
- Founder template

---

## 🚀 Upgrading Your Existing Profile

### Option 1: Enhance Your Current Profile (Recommended)

**Keep what you have and add portfolio blocks:**

1. Open your existing profile in the builder
2. Add new portfolio sections:
   ```
   Your existing blocks
   ↓
   + Section Header: "Skills"
   + Skills Block
   + Section Header: "Experience"  
   + Experience Block
   + Section Header: "Projects"
   + Projects Block
   ```
3. Reorder blocks by dragging
4. Your profile is now a full portfolio!

**Step-by-step:**
```
1. Go to /builder (your profile loads automatically)
2. Scroll to bottom of canvas
3. Click "Skills" block from left sidebar
4. Edit the skills in right sidebar
5. Continue adding more blocks
6. Done! Auto-saves as you go.
```

### Option 2: Start Fresh with a Template

**Replace your profile with a professional template:**

1. Click **"Templates"** button in header
2. Choose a template that fits your profile
3. Customize the pre-filled content
4. Your old blocks are replaced (can't undo)

⚠️ **Warning:** This replaces all blocks. Use "Option 1" to keep existing content.

---

## 📋 Migration Checklist

### For Link-in-Bio Users

If you were using BentoBuilder as a simple link-in-bio:

- [ ] Keep your Header block (update if needed)
- [ ] Keep your Link blocks (social media, websites)
- [ ] Add Section Header: "Links"
- [ ] Consider adding Skills block above links
- [ ] Add Projects block if you have work to show
- [ ] Keep Social Row at the bottom

**Result:** You go from basic link-in-bio to professional portfolio while keeping all your links!

### For Personal Website Users

If you were building a personal site:

- [ ] Keep your Header and intro Card blocks
- [ ] Add Section Headers to organize content
- [ ] Replace generic Card blocks with specific Experience/Projects blocks
- [ ] Add Skills block to highlight expertise
- [ ] Structure: Header → Skills → Experience → Projects → Links

**Result:** More structured, professional, and purpose-built for portfolios.

---

## 🎯 Recommended Structures

### Before (Link-in-Bio Style)
```
1. Header (Name, Bio)
2. Link (Portfolio Website)
3. Link (Resume PDF)
4. Link (GitHub)
5. Social Row
```

### After (Full Portfolio)
```
1. Header (Name, Bio, Location)
2. Section Header: "Skills"
3. Skills Block
4. Section Header: "Recent Work"
5. Projects Block (3 featured projects)
6. Section Header: "Links"
7. Link (Full Portfolio)
8. Link (Resume)
9. Social Row (GitHub, LinkedIn, etc.)
```

**Benefits:**
- Showcase work directly (no external clicks needed)
- Visitors see your skills immediately
- More professional and complete presentation
- Still has all your important links

---

## 💡 Tips for Smooth Transition

### Content Strategy

**Start with Skills:**
1. Add Skills block first (easiest to fill)
2. Choose 5-8 of your top skills
3. Be honest about proficiency levels
4. Use chips layout for many skills, grid for featured ones

**Then Experience:**
1. Add 2-3 most relevant positions
2. Focus on recent and impactful roles
3. Keep descriptions concise (2-3 sentences)
4. Highlight achievements, not just duties

**Finally Projects:**
1. Select 3-4 best projects to feature
2. Add images if available
3. Tag with relevant technologies
4. Include links to live demos or repos

### Design Consistency

**Make it cohesive:**
- Use Section Headers consistently
- Space out sections with Dividers if needed
- Keep color schemes simple (default looks great)
- Don't overload - quality over quantity

### Testing

**Before sharing widely:**
1. Preview on mobile and desktop
2. Click all links to verify they work
3. Check spelling and grammar
4. Ask a friend to review
5. Make sure /u/your-handle loads correctly

---

## 🔧 Technical Notes

### Data Structure

**Your profile structure in localStorage:**
```json
{
  "handle": "your-name",
  "displayName": "Your Name",
  "bio": "Your bio",
  "avatarUrl": "...",
  "theme": { ... },
  "blocks": [
    // Your existing blocks
    // + New portfolio blocks
  ],
  "portfolioMeta": {
    // Reserved for future features
  }
}
```

### Block IDs

- All existing blocks keep their IDs
- New blocks get unique IDs
- Reordering preserves IDs
- Duplicating creates new IDs

### Auto-Save

- Still saves after 1 second of inactivity
- Works with both old and new block types
- Check "Saved" indicator in header
- Manual save not needed

---

## 📊 Before & After Examples

### Example 1: Developer

**Before (Basic):**
```
Header: John Doe, Developer
Link: My Website
Link: GitHub
Link: LinkedIn
Social Row
```

**After (Portfolio):**
```
Header: John Doe, Full Stack Developer | San Francisco
Section Header: Skills
Skills: JavaScript (Adv), React (Adv), Node.js (Int), Python (Int)
Section Header: Experience  
Experience: Senior Dev at TechCo (2023-Present)
           Software Engineer at StartupInc (2021-2023)
Section Header: Featured Projects
Projects: 3 projects with images and tech stacks
Divider
Social Row: GitHub, LinkedIn, Twitter
```

### Example 2: Designer

**Before (Basic):**
```
Header: Jane Smith, Designer
Link: Portfolio Site
Link: Dribbble
Social Row
```

**After (Portfolio):**
```
Header: Jane Smith, Product Designer | New York
Section Header: What I Do
Skills: UI Design (Adv), UX Research (Adv), Figma (Adv)
Section Header: Featured Work
Projects: 3 case studies with images
Section Header: Experience
Experience: Design Lead at DesignCo (2022-Present)
Link: View Full Portfolio →
Social Row: Dribbble, Instagram, LinkedIn
```

---

## ✅ Migration Complete!

You're now running the upgraded portfolio builder with:

✨ All your existing content intact  
✨ New portfolio blocks available  
✨ Professional templates ready  
✨ Same auto-save, same URL, same simplicity  

**Start enhancing your profile today!** 🎉

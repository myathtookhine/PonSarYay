---
name: text-on-image-editor-phase1
description: >
  Build a complete Phase 1 Text-on-Image Editor web app using React + Vite + Tailwind CSS + Fabric.js.
  Trigger this skill whenever the user wants to: build or scaffold the image text editor app, add Myanmar font support,
  implement image crop functionality, add text tools (font picker, color, size), implement PNG/JPEG export,
  or work on any component of the text-on-image editor project. This skill covers the FULL Phase 1 scope:
  mobile-first responsive layout, Myanmar .ttf font integration with live preview panel, canvas-based
  text editing via Fabric.js, image cropping, and file export. Use this skill proactively whenever
  the user mentions any part of this editor project, even for small sub-tasks.
---

# Text-on-Image Editor — Phase 1 Build Skill

## 🎯 Project Overview

Build a **mobile-first**, production-ready **Text-on-Image Editor** web app.

**Core Features (Phase 1):**
1. Upload an image (JPG, PNG, WEBP)
2. Add & edit text layers on the canvas
3. Myanmar font (.ttf) support with live font preview panel
4. Text controls: font family, size, color, bold, italic, alignment, opacity, shadow
5. Image cropping tool
6. Export canvas as PNG or JPEG
7. Mobile-first responsive UI (works on phone, tablet, desktop)

**Future Phases (do NOT build yet):**
- User authentication
- Subscription plans
- Cloud storage

---

## 🏗️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | React 19 + Vite | Fast HMR, easy component structure |
| Styling | Tailwind CSS v3 | Mobile-first utility classes |
| Canvas Engine | **Fabric.js v6** | Text on canvas, transform, export |
| Image Crop | **react-image-crop** | Simple, mobile-friendly crop UI |
| Icons | lucide-react | Clean, consistent icons |
| Font Loading | FontFace API | Load .ttf fonts dynamically |
| File Export | Fabric canvas.toDataURL() | Built-in PNG/JPEG export |

---

## 📁 Project Structure

```
text-on-image-editor/
├── public/
│   └── fonts/                    # Myanmar .ttf font files go here
│       ├── NotoSansMyanmar.ttf
│       ├── Pyidaungsu.ttf
│       ├── Myanmar3.ttf
│       ├── Padauk.ttf
│       ├── ZawgyiOne.ttf
│       └── ... (more Myanmar fonts)
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── AppShell.jsx        # Main layout wrapper
│   │   │   └── Sidebar.jsx         # Tools panel (collapsible on mobile)
│   │   ├── Canvas/
│   │   │   ├── EditorCanvas.jsx    # Fabric.js canvas wrapper
│   │   │   ├── useCanvas.js        # Custom hook: canvas state + actions
│   │   │   └── CanvasToolbar.jsx   # Undo/Redo/Delete/Clear
│   │   ├── FontPicker/
│   │   │   ├── FontPicker.jsx      # Font selection panel
│   │   │   ├── FontPreviewCard.jsx # Individual font card with preview text
│   │   │   └── fonts.config.js     # Font list config (name, file, sample text)
│   │   ├── TextControls/
│   │   │   ├── TextControls.jsx    # Full text editing panel
│   │   │   ├── ColorPicker.jsx     # Text color + shadow color
│   │   │   └── TextStyleButtons.jsx # Bold, Italic, Underline, Align
│   │   ├── CropTool/
│   │   │   ├── CropModal.jsx       # Crop UI modal
│   │   │   └── useCrop.js          # Crop state hook
│   │   ├── ImageUploader/
│   │   │   └── ImageUploader.jsx   # Drag & drop + file picker
│   │   └── ExportPanel/
│   │       └── ExportPanel.jsx     # PNG/JPEG export with quality slider
│   └── utils/
│       ├── fontLoader.js           # Dynamic FontFace loader
│       ├── canvasExport.js         # Export helpers
│       └── imageHelpers.js         # Image resize/compress utils
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🚀 Step-by-Step Build Instructions

### STEP 1 — Project Scaffold

```bash
npm create vite@latest text-on-image-editor -- --template react
cd text-on-image-editor
npm install fabric react-image-crop lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**tailwind.config.js:**
```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

**index.css** (add at top):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### STEP 2 — Myanmar Font Configuration

Read `references/myanmar-fonts.md` for the full font list and download sources.

**src/components/FontPicker/fonts.config.js:**
```js
// Each entry: { id, name, file, previewText, category }
// previewText should be a Myanmar sentence that shows the font well
// category: 'unicode' | 'zawgyi'
export const MYANMAR_FONTS = [
  {
    id: 'noto-sans-myanmar',
    name: 'Noto Sans Myanmar',
    file: '/fonts/NotoSansMyanmar.ttf',
    previewText: 'မြန်မာစာ လှပသည်',
    category: 'unicode',
  },
  {
    id: 'pyidaungsu',
    name: 'Pyidaungsu',
    file: '/fonts/Pyidaungsu.ttf',
    previewText: 'မြန်မာစာ လှပသည်',
    category: 'unicode',
  },
  // ... see references/myanmar-fonts.md for full list
];

// Also include common English/decorative fonts for mixed text
export const LATIN_FONTS = [
  { id: 'inter', name: 'Inter', file: null, previewText: 'Hello World', category: 'latin' },
  { id: 'playfair', name: 'Playfair Display', file: null, previewText: 'Hello World', category: 'latin' },
];
```

**src/utils/fontLoader.js:**
```js
const loadedFonts = new Set();

export async function loadFont(fontConfig) {
  if (!fontConfig.file || loadedFonts.has(fontConfig.id)) return;
  
  try {
    const font = new FontFace(fontConfig.name, `url(${fontConfig.file})`);
    await font.load();
    document.fonts.add(font);
    loadedFonts.add(fontConfig.id);
  } catch (err) {
    console.warn(`Font load failed: ${fontConfig.name}`, err);
  }
}

export async function loadAllFonts(fontList) {
  await Promise.allSettled(fontList.map(loadFont));
}
```

---

### STEP 3 — Font Preview Panel Component

**FontPreviewCard.jsx** — Each card renders the font name using that actual font:

```jsx
// Key UX: Show preview text IN the font itself
// Show font category badge (Unicode / Zawgyi)
// Selected state with ring highlight
// Lazy-load the font only when card becomes visible (IntersectionObserver)
```

**FontPicker.jsx** layout:
- Search/filter input at top
- Category tabs: All | Unicode | Zawgyi | Latin
- Grid of FontPreviewCards (2 columns mobile, 3 tablet, 4 desktop)
- Selected font gets highlighted ring
- On select → call `onFontChange(fontConfig)`

---

### STEP 4 — Canvas Engine (Fabric.js)

**useCanvas.js** — Custom hook that manages all canvas state:

Key functions to expose:
```js
// Canvas setup
initCanvas(canvasEl, width, height)
loadImage(file)           // Load background image
setCropMode(bool)         // Toggle crop mode

// Text operations
addTextLayer()            // Add new IText object
updateSelectedText(props) // Update font, size, color, etc.
deleteSelected()
duplicateSelected()

// History
undo()
redo()

// Export
exportAs(format, quality) // 'png' | 'jpeg', 0-1

// State
selectedObject            // Currently selected Fabric object
canUndo, canRedo
```

**EditorCanvas.jsx:**
- Canvas fills available space responsively
- On mobile: canvas takes full width, toolbar slides up from bottom
- On desktop: canvas is center, sidebars on left/right
- Touch events must work (Fabric.js supports touch by default)

---

### STEP 5 — Text Controls Panel

Controls to include (in order of importance):

```
1. Font Family    → FontPicker dropdown/panel
2. Font Size      → Slider (8px - 200px) + number input
3. Text Color     → Color swatch grid + hex input
4. Bold / Italic / Underline → Toggle buttons
5. Text Alignment → Left / Center / Right / Justify
6. Letter Spacing → Slider (-5 to 20)
7. Line Height    → Slider (1.0 to 3.0)
8. Opacity        → Slider (0-100%)
9. Text Shadow    → Toggle + shadow color + blur + offset
10. Stroke/Outline → Toggle + stroke color + stroke width
```

**On mobile:** Collapse into bottom sheet / drawer  
**On desktop:** Show in right sidebar panel

---

### STEP 6 — Crop Tool

Use `react-image-crop` library.

Flow:
1. User clicks "Crop" button
2. CropModal opens with the current background image
3. User draws crop region
4. Aspect ratio presets: Free | 1:1 | 4:3 | 16:9 | 9:16
5. "Apply Crop" → update background image in Fabric canvas
6. All existing text layers remain in relative position

---

### STEP 7 — Export Panel

```jsx
// ExportPanel.jsx
// Format toggle: PNG | JPEG
// Quality slider (JPEG only): 60% - 100%
// Size multiplier: 1x | 2x | 3x (for high-res export)
// Preview: show estimated file size
// Export button → triggers download
```

Export implementation:
```js
// canvasExport.js
export function exportCanvas(canvas, format = 'png', quality = 0.92, multiplier = 1) {
  const dataURL = canvas.toDataURL({
    format,
    quality,
    multiplier,
  });
  
  const link = document.createElement('a');
  link.download = `edited-image.${format}`;
  link.href = dataURL;
  link.click();
}
```

---

### STEP 8 — Mobile-First Responsive Layout

**AppShell.jsx layout strategy:**

```
MOBILE (< 768px):
┌─────────────────────────┐
│  TopBar: Logo + Actions  │
├─────────────────────────┤
│                         │
│      Canvas Area        │
│    (full width)         │
│                         │
├─────────────────────────┤
│  Bottom Toolbar         │  ← Tab bar: Text | Fonts | Crop | Export
└─────────────────────────┘
   ↑ Bottom sheet slides up when tab selected

TABLET (768px - 1024px):
┌──────┬──────────────┐
│Tools │              │
│Panel │   Canvas     │
│      │              │
└──────┴──────────────┘

DESKTOP (> 1024px):
┌──────┬──────────────┬──────────┐
│Font  │              │  Text    │
│Panel │   Canvas     │ Controls │
│      │              │          │
└──────┴──────────────┴──────────┘
```

---

## ⚠️ Critical Implementation Notes

1. **Zawgyi vs Unicode**: Many Myanmar users have Zawgyi-encoded text in their clipboard. Add a note/toggle in the UI. Do NOT auto-convert — let the user choose.

2. **Canvas resize on mobile**: When device rotates or window resizes, call `canvas.setDimensions()` and recalculate object positions.

3. **Font loading race condition**: Always `await loadFont(font)` before applying it to a Fabric text object, or the font won't render.

4. **Fabric.js v6 import**: Use `import { Canvas, IText, Image } from 'fabric'` (named imports), not the old `import { fabric }` default import.

5. **Image quality**: When user uploads a large image, resize to max 2000px on the longest side before loading into canvas (for performance), but export at original quality using multiplier.

6. **iOS Safari**: Test touch scrolling inside bottom sheet. Add `touch-action: none` on canvas to prevent scroll interference.

---

## 🎨 UI/UX Design Guidelines

- **Color palette**: Dark theme preferred (easier to see text on images)
  - Background: `#0f0f0f`
  - Panels: `#1a1a1a`
  - Borders: `#2d2d2d`
  - Accent: `#f97316` (orange — energetic, creative)
  - Text: `#f5f5f5`

- **Typography for UI**: Use `IBM Plex Sans` for the app UI itself (not for canvas content)

- **Animations**: Smooth panel slide-ins, subtle hover states, loading skeleton for font cards

- **Empty state**: When no image is loaded, show a welcoming drag-and-drop zone with Myanmar + English instructions

---

## ✅ Phase 1 Completion Checklist

- [ ] Image upload (drag & drop + file picker)
- [ ] Fabric.js canvas initialized and responsive
- [ ] Add text layer button
- [ ] Font picker with Myanmar font previews (min 5 fonts)
- [ ] Font size control
- [ ] Text color control
- [ ] Bold / Italic / Underline
- [ ] Text alignment
- [ ] Text shadow
- [ ] Text stroke/outline
- [ ] Opacity control
- [ ] Layer management (select, delete, duplicate)
- [ ] Undo / Redo
- [ ] Image crop (react-image-crop)
- [ ] Export as PNG
- [ ] Export as JPEG with quality control
- [ ] Mobile layout with bottom sheet
- [ ] Desktop layout with sidebars
- [ ] All touch interactions work on mobile

---

## 📚 Reference Files

- `references/myanmar-fonts.md` — Full Myanmar font list, download URLs, Unicode vs Zawgyi guide
- `references/fabric-patterns.md` — Common Fabric.js v6 patterns and gotchas
- `references/mobile-canvas.md` — Mobile canvas tips, touch event handling

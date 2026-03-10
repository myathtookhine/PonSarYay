# Agent Prompts — Text-on-Image Editor Phase 1
# Use these prompts in sequence with a coding agent (Claude Code, Cursor, etc.)

---

## 🟢 PROMPT 1 — Project Scaffold & Setup

```
You are building a mobile-first Text-on-Image Editor web app (Phase 1).

Tech stack:
- React 19 + Vite
- Tailwind CSS v3
- Fabric.js v6 (canvas engine)
- react-image-crop (crop tool)
- lucide-react (icons)

Tasks:
1. Scaffold the project with `npm create vite@latest text-on-image-editor -- --template react`
2. Install all dependencies: `npm install fabric react-image-crop lucide-react`
3. Install dev deps: `npm install -D tailwindcss postcss autoprefixer`
4. Initialize Tailwind: `npx tailwindcss init -p`
5. Configure tailwind.config.js content paths for ./src/**/*.{js,jsx}
6. Add @tailwind directives to index.css
7. Create the full directory structure:
   - src/components/Layout/
   - src/components/Canvas/
   - src/components/FontPicker/
   - src/components/TextControls/
   - src/components/CropTool/
   - src/components/ImageUploader/
   - src/components/ExportPanel/
   - src/utils/
   - public/fonts/

8. Create a placeholder README.md listing all planned features.
9. Verify `npm run dev` works and shows the default Vite React page.

Do NOT build any feature logic yet. Just scaffold and verify it boots.
```

---

## 🟢 PROMPT 2 — Myanmar Font Config & Loader

```
Continue building the Text-on-Image Editor. The project is scaffolded and running.

Now implement Myanmar font support:

1. Create `src/components/FontPicker/fonts.config.js` with an array of font objects:
   Each font object must have: { id, name, file, previewText, category }
   Include these fonts:
   - Noto Sans Myanmar (Unicode) - previewText: "မြန်မာ စာလုံး"
   - Pyidaungsu (Unicode) - previewText: "မင်္ဂလာပါ"
   - Myanmar3 (Unicode) - previewText: "ကောင်းသောနေ့"
   - Padauk (Unicode) - previewText: "ဒစ်ဂျစ်တယ် အနုပညာ"
   - ZawGyiOne (Zawgyi) - previewText: "ျမန္မာ စာလံုး"
   - Inter (Latin, no file) - previewText: "Hello World"
   - Playfair Display (Latin, no file) - previewText: "Beautiful Text"

2. Create `src/utils/fontLoader.js`:
   - Export `loadFont(fontConfig)` — uses FontFace API to load .ttf from /fonts/
   - Track loaded fonts in a Set to avoid reloading
   - Export `loadAllFonts(fontList)` — loads all using Promise.allSettled
   - Handle errors gracefully (warn but don't throw)

3. Create a simple test: in App.jsx, call loadAllFonts on mount and console.log which fonts loaded successfully.

4. Add placeholder .ttf files note in public/fonts/README.txt explaining where to download each font.

The font files themselves don't need to be present yet — just make the loader robust to missing files.
```

---

## 🟢 PROMPT 3 — Font Preview Panel UI

```
Continue building the Text-on-Image Editor.

Now build the Font Picker UI component with live font preview:

1. Create `src/components/FontPicker/FontPreviewCard.jsx`:
   - Props: { font, isSelected, onSelect }
   - Renders a card showing:
     * font.previewText in the ACTUAL font (fontFamily style set to font.name)
     * font.name label below in small gray text
     * Category badge: "Unicode" (green) | "Zawgyi" (orange) | "Latin" (blue)
   - Selected state: ring-2 ring-orange-500 border
   - Hover state: subtle background change
   - On mount: call loadFont(font) so the preview renders in the correct font
   - Show a skeleton/placeholder while font is loading

2. Create `src/components/FontPicker/FontPicker.jsx`:
   - Props: { selectedFont, onFontChange }
   - State: searchQuery, activeCategory ('all' | 'unicode' | 'zawgyi' | 'latin')
   - UI layout:
     * Search input at top ("Font ရှာရန်..." placeholder)
     * Category filter tabs: All | Unicode | Zawgyi | Latin
     * Scrollable grid of FontPreviewCards (2 cols mobile, 3 cols md, 4 cols lg)
   - Filter fonts based on search + category
   - When a font card is clicked → call onFontChange(font)

3. Add FontPicker to App.jsx temporarily to verify it renders and previews work.

Use dark theme: bg-[#1a1a1a], text-gray-100, border-[#2d2d2d] for all panels.
```

---

## 🟢 PROMPT 4 — Canvas Engine & Image Upload

```
Continue building the Text-on-Image Editor.

Now implement the core canvas engine using Fabric.js v6:

IMPORTANT: Use Fabric.js v6 named imports:
  import { Canvas, IText, FabricImage, Shadow } from 'fabric';
NOT the old `import { fabric } from 'fabric'` pattern.

1. Create `src/components/Canvas/useCanvas.js` (custom hook):
   Expose these functions and state:
   - initCanvas(canvasEl) — initialize Fabric.js Canvas
   - loadImage(file) — load File as background image, scale to fit canvas
   - addText(text, fontConfig) — add editable IText layer at center
   - updateSelectedObject(props) — update active object properties
   - deleteSelected() — remove active object
   - duplicateSelected() — clone active object with offset
   - undo() / redo() — history management (stack-based, max 50 states)
   - exportAs(format, quality, multiplier) — toDataURL and trigger download
   - State: activeObject, canUndo, canRedo, hasImage

2. Create `src/components/ImageUploader/ImageUploader.jsx`:
   - Full-width drag-and-drop zone when no image loaded
   - Shows: upload icon + "ဓာတ်ပုံ တင်ရန် ဆွဲချပါ သို့ နှိပ်ပါ" text (Myanmar)
   - Also accepts click to open file picker (accept: image/*)
   - On file select → call onImageLoad(file)
   - Mobile-friendly large tap target

3. Create `src/components/Canvas/EditorCanvas.jsx`:
   - Renders <canvas> element
   - Calls initCanvas on mount
   - Container div is responsive (100% width, auto height)
   - On window/container resize → resize canvas maintaining aspect ratio
   - Show ImageUploader overlay when no image loaded

4. Wire up in App.jsx: ImageUploader → loadImage → canvas shows image

Test that: image loads, fills canvas properly on both mobile and desktop widths.
```

---

## 🟢 PROMPT 5 — Text Controls Panel

```
Continue building the Text-on-Image Editor.

Now build the full text editing controls:

1. Create `src/components/TextControls/ColorPicker.jsx`:
   - Props: { value, onChange, label }
   - Preset color swatches grid (12 colors: white, black, yellow, red, blue, green, orange, pink, purple, cyan, gold, coral)
   - Custom hex input field
   - Transparent option
   - Shows current color swatch

2. Create `src/components/TextControls/TextStyleButtons.jsx`:
   - Props: { bold, italic, underline, align, onChange }
   - Bold / Italic / Underline toggle buttons (icon + accessible label)
   - Text alignment: Left / Center / Right icons

3. Create `src/components/TextControls/TextControls.jsx`:
   - Props: { canvas, activeObject } (or use context)
   - Shows all controls (disable/gray-out when no text object selected):
     * Font size: range slider (8-200) + number input
     * Text color: ColorPicker
     * Bold / Italic / Underline / Alignment buttons
     * Letter spacing slider (-5 to 20)
     * Line height slider (1.0 to 3.0) 
     * Opacity slider (0-100%)
     * Shadow toggle:
       - When on: shadow color picker + blur slider + X/Y offset sliders
     * Stroke/Outline toggle:
       - When on: stroke color picker + stroke width slider (1-20px)
   - All changes call canvas.updateSelectedObject() immediately (live preview)
   - Group related controls with subtle section headers

4. Create `src/components/Canvas/CanvasToolbar.jsx`:
   - "စာသား ထည့်ရန်" (Add Text) button
   - Undo / Redo buttons (with disabled state)
   - Delete selected button
   - Duplicate button

Use consistent dark theme styling throughout.
All slider labels must show current value.
All controls must be finger-friendly (min 44px touch target) on mobile.
```

---

## 🟢 PROMPT 6 — Crop Tool

```
Continue building the Text-on-Image Editor.

Now implement the image crop tool using react-image-crop:

1. Create `src/components/CropTool/useCrop.js`:
   - State: isCropMode, cropData
   - Functions: openCrop(), applyCrop(canvas, cropData), cancelCrop()
   - applyCrop should: crop the image using Canvas 2D API, then reload it as background in Fabric.js

2. Create `src/components/CropTool/CropModal.jsx`:
   - Props: { imageUrl, onApply, onCancel }
   - Shows react-image-crop component in a full-screen modal
   - Aspect ratio presets toolbar: Free | 1:1 | 4:3 | 16:9 | 9:16
     (buttons at top of modal, tap to change aspect)
   - Bottom action bar: "မပြုလုပ်ပါ" (Cancel) | "အတိုင်းအတာဖြတ်ရန်" (Apply Crop)
   - On mobile: modal is full-screen. On desktop: centered dialog with max-w-2xl.

3. Add "Crop" button to the main toolbar
4. Crop flow:
   - User clicks Crop → extract current background image URL → open CropModal
   - User adjusts crop → clicks Apply
   - Cropped image replaces background in canvas
   - Text layers remain (they may shift — that's acceptable for Phase 1)

Note: react-image-crop v11+ uses `useRef` + `ReactCrop` component pattern.
Import: `import ReactCrop from 'react-image-crop'; import 'react-image-crop/dist/ReactCrop.css';`
```

---

## 🟢 PROMPT 7 — Export Panel

```
Continue building the Text-on-Image Editor.

Now build the export functionality:

1. Create `src/utils/canvasExport.js`:
   - Export `downloadCanvas(canvas, options)`:
     * options: { format: 'png'|'jpeg', quality: 0-1, multiplier: 1|2|3 }
     * Use Fabric canvas.toDataURL()
     * Trigger browser download with filename: `edited-[timestamp].[format]`
   - Export `estimateFileSize(canvas, options)` → returns string like "~245 KB"
     (rough estimate based on canvas pixel count × format compression ratio)

2. Create `src/components/ExportPanel/ExportPanel.jsx`:
   - Format toggle: [PNG] [JPEG] (styled tab buttons)
   - Quality slider (only show for JPEG): 60% to 100%, default 90%
   - Resolution multiplier: [1x] [2x] [3x] (1x = screen size, 2x/3x = higher res)
   - Live estimated file size display (updates as settings change)
   - Large "💾 PNG ဒေါင်းလုဒ်" / "💾 JPEG ဒေါင်းလုဒ်" export button
   - Disabled state with tooltip if no image is loaded
   - After export: brief success toast "ဒေါင်းလုဒ် အောင်မြင်သည်!"

3. Add simple toast notification system (no library needed, just CSS animation):
   - Shows at bottom center of screen
   - Auto-dismisses after 2.5 seconds
```

---

## 🟢 PROMPT 8 — Responsive Layout Assembly

```
Continue building the Text-on-Image Editor.

Now assemble all components into the final responsive layout:

1. Create `src/components/Layout/AppShell.jsx`:
   MOBILE layout (< 768px):
   - Top bar: app logo/name "MyanText Editor" + language indicator
   - Canvas area: full width, ~65vh height  
   - Bottom tab bar with 4 tabs: 
     * "စာသား" (Text tools - TextControls)
     * "ဖောင့်" (Fonts - FontPicker)
     * "ဖြတ်ရန်" (Crop)
     * "သိမ်းရန်" (Export)
   - Active tab opens a bottom sheet (slides up 55vh with drag handle)
   - Bottom sheet has close button and smooth animation

   TABLET layout (768px - 1024px):
   - Left sidebar (280px): FontPicker + CanvasToolbar
   - Center: EditorCanvas
   - Bottom panel: TextControls (collapsible)

   DESKTOP layout (> 1024px):
   - Left panel (260px): FontPicker
   - Center: EditorCanvas + CanvasToolbar above
   - Right panel (280px): TextControls + ExportPanel

2. Create `src/components/Layout/Sidebar.jsx`:
   - Collapsible sidebar wrapper used on desktop
   - Smooth width transition when collapsed/expanded
   - Collapse button (arrow icon)

3. Final App.jsx assembly:
   - AppShell wraps everything
   - Pass canvas state/actions via React Context (create CanvasContext)
   - All components communicate through context

4. Add app-level dark background: `bg-[#0f0f0f] min-h-screen`

5. Test the complete flow end-to-end:
   Upload image → Add text → Change font (Myanmar preview) → Change color/size
   → Crop image → Export as PNG → Export as JPEG
   
   Verify on: mobile 375px width, tablet 768px, desktop 1280px
```

---

## 🟢 PROMPT 9 — Polish & Bug Fixes

```
Continue building the Text-on-Image Editor. The app is feature-complete.

Now do a polish pass:

1. Empty states:
   - No image loaded: welcoming drag-drop zone, instructions in Myanmar + English
   - No text selected: TextControls shows "စာသား တစ်ခုကို ရွေးချယ်ပါ" placeholder
   - No fonts loaded: font cards show loading skeletons

2. Loading states:
   - Font preview cards: show skeleton animation while font loads
   - Image loading: show progress indicator on canvas

3. Error handling:
   - Font file not found: show "Font မရရှိနိုင်ပါ" badge, fallback to system font
   - Image too large: show warning if > 10MB, suggest resize
   - Export fails: show error toast

4. Accessibility:
   - All buttons have aria-label
   - Keyboard navigation works for main actions
   - Focus visible styles

5. Performance:
   - Debounce slider updates (16ms) to avoid too many canvas redraws
   - Font preview cards use IntersectionObserver to lazy-load fonts

6. Final visual QA:
   - Dark theme consistent throughout
   - No layout overflow on mobile 320px width
   - Touch targets all ≥ 44px
   - Bottom sheet doesn't block the canvas completely on small phones
   - Export button is prominent and easy to find

7. Add version footer: "MyanText Editor v1.0 — Phase 1"

Run the app and do a final walkthrough of the full user journey.
```

---

## 💡 Tips for Using These Prompts

- Run prompts **in order** — each one builds on the previous
- After each prompt, **test in browser** before moving to next
- Use prompts in **Claude Code**, **Cursor**, or **GitHub Copilot Chat**
- If a step fails, paste the error into the agent and say "Fix this error and continue"
- Myanmar font .ttf files must be **manually downloaded** and placed in `public/fonts/`
  (agents cannot download external binary files)

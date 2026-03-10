# Fabric.js v6 Patterns & Gotchas

## Correct Import (v6)
```js
// ✅ v6 named imports
import { Canvas, IText, FabricImage, Rect, Shadow } from 'fabric';

// ❌ OLD v5 style — DO NOT USE
import { fabric } from 'fabric';
```

## Initialize Canvas
```js
const canvas = new Canvas('canvas-id', {
  width: 800,
  height: 600,
  selection: true,
  preserveObjectStacking: true,
});
```

## Load Background Image
```js
async function loadBackgroundImage(canvas, file) {
  const url = URL.createObjectURL(file);
  const img = await FabricImage.fromURL(url);
  
  // Scale to fit canvas
  const scale = Math.min(
    canvas.width / img.width,
    canvas.height / img.height
  );
  
  img.set({
    scaleX: scale,
    scaleY: scale,
    originX: 'center',
    originY: 'center',
    left: canvas.width / 2,
    top: canvas.height / 2,
    selectable: false,  // Background not selectable
    evented: false,
  });
  
  canvas.backgroundImage = img;
  canvas.renderAll();
}
```

## Add Text Layer
```js
function addText(canvas, text = 'မြန်မာ စာသား', fontConfig) {
  const textObj = new IText(text, {
    left: canvas.width / 2,
    top: canvas.height / 2,
    originX: 'center',
    originY: 'center',
    fontFamily: fontConfig?.name || 'Noto Sans Myanmar',
    fontSize: 40,
    fill: '#ffffff',
    textAlign: 'center',
    editable: true,
  });
  
  canvas.add(textObj);
  canvas.setActiveObject(textObj);
  canvas.renderAll();
}
```

## Update Selected Text Properties
```js
function updateSelectedText(canvas, props) {
  const obj = canvas.getActiveObject();
  if (!obj || obj.type !== 'i-text') return;
  
  obj.set(props); // { fontSize, fill, fontFamily, fontWeight, etc. }
  canvas.renderAll();
}
```

## Add Text Shadow
```js
const shadow = new Shadow({
  color: 'rgba(0,0,0,0.8)',
  blur: 10,
  offsetX: 3,
  offsetY: 3,
});
textObj.set('shadow', shadow);
```

## Add Text Stroke/Outline
```js
textObj.set({
  stroke: '#000000',
  strokeWidth: 2,
  paintFirst: 'stroke', // Stroke behind fill
});
```

## Undo/Redo Pattern
```js
// Simple stack-based history
const history = [];
let historyIndex = -1;

function saveState(canvas) {
  // Remove forward history
  history.splice(historyIndex + 1);
  history.push(JSON.stringify(canvas.toJSON()));
  historyIndex = history.length - 1;
}

async function undo(canvas) {
  if (historyIndex <= 0) return;
  historyIndex--;
  await canvas.loadFromJSON(JSON.parse(history[historyIndex]));
  canvas.renderAll();
}

async function redo(canvas) {
  if (historyIndex >= history.length - 1) return;
  historyIndex++;
  await canvas.loadFromJSON(JSON.parse(history[historyIndex]));
  canvas.renderAll();
}
```

## Export Canvas
```js
function exportCanvas(canvas, format = 'png', quality = 0.92) {
  const dataURL = canvas.toDataURL({
    format,           // 'png' | 'jpeg'
    quality,          // 0-1 (jpeg only)
    multiplier: 2,    // 2x for retina quality
  });
  
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = `image.${format}`;
  a.click();
}
```

## Responsive Canvas Resize
```js
function resizeCanvas(canvas, container) {
  const { width, height } = container.getBoundingClientRect();
  const ratio = canvas.height / canvas.width;
  
  canvas.setDimensions({ width, height: width * ratio });
  canvas.setZoom(width / ORIGINAL_CANVAS_WIDTH);
  canvas.renderAll();
}

// Call on window resize
const observer = new ResizeObserver(() => resizeCanvas(canvas, containerEl));
observer.observe(containerEl);
```

## Touch Support (Mobile)
Fabric.js has built-in touch support. Enable it:
```js
const canvas = new Canvas('id', {
  allowTouchScrolling: false, // Prevent page scroll when touching canvas
});
```

Add to canvas element CSS:
```css
canvas { touch-action: none; }
```

## Font Apply + Render Pattern
```js
// ALWAYS await font load before applying
async function applyFont(canvas, fontConfig) {
  const obj = canvas.getActiveObject();
  if (!obj) return;
  
  if (fontConfig.file) {
    const face = new FontFace(fontConfig.name, `url(${fontConfig.file})`);
    await face.load();
    document.fonts.add(face);
  }
  
  obj.set('fontFamily', fontConfig.name);
  canvas.renderAll(); // Only after font is loaded
}
```

## Common Gotchas

1. **Font not rendering**: Always `await` font load before `canvas.renderAll()`
2. **Selection bounding box wrong after font change**: Call `obj.initDimensions()` then `canvas.renderAll()`
3. **Export cuts off shadows**: Increase canvas padding or use `canvas.toDataURL({ multiplier: 1.2 })`
4. **Image quality loss on mobile**: Set `devicePixelRatio` multiplier: `canvas.toDataURL({ multiplier: window.devicePixelRatio })`
5. **Fabric v6 breaking change**: `fabric.Image.fromURL` is now `FabricImage.fromURL` (async/await style)

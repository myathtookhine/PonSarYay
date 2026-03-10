# Myanmar Fonts Reference

## Recommended Myanmar Unicode Fonts

| Font Name | File | Source | Notes |
|---|---|---|---|
| Noto Sans Myanmar | NotoSansMyanmar-Regular.ttf | Google Fonts | Best Unicode compatibility |
| Noto Sans Myanmar Bold | NotoSansMyanmar-Bold.ttf | Google Fonts | Bold variant |
| Pyidaungsu | Pyidaungsu.ttf | govt.mm | Official Myanmar govt font |
| Myanmar3 | Myanmar3.ttf | myanmar3.net | Popular Unicode font |
| Padauk | Padauk-Regular.ttf | SIL International | Free, widely supported |
| Padauk Bold | Padauk-Bold.ttf | SIL International | Bold variant |
| TharLon | TharLon.ttf | SIL International | Clean modern look |

## Download Sources

- Google Fonts Myanmar: https://fonts.google.com/?subset=myanmar
- SIL Fonts: https://software.sil.org/fonts/
- Myanmar NLP fonts: https://github.com/ye-kyaw-thu/myFont

## Font Preview Sample Texts

Use these Myanmar phrases for font preview cards:
- `"မြန်မာ စာလုံး"` — "Myanmar letters"
- `"မင်္ဂလာပါ"` — "Hello / Welcome"  
- `"ကောင်းသောနေ့"` — "Good day"
- `"ဒစ်ဂျစ်တယ် အနုပညာ"` — "Digital art"
- `"ဗမာစကား"` — "Burmese language"

Pick the one that best shows the font's character rendering.

## Font Categories for UI

```js
export const FONT_CATEGORIES = {
  UNICODE: 'unicode',    // Modern, correct
  ZAWGYI: 'zawgyi',     // Legacy encoding
  LATIN: 'latin',        // English/decorative
  DECORATIVE: 'decorative', // Stylized/fancy
};
```

## Loading Fonts Dynamically (Fabric.js compatible)

```js
// Always load font BEFORE using it in Fabric.js
async function applyFontToObject(fabricObject, fontConfig) {
  if (fontConfig.file) {
    const fontFace = new FontFace(fontConfig.name, `url(${fontConfig.file})`);
    const loaded = await fontFace.load();
    document.fonts.add(loaded);
  }
  fabricObject.set('fontFamily', fontConfig.name);
  fabricObject.canvas?.renderAll();
}
```

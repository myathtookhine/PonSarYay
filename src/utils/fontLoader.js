const loadedFonts = new Set();

export async function loadFont(fontConfig) {
  if (!fontConfig?.file || loadedFonts.has(fontConfig.id)) return;

  try {
    const font = new FontFace(fontConfig.name, `url(${fontConfig.file})`);
    await font.load();
    document.fonts.add(font);
    loadedFonts.add(fontConfig.id);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`Font load failed: ${fontConfig.name}`, err);
  }
}

export async function loadAllFonts(fontList) {
  await Promise.allSettled(fontList.map(loadFont));
}


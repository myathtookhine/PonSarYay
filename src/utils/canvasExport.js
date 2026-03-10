export function exportCanvas(canvas, format = 'png', quality = 0.92, multiplier = 1) {
  const options = { format, quality, multiplier };

  // Crop export to just the background image area (remove extra canvas padding)
  if (canvas.backgroundImage) {
    const bg = canvas.backgroundImage;
    const bgWidth = (bg.width || 0) * (bg.scaleX || 1);
    const bgHeight = (bg.height || 0) * (bg.scaleY || 1);

    let bgLeft, bgTop;
    if (bg.originX === 'center') {
      bgLeft = (bg.left || 0) - bgWidth / 2;
    } else {
      bgLeft = bg.left || 0;
    }
    if (bg.originY === 'center') {
      bgTop = (bg.top || 0) - bgHeight / 2;
    } else {
      bgTop = bg.top || 0;
    }

    if (bgWidth > 0 && bgHeight > 0) {
      options.left = bgLeft;
      options.top = bgTop;
      options.width = bgWidth;
      options.height = bgHeight;
    }
  }

  const dataURL = canvas.toDataURL(options);

  const link = document.createElement('a');
  link.download = `edited-image.${format}`;
  link.href = dataURL;
  link.click();
}


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

  try {
    // Convert base64 data to Blob to avoid long data URI limits on mobile browsers
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    const blob = new Blob([ab], { type: mimeString });
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.download = `edited-image.${format}`;
    link.href = blobUrl;
    
    document.body.appendChild(link); // Required for some mobile browsers
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 1000);
    
  } catch (error) {
    console.error("Failed to download image from blob, falling back to data URL:", error);
    // Fallback if Blob creation fails for some reason
    const link = document.createElement('a');
    link.download = `edited-image.${format}`;
    link.href = dataURL;
    link.click();
  }
}


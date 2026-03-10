export function createObjectUrlImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function resizeImageToMax(image, maxSize) {
  const { width, height } = image;
  const longest = Math.max(width, height);
  if (longest <= maxSize) return Promise.resolve(image);

  const ratio = maxSize / longest;
  const canvas = document.createElement('canvas');
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        reject(new Error('Canvas to Blob failed'));
        return;
      }
      const url = URL.createObjectURL(blob);
      const resized = new Image();
      resized.onload = () => resolve(resized);
      resized.onerror = reject;
      resized.src = url;
    }, 'image/png');
  });
}


import { useState } from 'react';

export function useCrop() {
  const [crop, setCrop] = useState({ unit: '%', x: 10, y: 10, width: 80, height: 80 });
  const [imageSrc, setImageSrc] = useState(null);

  return {
    crop,
    setCrop,
    imageSrc,
    setImageSrc,
  };
}


import React, { useEffect, useRef } from 'react';
import { ImageUploader } from '../ImageUploader/ImageUploader.jsx';

export function EditorCanvas({ canvasApi }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const parent = container.parentElement;
    
    const { width, height } = parent.getBoundingClientRect();
    canvasApi.initCanvas(container, width, height);

    const resizeObserver = new ResizeObserver(() => {
      // Debounce slightly or just let it fire; Fabric handles multiple resizes gracefully
      canvasApi.resizeCanvas();
    });
    
    resizeObserver.observe(parent);

    return () => {
      resizeObserver.disconnect();
    };
  }, [canvasApi]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-neutral-950 p-3 min-h-[50dvh] md:min-h-0 overflow-hidden">
      <div className="relative w-full h-full max-w-4xl max-h-[80vh] border border-neutral-800 canvas-grid-bg flex items-center justify-center overflow-hidden">
        {!canvasApi.hasImage && (
          <div className="absolute inset-4 z-10 flex items-center justify-center pointer-events-auto">
            <div className="max-w-sm w-full">
              <ImageUploader onImageLoaded={canvasApi.loadImage} />
            </div>
          </div>
        )}
        <div ref={containerRef} className="w-full h-full touch-none block" />
      </div>
    </div>
  );
}


import React, { useEffect, useRef } from 'react';
import { ImageUploader } from '../ImageUploader/ImageUploader.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { Loader2 } from 'lucide-react';

export function EditorCanvas({ canvasApi }) {
  const containerRef = useRef(null);
  const { t } = useLanguage();

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
    <div className="flex-1 flex flex-col items-center justify-center bg-neutral-950 p-1.5 md:p-3 min-h-0 overflow-hidden">
      <div className="relative w-full h-full max-w-4xl max-h-[80vh] border border-neutral-800 canvas-grid-bg flex items-center justify-center overflow-hidden">
        {!canvasApi.hasImage && (
          <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto">
            <ImageUploader onImageLoaded={canvasApi.loadImage} errorMessage={canvasApi.uploadError} />
          </div>
        )}

        {canvasApi.isLoading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center p-6 bg-neutral-900 rounded-2xl border border-neutral-700 shadow-2xl">
              <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-3" />
              <div className="text-xs font-bold text-white uppercase tracking-widest whitespace-nowrap">
                {t('uploading...')}
              </div>
            </div>
          </div>
        )}

        <div ref={containerRef} className="w-full h-full touch-none block" />
      </div>
    </div>
  );
}


import React, { useEffect, useState } from 'react';
import { loadFont } from '../../utils/fontLoader.js';
import { CheckCircle2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export function FontPreviewCard({ font, isSelected, onSelect }) {
  const [loaded, setLoaded] = useState(false);
  
  // Only load font when it enters the viewport
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once
    rootMargin: '100px 0px', // Load slightly before it comes into view
  });

  useEffect(() => {
    let cancelled = false;
    
    // If it hasn't come into view yet, or it's already loaded, don't do anything
    if (!inView || loaded || !font?.file) return;

    async function ensureFont() {
      await loadFont(font);
      if (!cancelled) setLoaded(true);
    }
    
    ensureFont();
    
    return () => {
      cancelled = true;
    };
  }, [font, inView, loaded]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onSelect(font)}
      className={`w-full text-left p-2 rounded-md border text-xs flex items-center justify-between gap-2 min-h-[40px] ${
        isSelected ? 'border-orange-500 bg-neutral-900' : 'border-neutral-700 bg-neutral-950'
      }`}
    >
      {/* <div className="flex items-center justify-between mb-1">
        <div className="font-medium truncate">{font.name}</div>
      </div> */}
      <div
        className="truncate text-sm flex-1"
        style={{
          fontFamily: loaded ? font.name : undefined,
        }}
      >
        {font.previewText}
      </div>
      {isSelected && (
        <CheckCircle2 size={16} className="text-orange-500 shrink-0" />
      )}
    </button>
  );
}


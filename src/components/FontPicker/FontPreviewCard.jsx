import React, { useEffect, useState } from 'react';
import { loadFont } from '../../utils/fontLoader.js';
import { CheckCircle2 } from 'lucide-react';

export function FontPreviewCard({ font, isSelected, onSelect }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function ensureFont() {
      await loadFont(font);
      if (!cancelled) setLoaded(true);
    }
    ensureFont();
    return () => {
      cancelled = true;
    };
  }, [font]);

  return (
    <button
      type="button"
      onClick={() => onSelect(font)}
      className={`w-full text-left p-2 rounded-md border text-xs flex items-center justify-between gap-2 ${
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


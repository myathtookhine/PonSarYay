import React, { useState } from 'react';

export function ExportPanel({ canvasApi }) {
  const [format, setFormat] = useState('png');
  const [quality, setQuality] = useState(0.92);
  const [multiplier, setMultiplier] = useState(1);

  const onExport = () => {
    canvasApi.exportAs(format, quality, multiplier);
  };

  return (
    <div className="space-y-1.5 md:space-y-2 text-xs">
      <div className="font-semibold text-xs md:text-sm mb-0.5">Export</div>

      <div className="space-y-0.5 md:space-y-1">
        <div className="text-[11px] text-neutral-300">Format</div>
        <div className="flex gap-1">
          {['png', 'jpeg'].map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setFormat(f)}
              className={`flex-1 rounded-md border px-2 py-0.5 md:py-1 uppercase ${
                format === f
                  ? 'border-orange-500 bg-neutral-900'
                  : 'border-neutral-700 bg-neutral-950'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {format === 'jpeg' && (
        <div className="space-y-0.5 md:space-y-1">
          <div className="text-[11px] text-neutral-300">Quality</div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0.6"
              max="1"
              step="0.02"
              value={quality}
              onChange={e => setQuality(parseFloat(e.target.value))}
              className="flex-1"
            />
            <div className="w-10 text-right">{Math.round(quality * 100)}%</div>
          </div>
        </div>
      )}

      <div className="space-y-0.5 md:space-y-1">
        <div className="text-[11px] text-neutral-300">Size</div>
        <div className="flex gap-1">
          {[1, 2, 3].map(m => (
            <button
              key={m}
              type="button"
              onClick={() => setMultiplier(m)}
              className={`flex-1 rounded-md border px-2 py-0.5 md:py-1 ${
                multiplier === m
                  ? 'border-orange-500 bg-neutral-900'
                  : 'border-neutral-700 bg-neutral-950'
              }`}
            >
              {m}x
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onExport}
        className="w-full mt-1 rounded-md bg-orange-600 text-sm py-2 md:py-3"
      >
        Download image
      </button>
    </div>
  );
}


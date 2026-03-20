import React from 'react';

const DEFAULT_SWATCHES = [
  '#ffffff', '#000000', '#f97316', '#22c55e', '#3b82f6', '#ec4899',
  '#ef4444', '#eab308', '#8b5cf6', '#06b6d4', '#64748b'
];

export function ColorPicker({ label, value, onChange, hideSwatches }) {
  return (
    <div className="w-full min-w-0 space-y-0.5 md:space-y-1">
      <div className="text-[11px] text-neutral-300">{label}</div>
      <div className="flex w-full min-w-0 items-center gap-1.5 md:gap-2">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="h-6 w-12 shrink-0 cursor-pointer rounded-md border border-neutral-700 bg-neutral-900 md:h-6 md:w-8"
        />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="min-w-0 flex-1 rounded-md border border-neutral-700 bg-neutral-900 px-1.5 py-0.5 text-[11px] outline-none md:px-2 md:py-1 md:text-xs"
        />
      </div>
      {!hideSwatches && (
        <div className="flex w-full min-w-0 flex-wrap gap-1">
          {DEFAULT_SWATCHES.map((color, index) => (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              className={`w-6 h-6 md:w-8 md:h-8 rounded-full border border-neutral-700 shrink-0 ${index >= 6 ? 'md:hidden' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
}


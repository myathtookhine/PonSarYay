import React from 'react';

const DEFAULT_SWATCHES = ['#ffffff', '#000000', '#f97316', '#22c55e', '#3b82f6', '#ec4899'];

export function ColorPicker({ label, value, onChange }) {
  return (
    <div className="space-y-1">
      <div className="text-[11px] text-neutral-300">{label}</div>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-8 h-6 rounded-md border border-neutral-700 bg-neutral-900"
        />
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="flex-1 rounded-md bg-neutral-900 border border-neutral-700 px-2 py-1 text-xs outline-none"
        />
      </div>
      <div className="flex flex-wrap gap-1">
        {DEFAULT_SWATCHES.map(color => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className="w-8 h-8 rounded-full border border-neutral-700"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}


import React from 'react';

export function TextStyleButtons({ value, onChange }) {
  const toggle = key => {
    onChange({
      ...value,
      [key]: !value[key],
    });
  };

  return (
    <div className="flex gap-1 text-xs">
      <button
        type="button"
        onClick={() => toggle('bold')}
        className={`flex-1 rounded-md border px-2 py-1 ${
          value.bold ? 'border-orange-500 bg-neutral-900' : 'border-neutral-700 bg-neutral-950'
        }`}
      >
        B
      </button>
      <button
        type="button"
        onClick={() => toggle('italic')}
        className={`flex-1 rounded-md border px-2 py-1 ${
          value.italic ? 'border-orange-500 bg-neutral-900' : 'border-neutral-700 bg-neutral-950'
        }`}
      >
        I
      </button>
      <button
        type="button"
        onClick={() => toggle('underline')}
        className={`flex-1 rounded-md border px-2 py-1 ${
          value.underline ? 'border-orange-500 bg-neutral-900' : 'border-neutral-700 bg-neutral-950'
        }`}
      >
        U
      </button>
    </div>
  );
}


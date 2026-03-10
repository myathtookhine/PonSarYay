import React, { useMemo, useState } from 'react';
import { MYANMAR_FONTS, ENGLISH_FONTS } from './fonts.config.js';
import { FontPreviewCard } from './FontPreviewCard.jsx';

const ENCODING_TABS = ['all', 'myanmar', 'english'];

export function FontPicker({ selectedFontId, onFontChange }) {
  const [encodingFilter, setEncodingFilter] = useState('all');
  const [query, setQuery] = useState('');

  const fonts = useMemo(() => {
    let list = [...MYANMAR_FONTS, ...ENGLISH_FONTS];
    if (encodingFilter !== 'all') {
      list = list.filter(f => f.category === encodingFilter);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(f => f.name.toLowerCase().includes(q));
    }
    return list;
  }, [encodingFilter, query]);

  return (
    <div className="flex flex-col gap-2 text-xs">
      <div className="font-semibold text-sm">Fonts</div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search fonts…"
        className="w-full rounded-md bg-neutral-900 border border-neutral-700 px-2 py-1 text-xs outline-none focus:border-orange-500"
      />
      <div className="flex gap-1 mt-1">
        {ENCODING_TABS.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setEncodingFilter(tab)}
            className={`flex-1 rounded-full px-2 py-1 capitalize ${
              encodingFilter === tab
                ? 'bg-orange-600 text-white'
                : 'bg-neutral-900 text-neutral-300 border border-neutral-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-2 mt-2">
        {fonts.map(font => (
          <FontPreviewCard
            key={font.id}
            font={font}
            isSelected={font.id === selectedFontId}
            onSelect={onFontChange}
          />
        ))}
      </div>
    </div>
  );
}


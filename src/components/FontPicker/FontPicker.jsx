import React, { useEffect, useMemo, useState } from 'react';
import { MYANMAR_FONTS, ENGLISH_FONTS } from './fonts.config.js';
import { FontPreviewCard } from './FontPreviewCard.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { Search, X } from 'lucide-react';
import { trackFontSelect, trackFontSearch } from '../../utils/analytics.js';

const ENCODING_TABS = ['all', 'myanmar', 'english'];

export function FontPicker({ selectedFontId, onFontChange }) {
  const { t } = useLanguage();
  const [encodingFilter, setEncodingFilter] = useState('all');
  const [query, setQuery] = useState('');

  // Debounced GA4 tracking for search queries
  useEffect(() => {
    if (!query.trim()) return;
    const timer = setTimeout(() => {
      trackFontSearch(query.trim());
    }, 1200);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectFont = (font) => {
    trackFontSelect(font.id, font.name, font.category);
    onFontChange?.(font);
  };

  const fonts = useMemo(() => {
    let list = [...MYANMAR_FONTS, ...ENGLISH_FONTS];
    if (encodingFilter !== 'all') {
      list = list.filter(f => f.category === encodingFilter);
    }
    if (query.trim()) {
      const q = query.toLowerCase().replace(/\s+/g, '');
      list = list.filter(f => f.name.toLowerCase().replace(/\s+/g, '').includes(q));
    }
    return list;
  }, [encodingFilter, query]);

  return (
    <div className="flex flex-col gap-1.5 md:gap-2 text-xs">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-xs md:text-sm">{t('fonts')}</div>
        <span className="text-[10px] text-neutral-400">{fonts.length}</span>
      </div>

      {/* Live Search Input */}
      <div className="relative flex items-center">
        <Search size={14} className="absolute left-2.5 text-neutral-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t('search fonts...')}
          className="w-full rounded-md bg-neutral-900 border border-neutral-700 pl-7 pr-7 py-1 text-xs outline-none focus:border-orange-500 text-neutral-100 placeholder-neutral-500 transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-2 text-neutral-400 hover:text-neutral-200 p-0.5"
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Language Filter Tabs */}
      <div className="flex gap-1 mt-0.5">
        {ENCODING_TABS.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setEncodingFilter(tab)}
            className={`flex-1 rounded-md px-2 py-1 text-[11px] font-medium capitalize transition-colors ${
              encodingFilter === tab
                ? 'bg-orange-600 text-white'
                : 'bg-neutral-900 text-neutral-300 border border-neutral-700 hover:bg-neutral-800'
            }`}
          >
            {t(tab)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-1.5 md:gap-2 mt-1 md:mt-2">
        {fonts.length === 0 ? (
          <div className="py-6 text-center text-neutral-500 text-xs">
            No fonts found matching "{query}"
          </div>
        ) : (
          fonts.map(font => (
            <FontPreviewCard
              key={font.id}
              font={font}
              isSelected={font.id === selectedFontId}
              onSelect={handleSelectFont}
            />
          ))
        )}
      </div>
    </div>
  );
}


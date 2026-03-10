import React, { useEffect, useState } from 'react';
import { ColorPicker } from './ColorPicker.jsx';
import { TextStyleButtons } from './TextStyleButtons.jsx';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

export function TextControls({ canvasApi }) {
  const { t } = useLanguage();
  const [fontSize, setFontSize] = useState(32);
  const [color, setColor] = useState('#ffffff');
  const [opacity, setOpacity] = useState(1);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [align, setAlign] = useState('center');
  const [styles, setStyles] = useState({ bold: false, italic: false, underline: false });

  useEffect(() => {
    const obj = canvasApi.selectedObject;
    if (!obj) return;
    setFontSize(obj.fontSize || 32);
    setColor(obj.fill || '#ffffff');
    setOpacity(obj.opacity ?? 1);
    setLineHeight(obj.lineHeight ?? 1.2);
    setAlign(obj.textAlign || 'center');
    setStyles({
      bold: obj.fontWeight === '700' || obj.fontWeight === 'bold',
      italic: obj.fontStyle === 'italic',
      underline: !!obj.underline,
    });
  }, [canvasApi.selectedObject]);

  useEffect(() => {
    canvasApi.updateSelectedText({
      fontSize: Number(fontSize) || 32,
      fill: color,
      opacity,
      lineHeight,
      textAlign: align,
      fontWeight: styles.bold ? '700' : '400',
      fontStyle: styles.italic ? 'italic' : 'normal',
      underline: styles.underline,
    });
  }, [fontSize, color, opacity, lineHeight, align, styles, canvasApi]);

  const handleDecFontSize = () => {
    setFontSize(prev => Math.max(8, Number(prev) - 1));
  };
  
  const handleIncFontSize = () => {
    setFontSize(prev => Math.min(200, Number(prev) + 1));
  };

  return (
    <div className="space-y-2 text-xs">
      <div className="font-semibold text-xs md:text-sm mb-0.5">{t('text controls')}</div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:gap-0 md:space-y-2">
        <div className="flex flex-col gap-2 md:gap-0 md:space-y-2">
          {/* Font size */}
          <div className="space-y-0.5">
            <div className="text-[11px] text-neutral-300">{t('font size')}</div>
            <div className="flex items-center gap-1.5 h-[24px]">
              <input
                type="range"
                min="8"
                max="200"
                value={fontSize}
                onChange={e => setFontSize(e.target.value)}
                className="flex-1 min-w-0"
              />
              <div className="flex items-center rounded-md bg-neutral-900 border border-neutral-700 h-full shrink-0">
                <button 
                  type="button" 
                  onClick={handleDecFontSize} 
                  className="w-5 md:w-6 h-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-l-md border-r border-neutral-700 pb-0.5"
                >
                  -
                </button>
                <input
                  type="number"
                  min="8"
                  max="200"
                  value={fontSize}
                  onChange={e => setFontSize(e.target.value)}
                  className="w-8 md:w-12 h-full bg-transparent text-center text-xs outline-none hide-spin-button"
                />
                <button 
                  type="button" 
                  onClick={handleIncFontSize} 
                  className="w-5 md:w-6 h-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-r-md border-l border-neutral-700 pb-0.5"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Line height */}
          <div className="space-y-0.5">
            <div className="text-[11px] text-neutral-300">{t('line height')}</div>
            <div className="flex items-center gap-1.5 h-[24px]">
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={lineHeight}
                onChange={e => setLineHeight(parseFloat(e.target.value))}
                className="flex-1 min-w-0"
              />
              <div className="w-8 md:w-10 text-right shrink-0 leading-none">{lineHeight.toFixed(1)}</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col">
          <ColorPicker label={t('text color')} value={color} onChange={setColor} />
        </div>
      </div>

      {/* Alignment & Style side by side on mobile */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-0 md:space-y-2">
        <div className="space-y-0.5">
          <div className="text-[11px] text-neutral-300">{t('alignment')}</div>
          <div className="flex gap-1">
            {['left', 'center', 'right'].map(option => (
              <button
                key={option}
                type="button"
                onClick={() => setAlign(option)}
                className={`flex-1 rounded-md border px-1.5 md:px-2 py-0.5 md:py-1 capitalize text-[10px] md:text-xs h-6 md:h-7 ${
                  align === option
                    ? 'border-orange-500 bg-neutral-900'
                    : 'border-neutral-700 bg-neutral-950'
                }`}
              >
                {t(option)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-0.5">
          <div className="text-[11px] text-neutral-300">{t('style')}</div>
          <TextStyleButtons value={styles} onChange={setStyles} />
        </div>
      </div>

      <div className="space-y-0.5">
        <div className="text-[11px] text-neutral-300">{t('opacity')}</div>
        <div className="flex items-center gap-1.5">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={opacity}
            onChange={e => setOpacity(parseFloat(e.target.value))}
            className="flex-1"
          />
          <div className="w-10 text-right">{Math.round(opacity * 100)}%</div>
        </div>
      </div>
    </div>
  );
}


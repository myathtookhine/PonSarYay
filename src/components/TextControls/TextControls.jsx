import React, { useEffect, useState } from 'react';
import { ColorPicker } from './ColorPicker.jsx';
import { TextStyleButtons } from './TextStyleButtons.jsx';

export function TextControls({ canvasApi }) {
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
    <div className="space-y-3 text-xs">
      <div className="font-semibold text-sm mb-1">Text controls</div>

      <div className="space-y-1">
        <div className="text-[11px] text-neutral-300">Font size</div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="8"
            max="200"
            value={fontSize}
            onChange={e => setFontSize(e.target.value)}
            className="flex-1"
          />
          <div className="flex items-center rounded-md bg-neutral-900 border border-neutral-700">
            <button 
              type="button" 
              onClick={handleDecFontSize} 
              className="w-6 h-[26px] flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-l-md border-r border-neutral-700 pb-0.5"
            >
              -
            </button>
            <input
              type="number"
              min="8"
              max="200"
              value={fontSize}
              onChange={e => setFontSize(e.target.value)}
              className="w-12 bg-transparent text-center text-xs outline-none hide-spin-button"
            />
            <button 
              type="button" 
              onClick={handleIncFontSize} 
              className="w-6 h-[26px] flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-r-md border-l border-neutral-700 pb-0.5"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-[11px] text-neutral-300">Line height</div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={lineHeight}
            onChange={e => setLineHeight(parseFloat(e.target.value))}
            className="flex-1"
          />
          <div className="w-10 text-right">{lineHeight.toFixed(1)}</div>
        </div>
      </div>

      <ColorPicker label="Text color" value={color} onChange={setColor} />

      <div className="space-y-1">
        <div className="text-[11px] text-neutral-300">Alignment</div>
        <div className="flex gap-1">
          {['left', 'center', 'right'].map(option => (
            <button
              key={option}
              type="button"
              onClick={() => setAlign(option)}
              className={`flex-1 rounded-md border px-2 py-1 capitalize ${
                align === option
                  ? 'border-orange-500 bg-neutral-900'
                  : 'border-neutral-700 bg-neutral-950'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-[11px] text-neutral-300">Style</div>
        <TextStyleButtons value={styles} onChange={setStyles} />
      </div>

      <div className="space-y-1">
        <div className="text-[11px] text-neutral-300">Opacity</div>
        <div className="flex items-center gap-2">
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


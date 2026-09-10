import React, { useCallback, useRef, useState } from 'react';
import { AlertTriangle, Upload } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { trackImageUpload } from '../../utils/analytics.js';

export function ImageUploader({ onImageLoaded, errorMessage }) {
  const { t } = useLanguage();
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    files => {
      const file = files?.[0];
      if (!file) return;
      trackImageUpload(file.type || 'unknown', Math.round(file.size / 1024));
      onImageLoaded?.(file);
    },
    [onImageLoaded],
  );

  const onDrop = useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      handleFiles(event.dataTransfer.files);
    },
    [handleFiles],
  );

  const onDragOver = event => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = event => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center text-xs cursor-pointer transition-colors p-4 ${
        isDragging ? 'bg-orange-500/10' : 'bg-transparent'
      }`}
      onClick={() => inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div className="relative mb-5 flex items-center justify-center">
        {/* Radiating circular waves */}
        <div className="absolute w-16 h-16 rounded-full border-2 border-orange-500/50 radiation-ring-1 pointer-events-none" />
        <div className="absolute w-16 h-16 rounded-full border border-orange-400/35 radiation-ring-2 pointer-events-none" />
        <div className="absolute -inset-2 rounded-full bg-orange-500/20 radiation-glow pointer-events-none blur-sm" />

        {/* Center icon circle */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white shadow-xl shadow-orange-600/40 transition-transform duration-300 hover:scale-105">
          <Upload size={30} />
        </div>
      </div>
      <div className="font-bold mb-1 text-xl">{t('upload image')}</div>

      {errorMessage ? (
        <div className="mt-4 mb-2 mx-4 w-auto rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-red-100 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red-700" />
            <p className="text-xs font-semibold leading-5 text-red-700">{errorMessage}</p>
          </div>
        </div>
      ) : (
        <div className="text-neutral-400 text-center max-w-[260px] mt-1.5 px-4 leading-relaxed">
          {t('click to dropzone')}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
    </div>
  );
}


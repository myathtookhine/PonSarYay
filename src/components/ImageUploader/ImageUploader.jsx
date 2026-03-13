import React, { useCallback, useRef, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

export function ImageUploader({ onImageLoaded, errorMessage }) {
  const { t } = useLanguage();
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    files => {
      const file = files?.[0];
      if (!file) return;
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
      className={`w-full h-full flex flex-col items-center justify-center text-xs cursor-pointer transition-colors ${
        isDragging ? 'bg-orange-500/10' : 'bg-transparent'
      }`}
      onClick={() => inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div className="w-16 h-16 mb-4 rounded-full bg-orange-600 flex items-center justify-center text-white shadow-lg">
        <ImageIcon size={32} />
      </div>
      <div className="font-bold mb-1 text-xl">{t('upload image')}</div>

      {errorMessage ? (
        <div className="text-red-500 font-semibold text-xs mb-2 animate-in fade-in slide-in-from-top-1 px-4 text-center mt-4">
          {errorMessage}
        </div>
      ) : (
        <div className="text-neutral-400 text-center max-w-[250px] mt-2 px-4">
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


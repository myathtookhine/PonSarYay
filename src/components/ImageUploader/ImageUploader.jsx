import React, { useCallback, useRef, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

export function ImageUploader({ onImageLoaded }) {
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
      className={`border rounded-md p-4 py-12 flex flex-col items-center text-xs cursor-pointer ${
        isDragging ? 'border-orange-500 bg-neutral-900' : 'border-neutral-700 bg-neutral-950'
      }`}
      onClick={() => inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div className="w-16 h-16 mb-4 rounded-full bg-orange-600 flex items-center justify-center text-white">
        <ImageIcon size={32} />
      </div>
      <div className="font-bold mb-3 text-xl">{t('upload image')}</div>
      <div className="text-neutral-400 text-center max-w-[250px] mt-2">
        {t('click to dropzone')}
      </div>
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


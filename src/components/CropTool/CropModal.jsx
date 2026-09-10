import React, { useEffect, useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { trackImageCrop } from '../../utils/analytics.js';

const ASPECT_OPTIONS = [
  { key: 'ratio_free', label: 'Free', value: undefined },
  { key: 'ratio_square', label: '1:1 Square', value: 1 / 1 },
  { key: 'ratio_portrait', label: '4:5 Portrait', value: 4 / 5 },
  { key: 'ratio_story', label: '9:16 Story', value: 9 / 16 },
  { key: 'ratio_landscape', label: '16:9 Banner', value: 16 / 9 },
];

function getInitialCrop(aspect, width, height) {
  if (!aspect) {
    return centerCrop(
      {
        unit: '%',
        width: 80,
        height: 80,
      },
      width,
      height
    );
  }

  const isLandscape = width / height > aspect;
  const cropConfig = isLandscape
    ? { unit: '%', height: 80 }
    : { unit: '%', width: 80 };

  return centerCrop(
    makeAspectCrop(cropConfig, aspect, width, height),
    width,
    height
  );
}

export function CropModal({ isOpen, onClose, canvasApi }) {
  const { t } = useLanguage();
  const [src, setSrc] = useState(null);
  const [selectedAspect, setSelectedAspect] = useState(1 / 1);
  const [crop, setCrop] = useState(undefined);
  const [completedCrop, setCompletedCrop] = useState(undefined);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setSrc(null);
      setSelectedAspect(1 / 1);
      setCrop(undefined);
      setCompletedCrop(undefined);
      return;
    }
    const loadImg = async () => {
      if (canvasApi.getBackgroundImageDataUrl) {
        const url = await canvasApi.getBackgroundImageDataUrl();
        setSrc(url);
      }
    };
    loadImg();
  }, [isOpen, canvasApi]);

  const handleImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    if (!width || !height) return;
    const initialCrop = getInitialCrop(selectedAspect ?? 1, width, height);
    setCrop(initialCrop);
    setCompletedCrop(initialCrop);
  };

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.width && imgRef.current.height) {
      const { width, height } = imgRef.current;
      const initialCrop = getInitialCrop(selectedAspect ?? 1, width, height);
      setCrop(initialCrop);
      setCompletedCrop(initialCrop);
    }
  }, [src]);

  const handleAspectChange = (val) => {
    setSelectedAspect(val);
    if (!imgRef.current) return;
    const { width, height } = imgRef.current;
    if (!width || !height) return;
    const newCrop = getInitialCrop(val, width, height);
    setCrop(newCrop);
    setCompletedCrop(newCrop);
  };

  if (!isOpen) return null;

  const handleApply = () => {
    if (!imgRef.current || !completedCrop?.width || !completedCrop?.height) {
      onClose();
      return;
    }
    const image = imgRef.current;
    const naturalWidth = image.naturalWidth || image.width;
    const naturalHeight = image.naturalHeight || image.height;

    const isPercent = completedCrop.unit === '%' || completedCrop.unit === undefined;
    const cropX = isPercent
      ? (completedCrop.x / 100) * naturalWidth
      : (completedCrop.x / (image.width || naturalWidth)) * naturalWidth;
    const cropY = isPercent
      ? (completedCrop.y / 100) * naturalHeight
      : (completedCrop.y / (image.height || naturalHeight)) * naturalHeight;
    const cropW = isPercent
      ? (completedCrop.width / 100) * naturalWidth
      : (completedCrop.width / (image.width || naturalWidth)) * naturalWidth;
    const cropH = isPercent
      ? (completedCrop.height / 100) * naturalHeight
      : (completedCrop.height / (image.height || naturalHeight)) * naturalHeight;

    const finalWidth = Math.round(cropW);
    const finalHeight = Math.round(cropH);

    if (finalWidth <= 0 || finalHeight <= 0) {
      onClose();
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = finalWidth;
    canvas.height = finalHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropW,
      cropH,
      0,
      0,
      finalWidth,
      finalHeight,
    );

    canvas.toBlob(blob => {
      if (blob) {
        const dataUrl = URL.createObjectURL(blob);
        const preset = ASPECT_OPTIONS.find(o => o.value === selectedAspect)?.label || 'free';
        trackImageCrop(preset);
        canvasApi.applyCroppedBackground?.(dataUrl);
        onClose();
      } else {
        onClose();
      }
    }, 'image/png');
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg max-h-[95vh] flex flex-col rounded-lg bg-neutral-950 border border-neutral-800 p-4 text-xs">
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div className="font-semibold text-sm">{t('crop image')}</div>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-200"
          >
            {t('close')}
          </button>
        </div>

        {!src && (
          <div className="text-neutral-400">
            {t('upload an image first for crop')}
          </div>
        )}

        {src && (
          <div className="flex flex-col flex-1 min-h-0">
            {/* Aspect Ratio Presets Bar */}
            <div className="flex flex-col gap-1.5 mb-2.5 shrink-0">
              <span className="text-[11px] sm:text-xs text-neutral-400 font-medium whitespace-nowrap">
                {t('format') || 'Format'}:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar no-scrollbar w-full pb-1 touch-pan-x">
                {ASPECT_OPTIONS.map(opt => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleAspectChange(opt.value)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
                      selectedAspect === opt.value
                        ? 'bg-orange-600 text-white'
                        : 'bg-neutral-900 text-neutral-300 border border-neutral-700 hover:bg-neutral-800'
                    }`}
                  >
                    {t(opt.key) || opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-auto min-h-0 bg-neutral-900 border border-neutral-800 mb-3 flex items-center justify-center">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(_pixelCrop, percentCrop) => setCompletedCrop(percentCrop)}
                aspect={selectedAspect}
              >
                <img
                  ref={imgRef}
                  src={src}
                  alt="Crop target"
                  onLoad={handleImageLoad}
                  className="max-h-[55vh] object-contain block mx-auto"
                />
              </ReactCrop>
            </div>

            <div className="flex justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-md border border-neutral-700 text-xs hover:bg-neutral-800"
              >
                {t('cancel')}
              </button>
              <button
                type="button"
                onClick={handleApply}
                className="px-3 py-1.5 rounded-md bg-orange-600 hover:bg-orange-700 text-white text-xs"
              >
                {t('apply crop')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


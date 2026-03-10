import React, { useEffect, useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useLanguage } from '../../contexts/LanguageContext.jsx';

export function CropModal({ isOpen, onClose, canvasApi }) {
  const { t } = useLanguage();
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', x: 10, y: 10, width: 80, height: 80 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const loadImg = async () => {
      if (canvasApi.getBackgroundImageDataUrl) {
        const url = await canvasApi.getBackgroundImageDataUrl();
        setSrc(url);
      }
    };
    loadImg();
  }, [isOpen, canvasApi]);

  if (!isOpen) return null;

  const handleApply = () => {
    if (!imgRef.current || !completedCrop?.width || !completedCrop?.height) {
      onClose();
      return;
    }
    const image = imgRef.current;
    const naturalWidth = image.naturalWidth || image.width;
    const naturalHeight = image.naturalHeight || image.height;

    const canvas = document.createElement('canvas');
    // completedCrop is stored as a percentage crop (0–100)
    const cropX = (completedCrop.x / 100) * naturalWidth;
    const cropY = (completedCrop.y / 100) * naturalHeight;
    const cropW = (completedCrop.width / 100) * naturalWidth;
    const cropH = (completedCrop.height / 100) * naturalHeight;

    canvas.width = cropW;
    canvas.height = cropH;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropW,
      cropH,
      0,
      0,
      cropW,
      cropH,
    );

    canvas.toBlob(blob => {
      if (blob) {
        const dataUrl = URL.createObjectURL(blob);
        canvasApi.applyCroppedBackground?.(dataUrl);
        onClose();
      } else {
        onClose();
      }
    }, 'image/png');
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg max-h-[90vh] flex flex-col rounded-lg bg-neutral-950 border border-neutral-800 p-4 text-xs">
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
            <div className="flex-1 overflow-auto min-h-0 bg-neutral-900 border border-neutral-800 mb-3 flex items-center justify-center">
              <ReactCrop
                crop={crop}
                onChange={c => setCrop(c)}
                onComplete={(_pixelCrop, percentCrop) => setCompletedCrop(percentCrop)}
                aspect={undefined}
              >
                <img
                  ref={imgRef}
                  src={src}
                  alt="Crop target"
                  className="max-h-[60vh] object-contain block mx-auto"
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


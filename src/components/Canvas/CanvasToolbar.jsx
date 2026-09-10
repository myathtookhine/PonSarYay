import React from 'react';
import { Undo, Redo, Crop, Trash2, Copy, Eraser, Type, SunMedium } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { trackAddText } from '../../utils/analytics.js';

export function CanvasToolbar({ canvasApi, onOpenCrop, showToast }) {
  const { t } = useLanguage();
  const handleAddText = () => {
    if (!canvasApi.hasImage) {
      canvasApi.setUploadError(t('please upload an image first.'));
      return;
    }
    trackAddText();
    canvasApi.addTextLayer();
  };

  const renderUndoRedoCrop = (className = '') => (
    <div className={`flex items-center gap-1.5 md:gap-2 shrink-0 ${className}`}>
      <button
        type="button"
        onClick={canvasApi.undo}
        disabled={!canvasApi.canUndo}
        className="p-1 md:p-2 rounded-md border border-neutral-700 text-neutral-300 disabled:opacity-40 hover:bg-neutral-800"
        title={t('undo')}
      >
        <Undo size={14} className="md:hidden" /><Undo size={18} className="hidden md:block" />
      </button>
      <button
        type="button"
        onClick={canvasApi.redo}
        disabled={!canvasApi.canRedo}
        className="p-1 md:p-2 rounded-md border border-neutral-700 text-neutral-300 disabled:opacity-40 hover:bg-neutral-800"
        title={t('redo')}
      >
        <Redo size={14} className="md:hidden" /><Redo size={18} className="hidden md:block" />
      </button>
      <button
        type="button"
        onClick={onOpenCrop}
        className="p-1 md:p-2 rounded-md border border-orange-600 text-orange-400 hover:bg-orange-600/10"
        title={t('crop')}
      >
        <Crop size={14} className="md:hidden" /><Crop size={18} className="hidden md:block" />
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-neutral-950">
      <div className="flex items-center gap-2 w-full overflow-x-auto hide-scrollbar">
        <span className="text-[10px] md:text-xs text-neutral-400 whitespace-nowrap mr-auto">{t('note : 300 max. characters')}</span>
        {renderUndoRedoCrop('md:hidden')}
      </div>

      {/* Main Action Buttons Row */}
      <div className="flex items-center gap-1.5 md:gap-2 w-full overflow-x-auto hide-scrollbar">
        <button
          type="button"
          onClick={handleAddText}
          className="px-3 md:px-4 py-1.5 md:py-2 rounded-md bg-orange-600 text-xs md:text-sm whitespace-nowrap font-medium flex items-center gap-1.5 hover:bg-orange-700 shrink-0"
        >
          <Type size={16} />
          {t('add text')}
        </button>
        <button
          type="button"
          onClick={canvasApi.deleteSelected}
          disabled={!canvasApi.selectedObject}
          className="p-1.5 md:p-2 rounded-md border border-neutral-700 text-neutral-300 disabled:opacity-30 hover:bg-neutral-800 shrink-0"
          title={t('delete text')}
        >
          <Trash2 size={16} />
        </button>
        <button
          type="button"
          onClick={canvasApi.duplicateSelected}
          disabled={!canvasApi.selectedObject}
          className="p-1.5 md:p-2 rounded-md border border-neutral-700 text-neutral-300 disabled:opacity-30 hover:bg-neutral-800 shrink-0"
          title={t('duplicate text')}
        >
          <Copy size={16} />
        </button>

        {renderUndoRedoCrop('hidden md:flex border-l border-neutral-800 pl-2 ml-1')}

        <button
          type="button"
          onClick={canvasApi.clearImage}
          className="flex flex-row items-center p-1.5 md:p-2 rounded-md border border-neutral-700 text-neutral-300 hover:bg-neutral-800 ml-auto shrink-0"
          title={t('clear image')}
        >
          <Eraser size={16} />
          <span className='ml-1.5 text-xs md:text-sm whitespace-nowrap font-medium'>{t('clear image')}</span>
        </button>
      </div>

      {/* Dedicated Row Underneath: Image Overlay Full Width on Mobile */}
      {canvasApi.hasImage && (
        <div className="pt-1.5 border-t border-neutral-900 w-full">
          <div
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 w-full sm:w-auto"
            title={t('dimmer_desc')}
          >
            <SunMedium size={15} className="text-orange-400 shrink-0" />
            <span className="text-xs font-medium text-neutral-200 whitespace-nowrap shrink-0">
              {t('dimmer')}
            </span>
            <input
              type="range"
              min="0"
              max="0.85"
              step="0.05"
              value={canvasApi.dimmerOpacity || 0}
              onChange={e => canvasApi.updateDimmer(parseFloat(e.target.value))}
              className="flex-1 sm:w-44 h-2 accent-orange-500 cursor-pointer"
            />
            <span className="text-xs text-neutral-400 tabular-nums w-8 text-right font-semibold shrink-0">
              {Math.round((canvasApi.dimmerOpacity || 0) * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}


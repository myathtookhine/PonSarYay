import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { X, Download } from 'lucide-react';

export function PreviewModal({ isOpen, onClose, imageUrl, filename }) {
  const { t } = useLanguage();

  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-neutral-900 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-3 border-b border-neutral-800 shrink-0">
          <h3 className="font-semibold text-sm">{t('save image')}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-800 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center gap-4">
          <div className="relative group">
            <img
              src={imageUrl}
              alt="Export Preview"
              className="max-w-full h-auto rounded-lg shadow-lg border border-neutral-700"
            />
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-orange-400 font-medium px-4">
              {t('messenger_save_instruction') || 'Long press the image above and select "Save Image" to download it.'}
            </p>
            <p className="text-[11px] text-neutral-400 px-6">
              {t('in_app_browser_warning') || 'Some in-app browsers (like Messenger) block direct downloads. Using long-press is the most reliable way.'}
            </p>
          </div>
        </div>

        <div className="p-3 border-t border-neutral-800 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm font-medium border border-neutral-700 hover:bg-neutral-800 rounded-md transition-colors"
          >
            {t('close')}
          </button>
          <a
            href={imageUrl}
            download={filename ? `${filename}.png` : "edited-image.png"}
            className="flex-1 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-500 rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <Download size={16} />
            {t('download_image')}
          </a>
        </div>
      </div>
    </div>
  );
}

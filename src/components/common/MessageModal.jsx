import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { X, AlertCircle } from 'lucide-react';

export function MessageModal({ isOpen, onClose, title, message, type = 'info' }) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const isError = type === 'error' || type === 'warning';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col">
        <div className="flex items-center justify-between p-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            {isError && <AlertCircle size={18} className="text-red-500" />}
            <h3 className="font-semibold text-sm">{title || t('notice')}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-800 rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6 text-center">
          <p className="text-sm text-neutral-300 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="p-3 border-t border-neutral-800flex flex-col">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-sm font-semibold bg-orange-600 hover:bg-orange-500 text-white rounded-md transition-all shadow-lg active:scale-[0.98]"
          >
            {t('ok') || 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}

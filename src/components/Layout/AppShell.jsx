import React, { useState, useEffect } from 'react';
import { EditorCanvas } from '../Canvas/EditorCanvas.jsx';
import { CanvasToolbar } from '../Canvas/CanvasToolbar.jsx';
import { ImageUploader } from '../ImageUploader/ImageUploader.jsx';
import { FontPicker } from '../FontPicker/FontPicker.jsx';
import { TextControls } from '../TextControls/TextControls.jsx';
import { CropModal } from '../CropTool/CropModal.jsx';
import { ExportPanel } from '../ExportPanel/ExportPanel.jsx';
import { useCanvas } from '../Canvas/useCanvas.js';
import { Sun, Moon } from 'lucide-react';

const MOBILE_TABS = ['text', 'fonts', 'export'];

export function AppShell() {
  const canvasApi = useCanvas();
  const [activeMobileTab, setActiveMobileTab] = useState('text');
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    canvasApi.setShowToast?.(showToast);
  }, [canvasApi.setShowToast]);

  return (
    <div className={`h-[100dvh] w-full overflow-hidden bg-neutral-950 text-neutral-50 flex flex-col ${!darkMode ? 'light-mode' : ''}`}>
      <header className="border-b border-neutral-800 px-3 md:px-4 py-2 md:py-3 flex items-center justify-between shrink-0">
        <div>
          <div className="font-semibold tracking-tight text-lg">
            PonSarYay
          </div>
          <div className="text-xs text-neutral-400">
            Myanmar Text-on-Image Editor
          </div>
        </div>
        <button
          type="button"
          onClick={() => setDarkMode(prev => !prev)}
          className="p-2 rounded-md border border-neutral-700 hover:bg-neutral-800 text-neutral-300"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
        {/* Left tools / sidebar on desktop */}
        {isDesktop && (
          <aside className="flex w-64 shrink-0 border-r border-neutral-800 flex-col overflow-y-auto">
            <div className="flex-1 p-3 space-y-4">
              <FontPicker
                selectedFontId={canvasApi.selectedFontId}
                onFontChange={font => canvasApi.applyFont(font)}
              />
            </div>
          </aside>
        )}

        {/* Center canvas */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <EditorCanvas canvasApi={canvasApi} />
          </div>
          <div className="border-t border-neutral-800 shrink-0">
            <CanvasToolbar
              canvasApi={canvasApi}
              onOpenCrop={() => setIsCropOpen(true)}
              showToast={showToast}
            />
          </div>
        </main>

        {/* Right text controls on desktop */}
        {isDesktop && (
          <aside className="flex w-72 shrink-0 min-h-0 border-l border-neutral-800 flex-col">
            <div className="flex-1 overflow-y-auto p-3">
              <TextControls canvasApi={canvasApi} />
            </div>
            <div className="border-t border-neutral-800 p-3 shrink-0">
              <ExportPanel canvasApi={canvasApi} />
            </div>
          </aside>
        )}
      </div>

      {/* Mobile bottom tab bar */}
      {!isDesktop && (
        <div className="border-t border-neutral-800 flex flex-col shrink-0">
          <div className="flex text-xs shrink-0">
            {MOBILE_TABS.map(tab => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveMobileTab(tab)}
                className={`flex-1 py-2 capitalize ${
                  activeMobileTab === tab
                    ? 'text-orange-400 border-t-2 border-orange-500 bg-neutral-900'
                    : 'text-neutral-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="bg-neutral-950 border-t border-neutral-800 p-2 h-[22vh] min-h-[120px] overflow-y-auto overscroll-contain">
            {activeMobileTab === 'text' && <TextControls canvasApi={canvasApi} />}
            {activeMobileTab === 'fonts' && (
              <FontPicker
                selectedFontId={canvasApi.selectedFontId}
                onFontChange={font => canvasApi.applyFont(font)}
              />
            )}
            {activeMobileTab === 'export' && <ExportPanel canvasApi={canvasApi} />}
          </div>
        </div>
      )}

      <CropModal
        isOpen={isCropOpen}
        onClose={() => setIsCropOpen(false)}
        canvasApi={canvasApi}
      />

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 text-xs text-neutral-100 shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}


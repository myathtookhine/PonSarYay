import React from 'react';
import { Undo, Redo, Crop, Trash2, Copy, Eraser, Type } from 'lucide-react';

export function CanvasToolbar({ canvasApi, onOpenCrop, showToast }) {
  const handleAddText = () => {
    if (!canvasApi.hasImage) {
      showToast?.('Please upload an image first.');
      return;
    }
    canvasApi.addTextLayer();
  };

  const renderUndoRedoCrop = (className = '') => (
    <div className={`flex items-center gap-1.5 md:gap-2 shrink-0 ${className}`}>
      <button
        type="button"
        onClick={canvasApi.undo}
        disabled={!canvasApi.canUndo}
        className="p-1 md:p-2 rounded-md border border-neutral-700 text-neutral-300 disabled:opacity-40 hover:bg-neutral-800"
        title="Undo"
      >
        <Undo size={14} className="md:hidden" /><Undo size={18} className="hidden md:block" />
      </button>
      <button
        type="button"
        onClick={canvasApi.redo}
        disabled={!canvasApi.canRedo}
        className="p-1 md:p-2 rounded-md border border-neutral-700 text-neutral-300 disabled:opacity-40 hover:bg-neutral-800"
        title="Redo"
      >
        <Redo size={14} className="md:hidden" /><Redo size={18} className="hidden md:block" />
      </button>
      <button
        type="button"
        onClick={onOpenCrop}
        className="p-1 md:p-2 rounded-md border border-orange-600 text-orange-400 hover:bg-orange-600/10"
        title="Crop"
      >
        <Crop size={14} className="md:hidden" /><Crop size={18} className="hidden md:block" />
      </button>
    </div>
  );

  return (
    <div className="flex flex-col gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-neutral-950">
      <div className="flex items-center gap-2 w-full overflow-x-auto hide-scrollbar">
        <span className="text-[10px] md:text-xs text-neutral-400 whitespace-nowrap mr-auto">Note : 300 Max. Characters</span>
        {renderUndoRedoCrop('md:hidden')}
      </div>

      <div className="flex items-center gap-1.5 md:gap-2 w-full overflow-x-auto hide-scrollbar">
        <button
          type="button"
          onClick={handleAddText}
          className="px-3 md:px-4 py-1.5 md:py-2 rounded-md bg-orange-600 text-xs md:text-sm whitespace-nowrap font-medium flex items-center gap-1.5 hover:bg-orange-700 shrink-0"
        >
          <Type size={16} />
          Add Text
        </button>
        <button
          type="button"
          onClick={canvasApi.deleteSelected}
          className="p-1.5 md:p-2 rounded-md border border-neutral-700 text-neutral-300 hover:bg-neutral-800 shrink-0"
          title="Delete Text"
        >
          <Trash2 size={16} />
        </button>
        <button
          type="button"
          onClick={canvasApi.duplicateSelected}
          className="p-1.5 md:p-2 rounded-md border border-neutral-700 text-neutral-300 hover:bg-neutral-800 shrink-0"
          title="Duplicate Text"
        >
          <Copy size={16} />
        </button>

        {renderUndoRedoCrop('hidden md:flex border-l border-neutral-800 pl-2 ml-1')}

        <button
          type="button"
          onClick={canvasApi.clearImage}
          className="flex flex-row items-center p-1.5 md:p-2 rounded-md border border-neutral-700 text-neutral-300 hover:bg-neutral-800 ml-auto shrink-0"
          title="Clear Image"
        >
          <Eraser size={16} />
          <span className='ml-1.5 text-xs md:text-sm whitespace-nowrap font-medium'>Clear Image</span>
        </button>
      </div>
    </div>
  );
}


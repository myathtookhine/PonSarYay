import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { isInAppBrowser } from '../../utils/browserUtils.js';
import ReactGA from 'react-ga4';
import { Copy, Check, Share2 } from 'lucide-react';
import { PreviewModal } from './PreviewModal.jsx';
import { MessageModal } from '../common/MessageModal.jsx';
import { trackCopyClipboard, trackNativeShare } from '../../utils/analytics.js';

export function ExportPanel({ canvasApi }) {
  const { t } = useLanguage();
  const [format, setFormat] = useState('png');
  const [quality, setQuality] = useState(0.92);
  const [multiplier, setMultiplier] = useState(2);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [imageName, setImageName] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const onExport = async () => {
    if (!canvasApi.hasImage) {
      setIsErrorModalOpen(true);
      return;
    }
    
    if (!imageName.trim()) {
      setError(t('please enter image name'));
      return;
    }
    setError('');

    // Google Analytics Event for Image Export
    ReactGA.event({
      category: "User_Action",
      action: "image_export",
      label: format,
      value: multiplier,
    });

    const url = await canvasApi.exportAs(format, quality, multiplier, imageName.trim(), false);

    setPreviewUrl(url);
    setIsPreviewOpen(true);
  };

  const handleCopyClipboard = async () => {
    if (!canvasApi.hasImage) {
      setIsErrorModalOpen(true);
      return;
    }
    try {
      // Always use maximum resolution (3x) for crystal-clear clipboard copy
      const url = await canvasApi.exportAs('png', 1, 3, 'copy', false);
      const res = await fetch(url);
      const blob = await res.blob();
      if (navigator.clipboard && navigator.clipboard.write) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        trackCopyClipboard('png', 3);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } else {
        onExport();
      }
    } catch (err) {
      console.error("Clipboard copy failed, opening preview instead:", err);
      onExport();
    }
  };

  const handleNativeShare = async () => {
    if (!canvasApi.hasImage) {
      setIsErrorModalOpen(true);
      return;
    }
    try {
      // Always use maximum resolution (3x) for crystal-clear native mobile sharing
      const url = await canvasApi.exportAs('png', 1, 3, imageName.trim() || 'pon-sar-yay', false);
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], `${imageName.trim() || 'ponsaryay'}.png`, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Pon-Sar-Yay Creation',
          text: 'Made with Pon-Sar-Yay (ပုံစာရေး)',
        });
        trackNativeShare('png', 3);
      } else {
        onExport();
      }
    } catch (err) {
      console.error("Native share failed, opening preview instead:", err);
      onExport();
    }
  };

  return (
    <div className="space-y-2 md:space-y-3 text-xs">
      {/* <div className="font-bold text-xs md:text-sm text-orange-500 uppercase tracking-wider">{t('export')}</div> */}

      <div className="space-y-0.5 md:space-y-1">
        <div className="text-[11px] text-neutral-300">{t("format")}</div>
        <div className="flex gap-1">
          {["png", "jpeg"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFormat(f)}
              className={`flex-1 rounded-md border px-2 py-0.5 md:py-1 uppercase ${
                format === f
                  ? "border-orange-500 bg-neutral-900"
                  : "border-neutral-700 bg-neutral-950"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {format === "jpeg" && (
        <div className="space-y-0.5 md:space-y-1">
          <div className="text-[11px] text-neutral-300">{t("quality")}</div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0.6"
              max="1"
              step="0.02"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="flex-1"
            />
            <div className="w-10 text-right">{Math.round(quality * 100)}%</div>
          </div>
        </div>
      )}

      <div className="space-y-0.5 md:space-y-1">
        <div className="text-[11px] text-neutral-300">{t("size")}</div>
        <div className="flex gap-1">
          {[1, 2, 3].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMultiplier(m)}
              className={`flex-1 rounded-md border px-2 py-0.5 md:py-1 ${
                multiplier === m
                  ? "border-orange-500 bg-neutral-900"
                  : "border-neutral-700 bg-neutral-950"
              }`}
            >
              {m}x
            </button>
          ))}
        </div>
        <p className="text-[10px] text-orange-400 mt-1 italic">
          {t("resolution_notice")}
        </p>
      </div>
      <div className="space-y-1 p-2 rounded-lg border border-neutral-800">
        <div className="flex justify-between items-center">
          <label className="text-[11px] font-medium text-neutral-300">
            {t("image name")} <span className="text-red-500">*</span>
          </label>
        </div>
        <input
          type="text"
          required
          value={imageName}
          onChange={(e) => {
            setImageName(e.target.value);
            if (e.target.value.trim()) setError("");
          }}
          placeholder={t("please enter image name")}
          className={`w-full rounded-md border px-2.5 py-2 bg-neutral-950 text-neutral-50 transition-all focus:outline-none focus:ring-1 text-xs ${
            error
              ? "border-red-500 focus:ring-red-500 ring-red-500/20"
              : "border-neutral-700 focus:ring-orange-500 focus:border-orange-500"
          }`}
        />
        {error && (
          <div className="flex items-center gap-1.5 mt-1 text-red-500 bg-red-500/10 p-1.5 rounded border border-red-500/20 animate-in fade-in slide-in-from-top-1">
            <span className="text-[10px] font-bold">!</span>
            <p className="text-[10px] font-medium leading-none">{error}</p>
          </div>
        )}
      </div>
      {/* <div className="pt-1">
        <p className="text-[10px] text-neutral-400 text-center italic">
          {t('preview_before_download_hint') || "A preview will open before saving."}
        </p>
      </div> */}
      <p className="text-[11px] text-neutral-400 mb-2 lg:hidden flex">
        {t("in_app_browser_warning") ||
          "Some in-app browsers (like Messenger) block direct downloads. Using long-press is the most reliable way."}
      </p>
      <button
        type="button"
        onClick={onExport}
        className="w-full mt-1 rounded-md bg-orange-600 text-sm py-2 md:py-3 font-semibold hover:bg-orange-500 transition-colors shadow-sm"
      >
        {t("download image")}
      </button>

      {/* Direct Copy & Share actions */}
      <div className="flex gap-1.5 pt-1">
        <button
          type="button"
          onClick={handleCopyClipboard}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-md border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold transition-colors"
          title={t("copy_image")}
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-500" />
              <span className="text-emerald-400">{t("copied")}</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>{t("copy_image")}</span>
            </>
          )}
        </button>

        {typeof navigator !== 'undefined' && !!navigator.share && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-md border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold transition-colors"
            title={t("share")}
          >
            <Share2 size={14} />
            <span>{t("share")}</span>
          </button>
        )}
      </div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageUrl={previewUrl}
        filename={imageName}
      />

      <MessageModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title={t("upload image")}
        message={t("please upload an image first.")}
        type="warning"
      />
    </div>
  );
}


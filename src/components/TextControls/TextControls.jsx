import React, { useEffect, useState } from "react";
import { ColorPicker } from "./ColorPicker.jsx";
import { TextStyleButtons } from "./TextStyleButtons.jsx";
import { useLanguage } from "../../contexts/LanguageContext.jsx";
import { trackShadowPreset } from "../../utils/analytics.js";

const STROKE_MAX = 16;

function snapStrokeWidth(value) {
  return (
    Math.round(Math.max(0, Math.min(STROKE_MAX, Number(value) || 0)) * 2) / 2
  );
}

function formatStrokeWidthLabel(value) {
  const v = snapStrokeWidth(value);
  return v % 1 === 0 ? `${v}px` : `${v.toFixed(1)}px`;
}

export function TextControls({ canvasApi }) {
  const { t } = useLanguage();
  const [fontSize, setFontSize] = useState(32);
  const [color, setColor] = useState("#ffffff");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [lineHeight, setLineHeight] = useState(1.2);
  const [align, setAlign] = useState("center");
  const [styles, setStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  const [shadowEnabled, setShadowEnabled] = useState(false);
  const [shadowColor, setShadowColor] = useState("#000000");
  const [shadowBlur, setShadowBlur] = useState(8);
  const [shadowOffsetX, setShadowOffsetX] = useState(2);
  const [shadowOffsetY, setShadowOffsetY] = useState(2);

  useEffect(() => {
    const obj = canvasApi.selectedObject;
    if (!obj) return;
    setFontSize(obj.fontSize || 32);
    setColor(obj.fill || "#ffffff");
    setStrokeColor(
      obj.stroke && String(obj.stroke).trim() !== "" ? obj.stroke : "#000000",
    );
    setStrokeWidth(
      snapStrokeWidth(
        typeof obj.strokeWidth === "number" ? obj.strokeWidth : 0,
      ),
    );
    setOpacity(obj.opacity ?? 1);
    setLineHeight(obj.lineHeight ?? 1.2);
    setAlign(obj.textAlign || "center");
    setStyles({
      bold: obj.fontWeight === "700" || obj.fontWeight === "bold",
      italic: obj.fontStyle === "italic",
      underline: !!obj.underline,
    });
    if (obj.shadow) {
      setShadowEnabled(true);
      setShadowColor(obj.shadow.color || "#000000");
      setShadowBlur(typeof obj.shadow.blur === "number" ? obj.shadow.blur : 8);
      setShadowOffsetX(
        typeof obj.shadow.offsetX === "number" ? obj.shadow.offsetX : 2,
      );
      setShadowOffsetY(
        typeof obj.shadow.offsetY === "number" ? obj.shadow.offsetY : 2,
      );
    } else {
      setShadowEnabled(false);
    }
  }, [canvasApi.selectedObject]);

  useEffect(() => {
    canvasApi.updateSelectedText({
      fontSize: Number(fontSize) || 32,
      fill: color,
      stroke: strokeColor,
      strokeWidth: snapStrokeWidth(strokeWidth),
      opacity,
      lineHeight,
      textAlign: align,
      fontWeight: styles.bold ? "700" : "400",
      fontStyle: styles.italic ? "italic" : "normal",
      underline: styles.underline,
      shadow: shadowEnabled
        ? {
            color: shadowColor,
            blur: Number(shadowBlur) || 0,
            offsetX: Number(shadowOffsetX) || 0,
            offsetY: Number(shadowOffsetY) || 0,
          }
        : null,
    });
  }, [
    fontSize,
    color,
    strokeColor,
    strokeWidth,
    opacity,
    lineHeight,
    align,
    styles,
    shadowEnabled,
    shadowColor,
    shadowBlur,
    shadowOffsetX,
    shadowOffsetY,
    canvasApi,
  ]);

  const handleDecFontSize = () => {
    setFontSize((prev) => Math.max(8, Number(prev) - 1));
  };

  const handleIncFontSize = () => {
    setFontSize((prev) => Math.min(200, Number(prev) + 1));
  };

  return (
    <div className="min-w-0 space-y-2 text-xs">
      <div className="font-semibold text-xs md:text-sm mb-0.5">
        {t("text controls")}
      </div>

      <div className="flex w-full min-w-0 flex-col gap-4 md:gap-0 md:space-y-2">
        <div className="flex w-full min-w-0 flex-col gap-2 md:gap-0 md:space-y-2">
          {/* Font size */}
          <div className="space-y-0.5">
            <div className="text-[11px] text-neutral-300">{t("font size")}</div>
            <div className="flex items-center gap-1.5 h-[24px]">
              <input
                type="range"
                min="8"
                max="200"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="flex-1 min-w-0"
              />
              <div className="flex items-center rounded-md bg-neutral-900 border border-neutral-700 h-full shrink-0">
                <button
                  type="button"
                  onClick={handleDecFontSize}
                  className="w-5 md:w-6 h-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-l-md border-r border-neutral-700 pb-0.5"
                >
                  -
                </button>
                <input
                  type="number"
                  min="8"
                  max="200"
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-8 md:w-12 h-full bg-transparent text-center text-xs outline-none hide-spin-button"
                />
                <button
                  type="button"
                  onClick={handleIncFontSize}
                  className="w-5 md:w-6 h-full flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-r-md border-l border-neutral-700 pb-0.5"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Line height */}
          <div className="space-y-0.5">
            <div className="text-[11px] text-neutral-300">
              {t("line height")}
            </div>
            <div className="flex items-center gap-1.5 h-[24px]">
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                className="flex-1 min-w-0"
              />
              <div className="w-8 md:w-10 text-right shrink-0 leading-none">
                {lineHeight.toFixed(1)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-2 md:gap-0 md:space-y-2">
          <ColorPicker
            label={t("text color")}
            value={color}
            onChange={setColor}
          />
          <div className="w-full min-w-0 space-y-0.5">
            <div className="text-[11px] text-neutral-300 mt-2">
              {t("stroke width")}
            </div>
            <div className="flex h-[24px] w-full min-w-0 items-center gap-1.5">
              <input
                type="range"
                min="0"
                max={STROKE_MAX}
                step="0.5"
                value={strokeWidth}
                onChange={(e) =>
                  setStrokeWidth(snapStrokeWidth(e.target.value))
                }
                className="min-w-0 flex-1"
              />
              <div className="min-w-[2.75rem] shrink-0 text-right text-[11px] text-neutral-400 tabular-nums">
                {formatStrokeWidthLabel(strokeWidth)}
              </div>
            </div>
          </div>
          <ColorPicker
            label={t("stroke color")}
            value={strokeColor}
            onChange={setStrokeColor}
            hideSwatches={true}
          />
        </div>
      </div>

      {/* Alignment & Style side by side on mobile */}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-0 md:space-y-2">
        <div className="space-y-0.5">
          <div className="text-[11px] text-neutral-300 mt-2">
            {t("alignment")}
          </div>
          <div className="flex gap-1">
            {["left", "center", "right"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setAlign(option)}
                className={`flex-1 rounded-md border px-1.5 md:px-2 py-0.5 md:py-1 capitalize text-[10px] md:text-xs h-6 md:h-7 ${
                  align === option
                    ? "border-orange-500 bg-neutral-900"
                    : "border-neutral-700 bg-neutral-950"
                }`}
              >
                {t(option)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-0.5">
          <div className="text-[11px] text-neutral-300 mt-2">{t("style")}</div>
          <TextStyleButtons value={styles} onChange={setStyles} />
        </div>
      </div>

      <div className="space-y-0.5">
        <div className="text-[11px] text-neutral-300">{t("opacity")}</div>
        <div className="flex items-center gap-1.5">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="flex-1"
          />
          <div className="w-10 text-right">{Math.round(opacity * 100)}%</div>
        </div>
      </div>

      {/* Text Shadow & Glow Section */}
      <div className="space-y-2 pt-2 border-t border-neutral-800">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-neutral-300">
            {t("shadow")}
          </span>
          <button
            type="button"
            onClick={() => setShadowEnabled(!shadowEnabled)}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
              shadowEnabled
                ? "bg-orange-600 text-white"
                : "bg-neutral-800 text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {shadowEnabled ? "ON" : "OFF"}
          </button>
        </div>

        {shadowEnabled && (
          <div className="space-y-2 pt-1">
            {/* Presets */}
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => {
                  setShadowBlur(14);
                  setShadowOffsetX(0);
                  setShadowOffsetY(0);
                  trackShadowPreset("glow");
                }}
                className="flex-1 py-1 px-1.5 rounded border border-neutral-700 bg-neutral-900 hover:border-orange-500 text-[10px] font-medium text-neutral-200"
              >
                {t("glow")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShadowBlur(8);
                  setShadowOffsetX(2);
                  setShadowOffsetY(2);
                  trackShadowPreset("soft_shadow");
                }}
                className="flex-1 py-1 px-1.5 rounded border border-neutral-700 bg-neutral-900 hover:border-orange-500 text-[10px] font-medium text-neutral-200"
              >
                {t("soft_shadow")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShadowBlur(0);
                  setShadowOffsetX(3);
                  setShadowOffsetY(3);
                  trackShadowPreset("hard_shadow");
                }}
                className="flex-1 py-1 px-1.5 rounded border border-neutral-700 bg-neutral-900 hover:border-orange-500 text-[10px] font-medium text-neutral-200"
              >
                {t("hard_shadow")}
              </button>
            </div>

            {/* Blur */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>{t("blur")}</span>
                <span>{shadowBlur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={shadowBlur}
                onChange={(e) => setShadowBlur(Number(e.target.value))}
                className="w-full h-4"
              />
            </div>

            {/* Offset Y */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>{t("offset y")}</span>
                <span>{shadowOffsetY}px</span>
              </div>
              <input
                type="range"
                min="-20"
                max="20"
                value={shadowOffsetY}
                onChange={(e) => setShadowOffsetY(Number(e.target.value))}
                className="w-full h-4"
              />
            </div>

            {/* Shadow Color */}
            <ColorPicker
              label={t("color")}
              value={shadowColor}
              onChange={setShadowColor}
              hideSwatches={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}

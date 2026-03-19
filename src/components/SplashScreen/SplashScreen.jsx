import React from "react";
import { useLanguage } from "../../contexts/LanguageContext.jsx";

export function SplashScreen({ exiting }) {
  const { t } = useLanguage();

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-100 transition-opacity duration-500 ease-out ${
        exiting ? "pointer-events-none opacity-90" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-busy={!exiting}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(234,88,12,0.12)_0%,transparent_58%)]" />
      <img
        src="/ponsaryay.png"
        alt=""
        className="splash-logo-pulse relative mb-8 h-24 w-24 rounded-full object-contain shadow-lg shadow-neutral-300/60 md:h-28 md:w-28"
        width={112}
        height={112}
        decoding="async"
      />
      <div className="relative flex flex-col items-center gap-3">
        <h1 className="text-xl font-bold uppercase tracking-tight text-neutral-900 md:text-2xl">
          Pon-Sar-Yay
        </h1>
        <p className="flex items-center gap-2 text-sm text-neutral-600">
          <span>{t("splash loading")}</span>
          <span
            className="splash-dots inline-flex items-center gap-1"
            aria-hidden
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-600" />
            <span className="h-1.5 w-1.5 rounded-full bg-orange-600" />
            <span className="h-1.5 w-1.5 rounded-full bg-orange-600" />
          </span>
        </p>
      </div>
    </div>
  );
}

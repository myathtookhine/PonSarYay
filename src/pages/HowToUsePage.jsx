import React from 'react';
import { Link } from 'react-router-dom';
import { StaticPageLayout } from '../components/Landing/StaticPageLayout.jsx';
import { HOW_TO_USE_STEPS } from '../data/guidesData.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { ArrowRight, Lightbulb, Sparkles, Check } from 'lucide-react';
import { renderFormattedText } from '../components/common/ArticleContent.jsx';

export function HowToUsePage() {
  const { language } = useLanguage();
  const { darkMode } = useTheme();

  const isMy = language === 'my';

  const cardBg = darkMode ? '#121212' : '#ffffff';
  const borderColor = darkMode ? '#262626' : '#e5e7eb';
  const textPrimary = darkMode ? '#ffffff' : '#0f172a';
  const textSecondary = darkMode ? '#d1d5db' : '#374151';

  return (
    <StaticPageLayout
      title={isMy ? "အသုံးပြုပုံလမ်းညွှန်" : "How to Use PonSarYay"}
      description={
        isMy
          ? "PonSarYay (ပုံစာရေး) အသုံးပြုနည်း အဆင့်ဆင့်။ ဓာတ်ပုံတင်ခြင်း၊ မြန်မာယူနီကုဒ်ဖောင့်ရွေးချယ်ခြင်း၊ စာသားအနားကွပ် ထည့်သွင်းခြင်းနှင့် ပုံသိမ်းဆည်းနည်း လမ်းညွှန်။"
          : "Step-by-step guide to using PonSarYay. Learn how to upload photos, choose Myanmar Unicode fonts, adjust text styling, and export high-res images on mobile and PC."
      }
      keywords="how to use PonSarYay, Myanmar text on image guide, photo text tutorial, Myanmar font tutorial, ပုံစာရေး အသုံးပြုနည်း"
      breadcrumbs={[{ label: isMy ? 'အသုံးပြုနည်း' : 'How to Use' }]}
      badge={isMy ? 'လမ်းညွှန်နှင့် သင်ခန်းစာ' : 'Tutorial & Guide'}
      headline={isMy ? 'Pon-Sar-Yay (ပုံစာရေး) အသုံးပြုနည်း' : 'How to Use Pon-Sar-Yay'}
      subheadline={
        isMy
          ? 'သင့်ဓာတ်ပုံများပေါ်တွင် မြန်မာနှင့် အင်္ဂလိပ်စာလုံးအလှများကို လွယ်ကူစွာ ရေးသားနိုင်စေမည့် အခြေခံ အဆင့် ၅ ဆင့်။'
          : 'Master the art of adding beautiful Myanmar and English text to your photos in five straightforward steps.'
      }
    >
      {/* Quick Summary Banner */}
      <div
        className="p-6 sm:p-8 rounded-2xl border mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        style={{
          backgroundColor: darkMode ? '#181818' : '#fff7ed',
          borderColor: darkMode ? '#333333' : '#fed7aa',
        }}
      >
        <div className="space-y-2">
          <h3 className="text-base sm:text-xl font-bold flex items-center gap-2">
            <Sparkles size={20} className="text-orange-500" />
            <span>{isMy ? 'ယခုပင် စတင်ဖန်တီးလိုပါသလား?' : 'Ready to start creating right now?'}</span>
          </h3>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecondary }}>
            {isMy
              ? 'Editor ထဲသို့ တိုက်ရိုက်ဝင်ရောက်၍ စမ်းသပ်နိုင်သလို အောက်ပါ အသေးစိတ် လမ်းညွှန်ချက်များကိုလည်း ဆက်လက် ဖတ်ရှုနိုင်ပါသည်။'
              : 'Jump directly into the live photo editor or follow the comprehensive guide below.'}
          </p>
        </div>
        <Link
          to="/editor"
          className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-sm sm:text-base font-bold shrink-0 flex items-center gap-2 transition-colors shadow-md"
        >
          <span>{isMy ? 'Editor ဖွင့်မည်' : 'Open Editor'}</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Step by Step Timeline */}
      <div className="space-y-10">
        {HOW_TO_USE_STEPS.map((step) => {
          const title = isMy ? step.title_my : step.title;
          const summary = isMy ? step.summary_my : step.summary;
          const details = isMy ? step.details_my : step.details;
          const proTip = isMy ? step.proTip_my : step.proTip;

          return (
            <article
              key={step.step}
              className="p-6 sm:p-10 rounded-2xl border transition-all"
              style={{
                backgroundColor: cardBg,
                borderColor,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs sm:text-sm font-extrabold px-3 py-1 rounded-md bg-orange-600 text-white tracking-widest">
                  {isMy ? `အဆင့် ${step.step}` : `STEP ${step.step}`}
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight" style={{ color: textPrimary }}>
                  {title}
                </h2>
              </div>

              <p className="text-base sm:text-xl font-medium mb-6 leading-relaxed" style={{ color: textSecondary }}>
                {summary}
              </p>

              <ul className="space-y-3.5 text-base sm:text-lg mb-8 list-none p-0">
                {details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-3 leading-relaxed">
                    <Check size={20} className="text-emerald-500 shrink-0 mt-1" />
                    <span style={{ color: textSecondary }}>{renderFormattedText(detail)}</span>
                  </li>
                ))}
              </ul>

              {/* Pro Tip Callout */}
              <div
                className="p-5 rounded-xl border flex items-start gap-3.5 text-sm sm:text-base"
                style={{
                  backgroundColor: darkMode ? '#181818' : '#f0fdf4',
                  borderColor: darkMode ? '#262626' : '#bbf7d0',
                }}
              >
                <Lightbulb size={22} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-500 uppercase tracking-wider text-xs sm:text-sm block mb-1">
                    {isMy ? 'အကြံပြုချက် (Creator Tip)' : 'Creator Tip'}
                  </span>
                  <p className="m-0 leading-relaxed font-medium" style={{ color: darkMode ? '#e5e7eb' : '#1f2937' }}>
                    {renderFormattedText(proTip)}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center p-8 sm:p-12 rounded-2xl border" style={{ backgroundColor: cardBg, borderColor }}>
        <h3 className="text-2xl sm:text-4xl font-extrabold mb-3" style={{ color: textPrimary }}>
          {isMy ? 'သင်၏ ပထမဆုံး ပုံစာကို ဖန်တီးရန် အဆင်သင့်ဖြစ်ပြီလား?' : 'Ready to Design Your First Graphic?'}
        </h3>
        <p className="text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: textSecondary }}>
          {isMy
            ? 'မည်သည့်ဆော့ဖ်ဝဲလ်မှ ဒေါင်းလုဒ်ဆွဲစရာမလိုဘဲ ဖုန်းနှင့် ကွန်ပျူတာပေါ်တွင် ချက်ချင်း အခမဲ့ အသုံးပြုနိုင်ပါသည်။'
            : 'Upload any photo and explore over 34 handcrafted Myanmar fonts with zero software to install.'}
        </p>
        <Link
          to="/editor"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-base sm:text-lg font-bold shadow-lg transition-colors"
        >
          <span>{isMy ? 'PonSarYay Editor စတင်မည်' : 'Launch PonSarYay Editor'}</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </StaticPageLayout>
  );
}

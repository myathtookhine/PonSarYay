import React from 'react';
import { Link } from 'react-router-dom';
import { StaticPageLayout } from '../components/Landing/StaticPageLayout.jsx';
import { TYPOGRAPHY_TIPS } from '../data/guidesData.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { Clock, Tag, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { ArticleContent } from '../components/Common/ArticleContent.jsx';

export function TypographyTipsPage() {
  const { language } = useLanguage();
  const { darkMode } = useTheme();

  const isMy = language === 'my';

  const cardBg = darkMode ? '#121212' : '#ffffff';
  const borderColor = darkMode ? '#262626' : '#e5e7eb';
  const textPrimary = darkMode ? '#ffffff' : '#0f172a';
  const textSecondary = darkMode ? '#d1d5db' : '#374151';

  return (
    <StaticPageLayout
      title={isMy ? "မြန်မာဖောင့် ဒီဇိုင်းနှင့် အနုပညာ အကြံပြုချက်များ" : "Myanmar Typography & Styling Tips"}
      description={
        isMy
          ? "မြန်မာဖောင့် တွဲစပ်မှု စည်းမျဉ်းများ၊ ဓာတ်ပုံပေါ်တွင် စာသားထင်ရှားစေရန် အနားကွပ် (Stroke) အသုံးပြုနည်းနှင့် ယူနီကုဒ်စာလုံး အထားအသို မှန်ကန်စေမည့် အကြံပြုချက်များ။"
          : "Professional tips on Myanmar font pairing, contrast rules, line spacing, and social media text legibility."
      }
      keywords="Myanmar typography tips, font pairing Myanmar, quote card design, contrast on photos, Burmese font guide, မြန်မာဖောင့်အလှ"
      breadcrumbs={[{ label: isMy ? 'ဖောင့်အကြံပြုချက်' : 'Typography Tips' }]}
      badge={isMy ? 'ဒီဇိုင်းအကြံပြုချက်များ' : 'Design Insights'}
      headline={isMy ? 'မြန်မာဖောင့်နှင့် ပုံစာဒီဇိုင်း အကြံပြုချက်များ' : 'Typography & Styling Tips'}
      subheadline={
        isMy
          ? 'ဆိုရှယ်မီဒီယာ ပိုစ့်များ၊ ကဗျာကတ်များနှင့် ကြော်ငြာများကို ပရော်ဖက်ရှင်နယ်ဆန်စွာ သပ်ရပ်လှပစေမည့် လက်တွေ့ကျသော ဒီဇိုင်းနည်းလမ်းများ။'
          : 'Actionable design guidance to elevate your social media quotes, poetry cards, and marketing graphics with professional polish.'
      }
    >
      {/* Tips Grid */}
      <div className="space-y-12">
        {TYPOGRAPHY_TIPS.map((tip) => {
          const title = isMy ? tip.title_my : tip.title;
          const category = isMy ? tip.category_my : tip.category;
          const readTime = isMy ? tip.readTime_my : tip.readTime;
          const summary = isMy ? tip.summary_my : tip.summary;
          const content = isMy ? tip.content_my : tip.content;

          return (
            <article
              key={tip.id}
              id={tip.id}
              className="p-6 sm:p-10 rounded-2xl border transition-all"
              style={{
                backgroundColor: cardBg,
                borderColor,
              }}
            >
              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4 text-xs sm:text-sm">
                <span className="px-3 py-1 rounded-full font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center gap-1.5">
                  <Tag size={13} />
                  <span>{category}</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium" style={{ color: textSecondary }}>
                  <Clock size={14} />
                  <span>{readTime}</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4" style={{ color: textPrimary }}>
                {title}
              </h2>

              <p className="text-base sm:text-xl font-medium mb-8 leading-relaxed" style={{ color: textSecondary }}>
                {summary}
              </p>

              {/* Content */}
              <div className="border-t pt-8" style={{ borderColor }}>
                <ArticleContent content={content} />
              </div>
            </article>
          );
        })}
      </div>

      {/* Editor Promotion CTA */}
      <div
        className="mt-16 p-8 sm:p-10 rounded-2xl border text-center space-y-4"
        style={{
          backgroundColor: darkMode ? '#181818' : '#fff7ed',
          borderColor: darkMode ? '#333333' : '#fed7aa',
        }}
      >
        <Sparkles size={32} className="text-orange-500 mx-auto" />
        <h3 className="text-xl sm:text-3xl font-extrabold">
          {isMy ? 'ဤအကြံပြုချက်များကို လက်တွေ့ အသုံးချကြည့်ပါ' : 'Put These Tips Into Practice'}
        </h3>
        <p className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: textSecondary }}>
          {isMy
            ? 'အနားကွပ်အထူ၊ စာကြောင်းအကွာအဝေးနှင့် ဖောင့်စတိုင်အလှများကို ကျွန်ုပ်တို့၏ အခမဲ့ ဝဘ်အယ်ဒီတာတွင် တိုက်ရိုက် စမ်းသပ်နိုင်ပါသည်။'
            : 'Experiment with stroke width, custom fonts, and line-height directly in our free browser editor.'}
        </p>
        <div className="pt-2">
          <Link
            to="/editor"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-base font-bold transition-colors shadow-md"
          >
            <span>{isMy ? 'PonSarYay Studio ဖွင့်မည်' : 'Open PonSarYay Studio'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </StaticPageLayout>
  );
}

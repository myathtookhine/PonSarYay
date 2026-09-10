import React from 'react';
import { StaticPageLayout } from '../components/Landing/StaticPageLayout.jsx';
import { TERMS_OF_SERVICE_CONTENT } from '../data/legalData.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { FileText, CheckCircle } from 'lucide-react';
import { ArticleContent } from '../components/common/ArticleContent.jsx';

export function TermsOfServicePage() {
  const { language } = useLanguage();
  const { darkMode } = useTheme();
  const isMy = language === 'my';

  const cardBg = darkMode ? '#121212' : '#ffffff';
  const borderColor = darkMode ? '#262626' : '#e5e7eb';
  const textPrimary = darkMode ? '#ffffff' : '#0f172a';
  const textSecondary = darkMode ? '#d1d5db' : '#374151';

  const lastUpdated = isMy ? TERMS_OF_SERVICE_CONTENT.lastUpdated_my : TERMS_OF_SERVICE_CONTENT.lastUpdated;

  return (
    <StaticPageLayout
      title={isMy ? "အသုံးပြုမှု စည်းမျဉ်းများ" : "Terms of Service"}
      description={
        isMy
          ? "PonSarYay (ပုံစာရေး) ဝန်ဆောင်မှု အသုံးပြုမှု စည်းမျဉ်းများ။ သင့်လက်ရာများ၏ မူပိုင်ခွင့် အပြည့်အဝ ပိုင်ဆိုင်ခွင့်နှင့် ဖောင့်လိုင်စင်ဆိုင်ရာ အသိပေးချက်များ။"
          : "PonSarYay Terms of Service. Review our usage guidelines, font licensing attributions, and user content ownership rights."
      }
      keywords="terms of service, PonSarYay terms, user agreement, font licenses, acceptable use, အသုံးပြုမှုစည်းမျဉ်းများ"
      breadcrumbs={[{ label: isMy ? 'အသုံးပြုမှုစည်းမျဉ်းများ' : 'Terms of Service' }]}
      badge={isMy ? 'တရားဝင် သဘောတူညီချက်' : 'Legal Agreement'}
      headline={isMy ? 'အသုံးပြုမှု စည်းမျဉ်းများ (Terms of Service)' : 'Terms of Service'}
      subheadline={
        isMy
          ? `နောက်ဆုံးပြင်ဆင်သည့်ရက်စွဲ - ${lastUpdated}။ PonSarYay ဝဘ်အက်ပလီကေးရှင်းကို အသုံးမပြုမီ ဤစည်းမျဉ်းများကို သေချာစွာ ဖတ်ရှုပါ။`
          : `Last Updated: ${lastUpdated}. Please read these terms carefully before accessing or using the PonSarYay web application.`
      }
    >
      {/* Key Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="p-6 rounded-2xl border flex items-start gap-4" style={{ backgroundColor: cardBg, borderColor }}>
          <CheckCircle size={26} className="text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider mb-1.5" style={{ color: textPrimary }}>
              {isMy ? '၁၀၀% အသုံးပြုသူ လက်ရာမူပိုင်ခွင့်' : '100% User Content Ownership'}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecondary }}>
              {isMy
                ? 'PonSarYay ဖြင့် သင်ဖန်တီးသော ပုံစာဒီဇိုင်းများ၊ စာသားများနှင့် ဓာတ်ပုံများအားလုံးကို သင်ကိုယ်တိုင် အပြည့်အဝ ပိုင်ဆိုင်ပါသည်။'
                : 'You retain all copyright and intellectual property rights over any images, quotes, and posters you create.'}
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl border flex items-start gap-4" style={{ backgroundColor: cardBg, borderColor }}>
          <FileText size={26} className="text-blue-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider mb-1.5" style={{ color: textPrimary }}>
              {isMy ? 'ပွင့်လင်းဖောင့် လိုင်စင်များ' : 'Open Font Licensing'}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecondary }}>
              {isMy
                ? 'ပါဝင်သော ဖောင့်အားလုံးကို မူရင်းဖန်တီးသူများ၏ အခမဲ့ Open License များအတိုင်း ဂုဏ်ပြုဖော်ပြထားပါသည်။'
                : 'All Myanmar and English fonts are provided under respective open licenses with full attribution to original creators.'}
            </p>
          </div>
        </div>
      </div>

      {/* Terms Sections */}
      <article className="space-y-10 leading-relaxed">
        {TERMS_OF_SERVICE_CONTENT.sections.map((section) => {
          const title = isMy ? section.title_my || section.title : section.title;
          const content = isMy ? section.content_my || section.content : section.content;

          return (
            <section
              key={section.id}
              id={section.id}
              className="p-7 sm:p-10 rounded-2xl border transition-colors shadow-sm"
              style={{
                backgroundColor: cardBg,
                borderColor,
              }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-5 tracking-tight" style={{ color: textPrimary }}>
                {title}
              </h2>
              <ArticleContent content={content} />
            </section>
          );
        })}
      </article>
    </StaticPageLayout>
  );
}

import React from 'react';
import { StaticPageLayout } from '../components/Landing/StaticPageLayout.jsx';
import { PRIVACY_POLICY_CONTENT } from '../data/legalData.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { ShieldCheck, Lock, ServerOff } from 'lucide-react';
import { ArticleContent } from '../components/Common/ArticleContent.jsx';

export function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const { darkMode } = useTheme();
  const isMy = language === 'my';

  const cardBg = darkMode ? '#121212' : '#ffffff';
  const borderColor = darkMode ? '#262626' : '#e5e7eb';
  const textPrimary = darkMode ? '#ffffff' : '#0f172a';
  const textSecondary = darkMode ? '#d1d5db' : '#374151';

  const lastUpdated = isMy ? PRIVACY_POLICY_CONTENT.lastUpdated_my : PRIVACY_POLICY_CONTENT.lastUpdated;

  return (
    <StaticPageLayout
      title={isMy ? "ကိုယ်ရေးကိုယ်တာ လုံခြုံမှုမူဝါဒ" : "Privacy Policy"}
      description={
        isMy
          ? "PonSarYay (ပုံစာရေး) ၏ ကိုယ်ရေးလုံခြုံမှုမူဝါဒ။ သင့်ဓာတ်ပုံများ ဆာဗာသို့ မရောက်ရှိဘဲ စက်တွင်း၌သာ လုံခြုံစွာ လုပ်ဆောင်မှု၊ ကွတ်ကီးများနှင့် Google AdSense ကြော်ငြာစနစ်ဆိုင်ရာ ရှင်းလင်းချက်။"
          : "PonSarYay Privacy Policy. Learn about our strict client-side image processing, Google AdSense third-party cookie disclosures, and how we protect your privacy."
      }
      keywords="privacy policy, PonSarYay privacy, AdSense cookies, client side image processing, photo editor privacy, ကိုယ်ရေးလုံခြုံမှုမူဝါဒ"
      breadcrumbs={[{ label: isMy ? 'ကိုယ်ရေးလုံခြုံမှုမူဝါဒ' : 'Privacy Policy' }]}
      badge={isMy ? 'လုံခြုံမှုနှင့် ပွင့်လင်းမြင်သာမှု' : 'Compliance & Trust'}
      headline={isMy ? 'ကိုယ်ရေးကိုယ်တာ လုံခြုံမှုမူဝါဒ (Privacy Policy)' : 'Privacy Policy'}
      subheadline={
        isMy
          ? `နောက်ဆုံးပြင်ဆင်သည့်ရက်စွဲ - ${lastUpdated}။ ကျွန်ုပ်တို့၏ စက်တွင်းလုပ်ဆောင်မှု လုံခြုံရေးကတိကဝတ်၊ ကွတ်ကီးများနှင့် Google AdSense ကြော်ငြာဆိုင်ရာ စည်းမျဉ်းများ။`
          : `Last Updated: ${lastUpdated}. Read our complete data protection policy, local storage disclosures, and Google AdSense compliance terms.`
      }
    >
      {/* Highlight Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-2xl border flex items-start gap-4" style={{ backgroundColor: cardBg, borderColor }}>
          <ServerOff size={26} className="text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider mb-1.5" style={{ color: textPrimary }}>
              {isMy ? 'ဆာဗာသို့ ပေးပို့ခြင်း လုံးဝမရှိ' : 'Zero Server Uploads'}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecondary }}>
              {isMy
                ? 'သင့်ဓာတ်ပုံများသည် သင့်ဖုန်း/ကွန်ပျူတာပေါ်တွင်သာ တိုက်ရိုက်ရှိနေပြီး မည်သည့်ဆာဗာသို့မျှ မရောက်ရှိပါ။'
                : 'All photos stay on your local device. We never transfer or save images to any remote server.'}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl border flex items-start gap-4" style={{ backgroundColor: cardBg, borderColor }}>
          <Lock size={26} className="text-orange-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider mb-1.5" style={{ color: textPrimary }}>
              {isMy ? 'အကောင့်ဖွင့်ရန် မလို' : 'No Account Needed'}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecondary }}>
              {isMy
                ? 'စကားဝှက်၊ အီးမေးလ် သို့မဟုတ် ကိုယ်ရေးအချက်အလက် ပေးရန်မလိုဘဲ တိုက်ရိုက် လွတ်လပ်စွာ အသုံးပြုနိုင်ပါသည်။'
                : 'Use the full editor instantly without providing passwords, emails, or personal identification.'}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl border flex items-start gap-4" style={{ backgroundColor: cardBg, borderColor }}>
          <ShieldCheck size={26} className="text-blue-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider mb-1.5" style={{ color: textPrimary }}>
              {isMy ? 'AdSense စံနှုန်းများနှင့် ညီညွတ်ခြင်း' : 'AdSense Compliant'}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecondary }}>
              {isMy
                ? 'ကြော်ငြာကွတ်ကီးများနှင့် ပတ်သက်၍ နိုင်ငံတကာစံနှုန်းများနှင့်အညီ ပွင့်လင်းမြင်သာစွာ ဖော်ပြထားပါသည်။'
                : 'Full transparency on advertising cookies, analytics, and user opt-out mechanisms.'}
            </p>
          </div>
        </div>
      </div>

      {/* Policy Sections */}
      <article className="space-y-10 leading-relaxed">
        {PRIVACY_POLICY_CONTENT.sections.map((section) => {
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

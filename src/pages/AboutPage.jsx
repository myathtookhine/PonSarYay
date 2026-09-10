import React from 'react';
import { StaticPageLayout } from '../components/Landing/StaticPageLayout.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { Heart, Sparkles, ShieldCheck, Zap, Layers, Award } from 'lucide-react';

const FONT_CREDITS = [
  { name: 'Pyidaungsu', author: 'Myanmar Unicode & NLP Research Center' },
  { name: 'Myanmar Sans Pro', author: 'Myanmar Sans Pro Team' },
  { name: 'Masterpiece Daung', author: 'Masterpiece Myanmar Unicode Group' },
  { name: 'Masterpiece Spring Rev', author: 'Masterpiece Myanmar Unicode Group' },
  { name: 'Masterpiece Stadium', author: 'Masterpiece Myanmar Unicode Group' },
  { name: 'Masterpiece Taw Win', author: 'Masterpiece Myanmar Unicode Group' },
  { name: 'Masterpiece Uni Hand', author: 'Masterpiece Myanmar Unicode Group' },
  { name: 'Masterpiece Uni Round', author: 'Masterpiece Myanmar Unicode Group' },
  { name: 'Masterpiece Uni Type', author: 'Masterpiece Myanmar Unicode Group' },
  { name: 'Masterpiece Yay Chan Zin', author: 'Masterpiece Myanmar Unicode Group' },
  { name: 'Myanmar3', author: 'Myanmar3 Unicode Font Project' },
  { name: 'Myanmar Angoun', author: 'Myanmar Unicode Community' },
  { name: 'Myanmar Chatu', author: 'Myanmar Unicode Community' },
  { name: 'Myanmar Chatu Light', author: 'Myanmar Unicode Community' },
  { name: 'Myanmar Gantgaw', author: 'Myanmar Unicode Community' },
  { name: 'Myanmar Khyay', author: 'Myanmar Unicode Community' },
  { name: 'Myanmar Kuttar', author: 'Myanmar Unicode Community' },
  { name: 'Myanmar Pauklay', author: 'Myanmar Unicode Community' },
  { name: 'Myanmar Phiksel', author: 'Myanmar Unicode Community' },
  { name: 'Myanmar Sabae', author: 'Myanmar Unicode Community' },
  { name: 'Myanmar Sanpya', author: 'Myanmar Unicode Community' },
  { name: 'Myanmar Square', author: 'Myanmar Unicode Community' },
  { name: 'Myanmar Tagu', author: 'Myanmar Unicode Community' },
  { name: 'Myanmar Waso', author: 'Myanmar Unicode Community' },
  { name: 'Myanmar Yinmar', author: 'Myanmar Unicode Community' },
  { name: 'Noto Sans Myanmar', author: 'Google' },
  { name: 'Noto Serif Myanmar', author: 'Google' },
  { name: 'Burma 026', author: 'Myanmar Font Creator' },
  { name: 'Kamjing', author: 'Myanmar Font Creator' },
  { name: 'ThitSar Shwe Si', author: 'Myanmar Font Creator' },
  { name: 'Yangon', author: 'Myanmar Font Creator' },
  { name: 'YoeYar One', author: 'Myanmar Font Creator' },
  { name: 'Inter', author: 'Rasmus Andersson' },
  { name: 'Space Grotesk', author: 'Florian Karsten' },
];

export function AboutPage() {
  const { t, language } = useLanguage();
  const { darkMode } = useTheme();

  const cardBg = darkMode ? '#121212' : '#ffffff';
  const borderColor = darkMode ? '#262626' : '#e5e7eb';
  const textPrimary = darkMode ? '#ffffff' : '#0f172a';
  const textSecondary = darkMode ? '#d1d5db' : '#374151';

  return (
    <StaticPageLayout
      title="About PonSarYay"
      description="Learn about PonSarYay (ပုံစာရေး), our mission to empower Myanmar creators with beautiful typography on images, and our heartfelt credits to Myanmar font artisans."
      keywords="about PonSarYay, Myanmar typography, Myanmar font creators, image text editor story, font credits"
      breadcrumbs={[{ label: 'About' }]}
      badge="Our Story & Mission"
      headline="About Pon-Sar-Yay (ပုံစာရေး)"
      subheadline="A free, privacy-first typography studio built to make writing beautiful Myanmar and English text on photos effortless, modern, and universally accessible."
    >
      {/* Mission & Problem Statement */}
      <section className="space-y-6 mb-12">
        <div className="p-6 sm:p-10 rounded-2xl border" style={{ backgroundColor: cardBg, borderColor }}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight" style={{ color: textPrimary }}>
            {language === 'my' ? 'ကျွန်ုပ်တို့၏ ရည်ရွယ်ချက်' : 'Why We Built Pon-Sar-Yay'}
          </h2>
          <p className="text-base sm:text-xl leading-relaxed sm:leading-loose mb-5" style={{ color: textSecondary }}>
            {language === 'my'
              ? 'PonSarYay (ပုံစာရေး) သည် ဓာတ်ပုံများပေါ်တွင် မြန်မာစာနှင့် အင်္ဂလိပ်စာများကို လှပသပ်ရပ်စွာ ရေးသားနိုင်ရန် ရည်ရွယ်၍ ဖန်တီးထားသည့် ဝဘ်အက်ပလီကေးရှင်းတစ်ခု ဖြစ်ပါသည်။ ဆိုရှယ်မီဒီယာ ပိုစ့်များ၊ ကဗျာများ၊ ကောက်နုတ်ချက်များနှင့် ကြော်ငြာများကို မြန်မာဖောင့်အမျိုးမျိုး အသုံးပြု၍ စိတ်ကြိုက် ပြင်ဆင်နိုင်စေရန် ဖန်တီးထားပါသည်။'
              : 'Adding beautiful Myanmar text to images has historically been frustrating. Many popular international photo editing tools fail to properly render complex Myanmar Unicode glyphs, resulting in misplaced vowel marks, broken subscripts, and awkward letter collisions.'}
          </p>
          <p className="text-base sm:text-xl leading-relaxed sm:leading-loose" style={{ color: textSecondary }}>
            {language === 'my'
              ? 'ကွန်ပျူတာဖြင့်သာမက စမတ်ဖုန်းများဖြင့်ပါ မည်သည့်ဆော့ဖ်ဝဲလ်မှ ထည့်သွင်းစရာမလိုဘဲ အင်တာနက်ဘရောက်ဇာမှ တိုက်ရိုက် အခမဲ့ အသုံးပြုနိုင်ပါသည်။'
              : 'PonSarYay was built specifically to solve this problem for creators across Myanmar. By leveraging modern HTML5 Canvas technology and bundling over 34 handcrafted Unicode fonts, creators can design professional social media quotes, poetic reflections, and announcement banners directly in their mobile or desktop browser in seconds.'}
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="mb-12">
        <h3 className="text-xl sm:text-2xl font-bold mb-6 tracking-tight" style={{ color: textPrimary }}>Our Core Principles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl border" style={{ backgroundColor: cardBg, borderColor }}>
            <ShieldCheck size={28} className="text-emerald-500 mb-4" />
            <h4 className="text-base sm:text-lg font-bold mb-2" style={{ color: textPrimary }}>Privacy First</h4>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecondary }}>
              Zero server uploads. Your photos and designs remain strictly inside your browser.
            </p>
          </div>

          <div className="p-6 rounded-2xl border" style={{ backgroundColor: cardBg, borderColor }}>
            <Zap size={28} className="text-orange-500 mb-4" />
            <h4 className="text-base sm:text-lg font-bold mb-2" style={{ color: textPrimary }}>Instant & Frictionless</h4>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecondary }}>
              No sign-up forms, no credit cards, no watermarks, and no software installations.
            </p>
          </div>

          <div className="p-6 rounded-2xl border" style={{ backgroundColor: cardBg, borderColor }}>
            <Sparkles size={28} className="text-blue-500 mb-4" />
            <h4 className="text-base sm:text-lg font-bold mb-2" style={{ color: textPrimary }}>Authentic Typography</h4>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecondary }}>
              Deep respect for Myanmar script shaping, proper vertical line-heights, and font artist credits.
            </p>
          </div>
        </div>
      </section>

      {/* Font Credits & Creators Section */}
      <section className="space-y-6 mb-12">
        <div className="p-6 sm:p-10 rounded-2xl border" style={{ backgroundColor: cardBg, borderColor }}>
          <div className="flex items-center gap-3 mb-4">
            <Heart size={26} className="text-red-500 fill-red-500" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: textPrimary }}>
              {language === 'my' ? 'ဖောင့်ဖန်တီးသူများအား ဂုဏ်ပြုမှတ်တမ်း' : 'Font Credits & Author Acknowledgements'}
            </h2>
          </div>
          <p className="text-sm sm:text-lg leading-relaxed mb-8" style={{ color: textSecondary }}>
            {t('about_credits_desc')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {FONT_CREDITS.map((font) => (
              <div
                key={font.name}
                className="p-4 rounded-xl border transition-all hover:border-orange-500/50"
                style={{
                  backgroundColor: darkMode ? '#181818' : '#ffffff',
                  borderColor,
                }}
              >
                <div className="text-base font-semibold mb-1 truncate" style={{ color: textPrimary }}>{font.name}</div>
                <div className="text-sm truncate" style={{ color: textSecondary }}>
                  {font.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="p-8 sm:p-10 rounded-2xl border text-center space-y-5" style={{ backgroundColor: cardBg, borderColor }}>
        <h3 className="text-xl sm:text-2xl font-bold" style={{ color: textPrimary }}>
          {language === 'my' ? 'အကြံပြုချက်နှင့် ပူးပေါင်းပါဝင်မှု' : 'Community & Feedback'}
        </h3>
        <p className="text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: textSecondary }}>
          {language === 'my'
            ? 'PonSarYay ကို အသုံးပြုသူများအတွက် အကောင်းမွန်ဆုံး ဖြစ်စေရန် အမြဲ ကြိုးပမ်းလျက်ရှိပါသည်။ အကြံပြုချက်များ၊ အမှားအယွင်းများ သို့မဟုတ် လိုအပ်သော လုပ်ဆောင်ချက်များကို ဝေမျှပေးနိုင်ပါသည်။'
            : 'Pon-Sar-Yay is dedicated to the creative community. We welcome creators, designers, and font enthusiasts to share feedback, report bugs, and propose new features.'}
        </p>
        <div className="pt-3 flex flex-wrap justify-center gap-3">
          <a
            href="/contact"
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold transition-colors"
          >
            {language === 'my' ? 'ဆက်သွယ်ရန်' : 'Contact Us'}
          </a>
        </div>
      </section>
    </StaticPageLayout>
  );
}

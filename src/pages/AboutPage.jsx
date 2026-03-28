import React from 'react';
import { LandingHeader } from '../components/Landing/LandingHeader.jsx';
import { LandingFooter } from '../components/Landing/LandingFooter.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { Github, Heart } from 'lucide-react';

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
];

export function AboutPage() {
  const { t } = useLanguage();
  const { darkMode } = useTheme();

  return (
    <div
      className="landing-page"
      style={{ backgroundColor: darkMode ? '#0a0a0a' : '#ffffff', color: darkMode ? '#f5f5f5' : '#171717' }}
    >
      <LandingHeader />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        {/* Title */}
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 40, letterSpacing: '-0.02em' }}>
          {t('about_title')}
        </h1>

        {/* Our Story */}
        <section style={{ marginBottom: 48 }}>
          {/* <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 12, color: darkMode ? '#f5f5f5' : '#171717' }}>
            {t('about_story_title')}
          </h2> */}
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: darkMode ? '#a3a3a3' : '#525252', margin: 0 }}>
            {t('about_story')}
          </p>
        </section>

        {/* Font Credits */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8, color: darkMode ? '#f5f5f5' : '#171717' }}>
            <Heart size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8, color: '#ef4444' }} />
            {t('about_credits_title')}
          </h2>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: darkMode ? '#737373' : '#737373', marginBottom: 20 }}>
            {t('about_credits_desc')}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 12,
          }}>
            {FONT_CREDITS.map(font => (
              <div
                key={font.name}
                style={{
                  padding: '14px 16px',
                  borderRadius: 10,
                  border: `1px solid ${darkMode ? '#2a2a2a' : '#e5e5e5'}`,
                  backgroundColor: darkMode ? '#111111' : '#fafafa',
                }}
              >
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: darkMode ? '#e5e5e5' : '#262626', marginBottom: 4 }}>
                  {font.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#737373' }}>
                  {font.author}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Open Source */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 16, color: darkMode ? '#f5f5f5' : '#171717', display: 'flex', alignItems: 'center' }}>
            <Github size={20} style={{ marginRight: 8 }} />
            Open Source
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '1rem', lineHeight: 1.8, color: darkMode ? '#a3a3a3' : '#525252' }}>
            <p style={{ margin: 0 }}>
              <strong>Philosophy:</strong> လှပသေသပ်တဲ့ မြန်မာဖောင့် (Myanmar Fonts) တွေကို အသုံးပြုပြီး ဓာတ်ပုံတွေပေါ်မှာ စာသားတွေ လွတ်လပ်စွာ ရေးသားဖန်တီးနိုင်တဲ့ Tool တစ်ခုကို မြန်မာနိုင်ငံက ဖန်တီးရှင် (Creative) တွေအတွက် လွယ်ကူစွာ အသုံးပြုနိုင်စေဖို့နဲ့ ပိုမိုကောင်းမွန်တဲ့ ပတ်ဝန်းကျင်တစ်ခု အတူတကွ ဖန်တီးနိုင်ဖို့ ရည်ရွယ်ပြီး ဒီပရောဂျက်ကို <strong>Open Source</strong> အနေနဲ့ မျှဝေထားတာ ဖြစ်ပါတယ်။
            </p>

            <p style={{ margin: 0 }}>
              <strong>Tech Stack:</strong> ဒီ application ကို ခေတ်မီနည်းပညာတွေဖြစ်တဲ့ <strong>React</strong> နဲ့ <strong>Fabric.js</strong> တို့ကို အဓိက အသုံးပြုပြီး တည်ဆောက်ထားပါတယ်။
            </p>

            <div style={{
              padding: '24px',
              backgroundColor: darkMode ? '#111111' : '#f8fafc',
              borderRadius: '12px',
              border: `1px solid ${darkMode ? '#2a2a2a' : '#e2e8f0'}`,
              marginTop: '8px',
              marginBottom: '8px'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: darkMode ? '#e5e5e5' : '#1e293b', marginTop: 0, marginBottom: 16, display: 'flex', alignItems: 'center' }}>
                Developer များ ပါဝင်အားဖြည့်နိုင်ပါတယ် 🚀
              </h3>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', color: darkMode ? '#a3a3a3' : '#475569' }}>
                <li><strong>Bug Fixes & Features:</strong> အမှားလေးတွေ တွေ့ရင် ပြင်ဆင်ပေးတာပဲဖြစ်ဖြစ်၊ Feature အသစ်တွေ အကြံပြုတာပဲဖြစ်ဖြစ် လွတ်လပ်စွာ ပါဝင်ဆွေးနွေးနိုင်ပါတယ်။</li>
                <li><strong>How to Contribute:</strong> Source code အပြည့်အစုံကို <a href="https://github.com/myathtookhine/PonSarYay/" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>GitHub</a> မှာ လေ့လာနိုင်ပါတယ်။ ကုဒ်ရေးသားရာမှာ ပါဝင်ချင်တယ်ဆိုရင်တော့ Pull Requests (PRs) တွေ တင်ပြီး ကူညီပေးနိုင်ပါတယ်။</li>
                <li><strong>License:</strong> ဒီ Code တွေကို <strong>MIT License</strong> အောက်ကနေ ဖြန့်ဝေထားတာဖြစ်လို့ လွတ်လပ်စွာ အသုံးပြုနိုင်ပါတယ်။</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}

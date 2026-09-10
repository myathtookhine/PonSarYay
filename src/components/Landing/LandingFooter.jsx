import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';

export function LandingFooter() {
  const { t, language } = useLanguage();
  const { darkMode } = useTheme();

  const bg = darkMode ? '#0a0a0a' : '#fafafa';
  const borderColor = darkMode ? '#262626' : '#e5e5e5';
  const textPrimary = darkMode ? '#ffffff' : '#0f172a';
  const textSecondary = darkMode ? '#d1d5db' : '#374151';
  const textMuted = darkMode ? '#9ca3af' : '#4b5563';

  const productLinks = [
    { to: '/editor', label: language === 'my' ? 'Editor ဖွင့်မည်' : 'Open Photo Editor' },
    { to: '/how-to-use', label: language === 'my' ? 'အသုံးပြုပုံလမ်းညွှန်' : 'How-to-Use Guide' },
    { to: '/typography-tips', label: language === 'my' ? 'ဖောင့်အကြံပြုချက်များ' : 'Typography Tips' },
    { to: '/#features', label: language === 'my' ? 'လုပ်ဆောင်ချက်များ' : 'Key Features' },
  ];

  const resourceLinks = [
    { to: '/blog', label: language === 'my' ? 'ဆောင်းပါးများ (Blog)' : 'Design Blog' },
    { to: '/about', label: language === 'my' ? 'ဖောင့်ဖန်တီးသူများ' : 'Font Credits & Authors' },
    { to: '/contact', label: language === 'my' ? 'အကြံပြုရန်နှင့် တုံ့ပြန်ချက်' : 'Feedback & Bug Report' },
  ];

  const legalLinks = [
    { to: '/privacy-policy', label: language === 'my' ? 'ကိုယ်ရေးကိုယ်တာမူဝါဒ' : 'Privacy Policy' },
    { to: '/terms-of-service', label: language === 'my' ? 'အသုံးပြုမှုစည်းမျဉ်းများ' : 'Terms of Service' },
    { to: '/about', label: language === 'my' ? 'PonSarYay အကြောင်း' : 'About Pon-Sar-Yay' },
    { to: '/contact', label: language === 'my' ? 'ဆက်သွယ်ရန်' : 'Contact Us' },
  ];

  return (
    <footer
      className="border-t transition-colors duration-200 mt-auto"
      style={{
        backgroundColor: bg,
        borderColor: borderColor,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Column 1 & 2: Brand Information & Privacy Badge */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 text-decoration-none">
              <img
                src="/ponsaryay.png"
                alt="Pon-Sar-Yay Logo"
                className="w-10 h-10 object-contain rounded-lg shadow-sm"
              />
              <div>
                <span className="font-bold uppercase tracking-tight text-lg leading-none" style={{ color: textPrimary }}>
                  Pon-Sar-Yay
                </span>
                <p className="text-xs text-neutral-400 font-medium leading-tight mt-0.5">
                  ပုံစာရေး • Myanmar Text-on-Image Editor
                </p>
              </div>
            </Link>

            <p className="text-sm sm:text-base leading-relaxed max-w-sm" style={{ color: textSecondary }}>
              {language === 'my'
                ? 'ဓာတ်ပုံများပေါ်တွင် မြန်မာယူနီကုဒ်ဖောင့်အလှများဖြင့် စာသားရေးသားနိုင်သည့် အခမဲ့ ဝဘ်အက်ပလီကေးရှင်း။ ပိုစ့်များ၊ ကဗျာများနှင့် ကြော်ငြာများကို အလွယ်တကူ ဖန်တီးနိုင်ပါသည်။'
                : 'A modern, high-performance browser application for crafting beautiful Myanmar Unicode and English typography on photos. Free, fast, and responsive.'}
            </p>

            <div
              className="p-3.5 sm:p-4 rounded-xl flex items-start gap-3 max-w-sm border"
              style={{
                backgroundColor: darkMode ? '#141414' : '#f0fdf4',
                borderColor: darkMode ? '#262626' : '#bbf7d0',
              }}
            >
              <ShieldCheck size={20} className="text-emerald-500 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-snug">
                <span className="font-bold block" style={{ color: textPrimary }}>
                  {language === 'my' ? '၁၀၀% လုံခြုံသော စက်တွင်းတည်းဖြတ်မှု' : '100% Client-Side Privacy'}
                </span>
                <p className="mt-1" style={{ color: textSecondary }}>
                  {language === 'my'
                    ? 'သင့်ဓာတ်ပုံများကို မည်သည့်ဆာဗာသို့မျှ ပေးပို့ခြင်းမရှိဘဲ သင့်ဖုန်း/ကွန်ပျူတာပေါ်တွင်သာ တိုက်ရိုက်လုပ်ဆောင်ပါသည်။'
                    : 'Your photos never leave your device. All rendering is performed locally in your web browser.'}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Product & Tools */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: textPrimary }}>
              {language === 'my' ? 'ကိရိယာများ' : 'Editor & Tools'}
            </h4>
            <ul className="space-y-3 text-sm sm:text-base list-none p-0 m-0">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-orange-500 transition-colors"
                    style={{ color: textSecondary }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Guides & Content */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: textPrimary }}>
              {language === 'my' ? 'အရင်းအမြစ်များ' : 'Resources & Guides'}
            </h4>
            <ul className="space-y-3 text-sm sm:text-base list-none p-0 m-0">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a
                      href={link.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-orange-500 transition-colors inline-flex items-center gap-1.5"
                      style={{ color: textSecondary }}
                    >
                      <span>{link.label}</span>
                      <ExternalLink size={13} className="opacity-70" />
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="hover:text-orange-500 transition-colors"
                      style={{ color: textSecondary }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Legal & Trust */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: textPrimary }}>
              {language === 'my' ? 'မူဝါဒနှင့် စည်းမျဉ်းများ' : 'Legal & Compliance'}
            </h4>
            <ul className="space-y-3 text-sm sm:text-base list-none p-0 m-0">
              {legalLinks.map((link) => (
                <li key={link.to + link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-orange-500 transition-colors"
                    style={{ color: textSecondary }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Horizontal Bar */}
        <div
          className="pt-8 mt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm"
          style={{
            borderColor: borderColor,
            color: textMuted,
          }}
        >
          <p className="m-0 text-center sm:text-left">
            © {new Date().getFullYear()} Pon-Sar-Yay (ပုံစာရေး). All rights reserved.
          </p>

          <p className="m-0 flex items-center gap-1.5 text-center sm:text-right">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500 inline" />
            <span>for the Myanmar Creative Community</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

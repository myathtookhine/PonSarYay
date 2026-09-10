import React, { useState } from 'react';
import { StaticPageLayout } from '../components/Landing/StaticPageLayout.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { Mail, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { trackEvent } from '../utils/analytics.js';

export function ContactPage() {
  const { language } = useLanguage();
  const { darkMode } = useTheme();
  const isMy = language === 'my';

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Feedback',
    message: '',
  });

  const cardBg = darkMode ? '#121212' : '#f9fafb';
  const borderColor = darkMode ? '#262626' : '#e5e5e5';
  const textPrimary = darkMode ? '#ffffff' : '#0f172a';
  const textSecondary = darkMode ? '#d1d5db' : '#374151';
  const inputBg = darkMode ? '#1a1a1a' : '#ffffff';
  const inputText = darkMode ? '#f9fafb' : '#0f172a';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    trackEvent('contact_form_submit', {
      category: 'Contact',
      subject: formData.subject,
    });
    setSubmitted(true);
  };

  return (
    <StaticPageLayout
      title={isMy ? "ဆက်သွယ်ရန်နှင့် အကြံပြုချက်" : "Contact Us & Feedback"}
      description={
        isMy
          ? "PonSarYay (ပုံစာရေး) အဖွဲ့နှင့် ဆက်သွယ်ရန်။ အကြံပြုချက်များ ပေးပို့ခြင်း၊ ချွတ်ယွင်းချက်များ သတင်းပို့ခြင်းနှင့် ဖောင့်အသစ်များ တောင်းဆိုနိုင်ပါသည်။"
          : "Get in touch with the PonSarYay team. Share user feedback, report bugs, request new Myanmar fonts, or make business inquiries."
      }
      keywords="contact PonSarYay, feedback, font request, bug report, Myanmar text editor support, ဆက်သွယ်ရန်"
      breadcrumbs={[{ label: isMy ? 'ဆက်သွယ်ရန်' : 'Contact' }]}
      badge={isMy ? 'အကူအညီနှင့် တုံ့ပြန်ချက်' : 'Support & Feedback'}
      headline={isMy ? 'ကျွန်ုပ်တို့နှင့် ဆက်သွယ်ရန်' : 'Get in Touch'}
      subheadline={
        isMy
          ? 'လုပ်ဆောင်ချက် အကြံပြုလိုပါသလား၊ ဖောင့်အသစ် တောင်းဆိုလိုပါသလား သို့မဟုတ် ချို့ယွင်းချက် တွေ့ရှိပါသလား? ကျွန်ုပ်တို့ထံသို့ လွတ်လပ်စွာ ဆက်သွယ်နိုင်ပါသည်။'
          : 'Have a feature suggestion, font request, or bug report? We would love to hear from you. Reach out to our team directly below.'
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Direct Contact Info & Channels */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border" style={{ backgroundColor: cardBg, borderColor }}>
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
              <Mail size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: textPrimary }}>
              {isMy ? 'အီးမေးလ်ဖြင့် ဆက်သွယ်ရန်' : 'Email Inquiries'}
            </h3>
            <p className="text-sm sm:text-base mb-3 leading-relaxed" style={{ color: textSecondary }}>
              {isMy
                ? 'အထွေထွေ အကူအညီများ၊ တရားဝင် မေးမြန်းချက်များနှင့် ကြော်ငြာချိတ်ဆက်ရန်-'
                : 'For general support, legal questions, or advertising inquiries:'}
            </p>
            <a
              href="mailto:contact.ponsaryay@gmail.com"
              className="text-sm sm:text-base font-bold text-orange-500 hover:underline break-all"
            >
              contact.ponsaryay@gmail.com
            </a>
          </div>

          <div className="p-6 rounded-2xl border" style={{ backgroundColor: cardBg, borderColor }}>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
              <MessageSquare size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: textPrimary }}>
              {isMy ? 'အကြံပြုချက်နှင့် ချို့ယွင်းချက် သတင်းပို့ရန်' : 'Feedback & Bug Reports'}
            </h3>
            <p className="text-sm sm:text-base mb-3 leading-relaxed" style={{ color: textSecondary }}>
              {isMy
                ? 'အသုံးပြုရာတွင် အခက်အခဲ သို့မဟုတ် ချို့ယွင်းချက်များ တွေ့ရှိပါက အောက်ပါ ဖောင်မှတစ်ဆင့် တိုက်ရိုက် ပေးပို့နိုင်ပါသည်-'
                : 'Found a bug or have a suggestion? Send us a message directly using the form below:'}
            </p>
            <a
              href="#contact-form"
              className="text-sm sm:text-base font-bold text-orange-500 hover:underline flex items-center gap-1.5"
            >
              <span>{isMy ? 'မက်ဆေ့ခ်ျ ပေးပို့ရန် ဖောင်သို့ သွားမည်' : 'Go to Message Form'}</span>
            </a>
          </div>

          <div className="p-6 rounded-2xl border" style={{ backgroundColor: cardBg, borderColor }}>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: textPrimary }}>
              {isMy ? 'ဖောင့်ဖန်တီးသူများအတွက်' : 'Font Creators'}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecondary }}>
              {isMy
                ? 'သင်သည် မြန်မာဖောင့်ဖန်တီးသူ ပညာရှင်တစ်ဦး ဖြစ်ပါက သင်၏ဖောင့်အား ဤနေရာတွင် ထည့်သွင်းပြသလိုလျှင်ဖြစ်စေ၊ အချက်အလက် ပြင်ဆင်လိုလျှင်ဖြစ်စေ ဆက်သွယ်ပေးပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။'
                : 'Are you a Myanmar typeface creator? If you would like your font showcased or wish to update font credits, please reach out to us!'}
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Feedback Form */}
        <div id="contact-form" className="lg:col-span-2">
          <div className="p-7 sm:p-10 rounded-2xl border shadow-sm" style={{ backgroundColor: cardBg, borderColor }}>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: textPrimary }}>
              {isMy ? 'စာတို ပေးပို့ရန်' : 'Send us a Message'}
            </h2>
            <p className="text-sm sm:text-base mb-8 leading-relaxed" style={{ color: textSecondary }}>
              {isMy
                ? 'အောက်ပါ ဖောင်ကို ဖြည့်သွင်း၍ သင့်အကြံပြုချက်များကို ပေးပို့နိုင်ပါသည်။'
                : 'Fill out the form below and our team will review your comments.'}
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-4 animate-in fade-in">
                <CheckCircle2 size={44} className="text-emerald-500 mx-auto" />
                <h3 className="text-xl sm:text-2xl font-bold text-emerald-500">
                  {isMy ? 'ကျေးဇူးတင်ပါသည်! သတင်းစကား ပေးပို့ပြီးပါပြီ' : 'Thank You! Message Received'}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed max-w-lg mx-auto" style={{ color: textSecondary }}>
                  {isMy
                    ? 'သင့်အကြံပြုချက်ကို ကျွန်ုပ်တို့ ရရှိပါသည်။ PonSarYay ပိုမိုကောင်းမွန်လာစေရန် ပါဝင်ကူညီမှုအတွက် အထူးကျေးဇူးတင်ရှိပါသည်။'
                    : 'Your feedback has been sent. We appreciate your input as we continue improving PonSarYay for the creative community.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Feedback', message: '' });
                  }}
                  className="px-6 py-3 text-sm sm:text-base font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
                >
                  {isMy ? 'နောက်ထပ် မက်ဆေ့ခ်ျ ပေးပို့မည်' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm sm:text-base font-bold mb-2" style={{ color: textPrimary }}>
                      {isMy ? 'သင့်အမည်' : 'Your Name'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isMy ? "ဥပမာ- ကိုအောင်အောင်" : "e.g. Aung Aung"}
                      className="w-full text-sm sm:text-base px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      style={{ backgroundColor: inputBg, borderColor, color: inputText }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm sm:text-base font-bold mb-2" style={{ color: textPrimary }}>
                      {isMy ? 'အီးမေးလ်လိပ်စာ' : 'Email Address'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={isMy ? "ဥပမာ- aung@example.com" : "e.g. aung@example.com"}
                      className="w-full text-sm sm:text-base px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      style={{ backgroundColor: inputBg, borderColor, color: inputText }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-bold mb-2" style={{ color: textPrimary }}>
                    {isMy ? 'အကြောင်းအရာ' : 'Subject'}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-sm sm:text-base px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    style={{ backgroundColor: inputBg, borderColor, color: inputText }}
                  >
                    <option value="Feedback">
                      {isMy ? 'အထွေထွေ အကြံပြုချက်' : 'General Feedback / Suggestion'}
                    </option>
                    <option value="Font Request">
                      {isMy ? 'ဖောင့်အသစ် တောင်းဆိုရန်' : 'Font Request'}
                    </option>
                    <option value="Bug Report">
                      {isMy ? 'ချို့ယွင်းချက် သတင်းပို့ရန်' : 'Bug Report'}
                    </option>
                    <option value="Partnership">
                      {isMy ? 'မိတ်ဖက်နှင့် ကြော်ငြာ ချိတ်ဆက်ရန်' : 'Partnership / Advertising'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-bold mb-2" style={{ color: textPrimary }}>
                    {isMy ? 'သင့်သတင်းစကား' : 'Your Message'} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      isMy
                        ? "သင့်အကြံပြုချက် သို့မဟုတ် တွေ့ရှိသော ပြဿနာကို အသေးစိတ် ရေးသားပေးပါ..."
                        : "Tell us what you think or describe the issue in detail..."
                    }
                    className="w-full text-sm sm:text-base px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-orange-500 transition-all leading-relaxed"
                    style={{ backgroundColor: inputBg, borderColor, color: inputText }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-sm sm:text-base font-bold transition-colors flex items-center justify-center gap-2.5 shadow-md"
                >
                  <Send size={18} />
                  <span>{isMy ? 'ပေးပို့မည်' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </StaticPageLayout>
  );
}

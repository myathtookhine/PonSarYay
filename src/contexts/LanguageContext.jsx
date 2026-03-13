import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    "all": "All",
    "myanmar": "Myanmar",
    "english": "English",
    "fonts": "Fonts",
    "text controls": "Text Controls",
    "export": "Export",
    "download image": "Download image",
    "add text": "Add Text",
    "clear image": "Clear Image",
    "upload image": "Upload image",
    "undo": "Undo",
    "redo": "Redo",
    "crop": "Crop",
    "delete text": "Delete",
    "duplicate text": "Duplicate",
    "note : 300 max. characters": "Note : 300 Max. Characters",
    "please upload an image first.": "Please upload an image first.",
    "maximum 300 characters allowed.": "Maximum 300 characters allowed.",
    "change language": "Change Language",
    "text": "Text",
    "color": "Color",
    "opacity": "Opacity",
    "stroke width": "Stroke Width",
    "stroke color": "Stroke Color",
    "background": "Background",
    "padding": "Padding",
    "line height": "Line height",
    "letter spacing": "Letter Spacing",
    "alignment": "Alignment",
    "close": "Close",
    "apply": "Apply",
    "reset": "Reset",
    "image quality": "Image Quality",
    "canvas background": "Canvas Background",
    "shadow": "Shadow",
    "blur": "Blur",
    "offset x": "Offset X",
    "offset y": "Offset Y",
    "myanmar text-on-image editor": "Myanmar Text-on-Image Editor",
    "click to dropzone": "Click to choose or drag & drop a photo.",
    "format": "Format",
    "quality": "Quality",
    "size": "Size",
    "search fonts...": "Search fonts...",
    "font size": "Font size",
    "text color": "Text color",
    "style": "Style",
    "left": "Left",
    "center": "Center",
    "right": "Right",
    "crop image": "Crop image",
    "upload an image first for crop": "Upload an image first, then open the crop tool.",
    "cancel": "Cancel",
    "apply crop": "Apply crop",
    "save image": "Save Image",
    "messenger_save_instruction": "Long press the image above and select \"Save Image\" to download it.",
    "in_app_browser_warning": "Some in-app browsers (like Messenger) block direct downloads. Using long-press is the most reliable way.",
    "download_again": "Download Again",
    "download_image": "Download Image",
    "image name": "Image Name",
    "please enter image name": "Please enter image name",
    "preview_before_download_hint": "A preview will open before saving.",
    "resolution_notice": "Use 3x for high resolution images.",
    "ok": "OK",
    "notice": "Notice",
    "uploading...": "Uploading..."
  },
  my: {
    "all": "အားလုံး",
    "myanmar": "မြန်မာ",
    "english": "အင်္ဂလိပ်",
    "fonts": "ဖောင့်စတိုင်များ",
    "text controls": "စာသားချိန်ညှိ",
    "export": "ပုံထုတ်ရန်",
    "download image": "ပုံသိမ်းမည်",
    "add text": "စာထည့်မည်",
    "clear image": "ပုံဖျက်မည်",
    "upload image": "ပုံတင်ပါ",
    "undo": "နောက်ဆုတ်မည်",
    "redo": "ရှေ့ဆက်မည်",
    "crop": "ဖြတ်မည်",
    "delete text": "ဖျက်မည်",
    "duplicate text": "ပွားမည်",
    "note : 300 max. characters": "မှတ်ချက် : စာလုံးရေ ၃၀၀ အများဆုံး",
    "please upload an image first.": "ကျေးဇူးပြု၍ ပုံအရင်တင်ပါ။",
    "maximum 300 characters allowed.": "စာလုံးရေ ၃၀၀ သာ အများဆုံးခွင့်ပြုသည်။",
    "change language": "ဘာသာစကားပြောင်းရန်",
    "text": "စာသား",
    "color": "အရောင်",
    "opacity": "အလင်းအမှောင်",
    "stroke width": "အနားကွပ်အထူ",
    "stroke color": "အနားကွပ်အရောင်",
    "background": "နောက်ခံ",
    "padding": "အကွာအဝေး",
    "line height": "စာကြောင်းအကွာအဝေး",
    "letter spacing": "စာလုံးအကွာအဝေး",
    "alignment": "စာကြောင်းညှိရန်",
    "close": "ပိတ်မည်",
    "apply": "အသုံးပြုမည်",
    "reset": "ပြန်လည်စတင်မည်",
    "image quality": "ပုံအရည်အသွေး",
    "canvas background": "ပတ္တူနောက်ခံ",
    "shadow": "အရိပ်",
    "blur": "ဝေဝါးမှု",
    "offset x": "ဝင်ရိုး X ရွှေ့ရန်",
    "offset y": "ဝင်ရိုး Y ရွှေ့ရန်",
    "myanmar text-on-image editor": "မြန်မာစာလက်ရေးလှ ပုံစာရေးဆော့ဖ်ဝဲ",
    "click to dropzone": "ဖိုင်ရွေးရန်နှိပ်ပါ သို့မဟုတ် ပုံတစ်ပုံဆွဲချပါ",
    "format": "ပုံအမျိုးအစား",
    "quality": "အရည်အသွေး",
    "size": "အရွယ်အစား",
    "search fonts...": "ဖောင့်ရှာရန်...",
    "font size": "ဖောင့်အရွယ်အစား",
    "text color": "စာသားအရောင်",
    "style": "စတိုင်",
    "left": "ဘယ်",
    "center": "အလယ်",
    "right": "ညာ",
    "crop image": "ပုံဖြတ်ရန်",
    "upload an image first for crop": "ပုံအရင်တင်ပြီးမှ ပုံဖြတ်ကိရိယာကိုဖွင့်ပါ။",
    "cancel": "ပယ်ဖျက်မည်",
    "apply crop": "ဖြတ်မည်",
    "save image": "ပုံသိမ်းမည်",
    "messenger_save_instruction": "ပုံကိုအကြာကြီးဖိထားပြီး \"Save Image\" (သို့မဟုတ်) \"ပုံသိမ်းမည်\" ကိုနှိပ်၍ သိမ်းဆည်းပါ။",
    "in_app_browser_warning": "Messenger ကဲ့သို့သော App များတွင် ပုံတိုက်ရိုက်ဒေါင်းလုဒ်ဆွဲခြင်းကို ပိတ်ပင်ထားတတ်ပါသည်။ ပုံကိုဖိထားပြီးသိမ်းခြင်းက အဆင်ပြေဆုံးဖြစ်ပါသည်။",
    "download_again": "ထပ်မံဒေါင်းလုဒ်ဆွဲမည်",
    "download_image": "ပုံကိုဒေါင်းလုပ်ဆွဲမည်",
    "image name": "ပုံအမည်",
    "please enter image name": "ကျေးဇူးပြု၍ ပုံအမည်ထည့်ပါ",
    "preview_before_download_hint": "မသိမ်းခင် ပုံကို အစမ်းကြည့်ရှုနိုင်မည် ဖြစ်ပါသည်။",
    "resolution_notice": "ကြည်လင်ပြတ်သားသောပုံရရန် 3x ကို အသုံးပြုပါ။",
    "ok": "အိုကေ",
    "notice": "သတိပေးချက်",
    "uploading...": "တင်နေသည်..."
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('my'); 
  
  useEffect(() => {
    const savedLang = localStorage.getItem('app_language');
    if (savedLang && (savedLang === 'en' || savedLang === 'my')) {
      setLanguage(savedLang);
      document.body.classList.toggle('lang-my', savedLang === 'my');
    } else {
      document.body.classList.toggle('lang-my', language === 'my');
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('app_language', lang);
    document.body.classList.toggle('lang-my', lang === 'my');
  };

  const t = (text) => {
    if (!text) return "";
    const key = text.toLowerCase();
    const currentDict = translations[language] || translations.en;
    if (currentDict[key]) {
      return currentDict[key];
    }
    if (translations.en[key]) {
      return translations.en[key];
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

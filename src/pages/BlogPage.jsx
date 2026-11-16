import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { StaticPageLayout } from '../components/Landing/StaticPageLayout.jsx';
import { AdSlot } from '../components/common/AdSlot.jsx';
import { BLOG_POSTS } from '../data/blogData.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

export function BlogPage() {
  const { language } = useLanguage();
  const { darkMode } = useTheme();
  const isMy = language === 'my';

  const [selectedCategory, setSelectedCategory] = useState('All');

  const cardBg = darkMode ? '#121212' : '#ffffff';
  const borderColor = darkMode ? '#262626' : '#e5e7eb';
  const textPrimary = darkMode ? '#ffffff' : '#0f172a';
  const textSecondary = darkMode ? '#d1d5db' : '#374151';

  const allLabel = isMy ? 'အားလုံး' : 'All';

  const categories = useMemo(() => {
    const list = BLOG_POSTS.map((p) => (isMy ? p.category_my || p.category : p.category));
    const set = new Set(list);
    return [allLabel, ...Array.from(set)];
  }, [isMy, allLabel]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === allLabel || selectedCategory === 'All') return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => {
      const cat = isMy ? p.category_my || p.category : p.category;
      return cat === selectedCategory;
    });
  }, [selectedCategory, allLabel, isMy]);

  return (
    <StaticPageLayout
      title={isMy ? "ဒီဇိုင်းနှင့် ဖောင့်ဆိုင်ရာ ဆောင်းပါးများ" : "Design & Typography Blog"}
      description={
        isMy
          ? "မြန်မာယူနီကုဒ်ဖောင့် သမိုင်းကြောင်း၊ ဆိုရှယ်မီဒီယာ ပုံစာရေးနည်း ဗျူဟာများ၊ ပုံအရွယ်အစား အချိုးအစားများနှင့် ဖောင့်ဒီဇိုင်းဆောင်းပါးများ။"
          : "Articles, tutorials, and insights on Myanmar typography, digital content creation, social media banner sizing, and quote poster design."
      }
      keywords="Myanmar typography blog, text on image articles, social media design guide, font pairing tips, ပုံစာရေး ဆောင်းပါးများ"
      breadcrumbs={[{ label: isMy ? 'ဆောင်းပါးများ' : 'Blog' }]}
      badge={isMy ? 'ဆောင်းပါးနှင့် အသိပညာ' : 'Articles & Editorial'}
      headline={isMy ? 'ဒီဇိုင်းနှင့် ဖောင့်အနုပညာ ဆောင်းပါးများ' : 'Design & Typography Blog'}
      subheadline={
        isMy
          ? 'မြန်မာယူနီကုဒ် ဖောင့်သမိုင်း၊ လူမှုကွန်ရက် ပုံစာဒီဇိုင်း ဗျူဟာများနှင့် ဖန်တီးရှင်များအတွက် အသုံးဝင်သော ဗဟုသုတများ။'
          : 'Insights, guides, and trends on Myanmar digital typography, visual social media strategy, and canvas creative workflows.'
      }
    >
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors ${
                isSelected
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'border hover:bg-neutral-800'
              }`}
              style={{
                borderColor: isSelected ? 'transparent' : borderColor,
                color: isSelected ? '#ffffff' : textSecondary,
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => {
          const title = isMy ? post.title_my || post.title : post.title;
          const category = isMy ? post.category_my || post.category : post.category;
          const readTime = isMy ? post.readTime_my || post.readTime : post.readTime;
          const excerpt = isMy ? post.excerpt_my || post.excerpt : post.excerpt;

          return (
            <article
              key={post.slug}
              className="p-7 sm:p-8 rounded-2xl border flex flex-col justify-between transition-all hover:border-orange-500/50 group shadow-sm"
              style={{
                backgroundColor: cardBg,
                borderColor,
              }}
            >
              <div>
                {/* Meta tags */}
                <div className="flex items-center gap-2.5 mb-3 text-xs sm:text-sm" style={{ color: textSecondary }}>
                  <span className="px-2.5 py-0.5 rounded-md font-bold bg-orange-500/10 text-orange-500">
                    {category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Clock size={13} />
                    {readTime}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight mb-3 group-hover:text-orange-500 transition-colors" style={{ color: textPrimary }}>
                  <Link to={`/blog/${post.slug}`} className="text-inherit no-underline">
                    {title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: textSecondary }}>
                  {excerpt}
                </p>
              </div>

              <div className="pt-5 border-t flex items-center justify-between text-xs sm:text-sm" style={{ borderColor }}>
                <span className="flex items-center gap-1.5 font-medium" style={{ color: textSecondary }}>
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </span>

                <Link
                  to={`/blog/${post.slug}`}
                  className="font-bold text-orange-500 hover:text-orange-400 flex items-center gap-1.5 transition-colors text-sm sm:text-base"
                >
                  <span>{isMy ? 'ဆောင်းပါးဖတ်မည်' : 'Read Article'}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <AdSlot type="display" />
    </StaticPageLayout>
  );
}

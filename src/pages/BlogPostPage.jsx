import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { StaticPageLayout } from '../components/Landing/StaticPageLayout.jsx';
import { BLOG_POSTS } from '../data/blogData.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { ArticleContent } from '../components/common/ArticleContent.jsx';

export function BlogPostPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const { darkMode } = useTheme();
  const isMy = language === 'my';

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const cardBg = darkMode ? '#121212' : '#ffffff';
  const borderColor = darkMode ? '#262626' : '#e5e7eb';
  const textPrimary = darkMode ? '#ffffff' : '#0f172a';
  const textSecondary = darkMode ? '#d1d5db' : '#374151';

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const title = isMy ? post.title_my || post.title : post.title;
  const excerpt = isMy ? post.excerpt_my || post.excerpt : post.excerpt;
  const content = isMy ? post.content_my || post.content : post.content;
  const category = isMy ? post.category_my || post.category : post.category;
  const readTime = isMy ? post.readTime_my || post.readTime : post.readTime;

  // Related posts excluding current
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <StaticPageLayout
      title={title}
      description={excerpt}
      ogType="article"
      breadcrumbs={[
        { label: isMy ? 'ဆောင်းပါးများ' : 'Blog', to: '/blog' },
        { label: title.slice(0, 26) + '...' },
      ]}
      badge={category}
      headline={title}
      subheadline={excerpt}
    >
      {/* Article Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b text-sm sm:text-base" style={{ borderColor, color: textSecondary }}>
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <User size={16} className="text-orange-500" />
            <span>{post.author}</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Calendar size={16} />
            <span>{post.date}</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <Clock size={16} />
            <span>{readTime}</span>
          </span>
        </div>

        <Link
          to="/blog"
          className="hover:text-orange-500 transition-colors flex items-center gap-1.5 font-bold text-sm sm:text-base"
        >
          <ArrowLeft size={16} />
          <span>{isMy ? 'ဆောင်းပါးများသို့ ပြန်သွားမည်' : 'Back to Articles'}</span>
        </Link>
      </div>

      {/* Article Body */}
      <article
        className="p-8 sm:p-12 rounded-2xl border shadow-sm"
        style={{
          backgroundColor: cardBg,
          borderColor,
        }}
      >
        <ArticleContent content={content} />
      </article>

      {/* Interactive In-Article Editor CTA */}
      <div
        className="my-14 p-8 sm:p-10 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{
          backgroundColor: darkMode ? '#181818' : '#fff7ed',
          borderColor: darkMode ? '#333333' : '#fed7aa',
        }}
      >
        <div className="space-y-1.5 text-center sm:text-left">
          <h3 className="text-lg sm:text-2xl font-bold flex items-center justify-center sm:justify-start gap-2.5">
            <Sparkles size={22} className="text-orange-500" />
            <span>{isMy ? 'PonSarYay ဖြင့် စာလုံးအလှ ပုံများ ဖန်တီးမည်' : 'Create Visual Quotes with Pon-Sar-Yay'}</span>
          </h3>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecondary }}>
            {isMy
              ? 'ဤဖောင့်စတိုင်များနှင့် နည်းလမ်းများကို ယခုပင် ကျွန်ုပ်တို့၏ အခမဲ့ ဝဘ်အယ်ဒီတာတွင် စမ်းသပ်ကြည့်ရှုလိုက်ပါ။'
              : 'Apply these typographic techniques right now in our free browser editor.'}
          </p>
        </div>
        <Link
          to="/editor"
          className="px-7 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-sm sm:text-base font-bold shrink-0 transition-colors shadow-md"
        >
          {isMy ? 'Editor ဖွင့်မည်' : 'Launch Editor'}
        </Link>
      </div>

      {/* Related Posts Section */}
      <section className="space-y-6 pt-4">
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: textPrimary }}>
          {isMy ? 'အခြား ဆက်စပ်ဆောင်းပါးများ' : 'Related Articles'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {relatedPosts.map((rel) => {
            const relTitle = isMy ? rel.title_my || rel.title : rel.title;
            const relCategory = isMy ? rel.category_my || rel.category : rel.category;
            const relExcerpt = isMy ? rel.excerpt_my || rel.excerpt : rel.excerpt;

            return (
              <Link
                key={rel.slug}
                to={`/blog/${rel.slug}`}
                className="p-6 rounded-2xl border transition-all hover:border-orange-500/50 block group no-underline shadow-sm"
                style={{
                  backgroundColor: cardBg,
                  borderColor,
                }}
              >
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-1.5">
                  {relCategory}
                </span>
                <h4 className="text-base sm:text-xl font-bold group-hover:text-orange-500 transition-colors line-clamp-2 mb-2" style={{ color: textPrimary }}>
                  {relTitle}
                </h4>
                <p className="text-xs sm:text-sm line-clamp-2 leading-relaxed" style={{ color: textSecondary }}>
                  {relExcerpt}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </StaticPageLayout>
  );
}

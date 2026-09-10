import React from 'react';
import { Link } from 'react-router-dom';
import { LandingHeader } from './LandingHeader.jsx';
import { LandingFooter } from './LandingFooter.jsx';
import { SEO } from '../Common/SEO.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { ChevronRight, Home } from 'lucide-react';

export function StaticPageLayout({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  breadcrumbs = [],
  headline,
  badge,
  subheadline,
  children,
}) {
  const { darkMode } = useTheme();

  const bg = darkMode ? '#0a0a0a' : '#ffffff';
  const textPrimary = darkMode ? '#ffffff' : '#0f172a';
  const textSecondary = darkMode ? '#d1d5db' : '#374151';
  const headerBg = darkMode ? 'rgba(23, 23, 23, 0.4)' : '#f9fafb';
  const borderColor = darkMode ? '#262626' : '#e5e5e5';

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{
        backgroundColor: bg,
        color: textPrimary,
      }}
    >
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        canonicalUrl={canonicalUrl}
        ogType={ogType}
      />

      <LandingHeader />

      {/* Optional Top Header Banner */}
      {(headline || breadcrumbs.length > 0) && (
        <header
          className="border-b transition-colors"
          style={{
            backgroundColor: headerBg,
            borderColor: borderColor,
          }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            {/* Breadcrumb Navigation */}
            {breadcrumbs.length > 0 && (
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm sm:text-base mb-4" style={{ color: textSecondary }}>
                <Link to="/" className="hover:text-orange-500 transition-colors flex items-center gap-1.5 font-medium">
                  <Home size={16} />
                  <span>Home</span>
                </Link>
                {breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={crumb.label + idx}>
                    <ChevronRight size={15} className="opacity-50" />
                    {crumb.to ? (
                      <Link to={crumb.to} className="hover:text-orange-500 transition-colors font-medium">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="font-semibold" style={{ color: textPrimary }}>
                        {crumb.label}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}

            {/* Badge */}
            {badge && (
              <span className="inline-block px-3.5 py-1 mb-4 rounded-full text-xs sm:text-sm font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20">
                {badge}
              </span>
            )}

            {/* Main Headline */}
            {headline && (
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4" style={{ color: textPrimary }}>
                {headline}
              </h1>
            )}

            {/* Subheadline */}
            {subheadline && (
              <p className="text-base sm:text-xl leading-relaxed max-w-3xl" style={{ color: textSecondary }}>
                {subheadline}
              </p>
            )}
          </div>
        </header>
      )}

      {/* Main Content Body */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {children}
      </main>

      <LandingFooter />
    </div>
  );
}

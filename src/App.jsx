import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SplashScreen } from './components/SplashScreen/SplashScreen.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { OfflinePage } from './pages/OfflinePage.jsx';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage.jsx';
import { TermsOfServicePage } from './pages/TermsOfServicePage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { HowToUsePage } from './pages/HowToUsePage.jsx';
import { TypographyTipsPage } from './pages/TypographyTipsPage.jsx';
import { BlogPage } from './pages/BlogPage.jsx';
import { BlogPostPage } from './pages/BlogPostPage.jsx';
import { ScrollToTop } from './components/common/ScrollToTop.jsx';
import { trackPageView } from './utils/analytics.js';

// Editor (fabric.js) is loaded only when /editor is opened
const AppShell = lazy(() => import('./components/Layout/AppShell.jsx').then((m) => ({ default: m.AppShell })));

const MIN_SPLASH_MS = 1800;
const SPLASH_FADE_MS = 500;

function App() {
  const location = useLocation();
  // Splash only on the editor (it waits for fonts). Content pages render
  // immediately so visitors and AdSense/Google crawlers see real content.
  const [showSplash, setShowSplash] = useState(() => location.pathname === '/editor');
  const [splashExiting, setSplashExiting] = useState(false);
  // navigator is missing/partial during prerendering, so treat "unknown" as online
  const [isOnline, setIsOnline] = useState(() => typeof navigator === 'undefined' || navigator.onLine !== false);

  // Track SPA pageviews on route change
  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  // Splash screen logic
  useEffect(() => {
    let cancelled = false;
    const started = performance.now();

    const scheduleExit = () => {
      if (cancelled) return;
      const elapsed = performance.now() - started;
      const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);
      window.setTimeout(() => {
        if (!cancelled) setSplashExiting(true);
      }, remaining);
    };

    const fontsReady = document.fonts?.ready?.catch(() => undefined) ?? Promise.resolve();
    fontsReady.then(scheduleExit);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!splashExiting) return undefined;
    const id = window.setTimeout(() => setShowSplash(false), SPLASH_FADE_MS);
    return () => window.clearTimeout(id);
  }, [splashExiting]);

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Show splash first
  if (showSplash) {
    return (
      <>
        <SplashScreen exiting={splashExiting} />
      </>
    );
  }

  // Show offline page if no internet
  if (!isOnline) {
    return (
      <>
        <OfflinePage />
      </>
    );
  }

  return <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/editor"
        element={
          <Suspense fallback={<SplashScreen exiting={false} />}>
            <AppShell />
          </Suspense>
        }
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/how-to-use" element={<HowToUsePage />} />
      <Route path="/typography-tips" element={<TypographyTipsPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  </>;
}

export default App;

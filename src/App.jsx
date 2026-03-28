import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppShell } from './components/Layout/AppShell.jsx';
import { SplashScreen } from './components/SplashScreen/SplashScreen.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { OfflinePage } from './pages/OfflinePage.jsx';
import { Analytics } from '@vercel/analytics/react';

const MIN_SPLASH_MS = 1800;
const SPLASH_FADE_MS = 500;

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashExiting, setSplashExiting] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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
        <Analytics />
      </>
    );
  }

  // Show offline page if no internet
  if (!isOnline) {
    return (
      <>
        <OfflinePage />
        <Analytics />
      </>
    );
  }

  return <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/editor" element={<AppShell />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
    <Analytics />
  </>;
}

export default App;

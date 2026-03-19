import React, { useEffect, useState } from 'react';
import { AppShell } from './components/Layout/AppShell.jsx';
import { SplashScreen } from './components/SplashScreen/SplashScreen.jsx';
import { Analytics } from '@vercel/analytics/react';

const MIN_SPLASH_MS = 1800;
const SPLASH_FADE_MS = 500;

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashExiting, setSplashExiting] = useState(false);

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

  return (
    <>
      {showSplash && <SplashScreen exiting={splashExiting} />}
      {!showSplash && <AppShell />}
      <Analytics />
    </>
  );
}

export default App;


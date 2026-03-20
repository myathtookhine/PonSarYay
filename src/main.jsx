import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import ReactGA from 'react-ga4';

// Initialize Google Analytics
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (GA_ID && GA_ID !== "G-XXXXXXXXXX") {
  ReactGA.initialize(GA_ID);
  ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });
} else if (import.meta.env.DEV) {
  console.log("Analytics ID missing or default. Add VITE_GA_MEASUREMENT_ID to .env.local");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import ReactGA from 'react-ga4';

// Initialize Google Analytics (Replace tracking ID or use .env)
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";
if (gaMeasurementId && gaMeasurementId !== "G-XXXXXXXXXX") {
  ReactGA.initialize(gaMeasurementId);
  // Send initial pageview
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <LanguageProvider>
    <App />
  </LanguageProvider>
);


import React from 'react';
import { AppShell } from './components/Layout/AppShell.jsx';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return <>
    <AppShell />
    <Analytics />
  </>;
}

export default App;


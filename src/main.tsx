import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import App from './App.tsx'
import './index.css'

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

const app = (
  <React.StrictMode>
    <React.Fragment>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <App />
      </ThemeProvider>
    </React.Fragment>
  </React.StrictMode>
);

createRoot(root).render(app);

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const mountApp = () => {
  const loadingScreen = document.getElementById('loading-screen');
  const rootElement = document.getElementById('root');

  try {
    console.log("Initializing App...");
    if (!rootElement) throw new Error("Critical: Root element not found in DOM.");

    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("App mounted successfully.");
  } catch (error) {
    console.error("Mounting Error:", error);
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 40px; text-align: center; font-family: sans-serif;">
          <h1 style="color: #006064;">দুঃখিত!</h1>
          <p>অ্যাপ্লিকেশনটি চালু করতে সমস্যা হয়েছে। দয়া করে পেজটি রিফ্রেশ করুন।</p>
          <code style="display: block; margin-top: 20px; color: #666;">${error instanceof Error ? error.message : String(error)}</code>
        </div>
      `;
    }
  } finally {
    // ALWAYS remove loader, even on crash, so the fallback error message is visible
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 400);
      }, 500);
    }
  }
};

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}

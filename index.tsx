
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const initApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) throw new Error("Root element not found");

    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    // Hide loading overlay after React has taken over
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 500);
      }, 300);
    }
    
    console.log("Application Initialized Successfully");
  } catch (error) {
    console.error("Initialization Error:", error);
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.innerHTML = `<p style="color: red; font-family: sans-serif; padding: 20px; text-align: center;">
        দুঃখিত, অ্যাপ্লিকেশন লোড হতে সমস্যা হয়েছে। অনুগ্রহ করে পেজটি রিফ্রেশ করুন।<br>
        Error: ${error instanceof Error ? error.message : 'Unknown'}
      </p>`;
    }
  }
};

initApp();

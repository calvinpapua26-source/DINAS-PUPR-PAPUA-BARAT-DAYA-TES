
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Global error handler for debugging white screens
window.onerror = (msg, url, line, col, error) => {
  console.error("BOOT CRASH:", { msg, url, line, col, error });
  // Show a visible error on the screen if possible
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;">
      <h2>Terjadi Kesalahan (Runtime Error)</h2>
      <p>${msg}</p>
      <small>${url} L:${line}</small>
    </div>`;
  }
  return false;
};

const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

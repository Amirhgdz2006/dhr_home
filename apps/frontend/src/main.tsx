import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ErrorBoundary from "./ErrorBoundary";
import "./fonts.ts";
import "./index.css";
import "./observability";
import { TIMING } from "./constants.ts";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// Register Service Worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.ts', { updateViaCache: 'none' })
      .then((registration) => {
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, TIMING.SERVICE_WORKER_UPDATE_INTERVAL);
        
        // Also check for updates when page becomes visible
        document.addEventListener('visibilitychange', () => {
          if (!document.hidden) {
            registration.update();
          }
        });
      })
      .catch((error) => {
        // Service Worker registration failed (non-critical)
        console.warn("Service Worker registration failed:", error);
      });
  });
}

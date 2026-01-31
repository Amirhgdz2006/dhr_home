import * as Sentry from "@sentry/react";

/**
 * Simple observability layer for the frontend.
 * - Initializes Sentry in production (if VITE_SENTRY_DSN is set)
 * - Exposes a reportError helper
 * - Hooks into global window error events
 */

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const ENVIRONMENT = import.meta.env.MODE;
const RELEASE = import.meta.env.VITE_APP_RELEASE;

export const isSentryEnabled =
  typeof SENTRY_DSN === "string" &&
  SENTRY_DSN.length > 0 &&
  ENVIRONMENT === "production";

if (isSentryEnabled) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENVIRONMENT,
    release: RELEASE,
    // Keep configuration minimal; can be tuned later if needed
    tracesSampleRate: 0.1,
  });
}

/**
 * Report an error to the tracking backend (Sentry in production,
 * console in other environments).
 */
export function reportError(
  error: unknown,
  context?: Record<string, unknown>
): void {
  if (isSentryEnabled) {
    Sentry.captureException(error, context ? { extra: context } : undefined);
  } else {
    // Fallback logging for development
    // eslint-disable-next-line no-console
    console.error("Captured error:", error, context);
  }
}

// Attach global listeners to catch unhandled runtime errors
if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    // Some browsers pass the error instance, some only the message
    const error = (event as ErrorEvent).error ?? event.message;
    reportError(error, { source: "window.onerror" });
  });

  window.addEventListener("unhandledrejection", (event) => {
    reportError((event as PromiseRejectionEvent).reason, {
      source: "unhandledrejection",
    });
  });
}

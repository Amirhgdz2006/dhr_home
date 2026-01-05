/// <reference types="vite/client" />

declare module '*.woff2' {
  const src: string;
  export default src;
}

declare module '*.woff' {
  const src: string;
  export default src;
}

declare module '*.ttf' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

// Minimal type declarations for Sentry React SDK to avoid TS errors
// The real types will come from the installed @sentry/react package.
declare module '@sentry/react' {
  export interface InitOptions {
    dsn?: string;
    environment?: string;
    release?: string;
    tracesSampleRate?: number;
    [key: string]: unknown;
  }

  export function init(options: InitOptions): void;

  export function captureException(
    error: unknown,
    context?: Record<string, unknown> | undefined
  ): void;
}



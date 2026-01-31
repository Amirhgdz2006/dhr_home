/// <reference types="vite/client" />

// ===============================
// Vite environment variables
// ===============================
interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// ===============================
// Asset modules
// ===============================
declare module "*.woff2" {
  const src: string;
  export default src;
}

declare module "*.woff" {
  const src: string;
  export default src;
}

declare module "*.ttf" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

// ===============================
// Sentry (minimal typings)
// ===============================
declare module "@sentry/react" {
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
    context?: Record<string, unknown>
  ): void;
}

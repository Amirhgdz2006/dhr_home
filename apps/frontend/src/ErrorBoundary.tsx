import { Component, ReactNode } from "react";
import { reportError } from "./observability";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Top-level error boundary to prevent full app crashes.
 * Shows a minimal fallback UI and reports unexpected errors.
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    reportError(error, {
      source: "ErrorBoundary",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      componentStack: (errorInfo as any)?.componentStack,
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000",
            color: "#fff",
            fontFamily: "IRANYekanX, sans-serif",
            textAlign: "center",
            padding: "16px",
          }}
        >
          <h1 style={{ fontSize: "20px", marginBottom: "8px" }}>
            مشکلی در اجرای لانچر به‌وجود آمده است.
          </h1>
          <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "16px" }}>
            لطفاً صفحه را یک‌بار دیگر رفرش کنید. اگر مشکل ادامه داشت با تیم
            فنی در میان بگذارید.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            style={{
              padding: "8px 16px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.4)",
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            تلاش مجدد
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}



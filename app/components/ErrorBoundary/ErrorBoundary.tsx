import React, { Component, type ReactNode } from "react";
import { logger } from "~/utils/logger";
import classes from "./ErrorBoundary.module.css";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const isDevelopment = () =>
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error("ErrorBoundary caught an error:", error, errorInfo);

    if (typeof window !== "undefined" && !isDevelopment()) {
      import("@amplitude/analytics-browser")
        .then(({ track }) =>
          track("Error Boundary Caught", {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            url: window.location.href,
          }),
        )
        .catch((e) => logger.error("Failed to track error:", e));
    }

    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    return (
      <div className={classes.wrap}>
        <div role="alert" className={classes.card}>
          <p className={classes.title}>Da ist etwas schiefgegangen.</p>
          <p className={classes.text}>
            Versuche es noch einmal oder lade die Seite neu.
          </p>
          {isDevelopment() && this.state.error && (
            <pre className={classes.details}>
              {this.state.error.message}
              {"\n"}
              {this.state.error.stack}
            </pre>
          )}
          <button
            type="button"
            className={classes.retry}
            onClick={this.handleRetry}
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;

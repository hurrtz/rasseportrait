import React, { Component, type ReactNode } from "react";
import { Alert, Button, Stack, Text } from "@mantine/core";
import { IconAlertCircle, IconRefresh } from "@tabler/icons-react";
import { logger } from "~/utils/logger";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

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

    // Track error with analytics if available (production only)
    const isDev =
      process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
    if (typeof window !== "undefined" && !isDev) {
      try {
        import("@amplitude/analytics-browser").then(({ track }) => {
          track("Error Boundary Caught", {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            url: window.location.href,
          });
        });
      } catch (e) {
        // Analytics not available, just log
        logger.error("Failed to track error:", e);
      }
    }

    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Something went wrong"
          color="red"
          variant="light"
        >
          <Stack gap="md">
            <Text size="sm">
              An unexpected error occurred. Please try refreshing the page.
            </Text>
            {(process.env.NODE_ENV === "development" ||
              process.env.NODE_ENV === "test") &&
              this.state.error && (
                <details>
                  <summary>Error Details (Development)</summary>
                  <pre style={{ fontSize: "12px", overflow: "auto" }}>
                    {this.state.error.message}
                    {"\n"}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            <Button
              leftSection={<IconRefresh size={16} />}
              onClick={this.handleRetry}
              size="sm"
            >
              Try Again
            </Button>
          </Stack>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

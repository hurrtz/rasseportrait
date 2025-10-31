type LogLevel = "debug" | "info" | "warn" | "error";

const LEVELS: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

// Use process.env for Jest compatibility
const getDefaultLevel = (): LogLevel => {
  // In test environment
  if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
    return "warn"; // Less verbose in tests
  }
  // In development environment
  if (
    typeof process !== "undefined" &&
    process.env.NODE_ENV === "development"
  ) {
    return "debug";
  }
  // In production or other environments
  return "warn";
};

const DEFAULT_LEVEL: LogLevel = getDefaultLevel();

const prefixArgs = (scope?: string, args: unknown[] = []) =>
  scope ? [`[${scope}]`, ...args] : args;

export interface Logger {
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  child: (childScope: string) => Logger;
}

export const createLogger = (
  scope?: string,
  minLevel: LogLevel = DEFAULT_LEVEL,
): Logger => {
  const should = (lvl: LogLevel) => LEVELS[lvl] >= LEVELS[minLevel];

  return {
    debug: (...a) => should("debug") && console.debug(...prefixArgs(scope, a)),
    info: (...a) => should("info") && console.info(...prefixArgs(scope, a)),
    warn: (...a) => should("warn") && console.warn(...prefixArgs(scope, a)),
    error: (...a) => console.error(...prefixArgs(scope, a)),
    child: (childScope) =>
      createLogger(scope ? `${scope}:${childScope}` : childScope, minLevel),
  };
};

export const logger = createLogger("app");

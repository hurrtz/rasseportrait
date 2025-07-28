// Environment configuration
export const config = {
  amplitude: {
    apiKey:
      import.meta.env.VITE_AMPLITUDE_API_KEY ||
      "73172d06233b85ff451f0f15f016ec0b",
  },
  environment: import.meta.env.MODE || "development",
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;

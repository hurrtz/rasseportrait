import {
  createTheme,
  type CSSVariablesResolver,
  type MantineColorsTuple,
} from "@mantine/core";

const orange: MantineColorsTuple = [
  "#fff4e8",
  "#ffe6cc",
  "#ffcc99",
  "#ffb066",
  "#ff9d45",
  "#fb8d30",
  "#f58220",
  "#d96d12",
  "#b4530a",
  "#8a3f07",
];

export const theme = createTheme({
  primaryColor: "orange",
  primaryShade: 6,
  colors: { orange },
  autoContrast: true,
  black: "#1b1712",
  white: "#ffffff",
  fontFamily: "var(--rp-font-body)",
  headings: { fontFamily: "var(--rp-font-display)", fontWeight: "800" },
  defaultRadius: "xl",
  radius: { xs: "10px", sm: "14px", md: "16px", lg: "24px", xl: "999px" },
  focusRing: "never", // the :focus-visible rule in styles/tokens.css draws the ring
  cursorType: "pointer",
});

/** Mantine's own body and text colours follow the design tokens */
export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {
    "--mantine-color-body": "var(--rp-bg)",
    "--mantine-color-text": "var(--rp-text)",
  },
  dark: {},
});

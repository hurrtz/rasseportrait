import React, { type ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import "@mantine/core/styles.css";
import "./styles/tokens.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  Loader,
} from "@mantine/core";
import type { Route } from "./+types/root";
import AppWrapper from "./App";
import { cssVariablesResolver, theme } from "./theme";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Atkinson+Hyperlegible:wght@400;700&display=swap",
  },
];

export function HydrateFallback() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "var(--rp-font-body)",
        fontSize: "18px",
        color: "var(--rp-text-muted)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Loader size="lg" />
      </div>
    </div>
  );
}

export const Layout = ({ children }: { children: ReactNode }) => (
  <html lang="de" {...mantineHtmlProps}>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="icon"
        type="image/png"
        href="/rasseportrait/favicon_16.ico"
        sizes="16x16"
      />
      <link
        rel="icon"
        type="image/png"
        href="/rasseportrait/favicon_32.ico"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="/rasseportrait/favicon_48.ico"
        sizes="48x48"
      />
      <link
        rel="icon"
        type="image/png"
        href="/rasseportrait/favicon_64.ico"
        sizes="64x64"
      />
      <link
        rel="icon"
        type="image/png"
        href="/rasseportrait/favicon_128.ico"
        sizes="128x128"
      />
      <link
        rel="icon"
        type="image/png"
        href="/rasseportrait/favicon_256.ico"
        sizes="256x256"
      />
      <link rel="icon" href="/rasseportrait/favicon.ico" />
      <ColorSchemeScript forceColorScheme="light" />

      <Links />
    </head>
    <body>
      <MantineProvider
        theme={theme}
        cssVariablesResolver={cssVariablesResolver}
        forceColorScheme="light"
      >
        <AppWrapper>{children}</AppWrapper>
      </MantineProvider>
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

function App() {
  return (
    <>
      <Meta />
      <Outlet />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  const stack =
    import.meta.env.DEV && error instanceof Error ? error.stack : undefined;

  return (
    <main className="rp-route-error">
      <h1>
        {notFound ? "Seite nicht gefunden" : "Da ist etwas schiefgegangen"}
      </h1>
      <p>
        {notFound
          ? "Unter dieser Adresse gibt es nichts."
          : "Lade die Seite neu oder versuche es später noch einmal."}
      </p>
      <a href="/rasseportrait/">Zu allen Portraits</a>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

export default App;

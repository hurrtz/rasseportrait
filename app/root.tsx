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
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import type { Route } from "./+types/root";
import AppWrapper from "./App";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const Layout = ({ children }: { children: ReactNode }) => (
  <html lang="en" {...mantineHtmlProps}>
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
      <ColorSchemeScript />

      <Links />
    </head>
    <body>
      <MantineProvider>
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
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

export default App;

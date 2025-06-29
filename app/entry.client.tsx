import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

// Fix for React Router 7 SPA mode basename issue
// Ensure the basename is correctly applied before hydration
if (typeof window !== "undefined" && (window as any).__reactRouterContext) {
  const context = (window as any).__reactRouterContext;
  const pathname = window.location.pathname;

  // If we're at the basename path without trailing slash, redirect
  if (pathname === "/rasseportrait") {
    window.location.pathname = "/rasseportrait/";
  }

  // Ensure basename is set correctly
  context.basename = "/rasseportrait";
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});

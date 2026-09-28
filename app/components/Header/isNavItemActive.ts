/** Portraits stays active on breed detail pages (/rasse/:slug) */
export const isNavItemActive = (to: string, pathname: string) =>
  to === "/"
    ? pathname === "/" || pathname.startsWith("/rasse/")
    : pathname === to || pathname.startsWith(`${to}/`);

/**
 * @jest-environment node
 */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  Links: () => null,
  Meta: () => null,
  Scripts: () => null,
  ScrollRestoration: () => null,
}));

jest.mock("../App", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import { ErrorBoundary, Layout, links } from "../root";

describe("root Layout", () => {
  it("declares the document language as German", () => {
    const markup = renderToStaticMarkup(
      <Layout>
        <div />
      </Layout>,
    );

    expect(markup).toMatch(/<html lang="de"/);
  });
});

describe("root links", () => {
  it("loads Bricolage Grotesque and Atkinson Hyperlegible instead of Inter", () => {
    const hrefs = links().map((link) => ("href" in link ? link.href : ""));
    const fonts = hrefs.find((href) => href?.includes("css2"));

    expect(fonts).toContain("family=Bricolage+Grotesque");
    expect(fonts).toContain("family=Atkinson+Hyperlegible");
    expect(hrefs.join(" ")).not.toContain("Inter");
  });
});

describe("root ErrorBoundary", () => {
  const render = (error: unknown) =>
    renderToStaticMarkup(
      <ErrorBoundary
        {...({ error } as React.ComponentProps<typeof ErrorBoundary>)}
      />,
    );

  it("says in German that a page does not exist", () => {
    const markup = render({
      status: 404,
      statusText: "Not Found",
      internal: true,
      data: "",
    });

    expect(markup).toContain("Seite nicht gefunden");
    expect(markup).toContain('href="/rasseportrait/"');
  });

  it("names other failures in German", () => {
    expect(render(new Error("boom"))).toContain("Da ist etwas schiefgegangen");
  });
});

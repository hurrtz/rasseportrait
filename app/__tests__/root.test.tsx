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

import { Layout } from "../root";

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

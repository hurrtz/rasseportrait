import React, { StrictMode } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { createRoot } from "react-dom/client";
import App from "./App";

amplitude.init("73172d06233b85ff451f0f15f016ec0b", { autocapture: true });

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

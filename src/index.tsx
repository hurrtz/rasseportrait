import React, { StrictMode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import * as amplitude from "@amplitude/analytics-browser";
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";
import { createRoot } from "react-dom/client";
import App from "./App";

const sessionReplayTracking = sessionReplayPlugin();
amplitude.add(sessionReplayTracking);
amplitude.init(
  window.location.hostname === "localhost"
    ? "" // no tracking during development
    : "73172d06233b85ff451f0f15f016ec0b",
);

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>,
);

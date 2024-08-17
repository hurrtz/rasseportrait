import React from "react";
import Typography from "@mui/material/Typography";

export default ({ isMobile }: { isMobile: boolean }) => (
  <>
    <Typography variant={isMobile ? "h4" : "h2"} gutterBottom>
      Tierisch menschlich
    </Typography>

    <Typography variant={isMobile ? "h5" : "h3"} gutterBottom>
      Rasseportrait
    </Typography>
  </>
);

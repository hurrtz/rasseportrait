import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

const Topics = () => {
  const isMobile = useMediaQuery("(max-width: 480px)");

  return (
    <Box>
      <Typography variant={isMobile ? "h4" : "h2"} gutterBottom>
        Themen
      </Typography>

      <Typography variant="body2" gutterBottom>
        dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </Typography>
    </Box>
  );
};

export default Topics;

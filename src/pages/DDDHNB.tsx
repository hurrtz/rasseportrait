import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Alert from "@mui/material/Alert";

const DDDHNB = () => {
  const isMobile = useMediaQuery("(max-width: 480px)");

  return (
    <Box>
      <Typography variant={isMobile ? "h4" : "h2"} gutterBottom>
        Dinge, die die Hundewelt nicht braucht
      </Typography>

      <Alert severity="info">
        <Typography variant="h6">Work in progress</Typography>
        <Typography>
          Seite ist im Aufbau und weitere Inhalte folgen demnächst!
        </Typography>
      </Alert>
    </Box>
  );
};

export default DDDHNB;

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

interface Props extends LinearProgressProps {
  value: number;
}

export default (props: Props) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Box sx={{ width: "100%", mr: 1 }}>
      <LinearProgress variant="determinate" {...props} />
    </Box>
    <Box sx={{ minWidth: 35 }}>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary" }}
      >{`${Math.round(props.value)}%`}</Typography>
    </Box>
  </Box>
);

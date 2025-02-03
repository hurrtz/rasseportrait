import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import * as amplitude from "@amplitude/analytics-browser";
import { dddhnb } from "../../db/dddhnb";
import { DDDHNB } from "../../types/dddhnb";

const getTime = (timecode: DDDHNB["timecode"]) => {
  const hours = Math.floor(timecode / 3600);
  const minutes = Math.floor((timecode % 3600) / 60);
  const seconds = timecode % 60;

  return [hours, minutes, seconds];
};

const getTimeCopy = (timecode: DDDHNB["timecode"]) => {
  const time = getTime(timecode);
  const out = [];

  if (time[0]) {
    out.push(`Stunde ${time[0]}`);
  }

  if (time[1]) {
    out.push(`Minute ${time[1]}`);
  }

  return out.join(", ");
};

const DDDHNB = () => {
  const isMobile = useMediaQuery("(max-width: 480px)");

  return (
    <Box>
      <Typography variant={isMobile ? "h4" : "h2"} gutterBottom>
        Dinge, die die Hundewelt nicht braucht
      </Typography>

      <Alert severity="info" sx={{ marginBottom: 4 }}>
        <Typography variant="h6">Work in progress</Typography>
        <Typography>
          Seite ist im Aufbau und weitere Inhalte folgen demnächst!
        </Typography>
      </Alert>

      {dddhnb.map(({ title, url, timecode }) => (
        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">{getTimeCopy(timecode)}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Link
                underline="none"
                target="_blank"
                href={url}
                onClick={() => {
                  amplitude.track("Podcast Clicked", {
                    category: "dddhnb",
                    url,
                  });
                }}
              >
                zur Episode
              </Link>
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default DDDHNB;

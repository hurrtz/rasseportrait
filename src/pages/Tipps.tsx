import React from "react";
import * as amplitude from "@amplitude/analytics-browser";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Masonry from "@mui/lab/Masonry";
import PlayCircle from "@mui/icons-material/PlayCircle";
import { tipps } from "../../db/tipps";
import { Author } from "../../types/tipps";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import LinkIcon from "@mui/icons-material/Link";
import IconButton from "@mui/material/IconButton";

const now = Date.now();
const url = new URL(window.location.href);
const isPreviewMode = url.searchParams.get("preview");

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

const stringAvatar = (name: string) => ({
  sx: {
    bgcolor: stringToColor(name),
    marginRight: 1,
  },
  children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
});

const AvatarMartin = <Avatar {...stringAvatar("Martin Rütter")} />;
const AvatarKatharina = <Avatar {...stringAvatar("Katharina Adick")} />;
const AvatarSophie = <Avatar {...stringAvatar("Sophie Grethe")} />;
const AvatarKirsten = <Avatar {...stringAvatar("Kirsten Tönnies")} />;
const AvatarConny = <Avatar {...stringAvatar("Conny Sporrer")} />;
const AvatarAchim = <Avatar {...stringAvatar("Achim Gruber")} />;
const AvatarPeter = <Avatar {...stringAvatar("Peter Wohlleben")} />;
const AvatarKarim = <Avatar {...stringAvatar("Karim Montasser")} />;
const AvatarMai = <Avatar {...stringAvatar("Mai Thi Nguyen Kim")} />;

const getAvatar = (name: Author) => {
  switch (name) {
    case "Martin Rütter":
      return AvatarMartin;

    case "Katharina Adick":
      return AvatarKatharina;

    case "Sophie Grethe":
      return AvatarSophie;

    case "Dr. Kirsten Tönnies":
      return AvatarKirsten;

    case "Conny Sporrer":
      return AvatarConny;

    case "Prof. Achim Gruber":
      return AvatarAchim;

    case "Peter Wohlleben":
      return AvatarPeter;

    case "Dr. Karim Montasser":
      return AvatarKarim;

    case "Mai Thi Nguyen Kim":
      return AvatarMai;

    default:
      return null;
  }
};

const TippContent = ({ content }: { content: string[] }) => {
  if (content.length === 1) {
    return <div>{content[0]}</div>;
  }

  return (
    <ul style={{ margin: 0, paddingLeft: "16px" }}>
      {content.map((tipp) => (
        <li>{tipp}</li>
      ))}
    </ul>
  );
};

const EpisodeTipp = ({
  content,
  author,
}: {
  content: string[];
  author: Author;
}) => (
  <div
    style={{
      display: "flex",
      alignItems: content.length > 1 ? "flex-start" : "center",
    }}
  >
    {getAvatar(author)} <TippContent content={content} />
  </div>
);

const StyledDivider = <Divider sx={{ marginTop: 2, marginBottom: 2 }} />;

const content = tipps
  .filter(({ startShowingFromTimestamp }) => {
    if (isPreviewMode || startShowingFromTimestamp === undefined) {
      return true;
    }

    return now > startShowingFromTimestamp;
  })
  .map(({ title, subheader, tipps, url, furtherReading }) => (
    <Card sx={{ marginTop: 2 }} key={title}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <IconButton
            onClick={() => {
              amplitude.track("Podcast Clicked", { category: "tipp", url });
            }}
            target="_blank"
            href={url}
            title="zur Episode"
          >
            <PlayCircle />
          </IconButton>
        }
      />
      <CardContent>
        {tipps.map(({ tipp, author }, index, array) => (
          <>
            <EpisodeTipp content={tipp} author={author} />
            {index < array.length - 1 && StyledDivider}
          </>
        ))}
      </CardContent>
      {furtherReading && (
        <CardActions sx={{ flexWrap: "wrap" }}>
          <div style={{ margin: "0" }}>
            <List dense>
              {furtherReading &&
                furtherReading.map(({ name, url }) => (
                  <>
                    <ListItem
                      key={name}
                      disablePadding
                      disableGutters
                      sx={{ marginBottom: "8px" }}
                    >
                      <ListItemButton
                        sx={{
                          flex: "0 0 auto",
                          backgroundColor: "rgba(0, 0, 0, .025);",
                          borderRadius: 1,
                        }}
                        onClick={() => {
                          amplitude.track("Further Reading Clicked", {
                            category: "tipp",
                            url,
                          });
                        }}
                        target="_blank"
                        href={url}
                      >
                        <ListItemIcon>
                          <LinkIcon />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                      </ListItemButton>
                    </ListItem>
                  </>
                ))}
            </List>
          </div>
        </CardActions>
      )}
    </Card>
  ));

const Tipps = () => {
  const isMobile = useMediaQuery("(max-width: 799px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <Box>
      <Typography variant={isMobile ? "h4" : "h2"} gutterBottom>
        Tipps
      </Typography>

      <Alert severity="info" sx={{ marginBottom: 4 }}>
        <Typography variant="h6">Work in progress</Typography>
        <Typography>
          Seite ist im Aufbau und weitere Inhalte folgen demnächst!
        </Typography>
      </Alert>

      {isMobile ? (
        <>{content}</>
      ) : (
        <Masonry columns={isDesktop ? 3 : 2} spacing={2}>
          {content}
        </Masonry>
      )}
    </Box>
  );
};

export default Tipps;

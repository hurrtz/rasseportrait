import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Link from "@mui/material/Link";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { tipps } from "../../db/tipps";
import { Author } from "../../types/tipps";

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

const Tipps = () => {
  const isMobile = useMediaQuery("(max-width: 480px)");

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

      {tipps.map(({ title, subheader, tipps, url }) => (
        <Card sx={{ marginTop: 2 }}>
          <CardHeader title={title} subheader={subheader} />
          <CardContent>
            {tipps.map(({ tipp, author }, index, array) => (
              <>
                <EpisodeTipp content={tipp} author={author} />
                {index < array.length - 1 && StyledDivider}
              </>
            ))}
          </CardContent>
          <CardActions>
            <Button size="small">
              <Link underline="none" target="_blank" href={url}>
                zur Episode
              </Link>
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Tipps;

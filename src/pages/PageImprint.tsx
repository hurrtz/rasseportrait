import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const handleMailClick = () => {
  window.open("mailto:rasseportrait@tobiaswinkler.berlin", "_blank");
};

const handleURLClick = (url: string) => {
  window.open(url, "_blank");
};

const Imprint = () => (
  <Box>
    <Typography variant="h2" gutterBottom>
      Impressum
    </Typography>

    <Card>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Zweck
        </Typography>

        <Typography variant="body2" gutterBottom>
          Diese Website ist ein Fanprojekt zum Podcast{" "}
          <a
            href="https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv"
            target="_blank"
          >
            Tierisch Menschlich
          </a>{" "}
          von Martin Rütter und Katharina Adick. Es enthält eine nicht
          verbindliche kuratierte Liste aller Episoden, die ein Rasseportrait
          enthalten. Dieses Projekt ist in keiner Weise beauftragt von RTL oder
          einer der teilnehmenden oder der Produktion des Podcasts mitwirkenden
          Personen.
        </Typography>

        <Typography variant="body2" gutterBottom mt={2}>
          Bei Problemen, Änderungswünschen oder sonstigem Feedback wenden Sie
          sich gern an die unten stehende Kontaktmöglichkeit.
        </Typography>
      </CardContent>
    </Card>

    <Card sx={{ marginTop: 4 }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Kontakt
        </Typography>

        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BadgeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Tobias Winkler" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  <EmailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="rasseportrait@tobiaswinkler.berlin"
                onClick={handleMailClick}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  <LinkedInIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="LinkedIn"
                onClick={() =>
                  handleURLClick(
                    "https://www.linkedin.com/in/tobias-winkler-87a08210b/",
                  )
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  <GitHubIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Github"
                onClick={() => handleURLClick("https://github.com/hurrtz")}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  </Box>
);

export default Imprint;

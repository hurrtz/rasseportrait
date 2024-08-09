import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";

const handleMailClick = () => {
  window.open("mailto:info@tobiaswinkler.berlin", "_blank");
};

const Imprint = () => (
  <Box>
    <Typography variant="h2" gutterBottom>
      Impressum
    </Typography>

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
      von Martin Rütter und Katharina Adick. Es enthält eine nicht verbindliche
      kuratierte Liste aller Episoden, die ein Rasseportrait enthalten. Dieses
      Projekt ist in keiner Weise beauftragt von RTL oder einer teilnehmenden
      oder dem Podcast assoziierten Personen.
    </Typography>

    <Typography variant="body2" gutterBottom>
      Bei Problemen, Änderungswünschen oder sonstigem Feedback wenden Sie sich
      gern an die unten stehenden Kontaktmöglichkeiten.
    </Typography>

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
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <HomeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Zeuschelstraße 97, 13127 Berlin" />
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="info@tobiaswinkler.berlin"
            onClick={handleMailClick}
          />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PhoneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="+491635460791" />
      </ListItem>
    </List>
  </Box>
);

export default Imprint;

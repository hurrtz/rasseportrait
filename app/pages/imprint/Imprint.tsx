import React, { useId, type ReactNode } from "react";
import classes from "./Imprint.module.css";

const External = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <a href={href} target="_blank" rel="noopener" className={classes.link}>
    {children}
  </a>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const id = useId();
  return (
    <section className={classes.card} aria-labelledby={id}>
      <h2 id={id} className={classes.cardTitle}>
        {title}
      </h2>
      {children}
    </section>
  );
};

const Imprint = () => (
  <div className={classes.page}>
    <h1 className={classes.title}>Impressum</h1>

    <Section title="Zweck">
      <p>
        Diese Website ist ein Fanprojekt zum Podcast{" "}
        <strong>Tierisch Menschlich</strong> von Martin Rütter und Katharina
        Adick. Es enthält eine nicht verbindliche kuratierte Liste aller
        Episoden, die ein Rasseportrait enthalten.
      </p>
      <p>
        Der Podcast wurde bis zum 11. Dezember 2025 über{" "}
        <External href="https://plus.rtl.de">RTL+</External> veröffentlicht.
        Seit Februar 2026 wird er von{" "}
        <External href="https://www.mina-entertainment.de">
          Mina Entertainment
        </External>{" "}
        (Martin Rütter) produziert und über{" "}
        <External href="https://open.spotify.com">Spotify</External>{" "}
        bereitgestellt.
      </p>
      <p>
        Dieses Projekt ist in keiner Weise beauftragt von oder affiliiert mit
        RTL, Mina Entertainment, Spotify oder einer der am Podcast teilnehmenden
        oder mitwirkenden Personen.
      </p>
      <p>
        Bei Problemen, Änderungswünschen oder sonstigem Feedback wenden Sie sich
        gern an die unten stehende Kontaktmöglichkeit.
      </p>
    </Section>

    <Section title="Kontakt">
      <p>
        <strong>Name:</strong> Tobias Winkler
        <br />
        <strong>E-Mail:</strong>{" "}
        <a
          href="mailto:rasseportrait@tobiaswinkler.berlin"
          className={classes.link}
        >
          rasseportrait@tobiaswinkler.berlin
        </a>
        <br />
        <strong>LinkedIn:</strong>{" "}
        <External href="https://www.linkedin.com/in/tobias-winkler-87a08210b/">
          tobias-winkler-87a08210b
        </External>
        <br />
        <strong>GitHub:</strong>{" "}
        <External href="https://github.com/hurrtz">hurrtz</External>
      </p>
    </Section>
  </div>
);

export default Imprint;

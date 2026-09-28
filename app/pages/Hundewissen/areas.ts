/**
 * The Hundewissen areas: the pipeline's categories (CATEGORIES in
 * scripts/podcast_index/podcast_index/extraction.py) with their URL slug and
 * Tabler icon. Pages list areas by topic count, ties in this order.
 *
 * Area pictures (db/hundewissen/areas/<slug>/illustration.png) get their alt
 * text and focal point here; compileHundewissen only uses a picture that
 * exists.
 */

export interface AreaDefinition {
  name: string;
  slug: string;
  icon: string;
  image?: { alt: string; position?: string };
}

export const AREAS: AreaDefinition[] = [
  {
    name: "Verhalten & Kommunikation",
    slug: "verhalten-kommunikation",
    icon: "IconMessages",
    image: {
      alt: "Ein Hund aus Papier gibt einer Frau, die vor ihm auf dem Boden sitzt, die Pfote",
      position: "50% 25%",
    },
  },
  {
    name: "Erziehung & Training",
    slug: "erziehung-training",
    icon: "IconTargetArrow",
    image: {
      alt: "Eine Frau hockt mit einem Leckerli vor einem Hund aus Papier, der über eine kleine Hürde läuft",
      position: "50% 35%",
    },
  },
  {
    name: "Gesundheit & Medizin",
    slug: "gesundheit-medizin",
    icon: "IconStethoscope",
    image: {
      alt: "Eine Tierärztin hört einen Hund aus Papier mit verbundener Pfote mit dem Stethoskop ab",
      position: "50% 20%",
    },
  },
  {
    name: "Ernährung",
    slug: "ernaehrung",
    icon: "IconBowlSpoon",
    image: {
      alt: "Ein Hund aus Papier frisst aus einem gefüllten Napf, daneben steht ein Wassernapf",
      position: "50% 60%",
    },
  },
  {
    name: "Haltung & Pflege",
    slug: "haltung-pflege",
    icon: "IconHomeHeart",
    image: {
      alt: "Eine Frau bürstet einen Hund aus Papier, daneben stehen ein Hundebett und ein Wassernapf",
      position: "50% 30%",
    },
  },
  {
    name: "Zucht & Rassen",
    slug: "zucht-rassen",
    icon: "IconDna2",
    image: {
      alt: "Eine Hündin aus Papier liegt mit drei Welpen im Körbchen",
      position: "50% 55%",
    },
  },
  {
    name: "Tierschutz & Ethik",
    slug: "tierschutz-ethik",
    icon: "IconHeartHandshake",
    image: {
      alt: "Ein Hund und eine Katze aus Papier kuscheln unter einem schützenden Dach, das eine Waage trägt",
      position: "50% 55%",
    },
  },
  {
    name: "Recht & Politik",
    slug: "recht-politik",
    icon: "IconScale",
    image: {
      alt: "Ein aufgeschlagenes Gesetzbuch mit Waage, eine Wahlurne und ein Gerichtsgebäude aus Papier",
      position: "50% 55%",
    },
  },
  {
    name: "Hundesport & Arbeitshunde",
    slug: "hundesport-arbeitshunde",
    icon: "IconTrophy",
    image: {
      alt: "Ein Hund springt über eine Hürde, ein Suchhund im Geschirr folgt einer Spur durch eine Landschaft aus Papier",
      position: "50% 45%",
    },
  },
  {
    name: "Mensch-Hund-Beziehung",
    slug: "mensch-hund-beziehung",
    icon: "IconHeart",
    image: {
      alt: "Ein Mann sitzt auf dem Boden und schmiegt sich an einen Hund aus Papier",
      position: "50% 25%",
    },
  },
  {
    name: "Wissenschaft & Forschung",
    slug: "wissenschaft-forschung",
    icon: "IconMicroscope",
    image: {
      alt: "Ein Teleskop aus Papier vor einem Nachthimmel mit Mond, Sternen und Saturn",
      position: "50% 45%",
    },
  },
  {
    name: "Andere Tiere",
    slug: "andere-tiere",
    icon: "IconFeather",
    image: {
      alt: "Katze, Kaninchen, Schildkröte, Papagei und ein Fisch im Aquarium, alle aus Papier gefaltet",
      position: "50% 30%",
    },
  },
];

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
  },
  {
    name: "Erziehung & Training",
    slug: "erziehung-training",
    icon: "IconTargetArrow",
  },
  {
    name: "Gesundheit & Medizin",
    slug: "gesundheit-medizin",
    icon: "IconStethoscope",
  },
  { name: "Ernährung", slug: "ernaehrung", icon: "IconBowlSpoon" },
  { name: "Haltung & Pflege", slug: "haltung-pflege", icon: "IconHomeHeart" },
  { name: "Zucht & Rassen", slug: "zucht-rassen", icon: "IconDna2" },
  {
    name: "Tierschutz & Ethik",
    slug: "tierschutz-ethik",
    icon: "IconHeartHandshake",
  },
  { name: "Recht & Politik", slug: "recht-politik", icon: "IconScale" },
  {
    name: "Hundesport & Arbeitshunde",
    slug: "hundesport-arbeitshunde",
    icon: "IconTrophy",
  },
  {
    name: "Mensch-Hund-Beziehung",
    slug: "mensch-hund-beziehung",
    icon: "IconHeart",
  },
  {
    name: "Wissenschaft & Forschung",
    slug: "wissenschaft-forschung",
    icon: "IconMicroscope",
  },
  { name: "Andere Tiere", slug: "andere-tiere", icon: "IconFeather" },
];

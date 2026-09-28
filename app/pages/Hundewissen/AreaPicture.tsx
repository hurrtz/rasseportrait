import React from "react";
import clsx from "clsx";
import type { HundewissenArea } from "types/hundewissen";
import AreaIcon from "./AreaIcon";
import shared from "./shared.module.css";

/** Below md; matches the 62em breakpoint of the CSS */
const SMALL_SCREENS = "(max-width: 61.99em)";

interface Props {
  area: HundewissenArea;
  /** size and radius of the picture or tile */
  className: string;
  iconSize: number;
  /** the 400×400 thumbnail instead of the 1600×900 picture */
  thumbnail?: boolean;
  /** the thumbnail on small screens only, where the picture is a small tile */
  thumbnailBelowMd?: boolean;
  /** inside a link that already names the area: no alt text */
  decorative?: boolean;
}

/** The area's illustration; its icon on a muted tile while there is none */
const AreaPicture = ({
  area,
  className,
  iconSize,
  thumbnail,
  thumbnailBelowMd,
  decorative,
}: Props) => {
  if (!area.image) {
    return (
      <span className={clsx(shared.iconTile, className)}>
        <AreaIcon icon={area.icon} size={iconSize} />
      </span>
    );
  }

  const img = (
    <img
      src={thumbnail ? area.image.thumbnail : area.image.src}
      alt={decorative ? "" : area.image.alt}
      className={className}
      style={{ objectFit: "cover", objectPosition: area.image.position }}
      loading="lazy"
      decoding="async"
    />
  );

  return thumbnailBelowMd ? (
    // display: contents keeps the <img> the one the layout sizes
    <picture style={{ display: "contents" }}>
      <source media={SMALL_SCREENS} srcSet={area.image.thumbnail} />
      {img}
    </picture>
  ) : (
    img
  );
};

export default AreaPicture;

import React from "react";
import clsx from "clsx";
import type { HundewissenArea } from "types/hundewissen";
import AreaIcon from "./AreaIcon";
import shared from "./shared.module.css";

interface Props {
  area: HundewissenArea;
  /** size and radius of the picture or tile */
  className: string;
  iconSize: number;
  /** the 400×400 thumbnail instead of the 1600×900 picture */
  thumbnail?: boolean;
}

/** The area's illustration; its icon on a muted tile while there is none */
const AreaPicture = ({ area, className, iconSize, thumbnail }: Props) =>
  area.image ? (
    <img
      src={thumbnail ? area.image.thumbnail : area.image.src}
      alt={area.image.alt}
      className={className}
      style={{ objectFit: "cover", objectPosition: area.image.position }}
      loading="lazy"
      decoding="async"
    />
  ) : (
    <span className={clsx(shared.iconTile, className)}>
      <AreaIcon icon={area.icon} size={iconSize} />
    </span>
  );

export default AreaPicture;

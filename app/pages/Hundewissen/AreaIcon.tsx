import React from "react";
import {
  IconBowlSpoon,
  IconDna2,
  IconFeather,
  IconHeart,
  IconHeartHandshake,
  IconHomeHeart,
  IconMessages,
  IconMicroscope,
  IconPaw,
  IconScale,
  IconStethoscope,
  IconTargetArrow,
  IconTrophy,
  type Icon,
} from "@tabler/icons-react";

const ICONS: Record<string, Icon> = {
  IconBowlSpoon,
  IconDna2,
  IconFeather,
  IconHeart,
  IconHeartHandshake,
  IconHomeHeart,
  IconMessages,
  IconMicroscope,
  IconScale,
  IconStethoscope,
  IconTargetArrow,
  IconTrophy,
};

/** The area's Tabler icon by name (areas.ts); a paw for unknown names */
const AreaIcon = ({ icon, size }: { icon: string; size: number }) => {
  const Component = ICONS[icon] ?? IconPaw;
  return <Component size={size} stroke={1.75} aria-hidden />;
};

export default AreaIcon;

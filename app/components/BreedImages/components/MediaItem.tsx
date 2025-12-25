import React, { memo, type MouseEventHandler } from "react";
import { Image } from "@mantine/core";
import clsx from "clsx";
import { useBreed } from "~/stores/breeds";
import "./styles.css";

interface MediaItemProps {
  src: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isDetailView?: boolean;
  className?: string;
  breedId: string | number;
}

const MediaItem = ({
  src,
  onClick,
  isDetailView = false,
  className = "image",
  breedId,
}: MediaItemProps) => {
  const breed = useBreed(breedId);

  return (
    <div
      className={clsx("mediaItemWrapper", {
        notPresented: breed?.details.isOfficiallyPresented === false,
        detailView: isDetailView,
      })}
      onClick={onClick}
    >
      <Image
        src={src}
        width="100%"
        height="100%"
        className={clsx(className, "image")}
      />
    </div>
  );
};

export default memo(MediaItem);

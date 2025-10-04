import React from "react";
import { ActionIcon } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import clsx from "clsx";
import "./styles.css";

interface PlayButtonProps {
  onClick: () => void;
}

const PlayButton = ({ onClick }: PlayButtonProps) => (
  <div className={clsx("playButtonWrapper")} onClick={onClick}>
    <ActionIcon
      variant="transparent"
      size="xl"
      color="white"
      className={clsx("actionIcon")}
    >
      <IconPlayerPlay size={32} />
    </ActionIcon>
  </div>
);

export default PlayButton;

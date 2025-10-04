import React from "react";
import { ActionIcon } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";

interface PlayButtonProps {
  onClick: () => void;
}

const PlayButton = ({ onClick }: PlayButtonProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
        background: "rgba(0, 0, 0, 0.7)",
        borderRadius: "50%",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
      onClick={onClick}
    >
      <ActionIcon
        variant="transparent"
        size="xl"
        color="white"
        style={{ padding: "8px" }}
      >
        <IconPlayerPlay size={32} />
      </ActionIcon>
    </div>
  );
};

export default PlayButton;

import React from "react";
import { Loader, Stack, Text } from "@mantine/core";
import "./styles.css";

interface Props {
  message?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: string;
}

const LoadingSpinner = ({
  message = "Loading...",
  size = "md",
  color = "blue",
}: Props) => {
  return (
    <Stack align="center" gap="md" className="loading-spinner">
      <Loader size={size} color={color} />
      <Text size="sm" c="dimmed">
        {message}
      </Text>
    </Stack>
  );
};

export default LoadingSpinner;

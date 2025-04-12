"use client";

import React from "react";
import { ClientOnly, IconButton, Skeleton } from "@chakra-ui/react";
import { ColorModeIcon, useColorMode } from "@/components/ui/color-mode";

const ThemeSwitchButton: React.FC = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <ClientOnly
      fallback={
        <Skeleton
          boxSize="8"
          position="fixed"
          top="1rem"
          right="1rem"
          zIndex="1000"
          borderRadius="full"
          border="2px solid"
          borderColor="gray.300"
        />
      }
    >
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        position="fixed"
        top="1rem"
        right="1rem"
        zIndex="1000"
        borderRadius="full"
        border="2px solid"
        borderColor="gray.300"
        padding="3"
        css={{
          _icon: {
            width: "5",
            height: "5",
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
};

export default ThemeSwitchButton;

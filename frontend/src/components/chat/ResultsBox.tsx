"use client";

import React, { useEffect } from "react";
import { Box, Heading, Separator } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { useColorMode } from "../ui/color-mode";

interface ResultsBoxProps {
  response: string;
  prompt: string;
}

function getPromptText(prompt: string) {
  return "```js\n" + prompt + "\n```";
}

export default function ResultsBox({ response, prompt }: ResultsBoxProps) {
  const { colorMode } = useColorMode();

  useEffect(() => {
    const linkId = "highlight-style";
    let linkElement = document.getElementById(linkId) as HTMLLinkElement | null;
    if (!linkElement) {
      linkElement = document.createElement("link");
      linkElement.id = linkId;
      linkElement.rel = "stylesheet";
      document.head.appendChild(linkElement);
    }
    // CSS inside public folder
    linkElement.href =
      colorMode === "dark"
        ? "/highlight/github-dark.css"
        : "/highlight/github.css";
  }, [colorMode]);

  return (
    <Box
      p={{ base: 4, md: 6, lg: 8 }}
      borderWidth="1px"
      borderRadius={{ base: 10, md: 20 }}
      my={4}
      overflow="auto"
      boxShadow="md"
      fontSize={{ base: "xs", md: "sm", lg: "medium" }}
    >
      <Heading>Prompt:</Heading>
      <Separator my={2} />
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {getPromptText(prompt)}
      </ReactMarkdown>
      <Heading mt={4}>Response:</Heading>
      <Separator my={2} />

      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {response}
      </ReactMarkdown>
    </Box>
  );
}

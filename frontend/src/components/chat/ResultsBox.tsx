"use client";

import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

interface ResultsBoxProps {
  response: string;
  prompt: string;
}

export default function ResultsBox({ response, prompt }: ResultsBoxProps) {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      my={4}
      overflow="auto"
      boxShadow="md"
    >
      <Heading>Promt</Heading>
      <ReactMarkdown>{prompt}</ReactMarkdown>
      <Heading>Responce</Heading>
      <ReactMarkdown>{response}</ReactMarkdown>
    </Box>
  );
}

"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Textarea, Button } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

interface InputBoxProps {
  onSubmit: (prompt: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState("");
  const color = useColorModeValue("gray.100", "gray.700");

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(prompt);
    setPrompt("");
  };

  return (
    <Box
      position={"sticky"}
      bottom={10}
      as="form"
      onSubmit={handleSubmit}
      mt={4}
      width={"11/12"}
      zIndex={1000}
      maxWidth={1000}
      borderRadius={"xl"}
      backgroundColor={color}
      boxShadow="md"
    >
      <Box position={"relative"}>
        <Textarea
          placeholder="Wpisz swój prompt..."
          value={prompt}
          onChange={handleChange}
          height={"100%"}
          maxHeight={"50vh"}
          minHeight={"30vh"}
          padding={8}
          resize={"none"}
          border="none"
        />
        <Button
          type="submit"
          colorScheme="blue"
          position={"absolute"}
          right={10}
          bottom={8}
        >
          Wyślij
        </Button>
      </Box>
    </Box>
  );
};

export default InputBox;

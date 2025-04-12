"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Textarea, Button } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";

interface InputBoxProps {
  onSubmit: (prompt: string) => void;
  buttonDisabled?: boolean;
}

const InputBox: React.FC<InputBoxProps> = ({
  onSubmit,
  buttonDisabled = false,
}) => {
  const [prompt, setPrompt] = useState("");
  const chatInputColor = useColorModeValue("gray.50", "gray.900");
  const accentOnHover = useColorModeValue("cyan.700", "cyan.400");
  const accent = useColorModeValue("cyan.600", "cyan.500");

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
      bottom={2}
      as="form"
      onSubmit={handleSubmit}
      mt={4}
      width={"11/12"}
      zIndex={1000}
      maxWidth={1000}
    >
      <Box position={"relative"}>
        <Textarea
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={handleChange}
          backgroundColor={chatInputColor}
          height={"100%"}
          maxHeight={"70vh"}
          minHeight={"35vh"}
          padding={{ base: 5, md: 8 }}
          resize={"none"}
          border="none"
          borderRadius={20}
          boxShadow="md"
          fontSize={{ base: "xs", md: "sm", lg: "medium" }}
          focusRingColor={accent}
        />
        <Button
          type="submit"
          colorScheme="blue"
          fontSize={{ base: "lg", md: "xl" }}
          position={"absolute"}
          right={{ base: 2, md: 10 }}
          bottom={{ base: 3, md: 8 }}
          px={{ base: 7, md: 10 }}
          py={{ base: 5, md: 6 }}
          backgroundColor={accent}
          borderRadius={20}
          boxShadow="md"
          _hover={{ backgroundColor: accentOnHover }}
          _focus={{ backgroundColor: accentOnHover }}
          _active={{ backgroundColor: accentOnHover }}
          disabled={buttonDisabled}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default InputBox;

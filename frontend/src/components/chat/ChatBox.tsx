"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import InputBox from "./InputBox";
import ResultsBox from "./ResultsBox";
import { useMutation } from "@tanstack/react-query";
import getBackendUrl from "@/utils/backendConnection";

interface ChatMessage {
  id: number;
  prompt: string;
  response: string;
}

function getSavedMessages(): ChatMessage[] {
  if (typeof window !== "undefined") {
    const savedMessages = localStorage.getItem("messages");
    if (savedMessages) {
      return JSON.parse(savedMessages);
    }
  }
  return [];
}

async function saveMessages(messages: ChatMessage[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("messages", JSON.stringify(messages));
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(getSavedMessages());

  const sendPrompt = async (prompt: string) => {
    // alert("Sending prompt: " + prompt);
    const res = await fetch(getBackendUrl("api/review"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
    });

    if (!res.ok) {
      throw new Error("Error occurred during the request");
    }

    const decoded = await res.json();
    // alert("Decoded: " + JSON.stringify(decoded));
    return decoded;
  };

  const mutation = useMutation({
    mutationFn: sendPrompt,
    onSuccess: (data, variables) => {
      const newId = messages.length ? messages[messages.length - 1].id + 1 : 1;
      const newMessage: ChatMessage = {
        id: newId,
        prompt: variables,
        response: data.response,
      };
      setMessages((prev) => [...prev, newMessage]);
    },
    onError: (error) => {
      alert("ERROR when send:" + error);
    },
  });

  const handleSubmit = (prompt: string) => {
    mutation.mutate(prompt);
  };

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  return (
    <>
      <Box width={{ base: "100%", md: "11/12" }} maxWidth={1000} p={{ md: 4 }}>
        <Box overflowY="auto" px={4} height="100%">
          {messages.map((message, idx) => (
            <Box key={idx} mb={4}>
              <ResultsBox response={message.response} prompt={message.prompt} />
            </Box>
          ))}
        </Box>
      </Box>
      <InputBox onSubmit={handleSubmit} />
    </>
  );
};

export default ChatBox;

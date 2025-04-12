"use client";

import React, { useEffect, useState, useRef } from "react";
import { Box } from "@chakra-ui/react";
import InputBox from "./InputBox";
import ResultsBox from "./ResultsBox";
import { useMutation, useQuery } from "@tanstack/react-query";
import getBackendUrl from "@/utils/backendConnection";

import { toaster } from "../ui/toaster";
import checkPrompt from "@/utils/promtValidators";

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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      saveMessages(messages);
    } else {
      didMountRef.current = true;
    }
  }, [messages]);

  useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      let status = "";
      try {
        const res = await fetch(getBackendUrl("api/review"));
        if (!res.ok) {
          status = res.status.toString();
          throw new Error("Error fetching messages from server");
        }
        const messages = await res.json();
        setMessages(messages);
        // await saveMessages(messages);
        return messages;
      } catch {
        const cachedMessages = getSavedMessages();
        setMessages(cachedMessages);
        toaster.warning({
          title: "Error fetching messages from serwer",
          description:
            "Could not fetch messages from the server. Cached one will be used." +
            status,
        });
        throw new Error("Error fetching messages from server"); //rethrow the error to trigger the error state in the query
      }
    },
    // retry: false,
    refetchOnWindowFocus: true,
    retryDelay: 60 * 1000, // 60s
  });

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

  const sendPromiseWithToaster = async (prompt: string) => {
    const promise = sendPrompt(prompt);
    toaster.promise(promise, {
      loading: {
        title: "Getting your answear...",
        description: "Please wait...",
      },
      success: {
        title: "Got answear!",
        description: "Looks great!",
      },
      error: {
        title: "Sorry :(",
        description: "Something went wrong, please try again.",
      },
    });
    return await promise;
  };

  const mutation = useMutation({
    mutationFn: sendPromiseWithToaster,
    onSuccess: (data) => {
      const newMessage = data.chatMessage;
      setMessages((prev) => [...prev, newMessage]);
    },
  });

  const handleSubmit = (prompt: string) => {
    const { result, message, couldBeValid } = checkPrompt(prompt);
    if (!result) {
      if (couldBeValid) {
        toaster.info({
          title: "Something could be wrong with your prompt!",
          description: message,
        });
        mutation.mutate(prompt); // send it anyway
      } else {
        toaster.warning({
          title: "Something is wrong with your prompt!",
          description: message,
        });
      }
      return;
    }
    mutation.mutate(prompt);
  };

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
      <InputBox onSubmit={handleSubmit} buttonDisabled={mutation.isPending} />
    </>
  );
};

export default ChatBox;

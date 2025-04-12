"use client";

import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import InputBox from "./InputBox";
import ResultsBox from "./ResultsBox";

interface ChatMessage {
  id: number;
  prompt: string;
  response: string;
}

let dummyMessages: ChatMessage[] = [
  {
    id: 1,
    prompt: "Cześć, jak mogę Ci pomóc?",
    response: "Witaj! To jest przykładowa odpowiedź.",
  },
  {
    id: 2,
    prompt: "Pokaż mi jakieś przykłady kodu.",
    response: "Oto przykładowy kod:\n````js\nconsole.log('Hello World');\n````",
  },
];

dummyMessages = Array(10).fill(dummyMessages).flat();

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(dummyMessages);

  const handleSubmit = (prompt: string) => {
    const newId = messages.length ? messages[messages.length - 1].id + 1 : 1;
    const response = `Otrzymałem Twój prompt: ${prompt}`; //mocked
    const newMessage: ChatMessage = { id: newId, prompt, response };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <>
      <Box width={"11/12"} maxWidth={1000} p={4}>
        {/* Kontener wiadomości z automatycznym przewijaniem */}
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

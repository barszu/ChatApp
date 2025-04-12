import { VStack, Heading } from "@chakra-ui/react";
import ChatBox from "@/components/chat/ChatBox";
import ThemeSwitchButton from "@/components/util/ThemeSwitchButton";

export default function Home() {
  return (
    <VStack py="5" position="relative">
      <Heading fontSize="3xl" fontWeight="bold" mb={4}>
        LLM fix me code pls chat
      </Heading>
      <ThemeSwitchButton />
      <ChatBox />
    </VStack>
  );
}

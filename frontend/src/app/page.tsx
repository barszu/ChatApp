import { VStack, Heading } from "@chakra-ui/react";
import ChatBox from "@/components/chat/ChatBox";
import ThemeSwitchButton from "@/components/util/ThemeSwitchButton";

export default function Home() {
  return (
    <VStack py="10" position="relative">
      <Heading fontSize={{ base: "2xl", sm: "3xl" }} fontWeight="bold">
        The JS/TS Code Reviewer
      </Heading>
      <ThemeSwitchButton />
      <ChatBox />
    </VStack>
  );
}

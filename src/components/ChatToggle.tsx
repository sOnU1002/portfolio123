"use client";

import { useChatbot } from "@/contexts/ChatContext";
import { Bot, BotOff } from "lucide-react";
import { Button } from "./ui/Button";

export default function ChatToggle() {
  const { isVisible, toggleChatbot } = useChatbot();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={toggleChatbot}
      className={isVisible ? "text-orange-600 dark:text-violet-500" : ""}
    >
      {isVisible ? (
        <Bot className="size-5" />
      ) : (
        <BotOff className="size-5" />
      )}
      <span className="sr-only">Toggle AI Chat</span>
    </Button>
  );
}

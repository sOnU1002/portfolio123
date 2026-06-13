"use client";

import { createContext, ReactNode, useContext, useState } from "react";

const ChatContext = createContext({
  isVisible: false,
  toggleChatbot: () => {},
});

export const useChatbot = () => useContext(ChatContext);

interface Props {
  children: ReactNode;
}

export function ChatProvider({ children }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleChatbot = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <ChatContext.Provider value={{ isVisible, toggleChatbot }}>
      {children}
    </ChatContext.Provider>
  );
}

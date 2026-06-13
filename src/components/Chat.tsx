"use client";

import { useChatbot } from "@/contexts/ChatContext";
import { CHAT_SUGGESTIONS } from "@/lib/knowledge";
import { useChat } from "ai/react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { Button } from "./ui/Button";

export default function Chat() {
  const { isVisible, toggleChatbot } = useChatbot();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
    append,
  } = useChat({
    api: "/api/chat",
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex w-[400px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-orange-300/40 bg-card/90 shadow-2xl shadow-orange-500/20 backdrop-blur-2xl dark:border-violet-500/20 dark:shadow-violet-500/20"
          >
          <div className="relative border-b border-orange-200/60 bg-gradient-to-r from-orange-100/80 via-transparent to-amber-100/80 px-4 py-3 dark:border-violet-500/10 dark:from-violet-500/10 dark:to-cyan-500/10">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleChatbot}
              className="absolute right-2 top-2 size-7 p-0 hover:bg-orange-100 dark:hover:bg-violet-500/20"
              title="Close chat"
            >
              <X className="size-4" />
            </Button>
            <ChatHeader />
          </div>

          <div className="h-80 overflow-hidden bg-background/50">
            <ChatMessages
              messages={messages}
              error={error}
              isLoading={isLoading}
            />
          </div>

          {messages.length === 0 && (
            <div className="flex flex-wrap gap-1.5 border-t border-orange-200/60 px-3 py-2.5 dark:border-violet-500/10">
              {CHAT_SUGGESTIONS.slice(0, 3).map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => append({ role: "user", content: suggestion })}
                  className="rounded-full border border-orange-300 bg-orange-50 px-2.5 py-1 text-[10px] text-orange-900 transition-all hover:border-orange-400 hover:bg-orange-100 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/20"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <ChatInput
            input={input}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            setMessages={setMessages}
            isLoading={isLoading}
            messages={messages}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

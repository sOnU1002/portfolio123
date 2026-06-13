import { cn } from "@/lib/utils";
import { Message } from "ai";
import { Bot } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({
  message: { role, content },
}: ChatMessageProps) {
  const isBot = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isBot ? "justify-start" : "justify-end",
      )}
    >
      {isBot && <Bot className="mr-2" />}
      <div
        className={cn(
          "rounded-xl px-3 py-2 max-w-[280px] text-sm",
          isBot
            ? "border border-orange-200 bg-orange-50 text-foreground dark:border-border dark:bg-background"
            : "bg-orange-500 text-white dark:bg-foreground dark:text-background",
        )}
      >
        <Markdown
          components={{
            a: ({ node, href, ...props }) => (
              <Link
                href={href ?? ""}
                className="underline underline-offset-2"
                {...props}
              />
            ),
            p: ({ node, ...props }) => (
              <p className="mt-3 first:mt-0" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul
                className="mt-3 list-inside list-disc first:mt-0"
                {...props}
              />
            ),
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
}

import { Bot } from "lucide-react";

export default function ChatHeader() {
  return (
    <section className="flex w-full items-center gap-3 pr-8">
      <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-500 dark:from-violet-500 dark:to-cyan-500">
        <Bot className="size-5 text-white" />
      </div>
      <div className="flex flex-col items-start">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
          AI Assistant
        </p>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-sm font-semibold">Ask about Saket</p>
        </div>
      </div>
    </section>
  );
}

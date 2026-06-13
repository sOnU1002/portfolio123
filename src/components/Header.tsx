"use client";

import { useChatbot } from "@/contexts/ChatContext";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ChatToggle from "./ChatToggle";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { toggleChatbot } = useChatbot();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-4 z-50 mx-auto mt-4 max-w-4xl"
    >
      <nav className="glass-nav flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 dark:from-violet-500 dark:to-cyan-500">
            <Bot className="size-4 text-white" />
          </div>
          <span className="hidden font-mono text-sm font-bold gradient-text sm:inline">
            saket.dev
          </span>
        </Link>

        <ul className="flex gap-1 sm:gap-2">
          {navLinks.map((nav) => {
            const active = pathname === nav.href;
            return (
              <li key={nav.name}>
                <Link
                  href={nav.href}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all sm:text-sm ${
                    active
                      ? "bg-orange-100 text-orange-900 dark:bg-violet-500/20 dark:text-violet-300"
                      : "text-muted-foreground hover:bg-orange-50 hover:text-foreground dark:hover:bg-white/5"
                  }`}
                >
                  {nav.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleChatbot}
            className="hidden rounded-lg bg-orange-100 px-3 py-1.5 text-xs font-medium text-orange-900 transition-all hover:bg-orange-200 dark:bg-violet-500/20 dark:text-violet-300 dark:hover:bg-violet-500/30 sm:flex sm:items-center sm:gap-1.5"
          >
            <Bot className="size-3.5" />
            AI Chat
          </button>
          <ChatToggle />
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}

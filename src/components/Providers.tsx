"use client";

import { ChatProvider } from "@/contexts/ChatContext";
import { ThemeProvider, useTheme } from "next-themes";
import React from "react";
import { Toaster } from "sonner";
import Chat from "./Chat";
import CustomCursor from "./CustomCursor";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <ChatProvider>
        <CustomCursor />
        {children}
        <Chat />
      </ChatProvider>
      <ToastProvider />
    </ThemeProvider>
  );
}

function ToastProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      className="mt-12"
      position="top-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}

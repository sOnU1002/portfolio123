import AIBackground from "@/components/AIBackground";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Saket Nigam — Data & AI Engineer",
  description:
    "Portfolio of Saket Nigam — Data & AI Engineer building intelligent systems, LLM applications, and cloud data pipelines.",
  openGraph: {
    title: "Saket Nigam — Data & AI Engineer",
    description:
      "Building AI-powered applications, RAG pipelines, and intelligent systems.",
    url: "https://portfolio-saket-tan.vercel.app",
    siteName: "Saket Nigam Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative min-h-screen font-sans antialiased",
          inter.variable,
          jetbrains.variable,
        )}
      >
        <Providers>
          <AIBackground />
          <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-5 sm:px-8">
            <Header />
            <main className="grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

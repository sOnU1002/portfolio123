"use client";

import Socials from "@/components/Socials";
import TechMarquee from "@/components/TechMarquee";
import { Button } from "@/components/ui/Button";
import { useChatbot } from "@/contexts/ChatContext";
import { motion } from "framer-motion";
import { Bot, FileDown, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ROLES = [
  "Data & AI Engineer",
  "LLM Application Builder",
  "RAG Pipeline Architect",
  "Cloud Data Engineer",
];

const STATS = [
  { value: "8+", label: "Projects" },
  { value: "3", label: "AI Certs" },
  { value: "2+", label: "Years Exp" },
  { value: "3", label: "Freelance Apps" },
];

export default function Hero() {
  const { toggleChatbot, isVisible } = useChatbot();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < current.length) {
            setDisplayText(current.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % ROLES.length);
          }
        }
      },
      isDeleting ? 40 : 80,
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center py-12">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-300 bg-orange-100 px-4 py-1.5 dark:border-violet-500/30 dark:bg-violet-500/10"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs text-accent-violet">
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">Saket</span>
            <br />
            Nigam
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 flex items-center gap-2 font-mono text-lg text-accent-cyan sm:text-xl"
          >
            <Zap className="size-5 text-accent-violet" />
            <span>{displayText}</span>
            <span className="animate-pulse text-accent-violet">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground"
          >
            I engineer{" "}
            <span className="font-medium text-foreground">AI-powered products</span>
            , build RAG pipelines, and design cloud data platforms that turn
            complex data into intelligent decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/resume.pdf" target="_blank">
              <Button className="btn-glow h-11 px-6">
                <FileDown className="mr-2 size-4" />
                Download Resume
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => !isVisible && toggleChatbot()}
              className="h-11 border-orange-300 bg-orange-50 px-6 hover:border-orange-400 hover:bg-orange-100 dark:border-violet-500/30 dark:bg-violet-500/5 dark:hover:border-violet-500/50 dark:hover:bg-violet-500/15"
            >
              <Bot className="mr-2 size-4 text-accent-violet" />
              Talk to AI
            </Button>
            <Socials />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 grid grid-cols-4 gap-4"
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="glass-card p-3 text-center"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative order-1 flex justify-center lg:order-2"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/30 to-amber-400/30 blur-3xl animate-pulse-glow dark:from-violet-500/30 dark:to-cyan-500/30" />
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 opacity-75 blur-sm animate-gradient dark:from-violet-500 dark:via-purple-500 dark:to-cyan-500" />
            <div className="relative overflow-hidden rounded-3xl border border-orange-200 p-1 dark:border-white/20">
              <Image
                src="/Saket.jpeg"
                alt="Saket Nigam"
                width={320}
                height={320}
                className="rounded-2xl object-cover"
                priority
              />
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -right-4 top-8 glass-card flex items-center gap-2 px-3 py-2"
            >
              <Sparkles className="size-4 text-accent-violet" />
              <span className="text-xs font-medium">AI Engineer</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="absolute -left-4 bottom-12 glass-card flex items-center gap-2 px-3 py-2"
            >
              <Bot className="size-4 text-accent-cyan" />
              <span className="text-xs font-medium">LLM Apps</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12"
      >
        <TechMarquee />
      </motion.div>
    </section>
  );
}

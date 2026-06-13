"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <span className="mb-2 inline-block rounded-full border border-orange-300 bg-orange-100 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-violet dark:border-violet-500/30 dark:bg-violet-500/10">
        {label}
      </span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {description && (
        <p className="mt-3 max-w-xl text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
}

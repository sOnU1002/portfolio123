"use client";

import skillsData from "@/data/skills.json";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import {
  Brain,
  Cloud,
  Code,
  Cpu,
  Database,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  database: Database,
  cloud: Cloud,
  code: Code,
  cpu: Cpu,
  sparkles: Sparkles,
};

export default function Skills() {
  const { categories, certifications } = skillsData;

  return (
    <AnimatedSection className="flex flex-col gap-10">
      <SectionHeader
        label="Tech Stack"
        title="AI & Engineering Skills"
        description="From LLM applications and RAG pipelines to cloud data engineering and full-stack product development."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, i) => {
          const Icon = iconMap[category.icon] || Code;
          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glow-border group glass-card p-5 transition-all duration-300 hover:shadow-orange-500/15 dark:hover:shadow-violet-500/10"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400/30 to-amber-400/30 ring-1 ring-orange-300/40 dark:from-violet-500/30 dark:to-cyan-500/30 dark:ring-violet-500/20">
                  <Icon className="size-5 text-accent-violet" />
                </div>
                <h3 className="font-semibold">{category.name}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill, j) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + j * 0.03 }}
                  >
                    <Badge
                      variant="secondary"
                      className="badge-ai px-2 py-0.5 text-[11px] transition-colors group-hover:border-orange-400 group-hover:bg-orange-200 dark:group-hover:border-violet-500/30 dark:group-hover:bg-violet-500/15"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div>
        <h3 className="mb-5 text-lg font-semibold">
          <span className="gradient-text">Certifications</span>
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="glass-card flex flex-col items-center gap-3 p-5 text-center"
            >
              <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  width={72}
                  height={72}
                  className="size-14 object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-semibold leading-tight">{cert.name}</p>
                <p className="mt-1 font-mono text-[10px] text-accent-violet">
                  {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

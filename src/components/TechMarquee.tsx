"use client";

const AI_TECH = [
  "OpenAI", "LangChain", "RAG", "PyTorch", "TensorFlow", "HuggingFace",
  "Databricks", "Snowflake", "AWS Bedrock", "Azure OpenAI", "ChromaDB",
  "Pinecone", "Vector DB", "LLMs", "Generative AI", "PySpark", "FastAPI",
  "Next.js", "React", "Docker", "GPT-4", "Embeddings", "Fine-tuning",
];

export default function TechMarquee() {
  const items = [...AI_TECH, ...AI_TECH];

  return (
    <div className="relative overflow-hidden py-4">
      <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />
      <div className="animate-marquee flex w-max gap-3">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="shrink-0 rounded-full border border-orange-300 bg-orange-50 px-4 py-1.5 font-mono text-xs text-orange-900 backdrop-blur-sm dark:border-violet-500/20 dark:bg-violet-500/5 dark:text-violet-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

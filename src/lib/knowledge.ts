export const SAKET_KNOWLEDGE = `
# Saket Nigam — Data & AI Engineer

**Contact:** sjnigam10@gmail.com | +91 7620120592 | Pune, India
**LinkedIn:** https://www.linkedin.com/in/saket-nigam-103276262/
**GitHub:** https://github.com/sOnU1002
**Portfolio:** https://portfolio-saket-tan.vercel.app/

## Summary
Data Engineer and AI Engineer with hands-on experience building cloud-based data pipelines and working with financial datasets. Skilled in Python, SQL, AWS, Databricks, and Snowflake. Experience with LLM-based document understanding systems and AI-driven applications. Interested in building scalable data platforms.

## Professional Experience

### Data Engineer — DataEngite (Apr 2025 – Present)
- ETL pipelines for financial and banking datasets using Python and SQL
- Automated data ingestion with AWS Lambda, S3, and EC2
- Snowflake for large structured datasets and reporting
- SQL query optimization for reconciliation processes
- Databricks for processing datasets into structured analytics layers

### Data & AI Associate Engineer — Smart Tech LLC (Mar 2024 – Dec 2024)
- Healthcare applications with Python and ML models
- Medical image analysis and disease prediction models
- LLM-based systems for medical query answering
- Databricks (PySpark) for data processing and ML workflows
- React and JavaScript frontend development

## Freelance Projects

### PreTest Diagnostic (https://pretestdiagnostic.me/)
Healthcare diagnostics platform for Pune & Maharashtra. Home blood test booking, health shield packages, WhatsApp booking, digital reports.

### Intrro.ai (https://www.intrro.ai/)
AI-powered networking platform for events and communities. Intent-based matching, personalized intro openers, and follow-up prompts.

### BuyerSidee (https://buyersidee.com/)
Buyer-focused e-commerce platform with smart product discovery and modern checkout flows.

## Key Projects

### Financial Document Intelligence System
RAG system using LangChain and ChromaDB for extracting insights from financial documents with semantic search.

### Weatherly
Weather app with AI chatbot using FastAPI, React, VectorDB, and Google Gemini.

### Discern
AI chest X-ray disease prediction with noise elimination filters.

### SmartMed
Full-stack healthcare system for diagnostic test booking and medical report management (React, Node.js, Python, MySQL).

## Skills
**Languages:** Python, SQL, JavaScript, TypeScript
**Data:** Snowflake, Databricks, PySpark, PostgreSQL, ChromaDB, Pinecone
**Cloud:** AWS (Lambda, S3, EC2, Bedrock), Azure OpenAI, Docker
**AI/ML:** LangChain, OpenAI API, HuggingFace, PyTorch, TensorFlow, RAG, LLMs
**Web:** React, Next.js, FastAPI, Flask, Node.js, Express

## Certifications
- Databricks Certified Generative AI Engineer Associate
- Azure AI Engineer Associate (Microsoft)
- Zscaler Zero Trust Associate (ZTCA)

## Education
- B.E. Computer Engineering, University of Mumbai (2021–2024), CGPA 9.03
- Honours in AI & Machine Learning, University of Mumbai (2022–2024)
`;

export const CHAT_SUGGESTIONS = [
  "What AI projects have you built?",
  "Tell me about your experience at DataEngite",
  "What are your freelance projects?",
  "What certifications do you have?",
  "How can I contact Saket?",
];

export function getFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
    return "You can reach Saket at **sjnigam10@gmail.com** or via the [contact form](/contact). He's also on [LinkedIn](https://www.linkedin.com/in/saket-nigam-103276262/).";
  }
  if (q.includes("resume") || q.includes("cv")) {
    return "You can download Saket's resume here: [/resume.pdf](/resume.pdf). He's a Data & AI Engineer based in Pune, India.";
  }
  if (q.includes("skill") || q.includes("tech") || q.includes("stack")) {
    return "Saket's core skills include **Python, SQL, AWS, Databricks, Snowflake**, and AI frameworks like **LangChain, OpenAI, PyTorch**. He's also proficient in **React, Next.js, FastAPI**, and vector databases like ChromaDB and Pinecone.";
  }
  if (q.includes("freelance") || q.includes("client")) {
    return "Saket has built freelance projects including:\n\n- **[PreTest Diagnostic](https://pretestdiagnostic.me/)** — Healthcare diagnostics platform\n- **[Intrro.ai](https://www.intrro.ai/)** — AI networking platform\n- **[BuyerSidee](https://buyersidee.com/)** — E-commerce platform\n\nAll are live production sites.";
  }
  if (q.includes("project") || q.includes("built") || q.includes("work")) {
    return "Key projects include:\n\n- **Financial Document Intelligence** — RAG with LangChain & ChromaDB\n- **Weatherly** — AI weather chatbot\n- **Discern** — Medical X-ray AI\n- **PreTest Diagnostic, Intrro.ai, BuyerSidee** — Freelance production apps\n\nAsk about any specific project for more details!";
  }
  if (q.includes("experience") || q.includes("job") || q.includes("work")) {
    return "Saket is currently a **Data Engineer at DataEngite** (since Apr 2025), working on financial ETL pipelines with AWS and Snowflake. Previously, he was a **Data & AI Associate Engineer at Smart Tech LLC** (Mar–Dec 2024), building healthcare AI applications and LLM systems.";
  }
  if (q.includes("cert") || q.includes("certif")) {
    return "Saket holds:\n\n- **Databricks Certified Generative AI Engineer Associate**\n- **Azure AI Engineer Associate** (Microsoft)\n- **Zscaler Zero Trust Associate (ZTCA)**";
  }
  if (q.includes("education") || q.includes("degree") || q.includes("university")) {
    return "Saket graduated from **University of Mumbai** with a **B.E. in Computer Engineering** (CGPA 9.03, 2021–2024) and an **Honours in AI & Machine Learning** (2022–2024).";
  }
  if (q.includes("ai") || q.includes("llm") || q.includes("machine learning")) {
    return "Saket specializes in AI/ML engineering — building RAG pipelines, LLM applications, medical AI models, and document intelligence systems. He uses LangChain, OpenAI, Databricks, and vector databases in production.";
  }

  return "I'm Saket's AI assistant! I can tell you about his **experience**, **projects**, **skills**, **certifications**, and **freelance work**. Try asking about his AI projects or how to contact him. You can also download his [resume](/resume.pdf).";
}

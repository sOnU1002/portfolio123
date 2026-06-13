import Projects from "@/components/Projects";
import SectionHeader from "@/components/SectionHeader";

export default async function ProjectPage() {
  return (
    <article className="flex flex-col gap-10 pb-20 pt-8">
      <SectionHeader
        label="Portfolio"
        title="All Projects"
        description="Freelance production apps, AI systems, and personal builds spanning healthcare, networking, e-commerce, and data engineering."
      />
      <Projects />
    </article>
  );
}

import AnimatedSection from "@/components/AnimatedSection";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import LinkWithIcon from "@/components/LinkWithIcon";
import Posts from "@/components/Posts";
import Projects from "@/components/Projects";
import SectionHeader from "@/components/SectionHeader";
import Skills from "@/components/Skills";
import { getPosts } from "@/lib/posts";
import { ArrowRightIcon } from "lucide-react";
import path from "path";

const blogDirectory = path.join(process.cwd(), "content");
const LIMIT = 3;

export default async function Home() {
  const posts = await getPosts(blogDirectory, LIMIT);

  return (
    <article className="flex flex-col gap-24 pb-20">
      <Hero />

      <AnimatedSection>
        <Skills />
      </AnimatedSection>

      <AnimatedSection>
        <Experience />
      </AnimatedSection>

      <AnimatedSection className="flex flex-col gap-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeader
            label="Portfolio"
            title="Featured Projects"
            description="Freelance production apps and AI builds — from healthcare to networking."
          />
          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view all"
          />
        </div>
        <Projects limit={LIMIT} />
      </AnimatedSection>

      <AnimatedSection className="flex flex-col gap-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeader
            label="Blog"
            title="Recent Posts"
            description="Thoughts on AI, certifications, and engineering."
          />
          <LinkWithIcon
            href="/blog"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view all"
          />
        </div>
        <Posts posts={posts} />
      </AnimatedSection>
    </article>
  );
}

"use client";

import careerData from "@/data/career.json";
import educationData from "@/data/education.json";
import SectionHeader from "@/components/SectionHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { careerSchema, educationSchema } from "@/lib/schemas";
import Timeline from "./Timeline";

export default function Experience() {
  const career = careerSchema.parse(careerData).career;
  const education = educationSchema.parse(educationData).education;

  return (
    <div>
      <SectionHeader
        label="Experience"
        title="Work & Education"
        description="Building AI systems and data platforms across healthcare, finance, and freelance products."
      />
      <Tabs defaultValue="work" className="glass-card p-6">
        <TabsList className="mb-6 grid w-full grid-cols-2 bg-background/50">
          <TabsTrigger
            value="work"
            className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-900 dark:data-[state=active]:bg-violet-500/20 dark:data-[state=active]:text-violet-300"
          >
            Work Experience
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-900 dark:data-[state=active]:bg-violet-500/20 dark:data-[state=active]:text-violet-300"
          >
            Education
          </TabsTrigger>
        </TabsList>
        <TabsContent value="work">
          <Timeline experience={career} />
        </TabsContent>
        <TabsContent value="education">
          <Timeline experience={education} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

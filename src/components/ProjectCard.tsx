import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Project } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import Icon from "./Icon";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const { name, href, description, image, gradient, tags, links } = project;

  return (
    <Card className="group glow-border overflow-hidden glass-card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/20 dark:hover:shadow-violet-500/10">
      <CardHeader className="p-0">
        {image ? (
          <Link href={href || image} target="_blank">
            <div className="relative overflow-hidden">
              <Image
                src={image}
                alt={name}
                width={500}
                height={300}
                className="h-44 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
            </div>
          </Link>
        ) : (
          <Link href={href || "#"} target="_blank">
            <div
              className={cn(
                "relative flex h-44 w-full items-center justify-center overflow-hidden bg-gradient-to-br transition-transform duration-500 group-hover:scale-[1.02]",
                gradient || "from-orange-500 to-amber-500 dark:from-violet-600 dark:to-cyan-600",
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
              <span className="text-4xl font-bold text-white/90">{name.charAt(0)}</span>
              <ExternalLink className="absolute right-3 top-3 size-4 text-white/50 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </Link>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pt-4">
        <CardTitle className="text-base transition-colors group-hover:text-orange-700 dark:group-hover:text-violet-300">
          {name}
        </CardTitle>
        <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
          {description}
        </Markdown>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.toSorted().map((tag) => (
              <Badge
                key={tag}
                className="badge-ai px-1.5 py-0 text-[10px]"
                variant="secondary"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {links.toSorted().map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge className="flex gap-1.5 border-amber-300 bg-amber-50 px-2 py-1 text-[10px] text-amber-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-300">
                  <Icon name={link.icon} className="size-3" />
                  {link.name}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

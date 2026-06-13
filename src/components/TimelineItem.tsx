import { Experience } from "@/lib/schemas";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Badge } from "./ui/Badge";
import Icon from "./Icon";

interface Props {
  experience: Experience;
}

export default function TimelineItem({ experience }: Props) {
  const { name, href, title, logo, start, end, description, links } =
    experience;

  const logoSrc = logo?.startsWith("public/") ? logo.replace("public/", "/") : logo;

  return (
    <li className="relative ml-10 border-l border-orange-300/50 py-6 pl-8 last:pb-0 dark:border-violet-500/20">
      <div className="absolute -left-[1.35rem] top-6">
        <div className="rounded-full bg-gradient-to-br from-orange-500 to-amber-500 p-0.5 dark:from-violet-500 dark:to-cyan-500">
          <Link href={href || "#"} target={href ? "_blank" : undefined}>
            <Avatar className="size-10 border-2 border-background bg-card">
              <AvatarImage
                src={logoSrc}
                alt={name}
                className="object-contain p-1"
              />
              <AvatarFallback className="bg-orange-100 text-orange-900 dark:bg-violet-500/20 dark:text-violet-300">
                {name[0]}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {start && (
          <time className="font-mono text-[11px] text-accent-violet">
            {start} — {end || "Present"}
          </time>
        )}
        <h2 className="text-base font-semibold">{name}</h2>
        {title && (
          <p className="text-sm text-accent-cyan">{title}</p>
        )}
        {description && (
          <ul className="mt-2 space-y-1.5">
            {description.map((desc, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-2 size-1 shrink-0 rounded-full bg-orange-500 dark:bg-violet-500" />
                {desc}
              </li>
            ))}
          </ul>
        )}
      </div>
      {links && links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {links.map((link, idx) => (
            <Link href={link.href} key={idx} target="_blank">
              <Badge className="flex gap-1.5 border-orange-200 bg-orange-50 text-[10px] text-orange-900 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-inherit">
                <Icon name={link.icon} className="size-3" />
                {link.name}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}

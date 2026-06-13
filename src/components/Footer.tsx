import Link from "next/link";
import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-orange-200 py-10 pb-32 dark:border-violet-500/10 sm:flex-row">
      <p className="text-center text-xs text-muted-foreground sm:text-left">
        <span>&copy; {new Date().getFullYear()} </span>
        <Link className="font-medium gradient-text" href="/">
          Saket Nigam
        </Link>
        <span className="mx-2 text-orange-300 dark:text-violet-500/30">·</span>
        <span className="font-mono text-orange-600 dark:text-violet-400/60">Data & AI Engineer</span>
        <span className="mx-2 text-orange-300 dark:text-violet-500/30">·</span>
        <Link className="link" href="/privacy">
          Privacy
        </Link>
      </p>
      <Socials />
    </footer>
  );
}

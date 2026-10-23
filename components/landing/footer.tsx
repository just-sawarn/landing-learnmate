import Link from "next/link";
import { footer } from "./content";
import { Wordmark } from "./logo";

export function Footer() {
  const repo = process.env.NEXT_PUBLIC_REPO_URL;
  return (
    <footer className="border-t border-line px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-3 mb-0 text-[15px] text-ink-2">{footer.description}</p>
          <p className="mt-1 mb-0 text-sm text-muted">{footer.built}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-[15px]">
            {footer.links.map((l) => (
              <li key={l.label}>
                {l.href.startsWith("#") ? (
                  <a href={l.href} className="text-ink-2 hover:text-ink">
                    {l.label}
                  </a>
                ) : (
                  <Link href={l.href} className="text-ink-2 hover:text-ink">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
            {repo && (
              <li>
                <a href={repo} target="_blank" rel="noreferrer" className="text-ink-2 hover:text-ink">
                  GitHub
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 mb-0 max-w-[1200px] text-sm text-muted">{footer.credits}</p>
    </footer>
  );
}

import Link from "next/link";
import { primaryNav } from "@/content/navigation";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/button-link";
import { MobileMenu } from "./mobile-menu";
import { Wordmark } from "./wordmark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper">
      <div className="container-site flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Wordmark />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline py-1 text-[0.95rem] text-ink/80 transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={site.cta.nav.href}
            track="start_project"
            trackLocation="header"
            className="h-10 px-4 text-[0.88rem] max-sm:hidden"
          >
            {site.cta.nav.label}
          </ButtonLink>
          <MobileMenu items={primaryNav} cta={site.cta.nav} />
        </div>
      </div>
    </header>
  );
}

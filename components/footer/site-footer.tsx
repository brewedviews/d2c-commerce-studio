import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { site, whatsappHref } from "@/content/site";
import { Arrow } from "@/components/ui/arrow";

export function SiteFooter() {
  const { email, whatsapp, instagram } = site.contact;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="container-site pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-sm font-display text-d4 text-paper/90">{site.tagline}</p>
            <p className="label mt-8 text-stone-soft">
              {site.descriptor} · {site.location}
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className="md:col-span-2">
              <h2 className="label text-stone-soft">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href + item.label}>
                    <Link href={item.href} className="link-underline text-paper/85 hover:text-paper">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-3">
            <h2 className="label text-stone-soft">Contact</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href={site.cta.primary.href}
                  data-track="start_project"
                  data-track-location="footer"
                  className="group inline-flex items-center gap-2 text-paper"
                >
                  <span className="link-underline">Project enquiry</span>
                  <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
                </Link>
              </li>
              {email && (
                <li>
                  <a href={`mailto:${email}`} data-track="click_email" data-track-location="footer" className="link-underline text-paper/85 hover:text-paper">
                    {email}
                  </a>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a
                    href={whatsappHref(whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="click_whatsapp"
                    data-track-location="footer"
                    className="link-underline text-paper/85 hover:text-paper"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {instagram && (
                <li>
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="link-underline text-paper/85 hover:text-paper">
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-24 select-none whitespace-nowrap font-display text-[clamp(3.5rem,19vw,21rem)] leading-[0.8] tracking-[-0.03em] text-paper md:mt-32"
        >
          {site.name}
          <span className="text-accent">.</span>
        </p>

        <div className="flex flex-col gap-3 border-t border-line-dark py-7 text-sm text-stone-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Projects from {site.startingPrice}</p>
        </div>
      </div>
    </footer>
  );
}

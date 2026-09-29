import type { Metadata } from "next";
import { site, whatsappHref } from "@/content/site";
import { ProjectForm } from "@/components/forms/project-form";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "Start Your Project",
  description: `Tell us about your brand and what you need. D2C storefronts, Shopify development and commerce integrations — projects from ${site.startingPrice}.`,
  alternates: { canonical: "/contact" },
};

const nextSteps = [
  { title: "We review your brief", body: "We read every enquiry ourselves and come back with questions if anything is unclear." },
  { title: "A short discovery call", body: "We talk through your products, customers, integrations and timeline." },
  { title: "A fixed, written quote", body: "Scope, price and timeline in writing — before any work starts." },
];

export default function ContactPage() {
  const { email, whatsapp } = site.contact;
  const fallbackContact = whatsapp
    ? { label: "WhatsApp", href: whatsappHref(whatsapp, "Hi, I'd like to discuss a D2C project.") }
    : email
      ? { label: email, href: `mailto:${email}` }
      : undefined;

  return (
    <div className="container-site pb-24 pt-12 md:pb-36 md:pt-20">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel>Project enquiry</SectionLabel>
            <h1 className="mt-6 font-display text-d2">
              Start your <em className="italic">project.</em>
            </h1>
            <p className="mt-6 max-w-md text-lead text-ink/80">
              Tell us about your brand and what you need. Projects start from {site.startingPrice}.
            </p>

            <ol className="mt-12 border-t border-line">
              {nextSteps.map((step, i) => (
                <li key={step.title} className="flex gap-5 border-b border-line py-5">
                  <span className="label pt-1 text-stone">0{i + 1}</span>
                  <div>
                    <p className="font-display text-[1.45rem] leading-tight">{step.title}</p>
                    <p className="mt-1 text-sm text-ink/70">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {(email || whatsapp) && (
              <div className="mt-10 space-y-2">
                <p className="label text-stone">Prefer to talk directly?</p>
                {whatsapp && (
                  <a
                    href={whatsappHref(whatsapp, "Hi, I'd like to discuss a D2C project.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="click_whatsapp"
                    data-track-location="contact"
                    className="link-underline block w-fit"
                  >
                    Message us on WhatsApp
                  </a>
                )}
                {email && (
                  <a href={`mailto:${email}`} data-track="click_email" data-track-location="contact" className="link-underline block w-fit">
                    {email}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ProjectForm fallbackContact={fallbackContact} />
        </div>
      </div>
    </div>
  );
}

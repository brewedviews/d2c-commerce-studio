import { Hero } from "@/components/sections/hero";
import { CapabilityStrip } from "@/components/sections/capability-strip";
import { SelectedWork } from "@/components/sections/selected-work";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { Pricing } from "@/components/sections/pricing";
import { Technology } from "@/components/sections/technology";
import { FlagshipCase } from "@/components/sections/flagship-case";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <SelectedWork />
      <Services />
      <WhyUs />
      <Process />
      <Pricing />
      <Technology />
      <FlagshipCase />
      <Faq />
      <FinalCta />
    </>
  );
}

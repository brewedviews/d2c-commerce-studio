import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[70vh] flex-col justify-center py-24">
      <p className="label text-stone">404</p>
      <h1 className="mt-6 max-w-[14ch] font-display text-d2">
        This page is <em className="italic">out of stock.</em>
      </h1>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/work" variant="text">
          View our work
        </ButtonLink>
      </div>
    </div>
  );
}

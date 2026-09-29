/**
 * Project enquiry model + validation. Shared by the form (field options) and
 * the server action (validation). Deliberately dependency-free.
 */

export const BUSINESS_CATEGORIES = [
  "Fashion & apparel",
  "Beauty & personal care",
  "Food & beverage",
  "Home & lifestyle",
  "Jewellery & accessories",
  "Health & wellness",
  "Marketplace / multi-vendor",
  "Other",
] as const;

export const PROJECT_NEEDS = [
  "New D2C store",
  "Redesign existing store",
  "Brand website",
  "Commerce integrations",
  "Custom functionality",
  "Not sure yet",
] as const;

export const BUDGET_RANGES = ["Under ₹50K", "₹50K–₹1L", "₹1L–₹2L", "₹2L–₹5L", "₹5L+", "Not sure yet"] as const;

export type Enquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  website?: string;
  category: string;
  needs: string[];
  budget: string;
  launchDate?: string;
  details?: string;
};

export type EnquiryField = keyof Enquiry;
export type FieldErrors = Partial<Record<EnquiryField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{8,20}$/;
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

const str = (fd: FormData, key: string, max = 300) => String(fd.get(key) ?? "").trim().slice(0, max);

export function parseEnquiry(fd: FormData): { data?: Enquiry; errors?: FieldErrors } {
  const data: Enquiry = {
    name: str(fd, "name", 120),
    company: str(fd, "company", 160),
    email: str(fd, "email", 200),
    phone: str(fd, "phone", 40),
    website: str(fd, "website", 300) || undefined,
    category: str(fd, "category", 80),
    needs: fd
      .getAll("needs")
      .map(String)
      .filter((n) => (PROJECT_NEEDS as readonly string[]).includes(n)),
    budget: str(fd, "budget", 40),
    launchDate: str(fd, "launchDate", 40) || undefined,
    details: str(fd, "details", 4000) || undefined,
  };

  const errors: FieldErrors = {};
  if (data.name.length < 2) errors.name = "Please tell us your name.";
  if (!data.company) errors.company = "Which brand or company is this for?";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(data.phone)) errors.phone = "Please enter a valid phone or WhatsApp number.";
  if (data.website && !URL_RE.test(data.website)) errors.website = "That doesn't look like a web address.";
  if (!(BUSINESS_CATEGORIES as readonly string[]).includes(data.category)) errors.category = "Choose the closest category.";
  if (data.needs.length === 0) errors.needs = "Select at least one option.";
  if (!(BUDGET_RANGES as readonly string[]).includes(data.budget)) errors.budget = "Choose a budget range.";

  return Object.keys(errors).length ? { errors } : { data };
}

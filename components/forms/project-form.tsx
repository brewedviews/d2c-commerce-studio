"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/contact/actions";
import { BUDGET_RANGES, BUSINESS_CATEGORIES, PROJECT_NEEDS } from "@/lib/leads/schema";
import { track } from "@/lib/analytics/track";
import { Arrow } from "@/components/ui/arrow";
import { ChoiceGroup, Field, Select, TextArea, TextInput, describedBy } from "./fields";

const LAUNCH_WINDOWS = ["As soon as possible", "Within 1 month", "1–3 months", "3–6 months", "Flexible"];

const initialState: EnquiryState = { status: "idle" };

export function ProjectForm({ fallbackContact }: { fallbackContact?: { label: string; href: string } }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const errors = state.status === "error" ? state.errors : undefined;
  const values = state.status === "error" ? state.values : undefined;
  const v = (key: string) => (typeof values?.[key] === "string" ? (values[key] as string) : undefined);

  useEffect(() => {
    if (state.status === "success") {
      track("submit_contact_form");
      statusRef.current?.focus();
    } else if (state.status === "error") {
      if (state.reason === "validation") {
        // Move focus to the first invalid field.
        formRef.current
          ?.querySelector<HTMLElement>("input[aria-invalid='true'], select[aria-invalid='true'], fieldset[aria-invalid='true'] input")
          ?.focus();
      } else {
        statusRef.current?.focus();
      }
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-sm bg-ink p-8 text-paper outline-none md:p-12">
        <p className="label text-accent-ink/70">Enquiry received</p>
        <p className="mt-6 font-display text-d3">Thanks — your project enquiry is in. We’ll get back to you shortly.</p>
        <p className="mt-6 max-w-md text-paper/75">
          We’ll review your brief and reply to schedule a short discovery call. You’ll receive a fixed quote after that
          conversation.
        </p>
      </div>
    );
  }

  const systemError =
    state.status === "error" && state.reason !== "validation"
      ? state.reason === "not_configured"
        ? "Online enquiries aren’t connected yet, so this form couldn’t be sent."
        : "Something went wrong sending your enquiry. Please try again in a moment."
      : undefined;

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-12" aria-describedby={systemError ? "form-status" : undefined}>
      {systemError && (
        <div
          id="form-status"
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="border-l-2 border-accent bg-paper-sunk px-5 py-4 text-[0.95rem] outline-none"
        >
          {systemError}{" "}
          {fallbackContact && (
            <>
              Please reach us via{" "}
              <a href={fallbackContact.href} className="underline underline-offset-4">
                {fallbackContact.label}
              </a>
              .
            </>
          )}
        </div>
      )}
      {state.status === "error" && state.reason === "validation" && (
        <p role="alert" className="text-sm text-accent">
          Please check the highlighted fields.
        </p>
      )}

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_url">Leave this field empty</label>
        <input id="company_url" name="company_url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors?.name}>
          <TextInput
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={v("name")}
            aria-invalid={errors?.name ? true : undefined}
            aria-describedby={describedBy("name", errors?.name)}
          />
        </Field>
        <Field id="company" label="Brand / company" error={errors?.company}>
          <TextInput
            id="company"
            name="company"
            autoComplete="organization"
            required
            defaultValue={v("company")}
            aria-invalid={errors?.company ? true : undefined}
            aria-describedby={describedBy("company", errors?.company)}
          />
        </Field>
        <Field id="email" label="Email" error={errors?.email}>
          <TextInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            defaultValue={v("email")}
            aria-invalid={errors?.email ? true : undefined}
            aria-describedby={describedBy("email", errors?.email)}
          />
        </Field>
        <Field id="phone" label="Phone / WhatsApp" error={errors?.phone}>
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91"
            required
            defaultValue={v("phone")}
            aria-invalid={errors?.phone ? true : undefined}
            aria-describedby={describedBy("phone", errors?.phone)}
          />
        </Field>
        <Field id="website" label="Existing website" optional error={errors?.website}>
          <TextInput
            id="website"
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="yourbrand.com"
            defaultValue={v("website")}
            aria-invalid={errors?.website ? true : undefined}
            aria-describedby={describedBy("website", errors?.website)}
          />
        </Field>
        <Field id="category" label="Business category" error={errors?.category}>
          <Select
            // React doesn't re-apply a changed defaultValue to <select> after a form reset; remount instead.
            key={`category-${v("category") ?? ""}`}
            id="category"
            name="category"
            required
            defaultValue={v("category") ?? ""}
            aria-invalid={errors?.category ? true : undefined}
            aria-describedby={describedBy("category", errors?.category)}
          >
            <option value="" disabled>
              Select…
            </option>
            {BUSINESS_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <ChoiceGroup
        name="needs"
        legend="What do you need? (select all that apply)"
        type="checkbox"
        options={PROJECT_NEEDS}
        selected={values?.needs}
        error={errors?.needs}
      />

      <ChoiceGroup
        name="budget"
        legend="Approximate budget"
        type="radio"
        options={BUDGET_RANGES}
        selected={v("budget")}
        error={errors?.budget}
        required
      />

      <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
        <Field id="launchDate" label="Desired launch" optional>
          <Select key={`launch-${v("launchDate") ?? ""}`} id="launchDate" name="launchDate" defaultValue={v("launchDate") ?? ""}>
            <option value="">Select…</option>
            {LAUNCH_WINDOWS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field id="details" label="Anything else we should know?" optional>
        <TextArea
          id="details"
          name="details"
          rows={4}
          placeholder="Products, number of SKUs, integrations, references you like…"
          defaultValue={v("details")}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-6 border-t border-line pt-8">
        <button
          type="submit"
          disabled={pending}
          className="group/btn inline-flex h-14 items-center gap-3 rounded-xs bg-ink px-7 font-medium text-paper transition-colors duration-500 ease-out-expo hover:bg-accent disabled:cursor-progress disabled:bg-ink/70"
        >
          {pending ? (
            <>
              <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <Arrow className="transition-transform duration-500 group-hover/btn:translate-x-1" />
            </>
          )}
        </button>
        <p className="text-sm text-stone">Takes about two minutes. No obligation.</p>
      </div>
      <p aria-live="polite" className="sr-only">
        {pending ? "Sending your enquiry" : ""}
      </p>
    </form>
  );
}

"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Check, ChevronDown, CircleAlert, LoaderCircle, Send } from "lucide-react";
import { company, contact } from "@/lib/content";

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", company: "", email: "", phone: "", service: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please enter your full name.";
  if (!f.company.trim()) e.company = "Please enter your company.";
  if (!f.email.trim()) e.email = "Please enter your business email.";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.phone && !/^[+()\d\s-]{6,20}$/.test(f.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!f.message.trim()) e.message = "Please enter a message.";
  return e;
}

function mailtoHref(f: Fields) {
  const body = [
    `Full Name: ${f.name}`,
    `Company: ${f.company}`,
    `Business Email: ${f.email}`,
    f.phone ? `Phone: ${f.phone}` : null,
    f.service ? `Service of Interest: ${f.service}` : null,
    "",
    f.message,
  ]
    .filter((l) => l !== null)
    .join("\n");
  const subject = `Website enquiry${f.service ? ` — ${f.service}` : ""}`;
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    const honeypot = (new FormData(e.currentTarget).get("website") as string) || "";
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website: honeypot }),
      });
      if (res.ok) {
        setStatus("sent");
        setFields(empty);
      } else {
        setStatus("fallback");
      }
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="mt-8 flex gap-4 rounded-[12px] border border-emerald-200 bg-emerald-50 p-6">
        <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden />
        <div>
          <p className="font-semibold text-ink">Thank you. Your enquiry has been sent.</p>
          <p className="mt-1 text-[15px] text-slate-600">Our team will be in touch shortly.</p>
        </div>
      </div>
    );
  }

  const inputBase =
    "mt-2 block w-full rounded-lg border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-slate-400 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25";
  const border = (k: keyof Fields) => (errors[k] ? "border-red-600" : "border-slate-300 hover:border-slate-400");

  const field = (k: keyof Fields, label: string, required: boolean, input: ReactNode) => (
    <div>
      <label htmlFor={`f-${k}`} className="block text-sm font-medium text-ink">
        {label}
        {required && (
          <span className="text-brand-ink" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      {input}
      {errors[k] && (
        <p id={`f-${k}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
          <CircleAlert className="h-4 w-4" aria-hidden />
          {errors[k]}
        </p>
      )}
    </div>
  );

  const aria = (k: keyof Fields, required: boolean) => ({
    id: `f-${k}`,
    name: k,
    value: fields[k],
    onChange: set(k),
    required,
    "aria-required": required,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `f-${k}-error` : undefined,
  });

  return (
    <form noValidate onSubmit={onSubmit} className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Full Name", true, <input type="text" autoComplete="name" className={`${inputBase} ${border("name")}`} {...aria("name", true)} />)}
        {field("company", "Company", true, <input type="text" autoComplete="organization" className={`${inputBase} ${border("company")}`} {...aria("company", true)} />)}
        {field("email", "Business Email", true, <input type="email" autoComplete="email" className={`${inputBase} ${border("email")}`} {...aria("email", true)} />)}
        {field("phone", "Phone", false, <input type="tel" autoComplete="tel" className={`${inputBase} ${border("phone")}`} {...aria("phone", false)} />)}
      </div>
      {field(
        "service",
        "Service of Interest",
        false,
        <div className="relative">
          <select className={`${inputBase} ${border("service")} appearance-none pr-10`} {...aria("service", false)}>
            <option value="">Select a service</option>
            {contact.serviceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-[calc(50%+4px)] h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
        </div>,
      )}
      {field("message", "Message", true, <textarea rows={5} className={`${inputBase} ${border("message")} resize-y`} {...aria("message", true)} />)}

      {/* Honeypot: hidden from people and assistive tech, catches naive bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "fallback" && (
        <div role="alert" className="flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-[15px] text-ink">
          <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden />
          <p>
            We couldn&apos;t send your enquiry online right now.{" "}
            <a href={mailtoHref(fields)} className="font-semibold text-brand-ink underline underline-offset-2">
              Email it to {company.email}
            </a>{" "}
            instead — your details will be pre-filled.
          </p>
        </div>
      )}

      <div className="flex flex-col-reverse gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-slate-500">
          <span className="text-brand-ink" aria-hidden>
            *
          </span>{" "}
          Required fields
        </p>
        <button type="submit" disabled={status === "sending"} className="btn bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-70">
          {status === "sending" ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
          Send Enquiry
        </button>
      </div>
    </form>
  );
}

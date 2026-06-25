"use client";

import { useState } from "react";

/**
 * Contact form. No backend yet — on submit it composes a pre-filled email
 * to the studio (a mailto: with the message body), which works everywhere
 * and keeps the studio's inbox as the single source of truth. Swap the
 * onSubmit for a server action / form endpoint when one exists.
 */

const PROJECT_TYPES = [
  "New website",
  "Brand + website",
  "Web app / product",
  "Multi-brand system",
  "Not sure yet",
];

const inputBase =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 font-sans text-[15px] text-ink placeholder:text-faint transition-colors focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10";

export function ContactForm({ email = "michael@lauf.co" }: { email?: string }) {
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const sender = String(data.get("email") || "");
    const message = String(data.get("message") || "");

    const subject = `New project enquiry — ${projectType}`;
    const body = [
      `Name: ${name}`,
      `Email: ${sender}`,
      `Project type: ${projectType}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputBase}
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputBase}
          />
        </Field>
      </div>

      <Field label="What are you after?" htmlFor="projectType">
        <div className="flex flex-wrap gap-2.5">
          {PROJECT_TYPES.map((type) => {
            const selected = type === projectType;
            return (
              <button
                key={type}
                type="button"
                aria-pressed={selected}
                onClick={() => setProjectType(type)}
                className={`rounded-full border px-[14px] py-2 font-sans text-[13px] font-medium transition-colors ${
                  selected
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink hover:border-ink"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Tell us about the project" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What are you building, who's it for, and where are you stuck?"
          className={`${inputBase} resize-y`}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
        <button
          type="submit"
          className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-3.5 font-sans text-[15px] font-semibold text-paper transition-colors hover:bg-rust"
        >
          Send it over
          <span
            aria-hidden
            className="transition-transform motion-safe:group-hover:translate-x-0.5"
          >
            →
          </span>
        </button>
        <span className="font-sans text-[13px] text-faint">
          Opens your email app — or just write{" "}
          <a
            href={`mailto:${email}`}
            className="text-muted underline-offset-2 hover:text-rust hover:underline"
          >
            {email}
          </a>
        </span>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={htmlFor}
        className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-faint"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

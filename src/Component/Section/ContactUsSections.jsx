import React, { useState } from "react";
import bgvideo from '../../assets/video2.mp4'
const VIDEO_URL = bgvideo;
const EMAIL = "contact@staropstech.com";

const POINTS = [
  "Excellent Team",
  "Effective Delivery",
  "Quality Efforts",
  "Genuineness and Commitment",
  "Source Code Authorization",
  "Non-Disclosure Agreement",
  "No Lock-In Contract",
  "Agile & DevOps Implementation",
  "Clean Code",
  "Fast and Easy On-boarding",
  "Total Control Over the Code",
];

const FIELDS = [
  { name: "fullName", label: "Full name", type: "text", placeholder: "Enter your full name", autoComplete: "name", required: true },
  { name: "mobile", label: "Mobile No", type: "tel", placeholder: "Enter your mobile no", autoComplete: "tel", inputMode: "tel", required: true },
  { name: "country", label: "Country", type: "text", placeholder: "Enter your Country", autoComplete: "country-name", required: true },
  { name: "email", label: "Email address", type: "email", placeholder: "Enter your email", autoComplete: "email", required: true },
];

const inputCls =
  "w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10";

function ArrowIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function ContactUs({ onSubmit }) {
  const [form, setForm] = useState({ fullName: "", mobile: "", country: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      if (onSubmit) await onSubmit(form);
      else console.log("Contact form:", form); // TODO: connect your API / EmailJS / backend here
      setStatus("sent");
      setForm({ fullName: "", mobile: "", country: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <section
      id="contact"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0c10] px-4 py-12 text-white sm:px-6 sm:py-14 lg:px-8"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      <div className="mx-auto w-full max-w-4xl">
        {/* Heading */}
        <div className="mx-auto mb-7 max-w-md text-center sm:mb-9">
          <p className="inline-flex items-center gap-2 text-sm font-medium">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#fff" aria-hidden="true">
              <path d="M12 1c.6 6.4 4.6 10.4 11 11-6.4.6-10.4 4.6-11 11-.6-6.4-4.6-10.4-11-11C7.4 11.4 11.4 7.4 12 1z" />
            </svg>
            Connect with Us
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/85 sm:text-sm">
            Tell us about your project, and our team will get back to you to discuss how we can help.
          </p>
        </div>

        <div className="grid items-start gap-8 md:grid-cols-2 md:gap-8 lg:gap-10">
          {/* Form card */}
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-2xl bg-[#f4f4f4] p-4 text-neutral-900 shadow-2xl shadow-black/30 sm:p-5"
          >
            <h2 className="mb-4 text-xl font-medium tracking-tight sm:text-2xl">Let’s work together</h2>

            <div className="space-y-3">
              {FIELDS.map((f) => (
                <div key={f.name}>
                  <label htmlFor={f.name} className="mb-1 block text-[11px] font-medium sm:text-xs">
                    {f.label}
                    {f.required && "*"}
                  </label>
                  <input
                    id={f.name}
                    name={f.name}
                    type={f.type}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                    inputMode={f.inputMode}
                    required={f.required}
                    className={inputCls}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="mb-1 block text-[11px] font-medium sm:text-xs">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us the purpose"
                  className={`${inputCls} resize-y`}
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center rounded-full bg-black px-6 py-2.5 text-[13px] font-medium text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? "Sending..." : "Submit"}
              </button>

              <div className="text-xs">
                <p className="text-neutral-500">Do you prefer email?</p>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="mt-0.5 inline-flex items-center gap-2 text-xs font-medium text-neutral-900 hover:opacity-70"
                  aria-label="Copy email address"
                >
                  {EMAIL}
                  {copied ? (
                    <span className="text-xs font-normal text-green-600">Copied!</span>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                      <path d="M16 1H6a2 2 0 0 0-2 2v12h2V3h10V1zm3 4H10a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H10V7h9v14z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div aria-live="polite" className="mt-4 text-sm">
              {status === "sent" && (
                <p className="rounded-lg bg-green-50 px-3 py-2 text-green-700">
                  Thanks! Your message has been sent. We’ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-red-700">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}
            </div>
          </form>

          {/* Info column */}
          <div className="md:pt-1">
            <h3 className="text-xl font-medium leading-tight tracking-tight sm:text-2xl">
              We Delivering Customer <br className="hidden sm:block" />
              Success
            </h3>
            <p className="mt-3 text-xs font-medium leading-snug text-white/90">
              Building Software-As-A-Service (SaaS) Products Requires A Unique Approach
            </p>

            <ul className="mt-4 space-y-2 text-xs sm:text-[13px]">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-white" />
                  {p}
                </li>
              ))}
            </ul>

            <a
              href="/contact"
              className="group mt-6 inline-flex items-center gap-3 rounded-full bg-white py-1 pl-4 pr-1 text-xs font-medium text-black transition hover:-translate-y-0.5"
            >
              Book a discovery call
              <span className="grid h-8 w-8 place-items-center rounded-full bg-black text-white transition group-hover:translate-x-0.5">
                <ArrowIcon className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}